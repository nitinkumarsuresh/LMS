const nodemailer = require('nodemailer');

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Using Gmail as the email service
  auth: {
    user: 'str0m141v@gmail.com', // Replace with your Gmail email address
    pass: 'pwzngyfarsuoghxo', // Replace with your Gmail password or App Password
  },
});

// Email content
const mailOptions = {
  from: 'str0m141v@gmail.com',
  to: 'nitinkumarsujatha04@gmail.com', // Replace with the recipient's email address
  subject: 'Hello, Node.js Email!',
  text: 'This is a test email sent from Node.js using nodemailer.',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email: ', error);
  } else {
    console.log('Email sent: ', info.response);
  }
});
