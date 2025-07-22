import { ContactMessage } from "./message.model.js";

export const createContactMessage = async (data) => {
  return await ContactMessage.create(data);
};

export const getAllMessages = async () => {
  return await ContactMessage.find().sort({ createdAt: -1 });
};
