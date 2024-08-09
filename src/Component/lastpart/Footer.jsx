import logo from "./IMG&ICN/logoFooter.png";
import call from "./IMG&ICN/call.png";
import msg from "./IMG&ICN/msg.png";
import loction from "./IMG&ICN/loction.png";
import social from "./IMG&ICN/social.png";
import "./Footer.css";
import { Link  } from "react-router-dom";

export default function Footer() {
  return (
    <>
      
     
      <div className="footer ">
        <div className="container-fluid text-white py-5 ">
          <div className="row m-2">
            <div className="col-md-4 ml-3">
              <img
                src={logo}
                alt=""
                style={{ width: "150px" }}
                className="m-1"
              />
              <p className=".font-two-l mt-4">
              In a coaching role, you ask the questions and rely more on your staff, who become the experts, to provide the information..{" "}
              </p>
            </div>
            <div className="col-md-3 m-3 underline">
              <h3 className=".heading-font-b">Quick Links</h3>
              <ul className="list-unstyled mt-4">
                <Link to="./Home">
                  <li>Home</li>
                </Link>
                <Link to="./Dashboard">
                  <li>Dashboard</li>
                </Link>
              </ul>
            </div>
            <div className="col-md-4 underline m-3">
              <h3 className=".heading-font-b ">Contact Us</h3>
              <ul className="list-unstyled mt-4">
                <li>
                  <img
                    src={call}
                    alt=""
                    style={{ width: "20px", display: "inline" }}
                  />
                  <p style={{ marginLeft: "5px", display: "inline" }}>
                    +201023536355
                  </p>
                </li>
                <li>
                  <img
                    src={msg}
                    alt=""
                    style={{ width: "20px", display: "inline" }}
                  />
                  <p style={{ marginLeft: "5px", display: "inline" }}>
                    nadyahmd88@gamil.com
                  </p>
                </li>
                <li>
                  <img
                    src={loction}
                    alt=""
                    style={{ width: "20px", display: "inline" }}
                  />
                  <p style={{ marginLeft: "5px", display: "inline" }}>
                    2715 Ash Dr. San Jose, South Dakota 83475
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="line-a"></div>
        <div className="container-a">
          <p className=".font-two-l Copyrightp text-white">
            Copyright 2024 | All Rights Reserved
          </p>
          <img src={social} alt="" className="socialICON" />
        </div>
      </div>
  

    </>
  );
}
