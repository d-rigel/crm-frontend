import {
  fetchTicketloading,
  fetchTicketSuccess,
  fetchTicketFail,
  searchTickets,
  fetchSingleTicketloading,
  fetchSingleTicketSuccess,
  fetchSingleTicketFail,
  replyTicketloading,
  replyTicketSuccess,
  replyTicketFail,
  closeTicketloading,
  closeTicketSuccess,
  closeTicketFail,
} from "./ticketsSlice";
import {
  getAlltickets,
  getSingleTicket,
  updateReplyTicket,
  updateTicketStatusClose,
} from "../../api/ticketApi";

export const fetchAllTickets = () => async (dispatch) => {
  dispatch(fetchTicketloading());
  try {
    const result = await getAlltickets();
    console.log(result.data.result);

    // dispatch(fetchTicketSuccess(result.data.result));
    dispatch(fetchTicketSuccess(result.data.result));
  } catch (error) {
    dispatch(fetchTicketFail(error.message));
  }
};

export const filterSearchTicket = (str) => (dispatch) => {
  dispatch(searchTickets(str));
};

//action for single ticket
export const fetchSingleTicket = (_id) => async (dispatch) => {
  dispatch(fetchSingleTicketloading());
  try {
    const result = await getSingleTicket(_id);

    dispatch(
      fetchSingleTicketSuccess(
        result.data.result.length && result.data.result[0]
      )
    );
  } catch (error) {
    dispatch(fetchSingleTicketFail(error.message));
  }
};

//Actions for replying on single ticket
//action for single ticket
export const replyOnTicket = (_id, msgObj) => async (dispatch) => {
  dispatch(replyTicketloading());
  try {
    const result = await updateReplyTicket(_id, msgObj);
    // console.log(result);
    if (result.status === "error") {
      return dispatch(replyTicketFail(result.message));
    }

    //It is called again here to update the message
    dispatch(fetchSingleTicket(_id));
    if (result.status === "success") {
      return dispatch(replyTicketSuccess(result.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(replyTicketFail(error.message));
  }
};

//close ticket
export const closeTicket = (_id) => async (dispatch) => {
  dispatch(closeTicketloading());
  try {
    const result = await updateTicketStatusClose(_id);
    // console.log(result);
    if (result.status === "error") {
      return dispatch(closeTicketFail(result.message));
    }

    //It is called again here to update the message
    dispatch(fetchSingleTicket(_id));
    if (result.status === "success") {
      return dispatch(closeTicketSuccess(result.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(closeTicketFail(error.message));
  }
};
