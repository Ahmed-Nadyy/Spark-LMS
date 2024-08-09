import React from "react";
import ColorChangingLine from "./ColorChangingLine";

export default function OneCourse(props) {
  return (
    <>
      <div className="card mb-1">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`http://lms.tryasp.net${props.img}`}
              className="img-fluid rounded-start my-2 "
                          alt="Course Thumbnail"
                          style={{ borderRadius: "5px", width:"100%"} }
            />
          </div>
          <div className="col-md-8">
            <div className="card-body" style={{ paddingTop :"5px"}}>
              <h5 className="card-title heading-font-l " style={{fontSize:"15px" ,marginbottom: "20px"}}>{props.nameofcourse}</h5>
              <ColorChangingLine percentage={props.percentage} />
              <p style={{fontSize:"12px"}} className="card-text text-sm font-two-l my-2">{props.detils}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
