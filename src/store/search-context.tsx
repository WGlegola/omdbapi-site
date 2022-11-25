import React, { useState } from "react";
import MovieItem from "../models/movie-item";
import Movie from "../models/movie-item";

export const SearchContext = React.createContext<{
  fetchedMovies: MovieItem[];
  currentPage: number;
  addMovies: (movies: MovieItem[]) => void;
}>({
  fetchedMovies: [],
  currentPage: 1,
  addMovies: () => {},
});

const SearchContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [fetchedMovies, setFetchedMovies] = useState<MovieItem[]>([]);

  const addMoviesHandler = (movies: MovieItem[]) => {
    setFetchedMovies([...fetchedMovies, ...movies]);
  };

  return (
    <SearchContext.Provider
      value={{
        fetchedMovies: fetchedMovies,
        currentPage: 1,
        addMovies: addMoviesHandler,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};
export default SearchContextProvider;
