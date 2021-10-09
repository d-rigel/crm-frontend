import axios from "axios";

export const getAlltickets = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("http://localhost:5000/v1/ticket", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpZ2VsNGdAZ21haWwuY29tIiwiaWF0IjoxNjMzNzgzMDE3LCJleHAiOjE2MzM3ODM5MTd9.wF0BSNi-b91OEr3FaB0jEkuhz2gqiev183_7s6-ao9E",
        },
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
