import React from "react";
import styles from "./Chip.module.scss";
import { Tooltip } from "@mui/material";
const Chip: React.FC<{
  children?: React.ReactNode;
  content: string | number;
}> = (props) => {
  return (
    <Tooltip title="XDDD">
      <div className={styles["chip"]}>
        {props.children}
        {props.content}
      </div>
    </Tooltip>
  );
};

export default Chip;
