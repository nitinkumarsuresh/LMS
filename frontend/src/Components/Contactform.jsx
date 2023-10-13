import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactForm() {
  const [state, handleSubmit] = useForm("maygpbgd");

  // const[formValidate,setFormvalidate]= useState(false);

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    // Check if all required fields are filled
    if (
      formData.name !== '' &&
      formData.email !== '' &&
      formData.number !== '' &&
      formData.message !== ''
    ) {
      await handleSubmit(e);
      // setFormvalidate(false)
      // Reset the form data and show the success message
      setFormData({
        name: '',
        email: '',
        number: '',
        message: '',
      });
      
      toast.success('Message Sent', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    } else {
      // Display an error message because some fields are empty
      // setFormvalidate(true)
      toast.warning('All fields are required', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };
  

    

  return (
    <div className="form">
      <form onSubmit={handleFormSubmit}>
        <h4>Let's Connect</h4>
        <p>We're here to help and provide information on a wide range of topics and tasks.</p>
        <div className="form-row">
          
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {/* {formValidate && (<p>This field cannot be empty!!</p>)} */}
          <ValidationError prefix="Name" field="name" errors={state.errors} />
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div className="form-col">
          <input
            id="number"
            type="number"
            name="number"
            placeholder="Your Contact"
            value={formData.number}
            onChange={handleInputChange}
          />
          <ValidationError prefix="Number" field="number" errors={state.errors} />
        </div>

        <div className="form-col">
          <textarea
            id="message"
            name="message"
            cols="30"
            rows="8"
            placeholder="Message"
            value={formData.message}
            onChange={handleInputChange}
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </div>

        <div className="form-col">
          <button type="submit" disabled={state.submitting}>
            Send Message
          </button>
        </div>
        
      </form>
      {/* {state.succeeded ?:("")} */}
    </div>
  );
}

export default ContactForm;
