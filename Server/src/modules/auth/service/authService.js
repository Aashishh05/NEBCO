import {
  findByEmail,
  findByIdWithRole,
  findByIdWithPassword,
  updateLastLogin,
  saveUser,
} from "../repository/authRepository.js";

import { ApiError } from "../../../utils/ApiError.js";

export const login = async (email, password) => {
  const user = await findByEmail(email);

  // Use one message for every login failure
  // so we don't reveal whether the email exists.
  if (!user || !user.isActive) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  await updateLastLogin(user._id);
  return await getAccess(user._id);
};

export const getAccess = async (id) => {
  const user = await findByIdWithRole(id);

  if (!user || !user.isActive || !user.role) {
    return null;
  }

  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    isActive: user.isActive,

    role: {
      id: String(user.role._id),
      name: user.role.name,
      slug: user.role.slug,
    },

    permissions: user.role.permissions,
  };
};

export const changePassword = async (id, currentPassword, newPassword) => {
  const user = await findByIdWithPassword(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.comparePassword(currentPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Current password is incorrect");
  }

  user.password = newPassword;

  await saveUser(user);
};
