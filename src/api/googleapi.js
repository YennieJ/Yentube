import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleLogin = () =>
  useGoogleLogin({
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

export default GoogleLogin;
