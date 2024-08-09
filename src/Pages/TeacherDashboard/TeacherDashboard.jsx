import React, { useEffect, useState } from "react";
import TeacherProfile from '../../Component/TeacherProfile/TeacherProfile'
import TeacherDashmid from '../../Component/TeacherDashmid/TeacherDashmid'
import Sidebar from "../../Component/Sidebar/Sidebar";
import "./style.css";
export default function TeacherDashboard() {
  const [check, setcheck] = useState(false);
  const handleResize = () => {
    if (window.innerWidth > 650) {
      setcheck(false);
    }
    else {
      setcheck(true);
    }
  };
  useEffect(() => {
    handleResize()
  }, [check])
  return (
    <>
       <div className="container container-all">
        <div className="row mt-3 h-100 d-flex justify-content-center" style={{marginLeft:"25px", marginRight:"25px"}}>
          { !check &&
           <Sidebar />
          }
          <TeacherDashmid />
         
          { !check &&
          <TeacherProfile />
          }
        </div>
      </div>
    </>
  )
}


