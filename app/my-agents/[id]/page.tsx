"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import {
  agentApi,
  AgentDetailResponse,
  TransactionLog,
} from "@/app/services/api";
import { useQuery } from "@tanstack/react-query";

export default function AgentDetailPage() {
  const params = useParams();
  const agentId = params.id as string;
  const searchParams = useSearchParams();
  const agentName = searchParams.get("name") || "Agent";

  const { data: agentDetailResponse } = useQuery<AgentDetailResponse>({
    queryKey: ["agent", agentId],
    queryFn: () => agentApi.getAgentById(agentId),
  });

  const [agentStatus, setAgentStatus] = useState<"LIVE" | "PAUSED">("LIVE");

  useEffect(() => {
    if (agentDetailResponse?.user_agent) {
      setAgentStatus(
        agentDetailResponse.user_agent.status === "live" ? "LIVE" : "PAUSED"
      );
    }
  }, [agentDetailResponse]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const agentInfo = agentDetailResponse?.user_agent
    ? {
        id: agentDetailResponse.user_agent._id,
        name: agentDetailResponse.user_agent.name,
        icon: agentDetailResponse.user_agent.icon,
        nav: `$${agentDetailResponse.user_agent.nav.toFixed(1)}K`,
        realized:
          agentDetailResponse.user_agent.realized_pnl >= 0
            ? `+$${agentDetailResponse.user_agent.realized_pnl.toFixed(1)}K`
            : `-$${Math.abs(agentDetailResponse.user_agent.realized_pnl).toFixed(1)}K`,
        unrealized:
          agentDetailResponse.user_agent.unrealized_pnl >= 0
            ? `+$${agentDetailResponse.user_agent.unrealized_pnl.toFixed(1)}K`
            : `-$${Math.abs(agentDetailResponse.user_agent.unrealized_pnl).toFixed(1)}K`,
        totalPnl:
          agentDetailResponse.user_agent.total_pnl_percentage >= 0
            ? `+${agentDetailResponse.user_agent.total_pnl_percentage}%`
            : `-${Math.abs(agentDetailResponse.user_agent.total_pnl_percentage)}%`,
        status: agentStatus,
        fundAmount: agentDetailResponse.user_agent.fund_amount,
        prompts: agentDetailResponse.user_agent.prompts,
      }
    : {
        id: agentId,
        name: agentName,
        icon: "",
        nav: "$0K",
        realized: "$0K",
        unrealized: "$0K",
        totalPnl: "0%",
        status: agentStatus,
        fundAmount: 0,
        prompts: "",
      };

  const toggleAgentStatus = () => {
    setAgentStatus((prevStatus) => (prevStatus === "LIVE" ? "PAUSED" : "LIVE"));
  };

  const allTransactions = agentDetailResponse?.transaction_logs || [];

  const totalPages = Math.ceil(allTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = allTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const formatDate = (dateString: string) => {
    try {
      const match = dateString.match(
        /(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2})/
      );

      if (match) {
        const [, year, month, day, hour, minute] = match;
        const now = new Date();
        const targetDate = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          parseInt(hour),
          parseInt(minute)
        );

        const diffMs = now.getTime() - targetDate.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffHours < 24) {
          return `${Math.max(1, diffHours)}h ago`;
        } else {
          return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
        }
      }

      return "Recent";
    } catch (error) {
      console.error("Date parsing error:", error, dateString);
      return "Recent";
    }
  };

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
      <div className="mb-10">
        <h2 className="text-5xl font-bold">{agentInfo.name}</h2>
      </div>
      <div className="mb-10">
        <h3 className="text-md text-white uppercase mb-3 font-bold">PROMPTS</h3>
        <div className="p-4 rounded bg-white/10">
          <div className="flex items-center">
            <Image
              src={agentInfo.icon || "/default-agent-icon.png"}
              alt="Agent Icon"
              width={32}
              height={32}
              className="rounded-full mr-3"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "/default-agent-icon.png";
              }}
            />
            <div className="flex-1">
              <p className="text-gray-300">{agentInfo.prompts}</p>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Image
                src="/chevron_down.svg"
                alt="Expand"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-md text-white uppercase mb-3 font-bold">
          FUND AMOUNT
        </h3>
        <div className="flex items-center">
          <span className="text-gray-300 mr-2">{agentInfo.fundAmount}</span>
          <span className="text-white">$SOL</span>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-md text-white uppercase mb-3 font-bold">STATS</h3>
        <div className="overflow-x-auto">
          <div className="border border-white rounded-xl overflow-hidden mb-3 bg-transparent">
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
                    </div>
                  </th>
                  <th className="py-4 px-5 font-medium text-black w-1/7">
                    <div className="flex items-center">
                      <span>Unrealized</span>
                    </div>
                  </th>
                  <th className="py-4 px-5 font-medium text-black w-1/7">
                    <div className="flex items-center">
                      <span>Total PnL</span>
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
                      <button className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                        + fund
                      </button>
                      <button className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
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
          <div className="border border-white rounded-xl overflow-hidden mb-3 bg-transparent">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left bg-white">
                  <th className="py-4 px-5 font-medium text-black w-1/4">
                    Tool
                  </th>
                  <th className="py-4 px-5 font-medium text-black w-2/4">
                    Log
                  </th>
                  <th className="py-4 pr-1 pl-3 font-medium text-black w-[60px] text-center">
                    Solscan
                  </th>
                  <th className="py-4 pl-1 pr-3 font-medium text-black w-[70px] text-left">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((tx: TransactionLog) => (
                  <tr key={tx._id} className="border-t border-white">
                    <td className="py-4 px-5 text-white">{tx.tool_name}</td>
                    <td className="py-4 px-5 text-white">{tx.log}</td>
                    <td className="py-4 pr-1 pl-3 text-white text-center">
                      <Link
                        href={tx.solscan_url}
                        target="_blank"
                        className="text-blue-400 hover:text-blue-300 transition-colors inline-flex justify-center"
                      >
                        <Image
                          src="/external_link.svg"
                          width={20}
                          height={20}
                          alt="External Link"
                          className="hover:opacity-80 transition-opacity"
                        />
                      </Link>
                    </td>
                    <td className="py-4 pl-1 pr-3 text-white text-left whitespace-nowrap">
                      {formatDate(tx.date)}
                    </td>
                  </tr>
                ))}
                {currentTransactions.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-8 px-5 text-center text-gray-400"
                    >
                      No transaction logs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
