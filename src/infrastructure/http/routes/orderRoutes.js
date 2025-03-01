import express from "express";
import {
  addOrderController,
  getOrderByIdController,
  getOrdersByIdUserController,
  getProductsInOrderController,
} from "../controllers/orderControllers.js";

const router = express.Router();

router.post("/", addOrderController);
router.get("/:user_id", getOrdersByIdUserController);

router.get("/by_id/:id", getOrderByIdController);

router.get("/productInOrder/:id_order", getProductsInOrderController);

export default router;
