"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = require("../middlewares/user.middleware");
const user_controllers_1 = require("../controllers/user.controllers");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const router = (0, express_1.Router)();
router.route("/me").get(auth_middlewares_1.isAuthenticated, user_controllers_1.getCurrentUser);
router.route("/register").post(user_middleware_1.validateUserSchema, user_controllers_1.registerUser);
router.route("/login").post(user_controllers_1.loginUser);
router.route("/logout").get(auth_middlewares_1.isAuthenticated, user_controllers_1.logoutUser);
router.route("/update-user").patch(auth_middlewares_1.isAuthenticated, user_controllers_1.updateAccountDetails);
router.route("/change-password").patch(auth_middlewares_1.isAuthenticated, user_controllers_1.changeCurrentPassword);
router.route("/refesh-auth-token").get(user_controllers_1.refreshAccessToken);
exports.default = router;
//# sourceMappingURL=user.routes.js.map