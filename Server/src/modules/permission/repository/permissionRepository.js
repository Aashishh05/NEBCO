import Permission from "../model/permissionModel.js";

export const findByRole = async (roleId) => {
  return await Permission.findOne({ role: roleId });
};

export const findAll = async () => {
  return await Permission.find().populate("role", "name slug displayName");
};

export const createForRole = async (roleId) => {
  return await Permission.create({ role: roleId });
};

export const savePermission = async (permission) => {
  return await permission.save();
};

export const removeByRole = async (roleId) => {
  return await Permission.deleteOne({ role: roleId });
};
