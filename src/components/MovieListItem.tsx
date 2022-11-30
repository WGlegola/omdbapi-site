import React from "react";
import { Link } from "react-router-dom";
import MovieItem from "../models/movie-item";
import styles from "./MovieListItem.module.scss";
const MovieListItem: React.FC<{ movie: MovieItem; key: string }> = (props) => {
  return (
    <div
      className={styles["card"]}
      style={{
        backgroundImage: `url(${props.movie.posterUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <Link to={props.movie.id}>
        <div className={styles["card-content"]}>
          <div className={styles["card-text"]}>
            <h2 className={styles["title"]}>{props.movie.title}</h2>
            <h3>{props.movie.year}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieListItem;
