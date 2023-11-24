import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailvalidate, setEmailValidate] = useState(false);
    const [passvalidate, setPassValidate] = useState(false);
    const [evalidate,setEValidate]=useState(false);
    const [pvalidate,setPValidate]=useState(false);
    const [category,setCategory] = useState("");
    const [categoryError, setCategoryError] = useState(false);

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        
        if (category === '') {
            setCategoryError(true);
        
        } else {
            setCategoryError(false);
        }
        
        if (email.length===0) {
            setEValidate(true);
            
        }
        if(password.length===0)
        {
            setPValidate(true);
            return;
        }
        if(category === 'user')
        {
            try {
                
                const response = await fetch("http://localhost:8800/userlogin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("email", email);
                    console.log(data.token);
                    const userDetailsResponse = await fetch(`http://localhost:8800/detailsuser?email=${email}`);
                    if (userDetailsResponse.ok) {
                        const ud = await userDetailsResponse.json();
                        localStorage.setItem("name", ud[0]['name']);
                        localStorage.setItem("id", ud[0]['id']);
                        toast.success('Login Successful', {
                            position: 'top-right',
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                        });
                        navigate("/");
                    } else {
                        setError("An error occurred while fetching user details.");
                    }
                } else {
                    
                    const data = await response.json();
                    setError(data.error);
                }
            } catch (error) {
                setError("An error occurred. Please try again.");
            }
        }else{
            try {
                
                const response = await fetch("http://localhost:8800/tutorlogin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("tutor_token", data.token);
                    localStorage.setItem("tutor_email", email);
                    console.log(data.token);
                    const userDetailsResponse = await fetch(`http://localhost:8800/detailstutor?email=${email}`);
                    if (userDetailsResponse.ok) {
                        const ud = await userDetailsResponse.json();
                        localStorage.setItem("tutor_name", ud[0]['tutor_name']);
                        localStorage.setItem("tutor_id", ud[0]['id']);
                        toast.success('Login Successful', {
                            position: 'top-right',
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                        });
                        navigate("/");
                    } else {
                        setError("An error occurred while fetching user details.");
                    }
                } else {
                    const data = await response.json();
                    setError(data.error);
                }
            } catch (error) {
                setError("An error occurred. Please try again.");
            }
        }
    }

    return(
      <div>
        <Navbar/>
        <div className='auth'>
        <div className='container' >
            
            <h2 style={{color:'darkblue'}}>Login</h2>
            
            <form autoComplete="off" className='form-group' onSubmit={login}>

            <div className="text-area-register">
                  <label>Mode:</label>
                </div>
                <select
                style={{width:'100%'}}
                  name="category"
                  value={category}
                  onChange={(e)=>{setCategory(e.target.value);
                    setCategoryError(false);
                    }}
                  
                >
                  <option value="">
                    <p>Category</p>
                  </option>
                  <option value="user">User</option>
                  <option value="tutor">Tutor</option>
                </select>
                {categoryError ? <p style={{ color: 'red', fontSize: '14px' }}>This field should not be empty!</p> : ''}

                
                <label htmlFor="email">Email Id :</label>
                <input type="email" className='form-control' style={{width:'100%' ,  marginRight:'50px'}}
                    onChange={(e) =>{
                        setEmail(e.target.value);
                        setEValidate(false);
                        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                        if(!pattern.test(e.target.value))
                        {
                            setEmailValidate(true);
                        }
                        else{
                            setEmailValidate(false);
                        }
                    }} value={email}   />
                  {emailvalidate ? <p style={{color:'red',fontSize:'14px'}}>Enter a valid email.</p> : ""}
                  {evalidate ? <p style={{color:'red',fontSize:'14px'}}>This field should not be empty!</p> : ""}
                
                <label htmlFor="password">Password : </label>
                <input type="password" className='form-control' style={{width:'100%'}}
                    onChange={(e) =>{ 
                        setPassword(e.target.value)
                        setPValidate(false);
                        if(e.target.value === ""){
                            setPassValidate(true);
                        } else {
                            setPassValidate(false);
                        }
                    }} value={password}    />
                  {passvalidate ? <p style={{color:'red',fontSize:'14px'}}>Please enter a password.</p>:"" }
                  {pvalidate ? <p style={{color:'red',fontSize:'14px'}}>This field should not be empty!</p> : ""}
                <span>Forget Password? <Link to={"/mail-sent"}> Here</Link></span>
                <div className='btn1' ><button type="submit" className='btn btn-success btn-md mybtn' >LOGIN</button></div>
            </form>
            {error && <span className='error-msg' style={{color:'red',fontWeight:'bold',fontSize:'14px'}}>{error}</span>}
            <br/>
            <span style={{marginBottom:'140px'}}>Don't have an account? Register
                <Link to="/register"> Here</Link>
            </span>
        </div></div>
      </div>
    );
}
export default Login;
