import express from "express";
const router = express.Router();
import {
  createPaymentIntent,
  getPaymentIntent,
  updatePaymentIntent,
} from "../controllers/paymentIntentsController.js";

router.post("/", createPaymentIntent);

router.post("/:paymentIntentId", updatePaymentIntent);

router.post("/inf-checkout/:paymentIntentId", getPaymentIntent);
export default router;
