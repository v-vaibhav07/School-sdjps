// const { Resend } = require('resend');

// const resend = new Resend(process.env.RESEND_API_KEY);

// const sendPasswordReset = async (to, resetLink, userName) => {
//   try {
//     const data = await resend.emails.send({
//       from: 'SDJPS <noreply@yourdomain.com>', // Verified domain chahiye
//       to: to,
//       subject: 'Reset Your Password',
//       html: `
//         <h1>Password Reset</h1>
//         <p>Hello ${userName},</p>
//         <p>Click here to reset: <a href="${resetLink}">${resetLink}</a></p>
//       `
//     });
    
//     console.log('Email sent:', data);
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// module.exports = { sendPasswordReset };








// require("dns").setDefaultResultOrder("ipv4first")

// const nodemailer = require("nodemailer")

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// })

// const sendEmail = async (to, subject, html) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"SDJPS School" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html
//     })

//     console.log("✅ Email sent:", info.messageId)
//     return info
//   } catch (error) {
//     console.error("❌ Email error:", error.message)
//     throw error
//   }
// }

// module.exports = sendEmail