import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddCourse() {
  const navigate  = useNavigate();
  const[error , setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    instructor:'',
    price:'',
    discription:'',
    y_link:'',
    p_link:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8800/addCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log('Course Added successfully!');
        navigate("/DCourses");
        toast.success('Added successfullly', {
          position: 'top-right', // You can customize the position here
          autoClose: 1000, // Automatically close after 3 seconds (adjust as needed)
          hideProgressBar: false, // Show a progress bar
          closeOnClick: true, // Close the toast on click
          pauseOnHover: false, // Pause the timer when hovering over
          draggable: false, // Allow dragging the toast
        });
      } else {
        const data = await response.json();
        setError(data.error)
      }
    } catch (error) {
      setError('course add error:', error);
    }
  };

  return (
    <div className='add'>
    <div className='container1'>
      <h2>Course Registration</h2>
      <form onSubmit={handleSubmit} className="addCourse-form">
      <label>Name : </label>
      <input type="text" name="name" value={formData.name} onChange={handleChange}  required style={{width:"100%", height:"35px"}}/>
      <label>Instructor : </label>
      <input type="text" name="instructor" value={formData.instructor} onChange={handleChange}  required style={{width:"100%" , height:"35px"}}/>
      <label>price : </label>
      <input type="number" name="price" value={formData.price} onChange={handleChange}  required style={{width:"100%" , height:"35px"}}/>
      <label>Description : </label>
      <input type="text" name="discription" value={formData.discription} onChange={handleChange}  required style={{width:"100%" , height:"35px"}}/>
      <label>Video Link : </label>
      <input type="text" name="y_link" value={formData.y_link} onChange={handleChange}  required style={{width:"100%" , height:"35px"}}/>
      <label>Image Link : </label>
      <input type="text" name="p_link" value={formData.p_link} onChange={handleChange}  required style={{width:"100%" , height:"35px"}}/>
        {error && <span className='error-msg'>{error}</span>}
        <div className='btn1'><button type="submit">Add Course</button></div>
      </form>
      </div>
    </div>
  );
}

export default AddCourse;
