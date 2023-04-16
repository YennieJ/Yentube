import React, { useEffect, useRef, useState } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";

import { useRecoilState, useResetRecoilState } from "recoil";
import { pageState, searchModalState } from "atoms";
import useSize from "Hooks/useSize";

import styles from "./Search.module.css";
import { BsSearch, BsArrowLeft } from "react-icons/bs";

// recoil울 사용해서 page 체크
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("search_query");

  const watchPage = useMatch("watch");
  const homePage = useMatch("");

  //pc,mobile size 체크
  const size = useSize();
  const pcSize = size > 499;

  const [searchValue, setSearchValue] = useState("");

  //mobile: pageNumber를 체크해서 modal control
  const [page, setPage] = useRecoilState(pageState);
  const [searchModal, setSearchModal] = useRecoilState(searchModalState);
  const resetPage = useResetRecoilState(pageState);
  const closeSearchModal = useResetRecoilState(searchModalState);

  //input focus를 위한 Ref
  const inputRef = useRef(null);
  const modalInputRef = useRef(null);

  //submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchValue) {
      setPage((prev) => ++prev);
      navigate({
        pathname: "/results",
        search: `?search_query=${searchValue}`,
      });
      document.body.style.removeProperty("overflow");
      pcSize ? inputRef.current.blur() : modalInputRef.current.blur();
    }
    window.scrollTo({ top: 0 });
  };

  //mobile: prev page button
  const handleGobackButton = () => {
    if (page === 0) {
      setSearchValue("");
      closeSearchModal();
      document.body.style.removeProperty("overflow");
    } else if (page === 1) {
      setSearchValue("");
      resetPage();
      closeSearchModal();
      navigate("/", { replace: true });
      document.body.style.removeProperty("overflow");
    } else if (page > 1) {
      setPage((prev) => --prev);
      navigate(-1);
    }

    window.scrollTo({ top: 0 });
  };

  //mobile: search modal scroll controller
  const openSearchMoal = () => {
    setSearchModal(true);
    page === 0
      ? (document.body.style.overflow = "hidden")
      : document.body.style.removeProperty("overflow");
  };

  //뒤로가기할때 검색어 변하게
  useEffect(() => {
    if (!watchPage) {
      setSearchValue(keyword || "");
    }
  }, [keyword, watchPage]);

  //처음 모달창을 열때 focus
  useEffect(() => {
    searchModal && !searchValue && modalInputRef.current.focus();
  });

  //pc와 mobile 화면 이동시 searchModal controller
  useEffect(() => {
    //pc > mobile 검색어 &&
    if (!pcSize && keyword) {
      setSearchModal(true);
      document.body.style.removeProperty("overflow");
    } //pc > mobile 검색중 &&
    else if (!pcSize && searchValue && homePage) {
      setSearchModal(true);
      document.body.style.overflow = "hidden";
    } // mobile > pc 검색어 &&
    else if (searchModal && pcSize) {
      closeSearchModal();
      document.body.style.removeProperty("overflow");
    } // mobile : watchPage && 검색어 &&
    else if (!pcSize && watchPage && searchValue) {
      setSearchModal(true);
      document.body.style.removeProperty("overflow");
    }
  }, [
    closeSearchModal,
    homePage,
    keyword,
    pcSize,
    searchModal,
    searchValue,
    setSearchModal,
    watchPage,
  ]);

  return (
    <>
      <div className={styles.searchbarContainer}>
        <form
          className={`${pcSize ? styles.form : styles.hidden}`}
          onSubmit={handleSearchSubmit}
        >
          <input
            className={styles.barInput}
            type="search"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            ref={inputRef}
          />
          <button className={styles.subButton} type="submit">
            <BsSearch size={18} />
          </button>
        </form>
        {!pcSize && (
          <button type="button" onClick={openSearchMoal}>
            <BsSearch size={17} />
          </button>
        )}
      </div>

      {/* mobile화면 일때 */}
      {searchModal && (
        <div
          className={`${
            page === 0 ? styles.searchModalContainer : styles.keywordContainer
          }`}
        >
          <div className={styles.searchModalcontent}>
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
