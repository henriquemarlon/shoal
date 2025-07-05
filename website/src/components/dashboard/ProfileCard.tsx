import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ProfileCard() {
    const { user, linkEmail, linkWallet } = usePrivy();
    const [emailTooltip, setEmailTooltip] = useState(false);
    const email = user?.email?.address || "";
    const wallet = user?.wallet?.address || "";
  
    return (
      <div className="w-1/2 h-[30%] max-w-full bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        <div>
          <div className="font-semibold text-2xl mb-4">Profile</div>
          
          <div className="font-semibold text-md mb-1">Email</div>
          <div className="text-gray-700 break-all text-sm">{email}</div>
          {!email && (
            <Button
              onClick={() => linkEmail && linkEmail()}
              className="px-8 bg-[#ff533f] cursor-pointer hover:bg-[#ff533f]/80"
            >
              Connect Email
            </Button>
          )}
        </div>
        <div className="mt-4">
          <div className="font-semibold text-md mb-1">Wallet</div>
          <div className="text-gray-700 break-all text-sm">{wallet}</div>
        </div>
      </div>
    );
  }