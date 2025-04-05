import axios from "axios";

export interface Agent {
  agent_id: string;
  agent_name: string;
  agent_description: string;
  icon: string;
  install_count: number;
}

const API_URL = "/api";

export const api = axios.create({
  baseURL: API_URL,
});

export const marketplaceApi = {
  getAgents: async (): Promise<Agent[]> => {
    const response = await api.get<Agent[]>("/marketplace-agents");
    return response.data;
  },
};
