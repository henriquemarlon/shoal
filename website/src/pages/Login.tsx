import React, { useEffect } from "react";
import type { FC } from "react";
import { usePrivy, useLogin, useWallets } from '@privy-io/react-auth';
import { useNavigate } from "react-router-dom";

const userRoles: Record<string, "admin" | "investidor" | "creator"> = {
  "0x4c3529aacE68b6F1cB514145a5058E5Dace69C75": "creator",
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
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
            disabled={disableLogin}
            onClick={() => login({
              loginMethods: ['wallet', 'email'],
              disableSignup: false
            })}
          >
            Log in
          </button>
        </div>
      </div>
  );
};

export default Login; 