import React from 'react';
import Navbar from './Navbar';
import Footer from './header and footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faHome, faPhoneAlt, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import ContactForm from './Contactform';

function Contact() {
  return (
    <div>
      <Navbar page="contact" />
      <section id="contact-home">
        <h2>Contact Us</h2>
      </section>

      <section id="contact">
        <div className="getin">
          <h2>Get in touch</h2>
          <p>Looking for help? Fill out the form and start a new adventure.</p>
          <div className="getin-details">
            <div>
              <FontAwesomeIcon icon={faHome} className="i" />
              <h3>Headquarters</h3>
            </div>
            <p>Jai Nagar, Arumbakkam, Opp. to Koyambedu Bus Dep, Chennai, India</p>
          </div>
          <div className="getin-details">
            <div>
              <FontAwesomeIcon icon={faPhoneAlt} className="i" />
              <h3>Phone</h3> 
            </div>
            <p>+91 7667758080 <br />+91 7904968262</p>
          </div>
          <div className="getin-details">
            <div>
              <FontAwesomeIcon icon={faEnvelopeOpenText} className="i" />
              <h3>Support</h3>
            </div>
            <p>nitinkumarsuresh04@gmail.com <br />info@oneyesinfotechsolutions.com</p>
            <h3>Follow Us</h3>
            <div className="pro-links">
              <FontAwesomeIcon icon={faFacebookF} className="i" />
              <FontAwesomeIcon icon={faInstagram} className="i" />
              <FontAwesomeIcon icon={faLinkedinIn} className="i" />
            </div>
          </div>
        </div>
        {/* <div className="form">
          <h4>Let's Connect</h4>
          <p>We're here to help and provide information on a wide range of topics and tasks.</p>
          
          <div className="form-row">
            <input type="text" placeholder="Your Name" />
            <input type="text" placeholder="Your Email" />
          </div>
          <div className="form-col">
            <input type="text" placeholder="Subject" />
          </div>
          <div className="form-col">
            <textarea name="" id="" cols="30" rows="8" placeholder="Message"></textarea>
          </div>
          <div className="form-col">
            <button>Send Message</button>
          </div>
          
        </div> */}
        <ContactForm/>
      </section>

      <section id="map">
        <iframe
          title='location'
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15545.734296494864!2d80.21228854999997!3d13.071685249999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266a26e195065%3A0x11382e6761fa01e8!2sArumbakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600106!5e0!3m2!1sen!2sin!4v1694851751650!5m2!1sen!2sin"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>



      </section>
      <Footer />
    </div>
  );
}

export default Contact;
