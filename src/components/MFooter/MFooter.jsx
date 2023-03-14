import React from "react";
import { useMatch } from "react-router-dom";

import styles from "./MFooter.module.css";
import { AiFillHome } from "react-icons/ai";

const MFooter = () => {
  const watchPage = useMatch("/videos/watch/:id");

  const handleGohome = () => {
    window.location.replace("/");
  };
  return (
    <>
      {!watchPage && (
        <button className={styles.footer} onClick={handleGohome}>
          <AiFillHome size={24} />
          Home
        </button>
      )}
    </>
  );
};

export default MFooter;
