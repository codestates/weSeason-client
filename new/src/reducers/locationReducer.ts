import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: 37.55519305862982,
  lon: 126.9707879543135,
};

const locationSlice = createSlice({
  name: "locationReducer",
  initialState,
  reducers: {
    userLat(state, action) {
      const lat = action.payload;
      state.lat = lat;
    },
    userLon(state, action) {
      const lon = action.payload;
      state.lon = lon;
    },
  },
});

export const { userLat, userLon } = locationSlice.actions;

export const locationReducer = locationSlice.reducer;
