import axios from "axios";
const rootUrl = "http://localhost:5000/v1/";
const allTicketUrl = rootUrl + "ticket";
const singleTicketUrl = rootUrl + "ticket/";
const closeTicketUrl = rootUrl + "ticket/close-ticket/";
//"http://localhost:5000/v1/ticket"

export const getAlltickets = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(allTicketUrl, {
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

//get single ticket action
export const getSingleTicket = async (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(singleTicketUrl + _id, {
        headers: {
          Authorization: sessionStorage.getItem("accessToken"),
        },
      });
      // console.log(result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

//update ticket reply message
export const updateReplyTicket = async (_id, msgObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.put(singleTicketUrl + _id, msgObj, {
        headers: {
          Authorization: sessionStorage.getItem("accessToken"),
        },
      });
      // console.log(result.data);
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

//Close ticket
export const updateTicketStatusClose = async (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(
        closeTicketUrl + _id,
        {},
        {
          headers: {
            Authorization: sessionStorage.getItem("accessToken"),
          },
        }
      );
      // console.log(result.data);
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};
