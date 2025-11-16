import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menu = [
  { to: "/", label: "Dashboard", icon: "tabler:home" },
  { to: "/kalender", label: "Kalender", icon: "tabler:calendar-event" },
  { to: "/jadwal", label: "Jadwal", icon: "tabler:file-pencil" },
  { to: "/tugas", label: "Tugas", icon: "tabler:checklist" },
  { to: "/projects", label: "Retainer", icon: "tabler:building-community" },
  { to: "/team", label: "Tim", icon: "tabler:users-group" },
  { to: "/announcements", label: "Pengumuman", icon: "tabler:alert-circle" },
  { to: "/karyawan", label: "Karyawan", icon: "tabler:users" },
];

export default function Sidebar({ collapsed, setCollapsed, isMobile, mobileOpen, setMobileOpen, onLogout }) {
  const { user } = useAuth();
  const avatar = user?.photo
    ? user.photo
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=A97C09&color=fff`;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transform transition-all duration-300 shadow-lg
          ${collapsed ? "w-20" : "w-64"}
          ${isMobile ? (mobileOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
        `}
      >
        {/* Logo & Toggle */}
        <div className={`px-4 py-4 border-b border-gray-200 flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && <h3 className="text-xl font-bold text-primary-500 select-none">Kantor NH</h3>}
          <button
            onClick={() => (isMobile ? setMobileOpen(false) : setCollapsed(!collapsed))}
            className="p-2 rounded hover:bg-gray-100 focus:ring-2 focus:ring-primary-400"
          >
            <span
              className="iconify text-xl"
              data-icon={collapsed ? "tabler:layout-sidebar-right-collapse" : "tabler:layout-sidebar-left-collapse"}
            />
          </button>
        </div>

        {/* User */}
        <div className={`border-b border-gray-200 transition-all duration-300 ${collapsed ? "flex justify-center py-4" : "px-4 py-4"}`}>
          <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
            <img src={avatar} className="w-10 h-10 rounded-full border border-gray-300 shadow-sm" alt="Avatar" />
            {!collapsed && (
              <div className="truncate">
                <p className="font-semibold text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500 tracking-wide uppercase">{user?.role || "Karyawan"}</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="px-2 py-4 flex flex-col gap-1 overflow-y-auto h-[calc(100%-130px)]">
          {menu.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              className={({ isActive }) =>
                `flex items-center transition-colors duration-150 rounded-md px-3 py-2 ${
                  collapsed ? "justify-center" : "justify-start gap-3"
                } ${isActive ? "bg-primary-500 text-white font-semibold shadow-sm" : "text-gray-700 hover:bg-primary-100 hover:text-primary-600"}`
              }
              onClick={() => isMobile && setMobileOpen(false)}
            >
              <span className="iconify text-lg" data-icon={m.icon} />
              {!collapsed && <span>{m.label}</span>}
            </NavLink>
          ))}

          <hr className="my-4 border-gray-200" />
          <NavLink
              key="/settings"
              to="/settings"
              className={({ isActive }) =>
                `flex items-center transition-colors duration-150 rounded-md px-3 py-2 ${
                  collapsed ? "justify-center" : "justify-start gap-3"
                } ${isActive ? "bg-primary-500 text-white font-semibold shadow-sm" : "text-gray-700 hover:bg-primary-100 hover:text-primary-600"}`
              }
              onClick={() => isMobile && setMobileOpen(false)}
            >
              <span className="iconify text-lg" data-icon="tabler:settings"/>
              {!collapsed && <span>Pengaturan</span>}
            </NavLink>
          <button
            onClick={onLogout}
            className={`flex items-center text-red-600 hover:bg-gray-100 rounded-md px-3 py-2 transition-colors ${
              collapsed ? "justify-center" : "justify-start gap-3"
            }`}
          >
            <span className="iconify" data-icon="tabler:logout-2" />
            {!collapsed && <span>Logout</span>}
          </button>
        </nav>
      </aside>
    </>
  );
}