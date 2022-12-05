import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createTrip } from '../store/reducers/trip';

const CreateTripForm = () => {
  const dispatch = useDispatch();

  const [originLat, originLong] = JSON.parse(localStorage.getItem('origin'));
  const [destLat, destLong] = JSON.parse(localStorage.getItem('dest'));
  const uid = localStorage.getItem('uid') || null;

  const [formData, setFormData] = useState({
    name: '',
    originLat: originLat,
    originLong: originLong,
    destLat: destLat,
    destLong: destLong,
    uid: uid,
  });

  const [redirect, updateRedirect] = useState(false);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.name.length) {
      alert('Please name your route before submitting.');
    } else {
      const { name, originLat, originLong, destLat, destLong, uid } = formData;
      const trip = {};
      trip.name = name;
      trip.owner = uid;
      trip.coordinates = [
        [+originLat, +originLong],
        [+destLat, +destLong],
      ];
      dispatch(createTrip(trip));
      updateRedirect(true);
    }
  };

  if (redirect) {
    // redirect to single trip page
    const tripId = localStorage.getItem('tripId');
    return <Navigate to={`../trips/${tripId}`} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Save Your Trip</h2>
      <label>
        {'Trip Name: '}
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <h3>Trip Origin</h3>
      <label>
        {'Lattitude: '}
        <input
          type='text'
          name='originLat'
          value={formData.originLat}
          onChange={handleChange}
        />
      </label>
      <label>
        {'Longitude: '}
        <input
          type='text'
          name='originLong'
          value={formData.originLong}
          onChange={handleChange}
        />
      </label>
      <h3>Trip Distination</h3>
      <label>
        {'Lattitude: '}
        <input
          type='text'
          name='destLat'
          value={formData.destLat}
          onChange={handleChange}
        />
      </label>
      <label>
        {'Longitude: '}
        <input
          type='text'
          name='destLong'
          value={formData.destLong}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSubmit}>Save</button>
    </form>
  );
};

export default CreateTripForm;
