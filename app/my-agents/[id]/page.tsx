"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AgentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const searchParams = useSearchParams();
  const agentName = searchParams.get("name") || "SANCTUM OPTIMIZER";

  // 에이전트 상태 관리
  const [agentStatus, setAgentStatus] = useState<"LIVE" | "PAUSED">("LIVE");

  // 페이지네이션 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 데모 에이전트 정보
  const agentInfo = {
    id: params.id,
    name: agentName,
    nav: "$425.1K",
    realized: "+$12.3K",
    unrealized: "+$12.2K",
    totalPnl: "+13%",
    status: agentStatus,
  };

  // 상태 토글 함수
  const toggleAgentStatus = () => {
    setAgentStatus((prevStatus) => (prevStatus === "LIVE" ? "PAUSED" : "LIVE"));
  };

  // 프롬프트 정보
  const promptInfo =
    "I want to replicate part of my funds in Sanctum. Compare price, APY and...";

  // 트랜잭션 로그 데이터 - 더 많은 데이터 생성
  const allTransactions = Array(20)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      tool: `SanctumOptimizeTool_${index + 1}`,
      log: `Moved funds from IMF to jltsol - Transaction ${index + 1}`,
      solscan: `https://solscan.io/tx/123456${index}`,
      time:
        index < 5
          ? "1h ago"
          : index < 10
            ? "2h ago"
            : index < 15
              ? "3h ago"
              : "4h ago",
    }));

  // 페이지네이션 처리
  const totalPages = Math.ceil(allTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = allTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // 페이지 변경 함수
  const goToPage = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white px-6 py-8">
      <div className="flex items-center mb-10">
        <h1 className="text-4xl font-bold mr-auto">MY AGENTS</h1>
      </div>

      <div className="flex items-center mb-4">
        <Link
          href="/my-agents"
          className="text-white mr-4 hover:opacity-80 transition-opacity"
        >
          <span className="text-2xl">←</span>
        </Link>
      </div>
      <h2 className="text-5xl font-bold mb-10">{agentInfo.name}</h2>
      <div className="mb-10">
        <h3 className="text-md text-white uppercase mb-3 font-bold">PROMPTS</h3>
        <div className="bg-transparent p-4 rounded border border-gray-800">
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
              S
            </div>
            <div className="flex-1">
              <p className="text-gray-300">{promptInfo}</p>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <span>▼</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-md text-white uppercase mb-3 font-bold">
          FUND AMOUNT
        </h3>
        <div className="flex items-center">
          <span className="text-gray-300 mr-2">10</span>
          <span className="text-white">$SOL</span>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-md text-white uppercase mb-3 font-bold">STATS</h3>
        <div className="overflow-x-auto">
          <div className="border border-white rounded-lg mb-3 bg-transparent">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left bg-white">
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
                <tr className="border-t border-white">
                  <td className="py-5 px-5 text-white">{agentInfo.nav}</td>
                  <td
                    className={`py-5 px-5 ${agentInfo.realized.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                  >
                    {agentInfo.realized}
                  </td>
                  <td
                    className={`py-5 px-5 ${agentInfo.unrealized.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                  >
                    {agentInfo.unrealized}
                  </td>
                  <td
                    className={`py-5 px-5 ${agentInfo.totalPnl.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                  >
                    {agentInfo.totalPnl}
                  </td>
                  <td className="py-5 px-5">
                    <div
                      className={`px-3 py-1 rounded text-sm font-medium inline-block ${agentStatus === "LIVE" ? "bg-green-900 text-green-500" : "bg-red-900 text-red-500"}`}
                    >
                      {agentStatus}
                    </div>
                  </td>
                  <td className="py-5 px-5">
                    <div className="flex justify-between items-center w-[280px]">
                      {agentStatus === "LIVE" ? (
                        <button
                          onClick={toggleAgentStatus}
                          className="flex items-center justify-center w-16 h-10 rounded-full bg-[#990000]"
                        >
                          <div className="flex items-center justify-center space-x-1.5">
                            <div className="w-1.5 h-6 bg-red-500 rounded-sm"></div>
                            <div className="w-1.5 h-6 bg-red-500 rounded-sm"></div>
                          </div>
                        </button>
                      ) : (
                        <button
                          onClick={toggleAgentStatus}
                          className="flex items-center justify-center w-16 h-10 rounded-full bg-[#006633]"
                        >
                          <div className="w-0 h-0 ml-1 border-y-[8px] border-y-transparent border-l-[16px] border-l-green-500"></div>
                        </button>
                      )}
                      <button className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                        + fund
                      </button>
                      <button className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                        - fund
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-md text-white uppercase mb-3 font-bold">
            TRANSACTION LOGS
          </h3>
          <div className="flex items-center space-x-2">
            <button
              className="px-2 py-1 hover:bg-white/10 rounded transition-colors text-white text-2xl"
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            <button
              className="px-2 py-1 hover:bg-white/10 rounded transition-colors text-white text-2xl"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            <span className="px-2 py-1 text-white">page {currentPage}</span>
            <button
              className="px-2 py-1 hover:bg-white/10 rounded transition-colors text-white text-2xl"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
            <button
              className="px-2 py-1 hover:bg-white/10 rounded transition-colors text-white text-2xl"
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="border border-white rounded-lg mb-3 bg-transparent">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left bg-white">
                  <th className="py-4 px-5 font-medium text-black w-1/4">
                    Tool
                  </th>
                  <th className="py-4 px-5 font-medium text-black w-1/4">
                    Log
                  </th>
                  <th className="py-4 px-5 font-medium text-black w-1/4">
                    Solscan
                  </th>
                  <th className="py-4 px-5 font-medium text-black w-1/4">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-t border-white">
                    <td className="py-4 px-5 text-white">{tx.tool}</td>
                    <td className="py-4 px-5 text-white">{tx.log}</td>
                    <td className="py-4 px-5 text-white">
                      <Link
                        href={tx.solscan}
                        target="_blank"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Image
                          src="/external_link.svg"
                          width={20}
                          height={20}
                          alt="External Link"
                          className="inline hover:opacity-80 transition-opacity"
                        />
                      </Link>
                    </td>
                    <td className="py-4 px-5 text-white">{tx.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
