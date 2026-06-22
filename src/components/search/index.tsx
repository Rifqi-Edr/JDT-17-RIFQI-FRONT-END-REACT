import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useSearch } from "../../hooks/Movies/useSearch";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Search = ({ isOpen, onClose }: Props) => {
  const [query, setQuery] = useState("");
  const { results, loading } = useSearch(query);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSelect = (movieId: number) => {
    navigate(`/movie-page/${movieId}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg mx-4 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl shadow-black/5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/40">
          <svg
            className="w-5 h-5 text-black/30 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="flex-1 bg-transparent text-black placeholder:text-black/30 text-base outline-none"
          />
          <button
            onClick={onClose}
            className="text-black/30 hover:text-black/60 transition-colors text-sm px-2"
          >
            ✕
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {loading && (
            <div className="px-5 py-8 text-center text-black/30 text-sm">
              Searching...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="px-5 py-8 text-center text-black/30 text-sm">
              No movies found
            </div>
          )}

          {results.map((movie) => (
            <button
              key={movie.id}
              onClick={() => handleSelect(movie.id)}
              className="w-full flex items-center gap-4 px-5 py-3 hover:bg-white/40 transition-colors text-left"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt=""
                  className="w-10 h-14 rounded-lg object-cover shrink-0"
                />
              ) : (
                <div className="w-10 h-14 rounded-lg bg-white/30 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-black truncate">
                  {movie.original_title}
                </p>
              </div>
              <span className="text-sm text-black/50 shrink-0">
                {movie.vote_average?.toFixed(1) ?? "—"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
