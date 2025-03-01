import express from "express";
import {
  getProductsController,
  getProductByIdController,
  getProductsFilteredController,
  addProductController,
  updateProductController,
} from "../controllers/productControllers.js";

const router = express.Router();

router.get("/", getProductsController);
router.get("/:id", getProductByIdController);
router.get("/filtered/:filter", getProductsFilteredController);
router.post("/add-product", addProductController);
router.put("/update/:id", updateProductController);

export default router;
