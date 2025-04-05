"use client";

import React, { useEffect, useRef } from "react";
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
  const modalRoot = useRef<HTMLDivElement | null>(null);

  // 모달이 마운트될 때 백그라운드에 블러 효과 추가
  useEffect(() => {
    // 모달 루트 요소 생성
    modalRoot.current = document.createElement("div");
    modalRoot.current.id = "modal-root";
    document.body.appendChild(modalRoot.current);

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

    // 컴포넌트가 언마운트될 때 요소들 제거
    return () => {
      if (modalRoot.current) {
        document.body.removeChild(modalRoot.current);
      }
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

  // Portal을 사용하여 모달을 렌더링
  return modalRoot.current
    ? createPortal(modalContent, modalRoot.current)
    : null;
};

export default Modal;
