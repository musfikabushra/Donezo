import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import donezoLogo from "../assets/donezo.png";
import abstractWave from "../assets/abstractwave.png";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Tasks", icon: <CheckSquare size={20} />, path: "/tasks", badge: "12+" },
    { name: "Calendar", icon: <Calendar size={20} />, path: "/calendar" },
    { name: "Analytics", icon: <BarChart2 size={20} />, path: "/analytics" },
    { name: "Team", icon: <Users size={20} />, path: "/team" },
  ];

  const generalItems = [
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { name: "Help", icon: <HelpCircle size={20} />, path: "/help" },
  ];

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    return (
      <div
        onClick={() => {
          navigate(item.path);
          setIsOpen(false);
        }}
        className={`relative flex items-center justify-between px-8 py-2.5 cursor-pointer transition-all duration-200 group ${isActive ? "text-slate-900 font-semibold" : "text-slate-400 hover:text-slate-600"
          }`}
      >
        {/* Active Indicator Line - From Image */}
        {isActive && (
          <div className="absolute left-0 w-1.5 h-7 bg-[#14532D] rounded-r-full" />
        )}

        <div className="flex items-center gap-3.5">
          {/* Icon - Dashboard and others become green when active */}
          <span className={`${isActive ? "text-[#14532D]" : "text-slate-400 group-hover:text-slate-600"}`}>
            {item.icon}
          </span>
          <span className="text-[15px] tracking-tight">{item.name}</span>
        </div>

        {item.badge && (
          <span className="bg-[#063223] text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold">
            {item.badge}
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-green-700 rounded-lg shadow-sm border border-slate-100" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`fixed inset-y-0 left-0 z-[55] w-72  bg-white border-r border-slate-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

        {/* Logo Section */}
        <div className="flex items-center gap-2.5 px-8 pt-10 pb-12 flex-shrink-0">
          <img src={donezoLogo} alt="Donezo" className="w-12 h-12 object-contain" />
          <span className="text-2xl font-bold text-slate-900 tracking-tighter">Donezo</span>
        </div>

        {/* Scrollable Menu Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* MENU */}
          <div className="mb-8">
            <p className="px-8 text-[11px] font-bold text-slate-300 uppercase tracking-[2px] mb-4">Menu</p>
            <div className="space-y-0.5">
              {menuItems.map((item) => <NavItem key={item.name} item={item} />)}
            </div>
          </div>

          {/* GENERAL */}
          <div className="mb-8">
            <p className="px-8 text-[11px] font-bold text-slate-300 uppercase tracking-[2px] mb-4">General</p>
            <div className="space-y-0.5">
              {generalItems.map((item) => <NavItem key={item.name} item={item} />)}

              <div onClick={handleLogout} className="flex items-center gap-3.5 px-8 py-2.5 cursor-pointer text-slate-400 hover:text-red-600 transition-all group">
                <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                <span className="text-[15px] tracking-tight">Logout</span>
              </div>
            </div>
          </div>

          {/* Download App Card - Image Match */}
          <div className="px-5 pb-15 mt-30 ">
            <div className="relative p-6 rounded-4xl overflow-hidden bg-[#04160E] group shadow-lg">
              <div className="absolute inset-0 opacity-150" style={{ backgroundImage: `url(${abstractWave})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="relative z-10">
                <div className="w-7 h-7  rounded-full flex items-center justify-center mb-4 ">
                  <div className="" />
                </div>
                <h4 className="text-white text-lg  leading-tight mb-1.5"><span className="font-medium">Download</span> our <br />
                  Mobile App</h4>
                <p className="text-slate-400 text-[11px] mb-5">Get easy in another way</p>
                <button className="w-full bg-[#14532D] hover:bg-emerald-800 text-white text-[13px] font-bold py-3 rounded-2xl transition-all active:scale-95 shadow-md">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;