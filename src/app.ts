import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../README.md");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }

    const htmlContent = marked(data);
    res.send(htmlContent);
  });
});

// routes import
import orgRouter from "./routes/organisation.routes";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import customerRoutes from "./routes/customer.routes";
import path from "path";
import { marked } from "marked";
// routes declaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orgs", orgRouter);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/customers", customerRoutes);

export { app };
