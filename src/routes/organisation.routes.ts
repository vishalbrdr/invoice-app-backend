import { Router } from "express";
import { validateOrganisationData } from "../middlewares/organisation.middleware";
import { registerOrganisation } from "../controllers/organisation.controllers";

const router = Router();

router.route("/register").post(validateOrganisationData, registerOrganisation);

export default router;
