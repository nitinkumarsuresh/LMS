import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactForm() {
  const [state, handleSubmit] = useForm("maygpbgd");

  
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
    await handleSubmit(e);
      setFormData({
        name: '',
        email: '',
        number: '',
        message: '',
      });
      (toast.success('Message Sent', {
        position: 'top-right', // You can customize the position here
        autoClose: 1000, // Automatically close after 3 seconds (adjust as needed)
        hideProgressBar: false, // Show a progress bar
        closeOnClick: true, // Close the toast on click
        pauseOnHover: false, // Pause the timer when hovering over
        draggable: false, // Allow dragging the toast
      }));
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
