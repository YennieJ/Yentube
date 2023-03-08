import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useSize from "hooks/useSize";

import styles from "./Search.module.css";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();

  const size = useSize();

  const [searchValue, setSearchValue] = useState("");
  const [searchModal, setSearchModal] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue) {
      navigate(`videos/${searchValue}`);
      setSearchModal(false);
    }
  };

  useEffect(() => setSearchValue(keyword || ""), [keyword]);

  useEffect(() => {
    if (!size && searchModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
      setSearchModal(false);
    }
  }, [searchModal, size]);

  console.log("search");
  return (
    <>
      <div className={styles.searchbarContainer}>
        <form
          onSubmit={handleSearchSubmit}
          className={`${size ? styles.form : styles.hidden}`}
        >
          <input
            type="search"
            className={styles.barInput}
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className={styles.subButton} type="submit">
            <BsSearch />
          </button>
        </form>
        <button
          className={`${size && styles.hidden}`}
          type="button"
          onClick={() => setSearchModal(true)}
        >
          <BsSearch size={24} />
        </button>
      </div>

      {/* mobile화면 일때 */}
      {searchModal && (
        <div className={styles.searchModalContainer}>
          <div className={styles.searchModalHeader}>
            <button
              className={styles.backButton}
              type="button"
              onClick={() => setSearchModal(false)}
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
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
