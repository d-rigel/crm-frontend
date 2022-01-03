import { otpReqPending, otpReqSuccess, otpReqFail } from "./resetPwSlice";
import { reqPasswordOtp } from "../../api/passwordApi";

export const sendPasswordResetOtp = (email) => async (dispatch) => {
  try {
    dispatch(otpReqPending());
    // const result = await reqPasswordOtp(email);
    const { status, message } = await reqPasswordOtp(email);
    if (status === "success") {
      dispatch(otpReqSuccess(message));
    }
    dispatch(otpReqFail(message));
  } catch (error) {
    dispatch(otpReqFail(error.message));
  }
};
