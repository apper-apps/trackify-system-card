import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import InvoiceRow from "@/components/molecules/InvoiceRow";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { invoiceService } from "@/services/api/invoiceService";
import { clientService } from "@/services/api/clientService";
import { projectService } from "@/services/api/projectService";
import { toast } from "react-toastify";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState({});
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadInvoices = async () => {
    try {
      setLoading(true);
      setError("");

      const [invoicesData, clientsData, projectsData] = await Promise.all([
        invoiceService.getAll(),
        clientService.getAll(),
        projectService.getAll()
      ]);

      // Create lookup maps
      const clientMap = {};
      clientsData.forEach(client => {
        clientMap[client.Id] = client;
      });

      const projectMap = {};
      projectsData.forEach(project => {
        projectMap[project.Id] = project;
      });

      setInvoices(invoicesData);
      setClients(clientMap);
      setProjects(projectMap);
    } catch (err) {
      setError("Failed to load invoices");
      console.error("Error loading invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const handleInvoiceClick = (invoice) => {
    toast.info(`Viewing invoice INV-${invoice.Id.toString().padStart(4, "0")}`);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const client = clients[invoice.clientId];
    const project = projects[invoice.projectId];
    const invoiceNumber = `INV-${invoice.Id.toString().padStart(4, "0")}`;
    
    const matchesSearch = invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client?.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadInvoices} />;

  const statusOptions = [
    { value: "all", label: "All Invoices" },
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
    { value: "overdue", label: "Overdue" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Invoices</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage billing and track payment status for your projects
          </p>
        </div>
        <Button>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search invoices..."
          className="flex-1"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {filteredInvoices.length === 0 ? (
        <Empty
          icon="FileText"
          title="No invoices found"
          description="Create your first invoice to start tracking payments and billing"
          actionLabel="New Invoice"
          onAction={() => toast.info("New invoice functionality would open here")}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredInvoices.map((invoice) => (
                  <InvoiceRow
                    key={invoice.Id}
                    invoice={invoice}
                    client={clients[invoice.clientId]}
                    project={projects[invoice.projectId]}
                    onClick={() => handleInvoiceClick(invoice)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InvoiceList;