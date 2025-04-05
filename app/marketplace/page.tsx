"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { marketplaceApi, Agent } from "@/app/services/api";
import MarketplaceSkeleton from "@/app/components/skeletons/MarketplaceSkeleton";
import AgentCard from "@/app/components/common/AgentCard";

export default function Marketplace() {
  const { data: agents = [], isLoading } = useQuery<Agent[]>({
    queryKey: ["agents"],
    queryFn: marketplaceApi.getAgents,
  });

  return (
    <div className="min-h-screen bg-transparent px-8 py-6">
      <h1 className="text-3xl font-bold text-white mb-10">MCP MARKETPLACE</h1>
      {isLoading ? (
        <MarketplaceSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
          {agents.map((agent) => (
            <AgentCard
              key={agent.agent_id}
              agent={agent}
              href={`/marketplace/${agent.agent_id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
