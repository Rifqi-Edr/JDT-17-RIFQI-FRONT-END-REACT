import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN, BASE_URL } from "../../constant";
import Box from "../../components/box";
import { usePopular } from "../../hooks/Movies/usePopular";
import MoviesComponent from "../../components/movies";
import { useToken } from "@/hooks/useToken";

const Movies = () => {
  const [nowPlayingList, setNowPlayingList] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { popularMovie } = usePopular();


  const getNowPlayingList = (page: number) => {
    fetch(BASE_URL + `movie/now_playing?page=${page}&language=en-US`, {
      method: "get",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setNowPlayingList(response.results);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getNowPlayingList(1);
    return () => {};
  }, []);

  console.log({ popularMovie });

  return (
    <>
      <div className="">
        <h1>Now Playing List</h1>
        <div className="flex gap-2">
          {loading ? (
            <>{/* Spinner here for indicate user system still hitting api */}</>
          ) : (
            nowPlayingList.map((el, index) => {
              return <MoviesComponent movie={el} />;
            })
          )}
        </div>
        <h1>Popular Movies</h1>
        <div className="flex flex-row gap-4">
          {popularMovie.map((el) => {
            return <MoviesComponent movie={el} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Movies;
