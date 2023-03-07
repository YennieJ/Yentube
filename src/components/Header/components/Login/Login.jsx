import React, { useState, useEffect, useRef } from "react";
import { useGoogleLogin } from "@react-oauth/google";

import axios from "axios";

import styles from "./Login.module.css";
import { BsPersonCircle, BsX } from "react-icons/bs";
import { TbDoorExit, TbX } from "react-icons/tb";

//google oauth를 사용하여 로그인해서 정보를 받아오는 것까진 했는데 그 정보를 가지고 로그아웃하는것까진 토큰에 대해서 알아야해서.. 일단 sesstionStorage를 이용하고 공부를 더 해서 refreshTokken? 까지 완성하는 걸로...!
//랜더링을 하고나서 useEffect를 확인하는건가? 왜 중요한지 깨닫는중ㅋ

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSidebar, setIsSideber] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));

  const inSidebar = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", closeSidebar);

    return () => {
      document.removeEventListener("mousedown", closeSidebar);
    };
  });

  const closeSidebar = (e) => {
    if (!inSidebar.current.contains(e.target) && isSidebar === true) {
      setIsSideber(false);
    }
  };

  const [size, setSize] = useState(window.innerWidth > 499);

  const resizeHanlder = () => {
    const width = window.innerWidth > 499;
    setSize(width);
  };
  useEffect(() => {
    window.addEventListener("resize", resizeHanlder);
    return () => {
      window.removeEventListener("resize", resizeHanlder);
    };
  }, []);

  useEffect(() => {
    if (!size && isSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
  }, [isSidebar, size]);

  //이거 나누고싶은데.
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );

        sessionStorage.setItem("user", JSON.stringify(res.data));
        setIsLogin(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    user !== null && setIsLogin(true);
  }, [user]);

  const signout = () => {
    setIsLogin(false);
    setIsSideber(false);
    sessionStorage.clear();
  };

  return (
    <>
      {isLogin ? (
        <div className={styles.profile} ref={inSidebar}>
          <button onClick={() => setIsSideber(!isSidebar)}>
            <img src={user.picture} alt="" className={styles.profileImg} />
          </button>

          {isSidebar && (
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
                <img
                  src={user.picture}
                  alt=""
                  className={styles.insideProfileImg}
                />
                <span className={styles.userName}>{user.name}</span>
              </div>
              <button onClick={signout} className={styles.signout}>
                <TbDoorExit size="30" style={{ marginRight: "15px" }} />
                Sing out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button className={styles.login} onClick={login}>
          <BsPersonCircle size="25" />
          <span className={styles.loginStr}>로그인</span>
        </button>
      )}
    </>
  );
};

export default Login;
