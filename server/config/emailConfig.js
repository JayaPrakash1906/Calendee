const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Mail options
  const mailOptions = {
    from: process.env.EMAIL_FROM,    
    to: options.to,
    cc: options.cc, 
    subject: options.subject,
    text: options.message
    // html: options.html (for HTML emails)
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;