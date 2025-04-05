import React from "react";

// Header Skeleton
const HeaderSkeleton = () => (
  <>
    <div className="flex items-center mb-10 animate-pulse">
      <div className="h-10 w-40 bg-white/10 rounded"></div>
    </div>

    <div className="flex items-center mb-4 animate-pulse">
      <div className="h-8 w-8 bg-white/10 rounded mr-4"></div>
    </div>

    <div className="mb-10 animate-pulse">
      <div className="h-12 w-64 bg-white/10 rounded"></div>
    </div>
  </>
);

// Prompts Section Skeleton
const PromptsSkeleton = () => (
  <div className="mb-10 animate-pulse">
    <div className="h-6 w-24 bg-white/10 rounded mb-3"></div>
    <div className="p-4 rounded-xl bg-white/10">
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-full bg-white/20 mr-3"></div>
        <div className="flex-1">
          <div className="h-4 bg-white/20 rounded"></div>
          <div className="h-4 bg-white/20 rounded mt-2 w-3/4"></div>
        </div>
        <div className="h-6 w-6 bg-white/20 rounded"></div>
      </div>
    </div>
  </div>
);

// Fund Amount Skeleton
const FundAmountSkeleton = () => (
  <div className="mb-10 animate-pulse">
    <div className="h-6 w-32 bg-white/10 rounded mb-3"></div>
    <div className="flex items-center">
      <div className="h-6 w-16 bg-white/20 rounded mr-2"></div>
      <div className="h-6 w-12 bg-white/20 rounded"></div>
    </div>
  </div>
);

// Stats Section Skeleton
const StatsSkeleton = () => (
  <div className="mb-10 animate-pulse">
    <div className="h-6 w-16 bg-white/10 rounded mb-3"></div>
    <div className="overflow-x-auto">
      <div className="border border-white/20 rounded-xl overflow-hidden mb-3 bg-transparent">
        <div className="w-full">
          {/* Header Row */}
          <div className="flex w-full bg-white py-4 px-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={`header-${i}`}
                className="h-6 bg-white/20 rounded"
                style={{ width: i === 6 ? "280px" : "16.66%" }}
              ></div>
            ))}
          </div>

          {/* Data Row */}
          <div className="flex w-full border-t border-white/20 py-5 px-5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={`data-${i}`}
                className="h-6 bg-white/20 rounded"
                style={{ width: "16.66%" }}
              ></div>
            ))}
            <div
              className="h-6 w-20 bg-white/20 rounded"
              style={{ width: "16.66%" }}
            ></div>
            <div className="h-10 w-[280px] bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Transaction Logs Section Skeleton
const TransactionLogsSkeleton = () => (
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
          <div className="flex w-full bg-white py-4">
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
);

// Complete Agent Detail Skeleton
export default function MyAgentDetailSkeleton() {
  return (
    <div className="min-h-screen bg-transparent text-white px-6 py-8">
      <HeaderSkeleton />
      <PromptsSkeleton />
      <FundAmountSkeleton />
      <StatsSkeleton />
      <TransactionLogsSkeleton />
    </div>
  );
}
