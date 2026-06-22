import { useEffect, useState, useRef } from "react";
import { searchMovies, type Movie } from "../../service/Movies";

export const useSearch = (query: string) => {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef<number>(0);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      try {
        const data = await searchMovies(query);
        if (data) {
          setResults(data.results.slice(0, 8));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer.current);
  }, [query]);

  return { results, loading };
};
