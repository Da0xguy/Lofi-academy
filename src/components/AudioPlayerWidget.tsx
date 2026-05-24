import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Flame, CloudRain, Disc, Play, Pause, Compass, Zap } from "lucide-react";

export function AudioPlayerWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synthVolume, setSynthVolume] = useState(0.5);
  const [rainVolume, setRainVolume] = useState(0.3);
  const [fireVolume, setFireVolume] = useState(0.2);
  const [activeChannel, setActiveChannel] = useState("Lofi Campfire Jam");
  
  // Audio graph references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);
  const rainGainRef = useRef<GainNode | null>(null);
  const fireGainRef = useRef<GainNode | null>(null);
  
  // Interval loops for procedural generation
  const chordIntervalRef = useRef<number | null>(null);
  const rainSourceRef = useRef<AudioWorkletNode | ScriptProcessorNode | null>(null);
  const fireSourceRef = useRef<AudioWorkletNode | ScriptProcessorNode | null>(null);
  const activeOscillatorsRef = useRef<OscillatorNode[]>([]);

  // Initialize Audio Context lazy load
  const initAudio = () => {
    if (audioCtxRef.current) return;
    
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;
    
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.8, ctx.currentTime);
    master.connect(ctx.destination);
    masterGainRef.current = master;
    
    // Synth route
    const sg = ctx.createGain();
    sg.gain.setValueAtTime(synthVolume * 0.1, ctx.currentTime); // keep lower default to avoid blasting
    sg.connect(master);
    synthGainRef.current = sg;
    
    // Ambient loops
    const rg = ctx.createGain();
    rg.gain.setValueAtTime(rainVolume * 0.3, ctx.currentTime);
    rg.connect(master);
    rainGainRef.current = rg;
    
    const fg = ctx.createGain();
    fg.gain.setValueAtTime(fireVolume * 0.4, ctx.currentTime);
    fg.connect(master);
    fireGainRef.current = fg;
    
    // Build noise nodes
    createRainNode(ctx, rg);
    createFireNode(ctx, fg);
  };

  // Helper. Generate rain-like brown/white noise with LP filter
  const createRainNode = (ctx: AudioContext, destination: AudioNode) => {
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Generate pinkish/brownish rain noise
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Low pass filter accumulation
      output[i] = (lastOut * 0.95 + white * 0.05) * 0.7;
      lastOut = output[i];
    }
    
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;
    
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    
    noiseNode.connect(filter);
    filter.connect(destination);
    
    noiseNode.start(0);
    (rainSourceRef as any).currentNoise = noiseNode;
  };

  // Helper. Generate campfire crackles
  const createFireNode = (ctx: AudioContext, destination: AudioNode) => {
    // White noise with random crackle impulses
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // High frequency filter crackle pulses
      if (Math.random() > 0.9997) {
        output[i] = white * 0.8; // big crackle
      } else {
        output[i] = white * 0.03; // quiet low hum
      }
    }
    
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;
    
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);
    
    noiseNode.connect(filter);
    filter.connect(destination);
    
    noiseNode.start(0);
    (fireSourceRef as any).currentNoise = noiseNode;
  };

  // Coords for major - minor cozy chords
  const ch_Cmaj7 = [130.81, 164.81, 196.00, 246.94]; // C3, E3, G3, B3
  const ch_Am9 = [110.00, 146.83, 174.61, 220.00, 261.63]; // A2, D3, F3, A3, C4
  const ch_Fmaj9 = [87.31, 130.81, 174.61, 218.27, 261.63]; // F2, C3, F3, A3, C4
  const ch_G6 = [98.00, 146.83, 196.00, 246.94, 293.66]; // G2, D3, G3, B3, D4

  const chords = [ch_Cmaj7, ch_Am9, ch_Fmaj9, ch_G6];

  const playSynthesizedChord = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state === "suspended") return;
    
    const currentChord = chords[Math.floor(Math.random() * chords.length)];
    const playTime = ctx.currentTime;
    
    // Fade out previous active oscillators
    activeOscillatorsRef.current.forEach(osc => {
      try {
        osc.stop(playTime + 0.3);
      } catch (err) {}
    });
    activeOscillatorsRef.current = [];

    // Synthesize a cozy warm ambient pad chord
    currentChord.forEach((freq, idx) => {
      if (!ctx || !synthGainRef.current) return;
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const delay = ctx.createDelay();
      
      // Cozy warm triangle + soft sine waves
      osc.type = idx % 2 === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, playTime);
      
      // Gentle warm vibrola/detune representation
      osc.detune.setValueAtTime((Math.random() * 8) - 4, playTime);
      
      // Delay for room spacing feel
      delay.delayTime.setValueAtTime(0.02 * idx, playTime);
      
      // Gentle attack-release gain envelope (lofi pad)
      const maxVolume = (synthVolume * 0.14) / currentChord.length;
      gainNode.gain.setValueAtTime(0, playTime);
      gainNode.gain.linearRampToValueAtTime(maxVolume, playTime + 1.5 + idx * 0.2); // Slow attack
      gainNode.gain.setValueAtTime(maxVolume, playTime + 5.5);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, playTime + 7.5); // Warm slow release
      
      osc.connect(gainNode);
      gainNode.connect(delay);
      delay.connect(synthGainRef.current);
      
      osc.start(playTime);
      activeOscillatorsRef.current.push(osc);
    });
  };

  // Toggle master state
  const handlePlayToggle = async () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    
    if (isPlaying) {
      // Pause
      await ctx.suspend();
      setIsPlaying(false);
      if (chordIntervalRef.current) {
        clearInterval(chordIntervalRef.current);
        chordIntervalRef.current = null;
      }
    } else {
      // Resume
      await ctx.resume();
      setIsPlaying(true);
      
      // Instantly start chords
      playSynthesizedChord();
      chordIntervalRef.current = setInterval(playSynthesizedChord, 7000) as any;
    }
  };

  // Live sliders sync
  useEffect(() => {
    if (synthGainRef.current && audioCtxRef.current) {
      synthGainRef.current.gain.setValueAtTime(synthVolume * 0.1, audioCtxRef.current.currentTime);
    }
  }, [synthVolume]);

  useEffect(() => {
    if (rainGainRef.current && audioCtxRef.current) {
      rainGainRef.current.gain.setValueAtTime(rainVolume * 0.3, audioCtxRef.current.currentTime);
    }
  }, [rainVolume]);

  useEffect(() => {
    if (fireGainRef.current && audioCtxRef.current) {
      fireGainRef.current.gain.setValueAtTime(fireVolume * 0.4, audioCtxRef.current.currentTime);
    }
  }, [fireVolume]);

  useEffect(() => {
    return () => {
      if (chordIntervalRef.current) {
        clearInterval(chordIntervalRef.current);
      }
      activeOscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch (err) {}
      });
    };
  }, []);

  return (
    <div id="lofi-ambient-widget" className="bg-white border-2 border-[#3c3c3c] rounded-3xl p-4 shadow-[4px_4px_0px_0px_#3c3c3c] text-[#3c3c3c] transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl bg-[#89A8B2]/20 text-[#89A8B2] border border-[#3c3c3c] ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "12s" }}>
            <Disc size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold font-serif text-[#3c3c3c] uppercase tracking-wider">Atmosphere Deck</h4>
            <p className="text-[11px] font-mono text-[#6D5D6E]">{activeChannel}</p>
          </div>
        </div>
        
        <button
          onClick={handlePlayToggle}
          id="btn-lofi-playback"
          className={`flex items-center justify-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold border-2 border-[#3c3c3c] transition-all shadow-[2px_2px_0px_0px_#3c3c3c] hover:translate-y-[-1px] active:translate-y-[1px] cursor-pointer ${
            isPlaying 
              ? "bg-[#D67B52] text-white" 
              : "bg-[#89A8B2] text-white hover:bg-[#89A8B2]/90"
          }`}
        >
          {isPlaying ? (
            <>
              <Pause size={12} fill="currentColor" />
              <span>Pause Study Jams</span>
            </>
          ) : (
            <>
              <Play size={12} fill="currentColor" />
              <span>Play Lofi Jams</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-2 text-xs">
        {/* Synth Pad Loop Volume */}
        <div className="flex items-center gap-2">
          <div className="w-24 font-mono text-[#3c3c3c] flex items-center gap-1">
            <Compass size={12} className="text-[#D67B52]" />
            <span>Synth Chords</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={synthVolume}
            onChange={(e) => setSynthVolume(parseFloat(e.target.value))}
            className="flex-1 accent-[#89A8B2] h-1.5 bg-[#f8f5f2] rounded-lg cursor-pointer border border-[#3c3c3c]"
          />
          <span className="w-8 text-right font-mono text-[#3c3c3c] text-[10px] font-semibold">
            {Math.round(synthVolume * 100)}%
          </span>
        </div>

        {/* Rain Sound Channel Volume */}
        <div className="flex items-center gap-2">
          <div className="w-24 font-mono text-[#3c3c3c] flex items-center gap-1">
            <CloudRain size={12} className="text-[#89A8B2]" />
            <span>Starry Rain</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={rainVolume}
            disabled={!isPlaying}
            onChange={(e) => setRainVolume(parseFloat(e.target.value))}
            className="flex-1 accent-[#89A8B2] h-1.5 bg-[#f8f5f2] rounded-lg cursor-pointer disabled:opacity-40 border border-[#3c3c3c]"
          />
          <span className="w-8 text-right font-mono text-[#3c3c3c] text-[10px] font-semibold">
            {Math.round(rainVolume * 100)}%
          </span>
        </div>

        {/* Fire Crackle Sound Channel Volume */}
        <div className="flex items-center gap-2">
          <div className="w-24 font-mono text-[#3c3c3c] flex items-center gap-1">
            <Flame size={12} className="text-[#D67B52]" />
            <span>Fire Crackle</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={fireVolume}
            disabled={!isPlaying}
            onChange={(e) => setFireVolume(parseFloat(e.target.value))}
            className="flex-1 accent-[#D67B52] h-1.5 bg-[#f8f5f2] rounded-lg cursor-pointer disabled:opacity-40 border border-[#3c3c3c]"
          />
          <span className="w-8 text-right font-mono text-[#3c3c3c] text-[10px] font-semibold">
            {Math.round(fireVolume * 100)}%
          </span>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-dashed border-[#3c3c3c]/30 text-center">
        <p className="text-[10px] font-mono text-[#6D5D6E] flex items-center justify-center gap-1">
          <Zap size={10} className="text-[#D67B52]" />
          Real-time WebAudio engine, no internet streaming lag
        </p>
      </div>
    </div>
  );
}
