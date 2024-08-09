import React, { useState } from "react";
import axios from "axios";
import { useDispatch  } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setEmail } from '../../Redux/authSlice';
import img from "./Art.png";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "123456",
    confirmPassword: "123456",
    phoneNumber: "",
    govenorate: "",
    accountType: 1,
    
  });
  const dispatch = useDispatch();


  const navigate = useNavigate();

  async function registerUser(userData) {
    try {
      const response = await axios.post(
        "http://lms.tryasp.net/Account/register",
        userData
      );
      const token = response.data.token; 
      localStorage.setItem("token", token); 
      navigate("/otp-verify");
    } catch (error) {
      console.log("Error registering user:", error);
      toast.error(
        "Error registering user: " +
        (error.response?.data?.message || error.message)
      );
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.phoneNumber ||
      !formData.govenorate ||
      !formData.accountType 
    ) {
      toast.error("All fields are required");
      return;
    }
    dispatch(setEmail(formData.email));
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if(formData.accountType == "Student") formData.accountType =1;
    else formData.accountType =0;

    await registerUser(formData);
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
        <div className="col-md-7 d-flex justify-content-center align-items-center bg-light">
          <form className="p-5" onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">Register Now 😊</h3>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                placeholder="Enter Your First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                placeholder="Enter Your Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirm_password" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Your Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="form-control"
                placeholder="Enter Your Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="govenorate" className="form-label">
                Governorate
              </label>
              <input
                type="text"
                id="govenorate"
                name="govenorate"
                className="form-control"
                placeholder="Enter Your Governorate"
                value={formData.govenorate}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Sign Up
            </button>
          </form>
        </div>
        <div className="Register-Img col-md-5 m-0 p-0 d-flex justify-content-center">
          <img src={img} alt="Login Art" className="w-100 m-1" />
        </div>
      </div>
    </div>
  );
}

export default Register;
