import React, { useEffect } from "react";
import type { FC } from "react";
import { usePrivy, useLogin, useWallets } from '@privy-io/react-auth';
import { useNavigate } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
import ShoalLogo from "@/images/LogoShoal";

const userRoles: Record<string, "admin" | "investidor" | "creator"> = {
  "0x4c3529aacE68b6F1cB514145a5058E5Dace69C75": "admin",
  "0xaCAB2057C130B3Ac2C028d8823f21859f8Afdf3C": "creator",
};

const Login: FC = () => {
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();
  const { wallets } = useWallets();
  const navigate = useNavigate();

  const userAddress = wallets?.[0]?.address;

  useEffect(() => {
    if (ready && authenticated && userAddress) {
      const role = userRoles[userAddress]; 
      if (role === "admin") navigate("/admin");
      else if (role === "creator") navigate("/panel");
      
      else navigate("/login");
    }

  }, [ready, authenticated, userAddress, navigate]);

  if (!ready) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const disableLogin = !ready || (ready && authenticated);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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