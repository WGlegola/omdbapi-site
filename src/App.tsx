import React, { Fragment } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import SearchContext from "./store/search-context";
import MovieList from "./components/MovieList";

function App() {
  return (
    <React.Fragment>
      <SearchForm />
      <MovieList />
    </React.Fragment>
  );
}

export default App;
