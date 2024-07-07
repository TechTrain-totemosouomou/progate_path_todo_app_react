import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="container mx-auto max-w-3xl pt-8 flex flex-col h-screen">
      <header className="flex justify-between">
        <Link to={"/"} data-test="header-logo" className="text-6xl text-black">
          TODO APP
        </Link>
      </header>
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
}
