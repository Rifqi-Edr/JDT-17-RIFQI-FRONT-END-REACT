import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
// import "./App.css";;
import { TokenProvider } from "./hooks/useToken.tsx";
import { routes } from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TokenProvider>
      <RouterProvider router={routes} />
    </TokenProvider>
  </StrictMode>,
);
