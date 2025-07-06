import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWallets } from "@privy-io/react-auth";
import { chains, getClient, getWalletClient } from "@/utils/chain";
import { parseChainId } from "@/utils/chain";
import { createWalletClient, custom } from "viem";
import { walletActionsL1 } from "@cartesi/viem";
import {
  erc1155BatchPortalAddress,
  erc1155SinglePortalAddress,
  erc20PortalAddress,
  erc721PortalAddress,
} from "@cartesi/viem/abi";
import {
  BaseError,
  erc20Abi,
  erc721Abi,
  parseAbi,
  parseEther,
  parseUnits,
  toHex,
} from "viem";

// Mock de vídeos e informações
const videos = [
  {
    url: "https://www.youtube.com/shorts/PxQc801W7z4",
    info: {
      title: "Exemplo de Short",
      creator: "Canal Exemplo",
      date: "12/07/2024",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      maxInterestRate: "10%",
      debtIssued: "1.000.000,00",
      maturityDate: "09/09/2025",
    }  
  },
  {
    url: "https://www.youtube.com/shorts/E92Dqq0VZ2A",
    info: {
      title: "Exemplo de Short 2",
      creator: "Canal Exemplo",
      date: "12/07/2024",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      maxInterestRate: "12%",
      debtIssued: "1.200.000,00",
      maturityDate: "08/09/2025",
    },
  }
];

function getYoutubeEmbedUrl(shortUrl: string) {
  const match = shortUrl.match(/shorts\/([\w-]+)/);
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&controls=0&loop=1`;
  }
  return shortUrl;
}

export default function VideoFeed() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleNext = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
      setAnimating(false);
    }, 250); // duração da animação
  };

  const handlePrev = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
      setAnimating(false);
    }, 250);
  };

  const video = videos[current];

  const [interestRate, setInterestRate] = useState("");
  const [amount, setAmount] = useState("");

  const {wallets} = useWallets();
  const wallet = wallets[0];
  const chainId = wallet?.chainId;


  const depositErc20ToPortal = async (token: `0x${string}`, value: bigint) => {
    try {
      if (chainId) {
        const parsedChainId = parseChainId(chainId);
        if (!parsedChainId || !import.meta.env.VITE_CARTESI_APPLICATION_ADDRESS) return false;

        // Use o embedded wallet do Privy se disponível
        const privyWallet = wallets.find(w => w.walletClientType === 'privy');
        let walletClient, address;

        if (privyWallet) {
          const provider = await privyWallet.getEthereumProvider();
          address = privyWallet.address as `0x${string}`;
          walletClient = createWalletClient({
            account: address,
            chain: chains[parsedChainId],
            transport: custom(provider),
          }).extend(walletActionsL1());

        } else {
          walletClient = await getWalletClient(parsedChainId);
          if (walletClient) {
            [address] = await walletClient.requestAddresses();
            address = address as `0x${string}`;
          }
        }

        const client = await getClient(parsedChainId);
        if (!client || !walletClient || !address) return;

        const portalAddress = erc20PortalAddress;

        const currAllowance = await client.readContract({
          address: token,
          abi: erc20Abi,
          functionName: "allowance",
          args: [address, portalAddress],
        });

        if (currAllowance < value) {
          const { request } = await client.simulateContract({
            account: address,
            address: token,
            abi: erc20Abi,
            functionName: "approve",
            args: [portalAddress, value],
          });
          const txHash = await walletClient.writeContract(request);
          await client.waitForTransactionReceipt({ hash: txHash });
        }

        const data = toHex(`Deposited (${value}) of ERC20 (${token}).`);

        const txHash = await walletClient.depositERC20Tokens({
          account: address,
          token: token,
          chain: chains[parsedChainId],
          execLayerData: data,
          amount: value,
          application: portalAddress,
        });

        await client.waitForTransactionReceipt({ hash: txHash });
      }
    } catch (e) {
      if (e instanceof BaseError) {
        console.error(e.message);
      } else {
        console.error(e);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    const payload = JSON.stringify({ //VER COM HENRIQUE
      path: "user/admin/create",
      data: {
        interest_rate: interestRate,
        badge_chain_selector: "16015286601757825753??",
      }
    }) 

    //{"campaign_id":1,"badge_chain_selector":"16015286601757825753","interest_rate":"9"}}
    //const success = await depositErc20ToPortal("0x0000000000000000000000000000000000000000", BigInt(amount));

  };

  return (
    <div className="flex justify-center items-center h-[90vh] gap-8 w-full">
      {/* Video */}
      <div className="flex flex-col items-center">
       
        <div className="flex items-center gap-8">
          <div
            className={`relative w-[450px] h-[800px] bg-black rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 ${
              animating ? "scale-95 opacity-60" : "scale-100 opacity-100"
            }`}
          >
            <iframe
              key={video.url}
              src={getYoutubeEmbedUrl(video.url)}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="flex flex-col items-center">
            <button
            onClick={handlePrev}
            className="mb-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
            <button
            onClick={handleNext}
            className="mt-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
          </div>
        </div>
        
      </div>

      {/* Info */}
      <div className="flex flex-col w-[500px] h-[800px] bg-white rounded-2xl shadow py-6 px-12">

        <div className="font-bold text-2xl text-center mt-6">{video.info.title}</div>
        <div className="text-xs text-gray-500 mb-1 text-center">Created at {video.info.date}</div>

        <div className="mt-16 mb-12">
          <div className="text-md font-semibold mb-2">By: {video.info.creator}</div>
          <div className="text-gray-700 text-md">{video.info.description}</div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="text-gray-700 text-md font-semibold">{video.info.maxInterestRate}</div>
            <div className="text-gray-700 text-sm">Max Interest Rate</div>
          </div>

          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="text-gray-700 text-md font-semibold">{video.info.debtIssued}</div>
            <div className="text-gray-700 text-sm">Debt Issued</div>
          </div>

          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="text-gray-700 text-md font-semibold">{video.info.maturityDate}</div>
            <div className="text-gray-700 text-sm">Maturity Date</div>
          </div>
        </div>

        <div className="mb-4 border border-blue-500 bg-blue-50 rounded-lg p-4 mt-12">
          <div className="font-bold text-blue-500 mb-2 text-sm">Disclaimer</div>
          <ul className="text-blue-500 text-xs list-disc pl-5">
            <li>
              <span className="font-semibold">Max Interest Rate:</span> The maximum interest rate that can be paid to the investor.
            </li>
            <li>
              <span className="font-semibold">Debt Issued:</span> Total amount of debt issued for fundraising.
            </li>
            <li>
              <span className="font-semibold">Maturity Date:</span> The date when the debt payment is due.
            </li>
          </ul>
        </div>


        <div className="flex justify-center items-center w-full mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-[#FF533F] text-white px-4 py-2 rounded-md w-full cursor-pointer">
                Invest
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{video.info.title}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Interest Rate</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Enter interest rate (%)"
                      className="border rounded px-2 py-1"
                      value={interestRate}
                      onChange={e => setInterestRate(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Amount</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Enter amount to invest"
                      className="border rounded px-2 py-1"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#FF533F] text-white px-4 py-2 rounded-md w-full cursor-pointer mt-2"
                  >
                    Invest
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
      </div>
    </div>
  );
} 