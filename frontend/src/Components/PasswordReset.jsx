import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function PasswordReset(){
  const [password , setPassword] = useState('');
  const [password1 , setPassword1] = useState('');
  const [password2 , setPassword2] = useState('');
  const [error , setError] = useState('');
const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate=useNavigate();
    
   async function handlesubmit(e){
      e.preventDefault();
      console.log("hello");
      try {
        console.log(password +" "+ id);
        await fetch("http://localhost:8800/update-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id  , password }),
        });
          toast.success('Password Reset successfull', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });
      } catch (error) {
        console.error("An error occurred. Please try again.", error);
      }
      navigate("/login");
    }
    useEffect(()=>{
      if(password1!==password2){
        setError("password does not match");
      }else{
        setError("");
      }
    },[password])

  
    
    return(
      <div>
        <Navbar/>
        <div className='auth'>
        <div className='container'>
            
            <h2 style={{color:'darkblue'}}>Reset Password</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={handlesubmit}>
                
                <label htmlFor="password">New Password : </label>
                <input type="password" onChange={(e)=>{setPassword1(e.target.value) ; setPassword(e.target.value)}} className='form-control' style={{width:'100%'}}/>
                    
                <br />
                <label htmlFor="password" style={{marginTop:'50px'}}>Re-type NewPassword : </label>
                <input type="password" onChange={(e)=>{setPassword2(e.target.value);setPassword(e.target.value)}} className='form-control' style={{width:'100%'}}/>
                    
                    {error && <span style={{color:"red"}}>{error}</span>}

                <div className='btn1' ><button type="submit" className='btn btn-success btn-md mybtn' style={{marginTop:'40px'}} >CONFIRM</button></div>
            </form>
            
            
        </div></div>
      </div>
    );
}
export default PasswordReset;
