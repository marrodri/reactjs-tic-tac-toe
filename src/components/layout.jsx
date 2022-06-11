import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-sky-300 h-full">
      <Outlet />
    </div>
  );
}
