import Role from "../model/roleModel.js";

export const findAll = async () => {
  return await Role.find().sort({ createdAt: 1 });
};

export const findPage = async (filter, skip, limit) => {
  return await Role.find(filter).sort({ createdAt: 1 }).skip(skip).limit(limit);
};

export const count = async (filter) => {
  return await Role.countDocuments(filter);
};

export const findById = async (id) => {
  return await Role.findById(id);
};

export const findBySlug = async (slug) => {
  return await Role.findOne({ slug });
};

export const createRole = async (data) => {
  return await Role.create(data);
};

export const saveRole = async (role) => {
  return await role.save();
};

export const removeRole = async (id) => {
  return await Role.findByIdAndDelete(id);
};
