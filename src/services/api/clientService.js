import clientsData from "@/services/mockData/clients.json";

let clients = [...clientsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const clientService = {
  async getAll() {
    await delay(300);
    return [...clients];
  },

  async getById(id) {
    await delay(200);
    const client = clients.find(c => c.Id === parseInt(id));
    return client ? { ...client } : null;
  },

  async create(clientData) {
    await delay(250);
    const newClient = {
      ...clientData,
      Id: Math.max(...clients.map(c => c.Id)) + 1,
      createdAt: new Date().toISOString(),
      totalValue: 0
    };
    clients.push(newClient);
    return { ...newClient };
  },

  async update(id, clientData) {
    await delay(250);
    const index = clients.findIndex(c => c.Id === parseInt(id));
    if (index !== -1) {
      clients[index] = { ...clients[index], ...clientData };
      return { ...clients[index] };
    }
    return null;
  },

  async delete(id) {
    await delay(200);
    const index = clients.findIndex(c => c.Id === parseInt(id));
    if (index !== -1) {
      clients.splice(index, 1);
      return true;
    }
    return false;
  }
};