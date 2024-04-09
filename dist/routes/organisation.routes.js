"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const organisation_middleware_1 = require("../middlewares/organisation.middleware");
const organisation_controllers_1 = require("../controllers/organisation.controllers");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const router = (0, express_1.Router)();
router
    .route("/register")
    .post(auth_middlewares_1.isAuthenticated, organisation_middleware_1.validateOrganisationData, organisation_controllers_1.registerOrganisation);
exports.default = router;
//# sourceMappingURL=organisation.routes.js.map