"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { agentApi, MyAgent } from "@/app/services/api";
import MyAgentSkeleton from "@/app/components/skeletons/MyAgentSkeleton";

export default function MyAgentsPage() {
  const router = useRouter();

  const { data: myAgents = [], isLoading } = useQuery<MyAgent[]>({
    queryKey: ["myAgents"],
    queryFn: agentApi.getMyAgents,
  });

  const handleAgentClick = (agentId: string, agentName: string) => {
    router.push(`/my-agents/${agentId}?name=${encodeURIComponent(agentName)}`);
  };

  const formatCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };

  // API 데이터를 UI 표시용 데이터로 변환
  const agentsForDisplay = myAgents.map((agent) => ({
    id: agent._id || agent.agent_id,
    name: agent.name,
    nav: `$${agent.nav.toFixed(1)}K`,
    realized:
      agent.realized_pnl >= 0
        ? `+$${agent.realized_pnl.toFixed(1)}K`
        : `-$${Math.abs(agent.realized_pnl).toFixed(1)}K`,
    unrealized:
      agent.unrealized_pnl >= 0
        ? `+$${agent.unrealized_pnl.toFixed(1)}K`
        : `-$${Math.abs(agent.unrealized_pnl).toFixed(1)}K`,
    totalPnl:
      agent.total_pnl_percentage >= 0
        ? `+${agent.total_pnl_percentage}%`
        : `-${Math.abs(agent.total_pnl_percentage)}%`,
    status: agent.status === "live" ? "Live" : "Paused",
    statusColor:
      agent.status === "live"
        ? "bg-green-900 text-green-500"
        : "bg-red-900 text-red-500",
    icon: agent.icon,
  }));

  if (!isLoading && agentsForDisplay.length === 0) {
    return (
      <div className="h-[calc(100vh-100px)] bg-transparent px-6 py-8 overflow-hidden">
        <h1 className="text-4xl font-bold text-white">MY AGENTS</h1>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <button
            onClick={() => router.push("/create-agent")}
            className="rounded-full bg-white px-8 py-3 font-bold text-black hover:bg-opacity-90"
          >
            CREATE AN AGENT
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-100px)] bg-transparent px-6 py-8 overflow-hidden">
      <h1 className="text-4xl font-bold text-white mb-8">MY AGENTS</h1>

      {isLoading ? (
        <div className="w-full h-[calc(100vh-200px)]">
          <MyAgentSkeleton />
        </div>
      ) : (
        <div className="w-full h-[calc(100vh-200px)]">
          <div className="border border-white rounded-lg mb-3 bg-transparent h-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left bg-white rounded-lg overflow-hidden">
                  <th className="py-4 px-5 font-medium text-black w-1/7 first:rounded-tl-lg">
                    Agent
                  </th>
                  <th className="py-4 px-5 font-medium text-black w-1/7">
                    <div className="flex items-center">
                      <span>NAV</span>
                      <Image
                        src="/up_down.svg"
                        width={11}
                        height={17}
                        alt="Sort"
                        className="ml-0.5"
                      />
                    </div>
                  </th>
                  <th className="py-4 px-5 font-medium text-black w-1/7">
                    <div className="flex items-center">
                      <span>Realized</span>
                      <Image
                        src="/up_down.svg"
                        width={11}
                        height={17}
                        alt="Sort"
                        className="ml-0.5"
                      />
                    </div>
                  </th>
                  <th className="py-4 px-5 font-medium text-black w-1/7">
                    <div className="flex items-center">
                      <span>Unrealized</span>
                      <Image
                        src="/up_down.svg"
                        width={11}
                        height={17}
                        alt="Sort"
                        className="ml-0.5"
                      />
                    </div>
                  </th>
                  <th className="py-4 px-5 font-medium text-black w-1/7">
                    <div className="flex items-center">
                      <span>Total PnL</span>
                      <Image
                        src="/up_down.svg"
                        width={11}
                        height={17}
                        alt="Sort"
                        className="ml-0.5"
                      />
                    </div>
                  </th>
                  <th className="py-4 px-5 font-medium text-black w-1/7">
                    Status
                  </th>
                  <th className="py-4 px-5 font-medium text-black w-1/7 last:rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {agentsForDisplay.map((agent, index) => (
                  <tr
                    key={agent.id}
                    className={`border-t border-white cursor-pointer hover:bg-white/10 ${index === agentsForDisplay.length - 1 ? "last:rounded-b-lg" : ""}`}
                    onClick={() => handleAgentClick(agent.id, agent.name)}
                  >
                    <td
                      className={`py-5 px-5 text-white font-bold truncate ${index === agentsForDisplay.length - 1 ? "first:rounded-bl-lg" : ""}`}
                    >
                      {agent.name}
                    </td>
                    <td className="py-5 px-5 text-white">{agent.nav}</td>
                    <td
                      className={`py-5 px-5 ${agent.realized.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                    >
                      {agent.realized}
                    </td>
                    <td
                      className={`py-5 px-5 ${agent.unrealized.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                    >
                      {agent.unrealized}
                    </td>
                    <td
                      className={`py-5 px-5 ${agent.totalPnl.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                    >
                      {agent.totalPnl}
                    </td>
                    <td className="py-5 px-5">
                      <div
                        className={`px-3 py-1 rounded text-sm font-medium inline-block ${agent.statusColor}`}
                      >
                        {agent.status}
                      </div>
                    </td>
                    <td
                      className={`py-5 px-5 ${index === agentsForDisplay.length - 1 ? "last:rounded-br-lg" : ""}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center w-[280px]">
                        {agent.status === "Live" ? (
                          <button className="flex items-center justify-center w-16 h-10 rounded-full bg-[#990000]">
                            <div className="flex items-center justify-center space-x-1.5">
                              <div className="w-1.5 h-6 bg-red-500 rounded-sm"></div>
                              <div className="w-1.5 h-6 bg-red-500 rounded-sm"></div>
                            </div>
                          </button>
                        ) : (
                          <button className="flex items-center justify-center w-16 h-10 rounded-full bg-[#006633] ">
                            <div className="w-0 h-0 ml-1 border-y-[8px] border-y-transparent border-l-[16px] border-l-green-500"></div>
                          </button>
                        )}
                        <button className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                          + fund
                        </button>
                        <button className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                          - fund
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-right text-[#999999] text-xs">
            updates every 1 hour / last updated {formatCurrentTime()}
          </div>
        </div>
      )}
    </div>
  );
}
