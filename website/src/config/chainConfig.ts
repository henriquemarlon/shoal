import { sepolia, anvil } from "viem/chains";

export const FIXED_CHAIN = sepolia;

export const CHAIN_CONFIG = {
  id: FIXED_CHAIN.id,
  name: FIXED_CHAIN.name,
  hexId: `0x${FIXED_CHAIN.id.toString(16)}`,
  rpcUrl: FIXED_CHAIN.rpcUrls.default.http[0],
}; 