import React, { useState } from "react";
import { LearningTrack } from "../types";
import { Settings, BarChart3, Plus, RefreshCw, Layers, ShieldCheck, Database, Sliders, CheckCircle } from "lucide-react";

interface AdminPanelProps {
  tracks: LearningTrack[];
  onUpdateTracks: (newTracks: LearningTrack[]) => void;
  onResetDatabase: () => void;
  leadLength: number;
}

export function AdminPanel({ tracks, onUpdateTracks, onResetDatabase, leadLength }: AdminPanelProps) {
  const [selectedTrackId, setSelectedTrackId] = useState<string>(tracks[0].id);
  const [selectedModuleId, setSelectedModuleId] = useState<string>(tracks[0].modules[0].id);
  
  // Custom edit parameters
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [saveFeedback, setSaveFeedback] = useState<boolean>(false);

  // Compute stats metrics dynamically
  const totalModules = tracks.reduce((acc, curr) => acc + curr.modules.length, 0);
  const totalSteps = tracks.reduce((acc, curr) => 
    acc + curr.modules.reduce((mAcc, mCurr) => mAcc + mCurr.steps.length, 0), 0
  );

  const handleUpdateStep = () => {
    if (!editTitle || !editContent) return;

    const updated = tracks.map((track) => {
      if (track.id !== selectedTrackId) return track;
      return {
        ...track,
        modules: track.modules.map((mod) => {
          if (mod.id !== selectedModuleId) return mod;
          return {
            ...mod,
            steps: mod.steps.map((st, idx) => {
              // Lock editing the first step of selected module as a prototype
              if (idx === 0) {
                return { ...st, title: editTitle, content: editContent };
              }
              return st;
            })
          };
        })
      };
    });

    onUpdateTracks(updated);
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2000);
  };

  return (
    <div id="admin-deck" className="bg-white border-2 border-[#3c3c3c] rounded-3xl p-6 shadow-[4px_4px_0px_0px_#3c3c3c] text-[#3c3c3c]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-dashed border-[#3c3c3c]/30 pb-4 mb-5">
        <div>
          <h2 className="text-xl font-bold font-serif text-[#3c3c3c] flex items-center gap-1.5">
            <Settings size={20} className="text-[#D67B52] animate-spin" style={{ animationDuration: "10s" }} />
            <span>Hackathon Admin Console (Move Board)</span>
          </h2>
          <p className="text-xs text-[#6D5D6E] mt-1">
            Manage course syllabi, inject mock quizzes, reset state registers and watch real-time developer analytics.
          </p>
        </div>
        
        <button
          onClick={onResetDatabase}
          className="px-4 py-2 bg-[#f8f5f2] hover:bg-red-50 border-2 border-[#3c3c3c] rounded-xl text-xs font-mono font-bold text-red-600 flex items-center gap-1 cursor-pointer transition-all shadow-[1px_1px_0px_0px_#3c3c3c]"
        >
          <RefreshCw size={12} className="animate-spin" style={{ animationDuration: "3s" }} />
          <span>Reset Server State File</span>
        </button>
      </div>

      {/* Analytics Bento Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#F3EFEA] p-4 rounded-2xl border-2 border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c] flex items-center gap-3">
          <div className="p-3 rounded-xl bg-orange-100 text-[#D67B52] border border-[#3c3c3c]/60">
            <Database size={18} />
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#6D5D6E] block font-mono font-bold">Syllabus Tracks</span>
            <strong className="text-[#3c3c3c] font-mono font-extrabold text-sm">{tracks.length} Active</strong>
          </div>
        </div>

        <div className="bg-[#F3EFEA] p-4 rounded-2xl border-2 border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c] flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-100 text-[#89A8B2] border border-[#3c3c3c]/60">
            <Layers size={18} />
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#6D5D6E] block font-mono font-bold">Total Modules</span>
            <strong className="text-[#3c3c3c] font-mono font-extrabold text-sm">{totalModules} Lessons</strong>
          </div>
        </div>

        <div className="bg-[#F3EFEA] p-4 rounded-2xl border-2 border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c] flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-100 text-[#6D5D6E] border border-[#3c3c3c]/60">
            <Sliders size={18} />
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#6D5D6E] block font-mono font-bold">Syllabus Slides</span>
            <strong className="text-[#3c3c3c] font-mono font-extrabold text-sm">{totalSteps} Chalkboards</strong>
          </div>
        </div>

        <div className="bg-[#F3EFEA] p-4 rounded-2xl border-2 border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c] flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#E8E1D9] text-[#3c3c3c] border border-[#3c3c3c]/60">
            <BarChart3 size={18} />
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#6D5D6E] block font-mono font-bold">Linked Developers</span>
            <strong className="text-[#3c3c3c] font-mono font-extrabold text-sm">{leadLength} Profiles</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course content editor controls */}
        <div className="bg-[#f8f5f2] p-4 rounded-2xl border-2 border-[#3c3c3c] shadow-[3px_3px_0px_0px_#3c3c3c] flex flex-col justify-between">
          <div>
            <h3 className="text-xs uppercase font-mono tracking-wider font-bold text-[#3c3c3c] mb-3 block">
              ✏️ Live Course Syllabus Content Manager
            </h3>

            <div className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#6D5D6E] block mb-1 font-bold">Select Track</label>
                  <select
                    value={selectedTrackId}
                    onChange={(e) => setSelectedTrackId(e.target.value)}
                    className="w-full bg-white border-2 border-[#3c3c3c] p-2 rounded-xl text-[#3c3c3c] focus:outline-none focus:border-[#89A8B2]"
                  >
                    {tracks.map((t) => (
                      <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[#6D5D6E] block mb-1 font-bold">Select Module</label>
                  <select
                    value={selectedModuleId}
                    onChange={(e) => setSelectedModuleId(e.target.value)}
                    className="w-full bg-white border-2 border-[#3c3c3c] p-2 rounded-xl text-[#3c3c3c] focus:outline-none focus:border-[#89A8B2]"
                  >
                    {tracks.find((t) => t.id === selectedTrackId)?.modules.map((m) => (
                      <option key={m.id} value={m.id}>{m.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#6D5D6E] block mb-1 font-bold">Edit Slide Title (Chalkboard Slide 1)</label>
                <input
                  type="text"
                  placeholder="Insert slide header... e.g. What is Object UID?"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-white border-2 border-[#3c3c3c] p-2.5 rounded-xl text-[#3c3c3c] focus:outline-none focus:border-[#89A8B2]"
                />
              </div>

              <div>
                <label className="text-[#6D5D6E] block mb-1 font-bold">Edit Slide Body Content (Chalkboard Slide 1)</label>
                <textarea
                  rows={4}
                  placeholder="Type chalk lesson instructions directly..."
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-white border-2 border-[#3c3c3c] p-2.5 rounded-xl text-[#3c3c3c] focus:outline-none focus:border-[#89A8B2] resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleUpdateStep}
            disabled={!editTitle || !editContent}
            className="w-full mt-4 py-2.5 bg-[#89A8B2] hover:bg-[#89A8B2]/90 disabled:opacity-40 text-white font-bold font-mono text-xs rounded-xl shadow-[2px_2px_0px_0px_#3c3c3c] transition-all border-2 border-[#3c3c3c] cursor-pointer flex items-center justify-center gap-2 active:translate-y-[1px]"
          >
            {saveFeedback ? (
              <>
                <CheckCircle size={14} className="text-white" />
                <span>Step Content Injected! ✓</span>
              </>
            ) : (
              <>
                <Plus size={14} />
                <span>Inject Custom Syllabus Changes</span>
              </>
            )}
          </button>
        </div>

        {/* CLAY Hackathon Pitch Deck & Video presentation checklists */}
        <div className="bg-[#f8f5f2] p-4 rounded-2xl border-2 border-[#3c3c3c] shadow-[3px_3px_0px_0px_#3c3c3c] select-text font-mono text-xs text-[#3c3c3c]">
          <h3 className="text-xs uppercase tracking-wider font-bold text-[#D67B52] mb-3 block">
            🚀 CLAY Hackathon Submission Status (Due June 30)
          </h3>

          <div className="space-y-3 font-sans">
            <div className="bg-white p-3 rounded-xl border-2 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c] text-[#3c3c3c]">
              <strong className="block text-xs font-bold text-[#D67B52]">Prototype Working Tracks:</strong>
              <span className="text-[11px] font-mono text-[#6D5D6E] font-medium">4 tracks integrated. Sui basics, DeFi swap/lend simulator, DeepBook capabilities, and Kiosk security history. Status: Verified Green.</span>
            </div>

            <div className="bg-white p-3 rounded-xl border-2 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c] text-[#3c3c3c]">
              <strong className="block text-xs font-bold text-[#89A8B2]">Demo Pitch Video Checklist:</strong>
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px] font-mono text-[#6D5D6E] font-semibold">
                <li>Demonstrate simulated Sui wallet connect authorization</li>
                <li>Go through chapter slides & pass 2 quizzes</li>
                <li>Perform simulated token exchange slide (Amm Cetus logs)</li>
                <li>Trigger Kiosk NFT Mint (Move logs printed on screen!)</li>
              </ul>
            </div>

            <div className="bg-white p-3 rounded-xl border-2 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c] text-[#3c3c3c]">
              <strong className="block text-xs font-bold text-[#3c3c3c]">Smart Contract Interface:</strong>
              <div className="font-mono text-[10px] text-[#6D5D6E] mt-1 font-medium">
                Kiosk structure allows standard ERC-721 wrapper to safely freeze assets on behalf of creator. Enforces royalty structures across private swap orders.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
