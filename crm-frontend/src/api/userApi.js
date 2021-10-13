import axios from "axios";

const rootUrl = "http://localhost:5000/v1/";
const loginUrl = rootUrl + "user/login";
const userProfileUrl = rootUrl + "user";
const logoutUrl = rootUrl + "user/logout";
const newAccessJwt = rootUrl + "tokens";

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

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessToken");

      if (!accessJWT) {
        reject("Token not found");
      }
      const res = await axios.get(userProfileUrl, {
        headers: {
          Authorization: accessJWT,
        },
      });
      console.log(res.data);

      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const fetchNewAccessJWT = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // const accessJWT = sessionStorage.getItem("accessToken");
      const { refreshToken } = JSON.parse(localStorage.getItem("crmsite"));

      if (!refreshToken) {
        reject("Token not found");
      }
      const res = await axios.get(newAccessJwt, {
        headers: {
          Authorization: refreshToken,
        },
      });

      if (res.data.status === "success") {
        sessionStorage.setItem("accessToken", res.data.accessJWT);
      }

      console.log(res.data);

      resolve(true);
    } catch (error) {
      console.log(error.message);
      if (error.message === "Request failed with status code 403") {
        localStorage.removeItem("crmsite");
      }
      reject(false);
    }
  });
};

export const userLogout = async () => {
  try {
    await axios.delete(logoutUrl, {
      headers: {
        Authorization: sessionStorage.setItem("accessToken"),
      },
    });
  } catch (error) {
    console.log(error);
  }
};
