import Sidebar from "@/components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const AdminPage = () => (
  <div className="flex min-h-screen bg-gray-100">
    <Sidebar role="admin" />
    <main className="flex-1 ml-56 p-8">
      <Outlet />
    </main>
  </div>
);

export default AdminPage; 