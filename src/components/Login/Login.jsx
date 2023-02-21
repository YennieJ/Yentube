import React from "react";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import styles from "./Login.module.css";
import { BsPersonCircle } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [isLogin, setIsLogin] = useState();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <button className={styles.login} onClick={login}>
      <BsPersonCircle size="24" />
      <span>로그인</span>
    </button>
  );
};

export default Login;
