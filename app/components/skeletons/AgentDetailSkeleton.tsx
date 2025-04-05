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
export default function AgentDetailSkeleton() {
  return (
    <div className="min-h-screen bg-transparent text-white px-6 py-8">
      {/* Header and Back Link Skeleton */}
      <div className="flex items-center mb-10">
        <div className="h-10 w-40 bg-white/10 rounded animate-pulse"></div>
      </div>

      <div className="flex items-center mb-4">
        <div className="h-8 w-8 bg-white/10 rounded animate-pulse mr-4"></div>
      </div>

      {/* Agent Name Skeleton */}
      <div className="mb-10">
        <div className="h-14 w-64 bg-white/10 rounded animate-pulse"></div>
      </div>

      {/* Prompts Section Skeleton */}
      <div className="mb-10">
        <div className="h-6 w-24 bg-white/10 rounded animate-pulse mb-3"></div>
        <div className="p-4 rounded bg-white/10">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-white/20 animate-pulse mr-3"></div>
            <div className="flex-1">
              <div className="h-4 bg-white/20 rounded animate-pulse"></div>
              <div className="h-4 bg-white/20 rounded animate-pulse mt-2 w-3/4"></div>
            </div>
            <div className="h-6 w-6 bg-white/20 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Fund Amount Skeleton */}
      <div className="mb-10">
        <div className="h-6 w-32 bg-white/10 rounded animate-pulse mb-3"></div>
        <div className="flex items-center">
          <div className="h-6 w-16 bg-white/20 rounded animate-pulse mr-2"></div>
          <div className="h-6 w-12 bg-white/20 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Stats Section Skeleton */}
      <div className="mb-10">
        <div className="h-6 w-16 bg-white/10 rounded animate-pulse mb-3"></div>
        <div className="overflow-x-auto">
          <div className="border border-white/20 rounded-xl overflow-hidden mb-3 bg-transparent">
            <div className="w-full">
              {/* Header Row */}
              <div className="flex w-full bg-white/10 py-4 px-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={`header-${i}`}
                    className="h-6 bg-white/20 rounded animate-pulse"
                    style={{ width: i === 6 ? "280px" : "16.66%" }}
                  ></div>
                ))}
              </div>

              {/* Data Row */}
              <div className="flex w-full border-t border-white/20 py-5 px-5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={`data-${i}`}
                    className="h-6 bg-white/20 rounded animate-pulse"
                    style={{ width: "16.66%" }}
                  ></div>
                ))}
                <div
                  className="h-6 w-20 bg-white/20 rounded animate-pulse"
                  style={{ width: "16.66%" }}
                ></div>
                <div className="h-10 w-[280px] bg-white/20 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Logs Section Skeleton */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="h-6 w-40 bg-white/10 rounded animate-pulse"></div>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={`pagination-${i}`}
                className="h-8 w-8 bg-white/10 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="border border-white/20 rounded-xl overflow-hidden mb-3 bg-transparent">
            <div className="w-full">
              {/* Header Row */}
              <div className="flex w-full bg-white/10 py-4">
                <div className="h-6 bg-white/20 rounded animate-pulse w-1/4 mx-5"></div>
                <div className="h-6 bg-white/20 rounded animate-pulse w-2/4 mx-5"></div>
                <div className="h-6 bg-white/20 rounded animate-pulse w-[60px] mx-3"></div>
                <div className="h-6 bg-white/20 rounded animate-pulse w-[70px] mx-3"></div>
              </div>

              {/* Transaction Rows */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={`transaction-${i}`}
                  className="flex w-full border-t border-white/20 py-4"
                >
                  <div className="h-6 bg-white/20 rounded animate-pulse w-1/4 mx-5"></div>
                  <div className="h-6 bg-white/20 rounded animate-pulse w-2/4 mx-5"></div>
                  <div className="h-6 bg-white/20 rounded animate-pulse w-6 mx-auto"></div>
                  <div className="h-6 bg-white/20 rounded animate-pulse w-16 mx-3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
