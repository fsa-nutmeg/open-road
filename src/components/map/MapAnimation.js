import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import toTheSunCoordinates from "./testCoordinates.json";
import { lineDistance, lineString, along } from "@turf/turf";
import "../../map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibnV0bWVnczEiLCJhIjoiY2xiMmZhY2xqMDJjMTNucW5tYmtpaWh4aiJ9.4UxmcoCBZZsklvvu8sDQ8A";

function codeToAnimate() {
  const map = new mapboxgl.Map({
    container: "map",
    zoom: 11.53,
    center: [6.5615, 46.0598],
    pitch: 65,
    bearing: -180,
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: "mapbox://styles/mapbox/outdoors-v12",
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
  const targetRoute = toTheSunCoordinates;
  // this is the path the camera will move along
  const cameraRoute = toTheSunCoordinates;

  // add terrain, sky, and line layers once the style has loaded
  map.on("load", () => {
    map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: "mapbox://mapbox.mapbox-terrain-dem-v1",
      tileSize: 512,
      maxzoom: 14,
    });
    map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
    map.addSource("trace", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: toTheSunCoordinates,
        },
      },
    });
    map.addLayer({
      type: "line",
      source: "trace",
      id: "line",
      paint: {
        "line-color": "black",
        "line-width": 5,
      },
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
    });
  });

  // wait for the terrain and sky to load before starting animation
  map.on("load", () => {
    const animationDuration = 80000;
    const cameraAltitude = 4000;
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

const MapAnimation = () => {
  useEffect(() => {
    codeToAnimate();
  });

  return (
    <div className="animation-container">
      <div id="map" />
    </div>
  );
};

export default MapAnimation;
