import React from "react";

import styles from "./ThemeButton.module.css";

const ThemeButton = ({ theme, swichTheme }) => {
  return (
    <div className={styles.container}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={swichTheme}
        ></input>
        <span className={styles.slider} />
      </label>
    </div>
  );
};

export default ThemeButton;
