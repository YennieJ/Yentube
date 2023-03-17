import React from "react";
import { useMatch } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { searchModalState } from "atoms";

import styles from "./MFooter.module.css";
import { AiFillHome } from "react-icons/ai";

const MFooter = () => {
  const homePage = useMatch("");
  const searchModal = useRecoilValue(searchModalState);

  // home에서는 맨위로 아닐때는 리로드
  const handleGohome = () => {
    if (homePage) {
      return window.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.location.replace("/");
  };

  return (
    <>
      {/* searchModal이 닫혀있는 경우엔 옌튜브가 보이니까 나타나지 않게*/}
      {(searchModal || homePage) && (
        <button className={styles.footer} onClick={handleGohome}>
          <AiFillHome size={24} />
          Home
        </button>
      )}
    </>
  );
};

export default MFooter;
