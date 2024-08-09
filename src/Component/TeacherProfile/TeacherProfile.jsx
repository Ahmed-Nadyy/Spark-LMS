import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Profile.css";
import ToDo from "../ToDo/ToDo";

function TeacherProfile() {
  const [pic , setPic ] = useState("https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
  const user = useSelector((state) => state.user);

  return (
    <> 
      <div className="col-2 position-relative TeacherProfile">
        <div className="d-flex justify-content-between align-items-center top-0">
          <b>Profile</b>
          
          <Link to="/edit-profile" className="text-decoration-none text-black">
            <i className="fa-solid fa-pen-to-square" />
          </Link>
        </div>
        <div className="text-center w-100 mt-5">
          <div className="profile mt-4 mx-auto"><img className="imag" src={pic} alt="" /></div>
          <div className="mt-2">
            <b>Good Morning {user.firstName} {user.lastName}</b>
          </div>
          
          <div className="position-relative mt-3">
            <Link className="text-decoration-none text-black position-relative">
              <i className="fa-regular fa-bell "></i>
              <div className="noti position-absolute badge p-1 mb-3">5</div>
            </Link>
          </div>
        </div>
        <div className="mt-3 align-content-center justify-content-center"><ToDo/></div>
      </div>
    </>
  );
}

export default TeacherProfile;
