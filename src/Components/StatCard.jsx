import { ArrowUpRight } from "lucide-react";

const StatCard = ({ title, value, trend, green }) => {
  return (
    <div
      className={`relative p-6 rounded-[2.2rem] shadow-sm border transition-all duration-300 ${
        green 
          ? "bg-gradient-to-br from-[#0a281e] to-[#14532D] text-white border-transparent shadow-green-900/10" 
          : "bg-white text-slate-900 border-slate-100 hover:border-slate-200"
      }`}
    >
      {/* Top Right Arrow Icon */}
      <div className={`absolute top-5 right-6 w-8 h-8 rounded-full border flex items-center justify-center ${
        green ? "border-white/20 text-white" : "border-slate-200 text-slate-400"
      }`}>
        <ArrowUpRight size={18} />
      </div>

      {/* Title */}
      <p className={`text-[15px] font-medium ${green ? "text-emerald-50/70" : "text-slate-500"}`}>
        {title}
      </p>

      {/* Value */}
      <h2 className="text-[44px] font-bold mt-2 leading-none tracking-tight">
        {value}
      </h2>

      {/* Trend Section */}
      <div className="mt-5 flex items-center gap-2">
        <div className={`flex items-center justify-center w-5 h-5 rounded-md border text-[10px] font-bold ${
            green ? "bg-white/10 border-white/20 text-emerald-400" : "bg-slate-50 border-slate-200 text-slate-400"
        }`}>
            {trend || "6"}
        </div>
        <p className={`text-[11px] font-medium ${green ? "text-emerald-50/50" : "text-slate-400"}`}>
          Increased from last month
        </p>
      </div>
    </div>
  );
};

export default StatCard;