import express from "express";
import {
  getProductInOrderByIdController,
  addProductInOrderController,
  updateProductInOrderController,
  deleteProductInOrderController,
} from "../controllers/productInOrderControllers.js";

const router = express.Router();

router.get("/productInOrder/:id", getProductInOrderByIdController);
router.post("/productInOrder", addProductInOrderController);
router.post("/update", updateProductInOrderController);
router.delete("/productInOrder/:id", deleteProductInOrderController);

export default router;
