import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import movieData from "../models/movie-data";
import MovieData from "../models/movie-data";
import MovieItem from "../models/movie-item";
import styles from "./MovieListItem.module.scss";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Chip from "./Chip";

import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
const MovieListItem: React.FC<{ movie: MovieItem }> = (props) => {
  //   console.log(props.movie);
  return (
    <div className={styles["anchor-wrapper"]}>
      <Link
        // className={(navData) => (navData.isActive ? styles.active : "")}
        to={props.movie.id}
      >
        <div className={styles["movie-card"]}>
          {/* <div className={styles["poster-container"]}> */}
          <img className={styles["poster"]} src={props.movie.posterUrl}></img>
          {/* </div> */}
          {/* <div className={styles["text-container"]}> */}
          <h2 className={styles["title"]}>{props.movie.title}</h2>
          {/* <h3 className={styles["year"]}>{}</h3> */}
          <Chip content={props.movie.year}>
            <CalendarMonthSharpIcon />
          </Chip>
          {/* </div> */}
          {/* <ArrowForwardIosSharpIcon /> */}
        </div>
      </Link>
    </div>
  );
};
export default MovieListItem;
