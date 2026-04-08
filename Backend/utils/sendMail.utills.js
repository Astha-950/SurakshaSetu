import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const sendMail = async function ({email, subject, messageHTML}) {
  try {
    // Create the transporter

    console.log(process.env.GMAIL_HOST_NAME);
    console.log(process.env.GMAIL_PORT); 
    console.log(process.env.GMAIL_USERNAME);
    console.log(process.env.GMAIL_APP_PASSWORD);
   const auth = nodemailer.createTransport({
  host: process.env.GMAIL_HOST_NAME,    
  port: Number(process.env.GMAIL_PORT) || 587,
  secure: false,  
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

    // Email details
    const receiver = {
      from: process.env.SMTP_FROM_MAIL,
      to: email,
      subject: subject,
      html: messageHTML,  
    };
    // Send the email
    const emailResponse = await auth.sendMail(receiver);
    console.log("Email sent successfully:", emailResponse.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

export default sendMail;
