import React from "react";
import styles from "./ListingBox.module.scss";

const ListingBox: React.FC<{
  children?: React.ReactNode;
  header: string;
  values: string[];
}> = (props) => {
  return (
    <div className={styles["people-container"]}>
      {
        <div>
          <h3>{props.header}</h3>
          <ul>
            {props.values.map((item) => {
              return <li key={props.header + item}>{item.trim()}</li>;
            })}
          </ul>
        </div>
      }
    </div>
  );
};

export default ListingBox;
