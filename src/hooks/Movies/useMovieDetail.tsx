import { useEffect, useState } from "react";
import { getMovieDetail, type MovieDetail } from "../../service/Movies";

export const useMovieDetail = (movieId: number) => {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);

  const getDetail = async () => {
    try {
      const response = await getMovieDetail(movieId);
      if (response) {
        setMovieDetail(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetail();
  }, [movieId]);

  return { movieDetail };
};
