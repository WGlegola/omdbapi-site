import React, { Fragment } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.scss";
// import Header from "./components/Header";
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
} from "./pages/MovieSummaryPage";
import { Outlet } from "react-router-dom";
import FooterInjector from "./pages/FooterInjector";
import WelcomePage from "./pages/WelcomePage";
import { redirect } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<FooterInjector />}>
      {/* <Route path="*" element={<WelcomePage />} /> */}
      <Route path="/search" element={<SearchPage />} />
      <Route
        path="search/:movieId"
        element={<MovieSummary />}
        loader={movieSummaryLoader}
      >
        {/* <Route
          path=":movieId"
          element={}
        /> */}
      </Route>
    </Route>
  )
);
{
  /* <Navigate to="welcome" replace /> */
}
function App() {
  return (
    <React.Fragment>
      <main>
        {/* <RootElement>
        </RootElement> */}
        <RouterProvider router={router} />
      </main>
    </React.Fragment>
  );
}

export default App;
