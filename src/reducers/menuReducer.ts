import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuOpen: false,
};

const menuSlice = createSlice({
  name: "menuReducer",
  initialState,
  reducers: {
    openMenu(state) {
      state.menuOpen = true;
    },
    closeMenu(state) {
      state.menuOpen = false;
    },
  },
});

export const { openMenu, closeMenu } = menuSlice.actions;

export const menuReducer = menuSlice.reducer;
