import ContactUs from "../models/contactUs.model.js";
import mongoose from "mongoose";
import sendMail from "../utils/sendMail.utills.js";
const createContactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ save to DB
    const contactUs = new ContactUs({
      name,
      email,
      message,
    });

    await contactUs.save();

    // ✅ send email (to YOU or to USER — your choice)

    // OPTION 1 👉 Send to ADMIN (you receive user's message)
    // await sendMail({
    //   email: process.env.SMTP_FROM_MAIL, // your email
    //   subject: "New Contact Us Message",
    //   messageHTML: `
    //     <h2>New Message Received</h2>
    //     <p><b>Name:</b> ${name}</p>
    //     <p><b>Email:</b> ${email}</p>
    //     <p><b>Message:</b> ${message}</p>
    //   `,
    // });

    // OPTION 2 👉 Send confirmation to USER (optional)
    
    // await sendMail({
    //   email: email,
    //   subject: "We received your message",
    //   messageHTML: `
    //     <h2>Thank you ${name}!</h2>
    //     <p>We have received your message and will get back to you soon.</p>
    //   `,
    // });
    

    return res.status(200).json({
      message: "Contact Us form submitted successfully",
      data: req.body,
    });

  } catch (error) {
    console.error("Error in createContactUs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getContactUs = async (req, res) => {
  try {
    const contactUs = await ContactUs.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ message: "Contact Us data fetched successfully", data: contactUs });
  } catch (error) {
    console.error("Error in getContactUs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
const deleteContactUs = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    await ContactUs.findByIdAndDelete(id);
    return res.status(200).json({ message: "Contact Us entry deleted successfully" });
  } catch (error) {
    console.error("Error in deleteContactUs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export { createContactUs, getContactUs, deleteContactUs };
