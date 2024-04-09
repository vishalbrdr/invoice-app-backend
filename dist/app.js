"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
app.use((0, cookie_parser_1.default)());
app.get("/", (_, res) => {
    const filePath = path_1.default.join(__dirname, "../README.md");
    fs_1.default.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            res.status(500).send("Internal Server Error");
            return;
        }
        const htmlContent = (0, marked_1.marked)(data);
        res.send(htmlContent);
    });
});
// routes import
const organisation_routes_1 = __importDefault(require("./routes/organisation.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const customer_routes_1 = __importDefault(require("./routes/customer.routes"));
const path_1 = __importDefault(require("path"));
const marked_1 = require("marked");
// routes declaration
app.use("/api/v1/users", user_routes_1.default);
app.use("/api/v1/orgs", organisation_routes_1.default);
app.use("/api/v1/products", product_routes_1.default);
app.use("/api/v1/customers", customer_routes_1.default);
//# sourceMappingURL=app.js.map