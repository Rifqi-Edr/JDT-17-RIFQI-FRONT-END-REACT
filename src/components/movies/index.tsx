import React from "react";
import type { Movie } from "../../service/Movies";
import { Label } from "../label";

interface Props {
  movie: Movie;
}

const MoviesComponent = ({ movie }: Props) => {
  return (
    <div className="w-full flex items-center cursor-pointer">
      <div className="flex flex-col">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt=""
          width={50}
          height={50}
        />
        <div className="flex    ">
          <Label>{movie.original_title}</Label>
        </div>
      </div>
    </div>
  );
};

export default MoviesComponent;
