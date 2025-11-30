import { contactMessageConfirmation } from "../../uitils/contactEmailTamplates.js";
import { sendEmail } from "../../uitils/sendEmail.js";
import { createContactMessage, getAllMessages } from "./message.service.js";

// export const sendContactMessage = async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     const savedMessage = await createContactMessage({
//       name,
//       email,
//       message,
//     });

//     res.status(201).json({
//       success: true,
//       data: savedMessage,
//       message: "Message sent successfully.",
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to send message." });
//   }
// };

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Save message to database
    const savedMessage = await createContactMessage({
      name,
      email,
      message,
    });

    // Generate confirmation email
    const { subject, html, text } = contactMessageConfirmation({
      name,
      email,
      message,
    });

    // Send confirmation email (fire and forget to avoid timeout)
    const emailPromise = sendEmail({ to: email, subject, html, text });
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email timeout")), 8000)
    );

    try {
      await Promise.race([emailPromise, timeoutPromise]);
      console.log(`✅ Confirmation email sent to ${email}`);
    } catch (emailError) {
      console.error(`⚠️ Email issue:`, emailError.message);
      // Continue anyway - message is saved
    }
    // Respond immediately
    res.status(201).json({
      success: true,
      data: savedMessage,
      message: "Message sent successfully. Check your email for confirmation!",
    });
  } catch (error) {
    console.error("Contact message error:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
};
export const getMessages = async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages." });
  }
};
