// backend/routes/userRoutes.js

import express from "express";
import { addUserController } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", addUserController);

export default router;
