  import React,{useState} from "react";
  import { Link } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
  import logo from './images/logo.jpg';
  import menu from './images/menu.png'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUser ,faChalkboardUser,faBook,faTimes} from '@fortawesome/free-solid-svg-icons';
  import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


  function Navbar(props){

    const [menuActive, setMenuActive] = useState(false);

    // Function to toggle the menu's visibility
    const toggleMenu = () => {
      setMenuActive(!menuActive);
      console.log(menuActive);
    };

    const value = props.page;
    const navigate = useNavigate() 
    const authToken = localStorage.getItem("token");
    const username= localStorage.getItem("name") || localStorage.getItem("tutor_name");
    const tutorToken = localStorage.getItem("tutor_token");

    


    const handleLogOut = (e) => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("id");
      localStorage.removeItem("profileImage");
      localStorage.removeItem("tutor_id");
    localStorage.removeItem("tutor_name");
    localStorage.removeItem("tutor_email");
    localStorage.removeItem("tutor_token");
      toast.success('Signed Out ', {
        position: 'top-right', 
        autoClose: 1000, 
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: false, 
        draggable: false, 
      });
      navigate("/")
    };
    return(
      <div>
          <nav >
          <div className="logo1">
          <img src={logo} alt=""/>
          <h2 id="academ">Academy</h2>
          </div>
          <div className="navigation">
            <ul className={` ${menuActive ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faTimes} id="menu-close"  onClick={toggleMenu}/>
              {value==="home" ?(<li style={{backgroundColor:"purple",borderRadius:"5px"}}><Link to={"/"} style={{color:"white",padding:'12px'}}>Home</Link></li>):(<li><Link to={"/"}>Home</Link></li>)}
              {value==="About" ?(<li style={{backgroundColor:"purple",borderRadius:"5px"}}><Link to={"/about"} style={{color:"white",padding:'12px'}}>About</Link></li>):(<li><Link to={"/about"}>About</Link></li>)}
              {value==="contact"?(<li style={{backgroundColor:"purple",borderRadius:"5px"}}><Link to={"/contact"} style={{color:"white",padding:'12px'}}>Contact</Link></li>):(<li><Link to={"/contact"}>Contact</Link></li>)}
              
              {authToken && tutorToken ==null ? (
                value === "courses" ? (
                  <li style={{ backgroundColor: "purple", borderRadius: "5px" }}>
                    <Link to={"/courses"} style={{ color: "white", padding: '12px' }}><FontAwesomeIcon id="symbol" icon={faBook} />  Courses</Link></li>) : (<li><Link to={"/courses"}><FontAwesomeIcon id="symbol" icon={faBook}/> Courses</Link></li>)) : (<></>)}

               {authToken && tutorToken ==null ? (
                value === "learnings" ? (
                  <li style={{ backgroundColor: "purple", borderRadius: "5px" }}>
                    <Link to={"/learnings"} style={{ color: "white", padding: '12px' }}><FontAwesomeIcon id="symbol" icon={faChalkboardUser} />  Learnings</Link></li>) : (<li><Link to={"/learnings"}><FontAwesomeIcon icon={faChalkboardUser} />  Learnings</Link></li>)) : (<></>)}
                
              { tutorToken!==null ? (
                <li style={{borderRadius: "5px" }}>
                <Link to={"/Tdashboard"} style={{ padding: '12px' }}><FontAwesomeIcon id="symbol" icon={faChalkboardUser} />  Dashboard</Link></li>
                  ) : (<></>)}

              {authToken  ? (
                value === "profile" ? (
                  <li style={{ backgroundColor: "purple", borderRadius: "5px" }}>
                    <Link to={"/profile"} style={{ color: "white", padding: '12px' }}> <FontAwesomeIcon id="symbol" icon={faUser} />  {username}</Link></li>) : (<li><Link to={"/profile"}><FontAwesomeIcon icon={faUser} />  {username}</Link></li>)) : (<></>)}
                  
              {authToken !== null || tutorToken ? (
              <li>
              <button onClick={handleLogOut} className="sign-out-button">
                Sign Out
              </button>
              </li>
              ) : (
              <li>
                <button onClick={() => navigate("/login")}>Login/SignUp</button>
              </li>
        )}
            </ul>
            <img id="menu-btn" src={menu} alt="" onClick={toggleMenu}/>
          </div>
        </nav>
      </div>
    )
  }
  export default Navbar;