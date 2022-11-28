import React from "react";
import styles from "./StatRow.module.scss";

const StatRow: React.FC<{ description: string; value: string }> = (props) => {
  return (
    <div className={styles["stat-row"]}>
      <div className={styles["stat-key"]}>
        <b>{props.description}</b>
      </div>
      <div className={styles["stat-value"]}>{props.value}</div>
    </div>
  );
};

export default StatRow;
