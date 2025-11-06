import express from "express";
import { aiController } from "../controller/aiController.js";

const router = express.Router();

router.post("/ask", aiController);

export default router;
