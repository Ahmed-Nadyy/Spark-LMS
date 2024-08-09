import React, { useState } from "react";
import axios from "axios";
import './EditProfile.css';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://lms.tryasp.net/Account/change-password", {
        currentPassword,
        newPassword,
        otp,
      });
      setMessage("Password changed successfully!");
    } catch (error) {
      setMessage("Failed to change password. Please try again.");
    }
  };

  return (
    <div className=" container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Current Password:</label>
          <input className="bg-light form-control" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
        </div>
        <div>
          <label>New Password:</label>
          <input className="bg-light form-control" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div>
          <label>OTP:</label>
          <input type="text" className="bg-light form-control" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        </div>
        <button type="submit" className=" btn btn-dark my-4">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ChangePassword;
