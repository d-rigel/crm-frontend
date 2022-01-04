import { createSlice } from "@reduxjs/toolkit";

const initOtpState = {
  isLoading: false,
  status: "",
  message: "",
  showUpdatePassForm: false,
  email: "",
};

const passwordReset = createSlice({
  name: "passwordReset",
  initialState: initOtpState,
  reducers: {
    otpReqPending: (state) => {
      state.isLoading = true;
    },
    otpReqSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.message = action.payload.message;
      state.email = action.payload.email;
      state.showUpdatePassForm = true;
    },
    updatePassSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.message = action.payload;
      // state.showOtpForm = false;
    },
    otpReqFail: (state, action) => {
      state.isLoading = false;
      state.status = "error";
      state.message = action.payload;
    },
  },
});

const { reducer, actions } = passwordReset;
export const { otpReqPending, otpReqSuccess, otpReqFail, updatePassSuccess } =
  actions;

export default reducer;
