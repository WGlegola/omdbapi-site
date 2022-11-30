import styles from "./StatBox.module.scss";

import StatRow from "./StatRow";
import React from "react";

const StatBox: React.FC<{
  children?: React.ReactNode;
  stats: Array<{ description: string; value: string }>;
}> = (props) => {
  return (
    <div className={styles["stats-container"]}>
      {props.stats.map((item) => (
        <StatRow
          key={item.value}
          description={item.description}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default StatBox;
