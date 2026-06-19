import { createBrowserRouter } from "react-router";
import Home from "./container/Homepage";
import CVPage from "./container/CV";
import Todo from "./container/Todo";
import Movies from "./container/Movies";
import Login from "./container/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "/login",
    element: <Login />,
  },
]);
