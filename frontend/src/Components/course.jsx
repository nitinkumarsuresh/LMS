import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Forum from './forum';
import ReactPlayer from "react-player";
import { Progress } from 'antd';

const Course = () => {
  const [course, setCourse] = useState({
    course_name: "",
    instructor: "",
    price: null,
    description: "",
    y_link: "",
    p_link: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [duration, setDuration] = useState(null);
  const [played, setPlayed] = useState(0);
  const [userId , setUserId] = useState(localStorage.getItem("id"));
  
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];
  const playerRef = useRef(null);
  

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await axios.get(`http://localhost:8800/course/${courseId}`);
        const fetchedCourse = response.data[0];
        setCourse(fetchedCourse);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  const handleDuration = () => {
    setDuration(playerRef.current.getDuration());
  };

  useEffect(() => {
    fetch(`http://localhost:8800/progress?userId=${userId}&courseId=${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        setPlayed(data[0].playedTime)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  

  useEffect(() => {
    if (courseId && userId) {
       axios.put("http://localhost:8800/update-progress", {
         userId,
         courseId,
         playedTime: played,
         duration,
       })
       .then(() => {
         setPlayed(played);
       })
       .catch((error) => {
         console.error("Error updating progress:", error);
       });
     }
  },[played]);

  
  


  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong!</div>;
  }
  return (
    <div>
      <h3 style={{ textAlign:'center',color:'white',padding:'10px',fontSize:'900',fontStyle:'italic',backgroundColor:'darkblue',width:'100%',height:'-19px'}}>The Complete {course.course_name} Course - 2023</h3>
      <div style={{  alignItems: "center", justifyContent: "center", padding: "30px" }}>
        <div key={courseId} className="course" style={{marginTop:"-13px"}}>
          <div style={{display:'flex',gap:'20px'}}>
            <ReactPlayer
              ref={playerRef}
              onProgress={(Progress)=>{
                setPlayed(Progress.playedSeconds);
                // if (played === duration) {
                //   setPlayed(duration);
                // }
                // else{
                //   setPlayed(Progress.playedSeconds);
                // }
              }}
              url={course.y_link}
              controls
              type="video/mp4"
              width="800px"
              height="450px"
              onDuration={handleDuration}
              
              played={(played)}
            />
            <div style={{width:'50%'}}>
              <h4>Course Format:</h4>
              <p>
        This is a self-paced online course, consisting of video lectures, hands-on coding exercises, and quizzes. You can complete the course at your own pace within the 8-week access period.
    </p>
    

    <h4>Assessment Methods:</h4>
    <ul>
        <li>Weekly quizzes to test your understanding of the course material.</li>
        <li>Coding assignments to practice what you've learned.</li>
        <li>A final project where you will build a responsive application.</li>
    </ul>

    <h4>Prerequisites:</h4>
    <p>
        No prior programming experience is required, but basic computer literacy is recommended.
    </p>

    <h4>Who Should Take This Course:</h4>
    <ul>
        <li>Beginners interested in learning programming.</li>
        <li>Individuals looking to add {course.course_name} to their skillset.</li>
        <li>Students preparing for computer science courses.</li>
    </ul>
    <h4>Enrollment Deadline:</h4>
    <p>Enrollment is open year-round. You can start the course anytime.</p>
    <h4>Evaluate Yourself:</h4>
<p>
    The assessments are designed to reinforce your learning and provide valuable feedback on your progress throughout the course. 
</p>
<p>Click the below  <b>"Take Quizz"</b>  button to take the assessment</p>   👇
            </div>
          </div>
          
          <h4 style={{marginTop:'-120px'}}>Description : {course.discription}</h4>
          <p style={{width:'55%',marginBottom:'10px'}}>This online programming course provides a comprehensive introduction to the {course.discription}. Whether you're a beginner or looking to expand your coding skills, this course will cover {course.course_name} fundamentals and prepare you for more advanced  challenges.</p>
            <h4 style={{marginBottom:'10px'}}>Instructor: {course.instructor}</h4>
            <h4>Content type: Video</h4>
            <div  >
            <button className="enroll-button" onClick={() => navigate("/learnings")} >Back</button>
            <button className="enroll-button" onClick={() => navigate(`/assessment/${course.course_id}`)} style={{marginLeft:'633px',marginTop:'-500px'}}> Take Quizz</button>
            </div>
        </div>
      </div>
      <div
        style={{
          marginBottom: 10,
          width:'30%',
          height:'30%',
          paddingLeft:'40px'
        }}
      > <h3>Progress :</h3>
      
        <Progress  percent={Math.ceil((played / duration) *100)} status="active" />
        <br/>
        <h3>Report :</h3>
        <p>You have completed {Math.ceil((played / duration) *100)}% of this course.</p>
      </div>
      <Forum courseid={courseId} />
    </div>
  );
};

export default Course;
