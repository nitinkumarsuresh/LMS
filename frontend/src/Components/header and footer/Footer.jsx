import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '../css/style.css'
import { useNavigate } from 'react-router-dom'

function Footer(){
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  return(
  <section id='footer'>
     <footer>
        <div className="footer-col" onClick={()=> {
          if(!authToken)
          {
          navigate('/login')}
          else
          {navigate('/courses')}
          }}>
          <h3>Master Courses</h3>
          <li>Web Development</li>
          <li>ReactJs</li>
          <li>AngularJS</li>
          <li>NodeJS</li>
        </div>
        <div className="footer-col" onClick={()=> {if(!authToken){
          navigate('/login')}else{navigate('/courses')}
          }}>

          <h3>Intermediate Courses</h3>
          <li>JavaScript</li>
          <li>Ruby on Rails</li>
          <li>Machine Learning</li>
          <li>Cyber Security</li>
        </div>
        <div className="footer-col" onClick={()=> {if(!authToken){
          navigate('/login')}else{navigate('/courses')}
          }}>
          <h3>Beginner Courses</h3>
          <li>Python Programming</li>
          <li>Java Programming</li>
          <li>C++ Programming</li>
          <li>C Programming</li>
        </div>
        <div className="copyright">
          <p>Copyright &copy;2023 All rights reserved.</p>
          <div className="pro-links">
            <FontAwesomeIcon icon={faFacebookF} className="i" onClick={()=> window.open('https://www.facebook.com/OneYesTechnologies/')}/>
            <FontAwesomeIcon icon={faInstagram} className="i" onClick={()=> window.open('https://www.instagram.com/oneyes_infotech_solutions/')}/>
            <FontAwesomeIcon icon={faLinkedinIn} className="i" onClick={()=> window.open('https://www.linkedin.com/company/oneyes-technologies/')}/>
          </div>
        </div>
        </footer>
      </section>
  )
}
export default Footer;