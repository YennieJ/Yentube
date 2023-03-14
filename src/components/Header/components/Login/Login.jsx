import React, { useState, useEffect, useRef } from "react";
import { useGoogleLogin } from "@react-oauth/google";

import axios from "axios";

import Sidebar from "./components/Sidebar/Sidebar";
import useSize from "hooks/useSize";

import styles from "./Login.module.css";
import { BsPersonCircle } from "react-icons/bs";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSidebar, setIsSideber] = useState(false);

  // login 확인 유무.
  const user = JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {
    user !== null && setIsLogin(true);
  }, [user]);

  // sidebar 외부 클릭시 sidebar close
  const inSidebar = useRef(null);

  const closeSidebar = (e) => {
    if (!inSidebar.current.contains(e.target)) {
      setIsSideber(false);
    }
  };
  useEffect(() => {
    isSidebar === true && document.addEventListener("mousedown", closeSidebar);

    return () => {
      document.removeEventListener("mousedown", closeSidebar);
    };
  });

  //mobile modal 때 스크롤막기
  const size = useSize();
  const pcSize = size > 499;
  useEffect(() => {
    if (!pcSize && isSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
  }, [isSidebar, pcSize]);

  //로그인
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );
        console.log(response);
        sessionStorage.setItem("user", JSON.stringify(res.data));

        setIsLogin(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      {isLogin ? (
        <div className={styles.profile} ref={inSidebar}>
          <button onClick={() => setIsSideber(!isSidebar)}>
            <img src={user.picture} alt="" className={styles.profileImg} />
          </button>

          {isSidebar && (
            <Sidebar
              user={user}
              setIsLogin={setIsLogin}
              setIsSideber={setIsSideber}
            />
          )}
        </div>
      ) : (
        <button className={styles.login} onClick={login}>
          <BsPersonCircle size="20" />
          <span className={styles.loginStr}>로그인</span>
        </button>
      )}
    </>
  );
};

export default Login;
