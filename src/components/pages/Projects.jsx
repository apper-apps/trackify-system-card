import React from "react";
import { motion } from "framer-motion";
import ProjectGrid from "@/components/organisms/ProjectGrid";

const Projects = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ProjectGrid />
    </motion.div>
  );
};

export default Projects;