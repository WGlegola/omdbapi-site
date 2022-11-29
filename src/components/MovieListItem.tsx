import React from "react";
import { Link } from "react-router-dom";
import MovieItem from "../models/movie-item";
import styles from "./MovieListItem.module.scss";
import Chip from "./Chip";

import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
const MovieListItem: React.FC<{ movie: MovieItem; key: string }> = (props) => {
  return (
    <div className={styles["anchor-wrapper"]}>
      <Link to={props.movie.id}>
        <div className={styles["movie-card"]}>
          <div className={styles["poster-container"]}>
            <img className={styles["poster"]} src={props.movie.posterUrl} />
          </div>
          <h2 className={styles["title"]}>{props.movie.title}</h2>
          <h3>{props.movie.year}</h3>
        </div>
      </Link>
    </div>
  );
};
export default MovieListItem;
