import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./pages/ticket-list/ticketsSlice";
import loginReducer from "./component/login/login/loginSlice";
import userReducer from "./pages/dashboard/userSlice";

const store = configureStore({
  reducer: {
    tickets: ticketReducer,
    login: loginReducer,
    user: userReducer,
  },
});

export default store;
