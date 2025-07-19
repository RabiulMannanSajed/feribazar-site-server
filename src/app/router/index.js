import { Router } from "express";
import { UserRoutes } from "../modules/users/user.route.js";
import { AuthRouter } from "../modules/auth/auth.router.js";
import { ProductRoutes } from "../modules/product/product.route.js";
import { ProductDetailsRoutes } from "../modules/productDetails/productDetails.route.js";
import { ClientOrderRoutes } from "../modules/clientOrder/clientOrder.route.js";

const router = Router();

const moduleRouters = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/productsDetails",
    route: ProductDetailsRoutes,
  },
  {
    path: "/clientOrder",
    route: ClientOrderRoutes,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
