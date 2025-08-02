import { Router } from "express";
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleGetAllDeleteProducts,
  handleGetAllProducts,
  handleGetProductById,
  handleUpdateProduct,
} from "./product.controller.js";

const route = Router();

route.post("/create-products", handleCreateProduct);

route.patch("/:id", handleUpdateProduct);

route.get("/get-product/:productNumber", handleGetProductById);

route.get("/get-all-product", handleGetAllProducts);

route.get("/get-all-delete-product", handleGetAllDeleteProducts);

route.delete("/:id", handleDeleteProduct);

export const ProductRoutes = route;
