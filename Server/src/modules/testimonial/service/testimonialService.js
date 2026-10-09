import {
  findPublished,
  findPage,
  count,
  findById,
  createTestimonial,
  saveTestimonial,
  removeTestimonial,
} from "../repository/testimonialRepository.js";
import { clearCache } from "../../../utils/cache.js";
import { ApiError } from "../../../utils/ApiError.js";

const publicTestimonial = (testimonial) => {
  return {
    id: testimonial._id,
    client: testimonial.client,
    role: testimonial.role,
    quote: testimonial.quote,
    rating: testimonial.rating,
    avatar: testimonial.avatar,
  };
};

const invalidate = () => clearCache("testimonials");

export const listPublished = async () => {
  const testimonials = await findPublished();

  return testimonials.map(publicTestimonial);
};

export const listAdmin = async (query = {}) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);

  const filter = {};
  if (query.search)
    filter.$or = [
      { client: { $regex: query.search, $options: "i" } },
      { quote: { $regex: query.search, $options: "i" } },
    ];

  const [testimonials, total] = await Promise.all([
    findPage(filter, (page - 1) * limit, limit),
    count(filter),
  ]);

  return {
    items: testimonials.map((testimonial) => ({
      ...publicTestimonial(testimonial),
      order: testimonial.order,
      isPublished: testimonial.isPublished,
    })),
    total,
    page,
    limit,
  };
};

export const create = async (data) => {
  const testimonial = await createTestimonial(data);
  await invalidate();

  return publicTestimonial(testimonial);
};

export const update = async (id, data) => {
  const testimonial = await findById(id);
  if (!testimonial) throw new ApiError(404, "Testimonial not found");

  for (const [field, value] of Object.entries(data)) {
    if (field !== "id") testimonial[field] = value;
  }

  const saved = await saveTestimonial(testimonial);
  await invalidate();

  return publicTestimonial(saved);
};

export const remove = async (id) => {
  const testimonial = await findById(id);
  if (!testimonial) throw new ApiError(404, "Testimonial not found");

  await removeTestimonial(id);
  await invalidate();
};