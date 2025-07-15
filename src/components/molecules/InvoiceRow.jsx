import React from "react";
import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const InvoiceRow = ({ invoice, client, project, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "paid": return "success";
      case "pending": return "warning";
      case "overdue": return "danger";
      case "draft": return "default";
      default: return "default";
    }
  };

  return (
    <motion.tr
      whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.05)" }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="cursor-pointer border-b border-gray-200 dark:border-gray-700"
    >
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          INV-{invoice.Id.toString().padStart(4, "0")}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 dark:text-white">
          {client?.name || "Unknown Client"}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {client?.company || ""}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 dark:text-white">
          {project?.name || "Unknown Project"}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          ${invoice.amount.toLocaleString()}
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge variant={getStatusColor(invoice.status)}>
          {invoice.status}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {format(new Date(invoice.dueDate), "MMM dd, yyyy")}
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

export default InvoiceRow;