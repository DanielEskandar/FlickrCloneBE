// INCLUDE DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');

// INCLUDE ROUTES
const userRouter = require('./routers/userRouter.js');

// CREATE EXPRESS APP
const app = express();

// ATTACH PARSERS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ATTACH ROUTES
app.use('/user', userRouter);

// EXPORT APP
module.exports = app;

/*

//DEVOPS
//
const cors = require('cors');
const dotenv = require('dotenv');
const sendEmail = require('./emailSender');
app.use(
  cors()
  //{
  //credentials: true
  //origin:[]
  //}
);
app.options('*', cors());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});
app.get('/forget', async (req, res) => {
  const trialMail = 'moaazzaki1999@gmail.com'; //Edit to test
  try {
    await sendEmail({
      email: trialMail,
      subject: 'Flickr – Reset your password',
      message: {
        html: `<p>To reset the password on your account, simply use the link below and follow the steps.</p>
            <a href="https://www.google.com">Reset your password</a>
            <p>If you did not request a password reset, please disregard this email. Nothing will change to your account.</p>
            <p>The Flickr team.</p>`,
      },
    });
    res.json({ message: 'Sent successfully!!' });
  } catch (error) {
    res.json({ message: error.message });
  }
});

const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.EMAIL_PASSWORD,
    })
  );

  // 2) Define the email options
  const mailOptions = {
    from: `<${process.env.EMAIL_SENDER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message.html,
  }; // TODO: EDIT href in a tag to the link that user will reset the password at

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
*/
