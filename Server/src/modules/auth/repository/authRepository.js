import Role from '../../role/model/roleModel.js';
import User from '../model/userModel.js';

export const authRepository = {
  findByEmail: (email) => User.findOne({ email }).select('+password'),
  findByIdWithRole: (id) => User.findById(id).populate('role'),
  findByIdWithPassword: (id) => User.findById(id).select('+password'),
  updateLastLogin: (id) => User.findByIdAndUpdate(id, { lastLoginAt: new Date() }),
  save: (user) => user.save()
};
