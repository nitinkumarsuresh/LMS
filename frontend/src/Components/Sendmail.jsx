import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Sendmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const[userId , setUserId] = useState(0);
  const [emailvalidate, setEmailValidate] = useState(false);

  const mailprocess = async (e) => {
    e.preventDefault();

    const userDetailsResponse = await fetch(`http://localhost:8800/details?email=${email}`);
    
    const ud = await userDetailsResponse.json();
    await setUserId(ud[0]['id']);
    console.log("The user id got is "+ud[0].id);

    if (!email) {
      alert('Enter an email');
      return;
    }

    try {
      const response = await fetch("http://localhost:8800/mailprocess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email  , userId }),
      });
        toast.success('Mail sent successfully', {
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
  };

  return (
    <div>
      <Navbar />
      <div className='auth'>
        <div className='container'>
          <h2 style={{ color: 'darkblue' }}>Password Recovery</h2>
          <br />
          <form autoComplete="off" className='form-group' onSubmit={mailprocess}>
            <label htmlFor="email" style={{ marginBottom: '20px' }}>Enter your email:</label>
            <input
              type="email"
              className='form-control'
              style={{ width: '100%', marginRight: '50px' }}
              onChange={(e) => {
                setEmail(e.target.value);
                const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!pattern.test(e.target.value)) {
                  setEmailValidate(true);
                } else {
                  setEmailValidate(false);
                }
              }}
              value={email}
              required
            />
            {emailvalidate ? <p style={{ color: 'red' }}>Enter a valid email.</p> : ""}
            <br />
            <div className='btn1'>
              <button type="submit" className='btn btn-success btn-md mybtn' style={{ marginTop: '40px' }}>Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sendmail;
