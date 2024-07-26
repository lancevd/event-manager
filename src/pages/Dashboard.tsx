import React, { useState } from "react";
import DashboardNav from "../components/dashboard/DashboardNav";
import Sidebar from "../components/dashboard/Sidebar";
import EventTable from "../components/dashboard/EventTable";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-screen overflow-y-auto antialiased">
      <DashboardNav onToggleSidebar={handleToggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleToggleSidebar} />
      <main className="p-4 md:ml-64 h-auto pt-20">
        <EventTable />
      </main>
    </div>
  );
};

export default Dashboard;
