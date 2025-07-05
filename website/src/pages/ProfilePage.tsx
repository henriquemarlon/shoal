import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { steps } from "@/utils/steps";
import { Modal } from "@/components/dashboard/Modal";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { VerificationBanner } from "@/components/dashboard/VerificationBanner";

function ProfileCard() {
  const { user, linkEmail, linkWallet } = usePrivy();
  const [emailTooltip, setEmailTooltip] = useState(false);
  const email = user?.email?.address || "";
  const wallet = user?.wallet?.address || "";

  return (
    <div className="w-1/2 h-72 max-w-full bg-white rounded-xl shadow p-6 flex flex-col gap-4">
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
      <div>
        <div className="font-semibold text-md mb-1">Wallet</div>
        <div className="text-gray-700 break-all text-sm">{wallet}</div>
      </div>
    </div>
  );
}

const ProfilePage = () => {
  const [isVerified, setIsVerified] = useState(false);
  // useEffect(() => {
  //   setIsVerified(true);
  // }, []);

  return (
    <div className="flex bg-gray-100">
      <main className="flex-1">
        <VerificationBanner verified={isVerified} />
        <div className="flex w-full gap-8 items-start"> 
        <ProfileCard />
          {!isVerified && (
            <Modal>
              <Outlet />
            </Modal>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage; 