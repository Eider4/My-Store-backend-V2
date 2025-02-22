import express from "express";
import {
  getSalesController,
  getSaleByIdController,
  getSalesFilteredController,
  addSaleController,
} from "../controllers/saleControllers.js";

const router = express.Router();

router.get("/sales", getSalesController);
router.get("/sale/:id", getSaleByIdController);
router.get("/sales/filtered/:filter", getSalesFilteredController);
router.post("/sale", addSaleController);

export default router;
