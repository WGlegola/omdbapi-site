import React from "react";
import MovieList from "./pages/MovieList";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import MovieSummary from "./pages/MovieSummaryPage";
import FooterInjector from "./pages/FooterInjector";
import movieLoader from "./loaders/movie-loader";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<FooterInjector />}>
      <Route path="search" element={<MovieList />}></Route>
      <Route
        path="search/:movieId"
        element={<MovieSummary />}
        loader={movieLoader}
      />
    </Route>
  )
);

function App() {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
