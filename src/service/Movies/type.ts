export interface ResponseData {
  total_results: number;
  total_pages: number;
  page: number;
  results: Movie[];
}

export interface Movie {
  id: number;
  overview: string;
  original_title: string;
  poster_path: string;
  vote_average: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetail {
  id: number;
  runtime: number;
  genres: Genre[];
  release_date: string;
  vote_average: number;
  overview: string;
  original_title: string;
  poster_path: string;
}

export interface Video {
  key: string;
  site: string;
  type: string;
  name: string;
}

export interface GenreListResponse {
  genres: Genre[];
}

export interface DiscoverParams {
  with_genres?: string;
  primary_release_year?: number;
  include_adult?: boolean;
  page?: number;
}
