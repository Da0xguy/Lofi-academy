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
  }
];
