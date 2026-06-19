import React, { useEffect, useState } from "react";
import { getPopularMovies, type Movie } from "../../service/Movies";

export const usePopular = () => {
  const [popularMovie, setPopularMovie] = useState<Movie[]>([]);

  const getPopularMovie = async () => {
    try {
      const response = await getPopularMovies();
      if (response) {
        setPopularMovie(response.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPopularMovie();
  }, []);
  return { popularMovie };
};
