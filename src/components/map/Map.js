import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "../../map.css";
import { Navigate } from "react-router-dom";

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_KEY}`;

export default function Map(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-113.9);
  const [lat, setLat] = useState(48.35);
  const [zoom, setZoom] = useState(9);
  const [mBDirections, setMBDirections] = useState(null);
  const [redirect, updateRedirect] = useState(false);
  const [routeDrawn, drawLine] = useState(false);
  let mapboxDirections = null;

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/nutmegs1/clb2fo0ua000a14mj5t28j8c3",
      center: [lng, lat],
      zoom: zoom,
      pitch: 60,
    });

    const mapboxDirections = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      profile: "mapbox/driving",
      alternatives: false,
      geometries: "geojson",
      controls: { instructions: true },
      flyTo: true,
      exclude: "motorway",
    });

    map.current.addControl(mapboxDirections, "top-left");

    setMBDirections(mapboxDirections);
    //current location
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      }),
      "top-left"
    );
    //terrain

    map.current.on("load", () => {
      map.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxZoom: 16,
      });
      map.current.setTerrain({ source: "mapbox-dem", exaggeration: 2.5 });
      map.current.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 90.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });
    });

    //route a trip
  });

  useEffect(() => {
    if (!routeDrawn && mBDirections !== null && props.coordinates) {
      console.log("drawing route line");
      const { coordinates } = props;

      // map.current.on('load', () => {
      //   map.current.addSource('route', {
      //     type: 'geojson',
      //     data: {
      //       type: 'Feature',
      //       properties: {},
      //       geometry: {
      //         type: 'LineString',
      //         coordinates: coordinates,
      //       },
      //     },
      //   });
      //   map.current.addLayer({
      //     id: 'route',
      //     type: 'line',
      //     source: 'route',
      //     layout: {
      //       'line-join': 'round',
      //       'line-cap': 'round',
      //     },
      //     paint: {
      //       'line-color': '#000000',
      //       'line-width': 8,
      //     },
      //   });
      // });

      mBDirections.setOrigin(coordinates[0]);

      mBDirections.setDestination(coordinates[coordinates.length - 1]);

      for (let i = 1; i < coordinates.length - 1; i += 1) {
        mBDirections.setWaypoint(i - 1, coordinates[i]);
      }

      setMBDirections(mBDirections);
      drawLine(true);
      // simulate mouse hover to render route line
      function simulateMouseover() {
        var event = new MouseEvent("mouseover", {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        var myTarget = document.getElementsByClassName(
          "mapbox-directions-step"
        )[0];
        var canceled = !myTarget.dispatchEvent(event);
        console.log("cancelled, ", canceled);
      }
      setTimeout(simulateMouseover, 3000);
    }
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    /*
    if (!map.current) return; // wait for map to initialize
    console.log('useEffect Triggerd........');
    console.log('map.current.on ', map.current.on);
    map.current.on('origin', test => {
      console.log('map origin: ');
      console.log('origin test: ', test);
      console.log(map.current.getOrigin());
    });
    map.current.on('destination', test => {
      console.log('map destination: ');
      console.log('dest test: ', test);
      console.log(map.current.getDestination());
    });
    map.current.on('route', test => {
      console.log('map route: ');
      console.log('route test: ', test);
      console.log(map.current.getRoute());
    });
    */
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (mBDirections !== null) {
      const origin = mBDirections.getOrigin().geometry.coordinates;
      const dest = mBDirections.getDestination().geometry.coordinates;

      if (origin.length && dest.length) {
        // save origin and dest to local storage
        localStorage.setItem("origin", JSON.stringify(origin));
        localStorage.setItem("dest", JSON.stringify(dest));
        updateRedirect(true);
      }
    }
  };

  if (redirect) return <Navigate to="/createTripForm" />;
  return (

    <div className="flex flex-col align-items-center justify-center">
      <div ref={mapContainer} className="map-container" />
      <div className="flex">
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold pt-3 pb-3 pl-10 pr-10 rounded-full"
          onClick={(e) => handleClick(e)}
        >
          Save Trip
        </button>
      </div>
    </div>
  );
}
