import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function ProfileCard() {
  const { user, linkEmail, linkTwitter } = usePrivy();
  const [emailTooltip, setEmailTooltip] = useState(false);
  const email = user?.email?.address || "";
  const wallet = user?.wallet?.address || "";
  const twitter = user?.twitter?.username || "";


  return (
    <div className="max-w-[1/3] h-[30%] max-w-full bg-white rounded-xl shadow p-6 flex flex-col gap-4">

      <div className="font-semibold text-2xl mb-4">Profile</div>

      <div className="flex flex-col gap-4 justify-center">
        
        <div>
          <div className="font-semibold text-md">Email</div>
          <div className="text-gray-700 break-all text-sm">{email}</div>
          {!email && (
            <Button
              onClick={() => linkEmail && linkEmail()}
              className="bg-[#ff533f] text-xs cursor-pointer hover:bg-[#ff533f]/80 w-28"
            >
              Connect Email
            </Button>
          )}
          {email && (
            <div className="text-gray-700 break-all text-sm">{email}</div>
          )}
        </div>


       <div>
          <div className="font-semibold text-md">Twitter</div>
          {!twitter && (
            <Button
              onClick={() => linkTwitter && linkTwitter()}
              className="bg-[#ff533f] text-xs cursor-pointer hover:bg-[#ff533f]/80 w-28"
            >
              Connect Twitter
            </Button>
          )}
          {twitter && (
            <div className="text-gray-700 break-all text-sm">{twitter}</div>
          )}
        </div>
        
        <div>
          <div className="font-semibold text-md">Wallet</div>
          <div className="text-gray-700 break-all text-sm">{wallet}</div>
        </div>

      </div>

    </div>
  );
}