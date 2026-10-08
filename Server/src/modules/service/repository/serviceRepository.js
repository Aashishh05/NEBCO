import Service from "../model/serviceModel.js";

export const findAll = async () => {
  return await Service.find().sort({ order: 1 });
};

export const findActive = async () => {
  return await Service.find({ isActive: true }).sort({ order: 1 });
};

export const findActiveBySlug = async (slug) => {
  return await Service.findOne({ slug, isActive: true });
};

export const findById = async (id) => {
  return await Service.findById(id);
};

export const findBySlug = async (slug) => {
  return await Service.findOne({ slug });
};

export const createService = async (data) => {
  return await Service.create(data);
};

export const saveService = async (service) => {
  return await service.save();
};

export const removeService = async (id) => {
  return await Service.findByIdAndDelete(id);
};