import { Router } from "express";
import { validateOrganisationData } from "../middlewares/organisation.middleware";
import { registerOrganisation } from "../controllers/organisation.controllers";
import { verifyJWT } from "../middlewares/auth.middlewares";

const router = Router();

router
  .route("/register")
  .post(verifyJWT, validateOrganisationData, registerOrganisation);

export default router;
