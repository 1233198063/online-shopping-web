import { createSlice } from '@reduxjs/toolkit';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../service/config';

// const auth = getAuth();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.currentUser;

export const startAuthListener = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(clearUser());
    }
  });
};

export const logout = () => async (dispatch) => {
  await signOut(auth);
  dispatch(clearUser());
};

const authReducer = authSlice.reducer
export default authReducer;