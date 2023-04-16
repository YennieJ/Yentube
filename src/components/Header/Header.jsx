import React from "react";
import { useMatch } from "react-router-dom";

import Search from "./Components/Search/Search";
import Login from "./Components/Login/Login";
import ThemeButton from "./Components/ThemeButton/ThemeButton";

import styles from "./Header.module.css";
import { BsYoutube } from "react-icons/bs";

const Header = ({ theme, swichTheme }) => {
  //home 화면인지 주소체크 (for css Header fixed or static)
  const home = useMatch("/");

  //옌투브 로고 클릭시 새로고침.
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
