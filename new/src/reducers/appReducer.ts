import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  init: false,
};

const appSlice = createSlice({
  name: "appReducer",
  initialState,
  reducers: {
    setAccessToken(state, { payload }: PayloadAction<string>) {
      state.accessToken = payload;
      state.init = true;
    },
  },
});

export const { setAccessToken } = appSlice.actions;

export const appReducer = appSlice.reducer;
