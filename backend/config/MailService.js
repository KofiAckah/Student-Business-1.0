import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendMail = async (email, link) => {
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
      subject: "Account Verification Link",
      text: `Welcome`,
      html: `<h1>Welcome</h1><p>Click <a href=${link}>here</a> to verify your account</p>`,
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
// Compare this snippet from backend/routes/Sub-Routes/ForgotPassword.js:
export default sendMail;
