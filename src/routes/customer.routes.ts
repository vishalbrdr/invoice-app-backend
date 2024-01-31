import { Router } from "express";
import { isAuthenticated, isAuthorised } from "../middlewares/auth.middlewares";
import {
  allCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controllers";
import { validateCustomerSchema } from "../middlewares/customer.middleware";

const router = Router();

router.route("/:orgId").get(isAuthenticated, isAuthorised, allCustomers);

router
  .route("/:orgId")
  .post(isAuthenticated, isAuthorised, validateCustomerSchema, addCustomer);

router
  .route("/:orgId/:customerId")
  .put(isAuthenticated, isAuthorised, validateCustomerSchema, updateCustomer);

router
  .route("/:orgId/:customerId")
  .delete(isAuthenticated, isAuthorised, deleteCustomer);

export default router;
