import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
// import { Link } from "react-router-dom";
 import { useNavigate } from "react-router-dom";
import axios from "axios";

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Courses() {

  const [courses, setCourses] = useState([]);
   const navigate = useNavigate();
   const[enrolled , SetEnrolled] = useState([]);
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
      const userId = localStorage.getItem("id");
    fetch(`http://localhost:8800/carts/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        let arr = [];
        for (let i=0;i<data.length ;i++){
          arr.push(data[i].course_id);
        }
        SetEnrolled(arr);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function enrollCourse(courseId) {
    navigate(`/payment/${courseId}`);
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
          {enrolled.includes(course.course_id) ? (<button className="enroll-button" style={{color:'#F4D03F',backgroundColor:'darkblue',fontWeight:'bold'}} onClick={() => navigate("/learnings")}>
            Enrolled
          </button> ):(<button className="enroll-button" onClick={() => enrollCourse(course.course_id)}>
            Enroll
          </button> )}
        </div>
      ))}
     </div>
    </div>
  );
}

export default Courses;
