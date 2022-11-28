import React from "react";
import "./App.scss";
import MovieList from "./pages/MovieList";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import MovieSummary, {
  loader as movieSummaryLoader,
} from "./pages/MovieSummaryPage";
import FooterInjector from "./pages/FooterInjector";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<FooterInjector />}>
      <Route path="/search" element={<MovieList />} />
      <Route
        path="search/:movieId"
        element={<MovieSummary />}
        loader={movieSummaryLoader}
      ></Route>
    </Route>
  )
);

function App() {
  return (
    <React.Fragment>
      <main>
        <RouterProvider router={router} />
      </main>
    </React.Fragment>
  );
}

export default App;
