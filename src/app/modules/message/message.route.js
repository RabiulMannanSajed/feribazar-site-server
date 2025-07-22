import { Router } from "express";
import { getMessages, sendContactMessage } from "./message.controller.js";

const route = Router();

route.post("/create-message", sendContactMessage);
route.get("/get-all-message", getMessages);

export const MessageRoutes = route;
