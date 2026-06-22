import { useEffect, useState } from "react";
import { getMovieVideos, type Video } from "../../service/Movies";

export const useMovieVideos = (movieId: number) => {
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const videos = await getMovieVideos(movieId);
      const trailerVideo =
        videos?.find(
          (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
        ) ?? null;
      setTrailer(trailerVideo);
      setLoading(false);
    };

    fetchVideos();
  }, [movieId]);

  return { trailer, loading };
};
