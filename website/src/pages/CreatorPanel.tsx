import Sidebar from "@/components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const CreatorPanel = () => (
  <div className="bg-gray-100 min-h-screen">
    <Sidebar role="creator" />
    <main className="ml-56 p-8">
      <Outlet />
    </main>
  </div>
);

export default CreatorPanel; 