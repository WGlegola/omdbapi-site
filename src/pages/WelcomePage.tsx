import React, { useEffect } from "react";
import SearchForm from "../components/SearchForm";
import styles from "./WelcomePage.module.scss";

const WelcomePage: React.FC = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
