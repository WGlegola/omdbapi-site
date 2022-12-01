import React from "react";
import styles from "./ChipBox.module.scss";

import Chip from "./Chip";

const ChipBox: React.FC<{
  chips: Array<{ content: string; tooltip: string; icon: React.ReactNode }>;
}> = (props) => {
  return (
    <div className={styles["chip-container"]}>
      {props.chips.map((chip) => {
        return (
          <Chip
            key={chip.content}
            content={chip.content}
            tooltip={chip.tooltip}
          >
            {chip.icon}
          </Chip>
        );
      })}
    </div>
  );
};

export default ChipBox;
