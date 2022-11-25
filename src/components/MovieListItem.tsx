import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import movieData from "../models/movie-data";
import MovieData from "../models/movie-data";
import MovieItem from "../models/movie-item";
import classes from "./MovieListItem.module.scss";
const MovieListItem: React.FC<{ movie: MovieItem }> = (props) => {
  //   console.log(props.movie);
  return (
    <li key={props.movie.id}>
      <img src={props.movie.posterUrl}></img>
      <h2>{props.movie.title}</h2>
      <h3>{props.movie.year}</h3>
      <NavLink
        className={(navData) => (navData.isActive ? classes.active : "")}
        to={props.movie.id}
      >
        See more
      </NavLink>
    </li>
  );
};
export default MovieListItem;
