"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const products_controllers_1 = require("../controllers/products.controllers");
const product_middleware_1 = require("../middlewares/product.middleware");
const router = (0, express_1.Router)();
router.route("/:orgId").get(auth_middlewares_1.isAuthenticated, auth_middlewares_1.isAuthorised, products_controllers_1.getAllProducts);
router
    .route("/:orgId")
    .post(auth_middlewares_1.isAuthenticated, auth_middlewares_1.isAuthorised, product_middleware_1.validateProductData, products_controllers_1.addProduct);
router
    .route("/:orgId/:productId/update")
    .put(auth_middlewares_1.isAuthenticated, auth_middlewares_1.isAuthorised, product_middleware_1.validateProductData, products_controllers_1.updateProduct);
exports.default = router;
//# sourceMappingURL=product.routes.js.map