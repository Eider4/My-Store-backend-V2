import express from "express";
import {
  getOrdersController,
  getOrderByIdController,
  getOrdersFilteredController,
  getOrdersFilteredByStatusController,
  addOrderController,
} from "../controllers/orderControllers.js";

const router = express.Router();

router.get("/orders", getOrdersController);
router.get("/order/:id", getOrderByIdController);
router.get("/orders/filtered/:filter", getOrdersFilteredController);
router.get(
  "/orders/filteredByStatus/:filter",
  getOrdersFilteredByStatusController
);
router.post("/order", addOrderController);

export default router;
