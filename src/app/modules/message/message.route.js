import { Router } from "express";

const route = Router();

route.post("/create-message", sendContactMessage);
route.get("/get-all-message", getMessages);

export const MessageRoutes = route;
