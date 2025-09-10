import { Router } from "express";
import {
  handleCreateClientOrder,
  handleGetAllClientOrders,
  updateOrderDelivered,
} from "./clientOrder.controller.js";

const route = Router();

route.get("/get-all-client-orders", handleGetAllClientOrders);

route.post("/create-clientOrder", handleCreateClientOrder);

route.put("/:orderId/delivered", updateOrderDelivered);

export const ClientOrderRoutes = route;
