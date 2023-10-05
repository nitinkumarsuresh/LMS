import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ImgUpload from "./ImgUpload";

function Profile() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
   const id = localStorage.getItem("id");
  const [userDetails, setUserDetails] = useState(null);
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");



  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }

    async function fetchUserDetails() {
      try {
        const response = await fetch(
          `http://localhost:8800/userdetails?userId=${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details.");
        }
        const data = await response.json();
        console.log(data[0]);
        setUserDetails(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUserDetails();
  }, [authToken, navigate,id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageData = e.target.result;
        localStorage.setItem("profileImage", imageData);
        setProfileImage(imageData);
      };

      reader.readAsDataURL(file);
    }
  };


  return (
    <div >
      <Navbar page={"profile"} />
      
      <div className="profile-card" id="pbg" style={{marginTop:"3%"}}>
        <ImgUpload onChange={handleImageChange} src={profileImage} />
        <h2 className="profile-name">{userDetails?.name}</h2>
        
        <div><h4>Email: </h4><p className="profile-email">{userDetails?.email}</p></div>
        <div><h4>Phone Number: </h4><p className="profile-phno">{userDetails?.phno}</p></div>
        <div><h4>About: </h4><p className="profile-about">{userDetails?.about}</p></div>
        <div><h4>Institution: </h4><p className="profile-institution">{userDetails?.institution}</p></div>
        <div><h4>Role: </h4><p className="profile-role">{userDetails?.role}</p></div>
        <div><h4>Domain: </h4><p className="profile-domain">{userDetails?.domain}</p></div>
      </div>
      
    
    </div>
  );
}

export default Profile;
