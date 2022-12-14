import React from "react";
import styles from "./Chip.module.scss";
import { Tooltip } from "@mui/material";
const Chip: React.FC<{
  children?: React.ReactNode;
  content: string | number;
  tooltip?: string;
}> = (props) => {
  return (
    <Tooltip title={props.tooltip} arrow placement="top" disableFocusListener>
      <div className={styles["chip"]}>
        {props.children}
        <p>{props.content}</p>
      </div>
    </Tooltip>
  );
};

export default Chip;
