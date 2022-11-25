import React, { useEffect, useState } from "react";
import movieData from "../models/movie-data";
import MovieData from "../models/movie-data";
import MovieItem from "../models/movie-item";

const MovieListItem: React.FC<{ movie: MovieItem }> = (props) => {
  return (
    <li>
      <img src={props.movie.posterUrl}></img>
      <h2>{props.movie.title}</h2>
      <h3>{props.movie.year}</h3>
    </li>
  );
};
export default MovieListItem;
