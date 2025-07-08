import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { usePrivy, useLogin, useWallets } from '@privy-io/react-auth';
import { useNavigate } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
import ShoalLogo from "@/images/LogoShoal";
import { toast } from "sonner"
import { Toaster } from "sonner";
import { type Hex, fromHex } from "viem";


// const userRoles: Record<string, "admin" | "investor" | "creator"> = {
//   "0xD554153658E8D466428Fa48487f5aba18dF5E628": "admin",
//   "0xaCAB2057C130B3Ac2C028d8823f21859f8Afdf3C": "creator",
//   "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266": "investor",
//   "emanuele.lmorais@gmail.com": "investor",
//   "emanuele.morais.ismart@gmail.com": "admin"
// };


interface Report {
  payload: Hex;
}


const Login: FC = () => {
  const { ready, authenticated, logout } = usePrivy();
  const { login } = useLogin();
  const { wallets } = useWallets();
  const navigate = useNavigate();

  const [reports, setReports] = useState<Report[]>([]);

  const inspectCall = async (address: string): Promise<string> => {
    const payload = JSON.stringify({
      path: "user/address",
      data: { address }
    });
    
    let apiURL = "";

    const node = import.meta.env.VITE_NODE_ADDRESS;
    const appAddress = import.meta.env.VITE_CARTESI_APPLICATION_ADDRESS;

    if (node) {
      apiURL = `${node}/inspect/${appAddress}`;
    } else {
      console.error(`Node address not defined`);
      return "noRole";
    }

    try {
      const payloadBlob = new TextEncoder().encode(payload);
      const response = await fetch(`${apiURL}`, { method: "POST", body: payloadBlob });
      const data = await response.json();
      
      setReports(data.reports);
      console.log(reports);
      
      // Process the report payload
      if (data.reports && data.reports.length > 0) {
        const reportPayload = fromHex(data.reports[0].payload, "string");
        console.log("Report payload:", reportPayload);

        if (reportPayload.includes("Error: failed to find User: user not found")) {
          console.log("NotRole");
          return "noRole";
        }
        
        // Try to parse the payload to get the role
        try {
          const parsedPayload = JSON.parse(reportPayload);
          console.log(parsedPayload.role)
          return parsedPayload.role || "noRole";
        } catch {
          return "noRole";
        }
      }
      
      return "noRole";
    } catch (error) {
      console.error("Error in inspect call:", error);
      return "noRole";
    }
  };

  

  const userAddress = wallets?.[0]?.address;
  
  useEffect(() => {
    if (ready && authenticated && userAddress) {
      // Call inspect to check user data
      const checkRole = async () => {
        const role = await inspectCall(userAddress);
        
        if (role === "admin") navigate("/admin");
        else if (role === "creator") navigate("/panel");
        else if (role === "investor") navigate("/investor");
        else {
          toast.error("It looks like you are not registered in the system. Please contact the administrator.");
          logout();
          navigate("/login");
        }
      };
      
      checkRole();
    }

  }, [ready, authenticated, userAddress, navigate]);

  if (!ready) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const disableLogin = !ready || (ready && authenticated);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Toaster />
        <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center w-[20%]">
          <ShoalLogo />
          <p className="text-gray-600 mb-6 text-center">Please log in to continue</p>
          <button
            className="flex items-center justify-center bg-[#FF533F] cursor-pointer text-white px-6 py-2 rounded-lg font-medium transition-colors"
            disabled={disableLogin}
            onClick={() => login({
              loginMethods: ['wallet', 'email'],
              disableSignup: false
            })}
          >
            Log in
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
  );
};

export default Login; 