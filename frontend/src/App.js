import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Login from './Components/login';
import Register from './Components/register';
import Course from './Components/course';
import Courses from './Components/Courses';
import Profile from './Components/profile';
import Learnings from './Components/learnings';
import Home from './Components/Home';
import About from './Components/About'
import Contact from './Components/contact'
import AddCourse from './Components/AddCourse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Components/DashBoard/Dashboard';
import 'boxicons/css/boxicons.min.css';
import EditCourse from './Components/EditCourses';
import DUsers from './Components/DashBoard/DUsers';
import DCourses from './Components/DashBoard/DCourses';
import Assessment from './Components/Assessment';
import ErrorPage from './Components/ErrorPage';
import PasswordReset from './Components/PasswordReset';
import Sendmail from './Components/Sendmail';
import AddQuestions from './Components/AddQuestions';
import Payment from './Components/Payment';
import Performance from './Components/DashBoard/Performance';
import DTutors from './Components/DashBoard/DTutors';

import TDashboard from './Components/tutuorDashboard/TDashboard';
import TCourses from './Components/tutuorDashboard/TCourses';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/addquestions/:id" element={<AddQuestions/>}/>
          <Route path='/resetpassword/user/:id' Component={PasswordReset}></Route>
          <Route path='/resetpassword/tutor/:id' Component={PasswordReset}></Route>
          <Route path='/mail-sent' Component={Sendmail}></Route>
          <Route path='/dashboard' Component={Dashboard}></Route>
          <Route path='/tdashboard' Component={TDashboard}></Route>
          <Route path='/login' Component={Login}></Route>
          <Route path='/register' Component={Register}></Route>
          <Route path='/' Component={Home}></Route>
          <Route path='/about' Component={About}></Route>
          <Route path='/contact' Component={Contact}></Route>
          <Route path='/courses' Component={Courses}></Route>
          <Route path='/course/:id' Component={Course}></Route>
          <Route path='/payment/:id' Component={Payment}></Route>
          <Route path='/assessment/:id' Component={Assessment}></Route>
          <Route path='/addcourse' Component={AddCourse}></Route>
          <Route path='/editCourse/:id' Component={EditCourse}></Route>
          <Route path='/profile' Component={Profile}></Route>
          <Route path='/Learnings' Component={Learnings}></Route>
          <Route path='/Dcourses' Component={DCourses}></Route>
          <Route path='/tcourses' Component={TCourses}></Route>
          <Route path='/Dusers' Component={DUsers}></Route>
          <Route path='/Dtutors' Component={DTutors}></Route>
          <Route path='/Performance' Component={Performance} />
          <Route path='*' Component={ErrorPage}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
