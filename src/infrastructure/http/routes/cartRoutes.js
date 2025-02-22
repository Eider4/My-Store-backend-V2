import express from "express";
import {
  getCartByIdController,
  addCartController,
  updateCartController,
  deleteCartController,
} from "../controllers/cartControllers.js";

const router = express.Router();

router.get("/cart/:id", getCartByIdController);
router.post("/cart", addCartController);
router.put("/cart/:id", updateCartController);
router.delete("/cart/:id", deleteCartController);

export default router;
