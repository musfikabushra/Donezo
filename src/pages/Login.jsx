// import { useState, useEffect } from "react";

// import { useNavigate } from "react-router-dom";
// import API from "../services/api";
// import useAuth from "../hooks/useAuth";
// import AuthLayout from "../layouts/AuthLayout";
// import { DEMO_CREDENTIALS as demo } from "../config";

// const Login = () => {

//   const [email, setEmail] = useState(demo.email);
//   const [password, setPassword] = useState(demo.password);

//   const { token, login } = useAuth();
//   const navigate = useNavigate();

//   // if already authenticated, send straight to dashboard
//   useEffect(() => {
//     if (token) {
//       navigate("/dashboard", { replace: true });
//     }
//   }, [token, navigate]);

//   const handleLogin = async (e) => {

//     e.preventDefault();

//     try {

//       const res = await API.post("/api/login", {
//         email,
//         password,
//       });

//       // store token and basic user info returned by the API
//       login(res.data.token, { id: res.data.id, email: res.data.email });

//       navigate("/dashboard");

//     } catch {
//       alert("Login failed");
//     }
//   };

//   return (
//     <AuthLayout>

//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-6 rounded-xl w-80"
//       >

//         <h2 className="text-2xl font-bold mb-4">
//           Login
//         </h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded mb-3"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full bg-gray-50 p-2 border rounded mb-3"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           className="w-full bg-green-700 text-black p-2 rounded"
//         >
//           Login
//         </button>

//         <p className="text-xs mt-3">
//           email: {demo.email}
//           <br />
//           password: {demo.password}
//         </p>

//       </form>

//     </AuthLayout>
//   );
// };

// export default Login;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import AuthLayout from "../layouts/AuthLayout";
import { DEMO_CREDENTIALS as demo } from "../config";
// Logo import (Ensure path is correct based on your folder structure)
import donezoLogo from "../assets/donezo.png"; 

const Login = () => {
  const [email, setEmail] = useState(demo.email);
  const [password, setPassword] = useState(demo.password);
  const [isLoading, setIsLoading] = useState(false);

  const { token, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post("/api/login", { email, password });
      login(res.data.token, { id: res.data.id, email: res.data.email });
      navigate("/dashboard");
    } catch {
      alert("Login failed. Check your information.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFA] p-6 font-sans">
        {/* Main Container */}
        <div className="bg-white w-full max-w-[440px] rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-10 relative overflow-hidden">
          
          {/* Logo Section - Fixed with Donezo Image */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden p-1.5">
              <img 
                src={donezoLogo} 
                alt="Donezo Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-[#14532D] tracking-tight">Donezo</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Login</h2>
            <p className="text-slate-500 mt-2 font-medium">Plan, prioritize, and accomplish tasks.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#14532D] transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="user1@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-[#F8FAFA] border border-transparent rounded-[1.2rem] focus:bg-white focus:border-[#14532D] focus:ring-4 focus:ring-green-50/50 outline-none transition-all placeholder:text-slate-300 text-slate-700 font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <button type="button" className="text-xs font-bold text-[#14532D] hover:text-green-700 transition-all">Forgot Password?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#14532D] transition-colors" size={20} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-[#F8FAFA] border border-transparent rounded-[1.2rem] focus:bg-white focus:border-[#14532D] focus:ring-4 focus:ring-green-50/50 outline-none transition-all placeholder:text-slate-300 text-slate-700 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#14532D] to-[#247543] hover:shadow-lg hover:shadow-green-900/20 text-white font-bold py-4 rounded-[1.2rem] transition-all active:scale-[0.98] flex items-center justify-center gap-3 group mt-4 shadow-md shadow-green-900/10"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                <>
                  <span className="text-lg">Sign In</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Footer */}
          <div className="mt-10 p-5 bg-[#F8FAFA] border border-slate-100 rounded-[1.5rem]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Demo Access</span>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-slate-500 flex justify-between">
                <span>Email</span> 
                <span className="font-bold text-slate-800">{demo.email}</span>
              </div>
              <div className="text-xs text-slate-500 flex justify-between">
                <span>Password</span> 
                <span className="font-bold text-slate-800">{demo.password}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;