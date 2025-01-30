import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, Briefcase, Bookmark, User, LayoutDashboard, LogOut, Star, Calendar } from "lucide-react";

export const UserDashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`h-full bg-gray-900 text-white flex flex-col p-4 transition-all ${isOpen ? "w-64" : "w-20"} duration-300`}>
        <button onClick={toggleSidebar} className="text-white mb-6 p-2 rounded-lg hover:bg-gray-700">
          <Menu className="w-6 h-6" />
        </button>

        <nav className="flex flex-col gap-4">
          <SidebarItem to="/user-dashboard" icon={<LayoutDashboard />} text="Dashboard" isOpen={isOpen} />
          <SidebarItem to="/user-dashboard/bookings" icon={<Calendar />} text="My Bookings" isOpen={isOpen} />
          <SidebarItem to="/user-dashboard/loyalty-points" icon={<Star />} text="Loyalty Points" isOpen={isOpen} />
          <SidebarItem to="/user-dashboard/profile" icon={<User />} text="User Profile" isOpen={isOpen} />
          <SidebarItem to="/" icon={<LogOut />} text="Logout" isOpen={isOpen} />
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <Outlet /> {/* Renders child routes inside the dashboard */}
      </div>
    </div>
  );
};

const SidebarItem = ({ to, icon, text, isOpen }) => (
  <Link to={to} className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700 transition-all">
    {icon}
    {isOpen && <span>{text}</span>}
  </Link>
);
