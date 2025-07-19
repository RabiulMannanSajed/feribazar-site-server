import { Router } from "express";
import {
  handleCreateClientOrder,
  handleGetAllClientOrders,
} from "./clientOrder.controller.js";

const route = Router();

route.get("/get-all-client-orders", handleGetAllClientOrders);

route.post("/create-clientOrder", handleCreateClientOrder);

export const ClientOrderRoutes = route;
