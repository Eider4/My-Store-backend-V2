import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./src/infrastructure/http/routes/userRoutes.js";
import productRoutes from "./src/infrastructure/http/routes/productRoutes.js";
import cartRoutes from "./src/infrastructure/http/routes/cartRoutes.js";
import orderRoutes from "./src/infrastructure/http/routes/orderRoutes.js";
import productInCartRoutes from "./src/infrastructure/http/routes/productInCartRoutes.js";
import productInOrderRoutes from "./src/infrastructure/http/routes/productInOrderRoutes.js";
import saleRoutes from "./src/infrastructure/http/routes/saleRoutes.js";
import uploadRoutes from "./src/infrastructure/http/routes/uploadRoutes.js";
import cors from "cors";
import authRoutes from "./src/infrastructure/http/routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { syncModels } from "./src/infrastructure/db/config/config.js";

const PORT = process.env.PORT || 5000;

const app = express();
syncModels();
// Middlewares
app.use(
  cors({
    origin: "http://localhost:5001",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/productInCart", productInCartRoutes);
app.use("/productInOrder", productInOrderRoutes);
app.use("/sale", saleRoutes);
app.use("/upload", uploadRoutes);

app.use("/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log("Server started on port http://localhost:" + PORT);
});
