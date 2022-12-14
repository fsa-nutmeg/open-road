import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { lineDistance, lineString, along } from "@turf/turf";
import "../../map.css";

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_KEY}`;

function codeToAnimate(props) {
  const map = new mapboxgl.Map({
    container: "map",
    zoom: 11.53,
    center: [6.5615, 46.0598],
    pitch: 35,
    bearing: -180,
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: "mapbox://styles/mapbox/satellite-v9",
    interactive: false,
  });

  // `routes` comes from https://docs.mapbox.com/mapbox-gl-js/assets/routes.js,
  // which has properties that are in the shape of an array of arrays that correspond
  //  to the `coordinates` property of a GeoJSON linestring, for example:
  // [
  //   [6.56158, 46.05989],
  //   [6.56913, 46.05679],
  //   ...
  // ]
  // this is the path the camera will look at
  const targetRoute = props.coordinates;
  // this is the path the camera will move along
  const cameraRoute = props.coordinates.map(([x, y]) => [x, y - 160]);

  // add terrain, sky, and line layers once the style has loaded
  map.on("load", (props) => {
    map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: "mapbox://mapbox.mapbox-terrain-dem-v1",
      tileSize: 512,
      maxzoom: 20,
    });
    map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
    map.addSource("trace", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: props.coordinates,
        },
      },
    });
    map.addLayer({
      id: "sky",
      type: "sky",
      paint: {
        "sky-type": "atmosphere",
        "sky-atmosphere-sun": [0.0, 90.0],
        "sky-atmosphere-sun-intensity": 15,
      },
    });
    
  });

  // wait for the terrain and sky to load before starting animation
  map.on("load", () => {
    const animationDuration = 120000;
    const cameraAltitude = 5500;
    // get the overall distance of each route so we can interpolate along them
    const routeDistance = lineDistance(lineString(targetRoute));
    const cameraRouteDistance = lineDistance(lineString(cameraRoute));

    let start;

    function frame(time) {
      if (!start) start = time;
      // phase determines how far through the animation we are
      const phase = (time - start) / animationDuration;

      // phase is normalized between 0 and 1
      // when the animation is finished, reset start to loop the animation
      if (phase > 1) {
        // wait 1.5 seconds before looping
        setTimeout(() => {
          start = 0.0;
        }, 1500);
      }

      // use the phase to get a point that is the appropriate distance along the route
      // this approach syncs the camera and route positions ensuring they move
      // at roughly equal rates even if they don't contain the same number of points
      const alongRoute = along(lineString(targetRoute), routeDistance * phase)
        .geometry.coordinates;

      const alongCamera = along(
        lineString(targetRoute),
        cameraRouteDistance * phase
      ).geometry.coordinates;

      const camera = map.getFreeCameraOptions();

      // set the position and altitude of the camera
      camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
        {
          lng: alongCamera[0],
          lat: alongCamera[1],
        },
        cameraAltitude
      );

      // tell the camera to look at a point along the route
      camera.lookAtPoint({
        lng: alongRoute[0],
        lat: alongRoute[1],
      });

      map.setFreeCameraOptions(camera);

      window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame);
  });
}

const MapAnimation = (props) => {
  useEffect(() => {
    codeToAnimate(props);
  });

  return (
    <div className="animation-container">
      <div id="map" />
    </div>
  );
};

export default MapAnimation;
