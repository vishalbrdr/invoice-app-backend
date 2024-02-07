import Router from "express";
import { isAuthenticated, isAuthorised } from "../middlewares/auth.middlewares";
import {
  deleteInvoice,
  getInvoice,
  updateInvoice,
} from "../controllers/invoice.controllers";

const router = Router();

router.route("/").post(isAuthenticated, isAuthorised, getInvoice);

router.route("/invoiceId").get(isAuthenticated, isAuthorised, getInvoice);

router.route("/invoiceId").put(isAuthenticated, isAuthorised, updateInvoice);

router
  .route("/invoiceId")
  .delete(isAuthenticated, isAuthenticated, deleteInvoice);

export default router;
