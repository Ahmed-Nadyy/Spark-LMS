import React from "react";
import { useDispatch } from 'react-redux';
import Circle from "./Circle";
import videoIcon from "./img&videos/video.png";
import { FaTrash, FaEdit } from "react-icons/fa";
import { setLecture } from '../../../Redux/lectureSlice';

const OneVideo = (props) => {
  const { percentage, nameOfVideo, timeOfVideo, videoUrl, onDelete, onEdit } = props;
  const dispatch = useDispatch();

  const handleLectureClick = () => {
    dispatch(setLecture({ name: nameOfVideo, videoUrl, time: timeOfVideo }));
  };

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-12">
          <div className="d-flex align-items-center">
            <img
              src={videoIcon}
              alt="Video Icon"
              style={{ width: "15px", marginRight: "10px" }}
            />
            <p className="font-weight-bold mb-0" onClick={handleLectureClick} style={{ cursor: 'pointer' }}>
              {nameOfVideo}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="my-0 py-0">{timeOfVideo}</p>
            <div>
              <FaEdit 
                style={{ cursor: "pointer", marginRight: "10px" }} 
                onClick={onEdit}
              />
              <FaTrash 
                style={{ cursor: "pointer" }} 
                onClick={onDelete}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default OneVideo;
