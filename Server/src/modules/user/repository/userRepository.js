import User from "../../auth/model/userModel.js";
import Role from "../../role/model/roleModel.js";

export const findAll = async (filter, skip, limit) => {
  return await User.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("role", "name slug");
};

export const countAll = async (filter) => {
  return await User.countDocuments(filter);
};

export const findById = async (id) => {
  return await User.findById(id).populate("role", "name slug");
};

export const findByEmail = async (email) => {
  return await User.findOne({ email });
};

export const createUser = async (data) => {
  return await User.create(data);
};

export const saveUser = async (user) => {
  return await user.save();
};

export const removeUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

// Active super admins, optionally ignoring one user.
export const countActiveSuperAdmins = async (excludeId = null) => {
  const role = await Role.findOne({ slug: "super-admin" }).select("_id");
  if (!role) return 0;

  const filter = { isActive: true, role: role._id };
  if (excludeId) filter._id = { $ne: excludeId };

  return await User.countDocuments(filter);
};

export const findIdsByRole = async (roleId) => {
  const users = await User.find({ role: roleId }).select("_id");
  return users.map((user) => user._id);
};
