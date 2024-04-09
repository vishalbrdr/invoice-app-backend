"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const customer_controllers_1 = require("../controllers/customer.controllers");
const customer_middleware_1 = require("../middlewares/customer.middleware");
const router = (0, express_1.Router)();
router.route("/:orgId").get(auth_middlewares_1.isAuthenticated, auth_middlewares_1.isAuthorised, customer_controllers_1.allCustomers);
router
    .route("/:orgId")
    .post(auth_middlewares_1.isAuthenticated, auth_middlewares_1.isAuthorised, customer_middleware_1.validateCustomerSchema, customer_controllers_1.addCustomer);
router
    .route("/:orgId/:customerId")
    .put(auth_middlewares_1.isAuthenticated, auth_middlewares_1.isAuthorised, customer_middleware_1.validateCustomerSchema, customer_controllers_1.updateCustomer);
router
    .route("/:orgId/:customerId")
    .delete(auth_middlewares_1.isAuthenticated, auth_middlewares_1.isAuthorised, customer_controllers_1.deleteCustomer);
exports.default = router;
//# sourceMappingURL=customer.routes.js.map