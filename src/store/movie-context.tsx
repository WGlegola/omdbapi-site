import React, { useState } from "react";
import MovieItem from "../models/movie-item";

interface SearchResponse {
  Search: Array<{
    Poster: string;
    Title: string;
    Type: string;
    Year: number;
    imdbID: string;
  }>;
  totalResults: number;
  Response: string;
  Error?: string;
}

export const MovieContext = React.createContext<{
  fetchedMovies: MovieItem[];
  isLoading: boolean;
  isAllLoaded: boolean;
  lastFetchedMoviesPage: number;
  errorMessage: string;
  fetchMoreMovies: (production: string, type: string, year: string) => void;
  setSearch: (production: string, type: string, year: string) => void;
}>({
  fetchedMovies: [],
  isLoading: false,
  isAllLoaded: false,
  lastFetchedMoviesPage: 0,
  errorMessage: "",
  fetchMoreMovies: () => {},
  setSearch: () => {},
});

const MovieContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [productionName, setProductionName] = useState<string>("");
  const [productionType, setProductionType] = useState<string>(null);
  const [productionYear, setProductionYUear] = useState<string>(null);

  const [fetchedMovies, setFetchedMovies] = useState<MovieItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAllLoaded, setIsAllLoaded] = useState<boolean>(false);
  const [lastFetchedMoviesPage, setLastFetchedMoviesPage] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const setSearch = (production: string, type: string, year: string) => {
    console.log("setIsCalled");
    setProductionName(() => production);
    setProductionType(() => type);
    setProductionYUear(() => year);
    setFetchedMovies(() => []);
    setIsLoading(() => false);
    setIsAllLoaded(() => false);
    setLastFetchedMoviesPage(() => 0);
    setErrorMessage(() => "");
  };

  const fetchMoreMoviesHandler = async (
    production: string,
    type: string,
    year: string,
    lvl = 1
  ) => {
    if (!production) return;

    let isNewSearch = false;
    if (
      production !== productionName ||
      type !== productionType ||
      year !== productionYear
    ) {
      setSearch(production, type, year);
      isNewSearch = true;
      setTimeout(
        fetchMoreMoviesHandler.bind(production, type, year, lvl + 1),
        500
      );
      return;
    }

    if (isAllLoaded && !errorMessage) return;
    setIsLoading(true);

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=64e502b&s=${production}${
        type ? "&type=" + type : ""
      }${year ? "&y=" + year : ""}${
        "&page=" + (isNewSearch ? 1 : lastFetchedMoviesPage + 1)
      }`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = (await response.json()) as SearchResponse;

    if (data.Response === "False") {
      setErrorMessage(() => data.Error);
      setIsAllLoaded(() => true);
      setIsLoading(() => false);
      setFetchedMovies(() => []);
      return;
    }

    const newMovies = data.Search.map<MovieItem>((movie) => ({
      title: movie.Title,
      posterUrl: movie.Poster,
      year: movie.Year,
      id: movie.imdbID,
      type: movie.Type,
    }));

    if (+data.totalResults <= fetchedMovies.length + newMovies.length) {
      setIsAllLoaded(() => true);
    }

    if (lastFetchedMoviesPage !== 98) {
      setLastFetchedMoviesPage(
        (lastFetchedMoviesPage) => lastFetchedMoviesPage + 1
      );
    } else {
      setIsAllLoaded(() => true);
    }

    setFetchedMovies((fetchedMovies) => [...fetchedMovies, ...newMovies]);

    setIsLoading(() => false);
  };

  return (
    <MovieContext.Provider
      value={{
        fetchedMovies: fetchedMovies,
        isLoading: isLoading,
        isAllLoaded: isAllLoaded,
        lastFetchedMoviesPage: lastFetchedMoviesPage,
        errorMessage: errorMessage,
        fetchMoreMovies: fetchMoreMoviesHandler,
        setSearch: setSearch,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
export default MovieContextProvider;
