import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Learnings(){
    const userId = localStorage.getItem("id");
    const [courses , setCourse] = useState([]);
    useEffect(() => {
        async function fetchCourse() {
          try {
            const response = await axios.get(`http://localhost:8800/courses/${userId}`);
            const fetchedCourse = response.data;
            setCourse(fetchedCourse);
          } catch (err) {
            console.log(err);
          }
        }
        fetchCourse();
      }, [courses]);
    return(
        <>
        <Navbar page={"learnings"} />
    <div className="learn-courses-container" style={{marginTop :"20px"}}>
      {courses.map((course) => (
        <div key={course.course_id} className="learn-course-card">
        <img src={course.p_link} alt={course.course_name} className="learn-course-image" />
        
        <div className="course-details">
            <h2 className="course-heading">{course.course_name}</h2>
            <p className="course-description">Price: Rs.{course.price}</p>
        </div>
        <Link to={`/course/${course.course_id}`} style={{textDecoration:"none"}}>
        <button  className="learn-course-button">Start Learning</button>

        </Link>
        </div>
      ))}
     </div>
     </>
    );
}
export default Learnings;