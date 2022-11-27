import React, { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import MovieList from "./MovieList";
import MovieSummary from "./MovieSummary";

const MoviePane = (props) => {
  const [pickedMovie, setPickedMovie] = useState(null);
  return (
    <React.Fragment>
      <MovieList />
      <Outlet />
    </React.Fragment>
  );
};

export default MoviePane;
