import { Router } from "express";
import {
  createEvents,
  getEvents,
  deleteEvent,
  deleteAllEvent,
} from "../controllers/calendar.controller.js";

const router = Router();

router.post("/events", createEvents);
router.get("/events", getEvents);
router.delete("/events/:eventId", deleteEvent);
router.delete("/events", deleteAllEvent);

export default router;
