import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { generateOTPEmailTemplate } from './email-templete';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "nitinmalviya172@gmail.com",
    pass: "nmcg rfyn hvto yhia",
  },
});

const sendEmail = async (email:string, subject:string, html:string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html,
    });
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
    throw new Error('Failed to send email');
  }
};

const sendOtp = async (email:string, otp:string) => {
  const subject = 'AI Trip Planner - OTP Verification';
  const htmlContent = generateOTPEmailTemplate(otp);
  console.log(`Email sent to ${email} with OTP: ${otp}`);
  await sendEmail(email, subject, htmlContent);
};

export { sendEmail, sendOtp };
