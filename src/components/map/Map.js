import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "../../map.css";

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_KEY}`;

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-113.9);
  const [lat, setLat] = useState(48.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/nutmegs1/clb2fo0ua000a14mj5t28j8c3",
      center: [lng, lat],
      zoom: zoom,
      pitch: 60,
    });
    map.current.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
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
    map.current.on("load", () => {
      map.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [-113.981158, 48.494984],
              [-113.981299, 48.495113],
              [-113.981345, 48.495155],
              [-113.981715, 48.495482],
              [-113.981794, 48.495544],
              [-113.982215, 48.495874],
              [-113.982443, 48.496038],
              [-113.982645, 48.496184],
              [-113.983018, 48.496468],
              [-113.983636, 48.496968],
              [-113.984237, 48.497434],
              [-113.985322, 48.498271],
              [-113.985711, 48.498567],
              [-113.98589, 48.498696],
              [-113.986283, 48.49898],
              [-113.986981, 48.499588],
              [-113.98724, 48.499849],
              [-113.987704, 48.500404],
              [-113.988134, 48.501106],
              [-113.988314, 48.501472],
              [-113.988478, 48.501947],
              [-113.988564, 48.50228],
              [-113.988589, 48.502424],
              [-113.988664, 48.503377],
              [-113.988645, 48.503693],
              [-113.988596, 48.503996],
              [-113.988527, 48.50429],
              [-113.98833, 48.504849],
              [-113.987967, 48.505707],
              [-113.987795, 48.505921],
              [-113.987556, 48.506372],
              [-113.987411, 48.506796],
              [-113.987274, 48.507314],
              [-113.986808, 48.508386],
              [-113.986787, 48.508436],
              [-113.986529, 48.509054],
              [-113.986474, 48.509237],
              [-113.986445, 48.50931],
              [-113.986366, 48.509589],
              [-113.986316, 48.509876],
              [-113.986289, 48.510339],
              [-113.986379, 48.510809],
              [-113.986505, 48.511214],
              [-113.986863, 48.511893],
              [-113.989675, 48.516599],
              [-113.990014, 48.51721],
              [-113.990163, 48.517514],
              [-113.990282, 48.517819],
              [-113.990358, 48.518127],
              [-113.990397, 48.518591],
              [-113.990362, 48.519049],
              [-113.990255, 48.519494],
              [-113.99014, 48.51978],
              [-113.989908, 48.520196],
              [-113.989722, 48.520463],
              [-113.988644, 48.521762],
            ],
          },
        },
      });
      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          lineJoin: "round",
          lineCap: "round",
        },
        paint: {
          lineColor: "#000000",
          lineWidth: 80,
        },
      });
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
