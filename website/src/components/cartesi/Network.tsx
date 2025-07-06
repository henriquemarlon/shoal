import type { FC } from "react";
import { useState, useEffect } from "react";
import { usePrivy } from '@privy-io/react-auth';
import { CHAIN_CONFIG } from "@/config/chainConfig";

interface Props {
  onChange(chain: number | undefined, address: `0x${string}` | undefined): void;
}

export const Network: FC<Props> = ({ onChange }) => {
  const [connectedChain, setConnectedChain] = useState<string | undefined>();
  const { user } = usePrivy();
  
  const userWallet = user?.wallet;
  const walletAddress = userWallet?.address;
  
  // Conectar automaticamente quando a carteira estiver disponível
  useEffect(() => {
    if (userWallet && walletAddress && !connectedChain) {
      setConnectedChain(CHAIN_CONFIG.hexId);
      onChange(CHAIN_CONFIG.id, walletAddress as `0x${string}`);
    }
  }, [userWallet, walletAddress]);

  return (
    <div className="flex flex-col bg-blue-50 p-4 rounded-md">
      <div>
        <strong>Network Data - Chain: {CHAIN_CONFIG.name} (ID: {CHAIN_CONFIG.id})</strong>
        <br />
        <button className="bg-blue-500 text-white p-2 rounded-md" disabled={!userWallet}>
          {connectedChain ? "Conectado" : "Aguardando carteira"}
        </button>
      </div>
      {walletAddress && (
        <div>
          Carteira conectada: {walletAddress}
          <br />
        </div>
      )}
      {connectedChain && (
        <div>
          Connected chainId: {parseInt(connectedChain?.substring(2) ?? "0", 16)}
          <br />
        </div>
      )}
    </div>
  );
};
