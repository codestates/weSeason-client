import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherInfo } from "../api/weather";
type StateProps = {
  weatherInfo: WeatherInfo[] | null;
};
const initialState: StateProps = {
  weatherInfo: null,
};

const weatherSlice = createSlice({
  name: "weatherReducer",
  initialState,
  reducers: {
    setWeather(state, { payload }: PayloadAction<WeatherInfo[]>) {
      state.weatherInfo = payload;
    },
  },
});

export const { setWeather } = weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;
