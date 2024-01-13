import nodemailer from "nodemailer";
import AWS from "aws-sdk";
import keys from "../config/keys.js";
import Verification from "../models/verification.model.js";

AWS.config.update({
  accessKeyId: keys.AMAZON_SES_ACCESS_KEY,
  secretAccessKey: keys.AMAZON_SES_SECRET_ACCESS_KEY,
  region: keys.AMAZON_SES_REGION,
});

// create Nodemailer SES transport
const transporter = nodemailer.createTransport({
  SES: new AWS.SES({ apiVersion: "2010-12-01" }),
});

// function to generate random six characters
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

export async function sendVerificationCode(userEmail) {
  const code = generateCode();
  const verificationCode = new Verification({
    code,
    email: userEmail,
  });
  try {
    await verificationCode.save();
  } catch (error) {
    console.log(
      "Error saving verification code to the database:",
      error.message
    );
  }

  // set email options
  const mailOptions = {
    from: "arigbedeomobolaji@gmail.com",
    to: userEmail,
    subject: "Email verification link",
    text: "Email body in text format",
    html: `<h1>Welcome to render.ng</h1><h3>For us to be sure you're really a man. We have sent you an OTP Which you will provide so that we can verify your email</h3><h1>${code}</h1>`,
  };

  // send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error sending email", error.message);
    }
    console.log("Email sent:", info.messageId);
  });
}
