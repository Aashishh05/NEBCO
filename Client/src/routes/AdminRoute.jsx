import usePermission from "@/hooks/usePermission";

// Must hold a permission, otherwise a readable 403 block.
const AdminRoute = ({ module, action, children }) => {
  const allowed = usePermission(module, action);

  if (!allowed) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-medium">403</h1>
        <p className="mt-2 text-muted-fg">You do not have access to this page.</p>
      </div>
    );
  }

  return children;
};

export default AdminRoute;