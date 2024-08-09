import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import pic from "../../assets/stdDashboard/WhatsApp Image 2024-02-26 at 00.13.47_cc9ce5b8.jpg";
import ToDo from "../ToDo/ToDo";
function Sidebar() {
  const user = useSelector((state) => state.user);
  const [activeItem, setActiveItem] = useState("Overview");
  const [check, setcheck] = useState(false);
  const handleResize = () => {
    const menu = document.getElementById("menu");
    if (window.innerWidth > 685) {
      menu.style.transform = "translateX(0%)";
      setcheck(false);
    }
    else {
      menu.style.transform = "translateX(-100%)";
      setcheck(true);
    }
  };
  useEffect(() => {
    handleResize()
  }, [check])
  window.addEventListener("resize", handleResize);
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  return (
    <>
      <div id="menu" className={`col-2 align-items-end`}>
        <div className={`position-relative`} style={{ display: check ? 'block' : 'none' }}>
          <div className="text-center w-100 mt-0">
            <div className="profile mt-4 mx-auto"><img className="imag" src={pic} alt="" /></div>
            <div className="mt-2">
              <b>good Morning {user.firstName} {user.lastName}</b>
            </div>
            <div className="opacity-75 im-txt">
              continue your journey and achieve Your Target
            </div>
            <div className="position-relative mt-3">
              <Link className="text-decoration-none text-black position-relative mx-3">
                <i className="fa-regular fa-bell "></i>
                <div className="noti position-absolute badge p-1 mb-3">5</div>
              </Link>
              <Link className="text-decoration-none text-black mx-3">
                <i className="fa-solid fa-pen-to-square" />
              </Link>
            </div>
          </div>
          <ToDo />
        </div>
        <div className="menu-group ">
          <Link
            to="/Dashboard"
            className={`menu-item ${activeItem === "Overview" ? "active" : ""
              } m-1`}
            onClick={() => handleItemClick("Overview")}
          >
            <i className="fas fa-tachometer-alt"></i>
            &nbsp;
            <span>Overview</span>
          </Link>
          {check &&
          <Link
            to="/Profile"
            className={`menu-item ${activeItem === "Tasks" ? "active" : ""
              } m-1`}
            onClick={() => handleItemClick("Tasks")}
          >
            <i className="fas fa-tasks"></i>
            &nbsp;
            <span>Profile</span>
          </Link>
}
          <Link
            to="/Setting"
            className={`menu-item m-1  ${activeItem === "Settings" ? "active" : ""
              } m-1`}
            onClick={() => handleItemClick("Settings")}>
            <i className="fas fa-cog"></i>
            &nbsp;
            <span>Settings</span>
          </Link>
        </div>
        <div className="mb-3 ">
          
        </div>
      </div>
    </>
  );
}

export default Sidebar;