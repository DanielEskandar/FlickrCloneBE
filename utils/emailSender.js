const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.EMAIL_PASSWORD,
    })
  );

  // Define the email options
  const mailOptions = {
    from: `<${process.env.EMAIL_SENDER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  // Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
