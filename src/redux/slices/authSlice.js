import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    accessToken: "",
    username: "",
    userId: "",
  },
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
