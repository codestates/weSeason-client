import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  width: document.documentElement.clientWidth + 15,
};

const pageWidthSlice = createSlice({
  name: "pageWidthSlice",
  initialState,
  reducers: {
    changeCurrentPageWidth(state, action) {
      const clientWidth = action.payload;
      state.width = clientWidth + 15;
    },
  },
});

export const { changeCurrentPageWidth } = pageWidthSlice.actions;

export const pageWidthReducer = pageWidthSlice.reducer;
