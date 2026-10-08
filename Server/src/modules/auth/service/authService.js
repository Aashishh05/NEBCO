import {
  findByEmail,
  findByIdWithRole,
  findByIdWithPassword,
  updateLastLogin,
  saveUser,
} from "../repository/authRepository.js";

import { ApiError } from "../../../utils/ApiError.js";
import { getPermissionsForRole } from "../../permission/service/permissionService.js";
import {
  getCachedAccess,
  setCachedAccess,
} from "../../../utils/rbacCache.js";

export const login = async (email, password) => {
  const user = await findByEmail(email);

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
  const cached = await getCachedAccess(id);
  if (cached !== undefined) return cached;

  const user = await findByIdWithRole(id);

  let access = null;

  if (user && user.isActive && user.role) {
    access = {
      id: String(user._id),
      name: user.name,
      email: user.email,
      isActive: user.isActive,

      role: {
        id: String(user.role._id),
        name: user.role.name,
        slug: user.role.slug,
      },

      // permission matrix: { projects: { read: true, create: false, ... } }
      permissions: await getPermissionsForRole(user.role._id),
    };
  }

  await setCachedAccess(id, access);

  return access;
};

export const changePassword = async (
  id,
  currentPassword,
  newPassword
) => {
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