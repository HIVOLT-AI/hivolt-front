"use client";
import ConnectWalletButton from "../common/ConnectWalletButton";

// 동기식 SHA-512 함수 설정
const Header = () => {
  return (
    <header className="flex items-center bg-black">
      <div className="flex w-full items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-white">HOMO MEMETUS</h1>
        <ConnectWalletButton />
      </div>
    </header>
  );
};

export default Header;
