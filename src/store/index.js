import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import allTrips from './reducers/allTrips';
import allUsers from './reducers/allUsers';
import trip from './reducers/trip';
import user from './reducers/user';

const reducer = combineReducers({
  allTrips,
  allUsers,
  trip,
  user,
});

const store = configureStore({
  reducer,
});

export default store;
