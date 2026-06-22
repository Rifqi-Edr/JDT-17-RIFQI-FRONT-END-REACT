import { useEffect, useState } from "react";
import { getGenres, type Genre } from "../../service/Movies";

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    getGenres().then((data) => {
      if (data) setGenres(data.genres);
    });
  }, []);

  return genres;
};
