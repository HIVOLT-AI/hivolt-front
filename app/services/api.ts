import axios from "axios";

// API 응답 타입 정의
export interface Agent {
  agent_id: string;
  agent_name: string;
  agent_description: string;
  icon: string;
  install_count: number;
}

export interface AgentDetail {
  _id: string;
  name: string;
  description: string;
  icon: string;
  required_tools: Tool[];
  required_mcps: string[];
  version: string;
  author: string;
  is_active: boolean;
  install_count: number;
  tools: Tool[];
  mcps: string[];
}

export interface Tool {
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateAgentPayload {
  name: string;
  agent_id: string;
  owner_id: string;
  address: string;
  prompts: string;
  icon: string;
}

// 서버 API 엔드포인트 설정 - 클라이언트에서 직접 호출
const API_BASE_URL = "https://hibolt-server.memetus.store/api";

// 외부 API를 직접 호출하는 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-owner-id": "35KKDFQ2dQ2F8bV7FHT5xzStws1jrZzorC6AAEXQpTNe",
  },
});

// 클라이언트 API 함수들 - 외부 API 직접 호출
export const marketplaceApi = {
  // 모든 에이전트 목록 가져오기
  getAgents: async (): Promise<Agent[]> => {
    const response = await apiClient.get<Agent[]>("/marketplace-agents");
    return response.data;
  },

  // 특정 ID의 에이전트 상세 정보 가져오기
  getAgentById: async (id: string): Promise<AgentDetail> => {
    const response = await apiClient.get<AgentDetail>(
      `/marketplace-agents/${id}`
    );
    return response.data;
  },
};

export const agentApi = {
  // 사용자 에이전트 목록 가져오기
  getUserAgents: async (address: string): Promise<Agent[]> => {
    const response = await apiClient.get<Agent[]>(`/agents?address=${address}`);
    return response.data;
  },

  // 저장된 에이전트 목록 가져오기
  getSavedAgents: async (): Promise<Agent[]> => {
    const response = await apiClient.get<Agent[]>(`/saved-agents`);
    return response.data;
  },

  // 새 에이전트 생성하기
  createAgent: async (
    payload: CreateAgentPayload
  ): Promise<{ success: boolean }> => {
    const response = await apiClient.post("/agents", payload);
    return response.data;
  },

  // 에이전트 삭제하기
  deleteAgent: async (id: string): Promise<void> => {
    await apiClient.delete(`/agents/${id}`);
  },
};

export const userApi = {
  login: async (address: string) => {
    try {
      const response = await apiClient.post("/auth/login", {
        address,
      });

      console.log("Login request:");
      console.log("Login response:", response.data);

      return response.data;
    } catch {
      throw new Error("Login failed");
    }
  },
};
