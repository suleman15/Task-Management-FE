import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 justify-between flex gap-2 items-center">
        <div className="font-bold text-xl">Logo</div>
        <div className="flex gap-2">
          <Link to="/login" className="[&.active]:font-bold">
            Login
          </Link>
          <Link to="/register" className="[&.active]:font-bold">
            Register
          </Link>
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
      <Toaster richColors />
    </>
  ),
});
