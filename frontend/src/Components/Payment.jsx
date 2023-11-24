import React from 'react'
import { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Payment = () => {
    const navigate= useNavigate();
    const location = useLocation();
    const courseId = location.pathname.split("/")[2];
    const [course, setCourse] = useState({
        course_name: "",
        instructor: "",
        price: null,
        description: "",
        y_link: "",
        p_link: "",
      });

    useEffect(() => {
    async function fetchCourse() {
        try {
        const response = await axios.get(`http://localhost:8800/course/${courseId}`);
        const fetchedCourse = response.data[0];
        setCourse(fetchedCourse);
        } catch (err) {
        console.log(err);
        }
    }
    fetchCourse();
    }, [courseId]);

    const initPayment = (data) => {
		const options = {
			key: "rzp_test_ltd8Do8knYgPt7", 
			amount: data.amount,
			currency: data.currency,
			name: course.course_name,
			description: "Test Transaction",
			image: course.p_link,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:8800/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
					toast.success("Enrollment successfull", {
						position: "top-right",
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: false,
					  });
                    const userId = localStorage.getItem("id");
					
                    axios.post('http://localhost:8800/enroll', { userId, courseId })
                    .then((response) => {
                        console.log('Enrollment successful:', response.data);
							try {
								console.log("mail sent")
								
								const email = localStorage.getItem('email')
								const username= localStorage.getItem("name");
								const data = {email:email,username:username, course_name:course['course_name']}
								 fetch("http://localhost:8800/enrollmentmail", {
								  method: "POST",
								  headers: {
									"Content-Type": "application/json",
								  },
								  body: JSON.stringify(data),
								});
								
							  } catch (error) {
								console.error("An error occurred. Please try again.", error);
							  }
						
                    })
                    .catch((error) => {
                    });
                    navigate(`/course/${courseId}`)
				} catch (error) {
					console.log(error);
				}	
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

    const handlePayment = async () => {
		try {
			const orderUrl = "http://localhost:8800/api/payment/orders";
			const { data } = await axios.post(orderUrl, { amount: course.price });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};


    return (
		
		<>
		<div style={{display:'flex',flexDirection:'row' ,backgroundColor:'#F1B041  ',padding:'5px'}}>
		<button style={{backgroundColor:'#3498DB ',borderRadius:'10px',width:'45px',height:'50px',marginLeft:'10px'}} onClick={()=>navigate('/courses')}  ><FontAwesomeIcon  icon={faBackward}/></button>
			<h2 style={{color:'black',marginTop:'0px',padding:'5px',marginLeft:'430px'}}>Course Enrollment</h2>
		</div>
        <div className="App111">
			
			<div className="book_container">
				<img src={course.p_link} alt="book_img" className="book_img" />
				<p className="book_name">{course.course_name}</p>
				<p className="book_author">By {course.instructor}</p>
				<p className="book_price">
					Price : <span>&#x20B9; {course.price}</span>
				</p>
				<button onClick={handlePayment} className="buy_btn">
					Buy now
				</button>
				
			</div>
			

		</div>
		</>
    )
}

export default Payment