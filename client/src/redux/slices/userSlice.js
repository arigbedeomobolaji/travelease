import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducer: {
    getUser: (state, action) => {
      console.log("I'm here", state, action);
    },
  },
});

export const { getUser } = userSlice.actions;

export const selectUser = (state) => state.user;

const userReducer = userSlice.reducer;

export default userReducer;
