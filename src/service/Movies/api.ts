import API from "../api";
import type { DiscoverParams, GenreListResponse, MovieDetail, ResponseData, Video } from "./type";

export const getPopularMovies = async (page: number = 1) => {
  try {
    const response = await API.get(`movie/popular?page=${page}`);

    return response.data as ResponseData;
  } catch (error) {
    console.error(error);
  }
};

export const searchMovies = async (query: string) => {
  try {
    const response = await API.get(
      `search/movie?query=${encodeURIComponent(query)}&language=en-US`
    );

    return response.data as ResponseData;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieDetail = async (id: number) => {
  try {
    const response = await API.get(`movie/${id}?language=en-US`);

    return response.data as MovieDetail;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieVideos = async (id: number) => {
  try {
    const response = await API.get(`movie/${id}/videos?language=en-US`);

    return response.data.results as Video[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getGenres = async () => {
  try {
    const response = await API.get("genre/movie/list?language=en-US");

    return response.data as GenreListResponse;
  } catch (error) {
    console.error(error);
    return { genres: [] };
  }
};

export const discoverMovies = async (params: DiscoverParams) => {
  try {
    const searchParams = new URLSearchParams();
    if (params.with_genres) searchParams.set("with_genres", params.with_genres);
    if (params.primary_release_year) searchParams.set("primary_release_year", String(params.primary_release_year));
    if (params.include_adult !== undefined) searchParams.set("include_adult", String(params.include_adult));
    searchParams.set("page", String(params.page || 1));
    searchParams.set("language", "en-US");
    searchParams.set("sort_by", "popularity.desc");

    const response = await API.get(`discover/movie?${searchParams.toString()}`);

    return response.data as ResponseData;
  } catch (error) {
    console.error(error);
  }
};
