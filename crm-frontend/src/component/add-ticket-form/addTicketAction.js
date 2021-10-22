import {
  openNewTicketPending,
  openNewTicketSuccess,
  openNewTicketFail,
} from "./addTicketSlice";
import { createNewTicket } from "../../api/ticketApi";

export const openNewTicket = (frmData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(openNewTicketPending());
      //call api
      const result = await createNewTicket(frmData);
      if (result.status === "error") {
        return dispatch(openNewTicketFail(result.message));
      }

      dispatch(openNewTicketSuccess(result));
    } catch (error) {
      console.log(error);
      dispatch(openNewTicketFail(error.message));
    }
  });
};
