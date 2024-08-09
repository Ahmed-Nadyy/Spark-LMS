import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import './EditProfile.css';


function Settings() {
  return (
    <div className="wrapper bg-white mt-sm-5 my-5">
         <h4 className="pb-4 border-bottom">Setting</h4>
    <div className="settings-container">
      <div className="settings-menu">
        <Link to="change-password" className="settings-link btn link-danger">Change Password</Link>
        <Link to="forget-password" className="settings-link btn link-danger">Forget Password</Link>
        <Link to="reset-password" className="settings-link btn link-danger">Reset Password</Link>
      </div>
      <div className="settings-content">
        <Routes>
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </div>
    </div>
  );
}

export default Settings;
