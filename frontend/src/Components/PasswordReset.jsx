import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PasswordReset() {


  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [error1,setError1] = useState('');
  const [error2,setError2] = useState('');
  const [password1Error, setPassword1Error] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  console.log(location.pathname.split("/"));
  const category = location.pathname.split('/')[2];
  console.log(category);
  const navigate = useNavigate();

  async function handlesubmit(e) {
    e.preventDefault();
    if(password1 === ''){
      setError1("This field is required.");
    }
    if(password2 === ''){
      setError2("This field is required.");
      return;
    }
    if (password1 === '' || password2 === '') {
      setPassword1Error(password1 === '');
      setPassword2Error(password2 === '');
      
      return;
    }

    if (password1 !== password2) {
      setError("Passwords do not match");
      return;
    }
    if(category === 'user'){
      try {
        await fetch("http://localhost:8800/updatepassword-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, password }),
        });
        toast.success('Password Reset successful', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        navigate("/login");
      } catch (error) {
        setError("An error occurred. Please try again.", error);
      }
      
    }
    else{
      try {
        await fetch("http://localhost:8800/updatepassword-tutor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, password }),
        });
        toast.success('Password Reset successful', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        navigate("/login");
      } catch (error) {
        setError("An error occurred. Please try again.", error);
      }
      
    }
    }
    

  useEffect(() => {
    if (password1 === password2) {
      setError("");
    }
  }, [password1, password2]);

  return (
    <div>
      <Navbar />
      <div className='auth'>
        <div className='container' style={{height:'80vh'}}>
          <h2 style={{ color: 'darkblue' }}>Reset Password</h2>
          <br />
          <form autoComplete="off" className='form-group' style={{display:'flex',flexDirection:'column'}} onSubmit={handlesubmit}>
            <label htmlFor="password">New Password: </label>
            <input
              type="password"
              name="password"
              onChange={(e) => { 
                setPassword1(e.target.value);
                 setPassword(e.target.value);
                 setError1('');
                 }}
              className={`form-control ${password1Error ? 'error' : ''}`}
              style={{ width: '100%' }}
            />
            <div>
            {error1 && <span style={{ color: "red",textAlign:'start' }}>{error1}</span>}</div>
            
           
            <label htmlFor="password" style={{ marginTop: '50px' }}>Re-type New Password: </label>
            <input
              type="password"
              onChange={(e) => { 
                setPassword2(e.target.value);
                 setPassword(e.target.value) ;
                 setError2('');
                 if (password1 !== password2) {
                  setError("Passwords do not match");
                  // return;
                }}}
              className={`form-control ${password2Error ? 'error' : ''}`}
              style={{ width: '100%' }}
            />
             <div>
            {error2 && <span style={{ color: "red",textAlign:'start' }}>{error2}</span>}</div>
            
            <div>
            {error && <span style={{ color: "red",textAlign:'start' }}>{error}</span>}</div>
            <div className='btn1' ><button type="submit" className='btn btn-success btn-md mybtn' style={{ marginTop: '40px' }} >CONFIRM</button></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
