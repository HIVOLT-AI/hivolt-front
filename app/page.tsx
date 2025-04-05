"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ConnectWalletButton from "@/app/components/common/ConnectWalletButton";

export default function Home() {
  return (
    <div className="fixed inset-0 z-50 min-h-screen bg-black">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <header className="fixed top-0 right-0 left-0 z-50 flex items-center bg-black/30 px-6 py-4 backdrop-blur-sm">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/fav_icon.svg"
              alt="Logo"
              width={20}
              height={20}
              className="mr-2"
            />
            <h1 className="text-xl font-bold text-white">HOMO MEMETUS</h1>
          </div>
          <ConnectWalletButton />
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="w-full pt-28">
        <div className="flex flex-col md:flex-row">
          <div className="z-10 ml-10 pt-6 md:w-5/12 md:pt-10">
            <h1 className="text-6xl leading-[1.1] font-bold tracking-tight text-white md:text-7xl">
              THE FIRST
              <br />
              WEB3 DEDICATED
              <br />
              MCP MARKETPLACE
            </h1>

            <div className="mt-10 font-mono text-white">
              <p className="text-lg">No-Code Access To Customized AI Agents.</p>
              <p className="text-lg">
                One-Click Deploy Your Own AI Agent In A Minute.
              </p>
            </div>

            <Link href="/marketplace">
              <button className="mt-12 flex cursor-pointer items-center rounded-full bg-white px-10 py-4 text-black">
                <Image
                  className="mr-4"
                  src="/rocket.svg"
                  alt="Rocket"
                  width={24}
                  height={24}
                />
                <span className="font-bold tracking-wider">
                  EXPLORE MARKETPLACE
                </span>
              </button>
            </Link>
          </div>

          <div className="flex items-center md:absolute md:top-0 md:right-0 md:bottom-0 md:w-7/12">
            <div className="relative flex w-full items-center justify-end md:h-full">
              <Image
                src="/main_image.svg"
                alt="App icons floating in space"
                width={950}
                height={950}
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
