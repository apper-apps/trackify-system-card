import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Progress from "@/components/atoms/Progress";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const ProjectCard = ({ project, client, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "active";
      case "completed": return "completed";
      case "pending": return "pending";
      case "on-hold": return "on-hold";
      default: return "default";
    }
  };

  const isOverdue = new Date(project.deadline) < new Date() && project.status !== "completed";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {project.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {client?.company || "Unknown Client"}
              </p>
            </div>
            <Badge variant={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {project.progress}%
              </span>
            </div>
            <Progress value={project.progress} />

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <ApperIcon name="Calendar" className="w-4 h-4 text-gray-400" />
                <span className={`${isOverdue ? "text-red-500" : "text-gray-600 dark:text-gray-400"}`}>
                  {format(new Date(project.deadline), "MMM dd, yyyy")}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <ApperIcon name="DollarSign" className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  ${project.budget.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;