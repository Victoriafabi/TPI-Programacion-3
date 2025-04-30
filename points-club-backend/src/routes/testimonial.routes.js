import { Router } from "express";
import {
  createTestimonial,
  deleteTestimonial,
  findTestimonial,
  findTestimonials,
  updateTestimonial
} from "../services/testimonial.services.js";

const router = Router();

router.get("/testimonials", findTestimonials);
router.get("/testimonials/:id", findTestimonial);
router.post("/testimonials", createTestimonial);
router.put("/testimonials/:id", updateTestimonial);
router.delete("/testimonials/:id", deleteTestimonial);

export default router;
