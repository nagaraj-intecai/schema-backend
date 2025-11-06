import express from "express";
import { saveSchema } from "../controller/schemaController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Protect this route
router.post("/save", verifyToken, saveSchema);

export default router;
