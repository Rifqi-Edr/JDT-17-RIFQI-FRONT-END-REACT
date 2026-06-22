import { useNavigate } from "react-router";
import type { Movie } from "../../service/Movies";

interface Props {
  movie: Movie;
}

const MoviesComponent = ({ movie }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative group cursor-pointer rounded-3xl p-3 transition-all duration-500 bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:bg-white/55 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:scale-[1.02] hover:-translate-y-1"
      onClick={() => navigate(`/movie-page/${movie.id}`)}
    >
      {/* Glass highlight reflection */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-br from-white/40 via-transparent to-transparent" />

      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 z-10 rounded-2xl pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        <div className="absolute inset-0 z-10 rounded-2xl pointer-events-none bg-gradient-to-br from-white/20 via-white/5 to-transparent" />

        <img
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt={movie.original_title}
          className="w-full aspect-[2/3] object-cover"
        />

        <span className="absolute top-2.5 right-2.5 z-20 text-sm text-black px-2.5 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/40 overflow-hidden">
          <span className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-white/40 via-transparent to-transparent" />
          <span className="relative">{movie.vote_average?.toFixed(1) ?? "—"}</span>
        </span>
      </div>

      <p className="relative mt-3 text-base font-bold text-black text-center truncate px-1">
        {movie.original_title}
      </p>
    </div>
  );
};

export default MoviesComponent;
