import React from "react";

import styles from "./Sidebar.module.css";
import { BsX } from "react-icons/bs";
import { TbDoorExit } from "react-icons/tb";

const Sidebar = ({ user, setIsLogin, setIsSideber }) => {
  //로그아웃 버튼
  const signout = () => {
    setIsLogin(false);
    setIsSideber(false);
    sessionStorage.clear();
  };

  return (
    <div className={styles.openSidebar}>
      <button
        className={styles.sidebarCloseButton}
        onClick={() => setIsSideber(false)}
      >
        <BsX size={40} />
      </button>
      <div className={styles.userInfo}>
        <img src={user.picture} alt="" className={styles.insideProfileImg} />
        <span className={styles.userName}>{user.name}</span>
      </div>
      <button onClick={signout} className={styles.signoutContainer}>
        <span className={styles.signoutImoge}>
          <TbDoorExit size={24} />
        </span>
        Sing out
      </button>
    </div>
  );
};

export default Sidebar;
