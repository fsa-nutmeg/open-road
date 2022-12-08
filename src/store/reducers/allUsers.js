import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase-config';
import { ref, child, get, update, push, set } from 'firebase/database';
import { fetchUser } from './user';
const dbRef = ref(db);

// SLICE
const slice = createSlice({
  name: 'allUsers',
  initialState: {
    allUsers: [],
  },
  reducers: {
    getAllUsers: (state, action) => {
      if (JSON.stringify(state.allUsers) !== JSON.stringify(action.payload))
      state.allUsers = action.payload;
      },
    createUser: (state, action) => {
      state.allUsers = [...state.allUsers, action.payload];

    }
  },
});
//TODO make create user and check if user exists thunk
export default slice.reducer;

// ACTIONS
const { getAllUsers } = slice.actions;
const { createUser } = slice.actions;

export const createNewUser = (UID, identifier) => async dispatch => {
  try {
//const newUserKey = push(child(ref(db), 'users')).key
const updates = {}
const user = {}
user.mileage = 0;
user.identifier = identifier;
user.admin = false;
updates['/users/'+ UID] = user;
await update(ref(db), updates)
dispatch(createUser(user));
dispatch(fetchUser(UID));
  } catch (err) {
    return console.log(err)
  }
}

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
