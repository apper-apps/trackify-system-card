import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  gradient = "from-primary-500 to-secondary-500",
  className 
}) => {
  const isPositiveTrend = trend === "up";
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn("relative overflow-hidden", className)}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {title}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {value}
              </p>
              {trend && (
                <div className="flex items-center space-x-1">
                  <ApperIcon 
                    name={isPositiveTrend ? "TrendingUp" : "TrendingDown"}
                    className={cn(
                      "w-4 h-4",
                      isPositiveTrend ? "text-green-500" : "text-red-500"
                    )}
                  />
                  <span className={cn(
                    "text-sm font-medium",
                    isPositiveTrend ? "text-green-600" : "text-red-600"
                  )}>
                    {trendValue}
                  </span>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
              <ApperIcon name={icon} className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;