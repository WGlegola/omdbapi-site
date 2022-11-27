import React from "react";
import styles from "./StatRow.module.scss";
const StatRow: React.FC<{ description: string; value: string }> = (props) => {
  return (
    <div className={styles["stat-row"]}>
      <div className={styles["stat-key"]}>
        <span>
          <b>{props.description}</b>
        </span>
      </div>
      <div className={styles["stat-value"]}>
        <span>{props.value}</span>
      </div>
    </div>
  );
};

export default StatRow;
