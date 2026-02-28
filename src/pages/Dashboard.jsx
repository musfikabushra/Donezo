import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../Components/StatCard";
import API from "../services/api";
import {
  Plus,
  Video,
  MoreHorizontal,
  CheckCircle2,
  Square,
  Pause,
} from "lucide-react";
import greenWave from "../assets/greenwave.png";

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  const [analytics, setAnalytics] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        // fetch a single dashboard payload which contains overview, users, analytics, products
        const { data: dash } = await API.get("/api/dashboard");
        if (dash) {
          if (dash.overview) setOverview(dash.overview);
          if (dash.analytics) setAnalytics(dash.analytics);
          if (dash.users) setUsers(dash.users);
          if (dash.products) setProjects(dash.products);
          console.log("dashboard payload", dash);
        }
      } catch (err) {
        console.error("dashboard fetch error", err);
      }
    };
    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-slate-50 min-h-screen">

        {/* HEADER  */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 sm:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-slate-400 mt-1 text-xl font-normal">
              Plan, prioritize, and accomplish your tasks with ease.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#14532D] to-[#256345] text-white rounded-full font-bold text-sm shadow-[0_10px_30px_rgba(20,83,45,0.2)] hover:opacity-95 active:scale-95 transition-all border border-white/10 px-4 py-2 sm:px-6 sm:py-3">
              <Plus size={18} strokeWidth={3} /> Add Project
            </button>

            <button className="border text-[#14532D] px-6 py-3 rounded-full font-bold text-sm hover:bg-white transition-all border-green-800">
              Import Data
            </button>
          </div>
        </div>

        {/*  STATS  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {overview ? (
            <>
              <StatCard
                title="Total Users"
                value={overview.totalUsers}
                green
                trend={overview.growth}
              />
              <StatCard
                title="Active Users"
                value={overview.activeUsers}
                trend=""
              />
              <StatCard
                title="Revenue"
                value={`$${overview.revenue.toLocaleString()}`}
                trend=""
              />
              <StatCard
                title="Growth"
                value={`${overview.growth}%`}
                trend=""
              />
            </>
          ) : (
            <>
              <StatCard title="Loading..." value="--" />
              <StatCard title="Loading..." value="--" />
              <StatCard title="Loading..." value="--" />
              <StatCard title="Loading..." value="--" />
            </>
          )}
        </div>

        {/* MAIN GRID  */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">

          {/* COLUMN 1 */}
          <div className="space-y-8 md:col-span-12 lg:col-span-6">

            {/* Project Analytics */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 w-full rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <h2 className="text-xl font-bold text-slate-900 mb-10">Project Analytics</h2>

              <div className="flex items-end justify-between h-40 sm:h-48 gap-3 px-1">
                {analytics.length > 0 ? (
                  analytics.map((a, i) => {
                    const height = Math.min(100, Math.round(a.conversions));
                    const day = new Date(a.date).toLocaleDateString("en-US", { weekday: "short" }).charAt(0);

                    // Image-er pattern: 1st, 5th, 6th, 7th bars are usually striped
                    const isStriped = [0, 4, 5, 6].includes(i);
                    // Highlighted bar (W)
                    const isHighlighted = i === 3;
                    // Bar with tooltip (T)
                    const hasTooltip = i === 2;

                    return (
                      <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
                        <div className="relative w-full max-w-[45px] h-full flex flex-col justify-end items-center">

                          {/* Tooltip logic like the image */}
                          {hasTooltip && (
                            <div className="absolute -top-8 bg-white border border-emerald-100 shadow-xl px-2 py-0.5 rounded-lg z-20 flex flex-col items-center">
                              <span className="text-[10px] font-extrabold text-emerald-800">{a.conversions}%</span>
                              <div className="w-1.5 h-1.5 bg-white border-b border-r border-emerald-100 rotate-45 -mb-1"></div>
                            </div>
                          )}

                          {/* The Bar */}
                          <div
                            className={`w-full rounded-full transition-all duration-500 relative overflow-hidden ${isHighlighted
                              ? "bg-[#0a281e]"
                              : isStriped
                                ? "bg-slate-50 border-2 border-slate-100"
                                : "bg-[#14532D]"
                              }`}
                            style={{ height: `${height}%` }}
                          >
                            {/* Striped Pattern Overlay */}
                            {isStriped && (
                              <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(135deg,#94a3b8,#94a3b8_2px,transparent_2px,transparent_8px)]" />
                            )}

                            {/* Tuesday specific light green color */}
                            {hasTooltip && <div className="absolute inset-0 bg-[#69C19A]" />}
                          </div>
                        </div>

                        {/* Day Label */}
                        <span className="mt-4 text-[13px] font-bold text-slate-400 uppercase">
                          {day}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full flex items-center justify-center text-slate-400 italic">
                    Connecting to analytics...
                  </div>
                )}
              </div>
            </div>


            {/* Team Collaboration */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-[32px] w-full lg:max-w-[90%] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-900">
                  Team Collaboration
                </h2>
                <button className="text-xs font-bold border border-green-800 px-4 py-2 rounded-full text-[#14532D] hover:bg-slate-50">
                  + Add Member
                </button>
              </div>

              {/* Scrollable Users List */}
              <div className="space-y-3 max-h-[280px] overflow-auto pr-2">
                {users && users.length > 0 ? (
                  users.map((member) => {
                    const statusColor =
                      member.status === "active"
                        ? "bg-emerald-50 text-emerald-600"
                        : member.status === "inactive"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-red-50 text-red-400";

                    return (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-slate-100"
                            alt={member.name}
                          />
                          <div>
                            <p className="text-sm font-bold text-slate-900">{member.name}</p>
                            <p className="text-xs text-slate-400">{member.email}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-md border ${statusColor}`}>
                          {member.status}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-sm text-slate-400">No team members found</div>
                )}
              </div>
            </div>
          </div>

          {/*  COLUMN 2  */}
          <div className="space-y-8 md:col-span-6 lg:col-span-3">

            {/* Reminders Card */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex flex-col">

              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Reminders
              </h2>

              <div className="flex-1">
                <h3 className="text-[28px] font-bold text-[#063223] leading-[1.2] mb-3">
                  Meeting with Arc Company
                </h3>

                <p className="text-[15px] text-slate-400 font-medium mb-10">
                  Time :{" "}
                  <span className="font-normal text-slate-400/80">
                    02.00 pm - 04.00 pm
                  </span>
                </p>
              </div>

              {/* Start Meeting Button */}
              <button className="w-full bg-gradient-to-b from-[#14532D] to-[#256345] text-white py-4.5 rounded-[24px] font-bold flex items-center justify-center gap-3 shadow-[0_12px_24px_rgba(20,83,45,0.2)] hover:opacity-95 active:scale-95 transition-all">

                <div className="bg-white/10 p-1 rounded-md">
                  <Video size={20} fill="currentColor" />
                </div>

                <span className="text-[17px]">
                  Start Meeting
                </span>

              </button>

            </div>



            {/* Project Progress */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 pb-12 lg:-ml-20 ml-0 rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <h2 className="text-xl font-bold text-slate-900 mb-8 text-left">Project Progress</h2>

              <div className="relative w-full h-44 mx-auto mb-6">
                <svg viewBox="0 0 200 120" className="w-full h-full">
                  <defs>
                    <pattern id="striped-pattern" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="4" stroke="#cbd5e1" strokeWidth="2" />
                    </pattern>
                  </defs>

                  {/* 1. Base Layer (Pending/Striped) */}
                  <path
                    d="M 30 100 A 70 70 0 0 1 170 100"
                    fill="none"
                    stroke="url(#striped-pattern)"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />

                  {/* 2. In Progress (Dark Green) - STROKE-DASHARRAY USE  */}
                  <path
                    d="M 30 100 A 70 70 0 0 1 170 100"
                    fill="none"
                    stroke="#064e3b"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray="160 220"
                    strokeDashoffset="0"
                  />

                  {/* 3. Completed (Primary Green) - STROKE-DASHARRAY USE  */}
                  <path
                    d="M 30 100 A 70 70 0 0 1 170 100"
                    fill="none"
                    stroke="#1c7c43"
                    strokeWidth="22"
                    strokeLinecap="round"
                    strokeDasharray="110 220"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
                  <span className="text-6xl font-extrabold text-slate-900 tracking-tighter">41%</span>
                  <span className="text-[13px] font-bold text-[#14532D] mt-1">Project Ended</span>
                </div>
              </div>

              {/* Legend Items */}
              <div className="flex flex-wrap justify-between items-center px-4 mt-8 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#1c7c43]" />
                  <span className="text-[12px] font-bold text-slate-400 uppercase">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#064e3b]" />
                  <span className="text-[12px] font-bold text-slate-400 uppercase">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-200 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_1px,#94a3b8_1px,#94a3b8_2px)] opacity-50" />
                  </div>
                  <span className="text-[12px] font-bold text-slate-400 uppercase">Pending</span>
                </div>
              </div>
            </div>

          </div>



          {/*  COLUMN 3  */}
          <div className="space-y-8 md:col-span-6 lg:col-span-3 lg:-mt-3 mt-0">

            {/* Project List Section */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 mt-4 rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] h-full">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Project</h2>
                <button className="text-[13px] font-bold border border-green-800 px-5 py-1.5 rounded-full text-green-800 hover:bg-slate-50 transition-colors flex items-center gap-1">
                  <span className="text-lg leading-none">+</span> New
                </button>
              </div>

              <div className="space-y-7">
                {projects && projects.length > 0 ? (
                  projects.map((project, i) => (
                    <div key={project.id} className="flex items-center gap-5 group cursor-pointer">
                      {/* Custom Icon/Logo based on image_bbbf61.png */}
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center relative overflow-hidden`}>
                        {/* Placeholder for the unique abstract shapes in the image */}
                        {i === 0 && (
                          <div className="flex gap-1 transform rotate-45">
                            <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                            <div className="w-1.5 h-6 bg-blue-600 rounded-full opacity-60" />
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-auto" />
                          </div>
                        )}
                        {i === 1 && (
                          <div className="w-7 h-7 border-4 border-teal-500 rounded-full flex items-end justify-center">
                            <div className="w-full h-1/2 bg-teal-800" />
                          </div>
                        )}
                        {i === 2 && (
                          <div className="flex gap-0.5">
                            <div className="w-3 h-3 bg-green-400 rounded-full rounded-tr-none" />
                            <div className="w-3 h-3 bg-purple-400 rounded-full rounded-tl-none" />
                          </div>
                        )}
                        {i === 3 && <div className="w-7 h-7 bg-yellow-400 rounded-full rounded-br-none rotate-45" />}
                        {i === 4 && (
                          <div className="flex -space-x-1">
                            <div className="w-4 h-4 bg-orange-500 rounded-full" />
                            <div className="w-4 h-4 bg-purple-900 rounded-full" />
                          </div>
                        )}
                        {i > 4 && (
                          <div className="text-[12px] font-bold text-slate-700">{project.name.charAt(0)}</div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <p className="text-[17px] font-bold text-slate-900 leading-tight group-hover:text-[#14532D] transition-colors">
                          {project.name}
                        </p>
                        <p className="text-[13px] font-medium text-slate-400 mt-0.5">
                          Sales: <span className="text-slate-400/80">{project.sales}</span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-400">No projects found</div>
                )}
              </div>
            </div>
            {/* Time Tracker Card */}

            <div className="bg-[#0b2b1f] p-5 mb-10 rounded-[32px] text-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] relative overflow-hidden h-[200px] sm:h-[240px] flex flex-col justify-between group">
              {/* High Opacity Background Wave - Image matching */}
              <img
                src={greenWave}
                alt=""
                className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
              />

              <div className="relative z-10 flex flex-col h-full justify-between">
                {/* Title */}
                <p className="text-2xl tracking-tight">
                  Time Tracker
                </p>

                {/* Timer Display */}
                <div className="text-[40px] sm:text-[56px] lg:text-[64px] font-medium text-center tracking-tight leading-none my-2">
                  01:24:08
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center gap-5 mb-2">
                  {/* Pause Button */}
                  <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#0b2b1f] shadow-lg hover:bg-slate-100 transition-colors">
                    <Pause size={28} fill="#0b2b1f" strokeWidth={0} />
                  </button>

                  {/* Stop Button */}
                  <button className="w-16 h-16 bg-[#eb4c42] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#d4433a] transition-colors">
                    <div className="w-6 h-6 bg-white rounded-md" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;