import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Authenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.Authenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.Authenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
