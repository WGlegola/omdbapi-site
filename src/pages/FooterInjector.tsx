import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./FooterInjector.module.scss";
import WelcomePage from "./WelcomePage";

const FooterInjector: React.FC<{ children?: React.ReactNode }> = (props) => {
  const location = useLocation();
  return (
    <React.Fragment>
      <div className={styles["page-frame"]}>
        <div className={styles["page-content"]}>
          {location.pathname === "/" ? <WelcomePage /> : <Outlet />}
        </div>
        <footer className={styles["footer"]}>
          <div>
            <h3>Created by Wojciech Glegoła</h3>{" "}
          </div>

          <div>
            <h3>
              Check source code&nbsp;
              <a href="https://github.com/WGlegola/omdbapi-site">here</a>
            </h3>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default FooterInjector;
