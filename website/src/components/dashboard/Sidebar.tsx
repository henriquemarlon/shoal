import { usePrivy } from "@privy-io/react-auth";
import type { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogout } from '@privy-io/react-auth';
import LogoShoal from "@/images/LogoShoal";
import { LogOut } from 'lucide-react';

type Role = "admin" | "investidor" | "creator";

interface SidebarProps {
  role: Role;
}

const sidebarOptions: Record<Role, { label: string; path: string }[]> = {
  admin: [
    { label: "Dashboard", path: "/admin" },
    { label: "Users", path: "/admin/users" }
  ],
  investidor: [
    { label: "Investimentos", path: "/investidor" },
    { label: "Carteira", path: "/investidor/carteira" },
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
      return location.pathname.startsWith("/panel");
    }
    return location.pathname === path;
  };

  return (
    <aside className="w-56 bg-white shadow-md h-screen flex flex-col py-4 px-4">
      <div className="flex justify-center items-center">
        <LogoShoal width={90} height={50} />
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
        
        <button
          className="bg-red-100 cursor-pointer w-full gap-2 flex justify-center items-center px-4 py-2 rounded-lg transition text-red-500 mt-8 "
          onClick={async () => {
            await logout();
            navigate('/login', { replace: true });
          }}
        >
          Logout
          <LogOut className="w-4" />
        </button>

      </nav>
    </aside>
  );
};

export default Sidebar; 