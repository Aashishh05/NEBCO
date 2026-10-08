export const authRepository = {
  findByEmail: async (email) => User.findOne({ email }).select('+password'),
  findByIdWithRole: async (id) => User.findById(id).populate('role'),
  findByIdWithPassword: async (id) => User.findById(id).select('+password'),
  updateLastLogin: async (id) => User.findByIdAndUpdate(id, { lastLoginAt: new Date() }),
  save: async (user) => user.save()
};
