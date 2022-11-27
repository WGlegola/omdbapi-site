import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import movieData from "../models/movie-data";
import MovieData from "../models/movie-data";
import MovieItem from "../models/movie-item";
import styles from "./MovieListItem.module.scss";

const MovieListItem: React.FC<{ movie: MovieItem }> = (props) => {
  //   console.log(props.movie);
  return (
    <React.Fragment>
      <div className={styles["poster-container"]}>
        <img className={styles["poster"]} src={props.movie.posterUrl}></img>
      </div>
      <div className={styles["text-container"]}>
        <h2 className={styles["title"]}>{props.movie.title}</h2>
        <h3 className={styles["year"]}>{props.movie.year}</h3>
      </div>
      <NavLink
        className={(navData) => (navData.isActive ? styles.active : "")}
        to={props.movie.id}
      >
        See more
      </NavLink>
    </React.Fragment>
  );
};
export default MovieListItem;
