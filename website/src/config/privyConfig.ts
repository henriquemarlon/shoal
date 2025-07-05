import type {PrivyClientConfig} from '@privy-io/react-auth';

export const privyConfig: PrivyClientConfig = {
    appearance: {
        walletChainType: 'ethereum-only',
        walletList: ['metamask', 'rainbow', 'wallet_connect'],
    },
    embeddedWallets: {
      ethereum: {
        createOnLogin: 'users-without-wallets'
      }
    },
    supportedChains: [
      {
        id: 11155111,
        name: 'Sepolia',
        nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18
        },
        rpcUrls: {
          default: {
            http: ['https://eth-sepolia.g.alchemy.com/v2/gWR5B3tQIAJtNRcPPKT4d']
          }
        }
      }
    ],
    defaultChain: {
      id: 11155111,
      name: 'Sepolia',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: {
        default: {
          http: ['https://eth-sepolia.g.alchemy.com/v2/gWR5B3tQIAJtNRcPPKT4d']
        }
      }
    }
};
