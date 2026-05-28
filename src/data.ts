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
        xpValue: 45,
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
          },
          {
            id: "step4",
            title: "Storage Fund Economics",
            content: "the storage fund ensures the network stays slim and validators stay happy. when you buy storage, that mist is staked. and guess what? if you delete your data later, you get a partial gas rebate refund back! yeti thinks this is perfect digital recycling. ♻️🐻",
            yetiMood: "proud",
            chalkboardHeader: "ECONOMIC RECYCLING"
          },
          {
            id: "step5",
            title: "Sub-Second Ephemeral Finality",
            content: "why call it instant? because on-chain actions settle in less than 400 milliseconds! by separating simple asset transfers from complex smart contract states, those simple transfers don't need a heavy round-of-agreements between validators. we call this fast-path execution. yeti is sitting comfortably by the fire enjoying this fast-path breeze! ⚡🗻",
            yetiMood: "excited",
            chalkboardHeader: "FAST-PATH AGREEMENT"
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
          },
          {
            id: "q4",
            question: "What happens to your gas expenses if you delete an obsolete on-chain object?",
            options: [
              "You are fined a fee for network disruption",
              "You receive a storage rebate refund from the storage fund",
              "Nothing happens",
              "Your wallet is locked temporarily"
            ],
            correctAnswerIndex: 1,
            explanation: "Sui rewards developers and users for keeping state bloat minimal by issuing storage rebates when long-lived objects are pruned."
          }
        ]
      },
      {
        id: "basics-move",
        title: "The Move Language Safety",
        description: "Understand the asset safety principles behind the Sui Move language.",
        xpValue: 55,
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
          },
          {
            id: "step3",
            title: "Bytecode Verifier Shield",
            content: "before a move contract ever touches raw validator hardware, it goes through an intense security scanner called the bytecode verifier. it checks type rules, enforces field privacy, and guarantees memory safety. it's like a warm safety detector that keeps any bad spells away from your code closet! 🐻🛡️",
            highlightCode: "// Bytecode verification guards the execution stack\n// enforcing runtime-level capabilities strictly",
            yetiMood: "excited",
            chalkboardHeader: "BYTECODE VERIFIER GUARD"
          },
          {
            id: "step4",
            title: "The Borrow Checker Engine",
            content: "need to share data without throwing it away? Move uses reference borrowing! you use '&' for read-only access, and '&mut' if you need to mutate fields. the borrow checker ensures that nobody can modify an object while someone else is reading it! this prevents memory race conditions completely under the ice. ⚖️🐻",
            highlightCode: "fun read_value(coin: &Coin<SUI>): u64 {\n    coin.value\n}",
            yetiMood: "thinking",
            chalkboardHeader: "BORROW CHECKER VALUE"
          },
          {
            id: "step5",
            title: "Strict Module Field Privacy",
            content: "in Solidity, anyone can modify public variables. in Move, all struct fields are strictly private to the module where they are defined! external modules can only interact with your structs via public function APIs you write. this puts a thick cozy brick wall protecting your treasury from sneaky backdoors! 🧱🏛️",
            highlightCode: "struct Vault has key {\n    id: UID,\n    balance: u64, // Private field, only accessible by internal funs!\n}",
            yetiMood: "proud",
            chalkboardHeader: "FIELD PRIVACY"
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
          },
          {
            id: "q3",
            question: "What is the role of the Move Bytecode Verifier?",
            options: [
              "To auto-write JavaScript frontend routes",
              "To verify contract storage code syntax",
              "To enforce ownership and type rules at the bytecode execution level before deployment",
              "To convert Move code into Solidity"
            ],
            correctAnswerIndex: 2,
            explanation: "The byte-code verifier ensures that all executable Move code conforms to safety invariants (such as references and type boundaries) before executing on-chain."
          }
        ]
      },
      {
        id: "basics-staking",
        title: "Staking & Validator Delegations",
        description: "How Sui's Proof of Stake consensus maintains decentralization and network health.",
        xpValue: 45,
        steps: [
          {
            id: "step1",
            title: "Active Stake & Validator Rewards",
            content: "sui uses a Delegated Proof of Stake model! validators run heavy-duty computers to check all transactions. you can delegate your $SUI to them to pool validation strength. in return, you secure the winter lands and earn a portion of the stake rewards! 🐻🏰",
            yetiMood: "chill",
            chalkboardHeader: "PROOF OF STAKE HARMONY"
          },
          {
            id: "step2",
            title: "The Slashing Guard",
            content: "what happens if a validator misbehaves, like going offline or double-signing blocks? they face the risk of slashing, where staked assets can be taken away! this alignment keeps validators honest, fast, and constantly awake. yeti is cozy, but validators are alert! ⏰🌨️",
            yetiMood: "thinking",
            chalkboardHeader: "SLASHING PROTECTION"
          },
          {
            id: "step3",
            title: "Unstaking Epoch Timing",
            content: "uncorking your stake is simple but takes some patience. changes to staked delegations register at the boundary of an 'epoch' (which lasts roughly 24 hours on sui). once the epoch spins, your stake is unlocked and ready to flow. 🔄🍵",
            yetiMood: "excited",
            chalkboardHeader: "THE WHEEL OF EPOCHS"
          },
          {
            id: "step4",
            title: "Validator Selection Rules",
            content: "who gets to choose the active validator set? you and the staking community! the active 100+ validators are selected based on total delegated stake power. they publish commission rates (the fee they take for operating nodes). yeti advises picking high-performance nodes with cozy, competitive commissions! 🏷️🐻",
            yetiMood: "chill",
            chalkboardHeader: "COMMISSIONS & HONESTY"
          },
          {
            id: "step5",
            title: "Compounding APY Power",
            content: "when you stake SUI, you don't receive daily cash transfers in your wallet. instead, your staking object itself increases in backing value! this means rewards compound automatically in the background under the snow. when you unstake, you retrieve more SUI than you originally deposited! yeti claims this is a legendary passive boost! 📈✨",
            yetiMood: "proud",
            chalkboardHeader: "AUTOMATED COMPOUNDING Yield"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "When do validator stake delegations and unstaking actions take visual effect?",
            options: [
              "Instantly",
              "After 1 hour",
              "At the epoch boundary (roughly every 24 hours)",
              "Only on weekends"
            ],
            correctAnswerIndex: 2,
            explanation: "Sui state adjustments including validator stake parameters settle at the turn of an epoch, which marks a coordinated 24-hour cycle of node state validation."
          },
          {
            id: "q2",
            question: "What mechanism discourages validators from acting maliciously on-chain?",
            options: [
              "The risk of Slashing (stake forfeiture)",
              "They are banned from the discord group",
              "We take their keyboard",
              "A minor fine in paper currency"
            ],
            correctAnswerIndex: 0,
            explanation: "Slashing ensures validators remain financially accountable; any hostile deviation forfeits their staked capital."
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
        xpValue: 55,
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
          },
          {
            id: "step3",
            title: "Concentrated Liquidity pools (CLMM)",
            content: "traditionally, AMM pools spread liquidity across the entire price scale (0 to infinity). but in Concentrated Liquidity (CLMM) like Cetus, you put your capital inside customized price ranges! this creates super thick depth where trading actually happens, boosting your fee yield and minimizing user slippage. smart, isn't it? 🌡️🐻",
            yetiMood: "excited",
            chalkboardHeader: "CONCENTRATED POWER"
          },
          {
            id: "step4",
            title: "Imperma-frost Loss Paradox",
            content: "providing liquidity sounds cozy, but warning—prices fluctuate! if token A surges while token B drops, arbitrageurs buy the cheap token. your pool rebalances, leaving you with fewer high-value tokens than if you had just held them in your wallet. this is called Impermanent Loss. yeti says stay frosty and monitor pool ratios! ❄️⚖️",
            yetiMood: "thinking",
            chalkboardHeader: "IMPERMANENT LOSS"
          },
          {
            id: "step5",
            title: "Smart Order Routing",
            content: "what if you swap Token X for Token Y, but there is no direct pool connecting them? Sui's router executes 'Smart Order Routing'! it splits your swap through multi-pool paths (e.g. X to SUI, then SUI to Y) behind the scenes in a single transaction block. this routes your asset paths cleanly to minimize fees and give you the absolute best rates! 🗺️🐻",
            yetiMood: "proud",
            chalkboardHeader: "SMART MULTI-POOL ROUTER"
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
          },
          {
            id: "q3",
            question: "How does concentrated liquidity (CLMM) differ from traditional AMM pools?",
            options: [
              "It forces all prices to match flat fiat exchange currencies",
              "It allocates capital only within specific, chosen price ranges to maximize design efficiency",
              "It disables swaps entirely",
              "It requires manual book matching by traders"
            ],
            correctAnswerIndex: 1,
            explanation: "By centering assets in the active trading bandwidth, capital efficiency increases significantly, rewarding liquidity providers with higher fees."
          }
        ]
      },
      {
        id: "defi-lending",
        title: "Lending Protocol Architecture",
        description: "Understand collateralized borrowing and Navi/Suilend design.",
        xpValue: 55,
        steps: [
          {
            id: "step1",
            title: "Collateralized Crypto Loans",
            content: "want to leverage your tokens without selling them? that's where lending machines like Suilend and Navi come into play. you supply $SUI as Collateral. the protocol assesses your borrow power based on a Loan-To-Value (LTV) metric, usually 60-80%. you can then borrow stables (like USDC) to execute other trades, or earn dynamic interest APY as a supplier! 🦁✨",
            yetiMood: "excited",
            chalkboardHeader: "NAVI & SUILEND CRUCIBLE"
          },
          {
            id: "step2",
            title: "The Risk of Liquidation",
            content: "careful now! if the value of your supplied $SUI drops too low, or the value of your borrowed assets increases, your health factor falls below 1.0. once this splits, third-party Liquidators can automatically step in, pay off your debt, and claim your collateral at a discount! make sure you manage risk and keep loans healthy under the cold weather... 🌨️☕",
            yetiMood: "thinking",
            chalkboardHeader: "RISK OF LIQUIDATION"
          },
          {
            id: "step3",
            title: "Dynamic Interest Rate Slopes",
            content: "protocols like Suilend don't use fixed interest rates. rates are drawn on a curve! when matching pools are mostly empty (high utilization), interest rates spike up to reward new lenders and nudge borrowers to repay. when money is super abundant (low utilization), rates soften to invite friendly borrowers! curve math keeps the balance. 📈🐻",
            yetiMood: "thinking",
            chalkboardHeader: "RATE EQUILIBRIUM"
          },
          {
            id: "step4",
            title: "Isolated Market Walls",
            content: "if a flashy new token with extreme price variance gets listed, does it endanger standard $SUI depositors? no! lending protocols create 'Isolated Pools'. assets inside isolated markets cannot be used as collateral or borrowed in the main pool, keeping risk tightly quarantined under specialized security walls! 🧱🏔️",
            yetiMood: "chill",
            chalkboardHeader: "ISOLATED SECURITIES"
          },
          {
            id: "step5",
            title: "Zero-Collateral Flash Loans",
            content: "need to borrow 1,000,000 SUI to execute a big price arbitrage, but don't have the cash? use a Flash Loan! you borrow the funds, execute your swap, split the gains, and pay back the original capital—all within a single Programmable Transaction Block! if you can't pay it back by the end of the block, the contract self-aborts as if nothing happened! yeti thinks this is absolute sorcery! ⚡🧙‍♂️",
            yetiMood: "excited",
            chalkboardHeader: "FLASH LOAN CHAINS"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "What happens on Navi/Suilend if your loan's health factor drops below 1.0?",
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
          },
          {
            id: "q3",
            question: "What governs the interest rate inside Web3 decentralized lending pools?",
            options: [
              "The central banking interest boards",
              "A random dice-rolling trigger on-chain",
              "Pool utilization ratios mapping along design response curves",
              "A strict fixed rate of 5%"
            ],
            correctAnswerIndex: 2,
            explanation: "Utilization-dependent rate curves adjust dynamically to preserve capital reserves during high credit demands, maintaining protocol safety."
          }
        ]
      },
      {
        id: "defi-liquid-staking",
        title: "Liquid Staking Derivatives (LSDs)",
        description: "Learn how to put your staked SUI to work using liquid wrapping tokens.",
        xpValue: 45,
        steps: [
          {
            id: "step1",
            title: "The Staking Lock Constraints",
            content: "staking secures the homeland, but traditional staking locks your $SUI up so you can't use it in DEXs or play games. liquid staking changes the game! you store SUI, and the protocol hands you back an receipt ticket (e.g. afSUI, haSUI, or sSUI) representing your staked pool that dynamically gains value! 🎟️🐻",
            yetiMood: "chill",
            chalkboardHeader: "UNLOCKING CAPTIVE STAKE"
          },
          {
            id: "step2",
            title: "Double Yield Opportunities",
            content: "here is the magic formula: you earn 4-5% staking APY passively through your liquid receipt token (like haSUI), and simultaneously, you use that same receipt token as lending collateral or swap assets! it doubles your operational utility within the cozy ecosystem loops. yeti loves smart efficiency! 🧪✨",
            yetiMood: "excited",
            chalkboardHeader: "SWISS KNIFE STAKING"
          },
          {
            id: "step3",
            title: "Instant De-pegging Risk Warning",
            content: "just bear in mind: the exchange price of your liquid token is bound to the core validator reserves, but market trading pools can experience tiny deviations or price slips during sudden panic cascades. always audit pool slippage thresholds, even in warm lo-fi spaces! 🗺️🐻",
            yetiMood: "thinking",
            chalkboardHeader: "MARKET DEVIATIONS"
          },
          {
            id: "step4",
            title: "Exchange Rate Appreciation Mechanics",
            content: "why doesn't 1 sSUI equal exactly 1 SUI forever? because of reward accumulation! as standard validator rewards pool together, the wrapping contract claims them. the exchange rate dynamically adjusts (e.g. 1 sSUI becomes worth 1.05 SUI), allowing you to pull out more SUI upon final redemption! it's like a snowball accumulating size! ☃️ SUI",
            yetiMood: "proud",
            chalkboardHeader: "ACCUMULATION CURVE"
          },
          {
            id: "step5",
            title: "LSD Restaking Pipelines",
            content: "what's the third floor of this cozy yielding academy cabin? 'Restaking'! you deposit your liquid staking tokens (like sSUI) directly inside secondary restaking engines. this secures secondary infrastructure services on-chain, and rewards you with yet a third layer of passive yields! three yields in one single asset loop. yeti is dancing! 🐻💃",
            yetiMood: "excited",
            chalkboardHeader: "RESTAKING LAYER"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "What primary utility does Liquid Staking provide to a SUI developer?",
            options: [
              "It makes gas costs completely zero",
              "It yields a tradable, interest-bearing token representation of your staked assets, preserving capital liquidity",
              "It deletes all stored on-chain transactions",
              "It converts SUI directly into Bitcoin"
            ],
            correctAnswerIndex: 1,
            explanation: "Liquid staking wrappers represent staked balances, accumulating staking rewards while allowing the tokens to be traded, lent, or pledged in other DeFi protocols."
          },
          {
            id: "q2",
            question: "What risk can affect liquid staking structures during high panic sell events?",
            options: [
              "Temporary market de-pegging from the underlying redemption index in open secondary pools",
              "Your wallet address being randomly modified on-chain",
              "Losing the private key sequence",
              "Your validator turning into a web2 database"
            ],
            correctAnswerIndex: 0,
            explanation: "Though exchange redemption rates are on-chain guaranteed, high sell pressure in open liquidity pools may drag down immediate spot prices for quick sellers."
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
        xpValue: 45,
        steps: [
          {
            id: "step1",
            title: "Sui's Central Orderbook",
            content: "unlike most chains where a fully peer-to-peer limit orderbook is way too expensive to operate on-chain, sui has a native central limit orderbook called DeepBook! deepbook is open source, built directly by the mysten engineering team, and allows any application on the network to pool bids and asks together for the ultimate shared liquidity. 🎧📖",
            yetiMood: "chill",
            chalkboardHeader: "DEEPBOOK SUI ENGINE"
          },
          {
            id: "step2",
            title: "DeepBook V3 Key Features",
            content: "DeepBook V3 leverages sui's lightning speed to offer flashloans, customizable order structures, and instant taker fills, keeping trading as light as falling snowflakes. plus, anyone can build a visual dashboard or charting interface on top of DeepBook's public pipelines! 🐻📊",
            yetiMood: "excited",
            chalkboardHeader: "DEEPBOOK EVOLVED"
          },
          {
            id: "step3",
            title: "Maker & Taker Rebate Tier Models",
            content: "how does DeepBook maintain deep order columns? by rewarding participants! market creators who publish passive orders inside the order column are called 'Makers' and pay tiny or even zero fees. explorers who execute immediate takers are 'Takers' and pay matching fees. this setup attracts massive professional liquidity! 🏷️🐻",
            yetiMood: "chill",
            chalkboardHeader: "FEE SCHEDULE ENGINE"
          },
          {
            id: "step4",
            title: "Ultra-Fast Market Maker Hedging",
            content: "because Sui settles transactions in milliseconds, professional market makers can update bids and asks hundreds of times per second! they run automatic algorithms to hedge coin prices instantly against external exchanges, ensuring that depth columns are always thick and stable even during fast snowstorms. 🌨️⚖️",
            yetiMood: "thinking",
            chalkboardHeader: "HEDGING AT WARP SPEED"
          },
          {
            id: "step5",
            title: "Plugging in the DeepBook SDK",
            content: "are you a visual app developer? you can interact with DeepBook with zero headaches! by dropping the core DeepBook SDK inside your codebase, you can build full visual limits-dashboards, chart history indices, and trigger swaps with a single click in your app shell. yeti is extremely excited to see your custom exchange layouts! 🐻🎨",
            yetiMood: "proud",
            chalkboardHeader: "SDK INTEGRATIONS DIRECT"
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
          },
          {
            id: "q2",
            question: "Which of the following describes DeepBook V3 enhancements?",
            options: [
              "It enforces slower execution speeds for gas protection",
              "It integrates flashloans and highly automated limit order triggers",
              "It removes on-chain orderbooks completely",
              "It runs in external browser databases instead of on-chain"
            ],
            correctAnswerIndex: 1,
            explanation: "DeepBook V3 incorporates ultra-efficient order pipelines, offering instant flashloans and complex order structures matching professional web2 speed levels."
          }
        ]
      },
      {
        id: "protocols-kiosk",
        title: "Sui NFT Kiosk & Royalty Safeguards",
        description: "Uncover how Kiosk secures creator royalties and handles ownership permissions securely.",
        xpValue: 45,
        steps: [
          {
            id: "step1",
            title: "What is Kiosk?",
            content: "royalties are standard for artists, but on old chains, buyers could dodge them by transferring items in private channels. sui solves this with Kiosk! a kiosk is a shared commerce container on-chain. your NFTs reside inside your kiosk, and the move contract rules can enforce strict royalty fees during custom sales! this keeps creators protected and supported. 🐻👑",
            yetiMood: "proud",
            chalkboardHeader: "NFT KIOSK CONTAINERS"
          },
          {
            id: "step2",
            title: "Transfer Policies & Locked Envelopes",
            content: "when you trade an NFT inside a kiosk, the system utilizes a specialized rulebook called a 'TransferPolicy'. the item remains locked in a protective envelope until the matching transaction fulfills the required fees, signatures, or badges. this keeps sales entirely secure, with no trust required between strangers! 🛡️🍵",
            yetiMood: "chill",
            chalkboardHeader: "SECURE COMMERCE SHUTTERS"
          },
          {
            id: "step3",
            title: "Temporary Borrowing Capabilities",
            content: "what if you want to wear your sweet NFT hat in a game, but don't want to extract it from the protective Kiosk container? you use Move's borrow command! you can borrow the asset temporarily within a transaction execution, let the game read its attributes, and verify it returns to the Kiosk safely at the end of the transaction. no theft possible! 🛡️🎩",
            yetiMood: "thinking",
            chalkboardHeader: "SECURE OBJECT BORROWING"
          },
          {
            id: "step4",
            title: "Zero-Custody NFT Marketplaces",
            content: "on traditional blockchains, listing an NFT for sale forces you to transfer it out of your wallet to a marketplace smart contract. on Sui, your item stays in your own Kiosk! marketplaces just look at public listings. when a buyer fulfills the trade, the item transfers directly from your Kiosk to their Kiosk. zero middleman risk! 🤝🏔️",
            yetiMood: "proud",
            chalkboardHeader: "TRUSTLESS LISTINGS"
          },
          {
            id: "step5",
            title: "Bid Placement & Sealed Offers",
            content: "marketplace collectors don't have to wait for you to list items—they can place bids directly on any NFT inside your Kiosk! they seal their token bids inside an on-chain offer container. if you accept, the swap completes instantly. if you reject, they retrieve their SUI. keeping things extremely tidy and simple under the snow. 🐻💌",
            yetiMood: "excited",
            chalkboardHeader: "BIDDING CHANNELS"
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
          },
          {
            id: "q2",
            question: "What is the role of a TransferPolicy in the Sui Kiosk framework?",
            options: [
              "It controls how fast a web application reloads in browsers",
              "It defines and enforces rules (like royalites) that must be satisfied for an NFT to complete execution transfer",
              "It translates Move code to other standard languages",
              "It limits the number of wallets a user can open"
            ],
            correctAnswerIndex: 1,
            explanation: "TransferPolicies act as gates on the transaction path, ensuring royalties or state requirements are resolved before the asset shifts owner nodes."
          }
        ]
      },
      {
        id: "protocols-web3-mechanics",
        title: "How Web3 Works on Sui",
        description: "Explore cryptographic keypairs, peer RPC node drivers, consensus validation, and state records.",
        xpValue: 55,
        steps: [
          {
            id: "step1",
            title: "Cryptography: Public & Private Keypairs",
            content: "web3 runs on public-key cryptography. your public key is like a cozy mailbox address that anyone can see, search, or deposit tokens into. your private key, however, is the secret hand-held key that signs events and transactions! on sui, transactions use secure algorithms like Ed25519, establishing direct decentralized ownership without ever exposing your private credentials. never share your seed phrase! 🗝️🐻",
            yetiMood: "thinking",
            chalkboardHeader: "CRYPTOGRAPHIC VAULTS"
          },
          {
            id: "step2",
            title: "RPC Node infrastructure",
            content: "how does your web browser or wallet app read blockchain state or broadcast a transaction? via RPC (Remote Procedure Call) node providers! they host active ledgers to receive transaction requests, query the database, and sync the results immediately back to your browser client, maintaining high-speed lofi academy access under any peak load. 📡🍵",
            yetiMood: "chill",
            chalkboardHeader: "RPC CONNECTIVITY DIRECT"
          },
          {
            id: "step3",
            title: "Speed Drivers: Narwhal & Bullshark",
            content: "ordinary blockchains order all transactions in a single global line. sui separates data routing entirely! it utilizes Narwhal as a high-throughput transaction mempool, and Bullshark/Mysticeti as a rapid consensus driver. but wait—for simple peer-to-peer transfers, sui bypasses consensus entirely, updating state accounts instantly! ⚡🎮",
            yetiMood: "excited",
            chalkboardHeader: "SUI PARALLEL CONSENSUS"
          },
          {
            id: "step4",
            title: "Gas Budgeting and Safe Limits",
            content: "every transaction specifies a 'Gas Budget'—which is the absolute maximum MIST you are willing to spend. if your contract goes into an infinite loop or runs out of gas, the transaction is rejected, and the unused gas is safely returned to you! no extra draining and no unexpected losses here. 🌨️🐻",
            yetiMood: "proud",
            chalkboardHeader: "PROTECTIVE GAS BUDGETS"
          },
          {
            id: "step5",
            title: "Dry Runs & Simulation Safety",
            content: "scared of signing a transaction that robs your wallet? Sui has a built-in safety shield: Dry Runs! before a transaction is broadcast, your wallet performs a simulated run against a validator snapshot. it lists exactly what objects enter and exit your wallet, letting you see exactly what you are approving. yeti says: safety first in the cozy wood! 🐻🛡️",
            yetiMood: "chill",
            chalkboardHeader: "DRY-RUN SIMULATION SHIELD"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "What is the function of a private key in the Web3 paradigm?",
            options: [
              "To encrypt your profile background image",
              "To securely sign transaction instructions to prove authorized ownership",
              "To query third-party public rest APIs",
              "To store currency tokens locally on your physical processor chip"
            ],
            correctAnswerIndex: 1,
            explanation: "In public-key cryptography, the private key generates secure digital signatures to authenticate transaction blocks without revealing the underlying secret key."
          },
          {
            id: "q2",
            question: "How do client web browsers read data or send transactions to the Sui ledger?",
            options: [
              "By writing directly to raw system storage disks with absolute access",
              "By querying RPC (Remote Procedure Call) provider nodes",
              "By utilizing central banking wire transfer services",
              "By texting validators directly via phone lines"
            ],
            correctAnswerIndex: 1,
            explanation: "RPC nodes hold the current blockchain database state and offer standard APIs for wallets and frontends to retrieve transaction history, token balances, or broadcast new blocks."
          },
          {
            id: "q3",
            question: "What distinguishes Sui's Narwhal & Bullshark consensus approach from traditional blockchains?",
            options: [
              "It slows processing down for educational safety",
              "It divides memory mempools from state consensus, processing simple operations without global consensus",
              "It removes cryptography from smart contracts",
              "It forces all users to run local nodes on laptops"
            ],
            correctAnswerIndex: 1,
            explanation: "By structuring memory routing (Narwhal) independently from transaction execution agreements (Bullshark) and skipping global consensus entirely on single-owner objects, Sui achieves unparalleled speeds."
          },
          {
            id: "q4",
            question: "What occurs if a Sui transition runs out of gas during code execution?",
            options: [
              "The contract drops all validator stakes",
              "All wallets on the machine are locked",
              "The transaction fails, resets state modifications safely, and returns unused budget gas",
              "The network crashes immediately"
            ],
            correctAnswerIndex: 2,
            explanation: "If gas budget runs dry, the transaction state reverts safely to prevent corrupt records, and any unconsumed gas reserves are returned back."
          }
        ]
      },
      {
        id: "protocols-zklogin",
        title: "Sui zkLogin: Zero-Knowledge Web2 Credentials",
        description: "Connect to the blockchain using normal Google, Apple, or Twitch logins without active seeds.",
        xpValue: 45,
        steps: [
          {
            id: "step1",
            title: "Web3's Hardest Barrier",
            content: "traditionally, to enter the web3 realm, users had to write down 12 secret seed words, setup browser extensions, and worry about lose-keys panic. it was way too stressful for normal explorers. sui zkLogin solves this by letting you sign in with standard web2 services (like Google)! 🔑🐻",
            yetiMood: "chill",
            chalkboardHeader: "SEEDLESS EVOLUTION"
          },
          {
            id: "step2",
            title: "Zero-Knowledge Cryptography",
            content: "how remains secure without sharing password logs? Zero-Knowledge Proofs (ZKP)! zkLogin uses cryptographic proofs to link your web2 credential token (which proves who you are) directly with a newly generated on-chain address. the validator verifies the proof without ever seeing your profile data! super private! 🛡️🧪",
            yetiMood: "excited",
            chalkboardHeader: "ZERO-KNOWLEDGE VEIL"
          },
          {
            id: "step3",
            title: "Familiar Warm onboarding",
            content: "with zkLogin, dynamic gaming dApps and retail apps can onboard billions of mainstream users in seconds! newcomers feel cozy, and their keys are safely managed under high-grade math signatures. let's dance in the snow! 🐻💃",
            yetiMood: "proud",
            chalkboardHeader: "BILLION-USER INTERFACE"
          },
          {
            id: "step4",
            title: "The Magic of Private Salts",
            content: "if your web2 email maps directly to your on-chain address, couldn't a snooper look up your wallet by searching your email address? no! zkLogin uses a secret string called a 'Salt'. this random string ensures that no one can associate your email address with your public blockchain address without your authorized login. privacy is beautifully warm here! 🏔️🛡️",
            yetiMood: "thinking",
            chalkboardHeader: "THE SALT SHATTER"
          },
          {
            id: "step5",
            title: "Combining Web2 & Web3 Keys",
            content: "want the ultimate security configuration? you can combine a zkLogin key with a physical hardware wallet key inside a multi-signature wallet! to spend money, you'd need both a standard web2 Google login AND a click on your hardware ledger keys. yeti says: this is like having a double padlock on your cozy cabin door! 🏰❄️",
            yetiMood: "excited",
            chalkboardHeader: "MULTISIG CABIN DOOR"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "What is SUI zkLogin designed to solve?",
            options: [
              "Removing blockchain validators entirely from the network",
              "The friction of setting up traditional Web3 wallets by allowing standard logins (Google, Apple, etc.)",
              "Paying transaction costs using cash",
              "Hosting browser pages inside Discord bots"
            ],
            correctAnswerIndex: 1,
            explanation: "zkLogin eliminates seed-phrase onboarding complexities. Users log in with standard OAuth Web2 credentials to automatically configure safe cryptographic wallets."
          },
          {
            id: "q2",
            question: "Why doesn't zkLogin reveal your email/profile password to validators?",
            options: [
              "The validators don't care about safety",
              "It uses Zero-Knowledge (ZK) Proofs to authenticate validation without exposing raw private secrets to nodes",
              "The information is encrypted on paper",
              "It routes requests through local VPN servers"
            ],
            correctAnswerIndex: 1,
            explanation: "ZKP translates your identity token parameters into highly complex mathematical proofs that prove authorized access. Real logins remain totally private and invisible."
          }
        ]
      },
      {
        id: "protocols-ptb",
        title: "Programmable Transaction Blocks",
        description: "Learn how Sui chains multiple commands into single atomic executions.",
        xpValue: 60,
        steps: [
          {
            id: "step1",
            title: "What are Programmable Transaction Blocks?",
            content: "Welcome, tech architect! On older blockchains, executing multiple actions (like swapping a token, staking it, and wrapping the remainder) requires separate, sequential transactions. This wastes precious gas and invites dangerous latency. On Sui, you have a superpower: Programmable Transaction Blocks (PTBs)! A PTB allows you to chain up to 1024 unique commands into a single, atomic, and secure transaction execution! Either everything succeeds, or the entire block completely rolls back with zero side effects. 🐻🔗",
            yetiMood: "excited",
            chalkboardHeader: "COMPOSE THE FUTURE"
          },
          {
            id: "step2",
            title: "Input Commands & Output Piping",
            content: "How does a PTB work under the hood? It functions like a local computing execution pipeline! You can send input parameters, call smart contract functions, and pipe the output of one command directly as the input of the next command. For instance, you can call a swap function, match its output SUI object from the return payload, and immediately send it into a Lending Protocol pool's deposit function—all in the very same block, without any middleman scripts or complex wallet signatures! ⚡🧪",
            yetiMood: "thinking",
            chalkboardHeader: "PIPELINE ARGUMENT ROUTING"
          },
          {
            id: "step3",
            title: "Types of PTB Commands",
            content: "Within a single PTB, you can mix and match five native, highly optimized commands: MakeMoveVec (creating vectors of elements), MergeCoins (combining coin balances), SplitCoins (slicing precise coin portions), TransferObjects (sending owned entities to custom recipient addresses), and MoveCall (calling any on-chain move smart contract function). This allows you to perform batch transfers, multiple swaps, or complex minting campaigns in one breath! ❄️✨",
            yetiMood: "proud",
            chalkboardHeader: "PTB TOOLBOX COMMANDS"
          },
          {
            id: "step4",
            title: "The Ultimate UX Booster",
            content: "Why are developers crazy about PTBs? Because of the revolutionary User Experience (UX)! In typical DeFi apps, a user has to sign a transaction to 'Approve' a token limit, then sign another transaction to 'Deposit' the token, and yet another to 'Claim' their bonus. With Sui PTBs, you combine approvals, deposits, transfers, and claims into a single-click signature! This slashes gas costs up to 10x and provides a silky-smooth experience that feels like web2. 🥐🐻",
            yetiMood: "chill",
            chalkboardHeader: "SILK-LIKE SINGLE SIGNATURES"
          },
          {
            id: "step5",
            title: "Zero-Smart-Contract Composability",
            content: "normally, to combine distinct dApps together, you'd have to write, audit, and deploy a brand new smart contract linking them. with PTBs, you can do this dynamically on the client-side! you just write standard typescript code using the Sui SDK to stitch cetus, suilend, and deepbook together in real-time. yeti calls this zero-code integration magic! 🔮🐾",
            yetiMood: "proud",
            chalkboardHeader: "CLIENT-SIDE STITCHING"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "How many distinct operations can be chained into a single Sui Programmable Transaction Block (PTB)?",
            options: [
              "Only 1 operation",
              "A maximum of 10 operations",
              "Up to 1024 distinct transaction commands",
              "Unlimited actions without any gas cap"
            ],
            correctAnswerIndex: 2,
            explanation: "Sui supports chaining up to 1024 unique transaction operations cleanly in one atomic block, allowing unprecedented architectural complexity in a single signature execution."
          },
          {
            id: "q2",
            question: "What does atomic execution mean within the context of a Sui PTB?",
            options: [
              "Every command executes slowly to ensure node stability",
              "If even one command fails, the entire block of actions fails and rolls back, leaving no half-finished states",
              "Transactions are processed using nuclear quantum clock models",
              "It forces all user assets to be converted into gas coins"
            ],
            correctAnswerIndex: 1,
            explanation: "Atomicity guarantees that all commands in the PTB succeed or fail together as a single cohesive unit, entirely preventing partial execution security issues."
          },
          {
            id: "q3",
            question: "How can developers feed the output of one Move function into another function inside a PTB?",
            options: [
              "They must wait for the next transaction block and read the off-chain index",
              "They must write a temporary proxy smart contract every time",
              "They can directly pipe the output of one command as an argument into the next command inside the PTB",
              "By saving intermediate variables inside the browser's cookies first"
            ],
            correctAnswerIndex: 2,
            explanation: "PTBs support high-performance output piping, allowing the results of prior calls to serve directly as inputs for subsequent calls seamlessly."
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
          },
          {
            id: "step3",
            title: "Sui Ecosystem & Capy NFT Launch",
            content: "during early test phases, Mysten Labs launched 'Sui Capys'—cute interactive aquatic creatures that demonstrated the power of dynamic, composable objects! users could purchase clothing items, customize accessories, and breed new Capys directly. this proved that Sui NFTs are living objects, not static IPFS files! 🦫✨",
            yetiMood: "excited",
            chalkboardHeader: "CAPY NFT LIVING OBJECTS"
          },
          {
            id: "step4",
            title: "Global Ecosystem Partnerships",
            content: "as the core network matured, world-famous game builders (like NHN and Netmarble), financial innovators, and premium hardware creators began building on-chain products on Sui. these top-tier alliances proved that Sui has the speed, bandwidth, and lofi stability to support massive consumer scale without cracking any ice! 🎮🌨️",
            yetiMood: "chill",
            chalkboardHeader: "GLOBAL PARTNERSHIP SHIELDS"
          },
          {
            id: "step5",
            title: "Academic Cryptographic Foundations",
            content: "Sui wasn't just built on a developer whim. its consensus, object trees, and safety models undergo academic research peer-review by standard systems teams and cryptographers globally. this scientific rigor ensures the network shields your tokens so you can sleep cozy and sound in our winter cabin! 🔬🐻",
            yetiMood: "proud",
            chalkboardHeader: "ACADEMIC PEER REVIEWS"
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
          },
          {
            id: "q3",
            question: "What did the famous 'Sui Capys' demo prove about the network's data architecture?",
            options: [
              "That Sui only works for gaming",
              "That SUI objects are dynamic and composable, allowing on-chain items to be nested, mutated, and changed",
              "That transactions must remain slow",
              "That NFTs are stored inside email accounts"
            ],
            correctAnswerIndex: 1,
            explanation: "Sui Capys showcased Sui's dynamic parent-child object structures, proving that NFTs can be modified, dressed, or combined directly in standard Move contracts."
          }
        ]
      },
      {
        id: "history-future",
        title: "Sui 2.0 & Future Web3 Scalings",
        description: "The next phase of high-performance architecture, network expansion, and native integrations.",
        xpValue: 40,
        steps: [
          {
            id: "step1",
            title: "Mysticeti: Sub-300ms Consensus",
            content: "the tech team never stops coding! are sub-second speeds too slow? mysten labs introduced 'Mysticeti', a state-of-the-art consensus engine that slashes consensus latency down to under 300 milliseconds! it's literally the speed of thought. ⚡🏔️",
            yetiMood: "excited",
            chalkboardHeader: "BEYOND THE SPEED RECORD"
          },
          {
            id: "step2",
            title: "Pilot for Web3 Mass Adoption",
            content: "as we move forward, the focus is about seamless user experiences. combining zkLogin, gas sponsorship (where builders pay user fees), and parallel execution paves the way for standard apps to scale to millions. no hurdles, just pure lo-fi comfort! 🥐🐻",
            yetiMood: "chill",
            chalkboardHeader: "INVISIBLE BLOCKCHAIN FUTURE"
          },
          {
            id: "step3",
            title: "Walrus Protocol & Storage Era",
            content: "Sui's developers are launching 'Walrus Protocol'—a decentralized storage network for storing heavy assets like movie files, images, and audio directly on decentralized nodes. yes! completely decentralized videos and lo-fi beats, safe forever. 🐻🎹",
            yetiMood: "proud",
            chalkboardHeader: "WALRUS STORAGE LANDS"
          },
          {
            id: "step4",
            title: "SuiNS: Nice Digital Handles",
            content: "tired of looking at ugly keypair addresses like '0x49f2c...'? the Sui Name Service (SuiNS) replaces those cold computer strings with warm, friendly .sui domain handles! (like 'cozyyeti.sui'). this makes sending money or finding your social dashboard profiles simple and familiar! 🏷️🐻",
            yetiMood: "chill",
            chalkboardHeader: "COZY SUI NAME DOMAINS"
          },
          {
            id: "step5",
            title: "The Native Sui Bridge",
            content: "how do assets travel from other blockchains? Sui integrates its own secure, decentralized native 'Sui Bridge' connecting Ethereum directly to the Sui ledger! users can transport their stablecoins or ether cleanly between chains with sub-second speeds and ultra-low slippage overhead. are you ready to bridge? 🌉✨",
            yetiMood: "excited",
            chalkboardHeader: "UNIFYING BLOCKCHAIN BRIDGES"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "What performance enhancement does the Mysticeti consensus engine introduce?",
            options: [
              "It increases the gas rebate",
              "It slashes consensus consensus latency to sub-300ms levels",
              "It converts Move tokens into Bitcoin formats",
              "It deletes older block registries"
            ],
            correctAnswerIndex: 1,
            explanation: "Mysticeti drastically optimizes round trips, enabling validators to settle states much faster, maintaining records under 300ms."
          },
          {
            id: "q2",
            question: "What is Walrus Protocol designed to store?",
            options: [
              "Password seeds",
              "Heavy decentralized data media files, audio, and documents",
              "Only private user emails",
              "Leaderboard spreadsheet sheets"
            ],
            correctAnswerIndex: 1,
            explanation: "Walrus Protocol expands Sui's ecosystem with secure distributed storage nodes suited for hosting massive files, media, and images with full blockchain verification."
          }
        ]
      }
    ]
  },
  {
    id: "sui-move-coding",
    title: "Sui Move Coding",
    description: "Master modules, custom structures, functions, ability modifiers, and ownership rules in the Sui Move smart contract language.",
    iconName: "Award",
    difficulty: "Advanced",
    modules: [
      {
        id: "move-basics",
        title: "Anatomy of a Move Module",
        description: "Deep dive into module structure, imports, primitive structures, constraints, and initializers.",
        xpValue: 80,
        steps: [
          {
            id: "move-basic-step1",
            title: "Declaring Your Move Module",
            content: "hello, junior scribe! yeti is excited to start coding with you. grab a fresh coffee and take a look at the module declaration! every Move module starts with the 'module' keyword, followed by the package address (or its named alias) and the module name. this sets up a clean sandbox space where your code lives! 🐻📋",
            highlightCode: "module my_first_package::lofi_yeti_token {\n    // Your code definitions live here!\n}",
            yetiMood: "chill",
            chalkboardHeader: "THE MODULE SCOPE"
          },
          {
            id: "move-basic-step2",
            title: "Importing Core Libraries",
            content: "you don't have to build everything from scratch! Move uses the 'use' keyword to import structures and helpers from other modules. for example, to create a unique ID for your objects, you import 'UID' and 'TxContext' from the base Sui Framework module 'object' and 'tx_context'. simple and extremely lightweight! 📦❄️",
            highlightCode: "use sui::object::{Self, UID};\nuse sui::tx_context::{Self, TxContext};",
            yetiMood: "thinking",
            chalkboardHeader: "IMPORT STACKS"
          },
          {
            id: "move-basic-step3",
            title: "Defining Custom Structs",
            content: "in Sui Move, any custom data type or asset is defined using the 'struct' keyword. unlike traditional languages that let structures float in thin air, structs in Move must specify their abilities (permissions) and fields. let's build a struct representing a warm cup of Coffee! ☕🐻",
            highlightCode: "struct WarmCoffee has key, store {\n    id: UID,\n    temperature: u8,\n    caffeine_level: u64,\n}",
            yetiMood: "excited",
            chalkboardHeader: "CUSTOM STRUCTURES"
          },
          {
            id: "move-basic-step4",
            title: "Integers, Booleans, and Addresses",
            content: "Move doesn't support floating-point numbers! instead, we have standard strict integers: u8, u16, u32, u64, u128, and u256. you also have the normal boolean 'bool' (true or false), and unique Web3 'address' representations for users, validators, or packages. this keeps numerical execution completely safe! ❄️🔢",
            highlightCode: "let temperature: u8 = 75;\nlet is_tasty: bool = true;\nlet yeti_wallet: address = @0x123abc;",
            yetiMood: "chill",
            chalkboardHeader: "PRIMITIVE TYPES"
          },
          {
            id: "move-basic-step5",
            title: "Adding Code Constants",
            content: "in smart contracts, keeping rules strict is a rule of thumb. you can declare uppercase constants using the 'const' keyword. they are compiled directly inside module bytecode and are mostly used for custom, non-punishing error signals. yeti recommends always prefixing error codes with 'E'! 🐻🛡️",
            highlightCode: "const E_COFFEE_TOO_HOT: u64 = 1001;\nconst E_OUT_OF_CAFFEINE: u64 = 1002;",
            yetiMood: "thinking",
            chalkboardHeader: "CODE CONSTANTS"
          },
          {
            id: "move-basic-step6",
            title: "The Special init Function",
            content: "when you publish a package to the Sui blockchain, the network automatically executes a special, optional startup function named 'init' exactly once. it is used to mint native administrator badges, register treasury keys, or configure default initial supplies. are you ready to fire up your cabin? 🏰🌨️",
            highlightCode: "fun init(ctx: &mut TxContext) {\n    // Code executes automatically upon deployment only\n}",
            yetiMood: "proud",
            chalkboardHeader: "INITIALIZATION ROUTINE"
          },
          {
            id: "move-basic-step7",
            title: "Using the let Keyword",
            content: "inside functions, you define local local variables using the 'let' keyword. what is super cool? Move is strongly typed, but the compiler can automatically infer types so you don't always have to write them! expressions can also return values without writing explicit return keywords, simply by leaving out the trailing semicolon! 🐻✨",
            highlightCode: "let a = 10;\nlet b = 20;\na + b // This returns 30!",
            yetiMood: "excited",
            chalkboardHeader: "LOCAL EXPRESSIONS"
          },
          {
            id: "move-basic-step8",
            title: "Managing Vector Collections",
            content: "need to hold a dynamic list of items under the snow? Move uses 'vector' as the native dynamic array sequence! you can create vectors, push elements inside, pop them out, or borrow values on-chain safely. let's see how yeti tracks a snowpile of cups! ☃️☕",
            highlightCode: "use std::vector;\n\nlet cups = vector::empty<WarmCoffee>();\nvector::push_back(&mut cups, coffee);",
            yetiMood: "chill",
            chalkboardHeader: "VECTORS"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "How do you declare a new module in the Sui Move language?",
            options: [
              "By writing 'package moduleName'",
              "By using the keyword 'module' followed by package address and name",
              "By defining a javascript file with a module export",
              "By using 'pragma solidity'"
            ],
            correctAnswerIndex: 1,
            explanation: "All Move modules are defined inside named package boundaries using the 'module' keyword."
          },
          {
            id: "q2",
            question: "What is the purpose of the 'use' keyword in Move?",
            options: [
              "To make a transaction block public",
              "To import structures, types, or helpers from external dependencies",
              "To delete obsolete objects from memory",
              "To trigger high speed validator consensus"
            ],
            correctAnswerIndex: 1,
            explanation: "The 'use' keyword imports dependency namespaces to resolve types and helper functions at compile time."
          },
          {
            id: "q3",
            question: "Which of the following is NOT a native numerical primitive in Move?",
            options: [
              "u8",
              "u64",
              "float32",
              "u256"
            ],
            correctAnswerIndex: 2,
            explanation: "Move does not support floats (like float32/double) to ensure exact, deterministic mathematical operations across different CPU architectures on-chain."
          },
          {
            id: "q4",
            question: "When is the special startup 'init' function executed in Sui?",
            options: [
              "On every transaction request",
              "Exactly once automatically when the package is published on-chain",
              "Only when validators go offline for rebooting",
              "At the boundary of every single epoch"
            ],
            correctAnswerIndex: 1,
            explanation: "The 'init' function is executed exactly once by the Sui VM when the package is published, which makes it perfect for setting up initial capital rules or administrators."
          }
        ]
      },
      {
        id: "move-functions",
        title: "Functions, Abilities & Object Ownership",
        description: "Master visibility types, reference borrowing, struct capabilities (abilities), and native transfers.",
        xpValue: 100,
        steps: [
          {
            id: "move-func-step1",
            title: "Visibilities: Private, Public, & Entry",
            content: "functions in Move are private by default (only callable within the same module). use 'public' to allow other modules or packages to call them, and 'entry' to allow users to trigger them directly from a transaction Block! entry functions cannot return values, but public functions can. let's check it out under yeti's magnifying glass! 🐻🔍",
            highlightCode: "public fun brew_coffee(): WarmCoffee { ... }\npublic entry fun drink_coffee(coffee: WarmCoffee) { ... }",
            yetiMood: "chill",
            chalkboardHeader: "FUNCTION VISIBILITIES"
          },
          {
            id: "move-func-step2",
            title: "The Transaction Context Shield",
            content: "every smart contract transaction needs a sender. Move passes a special system-level reference called 'TxContext' as the final parameter to mutable functions. it tracks who initiated the transaction block, provides a unique pseudo-random hash generator for generating new UID objects, and keeps transaction details perfectly verified! 🛡️⚡",
            highlightCode: "use sui::tx_context::{Self, TxContext};\n// Passes &mut TxContext to verify senders",
            yetiMood: "thinking",
            chalkboardHeader: "TXCONTEXT HOOKS"
          },
          {
            id: "move-func-step3",
            title: "Immutable and Mutable References",
            content: "passing parameters by value transfers or consumes them completely. but what if you just want to read some data without taking ownership? you use 'References'! use '&' for an immutable read-only view, and '&mut' to let the function modify the internal properties. yeti keeps things beautifully synchronized! ⚖️🐻",
            highlightCode: "public fun read_temp(c: &WarmCoffee): u8 { c.temperature }\npublic fun heat_up(c: &mut WarmCoffee) { c.temperature = 90; }",
            yetiMood: "excited",
            chalkboardHeader: "REFERENCE BORROWING"
          },
          {
            id: "move-func-step4",
            title: "Abilities: Key and Store",
            content: "let's dive deeper into abilities! the 'key' ability allows a struct to be saved as a high-performance Sui Object. it MUST have a first field named exactly 'id: UID'. the 'store' ability allows that object to be nested inside other objects or transferred in programmatic transactions. this forms the block foundation of object ownership! 📦🔐",
            highlightCode: "struct Mug has key, store {\n    id: UID,\n    capacity: u64\n}",
            yetiMood: "chill",
            chalkboardHeader: "KEY & STORE"
          },
          {
            id: "move-func-step5",
            title: "Abilities: Copy and Drop",
            content: "need to duplicate a struct? use the 'copy' ability! need a struct to be discarded automatically at the end of a function scope without active manual deletion? use the 'drop' ability. wait! assets representing money, loans, or credentials will NEVER have copy or drop. this compile-level guard guarantees that nobody can vaporize or counterfeit items on-chain! ❄️🛡️",
            highlightCode: "struct Receipt has copy, drop {\n    serial_id: u32,\n    payment_amount: u64\n}",
            yetiMood: "thinking",
            chalkboardHeader: "COPY & DROP"
          },
          {
            id: "move-func-step6",
            title: "The Four Types of Ownership",
            content: "objects on Sui have distinct ownership rules! they can be: Address Owned (accessible only by the owner single key, e.g., your NFT), Parent-Child Nested (contained inside another object), Shared (callable or mutable by anyone simultaneously, e.g., AMMs), or Immutable (read-only forever, e.g., published code). yeti thinks this separation rules! 🗺️🐻",
            highlightCode: "// Address-owned, Parent-child, Shared, or Immutable\n// Determines who is allowed to sign transactions",
            yetiMood: "proud",
            chalkboardHeader: "OBJECT OWNERSHIP TYPES"
          },
          {
            id: "move-func-step7",
            title: "Sui's Native Transfer Functions",
            content: "moving objects around is incredibly fast because it's built directly into the Sui Framework! the 'sui::transfer' module allows you to 'transfer' an address-owned object, 'share_object' to make an object globally accessible, or make it 'public_freeze_object' for reading only. let's pass a sweet warm coffee to a friend! 🤝🥐",
            highlightCode: "use sui::transfer;\n\ntransfer::public_transfer(coffee, recipient_address);",
            yetiMood: "excited",
            chalkboardHeader: "ON-CHAIN TRANSFERS"
          },
          {
            id: "move-func-step8",
            title: "The Golden Rules of Move",
            content: "yeti is super proud of your progress! to write pristine, safe contracts: (1) check preconditions early with 'assert!', (2) keep state mutable strictly within required borders, and (3) always verify abilities before launching into production. you are now ready to compile real Move modules under the cozy sub-zero sky! 🌨️🎖️",
            highlightCode: "public entry fun brew(ctx: &mut TxContext) {\n    let new_mug = Mug {\n        id: object::new(ctx),\n        capacity: 250\n    };\n    transfer::transfer(new_mug, tx_context::sender(ctx));\n}",
            yetiMood: "proud",
            chalkboardHeader: "CRAFTING CONTRACTS"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "Which keyword allows a smart contract function to be directly invoked in program transaction blocks by users?",
            options: [
              "public",
              "private",
              "entry",
              "external"
            ],
            correctAnswerIndex: 2,
            explanation: "The 'entry' modifier indicates a function can be triggered as a starting execution point in an external transaction command."
          },
          {
            id: "q2",
            question: "What is the difference between passing '&WarmCoffee' versus '&mut WarmCoffee'?",
            options: [
              "& is mutable, whereas &mut is frozen",
              "& is for read-only immutable access, whereas &mut allows modifications",
              "& deletes the object, and &mut copies it",
              "There is no functional difference"
            ],
            correctAnswerIndex: 1,
            explanation: "Reference borrowing maintains high performance; '&' provides read-only views, while '&mut' provides read-and-write permissions."
          },
          {
            id: "q3",
            question: "Which ability modifier must a struct have to exist as a top-level standalone Sui Object?",
            options: [
              "drop",
              "copy",
              "key",
              "store"
            ],
            correctAnswerIndex: 2,
            explanation: "To serve as a standard Sui Object, a struct must have the 'key' ability, and its first field must be 'id: UID'."
          },
          {
            id: "q4",
            question: "How does 'sui::transfer' handle making a database object publicly queryable & writable by multiple parallel users?",
            options: [
              "By using transfer::transfer()",
              "By using transfer::share_object()",
              "By using transfer::public_freeze_object()",
              "It cannot be done; all objects are private"
            ],
            correctAnswerIndex: 1,
            explanation: "The 'transfer::share_object()' function turns an address-owned object into a shared global state, and anyone can then reference it."
          }
        ]
      }
    ]
  }
];
