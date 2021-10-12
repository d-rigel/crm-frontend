import axios from "axios";

export const getAlltickets = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("http://localhost:5000/v1/ticket", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpZ2VsNGdAZ21haWwuY29tIiwiaWF0IjoxNjMzODgyOTAyLCJleHAiOjE2MzM4ODM4MDJ9.N2eCaJ-xkrX25Nd9iUqnzxrfwI1pLDrPzXSAXQEkrMw",
        },
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
