import express from "express";
import {
  addOrderController,
} from "../controllers/orderControllers.js";

const router = express.Router();


router.post("/", addOrderController);

export default router;
