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
        <img src={donezoLogo} alt="Donezo" className="w-10 h-10 object-contain" />
        <span className="text-2xl font-bold text-slate-900 tracking-tight">Donezo</span>
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

      {/* Download Mobile App Promo Card (From Image) */}

      <div className="px-6 mt-auto">
        <div className="bg-gradient-to-br from-[#0a281e] to-[#14532D] p-5 rounded-[2rem] relative overflow-hidden group shadow-lg shadow-green-900/20">

            {/* Background Abstract Pattern */}
            <div className="absolute top-0 right-0 opacity-10">
                <Download size={80} strokeWidth={1} />
            </div>
            
            <div className="relative z-10 text-center">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Download className="text-white" size={18} />
                </div>
                <h4 className="text-white text-sm font-bold leading-tight mb-1">Download our<br/>Mobile App</h4>
                <p className="text-emerald-400/70 text-[10px] mb-4">Get easy in another way</p>
                <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#0a281e] text-[12px] font-extrabold py-2.5 rounded-xl transition-all shadow-sm">
                    Download
                </button>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;