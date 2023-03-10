import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useSize from "hooks/useSize";

import styles from "./Search.module.css";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();

  const pcSize = useSize();

  const [searchValue, setSearchValue] = useState("");
  const [searchModal, setSearchModal] = useState(false);

  const inputFocus = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchValue) {
      navigate(`videos/${searchValue}`);
      inputFocus.current.blur();
    }
  };

  const handleGobackButton = () => {
    if (!keyword) {
      navigate("/");
      setSearchModal(false);
      document.body.style.removeProperty("overflow");
    }
    navigate(-1, { replace: true });
  };

  useEffect(() => setSearchValue(keyword || ""), [keyword]);

  useEffect(() => {
    if (!pcSize && searchModal && !keyword) {
      document.body.style.overflow = "hidden";
      inputFocus.current.focus();
    } else if (!pcSize && (keyword || searchValue)) {
      setSearchModal(true);
      document.body.style.removeProperty("overflow");
    } else if (pcSize && (keyword || searchValue)) {
      setSearchModal(false);
      document.body.style.removeProperty("overflow");
    }
  }, [keyword, searchModal, searchValue, pcSize]);

  //얘를 계속 체크해서 랜더링이 일어남.
  useEffect(() => {
    if (!keyword) {
      setSearchModal(false);
      document.body.style.removeProperty("overflow");
    }
  }, [keyword]);

  return (
    <>
      <div className={styles.searchbarContainer}>
        <form
          onSubmit={handleSearchSubmit}
          className={`${pcSize ? styles.form : styles.hidden}`}
        >
          <input
            type="search"
            className={styles.barInput}
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            ref={inputFocus}
          />
          <button className={styles.subButton} type="submit">
            <BsSearch size={18} />
          </button>
        </form>
        <button
          className={`${pcSize && styles.hidden}`}
          type="button"
          onClick={() => setSearchModal(true)}
        >
          <BsSearch size={17} />
        </button>
      </div>

      {/* mobile화면 일때 */}
      {searchModal && (
        <div
          className={`${
            keyword ? styles.keywordContainer : styles.searchModalContainer
          }`}
        >
          <div className={styles.searchModalHeader}>
            <button
              className={styles.backButton}
              type="button"
              onClick={handleGobackButton}
            >
              &lt;
            </button>
            <form className={styles.form} onSubmit={handleSearchSubmit}>
              <input
                className={styles.modalInput}
                type="search"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                ref={inputFocus}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
