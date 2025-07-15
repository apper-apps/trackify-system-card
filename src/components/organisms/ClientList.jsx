import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ClientRow from "@/components/molecules/ClientRow";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { clientService } from "@/services/api/clientService";
import { projectService } from "@/services/api/projectService";
import { toast } from "react-toastify";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [projectCounts, setProjectCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadClients = async () => {
    try {
      setLoading(true);
      setError("");

      const [clientsData, projectsData] = await Promise.all([
        clientService.getAll(),
        projectService.getAll()
      ]);

      // Calculate project counts for each client
      const counts = {};
      projectsData.forEach(project => {
        counts[project.clientId] = (counts[project.clientId] || 0) + 1;
      });

      setClients(clientsData);
      setProjectCounts(counts);
    } catch (err) {
      setError("Failed to load clients");
      console.error("Error loading clients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleClientClick = (client) => {
    toast.info(`Viewing details for ${client.name}`);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadClients} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Clients</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your client relationships and project portfolios
          </p>
        </div>
        <Button>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search clients..."
          className="flex-1"
        />
        <Button variant="secondary">
          <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {filteredClients.length === 0 ? (
        <Empty
          icon="Users"
          title="No clients found"
          description="Start building your client base by adding your first client"
          actionLabel="Add Client"
          onAction={() => toast.info("Add client functionality would open here")}
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
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Projects
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Total Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredClients.map((client) => (
                  <ClientRow
                    key={client.Id}
                    client={client}
                    projectCount={projectCounts[client.Id] || 0}
                    onClick={() => handleClientClick(client)}
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

export default ClientList;