import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./protectedRoutes";
import Login from "@/container/Login";
import Home from "@/container/Homepage";
import CVPage from "@/container/CV";
import Todo from "@/container/Todo";
import Movies from "@/container/Movies";
import Layout from "@/components/layout";
import MovieDetails from "@/container/MovieDetail";

export const routes = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            element: <Home />,
            index: true,
          },
          {
            path: "/cv-page",
            element: <CVPage />,
          },
          {
            path: "/todo",
            element: <Todo />,
          },
          {
            path: "/movie-page",
            element: <Movies />,
          },
          {
            path: "/movie-page/:movieId",
            element: <MovieDetails/>
          },
        ],
      },
    ],
  },
]);
