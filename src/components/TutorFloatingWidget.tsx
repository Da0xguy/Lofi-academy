import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, RefreshCw, X, Coffee, BookOpen } from "lucide-react";

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
      content: "hey there, cozy friend! grab some hot cocoa. 🐻🍵 i am yeti the tutor, study guide here at lofi quest. type any question about sui objects, gas fee, move safety, or Cetus/Navi simulator below and let's explore together! relax and feel the lofi vibes."
    }
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Quick topics preseed
  const quickTopics = [
    { label: "What are Move double-spends?", query: "what are move double-spends and how does the compiler prevent them?" },
    { label: "Explain Sui Object ID limits", query: "explain why everything on sui is an object and how that makes transfers fast?" },
    { label: "Predictable SUI Storage Fund Gas", query: "what is the sui storage fund and how does it keep gas prices stable?" },
    { label: "Is Kiosk standard for royalities?", query: "how does sui kiosk work for securing creator royalties?" }
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

      const data = await response.json();
      if (data.success) {
        setMessages((prev) => [...prev, { role: "model", content: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "model", content: "yeti is slipping into a cozy dream... let's take a sip of tea and wait for the code block to clear. try again? 🐻❄️" }
        ]);
      }
    } catch (err) {
      console.error("Gemini proxy request failed:", err);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "yeti lost the signal in the snow... check your internet or let's try a test swap in Cetus below to warm things up! 🌨️🍵" }
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
          className="fixed bottom-6 right-6 z-50 px-5 py-3.5 bg-[#89A8B2] hover:bg-[#89A8B2]/90 text-white font-mono text-xs font-bold rounded-full border-2 border-[#3c3c3c] shadow-[4px_4px_0px_0px_#3c3c3c] flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
        >
          <div className="relative">
            <span className="absolute -top-1.5 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <MessageSquare size={16} fill="currentColor" className="text-white group-hover:rotate-12 transition-transform" />
          </div>
          <span>Ask Yeti AI Tutor</span>
        </button>
      )}

      {/* 2. Open Chat Widget Room */}
      {isOpen && (
        <div 
          id="yeti-chat-panel"
          className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] bg-white border-2 border-[#3c3c3c] rounded-3xl shadow-[6px_6px_0px_0px_#3c3c3c] flex flex-col justify-between overflow-hidden text-[#3c3c3c]"
        >
          {/* Header Panel */}
          <div className="bg-[#F3EFEA] p-3.5 border-b-2 border-dashed border-[#3c3c3c]/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🍵</span>
              <div>
                <h3 className="text-xs font-bold font-mono text-[#D67B52] flex items-center gap-1">
                  <span>Yeti the Tutor</span>
                  <Sparkles size={11} className="text-[#D67B52] animate-pulse" />
                </h3>
                <p className="text-[10px] text-[#6D5D6E] font-mono">Gemini-powered lofi assistant, 100% cozy</p>
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
          <div className="flex-1 p-4 overflow-y-auto space-y-4" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex max-w-[85%] flex-col rounded-2xl p-3 text-xs leading-relaxed font-sans border-2 ${
                  msg.role === "user"
                    ? "bg-[#D67B52] text-white border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c] ml-auto font-semibold rounded-tr-none"
                    : "bg-[#f8f5f2] text-[#3c3c3c] border-[#3c3c3c] mr-auto shadow-[2px_2px_0px_0px_#3c3c3c] rounded-tl-none font-medium text-[12px] font-mono whitespace-pre-line select-text"
                }`}
              >
                {msg.role === "model" && (
                  <div className="text-[9px] text-[#89A8B2] font-bold tracking-wider font-mono mb-1 text-left uppercase">
                    ❄ yeti companion
                  </div>
                )}
                {msg.content}
              </div>
            ))}

            {isTyping && (
              <div className="bg-[#f8f5f2] text-[#6D5D6E] border-2 border-[#3c3c3c] p-2 rounded-xl text-[11px] font-mono flex items-center gap-2 shadow-[2px_2px_0px_0px_#3c3c3c]">
                <RefreshCw size={12} className="animate-spin text-[#89A8B2]" />
                <span>yeti is translating to lofi frequencies...</span>
              </div>
            )}
          </div>

          {/* Selector Starter Quick Buttons list */}
          <div className="p-2 border-t-2 border-dashed border-[#3c3c3c]/30 bg-[#f8f5f2]/50">
            <span className="text-[9px] text-[#6D5D6E] uppercase font-mono px-1 block mb-1 font-bold">Topics search guide</span>
            <div className="flex flex-wrap gap-1 font-mono text-[9px]">
              {quickTopics.map((topic, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(topic.query)}
                  className="px-2 py-1 bg-white hover:bg-[#89A8B2]/20 text-[#3c3c3c] border-2 border-[#3c3c3c] rounded-lg text-left cursor-pointer transition-colors truncate max-w-full font-bold shadow-[1px_1px_0px_0px_#3c3c3c]"
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
            className="p-3 border-t-2 border-[#3c3c3c] bg-[#F3EFEA] flex gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="sip coffee and type any Move questions..."
              className="flex-1 bg-white border-2 border-[#3c3c3c] rounded-xl px-3 py-2 text-xs text-[#3c3c3c] placeholder-[#6D5D6E]/60 focus:outline-none focus:border-[#89A8B2] font-mono font-medium shadow-[2px_2px_0px_0px_#3c3c3c]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 bg-[#D67B52] hover:bg-[#D67B52]/90 border-2 border-[#3c3c3c] text-white rounded-xl transition-all cursor-pointer disabled:opacity-30 disabled:scale-100 flex items-center justify-center shadow-[2px_2px_0px_0px_#3c3c3c] active:translate-y-[1px]"
            >
              <Send size={14} fill="currentColor" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
