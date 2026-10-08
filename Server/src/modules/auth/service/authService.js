import { authRepository } from '../repository/authRepository.js';
import { ApiError } from '../../../utils/ApiError.js';

export const authService = {
  async login(email, password) {
    const user = await authRepository.findByEmail(email);

    // one message for every failure, so the form never reveals what was wrong
    if (!user || !user.isActive) throw new ApiError(401, 'Invalid email or password');
    const ok = await user.comparePassword(password);
    if (!ok) throw new ApiError(401, 'Invalid email or password');

    await authRepository.updateLastLogin(user._id);
    return this.getAccess(user._id);
  },

  async getAccess(id) {
    const user = await authRepository.findByIdWithRole(id);
    if (!user || !user.isActive || !user.role) return null;

    return {
      id: String(user._id),
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      role: { id: String(user.role._id), name: user.role.name, slug: user.role.slug },
      permissions: user.role.permissions
    };
  },

  async changePassword(id, currentPassword, newPassword) {
    const user = await authRepository.findByIdWithPassword(id);
    if (!user) throw new ApiError(404, 'User not found');

    const ok = await user.comparePassword(currentPassword);
    if (!ok) throw new ApiError(400, 'Current password is incorrect');

    user.password = newPassword;
    await authRepository.save(user);
  }
};
