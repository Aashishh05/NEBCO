import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../../../utils/response.js";
import * as testimonialService from "../service/testimonialService.js";
import { record } from "../../audit/service/auditService.js";

export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await testimonialService.listPublished();

  sendSuccess(res, { testimonials });
});

export const getAdminTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await testimonialService.listAdmin();

  sendSuccess(res, { testimonials });
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await testimonialService.create(req.body);

  await record(req, "testimonial.create", "testimonial", testimonial.id);

  sendSuccess(res, { testimonial }, "Testimonial created", 201);
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await testimonialService.update(req.params.id, req.body);

  await record(req, "testimonial.update", "testimonial", testimonial.id);

  sendSuccess(res, { testimonial }, "Testimonial updated");
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  await testimonialService.remove(req.params.id);

  await record(req, "testimonial.delete", "testimonial", req.params.id);

  sendSuccess(res, null, "Testimonial deleted");
});