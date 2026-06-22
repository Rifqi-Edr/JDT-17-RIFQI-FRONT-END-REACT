import { useEffect, useState } from "react";
import { getPopularMovies, type Movie } from "../../service/Movies";

export const usePopular = (page: number = 1) => {
  const [popularMovie, setPopularMovie] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const getPopularMovie = async () => {
    try {
      const response = await getPopularMovies(page);
      if (response) {
        setPopularMovie(response.results);
        setTotalPages(response.total_pages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPopularMovie();
  }, [page]);

  return { popularMovie, totalPages };
};
