import axios from "axios";
const rootUrl = "http://localhost:5000/v1/";
const otpReqUrl = rootUrl + "user/reset-password";
const updatePassUrl = rootUrl + "user/reset-password";

export const reqPasswordOtp = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(otpReqUrl, { email });
      console.log(data);
      resolve(data);
    } catch (error) {
      reject(error);
      // reject({ status: "error", message: error.message });
    }
  });
};

export const updateUserPassword = async (passObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.patch(updatePassUrl, passObj);
      console.log("from update action", data);
      resolve(data);
    } catch (error) {
      reject(error);
      // reject({ status: "error", message: error.message });
    }
  });
};
