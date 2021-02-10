import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const appSlice = createSlice({
  name: "appReducer",
  initialState: initialState,
  reducers: {
    setName(state, { payload }) {
      state.name = payload;
    },
  },
});
export const { setName } = appSlice.actions;
export const appReducer = appSlice.reducer;
