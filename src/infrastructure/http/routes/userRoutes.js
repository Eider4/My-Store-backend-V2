// backend/routes/userRoutes.js

import express from "express";
import {
  addUserController,
  getUserByIdController,
  updateUserController,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", addUserController);
router.get("/get-user/:id", getUserByIdController);
router.put("/update", updateUserController);

export default router;
