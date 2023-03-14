import React from "react";

import styles from "./Loading.module.css";

const Loading = ({ type }) => {
  const emtpyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  //for css
  const isRelated = type === "relatedLoading";

  return (
    <>
      <ul className={isRelated ? styles.relatedContainer : styles.container}>
        {emtpyArray.map((i) => (
          <li key={i} className={isRelated ? styles.relatedList : styles.list}>
            <div className={isRelated ? styles.relatedImg : styles.img} />
            <div className={isRelated ? styles.relatedInfo : styles.info} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Loading;
