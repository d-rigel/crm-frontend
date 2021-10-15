import axios from "axios";

export const getAlltickets = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("http://localhost:5000/v1/ticket", {
        headers: {
          Authorization: sessionStorage.getItem("accessToken"),
        },
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
