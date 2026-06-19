import API from "../api";
import type { ResponseData } from "./type";

export const getPopularMovies = async () => {
  try {
    const response = await API.get("movie/popular");

    return response.data as ResponseData;
  } catch (error) {
    console.error(error);
  }
};
