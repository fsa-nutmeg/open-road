import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrip } from '../store/reducers/trip';

const SingleTrip = props => {
  const dispatch = useDispatch();
  const { trip } = useSelector(state => state.trip);

  // trip id can be passed to props or stored in local storage
  const tripId = props.tripId || localStorage.getItem('tripId');

  if (trip?.id !== tripId) {
    dispatch(fetchTrip(tripId));
    return <div>Loading Trip...</div>;
  }

  const { coordinates, curveFactor, featured, likes, name, owner, id } = trip;
  console.log(coordinates);
  return (
    <div>
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
