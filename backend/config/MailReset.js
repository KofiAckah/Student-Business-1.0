import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendOTP = async (email, otp) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}`,
      html: `<h1>Your OTP is ${otp}</h1>`,
    });
    console.log(
      "Message sent: %s",
      info.messageId,
      "Email sent successfully Check your email"
    );
  } catch (error) {
    console.log(error.message);
  }
};

export default sendOTP;
