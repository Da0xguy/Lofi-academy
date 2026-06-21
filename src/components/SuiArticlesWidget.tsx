import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  RotateCcw, 
  ThumbsUp, 
  Clock, 
  ExternalLink, 
  Search, 
  Newspaper, 
  BookOpen, 
  BookMarked,
  Filter, 
  Calendar, 
  Send,
  UserCheck,
  Award
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: "Consensus" | "DeFi" | "Bridges" | "Creators" | "Community";
  date: string;
  readTime: string;
  views: number;
  likes: number;
  isLiked?: boolean;
  author: string;
  avatarChar: string;
  summary: string;
  intro: string;
  bodyParagraphs: string[];
  takeaways: string[];
  externalLink: string;
}

const INITIAL_ARTICLES: Article[] = [
  {
    id: "mysticeti",
    title: "Mysticeti Engine: Sub-Second Finality Unleashed",
    category: "Consensus",
    date: "2026-06-18",
    readTime: "3 min read",
    views: 1240,
    likes: 412,
    author: "Wynn Frostweave",
    avatarChar: "⛄",
    summary: "The groundbreaking Mysticeti consensus engine reduces validator coordination requirements down to an unbelievable 390ms latency! By separating transactional checkpoints from physical voting loops, network finality stays ultra-rapid under highest load.",
    intro: "Sui's revolutionary upgrade, Mysticeti, represents a major leap forward in blockchain scalability—effectively shifting transactional latency from seconds to milliseconds.",
    bodyParagraphs: [
      "Historically, consensus systems relied on sequential blocks where validators had to vote on both receipt and sequencing together. Mysticeti breaks this linear dependency. By structuring transactions in a Direct Acyclic Graph (DAG) pool, validators can process incoming requests asynchronously, bypassing standard round-robin constraints.",
      "This architecture enables 'fast-path' execution for owned assets. When a transaction only affects an individual user's state, it completely avoids global consensus waiting rooms. The network validates and signs off on the transaction with just a single pair of round trips, completing execution under 300 milliseconds.",
      "For shared objects like central order books and liquid staking pools, Mysticeti employs parallel sequencer modules. This ensures total order validation without starving minor validators or experiencing system-wide pauses, maintaining absolute stability and flat gas fees even during intense community surges."
    ],
    takeaways: [
      "Sub-second finality: Consensus latency reduced down to a breathtaking 390ms.",
      "Asynchronous DAG structure: Decoupled transactional checkpoints from validation loops.",
      "Fast-path optimization: Single round-trip clearance for local owned object states."
    ],
    externalLink: "https://sui.io/blog/mysticeti-consensus-performance/"
  },
  {
    id: "sui-bridge",
    title: "Native Sui Bridge: Securing Cross-Chain Custody Assets",
    category: "Bridges",
    date: "2026-06-15",
    readTime: "4 min read",
    views: 984,
    likes: 310,
    author: "Kellan Winterborn",
    avatarChar: "🦊",
    summary: "Connecting Ethereum securely, the Native Sui Bridge positions asset locks directly under validator trust rather than risky third-party multi-sigs, offering an institutional-grade, zero-anxiety cross-chain experience.",
    intro: "Cross-chain bridges have historically been the weakest link in decentralized finance, prone to multi-million dollar exploits. In response, Sui built a native alternative safeguarded directly by its underlying consensus validators.",
    bodyParagraphs: [
      "Most external or multi-chain bridge services run separate off-chain committees or smart contract multisig safes. If even a handful of keys get compromised or the contract contains state flaws, pool reserves can be drained. The Native Sui Bridge eliminates this risk entirely.",
      "Instead of independent contracts, the native bridge controls locked Ethereum-bound assets under the direct cryptographic custody of Sui's production validator committee. Validations use active validator signatures natively verified on-chain, meaning the bridge inherits the full security guarantees of the entire blockchain.",
      "Furthermore, the bridge incorporates native rate limiters and smart automated circuits. In the event of a sudden, anomalous liquidity outflow, transaction speed limits adjust dynamically or trigger automated cooling periods. This proactive defense gives the community maximum security and peace of mind."
    ],
    takeaways: [
      "Validator-secured custody: Protected by the network's actual validator signatures.",
      "Cryptographic alignment: Direct on-chain verification without third-party committees.",
      "Automated safety limits: Intelligent flow constraints prevent large-scale capital drainage."
    ],
    externalLink: "https://sui.io/blog/native-sui-bridge-security/"
  },
  {
    id: "deepbook-v3",
    title: "DeepBook V3: Fueling Wholesale On-Chain Liquidity",
    category: "DeFi",
    date: "2026-06-12",
    readTime: "3 min read",
    views: 845,
    likes: 297,
    author: "Lyra Frostpeak",
    avatarChar: "🐻",
    summary: "DeepBook V3 introduces supreme optimization for Sui's native central limit order book. It allows automated makers and institutions to execute wholesale pricing orders with 90% cheaper gas overhead.",
    intro: "Central Limit Order Books (CLOBs) are notoriously expensive to run on standard blockchains. However, DeepBook V3 leverages Sui's parallel execution engine to power wholesale order flows on-chain.",
    bodyParagraphs: [
      "By separating liquidity makers from retail takers at the memory layer, DeepBook V3 facilitates wholesale pricing ranges that previously existed only in dark centralized pools. Programmatic market makers can submit hundreds of order adjustments per second without fearing fee inflation.",
      "This is made possible by native object wrapping. Every order book pair is managed as an isolated system. Slashes in execution steps and localized gas calculations ensure high-frequency traders only pay for the state objects they interact with directly, creating an ideal playground for institutional liquidity.",
      "For retail users, DeepBook acts as a master backend liquidity layer. When users swap tokens on DeFi routers, the pools automatically query DeepBook's active order spreads, matching the trades at optimal wholesale prices with sub-millisecond execution times."
    ],
    takeaways: [
      "Wholesale order books: Institutional pricing spreads built directly into the base layer.",
      "90% Gas reduction: Localized gas objects bypass global smart contract overhead.",
      "Seamless router matching: Auto-routes retail transactions for maximum execution efficiency."
    ],
    externalLink: "https://sui.io/blog/deepbook-v3-liquidity-infrastructure/"
  },
  {
    id: "creator-kiosk",
    title: "Sui Kiosk: Royalties Enforced at the Bytecode Level",
    category: "Creators",
    date: "2026-06-08",
    readTime: "2 min read",
    views: 1120,
    likes: 382,
    author: "Bram Snowdrift",
    avatarChar: "🦦",
    summary: "Sui Kiosk wraps transfer policies directly into system smart contract bytecode. This enables creators to strictly enforce secondary market royalties and minting rules, preventing marketplace bypass.",
    intro: "While traditional NFT platforms suffer from marketplace royalty bypass, Sui Kiosk structures ownership limits natively into the actual object's move metadata.",
    bodyParagraphs: [
      "A Sui Kiosk is a personal on-chain chest where users store assets. When an item is placed in a Kiosk, any trade or transfer must obey the transfer policies linked to that item's type. These conditions are validated during transaction execution, not left to front-end discretion.",
      "This bytecode-level lock is completely marketplace-agnostic. No third-party secondary marketplace can bypass royalty fees, split payouts, or redirect creators' margins. If standard rules specify a 5% royalty, the transfer transaction literally cannot complete unless the payment is bundled in.",
      "Furthermore, Kiosks unlock innovative mechanics like physical product pairing, dynamic minting queues, and lease-to-own digital items. This expands utility beyond simple collectibles. For gaming ecosystems, Kiosks provide a highly secure layout for player inventories and equipment trading."
    ],
    takeaways: [
      "Bytecode level enforcement: Transfer policies are validated directly at the contract layer.",
      "Marketplace-agnostic rules: True secondary royalties that cannot be bypassed by anyone.",
      "Kiosk inventories: Advanced secure inventory chest mechanics for web3 games."
    ],
    externalLink: "https://sui.io/blog/sui-kiosk-for-creators/"
  },
  {
    id: "community-vibe",
    title: "The Rust-to-Move Developer Transition Phenomenon",
    category: "Community",
    date: "2026-06-01",
    readTime: "3 min read",
    views: 750,
    likes: 245,
    author: "Yeti Correspondent",
    avatarChar: "🐨",
    summary: "The Sui ecosystem experiences immense developer traction as traditional Web2 and Rust engineers transition to Move. The language's focus on secure, object-centric assets eliminates typical smart contract vulnerabilities.",
    intro: "A silent migration is taking place in blockchain development. Engineers are moving away from account-based Solidity contracts toward the safety and intuition of Sui Move.",
    bodyParagraphs: [
      "In account-based systems, smart contracts modify a master balance ledger. This causes frequent re-entrancy exploits and flash loan hacks because individual tokens don't truly exist as separate entities. Sui Move addresses this by treating everything as a unique, self-contained Resource Object.",
      "Because objects are typed and explicitly owned, the compiler acts as a native security guard. For instance, developers cannot accidentally double-spend an object or delete a precious mint, as Move's bytecode verifier enforces strict 'drop', 'store', 'key', and 'copy' abilities before deployment.",
      "This structure simplifies complex tasks like multi-lane execution. Because transactions explicitly declare which objects they will read or write, Sui validators can execute thousands of transactions in parallel, preventing network-wide queuing or 'gas bidding wars' during popular launches."
    ],
    takeaways: [
      "Object-Centric architecture: Everything exists as a tangible on-chain resource object.",
      "Compiler-enforced security: Bytecode rules prevent common exploits like re-entrancy.",
      "Parallel transaction lanes: High-volume parallel processing keeps gas fees flat."
    ],
    externalLink: "https://sui.io/blog/why-developers-choose-sui-move/"
  }
];

export function SuiArticlesWidget() {
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem("sui_yeti_articles");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {}
    }
    return INITIAL_ARTICLES;
  });

  const [activeArticle, setActiveArticle] = useState<Article>(articles[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("sui_yeti_articles", JSON.stringify(articles));
  }, [articles]);

  const handleLikeArticle = (articleId: string) => {
    setArticles((prev) => 
      prev.map((art) => {
        if (art.id === articleId) {
          const isLiked = !art.isLiked;
          const updatedLikes = isLiked ? art.likes + 1 : art.likes - 1;
          const updated = { ...art, isLiked, likes: updatedLikes };
          if (activeArticle.id === articleId) {
            setActiveArticle(updated);
          }
          return updated;
        }
        return art;
      })
    );
  };

  const handleAskYetiAi = async () => {
    setIsAiLoading(true);
    setAiAnalysis("");
    try {
      const response = await fetch("/api/gemini/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Provide an all-lowercase, extremely cozy, lofi-vibe bulleted summary analysis of this Sui Ecosystem article. Mention specific technical components from the text such as parallel lanes, object parameters, and validator structures. Speak in a friendly, helpful developer Yeti tone in 3 neat bullet points: "${activeArticle.title}. Summary: ${activeArticle.summary}"`
        })
      });

      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      if (data.success) {
        setAiAnalysis(data.text);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setTimeout(() => {
        const fallbackCommentary = `• look at that beautiful parallel lane layout! 🏔️ the article "${activeArticle.title.toLowerCase()}" showcases why SUI is perfect for high-speed systems.\n• assets are locked directly inside state objects, bypassing risky multi-sig committees and third-party contract vulnerabilities.\n• cozy up by the thermal hearth while the consensus engine works its magic with sub-300ms finalized epochs! 🐻🕯️`;
        setAiAnalysis(fallbackCommentary);
        setIsAiLoading(false);
      }, 700);
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredArticles = articles.filter(art => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Consensus", "DeFi", "Bridges", "Creators", "Community"];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-white border-2 border-[#3c3c3c] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#3c3c3c] text-[#3c3c3c] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D67B52] tracking-wider font-extrabold uppercase flex items-center gap-1.5 leading-none">
            <span className="animate-pulse w-2 h-2 rounded-full bg-[#D67B52]"></span>
            <span>Ecosystem Newsroom</span>
          </span>
          <h2 className="text-xl font-bold text-[#3c3c3c] font-serif mt-1 flex items-center gap-1.5">
            <Newspaper size={20} className="text-[#89A8B2]" />
            <span>Sui Cozy Gazette & Articles Hub</span>
          </h2>
          <p className="text-xs text-[#6D5D6E] font-medium font-sans mt-0.5">
            Learn about parallel execution, sub-second consensus networks, Kiosks, and validator structures inside Yeti's library.
          </p>
        </div>

        {/* Dynamic search bar */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Search articles & guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF8F5] border-2 border-[#3c3c3c] rounded-2xl font-mono text-[#3c3c3c] placeholder-[#6D5D6E]/50 focus:outline-none focus:border-[#D67B52] transition-colors shadow-inner"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3c3c3c]/50" />
        </div>
      </div>

      {/* Categories filter deck */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full border-2 text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#D67B52] text-white border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c]"
                : "bg-white hover:bg-[#FAF8F5] text-stone-700 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2. Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: ACTIVE CHOSEN ARTICLE DISPLAY */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border-3 border-[#3c3c3c] rounded-[32px] p-6 shadow-[6px_6px_0px_0px_#3c3c3c] relative overflow-hidden">
            
            {/* Background decorative page paper seal */}
            <div className="absolute right-4 top-4 text-stone-100 font-serif font-black select-none text-9xl leading-none pointer-events-none opacity-40">
              {activeArticle.avatarChar}
            </div>

            {/* Article Top Bezel */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-dashed border-[#3c3c3c]/15 pb-4 mb-5 text-xs font-mono relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#3c3c3c]/40"></span>
                <span className="font-bold tracking-widest text-emerald-600 uppercase">COZY_READABLE_BYTECODE</span>
              </div>
              <div className="flex items-center gap-2 text-stone-500 text-[11px] font-bold">
                <Calendar size={12} />
                <span>{activeArticle.date}</span>
                <span className="bg-[#3c3c3c] text-[#FAF8F5] px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">
                  {activeArticle.category}
                </span>
              </div>
            </div>

            {/* Author Profile Plate */}
            <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8E1D9] border-2 border-[#3c3c3c] flex items-center justify-center text-xl shadow-[2px_2px_0px_0px_#3c3c3c]">
                  {activeArticle.avatarChar}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-800 text-xs sm:text-sm leading-tight">
                    {activeArticle.author}
                  </h4>
                  <p className="text-[10px] font-mono text-[#D67B52] uppercase font-black tracking-wider">
                    Sui Cabin Correspondent
                  </p>
                </div>
              </div>

              {/* Likes counter option */}
              <button
                onClick={() => handleLikeArticle(activeArticle.id)}
                className={`py-1.5 px-3.5 border-2 border-[#3c3c3c] rounded-2xl flex items-center gap-1.5 font-mono text-xs font-bold transition-all active:translate-y-[1px] cursor-pointer shadow-[2px_2px_0px_0px_#3c3c3c] ${
                  activeArticle.isLiked 
                    ? "bg-rose-50 text-rose-600 border-rose-500" 
                    : "bg-[#FAF8F5] text-stone-700 hover:bg-[#FAF8F5]/80"
                }`}
                title="Like this ecosystem article"
              >
                <ThumbsUp size={12} className={activeArticle.isLiked ? "fill-rose-500 text-rose-500" : ""} />
                <span>{activeArticle.likes} Likes</span>
              </button>
            </div>

            {/* Article Editorial Room */}
            <div className="space-y-5 relative z-10 font-sans leading-relaxed text-[#3c3c3c]">
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#3c3c3c] tracking-tight leading-tight">
                {activeArticle.title}
              </h3>

              <div className="bg-[#FAF8F5] border-l-4 border-[#89A8B2] p-4 rounded-r-2xl italic font-serif text-[#3c3c3c]/85 text-xs sm:text-sm">
                "{activeArticle.intro}"
              </div>

              <div className="space-y-4 text-xs sm:text-[13px] text-stone-700 leading-relaxed">
                {activeArticle.bodyParagraphs.map((para, i) => (
                  <p key={i} className="text-justify font-medium">
                    {para}
                  </p>
                ))}
              </div>

              {/* Key Bullet Highlights Panel */}
              <div className="bg-[#FAF8F5] border-2 border-[#3c3c3c] rounded-2xl p-4.5 space-y-2 mt-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D67B52] font-black flex items-center gap-1.5">
                  <BookMarked size={12} />
                  <span>Key takeaways & milestones</span>
                </span>
                <ul className="space-y-1.5 pl-1">
                  {activeArticle.takeaways.map((take, idx) => (
                    <li key={idx} className="text-xs font-medium text-stone-800 flex items-start gap-2">
                      <span className="text-[#89A8B2] font-black mt-0.5">•</span>
                      <span>{take}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* External officially referenced blog link */}
              <div className="pt-4 border-t border-dashed border-[#3c3c3c]/15 flex items-center justify-between">
                <span className="text-[10px] text-stone-400 font-mono">
                  {activeArticle.readTime} • {activeArticle.views} reader hits
                </span>
                <a
                  href={activeArticle.externalLink}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-1.5 text-[#D67B52] font-extrabold hover:underline font-mono text-[11px]"
                >
                  <span>Official Dev Article</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

          </div>

          {/* AI ECOSYSTEM CRITIC / INTERPRETATION CHAIR */}
          <div className="bg-[#FAF8F5] border-2 border-[#3c3c3c] rounded-[24px] p-5 space-y-3.5 relative shadow-[4px_4px_0px_0px_#3c3c3c]">
            <div className="flex items-center gap-2">
              <div className="p-1 px-1.5 bg-purple-100 text-purple-700 border border-purple-400 rounded-md">
                <Sparkles size={13} className="animate-spin text-purple-600" />
              </div>
              <h4 className="text-xs font-mono font-bold text-[#3c3c3c] uppercase tracking-wider">
                Yeti Library AI Assistant: Gemini Article Commentary
              </h4>
            </div>

            {!aiAnalysis && !isAiLoading ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#3c3c3c]/10">
                <p className="text-[11px] font-sans text-stone-600 font-medium leading-relaxed">
                  Yeti reviews actual transaction structures inside this article using the Gemini API. Ask Yeti for smart real-time commentary!
                </p>
                <button
                  onClick={handleAskYetiAi}
                  className="shrink-0 px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-mono font-bold rounded-xl border border-[#3c3c3c]/20 hover:scale-102 flex items-center gap-1.5 z-10 transition-all text-xs cursor-pointer shadow-sm shadow-purple-600/10"
                >
                  <Sparkles size={12} />
                  <span>Generate AI Commentary</span>
                </button>
              </div>
            ) : isAiLoading ? (
              <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-center gap-3 text-stone-500 font-mono text-xs">
                <RotateCcw size={14} className="animate-spin text-purple-600" />
                <span>Yeti is studying consensus DAG states... Cozying up...</span>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-purple-50/40 border border-purple-200/65 rounded-xl p-4 text-[11px] font-mono leading-relaxed text-[#3c3c3c]"
              >
                <div className="flex justify-between items-center mb-2.5 text-[10px] text-purple-700 uppercase tracking-widest font-extrabold pb-1 border-b border-purple-100/30">
                  <span>⚡ AI Analysis Verified</span>
                  <button 
                    onClick={handleAskYetiAi}
                    className="text-purple-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={10} />
                    <span>Run code scan</span>
                  </button>
                </div>
                <div className="font-mono text-xs text-stone-700 leading-relaxed whitespace-pre-wrap">
                  {aiAnalysis}
                </div>
              </motion.div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: ARTICLE SELECTION PANEL */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white border-2 border-[#3c3c3c] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#3c3c3c]">
            <div className="border-b-2 border-[#3c3c3c]/15 pb-3 mb-4 select-none">
              <h3 className="font-bold text-sm text-[#3c3c3c] font-serif flex items-center gap-2">
                <BookOpen size={16} className="text-[#D67B52]" />
                <span>Available Articles ({filteredArticles.length})</span>
              </h3>
              <p className="text-[10px] text-[#6D5D6E] mt-0.5 font-sans font-medium">
                Click any newspaper bulletin or article card to load its content onto active print desk board.
              </p>
            </div>

            {/* BULLETIN DECK STACK */}
            <div className="space-y-3.5 max-h-[640px] overflow-y-auto pr-1">
              {filteredArticles.length === 0 ? (
                <div className="p-8 text-center text-stone-400 font-mono text-xs bg-stone-50 border border-dashed border-[#3c3c3c]/20 rounded-2xl select-none">
                  No ecosystem articles match the filter. ❄️
                </div>
              ) : (
                filteredArticles.map((art, idx) => {
                  const isActive = activeArticle.id === art.id;
                  const bgs = [
                    "bg-[#B9D7EA]/15 hover:bg-[#B9D7EA]/25",
                    "bg-[#E8E1D9]/40 hover:bg-[#E8E1D9]/60",
                    "bg-[#E8A0BF]/10 hover:bg-[#E8A0BF]/18",
                    "bg-[#89A8B2]/10 hover:bg-[#89A8B2]/20",
                    "bg-yellow-50/40 hover:bg-yellow-100/50"
                  ];
                  const chosenBg = bgs[idx % bgs.length];

                  return (
                    <motion.div
                      key={art.id}
                      onClick={() => {
                        setActiveArticle(art);
                        setAiAnalysis("");
                      }}
                      whileHover={{ x: 2 }}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 relative ${
                        isActive 
                          ? "bg-white border-[#D67B52] shadow-[3px_3px_0px_0px_#D67B52]"
                          : `${chosenBg} border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c]`
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-stone-100/80 border border-stone-300 flex items-center justify-center text-lg select-none">
                        {art.avatarChar}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5 mb-1 text-[9px] font-mono select-none">
                          <span className="font-extrabold text-[#D67B52] uppercase">
                            BULLETIN_0{idx + 1}
                          </span>
                          <span className="font-bold text-[#6D5D6E] flex items-center gap-0.5">
                            <Clock size={10} />
                            {art.readTime}
                          </span>
                        </div>

                        <h4 className="font-bold text-[#3c3c3c] text-xs leading-snug truncate">
                          {art.title}
                        </h4>
                        
                        <p className="text-[10px] text-stone-500 font-sans mt-0.5 truncate">
                          {art.summary}
                        </p>
                      </div>

                      {isActive && (
                        <div className="absolute right-2 bottom-2 text-[#D67B52]">
                          <Award size={13} className="animate-pulse" />
                        </div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* ECOSYSTEM TELEMETRY PANEL */}
            <div className="bg-[#FAF8F5] border-2 border-dashed border-[#3c3c3c]/20 p-4 rounded-xl mt-5 font-mono text-[9px] text-stone-600 select-none space-y-1.5">
              <div className="font-bold uppercase tracking-wider text-[#D67B52] flex items-center gap-1 text-[9.5px]">
                <Clock size={11} className="animate-spin text-[#D67B52]" />
                <span>SUI NETWORK FIELD METRICS</span>
              </div>
              <div className="flex justify-between">
                <span>ACTIVE VALIDATORS:</span>
                <span className="font-bold">146 NODES GLOBAL</span>
              </div>
              <div className="flex justify-between">
                <span>CONCURRENT EPS:</span>
                <span className="font-bold text-emerald-600">297,000 tx/sec</span>
              </div>
              <div className="flex justify-between">
                <span>STANDARDS VERSION:</span>
                <span className="font-bold text-[#D67B52]">Move-2.1</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
