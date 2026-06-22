import { useMovieDetail } from '@/hooks/Movies/useMovieDetail';
import { useMovieVideos } from '@/hooks/Movies/useMovieVideos';
import { useParams } from 'react-router';

const MovieDetails = () => {
  const { movieId } = useParams();
  const { movieDetail } = useMovieDetail(Number(movieId));
  const { trailer, loading: trailerLoading } = useMovieVideos(Number(movieId));

  if (!movieDetail) {
    return (
      <div className="flex justify-center items-center min-h-full">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="relative shrink-0">
          <span className="absolute inset-0 rounded-3xl pointer-events-none bg-linear-to-br from-white/30 via-white/5 to-transparent z-10" />
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
            alt={movieDetail.original_title}
            className="w-56 rounded-3xl shadow-lg shadow-black/5"
          />
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-semibold text-slate-800 tracking-wide">
            {movieDetail.original_title}
          </h1>

          <div className="flex gap-5 text-base text-slate-500 tracking-wide">
            <span>{movieDetail.release_date}</span>
            <span className="text-slate-300">·</span>
            <span>{movieDetail.runtime} min</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {movieDetail.genres.map((genre) => (
              <span
                key={genre.id}
                className="relative px-4 py-1.5 bg-white/40 backdrop-blur-sm border border-white/40 text-black rounded-full text-base tracking-wide overflow-hidden"
              >
                <span className="absolute inset-0 rounded-full pointer-events-none bg-linear-to-br from-white/30 via-transparent to-transparent" />
                <span className="relative">{genre.name}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-300 text-xl">★</span>
            <span className="text-xl font-semibold text-slate-700">
              {movieDetail.vote_average.toFixed(1)}
            </span>
            <span className="text-slate-500 text-sm">/ 10</span>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-700 mb-3 tracking-wide">
              Synopsis
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {movieDetail.overview}
            </p>
          </div>

          {/* Trailer */}
          {trailerLoading && (
            <div className="rounded-3xl bg-white/20 animate-pulse aspect-video w-full" />
          )}

          {!trailerLoading && trailer && (
            <div className="relative rounded-3xl overflow-hidden bg-white/30 backdrop-blur-sm border border-white/40">
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
