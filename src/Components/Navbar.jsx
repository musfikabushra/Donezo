import { Bell, Mail, Search, Command } from "lucide-react";
import useAuth from "../hooks/useAuth";
import defaultUser from "../assets/user.png";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center py-3 px-3 sm:px-4 md:px-6 w-full gap-2">

      {/* Search Bar - Exactly like Dribbble */}
      <div className="relative group flex items-center">
        <Search className="absolute left-4 text-slate-400 group-focus-within:text-[#14532D] transition-colors" size={18} />
        <input
          type="text"
          placeholder="Search task"
          className="bg-white border border-slate-100 px-11 py-2.5 rounded-2xl outline-none w-full sm:w-[250px] md:w-[300px] lg:w-[350px] text-sm focus:border-slate-200 focus:shadow-sm transition-all placeholder:text-slate-400 font-medium"
        />
        {/* Keyboard Shortcut Indicator */}
        <div className="absolute right-3 flex items-center gap-1 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded-md text-[10px] text-slate-400 font-bold">
          <Command size={10} />
          <span>F</span>
        </div>
      </div>

      {/* Right Section: Icons & Profile */}
      <div className="flex items-center gap-6">

        {/* Utility Icons */}
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white border border-slate-100 rounded-2xl text-slate-500 hover:text-[#14532D] hover:bg-slate-50 transition-all shadow-sm">
            <Mail size={20} />
          </button>
          <button className="relative p-2.5 bg-white border border-slate-100 rounded-2xl text-slate-500 hover:text-[#14532D] hover:bg-slate-50 transition-all shadow-sm">
            <Bell size={20} />
            {/* Notification Dot */}
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
        </div>

        {/* User Profile Section */}


        <div className="flex items-center gap-3 pl-4">
          <div className="text-right hidden sm:block">
            <h4 className="text-[14px] font-bold text-slate-900 leading-tight">
              {user?.name || "Totok Michael"}
            </h4>
            <p className="text-[11px] font-medium text-slate-400">
              {user?.email || "tmichael20@mail.com"}
            </p>
          </div>

          <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm transition-transform hover:scale-105 cursor-pointer bg-amber-100">
            <img
              src={user?.avatar || defaultUser}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;