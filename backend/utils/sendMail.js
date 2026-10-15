import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: process.env.SENDGRID_USER, // always "apikey"
    pass: process.env.SENDGRID_PASSWORD, // your SendGrid API key
  },
});
export const sendOtp = async (email, otp) => {
  console.log(email);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP Code is ${otp}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (err) {
    console.log("error sending OTP email : ", err);
    throw new Error("Failed to send OTP Email");
  }
};
