// const nodemailer = require('nodemailer');

// class EmailService {
//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });
//   }

//   async sendPasswordResetEmail(to, resetLink, userName) {
//     const mailOptions = {
//       from: `"SDJPS Support" <${process.env.EMAIL_USER}>`,
//       to: to,
//       subject: 'Password Reset Request',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #333;">Hello ${userName || 'User'},</h2>
//           <p>You requested a password reset for your account.</p>
//           <p>Click the button below to reset your password:</p>
          
//           <a href="${resetLink}" 
//              style="display: inline-block; background: #4F46E5; color: white; 
//                     padding: 12px 24px; text-decoration: none; border-radius: 5px; 
//                     margin: 20px 0;">
//             Reset Password
//           </a>
          
//           <p>Or copy this link:</p>
//           <p style="background: #f5f5f5; padding: 10px; word-break: break-all;">
//             ${resetLink}
//           </p>
          
//           <p style="color: #666; font-size: 12px;">
//             This link will expire in 15 minutes.<br>
//             If you didn't request this, please ignore this email.
//           </p>
//         </div>
//       `
//     };

//     try {
//       const info = await this.transporter.sendMail(mailOptions);
//       console.log('Email sent:', info.messageId);
//       return { success: true, messageId: info.messageId };
//     } catch (error) {
//       console.error('Email send error:', error);
//       throw error;
//     }
//   }

//   // Admin ko notification jab naya user bane
//   async sendWelcomeEmail(to, name, role, tempPassword) {
//     const mailOptions = {
//       from: `"SDJPS School" <${process.env.EMAIL_USER}>`,
//       to: to,
//       subject: 'Welcome - Your Account Details',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px;">
//           <h2>Welcome to SDJPS, ${name}!</h2>
//           <p>Your ${role} account has been created.</p>
          
//           <div style="background: #f5f5f5; padding: 15px; margin: 20px 0;">
//             <p><strong>Email:</strong> ${to}</p>
//             <p><strong>Temporary Password:</strong> ${tempPassword}</p>
//           </div>
          
//           <p>Please login and change your password immediately.</p>
//           <a href="http://localhost:5173/login" 
//              style="background: #4F46E5; color: white; padding: 10px 20px; 
//                     text-decoration: none; border-radius: 5px;">
//             Login Here
//           </a>
//         </div>
//       `
//     };

//     return await this.transporter.sendMail(mailOptions);
//   }
// }

// module.exports = new EmailService();









// const nodemailer = require("nodemailer");
// require("dns").setDefaultResultOrder("ipv4first")

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// })
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// module.exports = transporter;


// Simple function — direct call ho sake
// const sendEmail = async (to, subject, html) => {
//   const info = await transporter.sendMail({
//     from: `"SDJPS School" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html
//   })

//   console.log("✅ Email sent to:", to)
//   console.log("✅ Message ID:", info.messageId)
//   return info
// }


const sendEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: `SDJPS School <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent, 
    });
    console.log(` Email sent to ${to}: ${info.messageId}`);
  } catch (error) {
    console.error(` Failed to send email to ${to}:`, error.message);
  }
};

// module.exports = { sendEmail };

module.exports = sendEmail