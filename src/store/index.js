import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import user from './reducers/user';
import allUsers from './reducers/allUsers';

const reducer = combineReducers({
  user,
  allUsers,
});

const store = configureStore({
  reducer,
});

export default store;
