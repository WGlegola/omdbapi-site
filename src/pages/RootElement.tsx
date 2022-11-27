import React from "react";
import { Outlet } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import styles from "./RootElement.module.scss";

const RootElement = (props) => {
  return (
    <React.Fragment>
      <SearchForm />
      <Outlet />
    </React.Fragment>
  );
};

export default RootElement;
