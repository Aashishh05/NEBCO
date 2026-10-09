import { z } from "zod";

const slug = z
  .string()
  .min(1)
  .max(120)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug can only contain lowercase letters, numbers and hyphens",
  );

const mediaImage = z.object({
  publicId: z.string().optional().default(""),
  url: z.string().optional().default(""),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export const enquirySchema = z.object({
  name: z.string().min(2, "Name is required").max(60),
  email: z.string().email("Invalid email").or(z.literal("")),
  phone: z.string().max(30).optional().default(""),
  interest: z.string().max(60).optional().default(""),
  message: z
    .string()
    .min(5, "Tell us a little more")
    .max(2000)
    .optional()
    .default(""),
  website: z.string().optional().default(""),
});

export const appointmentSchema = z.object({
  name: z.string().min(2, "Name is required").max(60),
  email: z.string().email("Invalid email").or(z.literal("")),
  phone: z.string().max(30).optional().default(""),
  preferredDate: z.string().max(20).optional().default(""),
  preferredTime: z.string().max(20).optional().default(""),
  message: z.string().max(2000).optional().default(""),
  website: z.string().optional().default(""),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(120),
  slug,
  category: z.enum(["residential", "commercial", "hospitality"]),
  location: z.string().max(120).optional().default(""),
  year: z.string().max(20).optional().default(""),
  status: z.string().max(60).optional().default(""),
  link: z.string().max(500).optional().default(""),
  image: mediaImage.optional(),
  gallery: z.array(mediaImage).optional().default([]),
  summary: z.string().max(500).optional().default(""),
  description: z.string().max(5000).optional().default(""),
  featured: z.boolean().optional().default(false),
});

export const testimonialSchema = z.object({
  client: z.string().min(2, "Client name is required").max(60),
  role: z.string().max(60).optional().default(""),
  quote: z.string().min(10, "Quote is too short").max(1000),
  rating: z.number().int().min(1).max(5).optional().default(5),
  avatar: mediaImage.optional(),
});

export const teamSchema = z.object({
  name: z.string().min(2, "Name is required").max(60),
  position: z.string().max(60).optional().default(""),
  bio: z.string().max(1000).optional().default(""),
  photo: mediaImage.optional(),
  socials: z
    .object({
      facebook: z.string().optional(),
      linkedin: z.string().optional(),
      x: z.string().optional(),
      instagram: z.string().optional(),
    })
    .optional(),
});

export const userSchema = z.object({
  name: z.string().min(2, "Name is required").max(50),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Role is required"),
});

export const roleSchema = z.object({
  name: z.string().min(2, "Name is required").max(50),
  slug,
  description: z.string().max(200).optional().default(""),
});

export const contactSchema = z.object({
  company: z.string().max(100).optional().default(""),
  email: z.string().email("Invalid email").or(z.literal("")).optional(),
  phones: z.array(z.string()).optional().default([]),
  address: z.string().max(200).optional().default(""),
  socials: z
    .object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      youtube: z.string().optional(),
    })
    .optional(),
});
