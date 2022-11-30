import React, { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import MovieData from "../models/movie-data";
import styles from "./MovieSummaryPage.module.scss";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import RatingBox from "../components/RatingBox";
import StatBox from "../components/StatBox";
import ListingBox from "../components/ListingBox";

import MovieIcon from "@mui/icons-material/Movie";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import TranslateSharpIcon from "@mui/icons-material/TranslateSharp";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import FolderCopySharpIcon from "@mui/icons-material/FolderCopySharp";
import ChipBox from "../components/ChipBox";

const MovieSummary: React.FC = (props) => {
  const loaderData = useLoaderData() as MovieData;
  const navigate = useNavigate();
  console.log(loaderData);

  const movieStats = [
    { description: "Awards", value: loaderData.awards },
    { description: "Box office", value: loaderData.boxOffice },
    { description: "Shooting locations", value: loaderData.country },
    { description: "Production", value: loaderData.production },
    { description: "DVD release date", value: loaderData.DVD },
    { description: "Website", value: loaderData.website },
  ].filter((item) => !!item.value && item.value !== "N/A");

  const chips = [
    {
      content: loaderData.type,
      tooltip: "Production type",
      icon: <MovieIcon fontSize="inherit" />,
    },
    {
      content: loaderData.genre,
      tooltip: "Genre",
      icon: <FolderCopySharpIcon fontSize="inherit" />,
    },
    {
      content: loaderData.language,
      tooltip: "Production language",
      icon: <TranslateSharpIcon fontSize="inherit" />,
    },
    {
      content: loaderData.runtime,
      tooltip: "Runtime",
      icon: <AccessTimeSharpIcon fontSize="inherit" />,
    },
    {
      content: loaderData.released,
      tooltip: "Release date",
      icon: <CalendarMonthSharpIcon fontSize="inherit" />,
    },
  ].filter((item) => !!item.content);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles["summary-container"]}>
      <div className={styles["header-container"]}>
        <div className={styles["back-button"]} onClick={() => navigate(-1)}>
          <ArrowCircleLeftIcon fontSize="inherit" />
        </div>
        <h1>{loaderData.title}</h1>
      </div>

      <div>
        <img className={styles["poster"]} src={loaderData.posterUrl} alt="" />

        <ChipBox chips={chips} />
      </div>

      <RatingBox
        imdbRating={"" + loaderData.imdbRating}
        imdbVotes={loaderData.imdbVotes}
        otherRatings={loaderData.ratings}
      />

      <div className={styles["main-section-container"]}>
        <div className={styles["plot-container"]}>
          <h2>Plot</h2>
          {loaderData.plot}
        </div>
        <div className={styles["people-listings"]}>
          {loaderData.director !== "N/A" && (
            <ListingBox
              header="Directed by:"
              values={loaderData.director.split(",")}
            />
          )}

          {loaderData.writer !== "N/A" && (
            <ListingBox
              header="Written by:"
              values={loaderData.writer.split(",")}
            />
          )}

          {loaderData.actors !== "N/A" && (
            <ListingBox
              header="Starring:"
              values={loaderData.actors.split(",")}
            />
          )}
        </div>

        <StatBox stats={movieStats} />
      </div>
    </div>
  );
};

export default MovieSummary;
