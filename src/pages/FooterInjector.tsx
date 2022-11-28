import React, { useEffect } from "react";
import { ReactReduxContext } from "react-redux";
import { Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import styles from "./FooterInjector.module.scss";
import WelcomePage from "./WelcomePage";

const FooterInjector: React.FC<{ children?: React.ReactNode }> = (props) => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("welcome");
  // });
  const location = useLocation();
  return (
    <React.Fragment>
      <div className={styles["page-frame"]}>
        <div className={styles["page-content"]}>
          {location.pathname === "/" ? <WelcomePage /> : <Outlet />}
        </div>
        <footer className={styles["footer"]}>
          <h3>
            Created by Wojciech Glegoła | See source code&nbsp;
            <a href="https://github.com/WGlegola/omdbapi-site">here</a>
          </h3>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default FooterInjector;
