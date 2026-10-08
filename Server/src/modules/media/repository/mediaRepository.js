import Media from "../model/mediaModel.js";

export const findById = async (id) => {
  return await Media.findById(id);
};

export const findAll = async (skip, limit) => {
  return await Media.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
};

export const countAll = async () => {
  return await Media.countDocuments();
};

export const createMedia = async (data) => {
  return await Media.create(data);
};

export const removeMedia = async (id) => {
  return await Media.findByIdAndDelete(id);
};