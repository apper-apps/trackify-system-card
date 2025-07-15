import React from "react";
import { motion } from "framer-motion";
import ClientList from "@/components/organisms/ClientList";

const Clients = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ClientList />
    </motion.div>
  );
};

export default Clients;