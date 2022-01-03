import React, { useState } from "react";
import "./entry.style.css";
import { LoginForm } from "../../component/login/login/LoginForm";
import { ResetPassword } from "../../component/password.reset/PasswordReset.comp";
export const Entry = () => {
  const [frmLoad, setFrmLoad] = useState("login");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [frmLoad, setFrmLoad] = useState("login");

  // const handleOnchange = (e) => {
  //   const { name, value } = e.target;

  //   switch (name) {
  //     case "email":
  //       setEmail(value);
  //       break;
  //     case "password":
  //       setPassword(value);
  //       break;
  //     default:
  //       break;
  //   }
  //   // console.log(name, value, "welcome");
  // };

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  //   if (!email || !password) {
  //     return alert("please fill all boxes!");
  //   }
  //   if (password.length < 5) {
  //     return alert("short password!");
  //   }

  //   //TODO: call api to submit the form
  //   console.log("Email: ", email, "Password:", password);
  // };

  // const handleOnResetSubmit = (e) => {
  //   e.preventDefault();
  //   if (!email) {
  //     return alert("please input email!!!");
  //   }
  //   console.log(email);
  // };

  //workflow for creating reset password page
  // [] Create password reset page
  // [] Add request OTP
  // [] Add redux store with Redux-toolkit to handle the network status
  // [] sent OTP to email from API (API Already created)
  // [] Load form to input OTP and new password
  // [] New password must match confirm password, form validation
  // [] Connect to API Endpoint (API Already created)
  // [] Add reducer through Redux-toolkit to handle the network status and preview
  // [] Send email, OTP and new password to update the password
  // []
  // []
  const formSwitcher = (formType) => {
    setFrmLoad(formType);
  };
  return (
    <div className="entry-page bg-info">
      <>
        <div className=" form-box p-5 bg-light">
          {frmLoad === "login" && (
            <LoginForm
              // handleOnchange={handleOnchange}
              // handleOnSubmit={handleOnSubmit}
              formSwitcher={formSwitcher}
              // email={email}
              // password={password}
            />
          )}

          {frmLoad === "reset" && (
            <ResetPassword
              // handleOnchange={handleOnchange}
              // handleOnResetSubmit={handleOnResetSubmit}
              formSwitcher={formSwitcher}
              // email={email}
            />
          )}
        </div>
      </>
    </div>
  );
};
