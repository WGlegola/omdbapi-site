import React, { Fragment } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import SearchContext from "./store/search-context";
import MovieList from "./components/MovieList";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  useNavigate,
} from "react-router-dom";
import MoviePane from "./components/MoviePane";
import MovieSummary, {
  loader as movieSummaryLoader,
} from "./components/MovieSummary";
import { Outlet } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SearchForm />}>
      <Route path="/search/*" element={<MoviePane />}>
        <Route
          path=":movieId"
          element={<MovieSummary />}
          loader={movieSummaryLoader}
        />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
}

export default App;
