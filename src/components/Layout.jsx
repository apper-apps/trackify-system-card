import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-900">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={handleSidebarClose}
        isCollapsed={sidebarCollapsed}
      />
      
      <div className={`flex-1 flex flex-col overflow-hidden ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"} transition-all duration-300`}>
        <Header onMenuClick={handleMenuClick} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;