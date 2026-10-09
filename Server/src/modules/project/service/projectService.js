import {
  findPublic,
  countPublic,
  findActiveBySlug,
  findFeatured,
  findById,
  findPage,
  count,
  createProject,
  saveProject,
  removeProject,
} from "../repository/projectRepository.js";
import { clearCache } from "../../../utils/cache.js";
import { ApiError } from "../../../utils/ApiError.js";

const publicProject = (project) => {
  return {
    id: project._id,
    title: project.title,
    slug: project.slug,
    category: project.category,
    location: project.location,
    year: project.year,
    status: project.status,
    link: project.link,
    image: project.image,
    gallery: project.gallery,
    summary: project.summary,
    description: project.description,
    featured: project.featured,
  };
};

const invalidate = () => clearCache("projects");

export const list = async (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 12, 1), 50);

  const filter = { isActive: true };
  if (query.category) filter.category = query.category;
  if (query.featured === "true") filter.featured = true;

  const [items, total] = await Promise.all([
    findPublic(filter, (page - 1) * limit, limit),
    countPublic(filter),
  ]);

  return { items: items.map(publicProject), total, page, limit };
};

export const getBySlug = async (slug) => {
  const project = await findActiveBySlug(slug);
  if (!project) throw new ApiError(404, "Project not found");

  return publicProject(project);
};

export const featured = async (limit) => {
  const projects = await findFeatured(Math.min(Math.max(Number(limit) || 3, 1), 9));

  return projects.map(publicProject);
};

export const listAdmin = async (query = {}) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);

  const filter = {};
  if (query.search)
    filter.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { slug: { $regex: query.search, $options: "i" } },
      { category: { $regex: query.search, $options: "i" } },
    ];

  const [projects, total] = await Promise.all([
    findPage(filter, (page - 1) * limit, limit),
    count(filter),
  ]);

  return {
    items: projects.map((project) => ({
      ...publicProject(project),
      order: project.order,
      isActive: project.isActive,
    })),
    total,
    page,
    limit,
  };
};

export const create = async (data) => {
  const project = await createProject(data);
  await invalidate();

  return publicProject(project);
};

export const update = async (id, data) => {
  const project = await findById(id);
  if (!project) throw new ApiError(404, "Project not found");

  for (const [field, value] of Object.entries(data)) {
    if (field !== "id") project[field] = value;
  }

  const saved = await saveProject(project);
  await invalidate();

  return publicProject(saved);
};

export const remove = async (id) => {
  const project = await findById(id);
  if (!project) throw new ApiError(404, "Project not found");

  await removeProject(id);
  await invalidate();
};