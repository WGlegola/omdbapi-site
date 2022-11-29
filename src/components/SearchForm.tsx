import React, { useContext, useState, useRef, useEffect } from "react";
import { SearchContext } from "../store/search-context";
import { useNavigate } from "react-router-dom";
import styles from "./SearchForm.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

const SearchForm: React.FC = (props) => {
  const searchCtx = useContext(SearchContext);
  const navigate = useNavigate();

  const [isSubmitActive, setIsSubmitActive] = useState(true);

  const productionField = useRef<HTMLInputElement>(null);
  const typeField = useRef<HTMLSelectElement>(null);
  const yearField = useRef<HTMLInputElement>(null);

  // const [enteredName, setEnteredName] = useState("");
  const [isEnteredNameValid, setIsEnteredNameValid] = useState(false);
  const [isEnteredNameTouched, setIsEnteredNameTouched] = useState(false);
  // const [enteredType, setEnteredType] = useState("any");
  // const [enteredYear, setEnteredYear] = useState("");
  const [isEnteredYearValid, setIsEnteredYearValid] = useState(true);
  const [isEnteredYearTouched, setIsEnteredYearTouched] = useState(false);

  const validateName = (enteredName: string): boolean => {
    if (enteredName.trim().length > 0) return true;
    else return false;
  };

  const validateYear = (enteredYear: string): boolean => {
    if (/^[0-9]{4}$/.test(enteredYear) || enteredYear === "") return true;
    else return false;
  };

  useEffect(() => {
    console.log("" + isEnteredNameValid + " " + isEnteredYearValid);
    if (
      validateName(productionField.current.value) &&
      validateYear(yearField.current.value)
    )
      setIsSubmitActive(true);
  }, [isEnteredNameValid, isEnteredYearValid]);

  const nameInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isEnteredNameValid) {
      if (validateName(event.target.value)) {
        setIsEnteredNameValid(true);
      }
    }
  };

  const yearInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isEnteredYearValid) {
      if (validateYear(event.target.value)) {
        setIsEnteredYearValid(true);
      }
    }
  };

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setIsEnteredNameTouched(true);
    setIsEnteredYearTouched(true);

    setIsEnteredNameValid(validateName(productionField.current.value));
    setIsEnteredYearValid(validateYear(yearField.current.value));

    if (
      validateName(productionField.current.value) &&
      validateYear(yearField.current.value)
    ) {
      searchCtx.setSearch(
        productionField.current.value,
        typeField.current.value,
        yearField.current.value
      );

      productionField.current.value = "";
      setIsEnteredNameValid(false);
      setIsEnteredNameTouched(false);

      typeField.current.value = "any";

      yearField.current.value = "";
      setIsEnteredYearValid(true);
      setIsEnteredYearTouched(false);

      navigate("/search");
    } else setIsSubmitActive(false);
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
            ref={productionField}
          />
          {!isEnteredNameValid && isEnteredNameTouched ? (
            <p className="error-text">You must enter search phrase</p>
          ) : (
            ""
          )}
        </div>
        <div className={styles["type-year-wrapper"]}>
          <div className={styles["form-type-control"]}>
            <select name="Type" id="type" placeholder="Type" ref={typeField}>
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
              ref={yearField}
            />
            {!isEnteredYearValid && isEnteredYearTouched && (
              <p className="error-text">Year must have 4 digits or be empty</p>
            )}
          </div>
        </div>
        <div className={styles["form-submit-control"]}>
          <input type="submit" value={"Submit"} disabled={!isSubmitActive} />
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
