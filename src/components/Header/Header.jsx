import React from "react";
import { Link } from "react-router-dom";

import Search from "./components/Search/Search";
import Login from "./components/Login/Login";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <img src="/img/logo.png" alt="logo" />
          <h1 className={styles.title}>Yentube</h1>
        </Link>
        <Search />
        <Login />
      </header>
    </>
  );
};
export default Header;
