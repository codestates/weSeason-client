import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  width: window.innerWidth,
};

const pageWidthSlice = createSlice({
  name: "pageWidthSlice",
  initialState,
  reducers: {
    changeCurrentPageWidth(state, action) {
      const clientWidth = action.payload;
      state.width = clientWidth;
    },
  },
});

export const { changeCurrentPageWidth } = pageWidthSlice.actions;

export const pageWidthReducer = pageWidthSlice.reducer;
