import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.scss";
type Props = {};

function Header({}: Props) {
  return (
    <header className={classes.mainHeader}>
      <div>
        <button className={classes.toggleButton}>
          <span className={classes.toggleButton__bar}></span>
          <span className={classes.toggleButton__bar}></span>
          <span className={classes.toggleButton__bar}></span>
        </button>
      </div>
      <nav className={classes.mainNav}>
        <ul className={classes.mainNav__items}>
          <li className={classes.mainNav__item}>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/welcome"
            >
              Welcome
            </NavLink>
          </li>
          <li className={classes.mainNav__item}>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/managedecs"
            >
              Manage Decs
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
