import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
};

const accessTokenSlice = createSlice({
  name: "accessTokenSlice",
  initialState,
  reducers: {
    importAccessToken(state, action) {
      const token = action.payload;
      state.accessToken = token;
    },
  },
});

export const { importAccessToken } = accessTokenSlice.actions;

export const accessTokenReducer = accessTokenSlice.reducer;
