import React, { useContext } from "react";
import Movie from "../models/movie-item";
import { SearchContext } from "../store/search-context";
import MovieListItem from "./MovieListItem";
import styles from "./MovieList.module.scss";
const MovieList: React.FC = (props) => {
  const ctx = useContext(SearchContext);
  return (
    <ul className={styles["movie-list"]}>
      {ctx.fetchedMovies.map((item) => (
        <li className={styles["movie-list-item"]} key={item.id}>
          <MovieListItem movie={item} />
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
