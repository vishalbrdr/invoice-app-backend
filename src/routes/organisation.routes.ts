import { Router } from "express";
import { validateOrganisationData } from "../middlewares/organisation.middleware";
import { registerOrganisation } from "../controllers/organisation.controllers";
import { isAuthenticated } from "../middlewares/auth.middlewares";

const router = Router();

router
  .route("/register")
  .post(isAuthenticated, validateOrganisationData, registerOrganisation);

export default router;
