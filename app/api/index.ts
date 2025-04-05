import { NextResponse } from "next/server";

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
  required_mcps: any[];
  version: string;
  author: string;
  is_active: boolean;
  install_count: number;
  tools: any[];
  mcps: any[];
}

export interface Tool {
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API 엔드포인트 설정
const API_BASE_URL = "https://hibolt-server.memetus.store/api";

/**
 * 전체 에이전트 목록을 가져오는 함수
 * @param req Request 객체
 */
export async function fetchAllAgents(req?: Request) {
  try {
    const response = await fetch(`${API_BASE_URL}/marketplace-agents`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching marketplace agents:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

/**
 * 특정 ID의 에이전트 상세 정보를 가져오는 함수
 * @param id 에이전트 ID
 * @param req Request 객체
 */
export async function fetchAgentById(id: string, req?: Request) {
  try {
    const response = await fetch(`${API_BASE_URL}/marketplace-agents/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching agent with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch agent data" },
      { status: 500 }
    );
  }
}
