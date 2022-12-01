import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '../../map.css';
import toTheSunCoordinates from './testCoordinates.json';

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
      style: 'mapbox://styles/nutmegs1/clb2fo0ua000a14mj5t28j8c3',
      center: [lng, lat],
      zoom: zoom,
      pitch: 60,
    });
    map.current.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        profile: 'mapbox/driving',
        alternatives: false,
        geometries: 'geojson',
        controls: { instructions: true },
        flyTo: true,
      }),
      'top-left'
    );
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
      'top-left'
    );
    //terrain
    map.current.on('load', () => {
      map.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxZoom: 16,
      });
      map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 2.5 });
      map.current.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15,
        },
      });
    });
    console.log('map.current.on({route})', map.current.on('route'));

    //route a trip
    map.current.on('load', () => {
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: toTheSunCoordinates,
          },
        },
      });
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#000000',
          'line-width': 8,
        },
      });
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
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
  });

  return (
    <div>
      <div ref={mapContainer} className='map-container' />
    </div>
  );
}
