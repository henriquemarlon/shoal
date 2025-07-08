import { usePrivy } from "@privy-io/react-auth";
import type { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogout } from '@privy-io/react-auth';
import LogoShoal from "@/images/LogoShoal";
import { LogOut } from 'lucide-react';

type Role = "admin" | "investor" | "creator";

interface SidebarProps {
  role: Role;
}

const sidebarOptions: Record<Role, { label: string; path: string }[]> = {
  admin: [
    { label: "Dashboard", path: "/admin" },
    { label: "Profile", path: "/admin/profile" },

  ],
  investor: [
    { label: "Feed", path: "/investor" },
    { label: "Investments", path: "/investor/investments" },
    { label: "Profile", path: "/investor/profile" },
  ],
  creator: [
    { label: "Campaigns", path: "/panel" },
    { label: "Profile", path: "/panel/profile" },
  ],
};

const Sidebar: FC<SidebarProps> = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useLogout();
  const options = sidebarOptions[role];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    if (path === "/panel") {
      return location.pathname.startsWith("/panel") && !location.pathname.startsWith("/panel/profile");
    }
    if (path === "/panel/profile") {
      return location.pathname.startsWith("/panel/profile");
    }
    if (path === "/investor") {
      return location.pathname === "/investor";
    }
    if (path === "/investor/investments") {
      return location.pathname === "/investor/investments";
    }
    if (path === "/investor/profile") {
      return location.pathname.startsWith("/investor/profile");
    }
    if (path === "/admin/profile"){
      return location.pathname.startsWith("/admin/profile");
    }
    return location.pathname === path;
  };

  return (
      <aside className="w-56 bg-white shadow-md h-screen flex flex-col py-8 px-4 fixed left-0 top-0 z-20">
      
      <div className="flex flex-col justify-center items-center mb-8">
        <LogoShoal width={90} height={50} />
        <div
            className={
              "inline-block px-3 py-1 rounded-md border font-semibold text-xs text-center " +
              (role === "admin"
                ? "bg-red-100 border-red-400 text-red-700"
                : role === "creator"
                ? "bg-blue-100 border-blue-400 text-blue-700"
                : role === "investor"
                ? "bg-green-100 border-green-400 text-green-700"
                : "bg-gray-100 border-gray-300 text-gray-500")
            }
          >
            {role}
          </div>
      </div>


      <nav className="flex flex-col justify-between gap-4 h-full">
        <div className="flex flex-col gap-4 mt-4">
          {options.map((opt) => (
            <button
              key={opt.path}
              className={`flex text-sm justify-center items-center px-4 py-2 rounded-xl transition w-full cursor-pointer
          ${isActive(opt.path)
                  ? "bg-gray-200"
                  : ""
                }`}
              onClick={() => navigate(opt.path)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        
        <div className="mt-8 gap-2 flex flex-col">
          <button
            className="bg-red-100 cursor-pointer w-full gap-2 flex justify-center items-center px-4 py-2 rounded-lg transition text-red-500 "
            onClick={async () => {
              localStorage.removeItem('userVerified');
              await logout();
              navigate('/login', { replace: true });
            }}
          >
            Logout
            <LogOut className="w-4" />
          </button>
        </div>

      </nav>
    </aside>
  );
};

export default Sidebar; 