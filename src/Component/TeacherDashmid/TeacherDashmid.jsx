import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import TeacherCourseCard from '../TeacherCourseCards/TeacherCourseCard';
import { ToastContainer, toast } from "react-toastify";
import './TeacherDashmid.css';

function TeacherDashmid() {
  const location = useLocation();
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
  

  useEffect(() => {
    function handleResize() {
      setIsWide(window.innerWidth > 685);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`${isWide ? 'col-8' : 'col-12'}`}>
      <div className='w-100 box'>
        <p className='text-white'>ONLINE COURSES</p>
        <b>You want to add new courses?</b>
        <div className='p-2 join'>
          <Link to='/AddCourse' className='text-decoration-none text-white'>
            <span>Add course &nbsp;</span>
          </Link>
        </div>
      </div>
      <div className='container mt-4'>
        <div className='row'>
          {/* Row might be used for future content or layout adjustments */}
        </div>
      </div>
      <hr />
      <div className='d-flex flex-row'>
        <h3>Your Courses</h3>
        <div className='p-2 join-teacher'>
          <Link to='/AddCourse' className='text-decoration-none text-white'>
            <span>Add course &nbsp;</span>
          </Link>
        </div>
      </div>
      <div className='product-list mt-4 align-content-center text-center d-flex'>
        
        {courses.map((course, index) => (
          <TeacherCourseCard
            key={index}
            id={course.id}
            name={course.name}
            materialName={course.materialName}
            image={course.image}
            level={course.level}
            semester={course.semester}
            teacherId={course.teacherId}
            code={course.code}
            price={course.price}

            
          />
        ))}
      </div>
    </div>
  );
}

export default TeacherDashmid;
