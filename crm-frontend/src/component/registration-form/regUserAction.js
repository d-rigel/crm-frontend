import {
  registrationPending,
  registrationSuccess,
  registrationError,
} from "./userRegistrationSlice";
import { registerUser } from "../../api/userApi";

export const userRegistration = (frmDt) => async (dispatch) => {
  try {
    dispatch(registrationPending());
    const result = await registerUser(frmDt);
    result.status === "success"
      ? dispatch(registrationSuccess(result.message))
      : dispatch(registrationError(result.message));
    console.log("from regitration", result);
  } catch (error) {
    dispatch(registrationError(error.message));
  }
};
