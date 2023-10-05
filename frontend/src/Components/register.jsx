import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function RegistrationForm() {

  
  // const [emailValidate, setEmailValidate] = useState(false);
  

  const navigate  = useNavigate();
  const[error , setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    email: '',
    phno: '',
    institution: '',
    role: '',
    domain: '',
    password:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


  


    try {
      const response = await fetch('http://localhost:8800/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log('Registration successful!');
        toast.success('Successfully Registered', {
          position: 'top-right', // You can customize the position here
          autoClose: 1000, // Automatically close after 3 seconds (adjust as needed)
          hideProgressBar: false, // Show a progress bar
          closeOnClick: true, // Close the toast on click
          pauseOnHover: false, // Pause the timer when hovering over
          draggable: false, // Allow dragging the toast
        });
        navigate('/login')
      } else {
        const data = await response.json();
        setError(data.error)
      }
    } catch (error) {
      setError('Registration error:', error);
    }
  };

  return (
    <div>
      <Navbar/>
    <div className='auth'>
    <div className='container'>
      <h2 style={{color:'darkblue'}}>User Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form" >
        <div className="input-group">
          <div>
            <div className='text-area'><label >Name : </label></div>
            <input type="text" name="name" value={formData.name} onChange={handleChange}  required/>
          </div >
          <div>
            <div className='text-area'><label>About:</label></div>
            <input type="text" name="about" value={formData.about} onChange={handleChange}  required />
          </div>
        </div>
        <div className="input-group">
          <div>
            <div className='text-area'><label>Email Id:</label></div>
            <input type="email" name="email" value={formData.email} onChange={handleChange}  required />
            
          </div>
          <div>
            <div className='text-area'><label>Institution:</label></div>
            <input type="text" name="institution" value={formData.institution} onChange={handleChange}  required />
          </div>
        </div>
        <div className="input-group">
        <div >
            <div className='text-area'><label>Password:</label></div>
            <input type="password" name="password" value={formData.password} onChange={handleChange}  required />
          </div>
          <div >
            <div className='text-area'><label>Role:</label></div>
            <input type="text" name="role" value={formData.role} onChange={handleChange}  required />
          </div>
        </div>
        <div className="input-group">
        <div >
            <div className='text-area'><label>Phone no:</label></div>
            <input type="tel" name="phno" value={formData.phno} onChange={handleChange}  required />
          </div>
        <div>
          
          <div className='text-area'><label>Domain:</label></div>
          <select name="domain" value={formData.domain} onChange={handleChange} required>
            <option value=""><p>Select a domain</p></option>
            <option value="student">Student</option>
            <option value="graduate">Graduate</option>
            <option value="employee">Employee</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        </div>
        {error && <span className='error-msg' style={{color:"red" , fontWeight:"bold"}}>{error}</span>}
        <div className='btn1'><button type="submit" >Sign Up</button>
        
        </div>
      </form>
      <span>Already have an account? Login
      <Link to="/login"> Here</Link>
      </span>
      </div>
    </div>
    </div>
  );
}

export default RegistrationForm;
