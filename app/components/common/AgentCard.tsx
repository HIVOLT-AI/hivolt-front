"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Agent } from "@/app/services/api";

interface AgentCardProps {
  agent: Agent;
  href?: string;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  href,
  onClick,
  className = "",
  selected = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const getBackgroundColor = () => {
    if (selected) return "rgba(53, 188, 0, 0.1)";
    if (isHovered) return "rgba(255, 255, 255, 0.1)";
    return "transparent";
  };

  const getBorderColor = () => {
    if (selected) return "#35BC00";
    if (isHovered) return "rgba(255, 255, 255, 0.1)";
    return "rgba(255, 255, 255, 0.1)";
  };

  const cardContent = (
    <div
      style={{
        backgroundColor: getBackgroundColor(),
        borderColor: getBorderColor(),
      }}
      className={`border transition-all duration-300 rounded-md p-5 flex flex-col h-[220px] w-full cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        {selected && (
          <div className="ml-auto">
            <Image src="/check.svg" alt="Selected" width={24} height={24} />
          </div>
        )}
      </div>
      <p className="text-white text-sm leading-relaxed line-clamp-5">
        {agent.agent_description}
      </p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="w-full h-full">
        {cardContent}
      </Link>
    );
  }

  return (
    <div onClick={onClick} className="w-full h-full">
      {cardContent}
    </div>
  );
};

export default AgentCard;
