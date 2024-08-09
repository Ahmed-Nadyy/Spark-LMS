import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherCourseCard = ({ id, name, materialName, image, level, semester, code, price }) => {
  const navigate = useNavigate();


  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://lms.tryasp.net/Course?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Course deleted successfully!");
    } catch (error) {
      console.log("Error deleting course:", error);
      toast.error(
        "Error deleting course: " +
        (error.response?.data?.message || error.message)
      );
    }
  };




  const handleEdit = () => {
    navigate(`/edit-course/${code}`, { state: { id, name, materialName, image, level, semester, code, price } });
  };

  return (
    <div className="cotainer">
      <div className="card square-card mx-3 course-card">
        <Link to={`/courses/${id}`} className='link-card' style={{color:"black"}}>
        <div className="card-img-container">
          <img src={`http://lms.tryasp.net${image}`} style={{ width: "200px", height: "200px" }} className="card-img-top" alt="Course Card" />
          {/* {image} */}
        </div>
        <div className="card-body">
          <h5 className="card-title"><strong>{name}</strong></h5>
          <p className="card-text">{materialName}</p>
          <div className='d-flex justify-content-between'>
            <p className="card-text">Level: <strong>{level}</strong></p>
            <p className="card-text">Semester:<strong> {semester}</strong></p>
          </div>
          <p className="card-text"><strong>{price ? `Price: $${price}` : 'Free'}</strong></p>
          <p className="card-text">Course Code: <strong><span style={{ color: "green" }}> {code}</span></strong></p>


        </div>
        </Link>
        <div className='d-flex justify-content-between mx-3 mb-3'>
          <div className="btn btn-dark" onClick={handleDelete} style={{ zIndex: "100" }}>Delete</div>
          <div className="btn btn-primary" onClick={handleEdit} style={{ zIndex: "100" }}>Edit</div>
        </div>
      </div>

    </div>
  );
};

export default TeacherCourseCard;
