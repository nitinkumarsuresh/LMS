import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Courses() {

  const [courses, setCourses] = useState([]);
  // const navigate = useNavigate();
  // const authToken = localStorage.getItem("token");
  
  useEffect(() => {
    fetch("http://localhost:8800/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    console.log(courses); 
  }, [courses]); 

  function enrollCourse(courseId) {
    const userId = localStorage.getItem("id");
    axios.post('http://localhost:8800/enroll', { userId, courseId })
      .then((response) => {
        console.log('Enrollment successful:', response.data);
        toast.success('Enrolled Successfully', {
          position: 'top-right', // You can customize the position here
          autoClose: 2000, // Automatically close after 3 seconds (adjust as needed)
          hideProgressBar: false, // Show a progress bar
          closeOnClick: true, // Close the toast on click
          pauseOnHover: false, // Pause the timer when hovering over
          draggable: false, // Allow dragging the toast
        });

      })
      .catch((error) => {
        toast.warn('Already enrolled....', {
          position: 'top-right', // You can customize the position here
          autoClose: 2000, // Automatically close after 3 seconds (adjust as needed)
          hideProgressBar: false, // Show a progress bar
          closeOnClick: true, // Close the toast on click
          pauseOnHover: false, // Pause the timer when hovering over
          draggable: false, // Allow dragging the toast
        });
        
      });
  }
  


return (
<div>
  <Navbar page={"courses"}/>
     <div className="courses-container" style={{marginTop :"20px"}}>
      {courses.map((course) => (
        <div key={course.course_id} className="course-card">
          
            <img src={course.p_link} alt={course.course_name} className="course-image" />
            <div className="course-details">
              <h2 className="course-heading">{course.course_name}</h2>
              <p className="course-description" style={{color:"grey"}}>Price: Rs.{course.price}</p>
              <p className="course-description">{course.description}</p>
            </div> 
          <button className="enroll-button" onClick={() => enrollCourse(course.course_id)}>
            Enroll
          </button> 
        </div>
      ))}
     </div>
    </div>
  );
}

export default Courses;
