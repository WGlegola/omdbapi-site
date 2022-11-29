import React, { useContext, useRef, useEffect } from "react";
import { SearchContext } from "../store/search-context";
import MovieListItem from "../components/MovieListItem";
import styles from "./MovieList.module.scss";
import { useIsInViewport } from "../hooks/hooks";
import { MovieContext } from "../store/movie-context";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { style } from "@mui/system";
import SearchForm from "../components/SearchForm";
const MovieList: React.FC = (props) => {
  const movieCtx = useContext(MovieContext);
  const searchCtx = useContext(SearchContext);

  const infinityScrollTrigger = useRef(null);
  const isInfScrInViewport = useIsInViewport(infinityScrollTrigger);

  const scrollToTopButtonVisibilityTrigger = useRef<HTMLDivElement>(null);
  const isScrollToTopButtonVisible = useIsInViewport(
    scrollToTopButtonVisibilityTrigger
  );

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollBy({
      top:
        scrollToTopButtonVisibilityTrigger.current.getBoundingClientRect().top +
        3,
    });
    movieCtx.fetchMoreMovies();
  }, [searchCtx.production, searchCtx.type, searchCtx.year]);

  useEffect(() => {
    console.log(isInfScrInViewport);
    if (!isInfScrInViewport) return;
    if (!!!searchCtx.production) navigate("/");
    if (!movieCtx.isAllLoaded) movieCtx.fetchMoreMovies();
  }, [isInfScrInViewport]);

  const scrollToTopHandler = () => {
    // scrollToTopButtonVisibilityTrigger.current.getBoundingClientRect()
    // scrollIntoView({
    //   behavior: "smooth",
    // });
    // console.log(
    //   "asdsdd" +
    //     scrollToTopButtonVisibilityTrigger.current.getBoundingClientRect().top
    // );
    // window.scrollTo({
    //   top: scrollToTopButtonVisibilityTrigger.current.getBoundingClientRect()
    //     .top,
    //   left: 0,
    //   behavior: "smooth",
    // });
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
      <div
        className={styles["text-box"]}
        ref={scrollToTopButtonVisibilityTrigger}
      >
        <div className={styles["back-button"]} onClick={() => navigate("/")}>
          <ArrowCircleLeftIcon fontSize="inherit" />
        </div>
        <p>
          Showing results for: {'"' + searchCtx.production + '"'}
          {searchCtx.type !== "any" && " | type: " + searchCtx.type}
          {searchCtx.year !== "" && " | year: " + searchCtx.year}
        </p>
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
