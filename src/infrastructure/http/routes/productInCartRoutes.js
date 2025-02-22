import express from "express";
import {
  addProductInCartController,
  deleteProductInCartController,
  getProductInCartByUserController,
  deleteProductsAllInCartController,
  updateProductInCartController,
} from "../controllers/productInCartControllers.js";

const router = express.Router();
router.get("/:id_user", getProductInCartByUserController);
router.post("/", addProductInCartController);
router.post("/delete", deleteProductInCartController);
router.post(
  "/deleteProductsAllInCart/:id_cart",
  deleteProductsAllInCartController
);
router.post("/update", updateProductInCartController);

export default router;
