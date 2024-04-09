"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const invoice_controllers_1 = require("../controllers/invoice.controllers");
const router = (0, express_1.default)();
router.route("/").post(auth_middlewares_1.isAuthenticated, auth_middlewares_1.isAuthorised, invoice_controllers_1.getInvoice);
router.route("/invoiceId").get(auth_middlewares_1.isAuthenticated, auth_middlewares_1.isAuthorised, invoice_controllers_1.getInvoice);
router.route("/invoiceId").put(auth_middlewares_1.isAuthenticated, auth_middlewares_1.isAuthorised, invoice_controllers_1.updateInvoice);
router
    .route("/invoiceId")
    .delete(auth_middlewares_1.isAuthenticated, auth_middlewares_1.isAuthenticated, invoice_controllers_1.deleteInvoice);
exports.default = router;
//# sourceMappingURL=invoice.routes.js.map