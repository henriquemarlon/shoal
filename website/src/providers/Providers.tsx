'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { WagmiProvider } from '@privy-io/wagmi';
import { wagmiConfig } from '../config/wagmiConfig';
import { privyConfig } from '../config/privyConfig';


export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  const appId = "cmcphxr6200x4ju0llgbuhto3";

  return (
    <PrivyProvider
      appId={appId}
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
            {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}