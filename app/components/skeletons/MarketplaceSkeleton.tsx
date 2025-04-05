import React from "react";

const MarketplaceItemSkeleton = () => {
  return (
    <div className="bg-transparent border border-white/10 rounded-md p-5 flex flex-col h-[220px] w-full animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-[32px] h-[32px] rounded-2xl bg-white/10"></div>
        <div className="h-7 w-3/4 bg-white/10 rounded"></div>
      </div>
      <div className="space-y-2 flex-grow">
        <div className="h-3 w-full bg-white/10 rounded"></div>
        <div className="h-3 w-full bg-white/10 rounded"></div>
        <div className="h-3 w-full bg-white/10 rounded"></div>
        <div className="h-3 w-3/4 bg-white/10 rounded"></div>
      </div>
    </div>
  );
};

const MarketplaceSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
      {Array.from({ length: 8 }).map((_, index) => (
        <MarketplaceItemSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
};

export default MarketplaceSkeleton;
