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

      {/* <Chip content={loaderData.type} tooltip="Production type">
        <MovieIcon fontSize="inherit" />
      </Chip>
      <Chip content={loaderData.genre} tooltip="Genre">
        <FolderCopySharpIcon fontSize="inherit" />
      </Chip>
      <Chip content={loaderData.language} tooltip="Production language">
        <TranslateSharpIcon fontSize="inherit" />
      </Chip>
      <Chip content={loaderData.runtime} tooltip="Runtime">
        <AccessTimeSharpIcon fontSize="inherit" />
      </Chip>
      <Chip content={loaderData.released} tooltip="Release date">
        <CalendarMonthSharpIcon fontSize="inherit" />
      </Chip> */}
    </div>
  );
};

export default ChipBox;
