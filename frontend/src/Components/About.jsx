import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faAward , faStar } from '@fortawesome/free-solid-svg-icons';
import a from './images/a.png';
import kalasala from './images/kalasala.jpg';
import vsb from './images/vsb.jpg';
import ksr from './images/ksr.jpg';
import bannari from './images/bannari.jpg';
import ramco from './images/ramco.jpg';
import Navbar from "./Navbar";
import Footer from "./header and footer/Footer";
import fe1 from "./images/fe1.png";
import fe2 from "./images/fe2.png";
function About(){
    return(
        <div>
        <Navbar page={"About"}/>
      <section id="about-home">
        <h2>About OneYes Academy</h2>
      </section>

      <section id="about-container">
        <div className="about-img">
          <img src={a} alt="" />
        </div>
        <div className="about-text">
          <h2>Welcome to OneYes Academy, Enhance your skills with the best Online Courses</h2>
          <p>You can start and finish one of these popular courses in under a day - for free! Check out the list below. Take the course for free.</p>
          <div className="about-fe">
            <img src={fe1} alt="" />
            <div className="fe-text">
              <h5>500+ Courses</h5>
              <p>You can start and finish one of these popular courses on our site.</p>
            </div>
          </div>
          <div className="about-fe">
            <img src={fe2} alt="" />
            <div className="fe-text">
              <h5>Lifetime Access</h5>
              <p>You can start and finish one of these popular courses on our site.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <h1>Awesome Features</h1>
        <p>Chance to enhance yourself</p>
        <div className="fea-base">
          <div className="fea-box">
            <FontAwesomeIcon icon={faGraduationCap} className="i"/>
            <h3>Scholarship Facility</h3>
            <p>Originality is the essence of true scholarship.</p>
          </div>
          <div className="fea-box">
            <FontAwesomeIcon icon={faStar} className="i"/>
            <h3>Valuable Courses</h3>
            <p>Online education is like a rising tide, it's going to lift all boats.</p>
          </div>
          <div className="fea-box">
            <FontAwesomeIcon icon={faAward} className="i" />
            <h3>Global Certification</h3>
            <p>A certificate without knowledge is like a gun without bullets in your hand.</p>
          </div>
        </div>
      </section>

      <section id="trust">
        <h1>Trusted by</h1>
        <p>Best Engineering Colleges</p>
        <div className="trust-img">
          <img src={ramco} alt="" />
          <img src={bannari} alt="" />
          <img src={vsb} alt="" />
          <img src={ksr} alt="" />
          <img src={kalasala} alt="" />
        </div>
      </section>
      <Footer/>
    </div>
    );
}
export default About;