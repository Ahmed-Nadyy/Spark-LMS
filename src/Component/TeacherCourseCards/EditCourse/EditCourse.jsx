import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCourse = () => {
  const location = useLocation();
  const { id, name, materialName, level, semester, price, image } = location.state;
  
  const [courseData, setCourseData] = useState({
    Name: name,
    MaterialName: materialName,
    Level: level,
    Semester: semester,
    Price: price,
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !courseData.Name ||
      !courseData.MaterialName ||
      !courseData.Level ||
      !courseData.Semester ||
      !courseData.Price 
    ) {
      toast.error("All fields are required");
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://lms.tryasp.net/Course?id=${id}&Name=${courseData.Name}&MaterialName=${courseData.MaterialName}&Level=${courseData.Level}&Semester=${courseData.Semester}&Price=${courseData.Price}`,
        imageFile ? new FormData().append('Image', imageFile) : null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': imageFile ? 'multipart/form-data' : 'application/json',
          },
        }
      );
      toast.success("Course updated successfully!");
      navigate("/courses");
    } catch (error) {
      e.error("Error updating course:", error);
      toast.error(
        "Error updating course: " +
        (error.response?.data?.message || error.message)
      );
    }
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
        <div className="col-md-6 offset-md-3 d-flex justify-content-center align-items-center bg-light">
          <form className="p-5" onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">Edit Course</h3>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">Course Name</label>
              <input
                type="text"
                id="Name"
                name="Name"
                className="form-control"
                placeholder="Enter Course Name"
                value={courseData.Name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Course Image</label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-control"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="MaterialName" className="form-label">Material Name</label>
              <input
                type="text"
                id="MaterialName"
                name="MaterialName"
                className="form-control"
                placeholder="Enter Material Name"
                value={courseData.MaterialName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Level" className="form-label">Level</label>
              <input
                type="text"
                id="Level"
                name="Level"
                className="form-control"
                placeholder="Enter Level"
                value={courseData.Level}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Semester" className="form-label">Semester</label>
              <input
                type="text"
                id="Semester"
                name="Semester"
                className="form-control"
                placeholder="Enter Semester"
                value={courseData.Semester}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Price" className="form-label">Price</label>
              <input
                type="number"
                id="Price"
                name="Price"
                className="form-control"
                placeholder="Enter Price"
                value={courseData.Price}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
