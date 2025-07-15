import React from "react";
import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const TaskItem = ({ task, onToggle, project }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "danger";
      case "medium": return "warning";
      case "low": return "success";
      default: return "default";
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-4 p-4 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
    >
      <button
        onClick={() => onToggle(task.Id)}
        className="flex-shrink-0"
      >
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
          task.completed
            ? "bg-green-500 border-green-500"
            : "border-gray-300 dark:border-gray-600 hover:border-primary-500"
        }`}>
          {task.completed && (
            <ApperIcon name="Check" className="w-3 h-3 text-white" />
          )}
        </div>
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <h4 className={`text-sm font-medium truncate ${
            task.completed 
              ? "text-gray-500 dark:text-gray-400 line-through" 
              : "text-gray-900 dark:text-white"
          }`}>
            {task.title}
          </h4>
          <Badge variant={getPriorityColor(task.priority)} className="flex-shrink-0">
            {task.priority}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="truncate">{project?.name || "Unknown Project"}</span>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Calendar" className="w-3 h-3" />
            <span className={isOverdue ? "text-red-500" : ""}>
              {format(new Date(task.dueDate), "MMM dd")}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;