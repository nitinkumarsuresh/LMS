import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistrationForm() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [emailvalidate, setEmailValidate] = useState(false);

  const [passwordLengthError, setPasswordLengthError] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    phno: '',
    institution: '',
    qualification: '',
    domain: '',
    password: '',
    category:'',
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    dob: '',
    email: '',
    phno: '',
    institution: '',
    qualification: '',
    domain: '',
    password: '',
    category:'',
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(name==='dob'||name==='email'||name==='institution' ||name==='qualification'|| name==='domain'|| name==='category' ){
      setFormData({ ...formData, [name]: value });
      setFieldErrors({ ...fieldErrors, [name]: '' });
      return;
    }


    if(value===''){
      setFormData({ ...formData, [name]: value });
      return;
    }


    if (name === 'name') {
      // Name validation: allow only letters and whitespaces
      const isValidName = /^[A-Za-z\s]+$/.test(value);
      if ( !isValidName) {
        setFieldErrors({ ...fieldErrors, [name]: 'Only characters and whitespaces are allowed' });
      } else {
        setFormData({ ...formData, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: '' });
      }
    } else {
      // Clear the error message when the user starts typing in other fields
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }

    // Clear the password length error when the user types
    if (name === 'password') {
      setFormData({ ...formData, [name]: value });
      if(value.length>=8){
        if (! /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!]){8,}$/.test(formData.password))
        {
          setFieldErrors({ ...fieldErrors, ['password']: 'must contains character, number, special characters.' });
          return
        }else{
          setFieldErrors({ ...fieldErrors, ['password']: '' });
          return;
        }
      }else{
        setFieldErrors({ ...fieldErrors, ['password']: 'Password must contains atleast 8 length' });
        return
      }
    }

    if (name === 'phno') {
      if(value.length<10){
        if(value.length===1){
          const indianPhoneRegex = /^[6789]$/;
            if (!indianPhoneRegex.test(value)) {
              setFieldErrors({ ...fieldErrors, [name]: 'Enter a valid Indian phone number.' });
              return;
            } 
        }
        setFieldErrors({ ...fieldErrors, [name]: 'Enter 10 digit mobile number' });
        setFormData({ ...formData, [name]: value });
        return;
      }
      const indianPhoneRegex = /^[6789]\d{9}$/;
      if (!indianPhoneRegex.test(value)) {
        setFieldErrors({ ...fieldErrors, [name]: 'Enter a valid Indian phone number.' });
      } else {
        setFormData({ ...formData, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: '' });
      }
    }

     

  };


  
  function validateEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    const formKeys = Object.keys(formData);
    let isFormValid = true;
    const newFieldErrors = { ...fieldErrors };

    for (const key of formKeys) {
      if (!formData[key]) {
        newFieldErrors[key] = 'This field should not be empty!';
        isFormValid = false;
      }
    }
    
    if (!isFormValid) {
      setFieldErrors(newFieldErrors);
      // setError("All fields are required")
      return
    }
    
    
    if (!validateEmail(formData.email)) {
      setFieldErrors({ ...fieldErrors, ['email']: 'Enter a valid email ' });
      return
    } 

    if(formData.password.length>=8){
    if (! /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!]){8,}$/.test(formData.password))
    {
      setFieldErrors({ ...fieldErrors, ['password']: 'Password must contains one character & number & special characters.' });
      return
    }
  }else{
    setFieldErrors({ ...fieldErrors, ['password']: 'Password must contains atleast 8 length' });
    return
  }
    if(formData.phno.length !== 10){
      setFieldErrors({ ...fieldErrors, ['phno']: 'Enter a valid phone number' });
      return
    }

    if(formData.category === 'user')
    {
      try {
        const response = await fetch('http://localhost:8800/adduser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.status === 200) {
          console.log('Registration successful!');
          toast.success('Successfully Registered', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });
          navigate('/login');
        } else {
          const data = await response.json();
          setError(data.error);
        }
      } catch (error) {
        setError('Registration error:', error);
      }
    }else{
      try {
        const response = await fetch('http://localhost:8800/addtutor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.status === 200) {
          console.log('Registration successful!');
          toast.success('Successfully Registered', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });
          navigate('/login');
        } else {
          const data = await response.json();
          setError(data.error);
        }
      } catch (error) {
        setError('Registration error:', error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth-register">
        <div className="container-register">
          <h2 style={{ color: 'darkblue' }}>User Registration</h2>
          <form onSubmit={handleSubmit} className='form-group-register' >
            
              
                <div className="text-area-register">  
                  <label>Name : </label>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                
                <div style={{height:"17px", display:"flex" , alignItems:"start",marginBottom:'2px' , color:"red"}}>
                {fieldErrors.name && (
                  <span className="error-msg" style={{color:'red',marginTop:'1px'}} >
                    {fieldErrors.name}
                  </span>
                )}
                </div>
                
              
            
                <div className="text-area-register">
                  <label>DOB:</label>
                </div>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                <div style={{height:"17px", display:"flex" , alignItems:"start",marginBottom:'2px' , color:"red" }}>
                {fieldErrors.dob && (
                  <span className="error-msg" style={{color:'red',marginTop:'1px' }} >
                    {fieldErrors.dob}
                  </span>
                )}</div>
             
            
            
             
                <div className="text-area-register">
                  <label>Email Id:</label>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e)=>{
                    handleChange(e);
                    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    if(!pattern.test(e.target.value))
                    {
                        setEmailValidate(true);
                    }
                    else{
                        setEmailValidate(false);
                    }                  
                  }}
                />
                 {emailvalidate ? <p style={{color:'red',fontSize:'14px'}}>Enter a valid email.</p> : ""}
               <div style={{height:"17px", display:"flex" , alignItems:"start",marginBottom:'2px' , color:"red" }}>
                {fieldErrors.email && (
                  <span className="error-msg" style={{color:'red',marginTop:'1px'}} >
                    {fieldErrors.email}
                  </span>
                )}
                </div>
              
             
                
              
            
            
             
                <div className="text-area-register">
                  <label>Password:</label>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />

               <div style={{height:"17px", display:"flex" , alignItems:"start",marginBottom:'2px' , color:"red"}}>
                {passwordLengthError && (
                  <span className="error-msg" style={{color:'red',marginTop:'1px'}} >
                    Password must be at least 8 characters long.
                  </span>
                )}
                {fieldErrors.password && (
                  <span className="error-msg" style={{color:'red',marginTop:'1px'}} >
                    {fieldErrors.password}
                  </span>
                )}
                </div>

                <div className="text-area-register">
                  <label>Phone:</label>
                </div>
                <input
                  type="tel"
                  name="phno"
                  value={formData.phno}
                  onChange={handleChange}
                />

                <div style={{height:"17px", display:"flex" , alignItems:"start",marginBottom:'2px' , color:"red"}}>
                {fieldErrors.phno && (
                  <span className="error-msg" style={{color:'red',marginTop:'1px'}} >
                    {fieldErrors.phno}
                  </span>
                )}
                </div>


                <div className="text-area-register">
                  <label>Domain:</label>
                </div>
                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                >
                  <option value="">
                    <p>Select a domain</p>
                  </option>
                  <option value="student">Student</option>
                  <option value="graduate">Graduate</option>
                  <option value="employee">Employee</option>
                  <option value="teacher">Teacher</option>
                </select>

                <div style={{height:"17px", display:"flex" , alignItems:"start",marginBottom:'2px' , color:"red"}}>
                {fieldErrors.domain && (
                  <span className="error-msg" style={{color:'red',marginTop:'1px'}} >
                    {fieldErrors.domain}
                  </span>
                )}
              </div>
                
                <div className="text-area-register">
                  <label>Mode:</label>
                </div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">
                    <p>Category</p>
                  </option>
                  <option value="user">User</option>
                  <option value="tutor">Tutor</option>
                </select>

                <div style={{height:"17px", display:"flex" , alignItems:"start",marginBottom:'2px' , color:"red"}}>
                {fieldErrors.category && (
                  <span className="error-msg" style={{color:'red',marginTop:'1px'}} >
                    {fieldErrors.category}
                  </span>
                )}
              </div>

              
                <div className="text-area-register">
                  <label>Institution:</label>
                </div>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                />

                <div style={{height:"17px", display:"flex" , alignItems:"start",marginBottom:'2px' , color:"red"}}>
                {fieldErrors.institution && (
                  <span className="error-msg" style={{color:'red',marginTop:'1px'}} >
                    {fieldErrors.institution}
                  </span>
                )}
                </div>
                <div className="text-area-register">
                  <label>Qualification:</label>
                </div>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                />

                  <div style={{height:"17px", display:"flex" , alignItems:"start",marginBottom:'2px' , color:"red"}}>
                {fieldErrors.qualification && (
                  <span className="error-msg" style={{color:'red',marginTop:'1px'}} >
                    {fieldErrors.qualification}
                  </span>
                )}
                </div>
              
            
            
              
                
              
                
            
            {error && (
              <span className="error-msg" style={{color:'red',marginTop:'1px',marginLeft:'-130px',fontWeight:'bold'}} >
                {error}
              </span>
            )}
            <div className="btn1" >
              <button type="submit" style={{marginRight:'140px',marginTop:'30px'}}>Sign Up</button>
            </div>
          </form>
          <span>
            Already have an account? Login
            <Link to="/login"> Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
