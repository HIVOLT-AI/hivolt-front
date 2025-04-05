"use client";

import React from "react";

export default function MyAgentSkeleton() {
  // 테이블 행 5개를 보여주는 스켈레톤
  const rows = Array(5).fill(null);

  return (
    <div className="w-full">
      <div className="border border-white rounded-lg mb-3 bg-transparent h-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-white">
              <th className="py-4 px-5 font-medium text-black w-1/7">Agent</th>
              <th className="py-4 px-5 font-medium text-black w-1/7">NAV</th>
              <th className="py-4 px-5 font-medium text-black w-1/7">
                Realized
              </th>
              <th className="py-4 px-5 font-medium text-black w-1/7">
                Unrealized
              </th>
              <th className="py-4 px-5 font-medium text-black w-1/7">
                Total PnL
              </th>
              <th className="py-4 px-5 font-medium text-black w-1/7">Status</th>
              <th className="py-4 px-5 font-medium text-black w-1/7">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((_, index) => (
              <tr key={index} className="border-t border-white animate-pulse">
                <td className="py-5 px-5">
                  <div className="h-5 bg-white/20 rounded w-32"></div>
                </td>
                <td className="py-5 px-5">
                  <div className="h-5 bg-white/20 rounded w-20"></div>
                </td>
                <td className="py-5 px-5">
                  <div className="h-5 bg-white/20 rounded w-20"></div>
                </td>
                <td className="py-5 px-5">
                  <div className="h-5 bg-white/20 rounded w-20"></div>
                </td>
                <td className="py-5 px-5">
                  <div className="h-5 bg-white/20 rounded w-16"></div>
                </td>
                <td className="py-5 px-5">
                  <div className="h-7 bg-white/20 rounded w-16"></div>
                </td>
                <td className="py-5 px-5">
                  <div className="flex space-x-2">
                    <div className="h-10 bg-white/20 rounded-full w-16"></div>
                    <div className="h-10 bg-white/20 rounded-full w-20"></div>
                    <div className="h-10 bg-white/20 rounded-full w-20"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right">
        <div className="h-4 bg-white/20 rounded w-64 ml-auto"></div>
      </div>
    </div>
  );
}
