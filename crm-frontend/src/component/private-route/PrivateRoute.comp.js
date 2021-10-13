import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { DefaultLayout } from "../layout/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../login/login/loginSlice";
import { fetchNewAccessJWT } from "../../api/userApi";

// const isAuth = true;
export const PrivateRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.login);

  useEffect(() => {
    const updateNewAccessJWt = async () => {
      const result = await fetchNewAccessJWT();
      result && dispatch(loginSuccess());
    };
    updateNewAccessJWt();

    sessionStorage.getItem("accessToken") && dispatch(loginSuccess());
  }, [dispatch]);
  return (
    <Route
      {...rest}
      render={() =>
        isAuth ? <DefaultLayout>{children}</DefaultLayout> : <Redirect to="/" />
      }
    />
  );
};
