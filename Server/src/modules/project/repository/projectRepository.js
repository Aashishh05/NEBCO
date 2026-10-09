import Project from "../model/projectModel.js";

export const findPublic = async (filter, skip, limit) => {
  return await Project.find(filter)
    .sort({ order: 1 })
    .skip(skip)
    .limit(limit);
};

export const countPublic = async (filter) => {
  return await Project.countDocuments(filter);
};

export const findActiveBySlug = async (slug) => {
  return await Project.findOne({ slug, isActive: true });
};

export const findFeatured = async (limit) => {
  return await Project.find({ isActive: true, featured: true })
    .sort({ order: 1 })
    .limit(limit);
};

export const findById = async (id) => {
  return await Project.findById(id);
};

export const findAll = async () => {
  return await Project.find().sort({ order: 1 });
};

export const findPage = async (filter, skip, limit) => {
  return await Project.find(filter).sort({ order: 1 }).skip(skip).limit(limit);
};

export const count = async (filter) => {
  return await Project.countDocuments(filter);
};

export const createProject = async (data) => {
  return await Project.create(data);
};

export const saveProject = async (project) => {
  return await project.save();
};

export const removeProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};