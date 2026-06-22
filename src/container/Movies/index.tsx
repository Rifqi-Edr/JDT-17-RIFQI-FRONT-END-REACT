import { useEffect, useState } from "react";
import { ACCESS_TOKEN, BASE_URL } from "../../constant";
import { usePopular } from "../../hooks/Movies/usePopular";
import { discoverMovies } from "../../service/Movies";
import MoviesComponent from "../../components/movies";
import Search from "../../components/search";
import Filter from "../../components/filter";
import type { Movie } from "../../service/Movies";

type Tab = "now_playing" | "popular" | "upcoming" | "top_rated";

interface FilterState {
  year: number | null;
  genres: number[];
  adult: boolean;
}

const Movies = () => {
  const [nowPlayingList, setNowPlayingList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tab, setTab] = useState<Tab>("now_playing");
  const [page, setPage] = useState(1);
  const [nowPlayingTotalPages, setNowPlayingTotalPages] = useState(1);
  const [upcomingList, setUpcomingList] = useState<Movie[]>([]);
  const [upcomingTotalPages, setUpcomingTotalPages] = useState(1);
  const [topRatedList, setTopRatedList] = useState<Movie[]>([]);
  const [topRatedTotalPages, setTopRatedTotalPages] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ year: null, genres: [], adult: false });
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [filteredTotalPages, setFilteredTotalPages] = useState(1);

  const filtersApplied = filters.year !== null || filters.genres.length > 0 || filters.adult;

  const { popularMovie, totalPages: popularTotalPages } = usePopular(
    filtersApplied ? 1 : page
  );

  const fetchFiltered = async (pageNum: number) => {
    setLoading(true);
    try {
      const data = await discoverMovies({
        primary_release_year: filters.year ?? undefined,
        with_genres: filters.genres.length > 0 ? filters.genres.join(",") : undefined,
        include_adult: filters.adult || undefined,
        page: pageNum,
      });
      if (data) {
        setFilteredMovies(data.results);
        setFilteredTotalPages(data.total_pages);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filtersApplied) {
      fetchFiltered(page);
    }
  }, [page, filters]);

  const getNowPlayingList = (pageNum: number) => {
    setLoading(true);
    fetch(BASE_URL + `movie/now_playing?page=${pageNum}&language=en-US`, {
      method: "get",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setNowPlayingList(response.results);
        setNowPlayingTotalPages(response.total_pages);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!filtersApplied) {
      if (tab === "now_playing") getNowPlayingList(page);
      else if (tab === "upcoming") getUpcomingList(page);
      else if (tab === "top_rated") getTopRatedList(page);
    }
  }, [page, tab, filtersApplied]);

  const getUpcomingList = (pageNum: number) => {
    setLoading(true);
    fetch(BASE_URL + `movie/upcoming?page=${pageNum}&language=en-US`, {
      method: "get",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setUpcomingList(response.results);
        setUpcomingTotalPages(response.total_pages);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getUpcomingList(1);
  }, []);

  const getTopRatedList = (pageNum: number) => {
    setLoading(true);
    fetch(BASE_URL + `movie/top_rated?page=${pageNum}&language=en-US`, {
      method: "get",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setTopRatedList(response.results);
        setTopRatedTotalPages(response.total_pages);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getTopRatedList(1);
  }, []);

  const handleTabChange = (newTab: Tab) => {
    setTab(newTab);
    setPage(1);
    setFilters({ year: null, genres: [], adult: false });
  };

  const movies = filtersApplied
    ? filteredMovies
    : tab === "now_playing"
    ? nowPlayingList
    : tab === "popular"
    ? popularMovie
    : tab === "upcoming"
    ? upcomingList
    : topRatedList;
  const totalPages = filtersApplied
    ? filteredTotalPages
    : tab === "now_playing"
    ? nowPlayingTotalPages
    : tab === "popular"
    ? popularTotalPages
    : tab === "upcoming"
    ? upcomingTotalPages
    : topRatedTotalPages;
  const showLoading = loading;

  return (
    <div className="min-h-full">
      <div className="max-w-6xl mx-auto px-8 py-16 font-indie">
        {/* Tabs + Filter + Search */}
        <div className="flex items-center gap-3 mb-10">
          <button
            onClick={() => handleTabChange("now_playing")}
            className={`relative overflow-hidden cursor-pointer px-5 py-2.5 rounded-full text-base font-medium tracking-wide transition-all duration-300 ${
              tab === "now_playing" && !filtersApplied
                ? "bg-white/60 backdrop-blur-md border border-white/50 text-black shadow-sm"
                : "bg-transparent border border-transparent text-black/40 hover:text-black/60"
            }`}
          >
            {tab === "now_playing" && !filtersApplied && (
              <span className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-transparent" />
            )}
            <span className="relative">Now Playing</span>
          </button>
          <button
            onClick={() => handleTabChange("popular")}
            className={`relative overflow-hidden cursor-pointer px-5 py-2.5 rounded-full text-base font-medium tracking-wide transition-all duration-300 ${
              tab === "popular" && !filtersApplied
                ? "bg-white/60 backdrop-blur-md border border-white/50 text-black shadow-sm"
                : "bg-transparent border border-transparent text-black/40 hover:text-black/60"
            }`}
          >
            {tab === "popular" && !filtersApplied && (
              <span className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-transparent" />
            )}
            <span className="relative">Popular</span>
          </button>
          <button
            onClick={() => handleTabChange("upcoming")}
            className={`relative overflow-hidden cursor-pointer px-5 py-2.5 rounded-full text-base font-medium tracking-wide transition-all duration-300 ${
              tab === "upcoming" && !filtersApplied
                ? "bg-white/60 backdrop-blur-md border border-white/50 text-black shadow-sm"
                : "bg-transparent border border-transparent text-black/40 hover:text-black/60"
            }`}
          >
            {tab === "upcoming" && !filtersApplied && (
              <span className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-transparent" />
            )}
            <span className="relative">Upcoming</span>
          </button>
          <button
            onClick={() => handleTabChange("top_rated")}
            className={`relative overflow-hidden cursor-pointer px-5 py-2.5 rounded-full text-base font-medium tracking-wide transition-all duration-300 ${
              tab === "top_rated" && !filtersApplied
                ? "bg-white/60 backdrop-blur-md border border-white/50 text-black shadow-sm"
                : "bg-transparent border border-transparent text-black/40 hover:text-black/60"
            }`}
          >
            {tab === "top_rated" && !filtersApplied && (
              <span className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-transparent" />
            )}
            <span className="relative">Top Rated</span>
          </button>

          {/* Filter button */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`relative overflow-hidden cursor-pointer px-5 py-2.5 rounded-full text-base font-medium tracking-wide transition-all duration-300 ${
                filtersApplied
                  ? "bg-white/60 backdrop-blur-md border border-white/50 text-black shadow-sm"
                  : filterOpen
                  ? "bg-white/60 backdrop-blur-md border border-white/50 text-black shadow-sm"
                  : "bg-transparent border border-transparent text-black/40 hover:text-black/60"
              }`}
            >
              {(filtersApplied || filterOpen) && (
                <span className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-transparent" />
              )}
              <span className="relative">
                Filters{filtersApplied ? ` (${filters.genres.length + (filters.year ? 1 : 0) + (filters.adult ? 1 : 0)})` : ""}
              </span>
            </button>

            {filterOpen && (
              <Filter
                filters={filters}
                onChange={(f) => {
                  setFilters(f);
                  setPage(1);
                }}
                onClose={() => setFilterOpen(false)}
              />
            )}
          </div>

          <div className="flex-1" />

          <button
            onClick={() => setSearchOpen(true)}
            className="relative overflow-hidden cursor-pointer w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/50 flex items-center justify-center hover:bg-white/60 transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-transparent" />
            <svg
              className="w-5 h-5 text-black/40"
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
          </button>
        </div>

        {/* Grid */}
        {showLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white/30 animate-pulse aspect-[2/3]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {movies.map((el) => (
              <MoviesComponent key={el.id} movie={el} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="relative overflow-hidden cursor-pointer px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 bg-white/40 backdrop-blur-md border border-white/50 text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/60"
          >
            <span className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-transparent" />
            <span className="relative">◀ Prev</span>
          </button>

          <span className="text-sm text-black/50 font-medium tracking-wide">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="relative overflow-hidden cursor-pointer px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 bg-white/40 backdrop-blur-md border border-white/50 text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/60"
          >
            <span className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-transparent" />
            <span className="relative">Next ▶</span>
          </button>
        </div>
      </div>

      <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default Movies;
