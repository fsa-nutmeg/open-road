import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase-config';
import { ref, child, get } from 'firebase/database';

const dbRef = ref(db);

// SLICE
const slice = createSlice({
  name: 'allUsers',
  initialState: {
    allUsers: [],
  },
  reducers: {
    getAllUsers: (state, action) => {
      if (JSON.stringify(state.allUsers) != JSON.stringify(action.payload))
      state.allUsers = action.payload;
      },
  },
});

export default slice.reducer;

// ACTIONS
const { getAllUsers } = slice.actions;

export const fetchAllUsers = () => async dispatch => {
  try {
    const snapshot = await get(child(dbRef, `/users`));
    if(snapshot.exists()) {
      const allUsers = snapshot.val();
      const payload = Object.entries(allUsers).map(([ id, user ]) => {
        user.id = id;
        return user;
      })
      dispatch(getAllUsers(payload));

    } else {
      return console.log('No data available');
    }
  } catch (err) {
    return console.log(err);
  }
};
