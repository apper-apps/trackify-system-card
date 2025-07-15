import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const ClientRow = ({ client, projectCount, onClick }) => {
  return (
    <motion.tr
      whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.05)" }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="cursor-pointer border-b border-gray-200 dark:border-gray-700"
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {client.name.split(" ").map(n => n[0]).join("").toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {client.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {client.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 dark:text-white">
          {client.company}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 dark:text-white">
          {projectCount} projects
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          ${client.totalValue.toLocaleString()}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {format(new Date(client.createdAt), "MMM dd, yyyy")}
        </div>
      </td>
      <td className="px-6 py-4">
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <ApperIcon name="MoreHorizontal" className="w-5 h-5" />
        </button>
      </td>
    </motion.tr>
  );
};

export default ClientRow;