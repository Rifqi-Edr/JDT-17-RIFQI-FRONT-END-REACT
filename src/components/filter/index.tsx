import { useState } from "react";
import { useGenres } from "../../hooks/Movies/useGenres";

interface FilterState {
  year: number | null;
  genres: number[];
  adult: boolean;
}

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose: () => void;
}

const YEARS = Array.from({ length: 65 }, (_, i) => new Date().getFullYear() - i);

const Filter = ({ filters, onChange, onClose }: Props) => {
  const genres = useGenres();
  const [local, setLocal] = useState<FilterState>(filters);

  const toggleGenre = (id: number) => {
    setLocal((prev) => ({
      ...prev,
      genres: prev.genres.includes(id)
        ? prev.genres.filter((g) => g !== id)
        : [...prev.genres, id],
    }));
  };

  const hasFilters = local.year || local.genres.length > 0 || local.adult;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 cursor-pointer" onClick={onClose} />

      {/* Panel */}
      <div className="absolute top-full left-0 mt-2 z-50 w-[calc(100vw-2rem)] max-w-80 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl shadow-black/5 p-4 md:p-5 font-indie">
        {/* Year */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black/60 mb-1.5">
            Year
          </label>
          <select
            value={local.year ?? ""}
            onChange={(e) =>
              setLocal({ ...local, year: e.target.value ? Number(e.target.value) : null })
            }
            className="w-full px-3 py-2 rounded-xl bg-white/40 border border-white/40 text-black text-sm outline-none"
          >
            <option value="">Any year</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Genres */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black/60 mb-1.5">
            Genres
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
            {genres.map((g) => {
              const active = local.genres.includes(g.id);
              return (
                <button
                  key={g.id}
                  onClick={() => toggleGenre(g.id)}
                  className={`px-2.5 py-1 rounded-full text-xs transition-all ${
                    active
                      ? "bg-white/60 border border-white/50 text-black"
                      : "bg-transparent border border-transparent text-black/40 hover:text-black/60"
                  }`}
                >
                  {g.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Adult toggle */}
        <div className="mb-5 flex items-center justify-between">
          <span className="text-sm font-medium text-black/60">Adult</span>
          <button
            onClick={() => setLocal({ ...local, adult: !local.adult })}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              local.adult ? "bg-black/30" : "bg-black/10"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${
                local.adult ? "left-5.5" : "left-0.5"
              }`}
              style={{ left: local.adult ? "22px" : "2px" }}
            />
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {hasFilters && (
            <button
              onClick={() => {
                const cleared = { year: null, genres: [], adult: false };
                setLocal(cleared);
                onChange(cleared);
                onClose();
              }}
              className="flex-1 px-3 py-2 rounded-xl text-sm text-black/40 hover:text-black/60 transition-colors"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => {
              onChange(local);
              onClose();
            }}
            className="flex-1 px-3 py-2 rounded-xl text-sm font-medium bg-white/40 border border-white/50 text-black hover:bg-white/60 transition-all"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default Filter;
