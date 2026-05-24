import { LearningTrack } from "./types";

export const initialTracks: LearningTrack[] = [
  {
    id: "sui-basics",
    title: "Sui Basics",
    description: "Learn SUI foundations, object-centric data models, fast execution, and gas setup.",
    iconName: "Compass",
    difficulty: "Beginner",
    modules: [
      {
        id: "basics-intro",
        title: "Introduction to Sui Blockchain",
        description: "What makes Sui radically fast for decentralized networks?",
        xpValue: 40,
        steps: [
          {
            id: "step1",
            title: "What is Sui?",
            content: "welcome, tech traveler! grab a hot green tea, relax, and hear about sui. sui is a high-performance layer 1 blockchain designed from scratch. unlike older blockchains that process transactions one-by-one like a single queue at a cafe, sui processes independent transactions in parallel. this means instant confirmations and sub-second latency! 🐻🍵",
            yetiMood: "chill",
            chalkboardHeader: "SUI = COZY VELOCITY"
          },
          {
            id: "step2",
            title: "The SUI Token & Gas fees",
            content: "the $SUI token is the heartbeat of this ecosystem. it's used to pay for gas fees, stake for network security, and act as a standard medium of trade. what's interesting? gas is paid in MIST, where 1 SUI = 1,000,000,000 MIST. sui's storage fund ensures gas prices remain stable even if storage costs fluctuate over several years! ❄️✨",
            yetiMood: "thinking",
            chalkboardHeader: "GAS IN THE SNOW"
          },
          {
            id: "step3",
            title: "Object-Centric Storage",
            content: "in ethereum, data is stored inside smart contract accounts as key-value pairs. on sui, everything is an 'Object'. every token, NFT, or profile is stored directly under its own unique ID. think of it like having physical books on your own shelf, rather than everyone sharing a central database ledger inside a library! this allows instant owns and parallel signatures.",
            yetiMood: "excited",
            chalkboardHeader: "EVERYTHING IS AN OBJECT"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "How does Sui achieve massive throughput compared to standard blockchains?",
            options: [
              "By processing independent transactions in parallel",
              "By running nodes on a single mega-server",
              "By removing validation steps entirely",
              "By utilizing a slower slow-crawl consensus"
            ],
            correctAnswerIndex: 0,
            explanation: "Sui's object-centric model identifies independent transactions and runs them in parallel, bypassing consensus overhead entirely for simple transactions."
          },
          {
            id: "q2",
            question: "How many MIST are inside 1 SUI token?",
            options: [
              "1,000 MIST",
              "1,000,000 MIST",
              "1,000,000,000 (1 billion) MIST",
              "10,000 MIST"
            ],
            correctAnswerIndex: 2,
            explanation: "Just like base units in Bitcoin (Satoshi) or Ethereum (Wei), 1 SUI is equivalent to 1,000,000,000 MIST."
          },
          {
            id: "q3",
            question: "Where is user data saved in Sui's object-centric storage system?",
            options: [
              "Inside a centralized AWS cluster",
              "Directly inside unique standalone objects on-chain",
              "In a global Ethereum-like state map only",
              "In the user's secret keys"
            ],
            correctAnswerIndex: 1,
            explanation: "On Sui, all data and assets are represented as first-class, standalone 'Objects' saved on-chain, containing owner addresses, version, and type."
          }
        ]
      },
      {
        id: "basics-move",
        title: "The Move Language Safety",
        description: "Understand the asset safety principles behind the Sui Move language.",
        xpValue: 50,
        steps: [
          {
            id: "step1",
            title: "Why Move?",
            content: "before move came along, developers in blockchain had to write safety checks manually. move, created by mysten/meta engineers, treats digital tokens as actual physical resources. resources cannot be implicitly copied, overwritten, or discarded. they can only be *moved* or *borrowed*. this eliminates common bugs like double-spending or re-entrancy! 🐻💻",
            highlightCode: "struct Coin<phantom T> has key, store {\n    id: UID,\n    value: u64\n}",
            yetiMood: "thinking",
            chalkboardHeader: "MOVE VS SOLIDITY"
          },
          {
            id: "step2",
            title: "Ability Annotations",
            content: "every object struct in move has specific access permissions called Abilites: key (can be used as an object id), store (can be nested in other objects), copy (can be cloned), and drop (can be destroyed). for example, money structs will never have 'copy' or 'drop' permissions because money shouldn't be duplicated or vaporized by mistake! smart coding right there.",
            highlightCode: "struct Sweatshirt has key, store {\n    id: UID,\n    color: String\n}",
            yetiMood: "chill",
            chalkboardHeader: "REAL WORLD ABILITIES"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "Which of the following describes a key advantage of the Move language?",
            options: [
              "It forces all assets to reside on a web2 server",
              "It prevents re-entrancy and double-spending natively via structural types",
              "It replaces smart contracts with simple text files",
              "It is compiled directly into javascript"
            ],
            correctAnswerIndex: 1,
            explanation: "Move's resource-oriented compiler prevents double-spends and re-entrancy natively by restricting copying or dropping resources without explicit capability permissions."
          },
          {
            id: "q2",
            question: "If a Move struct representing currency has key and store abilities, but NOT copy, what is prevented?",
            options: [
              "Users can never spend it",
              "Validators can't read its properties",
              "It cannot be duplicated or counterfeited on-chain",
              "It cannot be stored in a Kiosk container"
            ],
            correctAnswerIndex: 2,
            explanation: "Without the 'copy' capability, the currency cannot be duplicated, ensuring absolute supply protection directly in the compiler bytecode verification level."
          }
        ]
      }
    ]
  },
  {
    id: "sui-defi",
    title: "DeFi on Sui",
    description: "Connect to Swaps, Lending, Liquidity Pools, and interactive swap simulations.",
    iconName: "TrendingUp",
    difficulty: "Intermediate",
    modules: [
      {
        id: "defi-swaps",
        title: "DEX Swaps & Liquidities",
        description: "How automated liquidity works on protocols like Cetus & Turbos.",
        xpValue: 50,
        steps: [
          {
            id: "step1",
            title: "Liquidity Pools & DEXs",
            content: "hey explorer, look at those mountain streams! 🏔️ just like water, liquidity needs to flow. instead of matching buyers and sellers manually, decentralized exchanges on sui (like Cetus and Turbos) use automated pools. users deposit token pairs, allowing others to swap instantly at a mathematically-backed rate (like x * y = k) with near-zero waiting times.",
            yetiMood: "chill",
            chalkboardHeader: "AMM FLOODGATES"
          },
          {
            id: "step2",
            title: "Slippage & Predictable Gas",
            content: "when you trigger a large swap, the token price can shift while your transaction travels to the node. this shift is called 'Slippage'. if real prices drift beyond your slippage allowance (e.g. 0.5%), the swap automatically aborts! this keeps you safe from bad deal arbitrage. plus, sui's sub-second execution guarantees your swap locks in the exact price index you see. pretty sweet! 💸",
            yetiMood: "thinking",
            chalkboardHeader: "SLIPPAGE EXPLAINED"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "What is 'slippage' in a decentralized exchange swap?",
            options: [
              "The speed of network validation errors",
              "The price difference between transaction broadcast and execution",
              "The gas fee refund returned to a user",
              "The amount of SUI locked inside Kiosk"
            ],
            correctAnswerIndex: 1,
            explanation: "Slippage occurs when the execution price of a swap deviates from the price seen when the user first submitted the swap, usually due to pool activity."
          },
          {
            id: "q2",
            question: "Why does Sui's high speed benefit swap traders?",
            options: [
              "It randomizes the final output with a larger spread",
              "It ensures fast execution which drastically minimizes price leakage and exposure to front-running bots",
              "It makes slippage tolerances illegal",
              "It forces all fees to be zero"
            ],
            correctAnswerIndex: 1,
            explanation: "Sub-second validation times leave searchers or arbitrage miners with virtually zero window to sandwich or front-run user swaps, giving you the cleanest execution rates."
          }
        ]
      },
      {
        id: "defi-lending",
        title: "Lending Protocol Architecture",
        description: "Understand collateralized borrowing and Navi/Suilend design.",
        xpValue: 50,
        steps: [
          {
            id: "step1",
            title: "Collateralized Crypto Loans",
            content: "want to leverage your tokens without selling them? that's where lending machines like Suilend and Navi come into play. you supply $SUI as Collateral. the protocol assesses your borrow power based on a Loan-To-Value (LTV) metric, usually 60-80%. you can then borrow stables (like USDC) to execute other trades, or earn dynamic interest APY as a supplier! 🦁✨",
            yetiMood: "excited",
            chalkboardHeader: "NAVI & SUILEND CRUCIBLE"
          },
          {
            id: "strp2",
            title: "The Risk of Liquidation",
            content: "careful now! if the value of your supplied $SUI drops too low, or the value of your borrowed assets increases, your health factor falls below 1.0. once this splits, third-party Liquidators can automatically step in, pay off your debt, and claim your collateral at a discount! make sure you manage risk and keep loans healthy under the cold weather... 🌨️☕",
            yetiMood: "thinking",
            chalkboardHeader: "RISK OF LIQUIDATION"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "What happens on Nav/Suilend if your loan's health factor drops below 1.0?",
            options: [
              "Nothing, the loan lasts forever",
              "Liquidators will claim your collateral at a discount to settle your outstanding borrow debt",
              "The system calls your phone to demand cash deposit",
              "The government taxes your wallet balance"
            ],
            correctAnswerIndex: 1,
            explanation: "Lending pools are permissionless. If the collateral coverage drops below predefined safety limits, anyone can liquidate the security threshold to shield depositors from protocol deficits."
          },
          {
            id: "q2",
            question: "What does LTV (Loan-To-Value) stand for in collateralized loans?",
            options: [
              "Liquidity Token Velocity",
              "Local Transaction Validation",
              "The ratio of the borrowed asset value to the collateral asset value",
              "Leased Token Volume"
            ],
            correctAnswerIndex: 2,
            explanation: "LTV specifies the percentage amount you can borrow against your deposited backing. An LTV of 70% means for every $100 of SUI, you can borrow up to $70 of stablecoins."
          }
        ]
      }
    ]
  },
  {
    id: "sui-protocols",
    title: "Sui Protocols",
    description: "Sui native libraries, DeepBook shared liquidity, and NFT Kiosk technology.",
    iconName: "Coins",
    difficulty: "Advanced",
    modules: [
      {
        id: "protocols-deepbook",
        title: "DeepBook Orderbook Engine",
        description: "Explore the deep, shared liquidity engine written directly by Sui Core.",
        xpValue: 40,
        steps: [
          {
            id: "step1",
            title: "Sui's Central Orderbook",
            content: "unlike most chains where a fully peer-to-peer limit orderbook is way too expensive to operate on-chain, sui has a native central limit orderbook called DeepBook! deepbook is open source, built directly by the mysten engineering team, and allows any application on the network to pool bids and asks together for the ultimate shared liquidity. 🎧📖",
            yetiMood: "chill",
            chalkboardHeader: "DEEPBOOK SUI ENGINE"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "What is DeepBook on Sui?",
            options: [
              "A social media chat app",
              "A native, highly optimized, shared on-chain Central Limit Order Book (CLOB)",
              "A private storage database for wallets",
              "A training model block for offline yeti"
            ],
            correctAnswerIndex: 1,
            explanation: "DeepBook is a community-owned, foundational decentralized orderbook integrated directly as a native system protocol, providing core liquidity to any builder."
          }
        ]
      },
      {
        id: "protocols-kiosk",
        title: "Sui NFT Kiosk & Royalty Safeguards",
        description: "Uncover how Kiosk secures creator royalties and handles ownership permissions securely.",
        xpValue: 40,
        steps: [
          {
            id: "step1",
            title: "What is Kiosk?",
            content: "royalties are standard for artists, but on old chains, buyers could dodge them by transferring items in private channels. sui solves this with Kiosk! a kiosk is a shared commerce container on-chain. your NFTs reside inside your kiosk, and the move contract rules can enforce strict royalty fees during custom sales! this keeps creators protected and supported. 🐻👑",
            yetiMood: "proud",
            chalkboardHeader: "NFT KIOSK CONTAINERS"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "How does a Sui Kiosk enforce creator royalties?",
            options: [
              "By blocking users from looking at the artwork",
              "By wrapping tokens in secure containers, preventing transfers unless royalty Move policies are executed and satisfied",
              "By raising gas prices randomly",
              "By calling an off-chain API on web2"
            ],
            correctAnswerIndex: 1,
            explanation: "Sui Kiosk locks the digital assets inside a standardized on-chain account module, restricting direct ownership extracts unless transaction parameters verify compliance with creator guidelines."
          }
        ]
      }
    ]
  },
  {
    id: "sui-history",
    title: "Sui History",
    description: "The heritage of Mysten Labs, why Sui was built, and current network milestones.",
    iconName: "Award",
    difficulty: "Beginner",
    modules: [
      {
        id: "history-mysten",
        title: "The Mysten Labs Story & Mainnet",
        description: "The origins of Sui, Meta's Diem project legacy, and the 2023 launch.",
        xpValue: 45,
        steps: [
          {
            id: "step1",
            title: "Our Heritage: Meta Diem Team",
            content: "how did sui get here? 🐻 background check time! the founders of Mysten Labs (Evan Cheng, Adeniyi Abiodun, Sam Blackshear, George Danezis, and Kostas Chalkias) previously led Meta's core Diem blockchain project and developed Move there. when Diem was retired, they decided to start mysten labs to fully unlock the object vision they dreamed of!",
            yetiMood: "chill",
            chalkboardHeader: "FROM META TO MYSTEN"
          },
          {
            id: "step2",
            title: "Mainnet 2023 & Scaling Era",
            content: "Sui successfully launched its mainnet on May 3, 2023! Since then, it has broken world records: executing over 65 million transactions in a single day, sustaining 297,000 sub-second Peak TPS (Transactions Per Second), and achieving massive TVL (Total Value Locked) in DeFi. yeti is extremely honored to welcome you into this historic quest! ❄️✨",
            yetiMood: "proud",
            chalkboardHeader: "SUI RECORD-BREAKING RUN"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "Who founded Mysten Labs, the developers of the Sui network?",
            options: [
              "Former Meta Diem blockchain engineering team members",
              "A group of collegiate students in a hackathon back 2010",
              "Satoshi Nakamoto's second company",
              "An AI generator project"
            ],
            correctAnswerIndex: 0,
            explanation: "The founders of Mysten Labs are industry leaders who originally spearheaded research into Diem and Move compiler targets at Meta, before building the Sui decentralized L1 network."
          },
          {
            id: "q2",
            question: "When did the Sui mainnet officially launch?",
            options: [
              "May 2021",
              "December 2022",
              "May 3, 2023",
              "January 2024"
            ],
            correctAnswerIndex: 2,
            explanation: "Sui Mainnet successfully went live for the global community on May 3, 2023, initiating a high speed scalable epoch in public ledger history."
          }
        ]
      }
    ]
  }
];
