import { createContactMessage, getAllMessages } from "./message.service.js";

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const savedMessage = await createContactMessage({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      data: savedMessage,
      message: "Message sent successfully.",
    });
  } catch (error) {
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
