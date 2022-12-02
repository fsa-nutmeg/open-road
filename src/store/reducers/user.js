import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase-config';
import { getDatabase, ref, child, get } from 'firebase/database';

const dbRef = ref(db);

// Slice
const slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    getUser: (state, action) => {
      if (state.user?.refId != action.payload?.refId)
        state.user = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { getUser } = slice.actions;

export const fetchUser = userId => async dispatch => {
  try {
    const snapshot = await get(child(dbRef, `/users/${userId}`));
    if (snapshot.exists()) {
      const user = snapshot.val();
      dispatch(getUser(user));
    } else {
      return console.log('No data available');
    }
  } catch (err) {
    return console.log(err);
  }
};
