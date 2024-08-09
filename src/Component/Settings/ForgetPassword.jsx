import React, { useState } from "react";
import axios from "axios";
import './EditProfile.css';

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://lms.tryasp.net/Account/forget-password?email=${email}`);
      setMessage("Password reset link sent to your email.");
    } catch (error) {
      setMessage("Failed to send password reset link. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input className="bg-light form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className=" btn btn-dark my-4">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgetPassword;
