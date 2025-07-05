import Sidebar from "@/components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const CreatorPanel = () => (
  <div className="flex min-h-screen bg-gray-100">
    <Sidebar role="creator" />
    <main className="flex-1 p-8">
      <Outlet />
    </main>
  </div>
);

export default CreatorPanel; 