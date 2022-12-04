import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import allUsers from './reducers/allUsers';
import trip from './reducers/trip';
import user from './reducers/user';

const reducer = combineReducers({
  allUsers,
  trip,
  user,
});

const store = configureStore({
  reducer,
});

export default store;
