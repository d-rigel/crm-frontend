import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./pages/ticket-list/ticketsSlice";
import loginReducer from "./component/login/login/loginSlice";

const store = configureStore({
  reducer: {
    tickets: ticketReducer,
    login: loginReducer,
  },
});

export default store;
