import React, { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import { SearchContext } from "../store/search-context";
import { StringMappingType } from "typescript";
import MovieListItem from "./MovieListItem";
import MovieItem from "../models/movie-item";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./SearchForm.module.scss";

import Button from "@mui/material/Button";

type SearchResponse = {
  Search: {
    Poster: string;
    Title: string;
    Type: string;
    Year: number;
    imdbID: string;
  }[];
  totalResults: number;
  Response: boolean;
};

const SearchForm = (props) => {
  const ctx = useContext(SearchContext);

  const [isLoading, setIsLoading] = useState(false);

  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);

  const navigate = useNavigate();

  const nameInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(enteredName);
    //TODO react env for key
    setIsLoading(true);
    fetch(`https://www.omdbapi.com/?apikey=64e502b&s=${enteredName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        return response.json();
      })
      .then((data: SearchResponse) => {
        console.log(data);
        setIsLoading(false);
        ctx.addMovies(
          data.Search.map<MovieItem>((movie) => ({
            title: movie.Title,
            posterUrl: movie.Poster,
            year: movie.Year,
            id: movie.imdbID,
            type: movie.Type,
          }))
        );
      });
    navigate("/search", { replace: true });
  };

  return (
    <div className={styles["search-box"]}>
      <form onSubmit={formSubmissionHandler}>
        <div className={styles["form-control"]}>
          <label htmlFor="name">Movie Name</label>
          <input
            type="text"
            id="name"
            onChange={nameInputChangeHandler}
            placeholder="Movie Name"
          />
          {!enteredNameIsValid && (
            <p className="error-text">Name must not be empty.</p>
          )}
        </div>
        <div className={styles["form-control"]}>
          <label htmlFor="type">Type</label>
          <select name="Type" id="type" placeholder="Type">
            <option value="any">Any</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>
        </div>
        <div className={styles["form-control"]}>
          <label htmlFor="year">Year</label>
          <input
            id="year"
            type="number"
            min="1900"
            max="2099"
            step="1"
            placeholder="Year"
          />
        </div>
        <div className={styles["form-control"]}>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
