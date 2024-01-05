import { Router } from "express";
import { postEvents } from "../controllers/calendar.controller.js";

const router = Router();

router.post("/events", postEvents);

export default router;
