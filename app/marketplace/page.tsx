'use client';

import React from 'react';

export default function Marketplace() {
  const mcpMarketplaceData = [
    {
      id: '1',
      name: 'SANCTUM SERVER',
      description: 'Integrate Sanctum with your AI agent easier with Sanctum MCP server',
    },
    {
      id: '2',
      name: 'SANCTUM SERVER',
      description: 'Integrate Sanctum with your AI agent easier with Sanctum MCP server',
    },
    {
      id: '3',
      name: 'SANCTUM SERVER',
      description: 'Integrate Sanctum with your AI agent easier with Sanctum MCP server',
    },
  ];

  const agentMarketplaceData = [
    {
      id: '1',
      name: 'SANCTUM OPTIMIZER',
      description: 'This agent allocates your $SOL to Sanctum LST, then automatically reallocates your fund to maximize yields.',
      icon: 'blue'
    },
    {
      id: '2',
      name: 'WORMHOLE SEEKER',
      description: 'This agent buys and sells different tokens evne outside of Solana ecosystem using your $SOL fund to maximize your fund return',
      icon: 'white'
    },
    {
      id: '3',
      name: 'ZBTC QUANT ANALYZER',
      description: 'This agent uses $zBTC from Zeus Netowrk to bring $BTC investing opportunity in the SVM space. According to various quant strategies, this agent focuses on BTC market data to buy and sell BTC and make profoit.',
      icon: 'purple'
    },
  ];

  const renderIcon = (type: string) => {
    if (type === 'blue') {
      return (
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="white" />
            <path d="M8 12C8 9.79086 9.79086 8 12 8V16C9.79086 16 8 14.2091 8 12Z" fill="#2563EB"/>
          </svg>
        </div>
      );
    } else if (type === 'white') {
      return (
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2" />
            <path d="M8 12H16" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 15L12 8L19 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <h1 className="text-4xl font-bold text-white mb-10">MCP MARKETPLACE</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {mcpMarketplaceData.map((marketplace) => (
          <div key={marketplace.id} className="bg-[#1c1c1c] rounded-lg p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="white" />
                  <path d="M8 12C8 9.79086 9.79086 8 12 8V16C9.79086 16 8 14.2091 8 12Z" fill="#2563EB"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">{marketplace.name}</h3>
            </div>
            <p className="text-white/70 font-mono text-sm mb-auto">
              {marketplace.description}
            </p>
            <div className="mt-12 flex justify-end">
              <button className="bg-white text-black font-bold py-2 px-8 rounded-full hover:bg-white/90 transition-colors">
                INSTALL
              </button>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-4xl font-bold text-white mb-10">AGENT MARKETPLACE</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agentMarketplaceData.map((agent) => (
          <div key={agent.id} className="bg-[#1c1c1c] rounded-lg p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              {renderIcon(agent.icon)}
              <h3 className="text-xl font-bold text-white">{agent.name}</h3>
            </div>
            <p className="text-white/70 font-mono text-sm mb-auto">
              {agent.description}
            </p>
            <div className="mt-8 flex justify-between">
              <button className="border border-white text-white font-bold py-2 px-6 rounded-full hover:bg-white/10 transition-colors">
                VIEW AGENT
              </button>
              <button className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-white/90 transition-colors">
                ADD AGENT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 