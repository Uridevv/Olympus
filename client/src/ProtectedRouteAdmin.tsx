import { useAuth } from "./store/authStore";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
export function ProtectedRouteAdmin() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!loading && !isAuthenticated)
    return <Navigate to={"/login-page"} replace />;

  if (
    (!loading && !isAuthenticated) ||
    (user?.role !== "admin" && user?.role !== "manager")
  ) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Outlet />;
      <Toaster
        richColors
        style={{ zIndex: 9999 }}
        theme="dark"
      />
    </>
  );
}
