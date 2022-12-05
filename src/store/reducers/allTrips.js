import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase-config';
import { ref, child, get, push, update } from 'firebase/database';

const dbRef = ref(db);

// Slice
const slice = createSlice({
  name: 'allTrips',
  initialState: {
    allTrips: [],
  },
  reducers: {
    getAllTrips: (state, action) => {
      const allTrips = JSON.stringify(state.allTrips);
      const payload = JSON.stringify(action.payload);
      if (allTrips !== payload) state.allTrips = action.payload;
    },
  },
});

export default slice.reducer;

const { getAllTrips } = slice.actions;

export const fetchAllTrips = () => async dispatch => {
  try {
    const snapshot = await get(child(dbRef, `/trips`));
    if (snapshot.exists()) {
      const allTrips = snapshot.val();
      const payload = Object.entries(allTrips).map(([id, trip]) => {
        trip.id = id;
        return trip;
      });
      dispatch(getAllTrips(payload));
    } else {
      return console.log('No data available');
    }
  } catch (err) {
    return console.log(err);
  }
};
