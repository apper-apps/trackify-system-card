import projectsData from "@/services/mockData/projects.json";

let projects = [...projectsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const projectService = {
  async getAll() {
    await delay(300);
    return [...projects];
  },

  async getById(id) {
    await delay(200);
    const project = projects.find(p => p.Id === parseInt(id));
    return project ? { ...project } : null;
  },

  async getByClientId(clientId) {
    await delay(250);
    return projects.filter(p => p.clientId === parseInt(clientId));
  },

  async create(projectData) {
    await delay(250);
    const newProject = {
      ...projectData,
      Id: Math.max(...projects.map(p => p.Id)) + 1,
      progress: 0,
      status: "pending"
    };
    projects.push(newProject);
    return { ...newProject };
  },

  async update(id, projectData) {
    await delay(250);
    const index = projects.findIndex(p => p.Id === parseInt(id));
    if (index !== -1) {
      projects[index] = { ...projects[index], ...projectData };
      return { ...projects[index] };
    }
    return null;
  },

  async delete(id) {
    await delay(200);
    const index = projects.findIndex(p => p.Id === parseInt(id));
    if (index !== -1) {
      projects.splice(index, 1);
      return true;
    }
    return false;
  }
};