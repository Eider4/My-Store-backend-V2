// routes/index.js

import express from "express";
import {
  confirmUser,
  registerUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();
// Ruta de inicio
router.post("/register", registerUser);
router.post("/confirm", confirmUser); // Ruta para confirmar el usuario
router.post("/login", loginUser); // Ruta para iniciar sesión

export default router;
