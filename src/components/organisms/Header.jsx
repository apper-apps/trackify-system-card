import React from "react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/molecules/ThemeToggle";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
          >
            <ApperIcon name="Menu" className="w-5 h-5" />
          </motion.button>
          
          <div className="lg:hidden flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Trackify Pro
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
          >
            <ApperIcon name="Bell" className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
          >
            <ApperIcon name="Settings" className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;