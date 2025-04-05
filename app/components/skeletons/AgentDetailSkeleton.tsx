import React from "react";

// Agent Header Skeleton
const AgentHeaderSkeleton = () => (
  <div className="flex items-center gap-4 mb-8 animate-pulse">
    <div className="w-[32px] h-[32px] rounded-full bg-white/10"></div>
    <div className="h-8 w-64 bg-white/10 rounded"></div>
  </div>
);

// About Section Skeleton
const AgentAboutSkeleton = () => (
  <div className="mb-8 animate-pulse">
    <div className="h-7 w-48 bg-white/10 rounded mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 w-full bg-white/10 rounded"></div>
      <div className="h-4 w-full bg-white/10 rounded"></div>
      <div className="h-4 w-3/4 bg-white/10 rounded"></div>
    </div>
  </div>
);

// Tools Section Skeleton
const AgentToolsSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-7 w-24 bg-white/10 rounded mb-4"></div>
    <div className="space-y-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="border border-white/10 rounded-md p-4">
          <div className="h-5 w-32 bg-white/10 rounded mb-1"></div>
          <div className="h-4 w-full bg-white/10 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

// Installation Section Skeleton
const InstallationSectionSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-7 w-40 bg-white/10 rounded mb-4"></div>
    <div className="space-y-2.5">
      {/* For Developers Section */}
      <div className="bg-white/10 border border-white/10 rounded-md p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="h-6 w-36 bg-white/20 rounded"></div>
          <div className="h-12 w-[150px] bg-white/20 rounded-full"></div>
        </div>
        <div className="h-4 w-full bg-white/20 rounded"></div>
      </div>

      {/* For Traders Section */}
      <div className="bg-white/10 border border-white/10 rounded-md p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="h-6 w-36 bg-white/20 rounded"></div>
          <div className="h-12 w-[150px] bg-white/20 rounded-full"></div>
        </div>
        <div className="h-4 w-full bg-white/20 rounded"></div>
      </div>
    </div>
  </div>
);

// Complete Agent Detail Skeleton
export default function AgentDetailSkeleton() {
  return (
    <div className="min-h-screen bg-transparent relative">
      <AgentHeaderSkeleton />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <AgentAboutSkeleton />
          <AgentToolsSkeleton />
        </div>

        <div className="w-full md:w-1/2">
          <InstallationSectionSkeleton />
        </div>
      </div>
    </div>
  );
}
