import React from "react";
import MovieList from "../components/MovieList";
import SearchForm from "../components/SearchForm";
import styles from "./SearchPage.module.scss";

const SearchPage: React.FC = (props) => {
  return (
    <React.Fragment>
      <div className={styles["search-form-container"]}>
        <SearchForm />
      </div>
      <div className={styles["movie-list-container"]}>
        <MovieList />
      </div>
    </React.Fragment>
  );
};

export default SearchPage;
