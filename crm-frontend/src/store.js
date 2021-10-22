import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./pages/ticket-list/ticketsSlice";
import loginReducer from "./component/login/login/loginSlice";
import userReducer from "./pages/dashboard/userSlice";
import newTicketReducer from "./component/add-ticket-form/addTicketSlice";

const store = configureStore({
  reducer: {
    tickets: ticketReducer,
    login: loginReducer,
    user: userReducer,
    openTicket: newTicketReducer,
  },
});

export default store;
