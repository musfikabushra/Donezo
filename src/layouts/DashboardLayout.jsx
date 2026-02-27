import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4">

        <Navbar />

        <div className="mt-4">
          {children}
        </div>

      </div>

    </div>
  );
};

export default DashboardLayout;