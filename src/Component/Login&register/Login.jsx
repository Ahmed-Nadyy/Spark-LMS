import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { loginSuccess, isStudent, isTeacher, setName } from '../../Redux/authSlice';
import { getUserData } from '../../Redux/userSlice'; 
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import img from "./LoginArt.png";
import iconGoogle from "./Google.png";
import iconFacebook from "./Facebook.png";
import "./Login.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  async function fetchUserData(token) {
    try {
      const response = await axios.get(
        `http://lms.tryasp.net/Account/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      dispatch(getUserData(response.data)); 
    } catch (error) {
      console.log("Error fetching user data:", error);
      toast.error(
        "Error fetching user data: " +
        (error.response?.data?.message || error.message)
      );
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter both email and password.");
      return;
    }
    try {
      const response = await axios.post(
        'http://lms.tryasp.net/Account/login',
        { email, password }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      if (response.data.roles[0] === 'Student') {
        dispatch(isStudent());
      } else {
        dispatch(isTeacher());
      }
      
      let name = response.data.firstName + " " + response.data.lastName;
      dispatch(setName(name));
      
      dispatch(loginSuccess());
      toast.success(`Welcome ${response.data.name}😊`);
      
      await fetchUserData(token); // Fetch user data after login

      navigate('/Home');
    } catch (error) {
      console.log("Login error:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row login-container">
        <div className="col-md-7 d-flex justify-content-center align-items-center bg-light">
          <form onSubmit={handleSubmit} className="p-5">
            <h3 className="text-center mb-4">Welcome Back 😊</h3>
            <p className="text-center mb-4">
              Today is a new day. It's your day. You shape it. Sign in to start studying.
            </p>
            {error && <p className="text-danger mb-3">{error}</p>}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary w-100 mb-3">Sign in</button>
            <div className="mt-3 text-center">
              <div
                style={{
                  borderTop: "1px solid #ccc",
                  width: "100%",
                  margin: "10px 0px 30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "0",
                }}
              >
                <span
                  className="or-text heading-font-l"
                  style={{ background: "white" }}
                >
                  OR
                </span>
              </div>
            </div>

            <button className="btn btn-outline-success w-100 mb-3">
              <img
                style={{ width: "20px", marginRight: "10px" }}
                src={iconGoogle}
                alt="Google Icon"
                className="icon"
              />
              Sign in with Google
            </button>

            <button className="btn btn-outline-primary w-100 mb-3">
              <img
                style={{ width: "20px", marginRight: "10px" }}
                src={iconFacebook}
                alt="Facebook Icon"
                className="icon"
              />
              Sign in with Facebook
            </button>
            <p className="text-center">
              Don't have an account?{" "}
              <a href="/Signup" className="signup-link">
                Sign up
              </a>
            </p>
          </form>
        </div>
        <div className="Login-Img col-md-5 m-0 p-0 d-flex justify-content-center">
          <img src={img} alt="LoginArt" className="w-100 m-1" />
        </div>
      </div>
    </div>
  );
}
