import { createSlice } from "@reduxjs/toolkit";

const initOtpState = {
  isLoading: false,
  status: "",
  message: "",
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
      state.message = action.payload;
    },
    otpReqFail: (state, action) => {
      state.isLoading = false;
      state.status = "error";
      state.message = action.payload;
    },
  },
});

const { reducer, actions } = passwordReset;
export const { otpReqPending, otpReqSuccess, otpReqFail } = actions;

export default reducer;
