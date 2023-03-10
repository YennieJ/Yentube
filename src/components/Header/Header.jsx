import React from "react";
import { useMatch } from "react-router-dom";

import Search from "./components/Search/Search";
import Login from "./components/Login/Login";

import styles from "./Header.module.css";
import { BsYoutube } from "react-icons/bs";

const Header = () => {
  const watchPage = useMatch("/videos/watch/:id");

  const handleGohome = () => {
    window.location.replace("/");
  };
  return (
    <>
      <header
        className={`${watchPage ? styles.watchContainer : styles.container}`}
      >
        <div className={styles.header}>
          <button className={styles.logo} onClick={handleGohome}>
            <BsYoutube size={30} fill="#f00" />
            <h1 className={styles.title}>YenTube</h1>
          </button>
          <Search />
          <Login />
        </div>
      </header>
    </>
  );
};
export default Header;
