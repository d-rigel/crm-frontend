import axios from "axios";

export const getAlltickets = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("http://localhost:5000/v1/ticket", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpZ2VsNGdAZ21haWwuY29tIiwiaWF0IjoxNjM0MjM5Mjg3LCJleHAiOjE2MzQyNDAxODd9.Uhg60wNXz1mSNZ6GA3CiEMFzIrx9DHaQbxMFfjUw8ug",
        },
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
