import { useSelector } from "react-redux";

// usePermission("projects", "create") → true/false
export default function usePermission(module, action) {
  const permissions = useSelector((state) => state.auth.permissions);
  return Boolean(permissions?.[module]?.[action]);
}