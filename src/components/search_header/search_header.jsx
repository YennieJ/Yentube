import React, { memo, useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import styles from "./search_header.module.css";
import { BsSearch } from "react-icons/bs";

import Login from "../Login/Login";

const SearchHeader = memo(() => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    searchValue && navigate(`videos/${searchValue}`);
  };

  useEffect(() => setSearchValue(keyword || ""), [keyword]);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src="/img/logo.png" alt="logo" />
        <h1 className={styles.title}>Yentube</h1>
      </Link>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="serach"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className={styles.button} type="submit">
          <BsSearch />
        </button>
      </form>

      <Login />
    </header>
  );
});
export default SearchHeader;
