import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../Components/StatCard";
import API from "../services/api";
import { Plus, Video, MoreHorizontal, CheckCircle2, Square, Pause } from "lucide-react";
import greenWave from "../assets/greenwave.avif";

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data: ov } = await API.get("/api/overview");
        setOverview(ov);
        const { data: an } = await API.get("/api/analytics");
        setAnalytics(an);
      } catch (err) { console.error(err); }
    };
    load();
  }, []);

  return (
    <DashboardLayout>
      {/* 1. HEADER SECTION */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-400 mt-1 font-medium italic">Plan, prioritize, and accomplish your tasks with ease.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#14532D] text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-green-900/20 active:scale-95 transition-all">
            <Plus size={18} /> Add Project
          </button>
          <button className="border border-slate-200 text-[#14532D] px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            Import Data
          </button>
        </div>
      </div>

      {/* 2. STATS ROW (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Projects" value="24" green={true} trend="5" />
        <StatCard title="Ended Projects" value="10" trend="6" />
        <StatCard title="Running Projects" value="12" trend="2" />
        <StatCard title="Pending Project" value="2" trend="On Discuss" />
      </div>

      {/* 3. MAIN GRID (3 Columns Like Image) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMN 1: Analytics & Team Collaboration */}
        <div className="space-y-6">
          {/* Project Analytics Card */}
          <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-xl text-slate-900 font-bold mb-10">Project Analytics</h2>
            <div className="flex items-end justify-between h-44 gap-3 px-1">
              {[45, 75, 65, 100, 60, 50, 45].map((h, i) => (
                <div key={i} className="flex flex-col items-center flex-1 group">
                  <div 
                    className={`w-full max-w-[38px] rounded-full transition-all relative ${i === 3 ? 'bg-[#0a281e]' : 'bg-[#14532D]/80 hover:bg-[#14532D]'}`}
                    style={{ height: `${h}%` }}
                  >
                    {i === 2 && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white border border-slate-100 shadow-xl px-2 py-1 rounded-md text-[10px] font-extrabold text-[#14532D]">
                        74%
                      </div>
                    )}
                  </div>
                  <span className="mt-4 text-[12px] font-bold text-slate-400 uppercase">{["S", "M", "T", "W", "T", "F", "S"][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Collaboration Card */}
          <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl text-slate-900 font-bold">Team Collaboration</h2>
              <button className="text-[11px] text-green-800 font-bold border border-slate-200 px-4 py-2 rounded-full hover:bg-slate-50">+ Add Member</button>
            </div>
            <div className="space-y-5">
              {[
                { name: "Alexandra Deff", task: "Github Project Repository", status: "Completed", color: "bg-emerald-50 text-emerald-600" },
                { name: "Edwin Adenike", task: "Integrate User Authentication System", status: "In Progress", color: "bg-amber-50 text-amber-600" },
                { name: "Isaac Oluwatemilorun", task: "Develop Search and Filter Functionality", status: "Pending", color: "bg-red-50 text-red-400" },
                { name: "David Oshodi", task: "Responsive Layout for Homepage", status: "In Progress", color: "bg-amber-50 text-amber-600" }
              ].map((member, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} 
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-slate-100"
                      alt={member.name} 
                    />
                    <div className="max-w-[150px]">
                      <p className="text-sm font-bold text-slate-900 leading-none">{member.name}</p>
                      <p className="text-[10px] text-slate-400 mt-1 truncate">Working on <span className="font-bold">{member.task}</span></p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-md ${member.color} border border-current opacity-80`}>
                    {member.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMN 2: Reminders & Project Progress */}
        <div className="space-y-6">
          {/* Reminders Card */}
          <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-xl text-slate-900 font-bold mb-4">Reminders</h2>
            <h3 className="font-bold text-2xl text-[#14532D] leading-snug">Meeting with Arc Company</h3>
            <p className="text-slate-400 text-sm italic mb-8">Time: 02.00 pm - 04.00 pm</p>
            <button className="w-full bg-[#14532D] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-green-900/20">
              <div className="bg-white/20 p-1.5 rounded-lg"><Video size={16}/></div> Start Meeting
            </button>
          </div>

          {/* Project Progress Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
            <h2 className="text-xl text-slate-900 font-bold mb-8 text-left">Project Progress</h2>
            <div className="relative w-52 h-32 mx-auto mb-8">
              <svg className="w-full h-full" viewBox="0 0 100 55">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f1f5f9" strokeWidth="10" strokeLinecap="round" strokeDasharray="1, 2" />
                <path d="M 10 50 A 40 40 0 0 1 85 35" fill="none" stroke="#064e3b" strokeWidth="10" strokeLinecap="round" />
                <path d="M 10 50 A 40 40 0 0 1 65 15" fill="none" stroke="#14532D" strokeWidth="11" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                <span className="text-5xl font-bold text-slate-900 tracking-tighter">41%</span>
                <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider mt-2 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Project Ended
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#28cf6b]"/><span className="text-[10px] font-bold text-slate-400 uppercase">Completed</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#064e3b]"/><span className="text-[10px] font-bold text-slate-400 uppercase">In Progress</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-200"/><span className="text-[10px] font-bold text-slate-400 uppercase">Pending</span></div>
            </div>
          </div>
        </div>

        {/* COLUMN 3: Projects List & Time Tracker */}
        <div className="space-y-6">
          {/* Projects List Card */}
          <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl text-slate-900 font-bold">Project</h2>
                <button className="text-[11px] font-bold border text-green-800 border-slate-200 px-4 py-1.5 rounded-full hover:bg-slate-50">+ New</button>
             </div>
             <div className="space-y-6">
                {[
                  { title: "Develop API Endpoints", date: "Nov 26, 2024", iconColor: "text-blue-500 bg-blue-50" },
                  { title: "Onboarding Flow", date: "Nov 28, 2024", iconColor: "text-emerald-500 bg-emerald-50" },
                  { title: "Build Dashboard", date: "Nov 30, 2024", iconColor: "text-orange-400 bg-orange-50" },
                  { title: "Optimize Page Load", date: "Dec 5, 2024", iconColor: "text-amber-500 bg-amber-50" },
                  { title: "Cross-Browser Testing", date: "Dec 6, 2024", iconColor: "text-purple-500 bg-purple-50" }
                ].map((project, i) => (
                    <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-xl ${project.iconColor}`}><CheckCircle2 size={18}/></div>
                            <div>
                                <p className="text-[14px] font-bold text-slate-900 leading-tight">{project.title}</p>
                                <p className="text-[10px] text-slate-400 mt-1">Due date: {project.date}</p>
                            </div>
                        </div>
                        <MoreHorizontal size={18} className="text-slate-300 group-hover:text-slate-600 transition-colors cursor-pointer"/>
                    </div>
                ))}
             </div>
          </div>

         <div className="bg-gradient-to-br from-[#0a281e] to-[#14532D] p-8 rounded-[2.5rem] text-white shadow-xl shadow-green-900/20 relative overflow-hidden h-[260px] flex flex-col justify-between">

  {/* Background image */}
  <img
    src={greenWave}
    alt=""
    className="absolute inset-0 w-full h-full object-cover opacity-40"
  />

  {/* glow effect */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

  {/* content */}
  <div className="relative z-10">
    <p className="text-[10px] font-bold uppercase tracking-[3px] text-emerald-400/80">
      Time Tracker
    </p>

    <div className="text-6xl font-mono font-bold text-center tabular-nums tracking-tighter">
      01:24:08
    </div>

    <div className="flex justify-center gap-4">
      <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#14532D] hover:scale-105 transition-transform">
        <Pause size={24} fill="#14532D"/>
      </button>

      <button className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform">
        <Square size={20} fill="white"/>
      </button>
    </div>
  </div>

</div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;