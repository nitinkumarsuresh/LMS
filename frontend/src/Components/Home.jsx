import React,{useState,useEffect} from "react";
import Navbar from './Navbar';
import c1 from './images/c1.jpg';
import c2 from './images/html.png';
import c3 from './images/sql.jpg';
import c4 from './images/python.jpg';
import c5 from './images/java.png';
import c6 from './images/css.png';
import './css/style.css'
import { faGraduationCap , faAward , faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from "./header and footer/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



function Home(){
    const authToken = localStorage.getItem("token");
    function scrollToSectionBlue() {
      const element = document.getElementById('features'); 
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    function scrollToSectionYellow() {
      const element = document.getElementById('course'); 
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    const navigate = useNavigate();


    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const futureDate = new Date("2023-10-25T23:59:59"); // Replace with your target future date and time
      const timeDifference = futureDate - now;
      
      if (timeDifference <= 0) {
        clearInterval(interval);
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        setTime({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
    
    return(
     <div>
     <Navbar page={"home"}/>
      <div>
      <section id="home">
        <h2>Enhance your future with OneYes Academy</h2>
        <p> OneYes Academy is a massive open online course provider, and its learning experience arranges coursework into a series of modules and lessons that can include videos, text notes, and assessment tests.</p>
        <div className="btn">
          <Link className="blue" onClick={scrollToSectionBlue} >Learn More</Link>
          <Link className="yellow" onClick={scrollToSectionYellow}>Visit Courses</Link>
        </div>
      </section>
      <section id="features" >
        <h1>Awesome Features</h1>
        <p>Chance to enhance yourself</p>
        <div className="fea-base">
          <div className="fea-box">
          <FontAwesomeIcon icon={faGraduationCap} className="i"/>
            <h3>Scholarship Facility</h3>
            <p>Originality is the essence of true scholarship. </p>
          </div>
          <div className="fea-box">
          <FontAwesomeIcon icon={faStar} className="i"/>
            <h3>Valuable Courses</h3>
            <p>Online education is like a rising tide, it's going to lift all boats. </p>
          </div>
          <div className="fea-box">
          <FontAwesomeIcon icon={faAward} className="i"/>
            <h3>Global Certification</h3>
            <p>A certificate without knowledge is like a gun without bullets in your hand. </p>
          </div>
        </div>
      </section>
      <section id="course">
        <h1>Our Popular Courses</h1>
        <p>10,000+ enrolled</p>
       
        <div className="course-box" onClick={()=> {if(!authToken){
          navigate('/login')}else{navigate('/courses')}
          }}>
          
          <div className="courses">
      <img src={c1} alt="" />
      <div className="details">
        <p>Updated 12/08/23</p>
        <h6>JavaScript Beginner Course</h6>
        <div className="star">
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="i" />
          ))}
          <p>(239)</p>
        </div>
      </div>
      <div className="cost">
        $49.99
      </div>
    </div>
    <div className="courses">
      <img src={c2} alt="" />
      <div className="details">
        <p>Updated 12/08/23</p>
        <h6>HTML Complete Course</h6>
        <div className="star">
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="i"/>
          ))}
          <p>(439)</p>
        </div>
      </div>
      <div className="cost">
        $49.99
      </div>
    </div>
    <div className="courses">
      <img src={c3} alt="" />
      <div className="details">
        <p>Updated 12/08/23</p>
        <h6>SQL Beginner Course</h6>
        <div className="star">
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="i" />
          ))}
          <p>(539)</p>
        </div>
      </div>
      <div className="cost">
        $49.99
      </div>
    </div>
    <div className="courses">
      <img src={c4} alt="" />
      <div className="details">
        <p>Updated 12/08/23</p>
        <h6>Python Master Course</h6>
        <div className="star">
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="i"/>
          ))}
          <p>(290)</p>
        </div>
      </div>
      <div className="cost">
        $49.99
      </div>
    </div>
    <div className="courses">
      <img src={c5} alt="" />
      <div className="details">
        <p>Updated 12/08/23</p>
        <h6>Java Essentials</h6>
        <div className="star">
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="i"/>
          ))}
          <p>(500)</p>
        </div>
      </div>
      <div className="cost">
        $49.99
      </div>
    </div>
    <div className="courses">
      <img src={c6} alt="" />
      <div className="details">
        <p>Updated 12/08/23</p>
        <h6>CSS Complete Course</h6>
        <div className="star">
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="i"/>
          ))}
          <p>(400)</p>
        </div>
      </div>
      <div className="cost">
        $49.99
      </div>
     </div>
        </div>

      </section>
      <section id="registration">
        <div className="reminder">
          <p>Get 100 Online Courses for Free</p>
          <h1>Register to get it</h1>
          <div className="time">
      <div className="date" >
        {time.days}<br /> <p style={{color:'burlywood'}}>Days</p>
      </div>
      <div className="date">
        {time.hours}<br /> <p style={{color:'burlywood'}}>Hours</p>
      </div>
      <div className="date">
        {time.minutes}<br /><p style={{color:'burlywood'}}>Minutes</p> 
      </div>
      <div className="date">
        {time.seconds}<br /><p style={{color:'burlywood'}}>Seconds</p> 
      </div>
    </div>
        </div>
          {!authToken ? (
            <div className="form" onClick={()=>navigate("/login")}>
              <h3>Create Free Account NOW!</h3>
              <input type="text" placeholder="Name" name="" id="" />
              <input type="text" placeholder="Email" name="" id="" />
              <input type="password" placeholder="Password" name="" id="" />
              <input type="number" placeholder="Phone Number" name="" id="" />
              <div className="btn">
                <Link className="yellow" href="#">Submit Form</Link>
              </div>
            </div>
          ) : (
            <></>
          )}
        </section>
        <Footer/>
      </div>
    </div>
    );
}
export default Home;