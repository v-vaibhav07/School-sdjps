const nodemailer = require('nodemailer');

// Gmail ke liye (Development ke liye easy hai)
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,      // aapka@gmail.com
      pass: process.env.EMAIL_PASS       // App Password (normal password nahi)
    }
  });
};

// YA Resend use karo (Production ke liye best - free tier me 100 emails/day)
const createResendTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 465,
    secure: true,
    auth: {
      user: 'resend',
      pass: process.env.RESEND_API_KEY
    }
  });
};

module.exports = { createTransporter, createResendTransporter };