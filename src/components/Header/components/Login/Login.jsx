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
    if (!inSidebar.current.contains(e.target) && isSidebar === true) {
      setIsSideber(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", closeSidebar);

    return () => {
      document.removeEventListener("mousedown", closeSidebar);
    };
  });

  //mobile modal 때 스크롤막기
  const size = useSize();
  useEffect(() => {
    if (!size && isSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
  }, [isSidebar, size]);

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

  console.log("login");

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
              size={size}
            />
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
