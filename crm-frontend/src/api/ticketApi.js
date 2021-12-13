import axios from "axios";
const rootUrl = "http://localhost:5000/v1/";
const allTicketUrl = rootUrl + "ticket";
const ticketUrl = rootUrl + "ticket/";
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
      console.log("result from all tickets", result);
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
      const result = await axios.get(ticketUrl + _id, {
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
      const result = await axios.put(ticketUrl + _id, msgObj, {
        headers: {
          Authorization: sessionStorage.getItem("accessToken"),
        },
      });
      console.log("from update reply ticket", result.data);
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

//create ticket
export const createNewTicket = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(ticketUrl, frmData, {
        headers: {
          Authorization: sessionStorage.getItem("accessToken"),
        },
      });
      // console.log(result.data);
      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};
