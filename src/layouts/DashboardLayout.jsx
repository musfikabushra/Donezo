// import Sidebar from "../Components/Sidebar";

// import Navbar from "../Components/Navbar";

// const DashboardLayout = ({ children }) => {
//   return (
//     <div className="flex bg-gray-100 min-h-screen">

//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 p-4">

//         <Navbar />

//         <div className="mt-4">
//           {children}
//         </div>

//       </div>

//     </div>
//   );
// };

// export default DashboardLayout;

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#F8FAFB] overflow-hidden">
      
      {/* 1. Sidebar - Fixed width for consistency */}
      <aside className="w-72 h-full hidden lg:block border-r border-slate-100 bg-white">
        <Sidebar />
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* Navbar - Sticky or at the top */}
        <header className="px-8 py-4 bg-[#F8FAFB]">
          <Navbar />
        </header>

        {/* Content Section - With enough padding for grid alignment */}
        <section className="px-8 pb-8 flex-1">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </section>

      </main>

    </div>
  );
};

export default DashboardLayout;