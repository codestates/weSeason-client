import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherInfo } from "../api/weather";
type StateProps = {
  weatherInfo: WeatherInfo[] | null;
  temp: number | null;
};
const initialState: StateProps = {
  weatherInfo: null,
  temp: null,
};

const weatherSlice = createSlice({
  name: "weatherReducer",
  initialState,
  reducers: {
    setWeather(state, { payload }: PayloadAction<StateProps>) {
      state.weatherInfo = payload.weatherInfo;
      state.temp = payload.temp;
    },
    setTemp(state, { payload }: PayloadAction<number>) {
      state.temp = payload;
    },
  },
});

export const { setWeather, setTemp } = weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;
