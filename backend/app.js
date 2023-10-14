const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "lms",
});

function sendEmail(email , userId) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIl_ID,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  console.log(email);

  const mailOptions = {
    from: process.env.GMAIl_ID,
    to: email,
    subject: 'Password Reset Link',
    text: `Use the following link to reset your password: http://localhost:3000/reset-password/${userId}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
}




app.get("/users", (req, res) => {
  const q = "SELECT * FROM Users";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
app.get("/allcarts", (req, res) => {
  const q = "SELECT * FROM carts";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/course/:id", (req, res) => {
  const courseId = req.params.id;
  const q = " Select * FROM courses WHERE course_id = ? ";

  db.query(q, [courseId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.get("/assessment/:id", (req, res) => {
  const courseId = req.params.id;
  const q = " Select no , question , option1 , option2 , option3 , option4 , answer FROM assessment WHERE course_id = ? ";
  db.query(q, [courseId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/courses/:id", (req, res) => {
  const userId = req.params.id;
  const q = " Select * FROM courses WHERE course_id in (select course_id from carts where user_id = ?)  ";

  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


app.get("/userdetails", (req, res) => {
  const userId = req.query.userId; 
  const q = "SELECT * FROM Users WHERE id = ? ";
  db.query(q, [userId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/courses", (req, res) => {
  const q = "SELECT * FROM courses order by course_name";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});


app.post("/mailprocess", (req, res) => {
  const { email , userId} = req.body;
  console.log(userId);
  sendEmail(email , userId)
    .then((response) => {
      res.status(200).send(response.message);
      console.log('Email sent successfully');
    })
    .catch((error) => {
      res.status(500).send(error.message);
      console.error('Error occurred:', error.message);
    });
});


app.post("/update-password" , (req , res)=>{
  const {password , id} = req.body;
  console.log(password +" "+id);
  const q = "UPDATE users set password = ? where id = ?";
  db.query(q , [password , id] , (err, data)=>{
    if(err){
      console.log(err);
    }
    return res.json("ok");
  })
});



app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "An error occurred" });
      return;
    }
    if (results.length === 0) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }
    const user = results[0];
    const passwordMatch =password===user.password;
    if (!passwordMatch) {
      res.status(400).json({ error: "Wrong password" });
      return;
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, "your_secret_key", {
      expiresIn: "1h",
    });

    res.json({ token });
  });
});

// Import necessary modules and configure your database connection.

// Update a course by its ID.
app.put("/updateCourse/:courseId", (req, res) => {
  const courseId = req.params.courseId;
  const {
    course_name,
    instructor,
    price,
    discription,
    y_link,
    p_link,
  } = req.body;

  const query = `
    UPDATE Courses
    SET course_name=?, instructor=?, price=?, discription=?, y_link=?, p_link=?
    WHERE course_id=?
  `;
  db.query(
    query,
    [course_name, instructor, price, discription, y_link, p_link, courseId],
    (err, result) => {
      if (err) {
        console.error("Error updating course:", err);
        return res.status(500).json({ message: "Course update failed" });
      }

      if (result.affectedRows === 1) {
        return res.status(200).json({ message: "Course updated successfully" });
      } else {
        return res.status(404).json({ message: "Course not found" });
      }
    }
  );
});



app.delete("/delete", (req, res) => {
  const { courseId } = req.body;
  console.log("Delete course with ID: " + courseId);

  const deleteDiscussionQuery = "DELETE FROM discussion WHERE course_id=?";
  db.query(deleteDiscussionQuery,[courseId],(err,data)=>{
    if (err) {
      console.error("Error deleting from assessment:", err);
      return res.status(500).json({ error: "Error deleting from assessment" });
    }
  
  // Delete from 'assessment' table
  const deleteAssessmentQuery = "DELETE FROM assessment WHERE course_id = ?";
  db.query(deleteAssessmentQuery, [courseId], (err, data) => {
    if (err) {
      console.error("Error deleting from assessment:", err);
      return res.status(500).json({ error: "Error deleting from assessment" });
    }

    // Delete from 'progress' table
    const deleteProgressQuery = "DELETE FROM progress WHERE course_id = ?";
    db.query(deleteProgressQuery, [courseId], (err1, data1) => {
      if (err1) {
        console.error("Error deleting from progress:", err1);
        return res.status(500).json({ error: "Error deleting from progress" });
      }

      // Delete from 'carts' table
      const deleteCartsQuery = "DELETE FROM carts WHERE course_id = ?";
      db.query(deleteCartsQuery, [courseId], (err2, data2) => {
        if (err2) {
          console.error("Error deleting from carts:", err2);
          return res.status(500).json({ error: "Error deleting from carts" });
        }

        // Finally, delete from 'courses' table
        const deleteCoursesQuery = "DELETE FROM courses WHERE course_id = ?";
        db.query(deleteCoursesQuery, [courseId], (err3, data3) => {
          if (err3) {
            console.error("Error deleting from courses:", err3);
            return res.status(500).json({ error: "Error deleting from courses" });
          }

          console.log("Deleted course with ID: " + courseId);
          return res.json("Successfully deleted..!");
        });
        });
      });
    });
  });
});

app.get('/progress', (req, res) => {
  const { userId, courseId } = req.query; 
  const q = "select * from progress where user_id = ? and course_id = ?";
  db.query(q , [userId , courseId] , (err , data)=>{
    if(!err){
      return res.json(data);
    }
  })
});

app.put("/update-progress", (req, res) => {
  const { playedTime, duration, userId, courseId } = req.body;
  const q = "UPDATE progress SET playedTime = ? , duration = ? WHERE user_id = ? AND course_id = ? and playedTime < ?";
  db.query(q, [playedTime, duration, userId, courseId , playedTime], (err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(409);
    } else {
      return res.send('success');
    }
  });
});


app.post("/enroll", (req, res) => {
  const { userId, courseId } = req.body;
  const check = "SELECT * FROM carts WHERE user_id = ? AND course_id = ?";
  
  db.query(check, [userId, courseId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length >= 1) {
      return res.status(400).json({ error: "Already Enrolled" });
    }
    const query = "INSERT INTO carts (user_id, course_id) VALUES (?, ?)";
    db.query(query, [userId, courseId], (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Error occurred" });
      }
      if (data.affectedRows === 1) {
        const qr =  "insert into progress(course_id, user_id) values (?,?)";
        db.query(qr , [courseId , userId] , (err , data)=>{});
        return res.status(200).json({ message: "Added successfully" });
      } else {
        return res.status(500).json({ message: "Course add failed" });
      }
    });
  });
});


app.post("/addMessage" , (req , res)=>{
  const {
    name , 
    course_id,
    message,
  } =req.body;
  console.log(course_id);
  const q = "insert into discussion(course_id , name, message) values (?,?,?)";
  db.query(q,[course_id,name,message] , (err , data)=>{
    if(err){
      return res.json("error occured")
    }
    return res.json("message added successfully..");
  })
})


app.get("/getMessages/:courseId" , (req , res)=>{
  const courseId =req.params.courseId;
  const q = "select * from discussion where course_id = "+courseId;
  db.query(q , (err,  data)=>{
    if(err){
      return res.json("error occured")
    }
    return res.json(data);
  })
})



app.post("/addCourse" , (req , res)=>{
  const {
    name , 
    instructor,
    price,
    discription,
    y_link,
    p_link,
  } =req.body;
  const query = "insert into Courses (course_name , instructor ,price ,discription , y_link , p_link) values(?,?,?,?,?,?)";
  db.query(query , [name , instructor , price , discription , y_link , p_link] , (data , err)=>{
    if(err){
      return res.json("error occured");
    }
    if (data.affectedRows === "1") {
      return res.status(200).json({ message: "Added successfully" });
    } else {
      return res.status(500).json({ message: "course add failed" });
    }
  })
})

app.post("/add", (req, res) => {
  const {
    name,
    about,
    email,
    phno,
    institution,
    role,
    domain,
    password
  } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "An error occurred" });
    }

    if (results.length >= 1) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const insertQuery =
      "INSERT INTO Users (name, about, email, phno, institution, role, domain, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      insertQuery,
      [name, about, email, phno, institution, role, domain, password],
      (err, result) => {
        if (err) {
          console.error("Error inserting user data:", err);
          return res.status(500).json({ error: "An error occurred" });
        }

        if (result.affectedRows === 1) {
          return res.status(200).json({ message: "Registration successful" });
        } else {
          return res.status(500).json({ message: "Registration failed" });
        }
      }
    );
  });
});


app.get("/details", (req, res) => {
  const { email } = req.query;
  const q = "SELECT id, name FROM Users WHERE email = ?";
  db.query(q, [email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});



app.listen(8800, () => {
  console.log("Server started...");
});