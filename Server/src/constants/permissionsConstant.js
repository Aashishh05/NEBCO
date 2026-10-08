import MODULES from "./modulesConstant.js";

// The four actions a role can have on a module.
export const ACTIONS = ["read", "create", "update", "delete"];

export const emptyPermissions = () => {
  const permissions = {};

  for (const module of MODULES) {
    permissions[module] = { read: false, create: false, update: false, delete: false };
  }

  return permissions;
};

// Turns the listed actions on, everything else stays off.
// perm({ projects: ["read", "update"], users: ["read"] })
export const perm = (spec) => {
  const permissions = emptyPermissions();

  for (const [module, actions] of Object.entries(spec)) {
    for (const action of actions) {
      permissions[module][action] = true;
    }
  }

  return permissions;
};
