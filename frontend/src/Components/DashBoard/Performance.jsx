import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dstyle.css';


const Performance = () => {
  const [performanceData , setPerfomanceData] = useState([]);
  const [enrolledcourses, setEnrolledCourses] = useState([]);
  useEffect(() => {
    async function fetchCourse() {
      try {
        const userId = localStorage.getItem("id");
        const response = await axios.get(`http://localhost:8800/courses/${userId}`);
        const fetchedCourse = response.data;
        console.log(fetchedCourse);
        setEnrolledCourses(fetchedCourse);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCourse();
  }, []);

  useEffect(()=>{
    const userId = localStorage.getItem("id");
    fetch(`http://localhost:8800/performance/${userId}`).then((res)=>res.json()).then((data)=>{setPerfomanceData(data)});
   
  })

  return (
    <div>
      
    

    <div className="performance-container" style={{marginTop:'70px'}}>
      <div style={{marginBottom:'80px'}}>
      <h2 style={{color:'darkblue'}}>Courses Enrolled</h2>
      <table className="performance-table" style={{width:'40%'}}>
        <thead>
          <tr>
            <th>Courses</th>
            {/* <th>Progress</th>
            <th>Grade</th> */}
          </tr>
        </thead>
        <tbody>
          {enrolledcourses.map((data, index) => (
            <tr key={index}>
              <td>{data.course_name}</td>
              {/* <td>{data.progress}</td>
              <td>{data.mark}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div>
      <h2 style={{color:'darkblue'}}>PERFORMANCE</h2>
      <table className="performance-table" style={{marginBottom:'40px'}}>
        <thead>
          <tr>
            <th>Courses</th>
            <th>Progress</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {performanceData.map((data, index) => (
            <tr key={index}>
              <td>{data.course_name}</td>
              <td>Completed</td>
              <td>{data.mark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default Performance;
