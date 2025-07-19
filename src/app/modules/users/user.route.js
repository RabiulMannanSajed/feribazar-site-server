import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  updateUser,
} from "./user.controll.js";

const route = Router();

route.post("/create-user", createUser);

// this part only see the admin and the manager
route.get("/get-all-users", getAllUser);

route.patch("/:userId", updateUser);

//use the auth here admin or manager can delete user
route.patch("/deleteUser/:userId", deleteUser);

export const UserRoutes = route;
