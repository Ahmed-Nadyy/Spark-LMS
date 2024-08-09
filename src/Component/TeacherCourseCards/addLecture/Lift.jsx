import OneCourse from "./OneCourse";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
export default function Lift() {
   
  const [isWide, setIsWide] = useState(window.innerWidth > 685);
  const [courses, setCourses] = useState([]);
  const [teacherId, setTeacherId] = useState("your-teacher-id"); 

  
  useEffect(() => {
    async function fetchTeacherData() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://lms.tryasp.net/Account/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const teacherId = response.data.id;
        setTeacherId(teacherId);
        fetchCourses(teacherId);
      } catch (error) {
        console.log("Error fetching teacher data:", error);
        toast.error(
          "Error fetching teacher data: " +
          (error.response?.data?.message || error.message)
        );
      }
    }
  
    async function fetchCourses(teacherId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://lms.tryasp.net/Course/teacher-courses?teacherId=${teacherId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setCourses(response.data);
      } catch (error) {
        console.log("Error fetching courses:", error);
        toast.error(
          "Error fetching courses: " +
          (error.response?.data?.message || error.message)
        );
      }
    }
  
    fetchTeacherData();
  }, []);

  return (
    <>
      <div className="Left-a"
        style={{
          border: "1px solid #E0E0E0",
          borderRadius: "5px",
          padding: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          
        }}
      >
        <h2 className="heading-font-r">My Courses</h2>
        <input
          style={{ background: "#F6F7F9" }}
          type="text"
          className="form-control"
          id="textInput"
          placeholder="Search course & class ..."
        />
        <div className="border border-white my-2 w-100"></div>
        <p className="font-two-l my-0">All Courses</p>
        <div
          style={{ color: "#F6F7F9", marginBottom: "10px" }}
          className="border "
        ></div>
        <div>
          {courses.map((course, index) => (
          <OneCourse
            key={index}
            id={course.id}
            nameofcourse={course.name}
            materialName={course.materialName}
            img={course.image}
            level={course.level}
            semester={course.semester}
            teacherId={course.teacherId}
            code={course.code}
            price={course.price}

            
          />
        ))}
        </div>
      </div>
    </>
  );
}
