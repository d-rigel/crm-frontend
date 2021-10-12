import axios from "axios";

const loginUrl = "http://localhost:5000/v1/user/login";

export const userLogin = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(loginUrl, formData);
      // console.log(res.data.accessJWT);

      resolve(res.data);

      if (res.data.status === "success") {
        sessionStorage.setItem("accessToken", res.data.accessJWT);
        localStorage.setItem(
          "crmsite",
          JSON.stringify({ refreshToken: res.data.refreshJWT })
        );
      }
    } catch (error) {
      reject(error);
    }
  });
};
