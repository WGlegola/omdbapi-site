import React, { useContext, useRef, useEffect } from "react";
import MovieListItem from "../components/MovieListItem";
import styles from "./MovieList.module.scss";
import { useIsInViewport } from "../hooks/hooks";
import { MovieContext } from "../store/movie-context";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useSearchParams } from "react-router-dom";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import SearchForm from "../components/SearchForm";

const MovieList: React.FC = (props) => {
  const movieCtx = useContext(MovieContext);
  const [searchParamsObject] = useSearchParams();

  const infinityScrollTrigger = useRef(null);
  const isInfScrInViewport = useIsInViewport(infinityScrollTrigger);

  const scrollToTopButtonVisibilityTrigger = useRef<HTMLDivElement>(null);
  const isScrollToTopButtonVisible = useIsInViewport(
    scrollToTopButtonVisibilityTrigger
  );

  const navigate = useNavigate();

  const fetchMovies = () => {
    movieCtx.fetchMoreMovies(
      searchParamsObject.get("production"),
      searchParamsObject.get("type"),
      searchParamsObject.get("year")
    );
  };

  // custom semaphore for stopping multiple request until pageNumber in context updates
  let fetchLock = 0;
  const resetLock = () => {
    fetchLock = 0;
  };

  useEffect(() => {
    if (movieCtx.isLoading) fetchLock = 0;
  }, [movieCtx.isLoading]);

  useEffect(() => {
    if (fetchLock === 0) {
      fetchLock += 1;
      fetchMovies();
      setTimeout(resetLock, 500);
    }
  }, [searchParamsObject]);

  useEffect(() => {
    if (!isInfScrInViewport) return;
    if (!movieCtx.isAllLoaded && fetchLock === 0) {
      fetchLock += 1;
      setTimeout(resetLock, 500);
      fetchMovies();
    }
  }, [isInfScrInViewport]);

  const scrollToTopHandler = () => {
    window.scrollBy({
      top: scrollToTopButtonVisibilityTrigger.current.getBoundingClientRect()
        .top,
      behavior: "smooth",
    });
  };

  return (
    <React.Fragment>
      <SearchForm />
      <div
        className={styles["scroll-to-top"]}
        hidden={isScrollToTopButtonVisible}
        onClick={scrollToTopHandler}
      >
        <ArrowCircleUpIcon fontSize="inherit" />
      </div>
      <div className={styles["header-container"]}>
        <div className={styles["back-button"]} onClick={() => navigate("/")}>
          <ArrowCircleLeftIcon fontSize="inherit" />
        </div>
        <div
          className={styles["text-box"]}
          ref={scrollToTopButtonVisibilityTrigger}
        >
          <p>
            Showing results for:{" "}
            {'"' + searchParamsObject.get("production") + '"'}
            {searchParamsObject.get("type") &&
              " | type: " + searchParamsObject.get("type")}
            {searchParamsObject.get("year") &&
              " | year: " + searchParamsObject.get("year")}
          </p>
        </div>
      </div>
      <div className={styles["movie-list"]}>
        {movieCtx.fetchedMovies.map((item) => (
          <MovieListItem movie={item} key={item.id} />
        ))}
      </div>
      <div ref={infinityScrollTrigger} className={styles["text-box"]}>
        {movieCtx.isLoading ? <CircularProgress color="inherit" /> : ""}
        <b>
          {movieCtx.errorMessage &&
            "Found no productions matching your criteria"}
          {movieCtx.isAllLoaded &&
            movieCtx.fetchedMovies.length !== 0 &&
            "That's all we have"}
        </b>
      </div>
    </React.Fragment>
  );
};

export default MovieList;
