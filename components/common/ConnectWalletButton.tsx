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
    createSignMessage,
  } = useConnect();

  const handleButtonClick = async () => {
    console.log("Current wallet state:", { connected, wallet, publicKey });

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
                console.log("error", error);
              }
            }
          }
        } catch (error) {
          console.error("Connection error:", error);
        }
      }
    }
  };

  return (
    <button className={className} onClick={handleButtonClick}>
      {isCreateAgent
        ? "CREATE AN AGENT"
        : connected
          ? "CONNECTED"
          : "CONNECT WALLET"}
    </button>
  );
};

export default ConnectWalletButton;
