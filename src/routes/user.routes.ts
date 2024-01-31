import { Router } from "express";
import { validateUserSchema } from "../middlewares/user.middleware";
import { loginUser, registerUser } from "../controllers/user.controllers";

const router = Router();

router.route("/register").post(validateUserSchema, registerUser);
router.route("/login").post(loginUser);

export default router;
