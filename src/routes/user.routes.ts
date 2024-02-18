import { Router } from "express";
import { validateUserSchema } from "../middlewares/user.middleware";
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
} from "../controllers/user.controllers";
import { isAuthenticated } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/").get(isAuthenticated, getCurrentUser);

router.route("/register").post(validateUserSchema, registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticated, logoutUser);

router.route("/update-user").patch(isAuthenticated, updateAccountDetails);
router.route("/change-password").patch(isAuthenticated, changeCurrentPassword);

router.route("/refesh-auth-token").get(refreshAccessToken);

export default router;
