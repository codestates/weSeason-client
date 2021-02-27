import { createSlice } from '@reduxjs/toolkit';

type WidthStateType = {
  width: number;
};

const initialState: WidthStateType = {
  width: window.innerWidth,
};

const pageWidthSlice = createSlice({
  name: 'pageWidthSlice',
  initialState,
  reducers: {
    changeCurrentPageWidth(state, action) {
      const clientWidth: number = action.payload;
      state.width = clientWidth;
    },
  },
});

export const { changeCurrentPageWidth } = pageWidthSlice.actions;

export const pageWidthReducer = pageWidthSlice.reducer;
