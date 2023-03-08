import React from "react";

import styles from "./Sidebar.module.css";
import { BsX } from "react-icons/bs";
import { TbDoorExit } from "react-icons/tb";

const Sidebar = ({ user, setIsLogin, setIsSideber, size }) => {
  const signout = () => {
    setIsLogin(false);
    setIsSideber(false);
    sessionStorage.clear();
  };

  console.log("sidebar");
  return (
    <div className={styles.openSidebar}>
      {!size && (
        <button
          className={styles.sidebarCloseButton}
          onClick={() => setIsSideber(false)}
        >
          <BsX />
        </button>
      )}
      <div className={styles.userInfo}>
        <img src={user.picture} alt="" className={styles.insideProfileImg} />
        <span className={styles.userName}>{user.name}</span>
      </div>
      <button onClick={signout} className={styles.signout}>
        <TbDoorExit size="30" style={{ marginRight: "15px" }} />
        Sing out
      </button>
    </div>
  );
};

export default Sidebar;
