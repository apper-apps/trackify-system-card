import invoicesData from "@/services/mockData/invoices.json";

let invoices = [...invoicesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const invoiceService = {
  async getAll() {
    await delay(300);
    return [...invoices];
  },

  async getById(id) {
    await delay(200);
    const invoice = invoices.find(i => i.Id === parseInt(id));
    return invoice ? { ...invoice } : null;
  },

  async getByClientId(clientId) {
    await delay(250);
    return invoices.filter(i => i.clientId === parseInt(clientId));
  },

  async create(invoiceData) {
    await delay(250);
    const newInvoice = {
      ...invoiceData,
      Id: Math.max(...invoices.map(i => i.Id)) + 1,
      status: "draft"
    };
    invoices.push(newInvoice);
    return { ...newInvoice };
  },

  async update(id, invoiceData) {
    await delay(250);
    const index = invoices.findIndex(i => i.Id === parseInt(id));
    if (index !== -1) {
      invoices[index] = { ...invoices[index], ...invoiceData };
      return { ...invoices[index] };
    }
    return null;
  },

  async delete(id) {
    await delay(200);
    const index = invoices.findIndex(i => i.Id === parseInt(id));
    if (index !== -1) {
      invoices.splice(index, 1);
      return true;
    }
    return false;
  }
};