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

route.get("/get-product/:id", handleGetProductById);

route.get("/get-all-product", handleGetAllProducts);

route.get("/get-all-delete-product", handleGetAllDeleteProducts);

route.delete("/:id", handleDeleteProduct);

//use the auth here admin or manager can delete user

export const ProductRoutes = route;
