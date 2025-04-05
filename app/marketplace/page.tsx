"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { marketplaceApi, Agent } from "@/app/services/api";

export default function Marketplace() {
  const { data: agents = [], isLoading } = useQuery<Agent[]>({
    queryKey: ["agents"],
    queryFn: marketplaceApi.getAgents,
  });

  return (
    <div className="min-h-screen bg-transparent px-8 py-6">
      <h1 className="text-3xl font-bold text-white mb-10">MCP MARKETPLACE</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
        {agents.map((agent) => (
          <div
            key={agent.agent_id}
            className="bg-transparent border border-white/10 hover:bg-white/10 hover:border-white/10 transition-all duration-300 rounded-md p-5 flex flex-col min-h-[180px] w-full cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                className="rounded-2xl"
                src={agent.icon}
                alt={agent.agent_name}
                width={32}
                height={32}
              />
              <h3 className="text-2xl font-bold text-white uppercase tracking-wide truncate">
                {agent.agent_name}
              </h3>
            </div>
            <p className="text-white text-sm leading-relaxed line-clamp-5">
              {agent.agent_description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
