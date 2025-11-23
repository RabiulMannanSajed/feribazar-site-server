import { Router } from "express";
import { createLoginUser, registerByEmail } from "./auth.controller.js";

const route = Router();

route.post("/login", createLoginUser);

route.post("/register", registerByEmail);

export const AuthRouter = route;
