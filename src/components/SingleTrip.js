import React, { useState, useEffect } from 'react';
import Map from './map/Map';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchTrip } from '../store/reducers/trip';
import Navbar from './Navbar';

const SingleTrip = props => {
  const dispatch = useDispatch();
  const { trip } = useSelector(state => state.trip);

  const path = useLocation().pathname;
  const tripIdx = path.indexOf('/trips/');

  // trip id can be passed through local storage or in the url path
  // the url path trip id will take priority
  const tripId =
    tripIdx === -1 ? localStorage.getItem('tripId') : path.slice(tripIdx + 7);

  if (trip?.id !== tripId) {
    dispatch(fetchTrip(tripId));
    return <div>Loading Trip...</div>;
  }

  const { coordinates, curveFactor, featured, likes, name, owner, id } = trip;
  return (
    <div>
      <Navbar />
      <div className='flex justify-center'>
        <Map coordinates={trip.coordinates} />
      </div>
      <h1>TRIP INFO</h1>
      <h2>coordinates</h2>
      {coordinates.map(tuple => (
        <p>{`[${tuple[0]}, ${tuple[1]}]`}</p>
      ))}
      <h2>curveFactor</h2>
      <p>{curveFactor}</p>
      <h2>featured</h2>
      <p>{featured}</p>
      <h2>likes</h2>
      <p>{likes}</p>
      <h2>name</h2>
      <p>{name}</p>
      <h2>owner</h2>
      <p>{owner}</p>
      <h2>trip id</h2>
      <p>{id}</p>
    </div>
  );
};

export default SingleTrip;
