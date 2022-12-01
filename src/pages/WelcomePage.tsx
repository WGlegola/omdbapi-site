import React, { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { MovieContext } from "../store/movie-context";
import styles from "./WelcomePage.module.scss";

const WelcomePage: React.FC = (props) => {
  const [searchParams, setSearchParams] = useSearchParams([]);
  const movieCtx = useContext(MovieContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSearchParams("");
    movieCtx.setSearch("", null, null);
  }, [searchParams]);

  return (
    <React.Fragment>
      <div className={styles["welcome-text"]}>
        <b>
          Learn more about <br />
          Your favourite movie
        </b>
      </div>
      <div className={styles["search-form-container"]}>
        <SearchForm />
      </div>
    </React.Fragment>
  );
};

export default WelcomePage;
