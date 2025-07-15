import React from "react";
import { motion } from "framer-motion";
import TaskList from "@/components/organisms/TaskList";

const Tasks = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TaskList />
    </motion.div>
  );
};

export default Tasks;