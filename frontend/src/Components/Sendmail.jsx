import React, { useState } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Sendmail() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState();
  const [isFetched, setIsFetched] = useState(false);
  const [emailvalidate, setEmailValidate] = useState(false);
  const [evalidate, setEValidate] = useState(false);
  const [error, setError] = useState('');
  const [category,setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);

    

  const mailprocess = async (e) => {
    e.preventDefault();
    if (category === '') {
      setCategoryError(true);
  
  } else {
      setCategoryError(false);
  }
    if (email.length === 0) {
      setEValidate(true);
      return; // Don't proceed if the email field is empty
    }
    if(category === 'tutor'){
      try {
        const response = await fetch(`http://localhost:8800/detailstutor?email=${email}`);
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data[0]);
        setUserId(data[0].id);
        setIsFetched(true);
    
        if (isFetched) {
          try {
            console.log('tutorrecovery')
            console.log(userId);
            await fetch("http://localhost:8800/tutormailprocess", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, userId }),
            });
            toast.success("Mail sent successfully", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
            });
          } catch (error) {
            setError("An error occurred. Please try again.", error);
          }
        }
      } catch (error) {
        setError("email not exists", error);
      }
    }else{
      try {
        const response = await fetch(`http://localhost:8800/detailsuser?email=${email}`);
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data[0])
        setUserId(data[0].id);
        setIsFetched(true);
    
        if (isFetched) {
          console.log('userrecovery')
          console.log(userId);
          try {
            await fetch("http://localhost:8800/usermailprocess", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, userId }),
            });
            toast.success("Mail sent successfully", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
            });
          } catch (error) {
            setError("An error occurred. Please try again.", error);
          }
        }
      } catch (error) {
        setError("email not exists", error);
      }
    }
    
  };
  

  return (
    <div>
      <Navbar />
      <div className="auth">
        <div className="container" style={{height:'70vh'}}>
          <h2 style={{ color: "darkblue" }}>Password Recovery</h2>
          <br />
          <form autoComplete="off" className="form-group" onSubmit={mailprocess}>
          <div style={{height:'55px'}}>
          
          <select
                style={{width:'100%'}}
                  name="category"
                  value={category}
                  onChange={(e)=>{setCategory(e.target.value);
                    setCategoryError(false);
                    }}
                  
                >
                  <option value="">
                    <p>Category</p>
                  </option>
                  <option value="user">User</option>
                  <option value="tutor">Tutor</option>
                </select>
                {categoryError ? <p style={{ color: 'red', fontSize: '14px' }}>This field should not be empty!</p> : ''}</div>
            <div style={{height:'50px'}}><label htmlFor="email" style={{ marginBottom: "10px" }}>
              Enter your email:
            </label>
            <input
              type="email"
              className="form-control"
              style={{ width: "100%", marginRight: "50px" }}
              onChange={(e) => {
                setEmail(e.target.value);

                if (email.length > 0) {
                  setEValidate(false);
                }
                const pattern =
                  /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!pattern.test(e.target.value)) {
                  setEmailValidate(true);
                } else {
                  setEmailValidate(false);
                }
              }}
              value={email}
            />
            {emailvalidate ? (
              <p style={{ color: "red" }}>Enter a valid email.</p>
            ) : (
              ""
            )}
            {evalidate ? (
              <p style={{ color: "red",fontSize:'14px' }}>This field should not be empty!</p>
            ) : (
              ""
            )}</div>

            <div className="btn1" style={{marginTop:'60px'}}>
              <button
                type="submit"
                className="btn btn-success btn-md mybtn"
                style={{ marginTop: "40px" }}
              >
                Send
              </button>
            </div>
          </form>
          {error && <span className='error-msg' style={{color:'red',fontWeight:'bold',fontSize:'14px'}}>{error}</span>}
        </div>
      </div>
    </div>
  );
}

export default Sendmail;
