import React from "react";

// 헤더 스켈레톤
export const AgentHeaderSkeleton = () => (
  <div className="flex items-center gap-4 mb-8 animate-pulse">
    <div className="w-[32px] h-[32px] rounded-full bg-white/10"></div>
    <div className="h-8 w-64 bg-white/10 rounded"></div>
  </div>
);

// 소개 섹션 스켈레톤
export const AgentAboutSkeleton = () => (
  <div className="mb-8 animate-pulse">
    <div className="h-7 w-48 bg-white/10 rounded mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 w-full bg-white/10 rounded"></div>
      <div className="h-4 w-full bg-white/10 rounded"></div>
      <div className="h-4 w-3/4 bg-white/10 rounded"></div>
    </div>
  </div>
);

// 도구 섹션 스켈레톤
export const AgentToolsSkeleton = () => (
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

// 설치 섹션 스켈레톤
export const AgentInstallationSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-7 w-48 bg-white/10 rounded mb-4"></div>
    <div className="space-y-2.5">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="bg-white/10 border border-white/10 rounded-md p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="h-6 w-48 bg-white/10 rounded"></div>
            <div className="h-12 w-[150px] bg-white/10 rounded-full"></div>
          </div>
          <div className="h-4 w-full bg-white/10 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

// 전체 에이전트 상세 페이지 스켈레톤
const AgentDetailSkeleton = () => {
  return (
    <>
      <AgentHeaderSkeleton />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <AgentAboutSkeleton />
          <AgentToolsSkeleton />
        </div>
        <div className="w-full md:w-1/2">
          <AgentInstallationSkeleton />
        </div>
      </div>
    </>
  );
};

export default AgentDetailSkeleton;
