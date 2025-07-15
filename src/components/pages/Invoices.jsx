import React from "react";
import { motion } from "framer-motion";
import InvoiceList from "@/components/organisms/InvoiceList";

const Invoices = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <InvoiceList />
    </motion.div>
  );
};

export default Invoices;