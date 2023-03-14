import React from "react";
import { useMatch } from "react-router-dom";

import Search from "./components/Search/Search";
import Login from "./components/Login/Login";
import ThemeButton from "./components/ThemeButton/ThemeButton";

import styles from "./Header.module.css";
import { BsYoutube } from "react-icons/bs";

const Header = ({ theme, swichTheme }) => {
  const home = useMatch("/");

  const handleGohome = () => {
    window.location.replace("/");
  };
  return (
    <header className={`${home ? styles.homeContainer : styles.container}`}>
      <div className={styles.innerBox}>
        <button className={styles.logo} onClick={handleGohome}>
          <BsYoutube size={30} fill="#f00" />
          <h1 className={styles.title}>YenTube</h1>
        </button>
        <Search />
        <Login />
        <ThemeButton swichTheme={swichTheme} theme={theme} />
      </div>
    </header>
  );
};
export default Header;
