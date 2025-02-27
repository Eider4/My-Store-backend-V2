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

//  url pruba : http://localhost:5000/payment-intents/344 esta es la da la funcion de prueba
export default router;
