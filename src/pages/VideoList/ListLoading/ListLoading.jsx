import React from "react";
import styles from "./ListLoading.module.css";
const ListLoading = () => {
  const emtpyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <>
      <ul className={styles.videos}>
        {emtpyArray.map((i) => (
          <li key={i} className={styles.box}>
            <div className={styles.img} />
            <div className={styles.info} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListLoading;
