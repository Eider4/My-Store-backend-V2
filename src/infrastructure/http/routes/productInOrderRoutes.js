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
router.put("/productInOrder/:id", updateProductInOrderController);
router.delete("/productInOrder/:id", deleteProductInOrderController);

export default router;
