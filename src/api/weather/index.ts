import axios from 'axios';
import { API_URL } from '../../const';

export type Weather = {
  description: string;
  icon: string;
  main: string;
};

export type WeatherInfo = {
  dt: number;
  temp: number;
  weather: Weather[];
};

type GetWeaterRes = {
  data: WeatherInfo[];
};

export const getWeater = async (lat: number, lon: number) => {
  const { data } = await axios.get<GetWeaterRes>(`${API_URL}/weather`, {
    params: { lat, lon },
  });

  return data.data;
};
