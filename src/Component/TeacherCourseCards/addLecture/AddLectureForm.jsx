import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddLectureForm.css";
import { useParams } from "react-router-dom";

export default function AddLectureForm({ courseId, onClose, lectureToEdit }) {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [video, setVideo] = useState(null);


  useEffect(() => {
    

    if (lectureToEdit) {
      
      setName(lectureToEdit.name);
      setVideo(null); 
    }
  }, [lectureToEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || (!video && !lectureToEdit)) {
      toast.error("Name and file are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('Name', name);
      formData.append('CourseId', id);
      if (video) {
        formData.append('Lecture', video);
      }

      const url = lectureToEdit 
        ? `http://lms.tryasp.net/Lecture?id=${lectureToEdit.id}`
        : 'http://lms.tryasp.net/Lecture';
     
       if(lectureToEdit){
        await axios.put(
            url,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              }
            }
          );
       }
       else {
        await axios.post(
            url,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              }
            }
          );
       }
      

      

      toast.success(lectureToEdit ? "Lecture updated successfully!" : "Lecture added successfully!");
      onClose();
    } catch (error) {
      console.log("Error adding/updating lecture:", error);
      toast.error(
        "Error adding/updating lecture: " +
        (error.response?.data?.message || error.message)
      );
    }
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideo(file);
    } else {
      console.log('No video selected');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>{lectureToEdit ? "Edit Lecture" : "Add Lecture"}</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Video</label>
            <input
              type="file"
              id="Video"
              name="Video"
              className="form-control"
              onChange={handleVideoChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
          <button type="button" className="btn btn-secondary mt-3" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}
