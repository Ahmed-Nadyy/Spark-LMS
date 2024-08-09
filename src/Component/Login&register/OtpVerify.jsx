import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector  } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function OtpVerify() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.email);

  async function verifyOtp(otpData) {
    try {
      const response = await axios.post(
        "http://lms.tryasp.net/Account/verify-otp", 
        { otp, email }
      );
      toast.success("OTP verified successfully!");
      navigate("/signin"); 
    } catch (error) {
      console.log(email);
      console.log("Error verifying OTP:", error);
      toast.error(
        "Error verifying OTP: " +
          (error.response?.data?.message || error.message)
      );
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!otp) {
      toast.error("OTP is required");
      return;
    }

    const otpData = { otp  };
    await verifyOtp(otpData);
  };

  const handleChange = (event) => {
    setOtp(event.target.value);
  };

  return (
    <div className="container-fluid">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <div className="row">
        <div className="col-md-6 offset-md-3 d-flex justify-content-center align-items-center bg-light">
          <form className="p-5" onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">Verify OTP</h3>
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                className="form-control"
                placeholder="Enter the OTP"
                value={otp}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;
