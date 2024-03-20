import { useState } from "react";
import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  useAddRecentTransaction,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, useSendTransaction } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { parseEther } from "viem";
import SendTransaction from "./components/SendTransaction";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base, zora],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider showRecentTransactions={true} theme={darkTheme()}>
            <ConnectButton />
            <SendTransaction />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
