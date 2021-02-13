import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
};

const appSlice = createSlice({
  name: "appReducer",
  initialState,
  reducers: {
    setAccessToken(state, { payload }: PayloadAction<string>) {
      state.accessToken = payload;
    },
  },
});

export const { setAccessToken } = appSlice.actions;

export const appReducer = appSlice.reducer;
