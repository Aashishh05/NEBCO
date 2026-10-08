import { useSelector } from "react-redux";

// usePermission("projects", "create") → true/false
const usePermission = (module, action) => {
  const permissions = useSelector((state) => state.auth.permissions);
  return Boolean(permissions?.[module]?.[action]);
};

export default usePermission;