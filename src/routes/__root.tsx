import { ModeToggle } from "@/components/mode-toggle";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 px-8 justify-between flex  items-center ">
        <div className="font-bold text-xl">Logo</div>
        <div className="flex gap-8 items-center">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/login" className="[&.active]:font-bold">
            Login
          </Link>
          <Link to="/register" className="[&.active]:font-bold">
            Register
          </Link>
          <ModeToggle />
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
      <Toaster richColors />
    </>
  ),
});
