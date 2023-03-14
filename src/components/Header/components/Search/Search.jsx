import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useSize from "hooks/useSize";

import styles from "./Search.module.css";
import { BsSearch, BsArrowLeft } from "react-icons/bs";

const Search = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();

  const size = useSize();
  const pcSize = size > 499;

  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchModal, setSearchModal] = useState(false);

  const inputRef = useRef(null);
  const modalInputRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchValue) {
      setPage((prev) => ++prev);
      navigate(`search/${searchValue}`);
      document.body.style.removeProperty("overflow");
      pcSize && inputRef.current.blur();
      !pcSize && modalInputRef.current.blur();
    }
  };

  const handleGobackButton = () => {
    if (page === 0) {
      navigate("/");
      setSearchModal(false);
      setSearchValue("");
      document.body.style.removeProperty("overflow");
    } else if (page === 1) {
      setPage(0);
      setSearchModal(false);
      setSearchValue("");
      navigate("/");
    } else if (page > 1) {
      setPage((prev) => --prev);
      navigate(-1, { replace: true });
    }
  };

  const handleSearchModal = () => {
    setSearchModal(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => setSearchValue(keyword || ""), [keyword]);

  useEffect(() => {
    searchModal && !keyword && modalInputRef.current.focus();
  });

  useEffect(() => {
    if (!pcSize && keyword) {
      setSearchModal(true);
      document.body.style.removeProperty("overflow");
    } else if (
      !pcSize &&
      (searchValue || document.activeElement === inputRef.current)
    ) {
      handleSearchModal();
    } else if (pcSize) {
      setSearchModal(false);
      document.body.style.removeProperty("overflow");
    }
  }, [keyword, pcSize, searchValue]);

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
            ref={inputRef}
          />
          <button className={styles.subButton} type="submit">
            <BsSearch size={18} />
          </button>
        </form>
        <button
          className={`${pcSize && styles.hidden}`}
          type="button"
          onClick={handleSearchModal}
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
              <BsArrowLeft size={20} />
            </button>
            <form className={styles.form} onSubmit={handleSearchSubmit}>
              <input
                className={styles.modalInput}
                type="search"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                ref={modalInputRef}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
