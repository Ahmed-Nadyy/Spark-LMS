import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCourse() {
    const [image, setImage] = useState(null);
    const [courseData, setCourseData] = useState({
        Name: "",
        MaterialName: "",
        Level: "",
        Semester: "",
        Price: "",
    });

    const navigate = useNavigate();

    async function addCourse(formData) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                'http://lms.tryasp.net/Course',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            toast.success("Course added successfully!");
            navigate("/courses");
        } catch (error) {
            console.log("Error adding course:", error);
            toast.error(
                "Error adding course: " +
                (error.response?.data?.message || error.message)
            );
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (
            !courseData.Name ||
            !courseData.Level ||
            !courseData.Semester ||
            !courseData.Price
        ) {
            toast.error("All fields are required");
            return;
        }
        if (!image) {
            toast.error("Course image is required");
            return;
        }

        const formData = new FormData();
        formData.append('Name', courseData.Name);
        formData.append('MaterialName', courseData.MaterialName);
        formData.append('Level', courseData.Level);
        formData.append('Semester', courseData.Semester);
        formData.append('Price', courseData.Price);
        formData.append('CourseImage', image);
      

        await addCourse(formData);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourseData({ ...courseData, [name]: value });
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
                        <h3 className="text-center mb-4">Add New Course</h3>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Course Name
                            </label>
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
                            <label htmlFor="image" className="form-label">
                                Course Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="form-control"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="MaterialName" className="form-label">
                                Material Name
                            </label>
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
                            <label htmlFor="Level" className="form-label">
                                Level
                            </label>
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
                            <label htmlFor="Semester" className="form-label">
                                Semester
                            </label>
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
                            <label htmlFor="Price" className="form-label">
                                Price
                            </label>
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
                        <button type="submit" className="btn btn-primary w-100 mb-3">
                            Add Course
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCourse;
