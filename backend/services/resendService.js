const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendPasswordReset = async (to, resetLink, userName) => {
  try {
    const data = await resend.emails.send({
      from: 'SDJPS <noreply@yourdomain.com>', // Verified domain chahiye
      to: to,
      subject: 'Reset Your Password',
      html: `
        <h1>Password Reset</h1>
        <p>Hello ${userName},</p>
        <p>Click here to reset: <a href="${resetLink}">${resetLink}</a></p>
      `
    });
    
    console.log('Email sent:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

module.exports = { sendPasswordReset };