import React, { useContext } from "react";
import Movie from "../models/movie-item";
import { SearchContext } from "../store/search-context";
import MovieListItem from "./MovieListItem";
import styles from "./MovieList.module.scss";
const MovieList: React.FC = (props) => {
  const ctx = useContext(SearchContext);
  return (
    <div className={styles["movie-list"]}>
      {ctx.fetchedMovies.map((item) => (
        <MovieListItem movie={item} />
      ))}
    </div>
  );
};

export default MovieList;
