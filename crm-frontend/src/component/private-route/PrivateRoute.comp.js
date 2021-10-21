import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { DefaultLayout } from "../layout/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../login/login/loginSlice";
import { fetchNewAccessJWT } from "../../api/userApi";
import { getuserProfile } from "../../pages/dashboard/userAction";

// const isAuth = true;
export const PrivateRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    const updateNewAccessJWt = async () => {
      const result = await fetchNewAccessJWT();
      result && dispatch(loginSuccess());
    };
    !user._id && dispatch(getuserProfile());
    !sessionStorage.getItem("accessToken") &&
      localStorage.getItem("crmsite") &&
      updateNewAccessJWt();

    !isAuth &&
      sessionStorage.getItem("accessToken") &&
      dispatch(loginSuccess());
  }, [dispatch, isAuth, user._id]);
  return (
    <Route
      {...rest}
      render={() =>
        isAuth ? <DefaultLayout>{children}</DefaultLayout> : <Redirect to="/" />
      }
    />
  );
};
