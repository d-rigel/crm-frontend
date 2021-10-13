import { getUserPending, getUserSuccess, getUserFail } from "./userSlice";
import { fetchUser } from "../../api/userApi";

export const getuserProfile = () => async (dispatch) => {
  try {
    dispatch(getUserPending());
    //call api
    const result = await fetchUser();
    console.log(result);
    if (result.user && result.user._id)
      return dispatch(getUserSuccess(result.user));

    dispatch(getUserFail("User is not found"));
  } catch (error) {
    dispatch(getUserFail(error));
  }
};
