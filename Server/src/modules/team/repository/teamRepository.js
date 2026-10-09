import TeamMember from "../model/teamModel.js";

export const findActive = async () => {
  return await TeamMember.find({ isActive: true }).sort({ order: 1 });
};

export const findAll = async () => {
  return await TeamMember.find().sort({ order: 1 });
};

export const findPage = async (filter, skip, limit) => {
  return await TeamMember.find(filter).sort({ order: 1 }).skip(skip).limit(limit);
};

export const count = async (filter) => {
  return await TeamMember.countDocuments(filter);
};

export const findById = async (id) => {
  return await TeamMember.findById(id);
};

export const createMember = async (data) => {
  return await TeamMember.create(data);
};

export const saveMember = async (member) => {
  return await member.save();
};

export const removeMember = async (id) => {
  return await TeamMember.findByIdAndDelete(id);
};