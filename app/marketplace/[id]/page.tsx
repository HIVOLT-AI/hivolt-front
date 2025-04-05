"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { marketplaceApi } from "@/app/services/api";
import type { AgentDetail } from "@/app/services/api";
import { useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AgentDetailSkeleton from "@/app/components/skeletons/AgentDetailSkeleton";

export default function AgentDetail() {
  const params = useParams();
  const id = params.id as string;

  const { data: agent, isLoading } = useQuery<AgentDetail>({
    queryKey: ["agent", id],
    queryFn: () => marketplaceApi.getAgentById(id),
  });

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success("Link copied to clipboard!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
  };

  return (
    <div className="min-h-screen bg-transparent px-8 py-6 relative">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {isLoading ? (
        <AgentDetailSkeleton />
      ) : (
        <>
          <div className="flex items-center gap-4 mb-8">
            <img
              src={agent?.icon}
              alt={agent?.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <h1 className="text-3xl font-bold text-white uppercase">
              {agent?.name}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="mb-8">
                <h2 className="text-white text-xl font-bold mb-4">
                  ABOUT THIS AGENT
                </h2>
                <p className="text-white text-sm leading-relaxed mb-4">
                  Integrate Sanctum with your AI agent easier with Sanctum MCP
                  server.
                </p>
                <p className="text-white text-sm leading-relaxed">
                  {agent?.description}
                </p>
              </div>

              <div>
                <h2 className="text-white text-xl font-bold mb-4">TOOLS</h2>
                <div className="space-y-2">
                  {agent?.required_tools &&
                    agent?.required_tools.map((tool, index) => (
                      <div
                        key={index}
                        className="border border-white/10 rounded-md p-4"
                      >
                        <h3 className="text-white font-bold mb-1">
                          {tool.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {tool.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-white text-xl font-bold mb-4">
                INSTALLATION
              </h2>
              <div className="space-y-2.5">
                <div className="bg-white/10 border border-white/10 rounded-md p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl text-white font-bold">
                      FOR DEVELOPERS
                    </h3>
                    <button
                      onClick={handleCopyLink}
                      className="bg-white text-black px-5 py-3 rounded-full text-sm font-bold flex items-center gap-2 min-w-[150px] justify-center"
                    >
                      <img src="/copy.svg" alt="Copy" width={20} height={20} />
                      COPY LINK
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    Copy and paste this link to develop your own AI service.
                  </p>
                </div>

                <div className="bg-white/10 border border-white/10 rounded-md p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl text-white font-bold">
                      FOR TRADERS
                    </h3>
                    <button className="bg-white text-black px-5 py-3 rounded-full text-sm font-bold flex items-center gap-2 min-w-[150px] justify-center">
                      <img
                        src="/plus_black.svg"
                        alt="Add"
                        width={20}
                        height={20}
                      />
                      ADD AGENT
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    Add this agent, go to 'Create an Agent' tab, and prompt how
                    you want this dapp to trade for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
