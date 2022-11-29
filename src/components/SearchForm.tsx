import React, { useContext, useState } from "react";
import { SearchContext } from "../store/search-context";
import { useNavigate } from "react-router-dom";
import styles from "./SearchForm.module.scss";

const SearchForm: React.FC = (props) => {
  const searchCtx = useContext(SearchContext);
  const navigate = useNavigate();

  const [enteredName, setEnteredName] = useState("");
  const [isEnteredNameValid, setIsEnteredNameValid] = useState(false);
  const [isEnteredNameTouched, setIsEnteredNameTouched] = useState(false);
  const [enteredType, setEnteredType] = useState("any");
  const [enteredYear, setEnteredYear] = useState("");
  const [isEnteredYearValid, setIsEnteredYearValid] = useState(true);
  const [isEnteredYearTouched, setIsEnteredYearTouched] = useState(false);

  const validateName = () => {
    if (enteredName.trim().length > 0) {
      setIsEnteredNameValid(true);
    } else {
      setIsEnteredNameValid(false);
    }
  };

  const validateYear = () => {
    if (/^[0-9]{4}$/.test(enteredYear) || enteredYear === "") {
      setIsEnteredYearValid(true);
    } else {
      setIsEnteredYearValid(false);
    }
  };

  const nameInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredName(event.target.value);
    if (!isEnteredNameValid) {
      validateName();
    }
  };

  const typeSelectChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEnteredType(event.target.value);
  };

  const yearInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredYear(event.target.value);
    if (!isEnteredYearValid) {
      validateYear();
    }
  };

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();

    validateName();
    validateYear();

    setIsEnteredNameTouched(true);
    setIsEnteredYearTouched(true);

    setTimeout(function () {
      if (isEnteredNameValid && isEnteredYearValid) {
        searchCtx.setSearch(enteredName, enteredType, enteredYear);

        setEnteredName("");
        setIsEnteredNameValid(false);
        setIsEnteredNameTouched(false);
        setEnteredType("any");
        setEnteredYear("");
        setIsEnteredYearValid(true);
        setIsEnteredYearTouched(false);

        navigate("/search", { replace: true });
      }
    }, 1000);
  };

  return (
    <div className={styles["search-box"]}>
      <form onSubmit={formSubmissionHandler}>
        <div className={styles["form-title-control"]}>
          <input
            type="text"
            id="name"
            onChange={nameInputChangeHandler}
            placeholder="Production name"
          />
          {!isEnteredNameValid && isEnteredNameTouched ? (
            <p className="error-text">You must enter search phrase</p>
          ) : (
            ""
          )}
        </div>
        <div className={styles["type-year-wrapper"]}>
          <div className={styles["form-type-control"]}>
            <select
              name="Type"
              id="type"
              onChange={typeSelectChangeHandler}
              placeholder="Type"
            >
              <option value="any">Any</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
            </select>
          </div>
          <div className={styles["form-year-control"]}>
            <input
              id="year"
              onChange={yearInputChangeHandler}
              placeholder="Year"
            />
            {!isEnteredYearValid && isEnteredYearTouched && (
              <p className="error-text">Year must have 4 digits or be empty</p>
            )}
          </div>
        </div>
        <div className={styles["form-submit-control"]}>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
