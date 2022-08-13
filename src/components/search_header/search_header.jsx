import React, { useRef, memo } from "react";
import styles from "./search_header.module.css";

const SearchHeader = memo(( onSearch ) => {
  const inputRef = useRef();
  const handelSearch = () => {
    const value = inputRef.current.value;
    onSearch(value);
  };
  const onClick = () => {
    handelSearch();
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handelSearch();
    }
  };
  // const onclick = () => {
  //   window.location.reload();
  // };

  return (
    <header className={styles.header}>
      <div
        className={styles.logo}
        onClick={() => {
          window.location.reload();
        }}
      >
        <img className={styles.img} src="/img/logo.png" alt="logo" />
        <h1 className={styles.title}>Yentube</h1>
      </div>
      <input
        ref={inputRef}
        onKeyPress={onKeyPress}
        className={styles.input}
        type="serach"
        placeholder="Search..."
      />
      <button className={styles.button} type="submit" onClick={onClick}>
        <img className={styles.buttonimg} src="/img/search.png" alt="search" />
      </button>
    </header>
  );
});
export default SearchHeader;
