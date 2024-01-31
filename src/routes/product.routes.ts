import { Router } from "express";
import { isAuthenticated, isAuthorised } from "../middlewares/auth.middlewares";
import {
  addProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/products.controllers";
import { validateProductData } from "../middlewares/product.middleware";

const router = Router();

router.route("/:orgId").get(isAuthenticated, getAllProducts);
router
  .route("/:orgId")
  .post(isAuthenticated, isAuthorised, validateProductData, addProduct);
router
  .route("/:orgId/:productId/update")
  .put(isAuthenticated, isAuthorised, validateProductData, updateProduct);

export default router;
