import React, { useState } from "react";
import { ArrowRightLeft, BookOpen, CircleAlert, Sparkles, TrendingUp, ShieldCheck, RefreshCw, Zap, Landmark } from "lucide-react";
import { motion } from "motion/react";

interface DeFiSimulatorProps {
  onEarnXP: (xp: number) => void;
  walletConnected: boolean;
}

export function DeFiSimulator({ onEarnXP, walletConnected }: DeFiSimulatorProps) {
  const [activeTab, setActiveTab] = useState<"swap" | "lend">("swap");
  
  // Swap State
  const [swapFrom, setSwapFrom] = useState<"SUI" | "USDC">("SUI");
  const [swapAmount, setSwapAmount] = useState<string>("10");
  const [slippage, setSlippage] = useState<number>(0.5);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [swapReceipt, setSwapReceipt] = useState<any | null>(null);

  // Lending State
  const [supplyAmount, setSupplyAmount] = useState<string>("100");
  const [borrowAmount, setBorrowAmount] = useState<string>("40");
  const [isLending, setIsLending] = useState<boolean>(false);
  const [lendReceipt, setLendReceipt] = useState<any | null>(null);

  // Conversion rates Mocked
  const SUI_PRICE = 2.45; // 1 SUI = 2.45 USDC
  const GAS_SWAP_ESTIMATE = 0.0035; // ~0.0035 SUI

  // 1. Execute SWAP
  const handleSwapExecute = () => {
    setIsSwapping(true);
    setSwapReceipt(null);
    
    // Simulate lightning-fast Sui validation
    setTimeout(() => {
      const amountVal = parseFloat(swapAmount) || 0;
      if (amountVal <= 0) {
        setIsSwapping(false);
        return;
      }

      let fromCurrency = swapFrom;
      let toCurrency = swapFrom === "SUI" ? "USDC" : "SUI";
      
      let convertedAmount = fromCurrency === "SUI" 
        ? amountVal * SUI_PRICE 
        : amountVal / SUI_PRICE;

      // Deduct slippage slightly for authenticity
      const slippageLoss = convertedAmount * (slippage / 100) * (Math.random() * 0.9);
      const finalReceived = convertedAmount - slippageLoss;

      const randomHex = () => Math.floor(Math.random() * 16).toString(16);
      const txHash = "0x" + Array.from({ length: 48 }, randomHex).join("");
      
      setSwapReceipt({
        txHash: txHash.slice(0, 20) + "...",
        amountIn: amountVal.toFixed(2),
        currencyIn: fromCurrency,
        amountOut: finalReceived.toFixed(4),
        currencyOut: toCurrency,
        gasBudget: GAS_SWAP_ESTIMATE,
        routingPath: `Cetus Optimized Pool [${fromCurrency} &rarr; ${toCurrency}]`,
        executionLatencyMs: 140 + Math.floor(Math.random() * 80), // sub-second!
        logs: [
          `[DEX_API] Found swap route: Cetus Smart Router Pool V3`,
          `[MOVE_TX] Executing function: cetus::pool::swap_a_to_b`,
          `[MOVE_OBJECT] Lock object reference 0x6e8e040f::pool::Pool`,
          `[MUTATE] Deducted SUI package account balances...`,
          `[EVENT] cetus::pool::SwapEvent { sender_address: 0x..., amount_in: ${amountVal}, amount_out: ${finalReceived.toFixed(2)} }`,
          `[SUCCESS] Checked double spend, state persistent, gas settled.`
        ]
      });
      setIsSwapping(false);
      onEarnXP(15); // reward for experimenting with simulator
    }, 900);
  };

  // 2. Execute LENDING SUPPLY/BORROW
  const handleLendingExecute = () => {
    setIsLending(true);
    setLendReceipt(null);

    setTimeout(() => {
      const supVal = parseFloat(supplyAmount) || 0;
      const borVal = parseFloat(borrowAmount) || 0;

      if (supVal <= 0) {
        setIsLending(false);
        return;
      }

      const collateralValueUSDC = supVal * SUI_PRICE;
      const borrowValueUSDC = borVal; // borrow stables directly
      const ltv = (borrowValueUSDC / collateralValueUSDC) * 100;
      
      // Health factor: collateral / borrow relative to 1.3 buffer
      const healthFactor = ltv === 0 ? 999 : (collateralValueUSDC * 0.75) / borrowValueUSDC;

      const randomHex = () => Math.floor(Math.random() * 16).toString(16);
      const txHash = "0x" + Array.from({ length: 48 }, randomHex).join("");

      setLendReceipt({
        txHash: txHash.slice(0, 20) + "...",
        ltv: ltv.toFixed(1),
        healthFactor: healthFactor.toFixed(2),
        isSafe: healthFactor >= 1.0,
        logs: [
          `[LEND_API] Initializing Navi Lending module...`,
          `[MOVE_TX] Executing: navi::incentive::deposit_and_borrow`,
          `[MOVE_CHECK] Verifying Loan-To-Value parameter against collateral limits`,
          `[EVENT] navi::lending::LendingCapsChanged { ltv_ratio: ${ltv.toFixed(1)}%, health_factor: ${healthFactor.toFixed(2)} }`,
          `[SUCCESS] Position tracked. Liquidation line triggers at health factor < 1.0.`
        ]
      });

      setIsLending(false);
      onEarnXP(20); // reward
    }, 1100);
  };

  const calculatedOutput = swapFrom === "SUI" 
    ? (parseFloat(swapAmount) || 0) * SUI_PRICE 
    : (parseFloat(swapAmount) || 0) / SUI_PRICE;

  return (
    <div id="defi-simulator" className="bg-white border-2 border-[#3c3c3c] rounded-3xl p-6 shadow-[4px_4px_0px_0px_#3c3c3c] my-4 text-[#3c3c3c]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-dashed border-[#3c3c3c]/15 pb-4 mb-5">
        <div>
          <h2 className="text-xl font-bold font-serif flex items-center gap-2 text-[#3c3c3c]">
            <TrendingUp size={22} className="text-[#D67B52]" />
            <span>Interactive Sui DeFi Sandbox</span>
          </h2>
          <p className="text-xs text-[#6D5D6E] mt-1 font-semibold">
            Experience real blockchain math, gas refunds, risk factors and slippage triggers offline.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-[#F3EFEA] p-1.5 rounded-xl border-2 border-[#3c3c3c] text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab("swap")}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === "swap" 
                ? "bg-white text-[#D67B52] border-2 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c]" 
                : "text-[#6D5D6E] hover:text-[#3c3c3c] border border-transparent"
            }`}
          >
            AMM Token Swap
          </button>
          <button
            onClick={() => setActiveTab("lend")}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === "lend" 
                ? "bg-white text-[#D67B52] border-2 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c]" 
                : "text-[#6D5D6E] hover:text-[#3c3c3c] border border-transparent"
            }`}
          >
            Lending Vault (Navi)
          </button>
        </div>
      </div>

      {!walletConnected && (
        <div className="bg-amber-50 border-2 border-amber-600 rounded-2xl p-4 flex items-start gap-3 mb-4 text-amber-950 font-medium shadow-[2px_2px_0px_0px_#3c3c3c]/15">
          <CircleAlert size={18} className="text-amber-700 shrink-0 mt-0.5 animate-bounce" />
          <div className="text-xs">
            <h4 className="font-bold text-amber-800 uppercase tracking-wide">Wallet Mode Offline</h4>
            <p className="text-amber-900/80 mt-1">
              connect your simulated sui wallet in the profile pane above to enable real testnet state recordings on the leaderboard!
            </p>
          </div>
        </div>
      )}

      {/* ----------------- TAB 1: SWAP SIMULATOR ----------------- */}
      {activeTab === "swap" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-[#F3EFEA] p-4 rounded-3xl border-2 border-[#3c3c3c] relative shadow-[3px_3px_0px_0px_#3c3c3c]">
              <span className="absolute right-3 top-3 px-2 py-0.5 bg-white rounded-md border-2 border-[#3c3c3c] font-mono text-[9px] text-[#89A8B2] font-bold">
                Live Rate: 1 SUI = {SUI_PRICE} USDC
              </span>

              <h3 className="text-xs font-mono text-[#D67B52] font-bold mb-3 uppercase tracking-wider">Exchange Swap Desk</h3>
              
              <div className="space-y-3">
                {/* Outgoing Asset */}
                <div>
                  <div className="flex justify-between text-xs text-[#6D5D6E] font-bold mb-1">
                    <label>Amount (Pay)</label>
                    <span className="font-mono">Balance: 50.00 {swapFrom}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border-2 border-[#3c3c3c] shadow-[2px_2px_0px_0px_#c3c3c3]/10">
                    <input
                      type="number"
                      value={swapAmount}
                      onChange={(e) => setSwapAmount(e.target.value)}
                      className="w-full bg-transparent font-mono text-lg font-bold text-[#3c3c3c] focus:outline-none placeholder-gray-400"
                      placeholder="0.0"
                    />
                    <select
                      value={swapFrom}
                      onChange={(e) => {
                        const val = e.target.value as "SUI" | "USDC";
                        setSwapFrom(val);
                      }}
                      className="bg-[#F3EFEA] border-2 border-[#3c3c3c] p-1.5 rounded-lg text-xs font-mono focus:outline-none text-[#D67B52] font-bold shadow-[1px_1px_0px_0px_#3c3c3c] cursor-pointer"
                    >
                      <option value="SUI">SUI</option>
                      <option value="USDC">USDC</option>
                    </select>
                  </div>
                </div>

                {/* Flip Button */}
                <div className="flex justify-center -my-1">
                  <button
                    onClick={() => setSwapFrom(swapFrom === "SUI" ? "USDC" : "SUI")}
                    className="p-1.5 bg-white border-2 border-[#3c3c3c] rounded-xl hover:bg-[#F3EFEA] hover:shadow-[1px_1px_0px_0px_#3c3c3c] transition-all cursor-pointer active:translate-y-[1px]"
                  >
                    <ArrowRightLeft size={14} className="text-[#D67B52]" />
                  </button>
                </div>

                {/* Incoming Asset */}
                <div>
                  <div className="flex justify-between text-xs text-[#6D5D6E] font-bold mb-1">
                    <label>Estimate Received</label>
                    <span className="font-mono text-[10px]">Rate: 1 USDC = {(1 / SUI_PRICE).toFixed(3)} SUI</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border-2 border-dashed border-[#3c3c3c] text-[#3c3c3c]">
                    <span className="font-mono text-lg font-extrabold text-[#3c3c3c]">
                      {calculatedOutput ? calculatedOutput.toFixed(4) : "0.00"}
                    </span>
                    <span className="font-mono text-xs font-extrabold text-[#89A8B2]">
                      {swapFrom === "SUI" ? "USDC" : "SUI"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Slippage Toggle */}
            <div className="bg-[#F3EFEA] p-3.5 rounded-2xl border-2 border-[#3c3c3c] shadow-[3px_3px_0px_0px_#3c3c3c]">
              <label className="text-xs font-mono text-[#D67B52] font-bold block mb-2">Max Price Slippage Penalty</label>
              <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                {[0.1, 0.5, 1.0].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSlippage(val)}
                    className={`py-1 rounded-lg border-2 transition-all cursor-pointer font-bold ${
                      slippage === val 
                        ? "bg-white text-[#D67B52] border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c]" 
                        : "bg-white border-transparent text-[#6D5D6E] hover:border-[#3c3c3c]/30"
                    }`}
                  >
                    {val}%
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setSlippage(2.0)}
                  className={`py-1 rounded-lg border-2 transition-all cursor-pointer font-bold ${
                    slippage === 2.0 
                      ? "bg-white text-[#D67B52] border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c]" 
                      : "bg-white border-transparent text-[#6D5D6E] hover:border-[#3c3c3c]/30"
                  }`}
                >
                  Custom (2%)
                </button>
              </div>
            </div>

            <button
              onClick={handleSwapExecute}
              disabled={isSwapping || !swapAmount || parseFloat(swapAmount) <= 0}
              className="w-full py-3 bg-[#D67B52] hover:bg-[#D67B52]/90 disabled:opacity-50 text-white border-2 border-[#3c3c3c] font-bold font-mono rounded-2xl text-xs hover:shadow-[4px_4px_0px_0px_#3c3c3c] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:translate-y-[1px]"
            >
              {isSwapping ? (
                <>
                  <RefreshCw className="animate-spin text-white" size={14} />
                  <span>Iterating on-chain order bounds...</span>
                </>
              ) : (
                <>
                  <Zap size={14} fill="currentColor" />
                  <span>Execute Swap at Cetus AMM V3</span>
                </>
              )}
            </button>
          </div>

          {/* Swap output Console visual logger */}
          <div className="bg-[#1e1e1e] border-2 border-[#3c3c3c] rounded-2xl p-4 font-mono text-xs text-stone-200 min-h-[300px] flex flex-col justify-between shadow-[4px_4px_0px_0px_#3c3c3c]">
            <div>
              <div className="flex items-center gap-2 border-b border-[#3c3c3c] pb-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] text-stone-400 font-bold">SUI TRANSACTION EXECUTOR MONITOR</span>
              </div>

              {swapReceipt ? (
                <div className="space-y-3">
                  <div className="p-2 border-2 border-emerald-600 bg-emerald-950/45 rounded-xl text-green-300">
                    <div className="font-extrabold flex items-center gap-1 text-[11px]">
                      <ShieldCheck size={14} />
                      <span>SWAP MUTATION CONFIRMED</span>
                    </div>
                    <div className="text-[10px] text-stone-400 mt-1">Transaction Block Hash:</div>
                    <div className="text-[10px] text-amber-300 font-bold break-all bg-black/40 p-1.5 rounded">{swapReceipt.txHash}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-black/30 p-2.5 rounded-lg border border-[#3c3c3c]">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Sent:</span>
                      <strong className="text-white">{swapReceipt.amountIn} {swapReceipt.currencyIn}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Received:</span>
                      <strong className="text-[#89A8B2]">{swapReceipt.amountOut} {swapReceipt.currencyOut}</strong>
                    </div>
                    <div className="col-span-2 border-t border-[#3c3c3c]/30 my-1"></div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Execution speed:</span>
                      <strong className="text-green-400">{swapReceipt.executionLatencyMs} ms</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Est Gas Fee:</span>
                      <strong className="text-amber-200">{swapReceipt.gasBudget} SUI</strong>
                    </div>
                  </div>

                  <div className="space-y-1 text-[10px] text-stone-400 max-h-24 overflow-y-auto font-mono opacity-80 select-none leading-relaxed">
                    {swapReceipt.logs.map((log: string, idx: number) => (
                      <div key={idx} className={log.includes("[SUCCESS]") ? "text-[#2ecc71] font-bold" : ""}>{log}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-stone-400">
                  <ArrowRightLeft className="mx-auto text-stone-500 mb-2 animate-bounce" size={32} />
                  <p className="text-[11px] font-bold">awaiting transaction trigger parameters...</p>
                  <p className="text-[9px] text-stone-500 mt-1">interactive pool reserves: 50,000 SUI / 122,500 USDC</p>
                </div>
              )}
            </div>

            <div className="text-center pt-2 border-t border-[#3c3c3c] text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wide">
              ★ completed simulator checks reward: +15 XP Point
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TAB 2: LENDING SIMULATOR ----------------- */}
      {activeTab === "lend" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-[#F3EFEA] p-4 rounded-3xl border-2 border-[#3c3c3c] relative shadow-[3px_3px_0px_0px_#3c3c3c]">
              <span className="absolute right-3 top-3 px-2 py-0.5 bg-white rounded-md border-2 border-[#3c3c3c] font-mono text-[9px] text-[#D67B52] flex items-center gap-1 font-bold shadow-[1px_1px_0px_0px_#3c3c3c]">
                <Landmark size={10} />
                Navi Protocol Partner
              </span>

              <h3 className="text-xs font-mono text-[#D67B52] font-bold mb-3 uppercase tracking-wider">Lending Portfolio Structure</h3>

              <div className="space-y-3 font-mono">
                {/* Collateral supplied */}
                <div>
                  <label className="text-xs text-[#6D5D6E] font-bold block mb-1">1. Deposit SUI Collateral (Supplied)</label>
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border-2 border-[#3c3c3c] shadow-[2px_2px_0px_0px_#c3c3c3]/10">
                    <input
                      type="number"
                      value={supplyAmount}
                      onChange={(e) => setSupplyAmount(e.target.value)}
                      className="w-full bg-transparent text-[#3c3c3c] font-mono text-lg font-bold focus:outline-none"
                    />
                    <span className="text-xs text-[#D67B52] font-extrabold">SUI</span>
                  </div>
                  <span className="text-[10px] text-[#6D5D6E] font-bold block mt-1">
                    Value in USD: ${(parseFloat(supplyAmount) * SUI_PRICE || 0).toFixed(2)} USDC
                  </span>
                </div>

                {/* Borrowed stables asset */}
                <div>
                  <div className="flex justify-between text-xs text-[#6D5D6E] font-bold mb-1">
                    <label>2. Borrow Stable Asset (USDC)</label>
                    <span className="text-[#D67B52] text-[10px]">Max Safe Borrow (70%): ${(parseFloat(supplyAmount) * SUI_PRICE * 0.7 || 0).toFixed(1)} USDC</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border-2 border-[#3c3c3c] shadow-[2px_2px_0px_0px_#c3c3c3]/10">
                    <input
                      type="number"
                      value={borrowAmount}
                      onChange={(e) => setBorrowAmount(e.target.value)}
                      className="w-full bg-transparent text-[#3c3c3c] font-mono text-lg font-bold focus:outline-none"
                    />
                    <span className="text-xs text-[#89A8B2] font-extrabold">USDC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic visual health indicator calculated internally */}
            {(() => {
              const sup = parseFloat(supplyAmount) || 0;
              const bor = parseFloat(borrowAmount) || 0;
              const colVal = sup * SUI_PRICE;
              const ltv = colVal === 0 ? 0 : (bor / colVal) * 100;
              const healthFactor = ltv === 0 ? 999 : (colVal * 0.75) / bor;

              return (
                <div className="bg-[#F3EFEA] p-4 rounded-2xl border-2 border-[#3c3c3c] shadow-[3px_3px_0px_0px_#3c3c3c]">
                  <div className="flex justify-between text-xs mb-1 font-mono text-[#3c3c3c] font-bold">
                    <span>Position Health Margin:</span>
                    <span className={`${healthFactor >= 1.5 ? "text-green-700 font-extrabold" : healthFactor >= 1.0 ? "text-yellow-700 font-extrabold" : "text-rose-700 font-extrabold animate-pulse"}`}>
                      {healthFactor > 100 ? "∞" : healthFactor.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-white border-2 border-[#3c3c3c] h-3.5 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${healthFactor >= 1.5 ? "bg-emerald-500" : healthFactor >= 1.0 ? "bg-amber-500" : "bg-red-500 animate-pulse"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (healthFactor / 3) * 100)}%` }}
                      transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    ></motion.div>
                  </div>
                  <div className="flex justify-between text-[9px] text-[#6D5D6E] mt-1 font-mono font-bold">
                    <span>0.0 (Liquidation line)</span>
                    <span>1.5 (Secure)</span>
                    <span>3.0+ (Safe Haven)</span>
                  </div>

                  {healthFactor < 1.0 && (
                    <div className="mt-2.5 p-2 bg-red-50 border-2 border-red-600 text-[10px] text-red-800 rounded-lg flex items-start gap-1 font-semibold">
                      <CircleAlert size={12} className="shrink-0 mt-0.5 text-red-600" />
                      <span>Warning! Your health margin is critical. Yeti liquidators will borrow write locks and acquire SUI cheap!</span>
                    </div>
                  )}
                </div>
              );
            })()}

            <button
              onClick={handleLendingExecute}
              disabled={isLending || !supplyAmount || parseFloat(supplyAmount) <= 0}
              className="w-full py-3 bg-[#D67B52] hover:bg-[#D67B52]/90 disabled:opacity-50 text-white border-2 border-[#3c3c3c] font-bold font-mono rounded-2xl text-xs hover:shadow-[4px_4px_0px_0px_#3c3c3c] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:translate-y-[1px]"
            >
              {isLending ? (
                <>
                  <RefreshCw className="animate-spin text-white" size={14} />
                  <span>Submitting isolated vault collateral...</span>
                </>
              ) : (
                <>
                  <Landmark size={14} fill="currentColor" />
                  <span>Execute Navi Vault Loan</span>
                </>
              )}
            </button>
          </div>

          {/* Lending output Console */}
          <div className="bg-[#1e1e1e] border-2 border-[#3c3c3c] rounded-2xl p-4 font-mono text-xs text-stone-200 min-h-[300px] flex flex-col justify-between shadow-[4px_4px_0px_0px_#3c3c3c]">
            <div>
              <div className="flex items-center gap-2 border-b border-[#3c3c3c] pb-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></div>
                <span className="text-[10px] text-stone-400 font-bold">NAVI VAULT TRANSFERS MONITOR</span>
              </div>

              {lendReceipt ? (
                <div className="space-y-3">
                  <div className={`p-2 border-2 rounded-xl text-[11px] font-bold ${lendReceipt.isSafe ? "border-emerald-600 bg-emerald-950/45 text-emerald-300" : "border-rose-600 bg-rose-950/45 text-rose-300"}`}>
                    <div className="font-extrabold flex items-center gap-1">
                      <ShieldCheck size={14} />
                      <span>{lendReceipt.isSafe ? "Lending Position Established" : "Vulnerable Borrow Slipped"}</span>
                    </div>
                    <div className="text-[10px] text-stone-400 mt-1 font-medium">Transaction digest:</div>
                    <div className="text-[9px] text-amber-200 break-all bg-black/40 p-1.5 rounded">{lendReceipt.txHash}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-black/30 p-2.5 rounded-lg border border-[#3c3c3c]">
                    <div>
                      <span className="text-stone-400 block text-[10px]">LTV Index:</span>
                      <strong className="text-white">{lendReceipt.ltv}%</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Health Rating:</span>
                      <strong className={lendReceipt.isSafe ? "text-green-400" : "text-rose-400 font-bold animate-pulse"}>
                        {lendReceipt.healthFactor}
                      </strong>
                    </div>
                  </div>

                  <div className="space-y-1 text-[10px] text-stone-400 max-h-24 overflow-y-auto leading-relaxed">
                    {lendReceipt.logs.map((log: string, idx: number) => (
                      <div key={idx} className={log.includes("[SUCCESS]") ? "text-green-400 font-bold" : ""}>{log}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-stone-400">
                  <Landmark className="mx-auto text-stone-500 mb-2 animate-pulse" size={32} />
                  <p className="text-[11px] font-bold">awaiting position parameters deposit...</p>
                  <p className="text-[9px] text-stone-500 mt-1">standard navi pool apys: +4.8% SUI, -6.1% USDC cost</p>
                </div>
              )}
            </div>

            <div className="text-center pt-2 border-t border-[#3c3c3c] text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wide">
              ★ completed lending calculations: +20 XP Point
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
