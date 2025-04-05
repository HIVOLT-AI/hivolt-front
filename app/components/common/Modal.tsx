"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

interface ModalProps {
  title: string;
  message: string;
  buttonText: string;
  buttonLink: string;
  onClose?: () => void;
  emoji?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  message,
  buttonText,
  buttonLink,
  onClose,
  emoji = "🎉",
}) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // 컴포넌트가 마운트되었는지 확인
  useEffect(() => {
    setMounted(true);

    // 블러 처리는 backdrop 요소에 적용
    const backdrop = document.createElement("div");
    backdrop.id = "modal-backdrop";
    backdrop.style.position = "fixed";
    backdrop.style.top = "0";
    backdrop.style.left = "0";
    backdrop.style.width = "100%";
    backdrop.style.height = "100%";
    backdrop.style.backdropFilter = "blur(5px)";
    backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    backdrop.style.zIndex = "40";
    document.body.appendChild(backdrop);

    return () => {
      const backdropElement = document.getElementById("modal-backdrop");
      if (backdropElement) {
        document.body.removeChild(backdropElement);
      }
    };
  }, []);

  const handleButtonClick = () => {
    if (onClose) {
      onClose();
    }
    router.push(buttonLink);
  };

  // 모달 컨텐츠
  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 50 }}
    >
      <div className="absolute inset-0"></div>
      <div
        className="bg-[#2A2A2A] rounded-lg px-4 py-16 shadow-xl w-full max-w-xl relative text-center mx-auto my-auto"
        style={{
          zIndex: 51,
          backdropFilter: "none !important",
          WebkitBackdropFilter: "none !important",
          filter: "none !important",
          backgroundColor: "#2A2A2A",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white opacity-70 hover:opacity-100 text-xl"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-white mb-6">
          {title} {emoji}
        </h2>
        <p className="text-gray-300 mb-8 text-lg">{message}</p>
        <button
          onClick={handleButtonClick}
          className="rounded-full bg-white text-black py-3 px-8 font-bold text-lg"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );

  // 클라이언트 사이드에서만 Portal 렌더링
  if (!mounted) {
    return null;
  }

  return createPortal(modalContent, document.body);
};

export default Modal;
