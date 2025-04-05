"use client";
import { useConnect } from "@/app/hooks/useConnect";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/app/services/api";
import { useCallback, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";

interface ConnectWalletButtonProps {
  className?: string;
  onSuccess?: (publicKey: PublicKey) => void;
}

const ConnectWalletButton = ({
  className = "rounded-full bg-white px-8 py-3 font-bold text-black",
  onSuccess,
}: ConnectWalletButtonProps) => {
  const { setVisible } = useWalletModal();
  const {
    wallet,
    publicKey,
    connect,
    connected,
    signMessage,
    disconnect,
    createSignMessage,
  } = useConnect();

  const handleButtonClick = useCallback(async () => {
    console.log("Current wallet state:", { connected, wallet, publicKey });
    // 이미 연결된 상태에서는 연결 해제
    if (connected) {
      try {
        await disconnect();
        console.log("지갑 연결이 해제되었습니다.");
        return;
      } catch (error) {
        console.error("지갑 연결 해제 오류:", error);
        return;
      }
    }

    if (!connected) {
      setVisible(true);
    } else {
      try {
        const message = createSignMessage();
        const encodedMessage = new TextEncoder().encode(message);

        if (signMessage && publicKey) {
          try {
            console.log("check");
            const res = await signMessage(encodedMessage);

            if (res) {
              try {
                const isValid = nacl.sign.detached.verify(
                  encodedMessage,
                  res,
                  publicKey.toBytes()
                );

                if (isValid && onSuccess && publicKey) {
                  onSuccess(publicKey);
                  userApi.login(publicKey.toBase58());
                }
              } catch (error) {
                console.log("서명 검증 오류:", error);
              }
            }
          } catch (error) {
            console.error("서명 오류:", error);
            // 사용자가 요청을 거부한 경우 조용히 처리
            if (error instanceof Error && error.message.includes("rejected")) {
              console.log("사용자가 서명 요청을 거부했습니다.");
            }
          }
        }
      } catch (error) {
        console.error("Connection error:", error);
      }
    }
  }, [
    connected,
    wallet,
    publicKey,
    connect,
    disconnect,
    signMessage,
    createSignMessage,
    setVisible,
    onSuccess,
  ]);

  useEffect(() => {
    const addr = getCookie(publicKey?.toBase58() || "");
    if (addr === "true") return;

    if (connected && publicKey && signMessage) {
      const message = createSignMessage();
      const encodedMessage = new TextEncoder().encode(message);

      signMessage(encodedMessage)
        .then((signature) => {
          const isValid = nacl.sign.detached.verify(
            encodedMessage,
            signature,
            publicKey.toBytes()
          );
          if (isValid) {
            userApi.login(publicKey.toBase58()).then((res) => {
              console.log(res);
              setCookie("uid", res._id);
              setCookie(publicKey.toBase58(), "true");
            });
          }
          console.log("서명 검증 결과:", isValid);
        })
        .catch((error) => {
          console.error("서명 오류:", error);
        });
    }
  }, [connected, publicKey, signMessage, onSuccess]);

  // 지갑 주소 표시를 위한 함수
  const formatWalletAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <button className={className} onClick={handleButtonClick}>
      {connected && publicKey
        ? `${formatWalletAddress(publicKey.toString())}`
        : "CONNECT WALLET"}
    </button>
  );
};

export default ConnectWalletButton;
