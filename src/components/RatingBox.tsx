import styles from "./RatingBox.module.scss";

import StarSharpIcon from "@mui/icons-material/StarSharp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StatRow from "./StatRow";
import React from "react";

const RatingBox: React.FC<{
  children?: React.ReactNode;
  imdbRating: string;
  imdbVotes: string;
  otherRatings: Array<{ source: string; value: string }>;
}> = (props) => {
  return (
    <div className={styles["score-container"]}>
      <div className={styles["featured-stat"]}>
        <StarSharpIcon fontSize="inherit" />
        <p>{props.imdbRating}</p>
      </div>
      <div className={styles["featured-stat"]}>
        <VisibilityIcon fontSize="inherit" />
        <p>{props.imdbVotes}</p>
      </div>
      <div className={styles["stats-container"]}>
        {props.otherRatings.map((item) => {
          return (
            <StatRow
              description={item.source}
              value={item.value}
              key={item.source}
            />
          );
        })}{" "}
      </div>
    </div>
  );
};

export default RatingBox;
