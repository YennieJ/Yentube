import React, { memo } from "react";
import { Link } from "react-router-dom";

import Login from "../Login/Login";

import styles from "./Header.module.css";
import Search from "./Search/Search";

const Header = memo(() => {
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
});
export default Header;
