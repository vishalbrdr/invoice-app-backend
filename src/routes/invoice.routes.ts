import Router from "express";
import { isAuthenticated, isAuthorised } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/").post(isAuthenticated, isAuthorised)

export default router;
