import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ProjectCard from "@/components/molecules/ProjectCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { projectService } from "@/services/api/projectService";
import { clientService } from "@/services/api/clientService";
import { toast } from "react-toastify";

const ProjectGrid = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const [projectsData, clientsData] = await Promise.all([
        projectService.getAll(),
        clientService.getAll()
      ]);

      // Create client lookup map
      const clientMap = {};
      clientsData.forEach(client => {
        clientMap[client.Id] = client;
      });

      setProjects(projectsData);
      setClients(clientMap);
    } catch (err) {
      setError("Failed to load projects");
      console.error("Error loading projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleProjectClick = (project) => {
    toast.info(`Viewing details for ${project.name}`);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clients[project.clientId]?.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProjects} />;

  const statusOptions = [
    { value: "all", label: "All Projects" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "on-hold", label: "On Hold" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track progress and manage your active projects
          </p>
        </div>
        <Button>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search projects..."
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

      {filteredProjects.length === 0 ? (
        <Empty
          icon="FolderKanban"
          title="No projects found"
          description="Create your first project to start tracking progress and managing tasks"
          actionLabel="New Project"
          onAction={() => toast.info("New project functionality would open here")}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard
                project={project}
                client={clients[project.clientId]}
                onClick={() => handleProjectClick(project)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ProjectGrid;