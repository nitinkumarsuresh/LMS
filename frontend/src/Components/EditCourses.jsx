import React, { useState } from 'react';
import {useNavigate  , useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditCourse() {
  const navigate  = useNavigate();
  const[error , setError] = useState('');
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];
  const [formData, setFormData] = useState({
    course_name: '',
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

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await axios.get(`http://localhost:8800/course/${courseId}`);
        const fetchedCourse = response.data[0];
        console.log(response);
        setFormData(fetchedCourse);
        
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
    fetchCourse();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.put(
        `http://localhost:8800/updateCourse/${courseId}`,
        formData
      );

      if (response.status === 200) {
        console.log('Course updated successfully');
      } else {
        console.error('Course update failed');
      }
      navigate("/DCourses")
      toast.success('Updated successfullly', {
        position: 'top-right', // You can customize the position here
        autoClose: 1000, // Automatically close after 3 seconds (adjust as needed)
        hideProgressBar: false, // Show a progress bar
        closeOnClick: true, // Close the toast on click
        pauseOnHover: false, // Pause the timer when hovering over
        draggable: false, // Allow dragging the toast
      });
    };

  return (
    <div className='add'>
    <div className='container1'>
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit} className="addCourse-form">
      <label>Name : </label>
      <input type="text" name="course_name" value={formData.course_name} onChange={handleChange}  required style={{width:"100%  "}}/>
      <label>Instructor : </label>
      <input type="text" name="instructor" value={formData.instructor} onChange={handleChange}  required style={{width:"100%"}}/>
      <label>Price : </label>
      <input type="number" name="price" value={formData.price} onChange={handleChange}  required style={{width:"100%"}}/>
      <label>Description : </label>
      <input type="text" name="discription" value={formData.discription} onChange={handleChange}  required style={{width:"100%"}}/>
      <label>Video Link : </label>
      <input type="text" name="y_link" value={formData.y_link} onChange={handleChange}  required style={{width:"100%"}}/>
      <label>Image Link : </label>
      <input type="text" name="p_link" value={formData.p_link} onChange={handleChange}  required style={{width:"100%"}}/>
        {error && <span className='error-msg'>{error}</span>}
        <div className='btn1'><button type="submit">Update</button></div>
      </form>
      </div>
    </div>
  );
}

export default EditCourse;
