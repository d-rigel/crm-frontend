import React, { useState } from "react";
import "./entry.style.css";
import { LoginForm } from "../../component/login/login/LoginForm";
import { ResetPassword } from "../../component/password.reset/PasswordReset.comp";
export const Entry = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [frmLoad, setFrmLoad] = useState("login");

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
    // console.log(name, value, "welcome");
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("please fill all boxes!");
    }
    if (password.length < 5) {
      return alert("short password!");
    }

    //TODO: call api to submit the form
    console.log("Email: ", email, "Password:", password);
  };

  const handleOnResetSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return alert("please input email!!!");
    }
    console.log(email);
  };

  const formSwitcher = (formType) => {
    setFrmLoad(formType);
  };
  return (
    <div className="entry-page bg-info">
      <>
        <div className=" form-box p-5 bg-light">
          {frmLoad === "login" && (
            <LoginForm
              handleOnchange={handleOnchange}
              handleOnSubmit={handleOnSubmit}
              formSwitcher={formSwitcher}
              email={email}
              password={password}
            />
          )}

          {frmLoad === "reset" && (
            <ResetPassword
              handleOnchange={handleOnchange}
              handleOnResetSubmit={handleOnResetSubmit}
              formSwitcher={formSwitcher}
              email={email}
            />
          )}
        </div>
      </>
    </div>
  );
};
