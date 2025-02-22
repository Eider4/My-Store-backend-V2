import express from "express";
import { uploadImages, deleteImages } from "../controllers/uploadController.js";

const router = express.Router();
router.post("/", uploadImages);
router.post("/delete", deleteImages);

export default router;
