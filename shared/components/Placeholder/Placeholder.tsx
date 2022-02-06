import React from "react";

type Props = {
  height: number;
  width?: number;
};

import styles from "./Placeholder.module.css";

const Placeholder = ({ height, width }: Props) => {
  return (
    <div
      className={styles.placeholder}
      style={{ height: height, width: width ? width : "100%" }}
    />
  );
};

export default Placeholder;
