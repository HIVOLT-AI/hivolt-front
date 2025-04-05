"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MyAgentsPage() {
  const router = useRouter();

  // 에이전트 디테일 페이지로 이동하는 함수
  const handleAgentClick = (agentId: string, agentName: string) => {
    router.push(`/my-agents/${agentId}?name=${encodeURIComponent(agentName)}`);
  };

  // 현재 시간 포맷팅
  const formatCurrentTime = () => {
    return "23:00 23/01/2025";
  };

  // 데모 데이터 - 실제 구현에서는 API에서 받아온 데이터로 대체
  const demoAgents = [
    {
      id: "1",
      name: "SANCTUM OPTIMIZER",
      nav: "$425.1K",
      realized: "+$12.2K",
      unrealized: "+$12.2K",
      totalPnl: "+13%",
      status: "Live",
      statusColor: "bg-green-900 text-green-500",
    },
    {
      id: "2",
      name: "WORMHOLE MULTICHAIN SEEKER",
      nav: "$425.1K",
      realized: "+$12.2K",
      unrealized: "-$12.2K",
      totalPnl: "+13%",
      status: "Paused",
      statusColor: "bg-red-900 text-red-500",
    },
  ];

  return (
    <div className="h-[calc(100vh-100px)] bg-transparent px-6 py-8 overflow-hidden">
      <h1 className="text-4xl font-bold text-white mb-8">MY AGENTS</h1>

      <div className="w-full h-[calc(100vh-200px)]">
        <div className="border border-white rounded-lg mb-3 bg-transparent h-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-white">
                <th className="py-4 px-5 font-medium text-black w-1/7">
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
                <th className="py-4 px-5 font-medium text-black w-1/7">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {demoAgents.map((agent) => (
                <tr
                  key={agent.id}
                  className="border-t border-white cursor-pointer hover:bg-white/10"
                  onClick={() => handleAgentClick(agent.id, agent.name)}
                >
                  <td className="py-5 px-5 text-white font-bold">
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
                    className="py-5 px-5"
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
    </div>
  );
}
