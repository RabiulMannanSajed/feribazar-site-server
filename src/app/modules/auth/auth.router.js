import { Router } from "express";
import { createLoginUser } from "./auth.controller.js";

const route = Router();

route.post("/login", createLoginUser);

export const AuthRouter = route;
