import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import MovieData from "../models/movie-data";
import Chip from "../components/Chip";
import styles from "./MovieSummaryPage.module.scss";
import MovieIcon from "@mui/icons-material/Movie";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import TranslateSharpIcon from "@mui/icons-material/TranslateSharp";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import StarSharpIcon from "@mui/icons-material/StarSharp";
import FolderCopySharpIcon from "@mui/icons-material/FolderCopySharp";
import StatRow from "../components/StatRow";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import VisibilityIcon from "@mui/icons-material/Visibility";

const MovieSummary: React.FC = (props) => {
  const loaderData = useLoaderData() as MovieData;
  const navigate = useNavigate();

  return (
    <div className={styles["summary-container"]}>
      <div className={styles["header-container"]}>
        <div className={styles["back-button"]} onClick={() => navigate(-1)}>
          <ArrowCircleLeftIcon fontSize="inherit" />
        </div>
        <div>
          <h1>{loaderData.title}</h1>
        </div>
      </div>
      <div className={styles["poster-chip-wrapper"]}>
        <div className={styles["poster-container"]}>
          <img src={loaderData.posterUrl} />
        </div>
        <div className={styles["chip-container"]}>
          <Chip content={loaderData.type} tooltip="Production type">
            <MovieIcon fontSize="inherit" />
          </Chip>
          <Chip content={loaderData.genre} tooltip="Genre">
            <FolderCopySharpIcon fontSize="inherit" />
          </Chip>
          <Chip content={loaderData.language} tooltip="Production language">
            <TranslateSharpIcon fontSize="inherit" />
          </Chip>
          <Chip content={loaderData.runtime} tooltip="Runtime">
            <AccessTimeSharpIcon fontSize="inherit" />
          </Chip>
          <Chip content={loaderData.released} tooltip="Release date">
            <CalendarMonthSharpIcon fontSize="inherit" />
          </Chip>
        </div>
      </div>
      <div className={styles["score-container"]}>
        <div className={styles["featured-stat"]}>
          <StarSharpIcon fontSize="inherit" />
          <p>{loaderData.imdbRating}</p>
        </div>
        <div className={styles["featured-stat"]}>
          <VisibilityIcon fontSize="inherit" />
          <p>{loaderData.imdbVotes}</p>
        </div>
        <div className={styles["stats-container"]}>
          {loaderData.ratings.map((item) => {
            return <StatRow description={item.source} value={item.value} />;
          })}
        </div>
      </div>
      <div className={styles["main-section-container"]}>
        <div className={styles["plot-container"]}>
          <h2>Plot</h2>
          {loaderData.plot}
        </div>
        <div className={styles["people-container"]}>
          <div>
            <h3>Directed by:</h3>{" "}
            <ul>
              {loaderData.director.split(",").map((item) => {
                return <li>{item.trim()}</li>;
              })}
            </ul>
          </div>
          <div>
            <h3>Written by:</h3>
            <ul>
              {loaderData.writer.split(",").map((item) => {
                return <li>{item.trim()}</li>;
              })}
            </ul>
          </div>
          <div>
            <h3>Starring:</h3>
            <ul>
              {loaderData.actors.split(",").map((item) => {
                return <li>{item.trim()}</li>;
              })}
            </ul>
          </div>
        </div>
        <div className={styles["stats-container"]}>
          <StatRow description="Awards" value={loaderData.awards} />
          <StatRow description="Box office" value={loaderData.boxOffice} />
          <StatRow
            description="Shooting locations"
            value={loaderData.country}
          />
          <StatRow description="Production" value={loaderData.production} />
          <StatRow description="DVD release date" value={loaderData.DVD} />
          <StatRow description="Website" value={loaderData.website} />
        </div>
      </div>
    </div>
  );
};

export default MovieSummary;

export async function loader(params) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=64e502b&i=${params.params.movieId}&plot=full`
  );
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const responseJson = await response.json();
  let data: MovieData = {
    actors: responseJson.Actors,
    awards: responseJson.Awards,
    boxOffice: responseJson.BoxOffice,
    country: responseJson.Country,
    director: responseJson.Director,
    DVD: responseJson.DVD,
    genre: responseJson.Genre,
    imdbID: responseJson.imdbID,
    imdbRating: responseJson.imdbRating,
    imdbVotes: responseJson.imdbVotes,
    language: responseJson.Language,
    metascore: responseJson.Metascore,
    plot: responseJson.Plot,
    posterUrl: responseJson.Poster,
    production: responseJson.production,
    rated: responseJson.Rated,
    released: responseJson.Released,
    runtime: responseJson.Runtime,
    title: responseJson.Title,
    type: responseJson.Type,
    website: responseJson.Website,
    writer: responseJson.Writer,
    year: responseJson.Year,
  };
  if (responseJson.hasOwnProperty("Ratings")) {
    const ratings: { Source: string; Value: string }[] = responseJson.Ratings;
    data.ratings = ratings
      .filter((item) => (item.Source !== "Internet Movie Database" ? 1 : 0))
      .map((item) => {
        return { source: item.Source, value: item.Value };
      });
  }
  return data;
}
