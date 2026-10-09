import Testimonial from "../model/testimonialModel.js";

export const findPublished = async () => {
  return await Testimonial.find({ isPublished: true }).sort({ order: 1 });
};

export const findAll = async () => {
  return await Testimonial.find().sort({ order: 1 });
};

export const findPage = async (filter, skip, limit) => {
  return await Testimonial.find(filter).sort({ order: 1 }).skip(skip).limit(limit);
};

export const count = async (filter) => {
  return await Testimonial.countDocuments(filter);
};

export const findById = async (id) => {
  return await Testimonial.findById(id);
};

export const createTestimonial = async (data) => {
  return await Testimonial.create(data);
};

export const saveTestimonial = async (testimonial) => {
  return await testimonial.save();
};

export const removeTestimonial = async (id) => {
  return await Testimonial.findByIdAndDelete(id);
};