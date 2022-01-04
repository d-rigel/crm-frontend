import React, { useState } from "react";
import "./passwordOtpForm.style.css";
// import { LoginForm } from "../../component/login/login/LoginForm";
import { ResetPassword } from "../../component/password.reset/PasswordReset.comp";
import { reqPasswordOtp } from "../../api/passwordApi";
import { UpdatePasswordForm } from "../../component/password.reset/UpdatePasswordForm";
import { useDispatch, useSelector } from "react-redux";

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

export const PasswordOtpForm = () => {
  const { showUpdatePassForm } = useSelector((state) => state.password);
  return (
    <div className="password-reset bg-info">
      <>
        <div className=" form-box-reset p-5 bg-light">
          {showUpdatePassForm ? <UpdatePasswordForm /> : <ResetPassword />}
        </div>
      </>
    </div>
  );
};
