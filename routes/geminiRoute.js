import express, { Router } from "express"
import { geminiController } from "../controller/geminiController.js";

const router=Router();

router.post("/ask",geminiController)

export default  router