import { createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../service/config';

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
      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }));
    } else {
      dispatch(clearUser());
    }
  });
};

export const logout = () => async (dispatch) => {
  await signOut(auth);
  dispatch(clearUser());
};
export const selectIsAuthenticated = (state) => !!state.auth.currentUser;


const authReducer = authSlice.reducer
export default authReducer;