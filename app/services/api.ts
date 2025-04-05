import axios from "axios";
import type { Agent, AgentDetail } from "@/app/api";

// 클라이언트 API 경로
const API_URL = "/api";

const apiClient = axios.create({
  baseURL: API_URL,
});

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
