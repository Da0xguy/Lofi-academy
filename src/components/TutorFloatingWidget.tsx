import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, RefreshCw, X, Coffee, BookOpen } from "lucide-react";

// Client-side customized educational response generator when API server is unavailable/static
function generateOfflineYetiReply(promptText: string, track?: string, lesson?: string): string {
  const prompt = promptText.toLowerCase();

  if (prompt.includes("double-spend") || prompt.includes("prevent") || prompt.includes("double spend") || prompt.includes("compiler")) {
    return `ah! move's type-safety and copy/drop control is legendary! the move compiler strictly enforces rules around resource ownership. 

in move, assets cannot be implicitly copied or discarded unless explicitly permitted by their type abilities (such as "copy" or "drop"). this prevents duplicate asset creations (double spending) and dangling pointers completely at the bytecode/virtual machine runtime level! yeti thinks you are totally secure here.`;
  }

  if (prompt.includes("object") || prompt.includes("why everything") || prompt.includes("id") || prompt.includes("ownership")) {
    return `oh, you want to explore sui objects! unlike traditional blockchains (like EVM) which store global ledger entries inside nested mapping variables, sui represents everything as self-contained, typed structural objects on-chain!

each object has a unique 32-byte hash id. because they have explicit ownership (such as Owned by address, Shared, or Immutable), owned objects bypass global validator voting pipelines entirely! client transactions complete instantly under 100ms. so cozy and fast!`;
  }

  if (prompt.includes("storage fund") || prompt.includes("gas") || prompt.includes("rebate") || prompt.includes("stable")) {
    return `sui's storage fund model is a classic piece of economic engineering! when your transactions put new data on-chain, you pay standard storage fees that are added to the general storage fund.

this fund yield stakes rewards to validators to compensate them for storing historic data. and here's the coolest lofi secret: if you delete or clean up your old objects later on, you claim a partial gas rebate refund back! keeps the ledger super lightweight.`;
  }

  if (prompt.includes("kiosk") || prompt.includes("royalt") || prompt.includes("creator") || prompt.includes("policy")) {
    return `sui kiosks are secure on-chain houses for trading and lock-bounding digital assets! 

a kiosk guarantees that creator royalty policies and exchange logic are strictly executed during peer trades. buyers cannot bypass transfer-policy hooks; they must satisfy standard rules to unlock ownership. this provides decentralized, non-custodial safety for creators!`;
  }

  if (prompt.includes("solidity") || prompt.includes("evm") || prompt.includes("language") || prompt.includes("move vs")) {
    return `an excellent comparison, my code-crafting friend! solidity uses a legacy account-balance ledger model with global dynamic storage lookups. this makes parallel computation and reentrancy execution highly risky to secure.

move defines objects directly in structures and enforces structural field safety. there is no risk of runtime reentrancy attacks, making move secure by design! grab some hot coffee and relax.`;
  }

  if (prompt.includes("cetus") || prompt.includes("navi") || prompt.includes("lend") || prompt.includes("swap") || prompt.includes("defi")) {
    return `the degy-desk is absolutely buzzing! cetus acts as sui's premier concentrated liquidity AMM, routing swap orders in tight price bands to reduce slippage triggers.

navi implements a high-throughput liquidity bridge structure where you deposit collateral (such as SUI) to borrow other assets (like USDC) safely. check out our real-time math-simulations tab just below, it executes the equations live!`;
  }

  if (prompt.includes("consensus") || prompt.includes("bullshark") || prompt.includes("mysticeti") || prompt.includes("parallel")) {
    return `the speed of light! ordinary blockchains force all transactions to wait in a single, global queue line. sui separates this completely!

it uses Narwhal as a high-throughput parallel mempool, and Bullshark (or Mysticeti) to finalize shared state updates under 300ms! for simple owned-object transfers, it bypasses consensus entirely for absolute instant speeds! yeti wants to dance with you!`;
  }

  if (prompt.includes("hello") || prompt.includes("hi") || prompt.includes("hey") || prompt.includes("who are you") || prompt.includes("yeti")) {
    return `hey there, cozy friend! grab your blanket and a hot drink. i am yeti the tutor, your helpful code companion here at lofi query space.

ask me anything about move bytecode validation, parallel execution paths, object structures, or economic fee parameters! relax and feel the lofi chord loops playing in your ears.`;
  }

  if (prompt.includes("badge") || prompt.includes("mint") || prompt.includes("earn") || prompt.includes("quiz") || prompt.includes("score")) {
    return `gaining badges is a beautiful milestone! once you browse the tracks, study the cozy green chalkboards, and score 70% or more on the interactive evaluations, you unlock souvenir rewards!

you can then click 'mint badge' in your sui kiosk profile tab to record your status. yeti is forever guarding your success achievements!`;
  }

  const contextStr = (track || lesson) ? ` (pondering deep in ${track || lesson})` : "";
  return `lofi yeti is meditating on your question${contextStr}:
"${promptText}"

that is a beautiful concept! in move and sui, elements are crafted with high-assurance safety and maximum execution throughput in mind. whether it is struct capabilities (key, store, copy, drop), epoch timing, or parallel mempools, everything fits together perfectly.

yeti is super happy you're here. ask another question or enjoy the sweet background ambient line sweeps while you code!`;
}

interface Message {
  role: "user" | "model";
  content: string;
}

interface TutorFloatingWidgetProps {
  currentTrack?: string;
  currentLesson?: string;
}

export function TutorFloatingWidget({ currentTrack, currentLesson }: TutorFloatingWidgetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "hey there, cozy friend! grab some hot cocoa. i am yeti the tutor, study guide here at loficabin. type any question about sui objects, gas fee, move safety, or Cetus/Navi simulator below and let's explore together! relax and feel the lofi vibes."
    }
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Quick topics preseed
  const quickTopics = [
    { label: "Double-spends? ", query: "what are move double-spends and how does the compiler prevent them?" },
    { label: "Sui Objects ", query: "explain why everything on sui is an object and how that makes transfers fast?" },
    { label: "Storage Fund ", query: "what is the sui storage fund and how does it keep gas prices stable?" },
    { label: "Kiosk Royalties ", query: "how does sui kiosk work for securing creator royalties?" }
  ];

  // Auto-scroller
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (customQuery?: string) => {
    const textToSend = customQuery || inputMessage;
    if (!textToSend.trim()) return;

    const userMsg: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Package query payload including history and classroom contexts
      const response = await fetch("/api/gemini/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          track: currentTrack,
          lesson: currentLesson,
          history: messages.slice(-4) // send recent context only
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response content is not valid JSON");
      }

      const data = await response.json();
      if (data.success) {
        setMessages((prev) => [...prev, { role: "model", content: data.text }]);
      } else {
        throw new Error(data.error || "Unsuccessful backend generation");
      }
    } catch (err) {
      console.warn("Using offline Yeti fallback tutor engine:", err);
      const offlineReply = generateOfflineYetiReply(textToSend, currentTrack, currentLesson);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: offlineReply }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="tutor-widget" className="my-4">
      {/* 1. Closed State Chat Floating Trigger */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="btn-trigger-yeti"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 px-4 py-3 sm:px-5 sm:py-3.5 bg-[#89A8B2] hover:bg-[#89A8B2]/90 text-white font-mono text-xs font-bold rounded-full border-2 border-[#3c3c3c] shadow-[4px_4px_0px_0px_#3c3c3c] flex items-center gap-2 transition-all hover:scale-105 active:scale-95 group cursor-pointer animate-fade-in"
        >
          <div className="relative">
            <span className="absolute -top-1.5 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <MessageSquare size={16} fill="currentColor" className="text-white group-hover:rotate-12 transition-transform" />
          </div>
          <span className="hidden sm:inline">Ask Yeti AI Tutor</span>
          <span className="sm:hidden text-[11px] tracking-tight">Yeti AI</span>
        </button>
      )}

      {/* 2. Open Chat Widget Room */}
      {isOpen && (
        <div 
          id="yeti-chat-panel"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] h-[480px] sm:h-[550px] max-h-[82vh] sm:max-h-[550px] bg-white border-2 border-[#3c3c3c] rounded-3xl shadow-[6px_6px_0px_0px_#3c3c3c] flex flex-col justify-between overflow-hidden text-[#3c3c3c]"
        >
          {/* Header Panel */}
          <div className="bg-[#F3EFEA] p-3 sm:p-3.5 border-b-2 border-dashed border-[#3c3c3c]/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee size={18} className="text-[#D67B52]" />
              <div>
                <h3 className="text-xs font-bold font-mono text-[#D67B52] flex items-center gap-1">
                  <span>Yeti the Tutor</span>
                  <Sparkles size={11} className="text-[#D67B52] animate-pulse" />
                </h3>
                <p className="text-[9px] sm:text-[10px] text-[#6D5D6E] font-mono">Gemini lofi assistant, 100% cozy</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#3c3c3c] hover:bg-[#E8E1D9] rounded-lg cursor-pointer transition-colors border border-transparent hover:border-[#3c3c3c]"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages list with auto scroll overflow container */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-4" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex max-w-[88%] flex-col rounded-2xl p-2.5 sm:p-3 text-xs leading-relaxed font-sans border-2 ${
                  msg.role === "user"
                    ? "bg-[#D67B52] text-white border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c] ml-auto font-semibold rounded-tr-none text-[11px] sm:text-xs"
                    : "bg-[#f8f5f2] text-[#3c3c3c] border-[#3c3c3c] mr-auto shadow-[2px_2px_0px_0px_#3c3c3c] rounded-tl-none font-medium text-[11px] sm:text-[12px] font-mono whitespace-pre-line select-text"
                }`}
              >
                {msg.role === "model" && (
                  <div className="text-[8px] sm:text-[9px] text-[#89A8B2] font-bold tracking-wider font-mono mb-1 text-left uppercase flex items-center gap-1">
                    <Sparkles size={8} className="text-[#89A8B2] fill-[#89A8B2]/25" />
                    <span>yeti companion</span>
                  </div>
                )}
                {msg.content}
              </div>
            ))}

            {isTyping && (
              <div className="bg-[#f8f5f2] text-[#6D5D6E] border-2 border-[#3c3c3c] p-2 rounded-xl text-[10px] sm:text-[11px] font-mono flex items-center gap-2 shadow-[2px_2px_0px_0px_#3c3c3c]">
                <RefreshCw size={11} className="animate-spin text-[#89A8B2]" />
                <span>yeti is translating to lofi frequencies...</span>
              </div>
            )}
          </div>

          {/* Selector Starter Quick Buttons list */}
          <div className="p-2 border-t-2 border-dashed border-[#3c3c3c]/30 bg-[#f8f5f2]/50 max-h-[110px] overflow-y-auto">
            <span className="text-[8px] sm:text-[9px] text-[#6D5D6E] uppercase font-mono px-1 block mb-1 font-bold">Topics search guide</span>
            <div className="flex flex-wrap gap-1 font-mono text-[8px] sm:text-[9px]">
              {quickTopics.map((topic, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(topic.query)}
                  className="px-2 py-0.5 sm:py-1 bg-white hover:bg-[#89A8B2]/20 text-[#3c3c3c] border-2 border-[#3c3c3c] rounded-lg text-left cursor-pointer transition-colors max-w-full font-bold shadow-[1px_1px_0px_0px_#3c3c3c]"
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form write fields */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 border-t-2 border-[#3c3c3c] bg-[#F3EFEA] flex gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask Yeti a Move question..."
              className="flex-1 bg-white border-2 border-[#3c3c3c] rounded-xl px-2.5 py-1.5 text-xs text-[#3c3c3c] placeholder-[#6D5D6E]/60 focus:outline-none focus:border-[#89A8B2] font-mono font-medium shadow-[2px_2px_0px_0px_#3c3c3c]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 bg-[#D67B52] hover:bg-[#D67B52]/90 border-2 border-[#3c3c3c] text-white rounded-xl transition-all cursor-pointer disabled:opacity-30 disabled:scale-100 flex items-center justify-center shadow-[2px_2px_0px_0px_#3c3c3c] active:translate-y-[1px]"
            >
              <Send size={13} fill="currentColor" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
