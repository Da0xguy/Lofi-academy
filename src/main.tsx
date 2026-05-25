import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";

import { DAppKitProvider } from "@mysten/dapp-kit-react";
import { dAppKit } from "./dapp-kit";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <DAppKitProvider dAppKit={dAppKit}>
      <App />
    </DAppKitProvider>
  </React.StrictMode>
);
