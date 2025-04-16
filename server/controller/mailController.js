const sendEmail = require('../config/emailConfig');
const asyncHandler = require('express-async-handler');

const EmailController = asyncHandler(async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  try {
    await sendEmail({
      to,
      subject,
      message
    });

    res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    res.status(500);
    throw new Error('Email could not be sent');
  }
});

module.exports = {EmailController};