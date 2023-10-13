import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistrationForm() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [passwordLengthError, setPasswordLengthError] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    about: '',
    email: '',
    phno: '',
    institution: '',
    role: '',
    domain: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    about: '',
    email: '',
    phno: '',
    institution: '',
    role: '',
    domain: '',
    password: '',
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error message when the user starts typing in a field
    setFieldErrors({ ...fieldErrors, [name]: '' });

    // Clear the password length error when the user types
    if (name === 'password') {
      setPasswordLengthError(false);
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
        newFieldErrors[key] = '*';
        isFormValid = false;
      }
    }
    

    
    // Check if password is at least 8 characters long
    

    if (!isFormValid) {
      setFieldErrors(newFieldErrors);
      setError("All fields are required")
      return
    }
    
    
    if (!validateEmail(formData.email)) {
      setError('Enter a valid email');
      return
    } 
    if(formData.password.length < 8)
    {
      setError("Password must be at least 8 characters long.")
      return
    }
    if(formData.phno.length !== 10){
      setError("Enter a valid phone number")
      return
    }

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
  };

  return (
    <div>
      <Navbar />
      <div className="auth">
        <div className="container">
          <h2 style={{ color: 'darkblue' }}>User Registration</h2>
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="input-group">
              <div>
                <div className="text-area">
                  
                  <label>Name : </label>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {fieldErrors.name && (
                  <span className="error-msg" style={{ color: 'red', fontWeight: '900' }}>
                    {fieldErrors.name}
                  </span>
                )}
              </div>
            <div>
                <div className="text-area">
                  <label>About:</label>
                </div>
                <input
                  type="text"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                />
                {fieldErrors.about && (
                  <span className="error-msg" style={{ color: 'red', fontWeight: 'bold' }}>
                    {fieldErrors.about}
                  </span>
                )}
              </div>
            </div>
            <div className="input-group">
              <div>
                <div className="text-area">
                  <label>Email Id:</label>
                </div>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {fieldErrors.email && (
                  <span className="error-msg" style={{ color: 'red', fontWeight: 'bold' }}>
                    {fieldErrors.email}
                  </span>
                )}
              </div>
              <div>
                <div className="text-area">
                  <label>Institution:</label>
                </div>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                />
                {fieldErrors.institution && (
                  <span className="error-msg" style={{ color: 'red', fontWeight: 'bold' }}>
                    {fieldErrors.institution}
                  </span>
                )}
              </div>
            </div>
            <div className="input-group">
              <div>
                <div className="text-area">
                  <label>Password:</label>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {passwordLengthError && (
                  <span className="error-msg" style={{ color: 'red', fontWeight: 'bold' }}>
                    Password must be at least 8 characters long.
                  </span>
                )}
                {fieldErrors.password && (
                  <span className="error-msg" style={{ color: 'red', fontWeight: 'bold' }}>
                    {fieldErrors.password}
                  </span>
                )}
              </div>
              <div>
                <div className="text-area">
                  <label>Role:</label>
                </div>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                />
                {fieldErrors.role && (
                  <span className="error-msg" style={{ color: 'red', fontWeight: 'bold' }}>
                    {fieldErrors.role}
                  </span>
                )}
              </div>
            </div>
            <div className="input-group">
              <div>
                <div className="text-area">
                  <label>Phone:</label>
                </div>
                <input
                  type="tel"
                  name="phno"
                  value={formData.phno}
                  onChange={handleChange}
                />
                {fieldErrors.phno && (
                  <span className="error-msg" style={{ color: 'red', fontWeight: 'bold' }}>
                    {fieldErrors.phno}
                  </span>
                )}
              </div>
              <div>
                <div className="text-area">
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
                {fieldErrors.domain && (
                  <span className="error-msg" style={{ color: 'red', fontWeight: 'bold' }}>
                    {fieldErrors.domain}
                  </span>
                )}
              </div>
            </div>
            {error && (
              <span className="error-msg" style={{ color: 'red', fontWeight: 'bold' }}>
                {error}
              </span>
            )}
            <div className="btn1">
              <button type="submit">Sign Up</button>
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
