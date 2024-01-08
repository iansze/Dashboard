import { Router } from "express";
import { postEvents, getEvents, deleteEvent } from "../controllers/calendar.controller.js";

const router = Router();

router.post("/events", postEvents);
router.get("/events/lists", getEvents);
router.delete("/events/:eventId", deleteEvent);

export default router;
