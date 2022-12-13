import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase-config";
import { ref, child, get, push, update } from "firebase/database";

const dbRef = ref(db);

// Slice
const slice = createSlice({
  name: "trip",
  initialState: {
    trip: null,
  },
  reducers: {
    getTrip: (state, action) => {
      if (state.trip?.id !== action.payload?.id) state.trip = action.payload;
    },
  },
});

export default slice.reducer;

const { getTrip } = slice.actions;

export const fetchTrip = (tripId) => async (dispatch) => {
  try {
    const snapshot = await get(child(dbRef, `/trips/${tripId}`));
    if (snapshot.exists()) {
      const trip = snapshot.val();
      trip.id = tripId;
      dispatch(getTrip(trip));
    } else {
      return console.log("No data available");
    }
  } catch (err) {
    return console.log(err);
  }
};

export const createTrip = (trip) => async (dispatch) => {
  try {
    // get a key for the new trip.
    const newTripKey = push(child(ref(db), "trips")).key;
    // update new trip to local storage for use from createTripForm
    localStorage.setItem("tripId", newTripKey);
    localStorage.setItem("tripName", trip.name);

    const updates = {};
    updates["/trips/" + newTripKey] = trip;

    await update(ref(db), updates);
  } catch (err) {
    return console.log(err);
  }
};
