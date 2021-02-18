import axios from "axios";
import { API_URL } from "../../const";

type getClothesByTempRes = {
  data: { cloth: string[] };
};
export const getClothesByTemp = async (temp: number) => {
  const { data } = await axios.get<getClothesByTempRes>(
    `${API_URL}/clothes?temp=${temp}`
  );
  return data.data.cloth;
};
