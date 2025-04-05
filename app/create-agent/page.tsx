"use client";

import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { marketplaceApi, Agent } from "@/app/services/api";
import Image from "next/image";
import AgentCard from "@/app/components/common/AgentCard";
import MarketplaceSkeleton from "@/app/components/skeletons/MarketplaceSkeleton";

export default function CreateAgentPage() {
  const [agentName, setAgentName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: templates = [], isLoading } = useQuery<Agent[]>({
    queryKey: ["agents"],
    queryFn: marketplaceApi.getAgents,
  });

  const handleSelectTemplate = (agentId: string) => {
    if (selectedTemplate === agentId) {
      setSelectedTemplate(null);
    } else {
      setSelectedTemplate(agentId);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const selectedAgent = templates.find(
    (template) => template.agent_id === selectedTemplate
  );

  return (
    <div className="min-h-screen bg-transparent px-8 py-6">
      <div className="mb-10">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="text-3xl font-bold text-white bg-transparent focus:outline-none focus:border-white px-1 py-0"
              onBlur={toggleEditing}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  toggleEditing();
                }
              }}
            />
          </div>
        ) : (
          <h1
            className="text-3xl font-bold text-white flex items-center gap-2 cursor-pointer"
            onClick={toggleEditing}
          >
            <span className={agentName ? "text-white" : "text-white/50"}>
              {agentName || "NAME YOUR AGENT"}
            </span>
            {!agentName && (
              <Image
                src="/edit.svg"
                width={24}
                height={24}
                alt="Edit"
                className="opacity-50"
              />
            )}
          </h1>
        )}
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-bold text-white mb-6">MY AGENTS</h2>

        {isLoading ? (
          <MarketplaceSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
              <AgentCard
                key={template.agent_id}
                agent={template}
                selected={selectedTemplate === template.agent_id}
                onClick={() => handleSelectTemplate(template.agent_id)}
              />
            ))}
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-xl font-bold text-white mb-6">PROMPTS</h2>
          {selectedTemplate ? (
            <div className="mt-4">
              <div className="flex items-center gap-3 mb-4">
                {selectedAgent && (
                  <>
                    <img
                      className="rounded-full"
                      src={selectedAgent.icon}
                      alt={selectedAgent.agent_name}
                      width={32}
                      height={32}
                    />
                    <h3 className="text-xl font-bold text-white uppercase">
                      {selectedAgent.agent_name}
                    </h3>
                  </>
                )}
              </div>
              <div className="bg-[#111] border border-white/10 rounded-md mt-2">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`How do you want this agent to invest...`}
                  className="w-full h-32 bg-transparent text-white p-4 focus:outline-none resize-none"
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-400 mt-2">Please add your agent.</p>
          )}
        </div>
      </div>
    </div>
  );
}
