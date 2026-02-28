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
  Download
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import donezoLogo from "../assets/donezo.png";
import abstractWave from "../assets/abstractwave.png";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
        onClick={() => navigate(item.path)}
        className={`relative flex items-center justify-between px-6 py-3 cursor-pointer transition-all duration-200 group ${
          isActive ? "text-slate-900 font-bold" : "text-slate-400 hover:text-slate-600"
        }`}
      >
        {/* Active Indicator Line */}
        {isActive && (
          <div className="absolute left-0 w-1.5 h-8 bg-[#14532D] rounded-r-full" />
        )}
        
        <div className="flex items-center gap-3">
          <span className={`${isActive ? "text-[#14532D]" : "text-slate-400 group-hover:text-slate-600"}`}>
            {item.icon}
          </span>
          <span className="text-[15px]">{item.name}</span>
        </div>

        {item.badge && (
          <span className="bg-[#14532D] text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold">
            {item.badge}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 h-screen bg-white flex flex-col border-r border-slate-100 py-8">
      
      {/* Logo Section */}
      <div className="flex items-center gap-2 px-8 mb-12">
        <img src={donezoLogo} alt="Donezo" className="w-15 h-15 object-contain" />
        <span className="text-2xl font-semibold text-slate-900 tracking-tight">Donezo</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* MENU Section */}
        <div className="mb-8">
          <p className="px-8 text-[11px] font-bold text-slate-400 uppercase tracking-[2px] mb-4">Menu</p>
          <div className="space-y-1">
            {menuItems.map((item) => <NavItem key={item.name} item={item} />)}
          </div>
        </div>

        {/* GENERAL Section */}
        <div className="mb-8">
          <p className="px-8 text-[11px] font-bold text-slate-400 uppercase tracking-[2px] mb-4">General</p>
          <div className="space-y-1">
            {generalItems.map((item) => <NavItem key={item.name} item={item} />)}
            
            {/* Logout Button */}
            <div 
              onClick={handleLogout}
              className="flex items-center gap-3 px-6 py-3 cursor-pointer text-slate-400 hover:text-red-600 transition-all group"
            >
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
              <span className="text-[15px]">Logout</span>
            </div>
          </div>
        </div>
      </div>

    {/* Download Mobile App Promo Card */}

{/* Download App Sidebar Card */}
<div className="px-4 mt-auto mb-6">
  <div className="relative p-6 rounded-[32px] overflow-hidden bg-[#04160E] group cursor-pointer">
    {/* Abstract Wave Background - Image match */}
    <div 
      className="absolute inset-0 opacity-80"
      style={{
        backgroundImage: `url(${abstractWave})`,
        backgroundSize: '150%',
        backgroundPosition: 'top right',
        backgroundRepeat: 'no-repeat',
      }}
    />
    
    {/* Dark Overlay for better text readability */}
    <div className="absolute" />

    {/* Content */}
    <div className="relative z-10">
      {/* White Badge Icon */}
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3 shadow-lg">
        <div className="relative">
          {/* Custom Award/Badge Icon style from image */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#064e3b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6" />
            <path d="M15.41 14.12l1.39 5.22L12 17l-4.8 2.34 1.39-5.22" />
          </svg>
        </div>
      </div>

      {/* Title with larger font */}
      <h4 className="text-white text-2xl leading-[1.15] mb-2 tracking-tight">
        Download our <br /> Mobile App
      </h4>

      {/* Subtitle */}
      <p className="text-slate-300 text-[13px] font-medium mb-6 opacity-90">
        Get easy in another way
      </p>

      {/* Download Button */}
      <button className="w-full bg-[#14532D] hover:bg-[#1a6638] text-white text-[15px] font-bold py-3.5 rounded-[18px] transition-all duration-300 shadow-md">
        Download
      </button>
    </div>
  </div>
</div>

    </div>
  );
};

export default Sidebar;