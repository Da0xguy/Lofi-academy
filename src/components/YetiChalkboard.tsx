import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ModuleStep } from "../types";
import { Coffee, MessageSquare, Sparkles, Brain, Zap } from "lucide-react";

interface YetiChalkboardProps {
  step: ModuleStep;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  yetiStudyAsset: string;
}

export function YetiChalkboard({
  step,
  stepIndex,
  totalSteps,
  onNext,
  onPrev,
  yetiStudyAsset
}: YetiChalkboardProps) {

  // Dynamic chalk status quotes depending on mood
  const getMoodDecoration = (mood: string) => {
    switch (mood) {
      case "thinking":
        return { quote: "yeti is pondering move borrow checkers...", icon: <Brain size={14} className="text-[#89A8B2]" /> };
      case "excited":
        return { quote: "oh! this compiles perfectly, yeti is proud!", icon: <Zap size={14} className="text-yellow-500 fill-yellow-500 animate-bounce" /> };
      case "proud":
        return { quote: "your level of knowledge is rising like warm steam...", icon: <Sparkles size={14} className="text-[#D67B52]" /> };
      default:
        return { quote: "lofi beats inside, coding outside...", icon: <Coffee size={14} className="text-amber-700 font-bold" /> };
    }
  };

  const decoration = getMoodDecoration(step.yetiMood);

  return (
    <div id="yeti-chalkboard-container" className="flex flex-col lg:flex-row items-center gap-6 justify-center max-w-5xl mx-auto my-4 text-[#3c3c3c]">
      {/* 1. Yeti Illustration Section */}
      <div className="w-full lg:w-1/3 flex flex-col items-center">
        <div className="relative group p-2 border-2 border-[#3c3c3c] rounded-3xl bg-white shadow-[4px_4px_0px_0px_#3c3c3c] overflow-hidden">
          <img
            src="src/assets/images/lofistudy.png"
            alt="Yeti Study Space"
            referrerPolicy="no-referrer"
            className="w-60 h-60 object-cover rounded-2xl group-hover:scale-105 transition-all duration-300 pointer-events-none filter brightness-95"
          />
          <div className="absolute top-2 right-2 bg-white/90 border-2 border-[#3c3c3c] px-2 py-0.5 rounded-full text-[9px] font-mono text-[#3c3c3c] font-bold shadow-[1px_1px_0px_0px_#3c3c3c]">
            Mascot Yeti
          </div>
        </div>

        {/* Mascot Speech Bubble */}
        <div className="mt-4 relative bg-white border-2 border-[#3c3c3c] rounded-2xl p-3 max-w-xs text-xs shadow-[2px_2px_0px_0px_#3c3c3c]">
          <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l-2 border-t-2 border-[#3c3c3c]"></div>
          <p className="font-mono text-[#3c3c3c] font-bold italic text-center flex items-center justify-center gap-1.5">
            <span className="flex items-center justify-center">{decoration.icon}</span>
            <span>{decoration.quote}</span>
          </p>
        </div>
      </div>

      {/* 2. Cozy Chalkboard Panel (green textured chalkboard with custom drop shadows) */}
      <div className="w-full lg:w-2/3 flex flex-col">
        <div className="bg-[#2a3c33] border-8 border-[#3c3c3c] rounded-3xl p-6 shadow-[5px_5px_0px_0px_#3c3c3c] relative min-h-[340px] flex flex-col justify-between text-yellow-50">
          
          {/* Board Pegs / Hangers for depth */}
          <div className="absolute -top-4 left-10 w-4 h-4 rounded-full bg-[#3c3c3c]"></div>
          <div className="absolute -top-4 right-10 w-4 h-4 rounded-full bg-[#3c3c3c]"></div>

          {/* Inner Blackboard Content with nice chalkboard font aesthetics */}
          <div className="flex-1">
            <div className="flex items-center justify-between border-b-2 border-dashed border-emerald-800 pb-2 mb-4">
              <span className="text-[10px] font-mono text-emerald-100 uppercase tracking-widest bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-800">
                Chapter Slide {stepIndex + 1} of {totalSteps}
              </span>
              <h3 className="text-sm font-semibold text-yellow-200/95 font-mono tracking-tight flex items-center gap-1.5 font-bold">
                <Coffee size={14} className="text-yellow-400" />
                <span>{step.chalkboardHeader || "YETI INTEGRATION BOARD"}</span>
              </h3>
            </div>

            {/* Slide Text & Optional Code Component wrapped with fade transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="space-y-4"
              >
                <h4 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                  <span className="text-yellow-400">✦</span>
                  <span>{step.title}</span>
                </h4>

                <p className="text-yellow-50/90 leading-relaxed font-sans text-sm tracking-wide font-medium">
                  {step.content}
                </p>

                {step.highlightCode && (
                  <div className="rounded-xl border-2 border-emerald-950 bg-black/55 p-3.5 font-mono text-xs text-emerald-300 overflow-x-auto selection:bg-teal-900/40 shadow-inner">
                    <pre className="whitespace-pre">{step.highlightCode}</pre>
                    <div className="mt-1.5 text-right text-[9px] text-emerald-500 uppercase tracking-widest font-mono font-bold">
                      SUI Move CLI Sandbox Snippet
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Chalk Ledge & Navigation Block */}
          <div className="mt-6 pt-3 border-t-2 border-solid border-emerald-800/40 flex items-center justify-between">
            <span className="text-[10px] text-emerald-200/50 flex items-center gap-0.5 font-mono font-bold">
              <span>✏️</span> chalkboard: active move compilation view
            </span>

            <div className="flex items-center gap-3">
              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={onPrev}
                  className="px-3 py-1 bg-white hover:bg-yellow-50 text-[#3c3c3c] border-2 border-[#3c3c3c] rounded-lg text-xs font-bold tracking-wider font-mono cursor-pointer transition-colors"
                >
                  Back
                </button>
              )}
              
              <button
                type="button"
                id="btn-chalkboard-next"
                onClick={onNext}
                className="px-5 py-1.5 bg-[#D67B52] hover:bg-[#D67B52]/90 text-white shadow-[2px_2px_0px_0px_#3c3c3c] font-mono border-2 border-[#3c3c3c] rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer active:translate-y-[1px]"
              >
                <span>{stepIndex === totalSteps - 1 ? "Start Assessment ✏️" : "Next Part"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
