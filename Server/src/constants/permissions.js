// Every permission the app knows about, grouped by module.
// The key is always module:action, for example "projects:create".
export const PERMISSIONS = {
  dashboard: ["read"],
  projects: ["read", "create", "update", "delete"],
  services: ["read", "update"],
  pages: ["read", "update"],
  enquiries: ["read", "update", "delete"],
  appointments: ["read", "update", "delete"],
  testimonials: ["read", "create", "update", "delete"],
  team: ["read", "create", "update", "delete"],
  media: ["read", "create", "delete"],
  users: ["read", "create", "update", "delete"],
  roles: ["read", "create", "update", "delete"],
  audit: ["read"],
  settings: ["read", "update"],
};

export const permissionKeys = () => {
  return Object.entries(PERMISSIONS).flatMap(([module, actions]) =>
    actions.map((action) => `${module}:${action}`),
  );
};
