import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const NavItem = ({ to, icon, label, isCollapsed = false }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
          isActive
            ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <ApperIcon 
              name={icon} 
              className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400 group-hover:text-primary-500"}`}
            />
          </motion.div>
          {!isCollapsed && (
            <span className="font-medium">{label}</span>
          )}
        </>
      )}
    </NavLink>
  );
};

export default NavItem;