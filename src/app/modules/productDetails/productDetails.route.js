import { Router } from "express";
import {
  handleCreateProductDetails,
  handleGetAllProductDetails,
  handleUpdateProductDetails,
} from "./productDetails.controller.js";

const route = Router();

route.post("/create-product-details", handleCreateProductDetails);

route.patch("/:productRefId", handleUpdateProductDetails);

route.get("/get-product-details", handleGetAllProductDetails);

export const ProductDetailsRoutes = route;
