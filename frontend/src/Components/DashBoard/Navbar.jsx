import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Navbar(){
  const navigate = useNavigate();
    return(
        <nav>
          <i className='bx bx-menu' ></i>
          <h4>Menu</h4>
          <form action="#">
            <div className="form-input">
              
              
            </div>
          </form>
          {/* <input type="checkbox" id="switch-mode" hidden />
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <a href="#" className="profile">
            <img src="img/people.png" alt="Profile" />
          </a> */}
          <button onClick={()=>{
            
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            
            navigate('/');
            toast.success('LogOut Successful', {
                                  position: 'top-right',
                                  autoClose: 1000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: false,
                                  draggable: false,
                              });
          }} className="sgn-but">
                Log Out
              </button>
        </nav>
    );
}

export default Navbar;