import React, { useContext } from "react";
import Movie from "../models/movie-item";
import { SearchContext } from "../store/search-context";
import MovieListItem from "./MovieListItem";

const MovieList: React.FC = (props) => {
  const ctx = useContext(SearchContext);
  return (
    <ul>
      {ctx.fetchedMovies.map((item) => (
        <MovieListItem movie={item} />
      ))}
    </ul>
  );
};

export default MovieList;
