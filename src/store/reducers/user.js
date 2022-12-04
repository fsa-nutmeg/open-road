import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase-config';
import { ref, child, get } from 'firebase/database';

const dbRef = ref(db);

// Slice
const slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    getUser: (state, action) => {
      if (state.user?.id !== action.payload?.id)
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
      user.id = userId;
      dispatch(getUser(user));
    } else {
      return console.log('No data available');
    }
  } catch (err) {
    return console.log(err);
  }
};
