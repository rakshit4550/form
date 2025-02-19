const nodemailer = require("nodemailer");

const sendMail = async (otp, email) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail", // Use lowercase 'gmail'
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password OTP",
      html: `<div>Your OTP is: <b>${otp}</b></div>`,
    };

    const info = await transport.sendMail(mailOptions); // Await here
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

module.exports = sendMail;
