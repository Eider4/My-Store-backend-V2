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
import countPetitions from "./src/infrastructure/middlewares/count.js";
import paymentIntentsRoutes from "./src/infrastructure/http/routes/paymentIntentsRoutes.js";
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
app.use("/user", countPetitions, userRoutes);
app.use("/product", countPetitions, productRoutes);
app.use("/cart", countPetitions, cartRoutes);
app.use("/order", countPetitions, orderRoutes);
app.use("/productInCart", countPetitions, productInCartRoutes);
app.use("/productInOrder", countPetitions, productInOrderRoutes);
app.use("/sale", countPetitions, saleRoutes);
app.use("/upload", countPetitions, uploadRoutes);

app.use("/auth", countPetitions, authRoutes);

app.use("/payment-intents", countPetitions, paymentIntentsRoutes);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on port " + PORT);
});
