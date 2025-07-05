import fs from "fs";
import proverSpec from "./out/WebProofProver.sol/WebProofProver";
import verifierSpec from "./out/WebProofVerifier.sol/WebProofVerifier";
import {
  deployVlayerContracts,
  writeEnvVariables,
  getConfig,
} from "@vlayer/sdk/config";

const config = getConfig();

function getEnvValue(envPath: string, key: string): string | undefined {
  if (!fs.existsSync(envPath)) return undefined;
  const envContent = fs.readFileSync(envPath, "utf-8");
  const match = envContent.match(new RegExp(`^${key}=(.*)$`, "m"));
  if (match && match[1].trim() !== "") {
    return match[1].trim();
  }
  return undefined;
}

const envPath = ".env";
const proverAddress = getEnvValue(envPath, "VITE_PROVER_ADDRESS");
const verifierAddress = getEnvValue(envPath, "VITE_VERIFIER_ADDRESS");

let prover = proverAddress;
let verifier = verifierAddress;

if (!prover || !verifier) {
  const deployed = await deployVlayerContracts({
    proverSpec,
    verifierSpec,
  });
  prover = prover || deployed.prover;
  verifier = verifier || deployed.verifier;
}

await writeEnvVariables(envPath, {
  VITE_PROVER_ADDRESS: prover,
  VITE_VERIFIER_ADDRESS: verifier,
  VITE_CHAIN_NAME: config.chainName,
  VITE_PROVER_URL: config.proverUrl,
  VITE_JSON_RPC_URL: config.jsonRpcUrl,
  VITE_CLIENT_AUTH_MODE: config.clientAuthMode,
  VITE_VLAYER_API_TOKEN: config.token,
  VITE_NOTARY_URL: config.notaryUrl,
  VITE_WS_PROXY_URL: config.wsProxyUrl,
  VITE_GAS_LIMIT: config.gasLimit,
});
