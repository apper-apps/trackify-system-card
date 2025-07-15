import React from "react";
import { motion } from "framer-motion";
import NavItem from "@/components/molecules/NavItem";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ isOpen, onClose, isCollapsed = false }) => {
  const navigationItems = [
    { to: "/", icon: "LayoutDashboard", label: "Dashboard" },
    { to: "/clients", icon: "Users", label: "Clients" },
    { to: "/projects", icon: "FolderKanban", label: "Projects" },
    { to: "/tasks", icon: "CheckSquare", label: "Tasks" },
    { to: "/invoices", icon: "FileText", label: "Invoices" },
  ];

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className={`hidden lg:flex flex-col bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-gray-700 ${isCollapsed ? "w-16" : "w-64"} transition-all duration-300`}>
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <ApperIcon name="Zap" className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold font-display bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Trackify Pro
            </span>
          )}
        </div>
      </div>
      
      <nav className="flex-1 px-4 pb-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </nav>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-gray-700 z-50 flex flex-col"
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Trackify Pro
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <nav className="flex-1 px-4 pb-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                onClick={onClose}
              />
            ))}
          </div>
        </nav>
      </motion.div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;