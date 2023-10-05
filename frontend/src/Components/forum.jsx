import { useEffect, useRef, useState } from 'react';
import './css/forum.css';

function Forum(props) {

  const taskRef = useRef("");
  const [message, setMessage] = useState([]);
  const [name, setName] = useState(localStorage.getItem("name"));

  const [formData, setFormData] = useState({
    name: name,
    course_id: props.courseid,
    message: ''
  });
  
  console.log(message);

  useEffect(() => {
    fetch(`http://localhost:8800/getMessages/${props.courseid}`)
      .then((res) => res.json())
      .then((data) => setMessage(data));
      console.log(message);
  }, []);

  const addTask = () => {
    if (taskRef.current.value.trim() !== "") {
      const newMessage = taskRef.current.value.trim();
      setFormData({ ...formData, message: newMessage });

      fetch('http://localhost:8800/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(()=>{
      
      taskRef.current.value = ""});message.push(formData);
    } else {
      alert("Enter a Message");
    }
  }

  console.log(message);

  // const taskCompletion = (index) => {
  //   let itemsCopy = [...message];
  //   itemsCopy.splice(index, 1);
  //   setMessage(itemsCopy);
  // }

  return (
    <div className="Forum">
      <h2 style={{ color: 'black', marginLeft: '16px' }}>Discussion Forum</h2>
      
      <div className='inputContainer'>
        <textarea
          cols='30'
          rows='5'
          type='text'
          ref={taskRef}
          name="taskInput"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>
      <div className='snd'>
        <button onClick={addTask}>Send</button>
      </div>
      {message.length>0 &&
      <div className='taskContainer'>
        
        {message.map((value, key) => {
          if (value.message.trim() !== "") {
            return (
              
              <div className='taskItem' key={key}>
                <p style={{ color: 'black' }}><div style={{fontSize:"12px" ,padding:"2px",borderRadius:"8px" , color:"brown", marginLeft:"-9px" , marginTop:"-10px" , fontWeight:"bold"}}>{value.name}</div>{value.message}</p>
              </div>
            );
          }
          return null;
        })}
      </div>}
      
    </div>
  );
}

export default Forum;
