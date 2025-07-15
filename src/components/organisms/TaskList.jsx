import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import TaskItem from "@/components/molecules/TaskItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";
import { projectService } from "@/services/api/projectService";
import { toast } from "react-toastify";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const [tasksData, projectsData] = await Promise.all([
        taskService.getAll(),
        projectService.getAll()
      ]);

      // Create project lookup map
      const projectMap = {};
      projectsData.forEach(project => {
        projectMap[project.Id] = project;
      });

      setTasks(tasksData);
      setProjects(projectMap);
    } catch (err) {
      setError("Failed to load tasks");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      const updatedTask = await taskService.update(taskId, {
        ...task,
        completed: !task.completed
      });
      
      setTasks(tasks.map(t => t.Id === taskId ? updatedTask : t));
      toast.success(`Task ${updatedTask.completed ? "completed" : "reopened"}`);
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         projects[task.projectId]?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "completed" && task.completed) ||
                         (statusFilter === "pending" && !task.completed);
    return matchesSearch && matchesStatus;
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTasks} />;

  const statusOptions = [
    { value: "all", label: "All Tasks" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track your project tasks and deadlines
          </p>
        </div>
        <Button>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
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

      {filteredTasks.length === 0 ? (
        <Empty
          icon="CheckSquare"
          title="No tasks found"
          description="Start organizing your work by creating your first task"
          actionLabel="New Task"
          onAction={() => toast.info("New task functionality would open here")}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <TaskItem
                task={task}
                project={projects[task.projectId]}
                onToggle={handleToggleTask}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TaskList;