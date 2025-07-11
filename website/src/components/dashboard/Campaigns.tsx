import React, { useEffect } from "react";
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import VideoInput from "./VideoInput";
import CalendarField from "./CalendarFIeld";
import { VerificationBanner } from "@/components/dashboard/VerificationBanner";
import { useState } from "react";
import { Modal } from "@/components/dashboard/Modal";
import { Outlet } from "react-router-dom";
import { toHex } from "viem";
import { chains, parseChainId } from "@/utils/chain";
import { useWallets } from "@privy-io/react-auth";
import { createWalletClient, custom } from "viem";
import { walletActionsL1 } from "@cartesi/viem";
import { erc20Abi } from "viem";
import { getWalletClient, getClient } from "@/utils/chain";
import { BaseError } from "viem";
import { erc20PortalAddress } from "@cartesi/viem/abi";

const campaigns = [
  { id: 1, percent: 2, status: "Break-even not reached" },
  { id: 2, percent: 100, status: "Break-even reached" },
];

export default function CampaignList() {
  const [verification, setVerification] = useState(false);
  const { wallets } = useWallets();

  useEffect(() => {
    if(localStorage.getItem("verified") === "true"){
      setVerification(true);
    }
  }, []);

  const depositErc20ToPortal = async (token: `0x${string}`, value: bigint, dataPayload: any) => {
    try {
      const wallet = wallets[0];
      const chainId = wallet?.chainId;

      if (!chainId) return;

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

      // Verifica allowance
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

      const data = toHex(JSON.stringify(dataPayload));

      const txHash = await walletClient.depositERC20Tokens({
        account: address,
        token: token,
        chain: chains[parsedChainId],
        execLayerData: data,
        amount: value,
        application: portalAddress,
      });

      await client.waitForTransactionReceipt({ hash: txHash });
    } catch (e) {
      if (e instanceof BaseError) {
        console.error(e.message);
      } else {
        console.error(e);
      }
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      path: "campaign/creator/create",
      data: {
        title: form["campaign-name"].value,
        description: form["campaign-description"].value,
        promotion: form["campaign-promotion"]?.value || "",
        token: import.meta.env.VITE_COLATERAL_TOKEN,
        max_interest_rate: form["max-interest-rate"].value,
        debt_issued: form["debt-issued"].value,
        badge_router: "0x4c3529aacE68b6F1cB514145a5058E5Dace69C75",
        badge_minter: "0x4c3529aacE68b6F1cB514145a5058E5Dace69C75",
        closes_at: Date.now(),
        maturity_at: Date.now(),
      },
    };
    const data = toHex(JSON.stringify(payload));
    await depositErc20ToPortal("0x...", BigInt(payload.data.debt_issued), data);
  };

  return (
    <div className="flex flex-col items-center">

      {!verification && (
        <>
          <VerificationBanner verified={verification} />
          <div className="flex justify-center items-center w-full mt-48">
            <Modal>
              <Outlet />
            </Modal>
          </div>
          
        </>
      )}


      {verification && (
        <div>
          <Dialog>
            <div className="flex justify-end w-full">
              <DialogTrigger asChild>
                <button className="cursor-pointer flex gap-1 items-center mb-6 px-4 py-2 bg-[#FF533F] text-white rounded-lg font-medium shadow">
                  <Plus className="w-4 h-4 mr-2" />
                  Create new campaign
                </button>
              </DialogTrigger>
            </div>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new campaign</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateCampaign} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="campaign-name">Campaign name</label>
                  <input id="campaign-name" type="text" placeholder="Ex: Campaign Name" className="border rounded px-2 py-1" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="campaign-description">Description</label>
                  <textarea id="campaign-description" placeholder="Describe your campaign..." rows={4} className="border rounded-lg px-2 py-1 resize-y min-h-[80px]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="campaign-description">Video Link</label>
                  <input id="campaign-description" placeholder="Video url"  className="border rounded-lg px-2 py-1 py-1]" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="max-interest-rate">Max Interest Rate</label>
                  <input id="max-interest-rate" type="number" step="0.01" placeholder="Ex: 12.5" className="border rounded-lg px-2 py-1" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="debt-issued">Debt Issued</label>
                  <input id="debt-issued" type="number" step="0.01" placeholder="Ex: 10000" className="border rounded-lg px-2 py-1" />
                </div>

                <CalendarField label="Closes At" value={undefined} setValue={() => { }} />
                <CalendarField label="Maturity At" value={undefined} setValue={() => { }} />

                <Button type="submit" className="mt-2 bg-[#FF533F] hover:bg-[#FF533F]/80 text-white cursor-pointer">Create</Button>
              </form>
            </DialogContent>
          </Dialog>

          <div className="flex w-full">
            <div className="grid grid-cols-4 gap-8 w-[100%]">

              {campaigns.map((c) => (
                <div
                  key={c.id}
                  className="w-78 border-1 border-gray-200 bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow"
                >
                  <div className="text-xl font-semibold"> Campaign Name </div>
                  <div className="text-xs text-gray-500 mb-2">Started on: 05/07/2025</div>


                  <div className="font-semibold text-sm">Raised amount:</div>
                  <div className="mb-4 text-xs text-gray-500">{c.percent}%</div>

                  <div className="font-semibold text-sm">Status:</div>
                  <div className="text-xs text-gray-500">{c.status}</div>
                </div>
              ))}

              {campaigns.length === 0 && (
                <div className="text-center text-gray-500">No campaigns found</div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
} 