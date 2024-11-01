const transporter = require('../config/emailConfig');
const { verifyAccountMail, welcomeMail, projectCreationMail } = require('../resources/emailTemplates');

const sendWelcomeEmail = (receiver, name, role) => {
  transporter.sendMail(welcomeMail(receiver, name, role), (error, info) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const sendVerifyEmail = (receiver, OTP) => {
  transporter.sendMail(verifyAccountMail(receiver, OTP), (error, info) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const sendProjectCreationEmail = (receiver, projectTitle) => {
  transporter.sendMail(verifyAccountMail(receiver, projectTitle), (error, info) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendWelcomeEmail, sendVerifyEmail, sendProjectCreationEmail };
