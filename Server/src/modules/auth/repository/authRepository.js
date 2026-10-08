import User from "../model/userModel.js";

export const findByEmail = async (email) => {
  return await User.findOne({ email }).select("+password");
};

export const findByIdWithRole = async (id) => {
  return await User.findById(id).populate("role");
};

export const findByIdWithPassword = async (id) => {
  return await User.findById(id).select("+password");
};

export const updateLastLogin = async (id) => {
  return await User.findByIdAndUpdate(id, {
    lastLoginAt: new Date(),
  });
};

export const saveUser = async (user) => {
  return await user.save();
};
