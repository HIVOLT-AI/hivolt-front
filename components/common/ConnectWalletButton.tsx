"use client";
import { useConnect } from "@/hooks/useConnect";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import "@solana/wallet-adapter-react-ui/styles.css";

interface ConnectWalletButtonProps {
  isCreateAgent?: boolean;
  className?: string;
  onSuccess?: (publicKey: PublicKey) => void;
}

const ConnectWalletButton = ({
  isCreateAgent = false,
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

  const handleButtonClick = async () => {
    console.log("Current wallet state:", { connected, wallet, publicKey });

    // 이미 연결된 상태에서는 연결 해제
    if (connected && !isCreateAgent) {
      try {
        await disconnect();
        console.log("지갑 연결이 해제되었습니다.");
        return;
      } catch (error) {
        console.error("지갑 연결 해제 오류:", error);
        return;
      }
    }

    if (isCreateAgent) {
      // create an agent 함수 구현
    } else {
      // connect wallet 함수 구현
      if (!connected) {
        // 지갑이 연결되지 않은 경우 모달 표시
        setVisible(true);
      } else {
        // 이미 연결된 경우 서명 로직 실행
        try {
          const message = createSignMessage();
          const encodedMessage = new TextEncoder().encode(message);

          if (signMessage && publicKey) {
            try {
              const res = await signMessage(encodedMessage);

              if (res) {
                try {
                  const isValid = nacl.sign.detached.verify(
                    encodedMessage,
                    res,
                    publicKey.toBytes()
                  );
                  console.log("isValid", isValid);

                  // 성공 시 콜백 호출
                  if (isValid && onSuccess && publicKey) {
                    onSuccess(publicKey);
                  }
                } catch (error) {
                  console.log("서명 검증 오류:", error);
                }
              }
            } catch (error) {
              console.error("서명 오류:", error);
              // 사용자가 요청을 거부한 경우 조용히 처리
              if (
                error instanceof Error &&
                error.message.includes("rejected")
              ) {
                console.log("사용자가 서명 요청을 거부했습니다.");
              }
            }
          }
        } catch (error) {
          console.error("Connection error:", error);
        }
      }
    }
  };

  // 지갑 주소 표시를 위한 함수
  const formatWalletAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <button className={className} onClick={handleButtonClick}>
      {isCreateAgent
        ? "CREATE AN AGENT"
        : connected && publicKey
          ? `${formatWalletAddress(publicKey.toString())}`
          : "CONNECT WALLET"}
    </button>
  );
};

export default ConnectWalletButton;
