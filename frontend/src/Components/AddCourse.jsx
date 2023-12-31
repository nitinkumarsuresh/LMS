import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCourse() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    price: '',
    description: '', // Corrected field name here
    y_link: '',
    p_link: '',
    tutor_id: localStorage.getItem('tutor_id'),
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    instructor: '',
    price: '',
    description: '', // Corrected field name here
    y_link: '',
    p_link: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate input and set error message
    let error = '';
    if (name === 'name' && value === '') {
      error = 'Course name is required';
    } else if (name === 'instructor' && value === '') {
      error = 'Instructor is required';
    } else if (name === 'price' && value === '') {
      error = 'Price is required';
    } else if (name === 'description' && value === '') {
      error = 'Description is required';
    } else if (name === 'y_link' && value === '') {
      error = 'Video Link is required';
    } else if (name === 'p_link' && value === '') {
      error = 'Image Link is required';
    }
    setFormErrors({ ...formErrors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formKeys = Object.keys(formData);
    let isFormValid = true;
    const newFieldErrors = { ...formErrors };

    for (const key of formKeys) {
      if (!formData[key]) {
        newFieldErrors[key] = 'This field should not be empty!';
        isFormValid = false;
      }
    }
    
    if (!isFormValid) {
      setFormErrors(newFieldErrors);
      // setError("All fields are required")
      return
    }




    
    // for (const key in formErrors) {
    //   if (formErrors[key]) {
    //     setError('Please fill in all required fields.');
    //     return;
    //   }
    // }
    

    

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
        navigate('/tCourses');
        toast.success('Added successfully', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('Course add error:', error);
    }
  };

  return (
    <div className="add">
      <div className="container1">
        <h2>Course Registration</h2>
        <form onSubmit={handleSubmit} className="addCourse-form"  noValidate>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%'   }}
          />
          <div style={{height:'25px'}}>
          {formErrors.name && (
            <span className="error-msg" style={{ color: 'red', fontWeight: 'bold', textAlign: 'start' }}>
              {formErrors.name}
            </span>
          )}
          </div>

          <label>Instructor: </label>
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
          <div style={{height:'25px'}}>
          {formErrors.instructor && (
            <span className="error-msg" style={{ color: 'red', fontWeight: 'bold', textAlign: 'start' }}>
              {formErrors.instructor}
            </span>
          )}
          </div>

          <label>Price: </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
          <div style={{height:'25px'}}>
          {formErrors.price && (
            <span className="error-msg" style={{ color: 'red', fontWeight: 'bold', textAlign: 'start' }}>
              {formErrors.price}
            </span>
          )}
          </div>

          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
          <div style={{height:'25px'}}>
          {formErrors.description && (
            <span className="error-msg" style={{ color: 'red', fontWeight: 'bold', textAlign: 'start' }}>
              {formErrors.description}
            </span>
          )}
          </div>

          <label>Video Link: </label>
          <input
            type="text"
            name="y_link"
            value={formData.y_link}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
          <div style={{height:'25px'}}>
          {formErrors.y_link && (
            <span className="error-msg" style={{ color: 'red', fontWeight: 'bold', textAlign: 'start' }}>
              {formErrors.y_link}
            </span>
          )}
          </div>

          <label>Image Link: </label>
          <input
            type="text"
            name="p_link"
            value={formData.p_link}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
          <div style={{height:'25px'}}>
          {formErrors.p_link && (
            <span className="error-msg" style={{ color: 'red', fontWeight: 'bold', textAlign: 'start' }}>
              {formErrors.p_link}
            </span>
          )}</div>

          {error && <span className="error-msg">{error}</span>}
          <div className="btn1">
            <button type="submit">Add Course</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
