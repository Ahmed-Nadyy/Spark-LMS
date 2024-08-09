import React, { useState } from "react";
import axios from "axios";
import './EditProfile.css';

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://lms.tryasp.net/Account/reset-password", {
        email,
        newPassword,
        otp,
      });
      setMessage("Password reset successfully!");
    } catch (error) {
      setMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input className="bg-light form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>New Password:</label>
          <input className="bg-light form-control" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div>
          <label>OTP:</label>
          <input className="bg-light form-control" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        </div>
        <button type="submit" className=" btn btn-dark my-4">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
