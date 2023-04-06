import Axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { API_HOST } from "Constants";

//axios을 그냥 쓴 녀석들은 이걸 이용한다
export const axiosInstance = Axios.create({
  baseURL: API_HOST,
});

//useAxios을 이용한 녀석들은 이것을 이용한다.
export const useAxios = makeUseAxios({
  axios: axiosInstance,
});
