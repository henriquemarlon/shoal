import "viem/window";
import {
  isHex,
  fromHex,
  createPublicClient,
  http,
  createWalletClient,
  custom,
} from "viem";

import {
  anvil,
  mainnet,
  sepolia,
  cannon,
  base,
  baseSepolia,
  Chain,
} from "viem/chains";
import {
  publicActionsL1,
  walletActionsL1,
  createCartesiPublicClient,
} from "@cartesi/viem";

export const chains: Record<number, Chain> = {};
chains[anvil.id] = anvil;
chains[cannon.id] = cannon;
chains[sepolia.id] = sepolia;
chains[baseSepolia.id] = baseSepolia;
chains[mainnet.id] = mainnet;
chains[base.id] = base;

export function getChain(chainId: number): Chain | null;
export function getChain(chainId: string): Chain | null;
export function getChain(chainId: number | string): Chain | null {
  if (typeof chainId === "string") {
    if (!isHex(chainId)) return null;
    chainId = fromHex(chainId, "number");
  }

  const chain = chains[chainId];
  if (!chain) return null;

  return chain;
}

export async function getClient(chainId: number) {
  const chain = getChain(chainId);
  if (!chain) return null;
  return createPublicClient({
    chain: chain as any,
    transport: http(),
  }).extend(publicActionsL1());
}

export async function getWalletClient(chainId: number) {
  if (!window.ethereum) return null;
  const chain = getChain(chainId);
  if (!chain) return null;

  const accounts = await (window.ethereum as any).request({
    method: "eth_requestAccounts",
  });
  return createWalletClient({
    account: accounts[0],
    chain: chain as any,
    transport: custom(window.ethereum as any),
  }).extend(walletActionsL1());
}

export async function getL2Client(nodeAddress: string) {
  if (!nodeAddress) return null;
  return createCartesiPublicClient({
    transport: http(nodeAddress),
  });
}
