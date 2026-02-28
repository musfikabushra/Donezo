import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen bg-[#F8FAFB]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="lg:ml-72 h-full flex flex-col overflow-y-auto">

        {/* Navbar */}
        <header className="px-8 py-4 bg-[#F8FAFB]">
          <Navbar />
        </header>

        {/* Page Content */}
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