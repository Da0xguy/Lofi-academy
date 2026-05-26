import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { SuiJsonRpcClient, getJsonRpcFullnodeUrl, JsonRpcHTTPTransport } from '@mysten/sui/jsonRpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mysten/dapp-kit/dist/index.css';

const networks = {
  localnet: new SuiJsonRpcClient({
    transport: new JsonRpcHTTPTransport({ url: getJsonRpcFullnodeUrl('localnet') }),
    network: 'localnet'
  }),
  testnet: new SuiJsonRpcClient({
    transport: new JsonRpcHTTPTransport({ url: getJsonRpcFullnodeUrl('testnet') }),
    network: 'testnet'
  }),
  mainnet: new SuiJsonRpcClient({
    transport: new JsonRpcHTTPTransport({ url: getJsonRpcFullnodeUrl('mainnet') }),
    network: 'mainnet'
  }),
};

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="localnet">
        <WalletProvider autoConnect>
          <App />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </StrictMode>,
);
