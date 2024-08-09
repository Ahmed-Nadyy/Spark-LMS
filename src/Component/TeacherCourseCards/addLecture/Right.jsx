import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import OneVideo from './OneVideo'; 
import AddLectureForm from './AddLectureForm'; 
import { setLecture } from '../../../Redux/lectureSlice';
import "./AddLectureForm.css";

export default function Right() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [courseId, setCourseId] = useState();
  const [lectures, setLectures] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchLectures() {
      try {
        setCourseId(id);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://lms.tryasp.net/Lecture/all-in-course?courseId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLectures(response.data);
      } catch (error) {
        toast.error(
          "Error fetching lectures: " +
          (error.response?.data?.message || error.message)
        );
      }
    }

    fetchLectures();
  }, [id]);

  const handleLectureClick = (lecture) => {
    dispatch(setLecture(lecture));
  };

  return (
    <div style={{ border: "1px solid #E0E0E0", borderRadius: "5px", padding: "10px", width: "250px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", marginBottom: "10px" }}>
      <div className="container my-4">
        <div className="row">
          <div className="col" style={{ padding: 0 }}>
            <div className="underline font-two-b">MODULE</div>
            <div style={{ color: "#1F2029", background: "#1F2029", marginBottom: "5px", height: "5px" }} className="border w-100"></div>
          </div>
        </div>
      </div>
      {lectures.map((lecture, index) => (
        <div key={index} onClick={() => handleLectureClick(lecture)}>
          <OneVideo 
            nameOfVideo={lecture.name} 
            percentage={lecture.percentage} 
            timeOfVideo={lecture.time}
            videoUrl={lecture.lectureUrl} 
            courseId = {lecture.courseId}
            id = {lecture.id}
          />
        </div>
      ))}
      <button className="btn btn-primary mt-3" onClick={() => setShowForm(true)}>Add Lecture</button>
      {showForm && <AddLectureForm courseId={courseId} onClose={() => setShowForm(false)} />}
    </div>
  );
}
