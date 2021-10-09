import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./pages/ticket-list/ticketsSlice";

const store = configureStore({
  reducer: {
    tickets: ticketReducer,
  },
});

export default store;
