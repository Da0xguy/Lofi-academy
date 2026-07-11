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
        videoUrl: "https://www.youtube.com/watch?v=D-Z9L1jL_tM",
        videoTitle: "Sui Blockchain Explained in 10 Minutes",
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
        videoUrl: "https://www.youtube.com/watch?v=3HuxrYlK5Yg",
        videoTitle: "Move programming language on Sui: Complete Guide for Beginners",
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
      },
      {
        id: "basics-parallel",
        title: "Parallel Transaction Execution",
        description: "How Sui moves beyond typical sequential block queue limits.",
        xpValue: 40,
        steps: [
          {
            id: "para1",
            title: "The Single Queue Problem",
            content: "on older blockchains like Ethereum, every single transaction must stand in one long, single-file line (mempool) to be processed sequential. if someone is buying a hyped NFT, your simple money transfer gets stuck behind them! why should unrelated trades block each other? they shouldn't! 🐻😤",
            yetiMood: "thinking",
            chalkboardHeader: "SEQUENTIAL BLOCKADES"
          },
          {
            id: "para2",
            title: "Sui's Multi-Lane Highway",
            content: "sui works like a massive multi-lane highway! if you are sending coffee money to your friend, and another user is buying a virtual hat, those transactions are completely independent. sui's nodes execute both transactions at the exact same time in parallel. no waiting, no queues! 🏎️❄️",
            yetiMood: "excited",
            chalkboardHeader: "PARALLEL LANES"
          },
          {
            id: "para3",
            title: "State Access Declarations",
            content: "how does the validator know which transactions are independent? thanks to Move's type structure, transactions declare exactly which objects they will read or write beforehand. if two transactions don't touch any of the same objects, they are automatically designated as independent and parallelism activates! 🛠️🐻",
            yetiMood: "chill",
            chalkboardHeader: "STATE COUPLING"
          },
          {
            id: "para4",
            title: "Multi-Engine Validation",
            content: "Sui validators don't just use one CPU core; they scale across multiple servers and CPU threads! as transaction volume spikes, validators simply add more cloud cores dynamically. this keeps gas fees cheap and fast even with massive traffic! 🖥️🏔️",
            yetiMood: "proud",
            chalkboardHeader: "DYNAMIC HARDWARE SCALE"
          },
          {
            id: "para5",
            title: "Bypassing Consensus",
            content: "what is the best part? for simple transactions (like direct peer-to-peer asset transfers), Sui completely bypasses the full agreement consensus phase! this is called 'fast-path validation', resulting in instant sub-300ms execution. yeti is in absolute awe! 🐻⚡",
            yetiMood: "excited",
            chalkboardHeader: "FAST-PATH AGREEMENT"
          }
        ],
        quiz: [
          {
            id: "pq1",
            question: "Why do independent transactions execute in parallel on Sui?",
            options: [
              "Because they do not touch the same on-chain objects",
              "Because they use different internet browsers",
              "Because validator fees are randomized",
              "Because they are written in JavaScript"
            ],
            correctAnswerIndex: 0,
            explanation: "Because independent transactions modify distinct objects, there is no risk of editing overlap, allowing them to execute in parallel safely."
          }
        ]
      },
      {
        id: "basics-objects-explained",
        title: "Sui Object Types & Metadata",
        description: "Explore owned, shared, immutable, and child objects on-chain.",
        xpValue: 45,
        steps: [
          {
            id: "obj1",
            title: "Object Identifiers (UIDs)",
            content: "every single object on Sui has its own permanent 32-byte cryptographic identifier called a 'UID'. this ID is generated randomly during structure creation, ensuring no two objects anywhere on the ledger can ever overwrite each other! 🐻🔑",
            yetiMood: "chill",
            chalkboardHeader: "UNIQUE ON-CHAIN ID"
          },
          {
            id: "obj2",
            title: "Owned Objects",
            content: "the most common category on Sui is 'Owned Objects'. these are registered directly to a user's wallet address. only the person holding the private keys to that wallet can sign transactions modifying, transferring, or deleting that specific object! 📦🏔️",
            yetiMood: "proud",
            chalkboardHeader: "ADDRESS OWNERSHIP COZY"
          },
          {
            id: "obj3",
            title: "Shared Objects",
            content: "what if we need a liquidity pool where hundreds of users swap coins at the same time? we make it a 'Shared Object'! anyone can read or mutate shared objects, but because of competing access, they require sequential validation consensus. 🌡️🐻",
            yetiMood: "thinking",
            chalkboardHeader: "SHARED HIGHWAYS"
          },
          {
            id: "obj4",
            title: "Immutable Objects",
            content: "once an object is frozen or marked immutable, it is permanently locked. nobody can ever change its data, transfer its ownership, or delete it! published smart contract pack bytecode is a perfect example of an immutable object, safe for eternity! ❄️🛡️",
            yetiMood: "excited",
            chalkboardHeader: "FROZEN STATUS"
          },
          {
            id: "obj5",
            title: "Dynamic Fields & Child Objects",
            content: "what if your Yeti object wants to carry an item, like a backpack? you can attach a child object directly inside a parent object as a 'Dynamic Field'! if you sell the parent, the child properties automatically migrate along. it's clean and extremely nested! 🎒🐻",
            yetiMood: "excited",
            chalkboardHeader: "DYNAMIC NESTING"
          }
        ],
        quiz: [
          {
            id: "oq1",
            question: "Which object type requires consensus coordination among validators to execute?",
            options: [
              "Immutable Objects",
              "Shared Objects",
              "Address Owned Objects",
              "Pruned Objects"
            ],
            correctAnswerIndex: 1,
            explanation: "Shared objects allow simultaneous concurrent access from multiple users, meaning validators must agree on the sequence order of modifications."
          }
        ]
      },
      {
        id: "basics-gas-fees",
        title: "Sui Gas Pricing & Gas Budgets",
        description: "How predictable fees protect users from on-chain surprises.",
        xpValue: 45,
        steps: [
          {
            id: "gas1",
            title: "Gas Unit Pricing",
            content: "smart contracts require processor power to execute. gas fees on Sui represent this cost. gas pricing on Sui is calculated by multiplying gas units consumed by the gas price per unit (measured in MIST). keeping it completely predictable! 🐻⛽",
            yetiMood: "chill",
            chalkboardHeader: "COMPUTATION ENERGY"
          },
          {
            id: "gas2",
            title: "Gas Price Surveys",
            content: "how is gas kept stable on Sui? at the start of every 24-hour epoch, validators complete a reference gas price survey. they commit to a reference price, and as long as they stick to it, they are rewarded. this keeps gas pricing stable all day! ⏰❄",
            yetiMood: "thinking",
            chalkboardHeader: "EPOCH GAS PRICING"
          },
          {
            id: "gas3",
            title: "The Gas Budget Safety",
            content: "whenever you sign a transaction, your wallet sends a hard limit called 'Gas Budget'. if the contract runs into errors or complex paths requiring more gas than your budget, the transaction safely aborts and returns the unused portion! 🛡️🐻",
            yetiMood: "proud",
            chalkboardHeader: "BUDGET OVERFLOW PROTECTION"
          },
          {
            id: "gas4",
            title: "Sponsored Transactions",
            content: "Imagine playing a game or using an app where you don't even need to hold SUI tokens to pay for gas! on Sui, developers can choose to 'Sponsor' the gas fees of their users. the app pays the validator quietly behind the scenes, making onboarding flawless! 🎁🏔️",
            yetiMood: "excited",
            chalkboardHeader: "INVISIBLE USER GATES"
          },
          {
            id: "gas5",
            title: "Storage Gas Deposit",
            content: "every transaction includes a tiny deposit to cover the cost of hosting physical bytes on validators' SSD drives. as we discussed before, if you delete the object, this deposit is returned to you. it is the industry's first on-chain recycling refund! 🌌🐻",
            yetiMood: "proud",
            chalkboardHeader: "REFUND RESERVES"
          }
        ],
        quiz: [
          {
            id: "gq1",
            question: "What does Gas Sponsorship enable?",
            options: [
              "It imports assets from other networks",
              "It allows developers to pay the gas fees on behalf of their users",
              "It forces users to buy more tokens",
              "It turns off the blockchain consensus"
            ],
            correctAnswerIndex: 1,
            explanation: "Gas sponsorship allows an external address to pay transaction gas fees, offering a completely frictionless Web2-like user onboarding flow."
          }
        ]
      },
      {
        id: "basics-general-quiz",
        title: "General Sui Basics Quiz",
        description: "The ultimate cozy final assessment covering all fundamental Sui blockchain concepts.",
        xpValue: 150,
        isGeneralQuiz: true,
        requiredXp: 250,
        steps: [
          {
            id: "gqs1",
            title: "The Grand Basics Review",
            content: "welcome back explorer! you have traveled through the snowy paths of Sui Basics. you've mastered the parallel highway, looked inside secure Move objects, understood staking epoch transitions, and managed gas budgets. now, yeti has prepared a comprehensive general quiz to crown your basics journey! get a warm hot chocolate and let's go! 🐻🍫🏔️",
            yetiMood: "excited",
            chalkboardHeader: "THE GRAND REVIEW"
          },
          {
            id: "gqs2",
            title: "Quiz Rules & High-XP Crown",
            content: "this final general quiz gathers questions from all six modules. because of its breadth, passing this module will grant you a whopping 150 XP completion bonus! stay frosty, think of Yeti's lessons, and prove your master developer title under the winter sky.",
            yetiMood: "proud",
            chalkboardHeader: "CROWN OF COZY BASICS"
          }
        ],
        quiz: [
          {
            id: "gq_q1",
            question: "Sui's high performance and sub-second latency is primarily achieved by:",
            options: [
              "Processing independent transactions in parallel",
              "Storing all records in a single sequential MySQL database",
              "Halving the block reward every twelve hours",
              "Relying on off-chain web2 proxy servers"
            ],
            correctAnswerIndex: 0,
            explanation: "Sui's parallel execution engine identifies independent transactions and runs them simultaneously, achieving massive throughput without sequential block queues."
          },
          {
            id: "gq_q2",
            question: "In Sui Move, which structural 'Ability' is intentionally omitted from financial resources to prevent duplication?",
            options: [
              "key",
              "store",
              "copy",
              "drop"
            ],
            correctAnswerIndex: 2,
            explanation: "The 'copy' ability is omitted from coin or vault structs to prevent duplication or counterfeiting, ensuring strict resource safety rules are checked by the compiler bytecode verifier."
          },
          {
            id: "gq_q3",
            question: "When you delegate SUI coins to a validator, at what point do delegation or unstaking actions take effect on-chain?",
            options: [
              "At the boundary of an epoch (roughly every 24 hours)",
              "Immediately with sub-second finality",
              "Only when the validator restarts their node server",
              "At the end of the calendar month"
            ],
            correctAnswerIndex: 0,
            explanation: "Validator stake delegation parameters and unstaking operations settle at the turn of an epoch, which marks a coordinated 24-hour cycle of node states."
          },
          {
            id: "gq_q4",
            question: "How does a transaction declare to the Sui parallelizer that it is independent of other transactions?",
            options: [
              "By declaring which on-chain Objects it will read or write beforehand",
              "By sending a different type of gas currency",
              "By attaching a high-priority tip amount",
              "By running on a higher-latency server core"
            ],
            correctAnswerIndex: 0,
            explanation: "Move transactions state access declarations (the exact objects accessed) let Sui validators know which transactions are unrelated and can safely run in parallel."
          },
          {
            id: "gq_q5",
            question: "Which Sui Object type allows multiple users to concurrently modify its internal fields, but requires full consensus sequencing?",
            options: [
              "Immutable Objects",
              "Shared Objects",
              "Address Owned Objects",
              "Dynamic Field Children"
            ],
            correctAnswerIndex: 1,
            explanation: "Shared Objects are accessible by anyone, which means validator consensus sequencing is required to safely order competing modifications."
          },
          {
            id: "gq_q6",
            question: "What happens to the on-chain storage deposit if you delete an obsolete or expired object from the Sui network?",
            options: [
              "It is locked in the validator pool forever",
              "You receive a partial storage rebate refund",
              "The network deletes your wallet",
              "The object remains on-chain as a dummy pointer"
            ],
            correctAnswerIndex: 1,
            explanation: "Sui encourages state minimization by giving users and developers partial storage rebates when they prune and delete long-lived, expired objects."
          },
          {
            id: "gq_q7",
            question: "Which of the following describes the core safety promise of Programmable Transaction Blocks (PTBs) on Sui?",
            options: [
              "They allow executing a series of commands atomically, reverting all changes if any single command fails",
              "They require each command to be signed and submitted on a separate epoch",
              "They double the transaction fees for security",
              "They run strictly on the user's browser without validator consensus"
            ],
            correctAnswerIndex: 0,
            explanation: "Programmable Transaction Blocks (PTBs) allow chaining up to 1,024 commands in a single transaction, executing atomically—either all succeed, or all revert, maintaining absolute state safety."
          },
          {
            id: "gq_q8",
            question: "In the Sui Move object-centric model, what is the key difference between address-owned objects and shared objects?",
            options: [
              "Address-owned objects require a full BFT consensus protocol for simple transactions",
              "Address-owned objects bypass full consensus and execute via fast-path, while shared objects require consensus",
              "Shared objects can only be accessed by validators",
              "Address-owned objects cannot be deleted to receive storage rebates"
            ],
            correctAnswerIndex: 1,
            explanation: "Transactions involving only address-owned objects bypass full consensus via fast-path execution, enabling sub-second finality, whereas shared objects require consensus to safely sequence concurrent writes."
          },
          {
            id: "gq_q9",
            question: "Which feature of Sui Move allows developers to dynamically attach auxiliary fields or children to an existing parent object at runtime?",
            options: [
              "Dynamic Fields",
              "Vector Arrays",
              "Hardcoded Struct Pointers",
              "Immutable Epoch Registry"
            ],
            correctAnswerIndex: 0,
            explanation: "Dynamic Fields and Dynamic Object Fields allow dynamically attaching child objects to parent objects at runtime on Sui, enabling scalable on-chain collections and gaming inventories."
          },
          {
            id: "gq_q10",
            question: "What unit of denomination is used to pay for gas fees on Sui, where 1 SUI is equivalent to 1,000,000,000 of this unit?",
            options: [
              "Gwei",
              "MIST",
              "Satoshi",
              "Yeti"
            ],
            correctAnswerIndex: 1,
            explanation: "MIST is the smallest unit of gas currency on Sui. 1 SUI is exactly equal to 1,000,000,000 (1 billion) MIST."
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
      },
      {
        id: "defi-derivatives",
        title: "Perpetuals & Synthetic Assets",
        description: "How leverage and trading markets operate on high-speed Sui infrastructure.",
        xpValue: 50,
        steps: [
          {
            id: "deriv1",
            title: "What are Perpetual Swaps?",
            content: "Welcome, risk navigator! Unlike standard spot swaps where you buy and hold the physical coin, Perpetual Swaps (Perps) let you trade are mock-contracts bound to the price of an asset. this allows you to go 'Long' (profit when prices rise) or 'Short' (profit when prices drop) with leverage up to 50x! 📈🐻",
            yetiMood: "thinking",
            chalkboardHeader: "THE TRADING FUTURES"
          },
          {
            id: "deriv2",
            title: "Margin & Leverage Systems",
            content: "leverage is a powerful double-edged sword. you deposit a small amount of 'Margin' collateral, and borrow the rest to trade larger positions. if the market goes against your prediction and your collateral falls below maintenance margins, the position faces instant liquidation under the snow! ⚖️❄️",
            yetiMood: "thinking",
            chalkboardHeader: "LEVERAGE LIMITS"
          },
          {
            id: "deriv3",
            title: "Funding Rate Equilibrium",
            content: "how do perpetual contract prices stay tied to actual index prices? via the 'Funding Rate'! if too many traders are open-long, longs pay shorts a hourly fee. if too many are short, shorts pay longs. this continuous balancing fee shifts traders back to real-world averages automatically! ⏱️🐻",
            yetiMood: "chill",
            chalkboardHeader: "FUNDING RATE CRUCIBLE"
          },
          {
            id: "deriv4",
            title: "Decentralized Perpetuals DEXs",
            content: "on Sui, high-performance perpetual platforms (like Bluefin and Kriya) offer instant trading that feels like a centralized trading desk, yet is entirely non-custodial and secure. sub-second execution speeds make front-running bots irrelevant! ⚡🏔",
            yetiMood: "excited",
            chalkboardHeader: "BLUEFIN SPEED RUN"
          },
          {
            id: "deriv5",
            title: "Synthetic Asset Creation",
            content: "what if you want to trade Google stocks or silver on-chain? synthetic protocols wrap these real-world prices inside move collateral buckets! you lock SUI as backing, and mint synthetic dollars or commodities that mimic the price index perfectly. yeti claims this unlocks global financial access! 🎁✨",
            yetiMood: "proud",
            chalkboardHeader: "SYNTHETIC WRAPPING"
          }
        ],
        quiz: [
          {
            id: "dq1",
            question: "How do Perpetual Swaps differ from Spot swaps?",
            options: [
              "Spot swaps involve custody of the actual asset, whereas Perps allow long/short betting with leverage on price differences",
              "Perps are illegal on blockchain networks",
              "Spot swaps require email verification keys",
              "Perps do not use blockchain technology"
            ],
            correctAnswerIndex: 0,
            explanation: "Spot swaps immediately transfer ownership of the actual tokens. Perps are contract positions that settle collateral balances based on price indices."
          }
        ]
      },
      {
        id: "defi-aggregators",
        title: "Liquidity & Yield Aggregators",
        description: "How routing layers secure the absolute best interest and swap rates.",
        xpValue: 45,
        steps: [
          {
            id: "agg1",
            title: "The Fragmented Liquidity Problem",
            content: "as an ecosystem matures, capital spreads out across different DEX pools (Cetus, Turbos, Kriya, etc.). if you execute a massive swap on a single DEX, the slippage can eat your profits alive! we need a way to combine everything into one visual channel. 🐻🗂",
            yetiMood: "thinking",
            chalkboardHeader: "LP SPLITTING DEBACLES"
          },
          {
            id: "agg2",
            title: "Enter Route Optimizers",
            content: "dex aggregators (like 7K and Hop) act as the ecosystem's ultimate compass! they read the depth of every swap pool on Sui simultaneously, and automatically split your single trade across multiple systems to give you the absolute lowest slippage and maximum return! 🗺️🐻",
            yetiMood: "excited",
            chalkboardHeader: "SMART MULTI-HOP PATHS"
          },
          {
            id: "agg3",
            title: "Yield Optimizers & Vaults",
            content: "what about passive lenders? instead of manually searching which lending pool (Navi, Suilend, Scallop) pays the highest APY every hour, Yield Aggregators do it for you! you deposit to a single vault, and smart routers automatically move your tokens to the best-yielding pool under the ice. 📈❄",
            yetiMood: "chill",
            chalkboardHeader: "AUTO-COMPOUNDING HOVER"
          },
          {
            id: "agg4",
            title: "Auto-Reinvesting Harvests",
            content: "normally, to compound your LP rewards, you'd have to physically claim reward tokens, swap them to pool ratios, and re-add liquidity. yield vaults execute this sequence automatically several times a day in single-click transaction batches, driving compounding yields to the maximum level! 🐻⏳",
            yetiMood: "proud",
            chalkboardHeader: "HARVEST STRATAGEM"
          },
          {
            id: "agg5",
            title: "Security & Router Exploits",
            content: "aggregating code introduces another layer of smart contract risk. if an underlying pool has an error, the aggregator's vaults are affected as well. yeti safety rule: always verify that your favorite aggregators are thoroughly audited and battle-tested! 🧱🛡",
            yetiMood: "thinking",
            chalkboardHeader: "RISK EXPOSURE"
          }
        ],
        quiz: [
          {
            id: "aq1",
            question: "What is the primary benefit of a DEX Aggregator?",
            options: [
              "It automatically splits order routing across multiple swap pools to minimize slippage",
              "It makes blockchain transactions private",
              "It stores user data on local drives",
              "It allows users to print money out of thin air"
            ],
            correctAnswerIndex: 0,
            explanation: "Aggregators survey entire network liquidity charts, mapping multi-pool splits to preserve maximum token values for swap users."
          }
        ]
      },
      {
        id: "defi-oracles",
        title: "DeFi Oracles & Pricing Feeds",
        description: "How on-chain protocols query true off-chain market prices.",
        xpValue: 45,
        steps: [
          {
            id: "orc1",
            title: "The Block Sandbox Barrier",
            content: "blockchain smart contracts are completely isolated from the open internet—they can't do Google searches or make API requests on their own! if a lending contract needs to know the exact price of SUI in US dollars, how does it find it? it needs an Oracle! 🐻🏗",
            yetiMood: "thinking",
            chalkboardHeader: "COZY ISOLATION GATE"
          },
          {
            id: "orc2",
            title: "Oracle Network Publishers",
            content: "decentralized Oracles (like Pyth and Redstone) use a web of professional data publishers (like financial exchanges and institutions) who continuously sign and submit real-time crypto index updates directly to the blockchain. keeping it completely decentralized! 📡🏂",
            yetiMood: "chill",
            chalkboardHeader: "PUBLICATION WEBS"
          },
          {
            id: "orc3",
            title: "Pyth VAA Pricing Model",
            content: "Pyth utilizes an innovative 'On-Demand pull' design. instead of wasting infinite gas sending data to the chain every second, prices are published off-chain. when a trader initiates a swap, Pyth pulls the latest verified pricing certificate and drops it inside the same transaction block! ⚡🐻",
            yetiMood: "excited",
            chalkboardHeader: "PULL-MODEL ORACLES"
          },
          {
            id: "orc4",
            title: "Oracle Manipulation & Shields",
            content: "what if a sneaky whale attempts to manipulate the spot price on one tiny exchange to trigger false liquidations? Oracles protect against this by using Median Pricing algorithms! they ignore extreme price deviations, keeping our loan thresholds perfectly secure and warm. 🛡️🏔️",
            yetiMood: "proud",
            chalkboardHeader: "MEDIAN OUTLIER PROTECTION"
          },
          {
            id: "orc5",
            title: "Multi-Oracle Assemblies",
            content: "for million-dollar vaults, relying on a single oracle setup is a single point of failure risk. top-tier protocols aggregate multiple distinct oracle networks (e.g. Pyth + Chainlink) to provide foolproof redemptive pricing guarantees. yeti sleeps beautifully with dual security locks! 🌌🐻",
            yetiMood: "proud",
            chalkboardHeader: "AGGREGATED SENSOR WEB"
          }
        ],
        quiz: [
          {
            id: "oq1",
            question: "Why do smart contracts need Oracle systems?",
            options: [
              "They do not natively have access to real-time off-chain data or price feeds",
              "To create standard web2 logins",
              "To reduce on-chain block sizes",
              "To replace smart contract developers"
            ],
            correctAnswerIndex: 0,
            explanation: "Blockchains run in deterministic sandboxes. Oracle feeds bridge off-chain asset indices into on-chain Move contracts safely."
          }
        ]
      },
      {
        id: "defi-general-quiz",
        title: "General DeFi on Sui Quiz",
        description: "The ultimate cozy final assessment covering all decentralized finance concepts on Sui.",
        xpValue: 180,
        isGeneralQuiz: true,
        requiredXp: 350,
        steps: [
          {
            id: "dgqs1",
            title: "Grand DeFi Review",
            content: "welcome back, finance pioneer! you have climbed the snowy mountains of Sui DeFi. you've unlocked liquidity pools, lending vaults, staking systems, and oracle price feeds. now, yeti has prepared a comprehensive general quiz to crown your DeFi journey! grab a cozy hot beverage and let's go! 🐻☕📈",
            yetiMood: "excited",
            chalkboardHeader: "THE GRAND DEFI REVIEW"
          }
        ],
        quiz: [
          {
            id: "dgq_q1",
            question: "What is the standard mathematical formula used by Constant Product AMMs like Cetus?",
            options: [
              "x + y = k",
              "x * y = k",
              "x^2 + y^2 = k",
              "x / y = k"
            ],
            correctAnswerIndex: 1,
            explanation: "Constant Product Market Maker protocols use the formula x * y = k, keeping the product of reserve balances constant to determine exchange rates."
          },
          {
            id: "dgq_q2",
            question: "What is 'slippage' in a decentralized exchange swap?",
            options: [
              "The latency of network nodes",
              "The price difference between transaction submission and block execution",
              "The refund returned to a liquidity provider",
              "The fee paid to validators during high traffic"
            ],
            correctAnswerIndex: 1,
            explanation: "Slippage occurs when the execution price of a swap deviates from the price seen when the user first submitted the transaction, usually due to concurrent pool activity."
          },
          {
            id: "dgq_q3",
            question: "What is the primary benefit of Concentrated Liquidity (CLMM) over traditional AMMs?",
            options: [
              "It spreads liquidity evenly between zero and infinity",
              "It allows liquidity providers to allocate capital within specific custom price ranges, boosting fee efficiency",
              "It completely eliminates the possibility of smart contract bugs",
              "It guarantees gas fees are always free"
            ],
            correctAnswerIndex: 1,
            explanation: "Concentrated Liquidity (CLMM) allows providers to deploy capital within a targeted price range, generating much higher fee yield and reducing trading slippage."
          },
          {
            id: "dgq_q4",
            question: "Impermanent loss primarily affects which group of DeFi participants?",
            options: [
              "Token Swappers",
              "Liquidity Providers (LPs) in AMM pools",
              "Stakers delegating to validators",
              "Borrowers in lending vaults"
            ],
            correctAnswerIndex: 1,
            explanation: "Impermanent Loss occurs for Liquidity Providers when the ratio of pooled tokens shifts dramatically compared to simply holding them in a private wallet."
          },
          {
            id: "dgq_q5",
            question: "How does a Smart Order Router help traders achieve the best swap rate?",
            options: [
              "By splitting or routing swaps through multiple pools automatically in a single atomic transaction",
              "By deleting high-gas transactions automatically",
              "By borrowing tokens from a validator",
              "By delaying the trade until prices go down"
            ],
            correctAnswerIndex: 0,
            explanation: "A Smart Order Router finds the optimal path across various liquidity pools, splitting or chaining trades to minimize slippage and maximize output."
          },
          {
            id: "dgq_q6",
            question: "In overcollateralized lending protocols, why must users deposit more value than they borrow?",
            options: [
              "To pay for hidden validator bonuses",
              "To secure the protocol against market volatility and prevent bad debt",
              "To register their wallet address on-chain",
              "To staking for validators in the epoch"
            ],
            correctAnswerIndex: 1,
            explanation: "Overcollateralization ensures that if the collateral value drops, the loan remains backed by physical on-chain assets, protecting lenders from defaults."
          },
          {
            id: "dgq_q7",
            question: "What happens when a borrower's Health Factor drops below the liquidation threshold?",
            options: [
              "The protocol sends them a direct email warning",
              "A portion of their collateral is liquidated by third-party searchers to pay off the debt",
              "Their wallet is blacklisted from the blockchain",
              "The borrow interest rate drops to zero"
            ],
            correctAnswerIndex: 1,
            explanation: "If a loan's Health Factor falls below 1.0, third-party liquidators can buy the user's collateral at a discount to repay the outstanding debt, securing the protocol."
          },
          {
            id: "dgq_q8",
            question: "What are Liquid Staking Tokens (LSTs) like afSUI or haSUI?",
            options: [
              "Tokens that represent delegated SUI and accumulate staking rewards, but remain liquid and tradable in DeFi",
              "Tokens that can only be spent in the metaverse",
              "Tokens that have zero transaction fees",
              "Tokens that are backed by physical gold bars"
            ],
            correctAnswerIndex: 0,
            explanation: "Liquid Staking Tokens represent staked SUI, allowing users to earn validator yield while keeping a liquid token to trade, swap, or deposit in DeFi."
          },
          {
            id: "dgq_q9",
            question: "What unique property ensures that a 'Flash Loan' is completely risk-free for lending protocols?",
            options: [
              "It is limited to a maximum of 10 SUI",
              "The entire transaction block reverts if the borrower does not pay back the loan in the same execution thread",
              "Validators guarantee the repayment out of the storage fund",
              "It requires a high-priority multi-sig approval"
            ],
            correctAnswerIndex: 1,
            explanation: "Flash loans are atomic; if the borrowing contract does not repay the capital plus fees within the same transaction block, the entire execution reverts, as if the loan never happened."
          },
          {
            id: "dgq_q10",
            question: "What describes Pyth's On-Demand 'Pull-Model' Oracle architecture?",
            options: [
              "It pushes prices to the blockchain every second regardless of activity",
              "Traders pull verified off-chain pricing certificates and submit them directly inside their transaction block when needed",
              "It requires manual daily updates by validators",
              "It queries the prices using off-chain Google Chrome extensions"
            ],
            correctAnswerIndex: 1,
            explanation: "Pyth's Pull-Model allows users to fetch verified off-chain prices and append them directly to their transactions, eliminating unnecessary periodic gas fees."
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
      },
      {
        id: "protocols-multisig",
        title: "Sui Multi-Signature Accounts",
        description: "How shared cryptography secures collective assets and multi-user accounts.",
        xpValue: 50,
        steps: [
          {
            id: "multi1",
            title: "What is a Multi-Signature Address?",
            content: "Welcome, team security leader! On chains, standard accounts are controlled by one single private key. if that key leaks, your assets vanish! a Multi-Signature (Multisig) account combines multiple distinct public keys into one single deposit address. to sign any transaction, several owners must approve it together under the snow! 🗝️👥",
            yetiMood: "proud",
            chalkboardHeader: "COLLECTIVE PRIVATE Vaults"
          },
          {
            id: "multi2",
            title: "Configuring Weight & Thresholds",
            content: "multisigs are extremely flexible. each individual key is assigned a custom approval 'Weight' (e.g. 1 point each). you then declare a minimum 'Threshold' (e.g. 2 points total) required to execute transactions. a setup with 3 owners and a threshold of 2 ensures that even if one key gets lost, you can still access deposits! ⚖️🛡️",
            yetiMood: "thinking",
            chalkboardHeader: "QUORUM WEIGHT INDEX"
          },
          {
            id: "multi3",
            title: "Corporate Treasury Pipelines",
            content: "for commercial web3 protocols, maintaining project treasuries on a single developer's key is a recipe for disaster. multisigs act as a strict corporate shield. any funding release, upgrade, or parameters shift must be verified and signed by team leaders in a fully transparent on-chain manner! 🏔️🏦",
            yetiMood: "chill",
            chalkboardHeader: "MANAGED CORPORATE TREASURY"
          },
          {
            id: "multi4",
            title: "Native On-Chain Combining",
            content: "Sui has native built-in support for multisig serialization. instead of running complex off-chain calculation bridges, Sui validators parse multisig schemas directly! they check each sub-signature's weight and verify threshold fulfillment instantly with absolute performance! 🌩️🐻",
            yetiMood: "excited",
            chalkboardHeader: "NATIVE COMPILER PARSING"
          },
          {
            id: "multi5",
            title: "Cozy Multisig Security Tips",
            content: "yeti advises: (1) never store multisig keys on the same physical server, (2) keep individual backup words safe across separate geographical coordinates, and (3) always perform a tiny trial transaction before sending heavy balances. sleep warm and stay locked! ☃️🏰",
            yetiMood: "proud",
            chalkboardHeader: "THE TRIPLE LOCK CADENCE"
          }
        ],
        quiz: [
          {
            id: "mq1",
            question: "What is a signature Threshold in a Multisig wallet?",
            options: [
              "The maximum gas budget allowed for executing transactions",
              "The minimum sum of key weights required to authorize a transaction",
              "The number of users currently reading the profile",
              "A validator physical server coordinate limit"
            ],
            correctAnswerIndex: 1,
            explanation: "To execute any action, the combined weight of the signing keys must meet or exceed the predefined mathematical threshold limit."
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
      },
      {
        id: "history-founders",
        title: "The Pioneers of Move at Meta",
        description: "How Diem and Move were created and transferred to open source engines.",
        xpValue: 45,
        steps: [
          {
            id: "found1",
            title: "The Libra/Diem Project",
            content: "In 2019, Meta (formerly Facebook) unveiled an ambitious project called Libra to build a global digital currency. To power this, they needed a completely new type of programming language that treated assets as absolute resource. They called it 'Move'! 🐻📖",
            yetiMood: "thinking",
            chalkboardHeader: "THE GENESIS OF LIQUID COINS"
          },
          {
            id: "found2",
            title: "Designing Move Language",
            content: "Sam Blackshear and other Meta cryptographers noticed that traditional smart contract languages had structural flaws that allowed easy hacks (like double spending). They designed Move to have bytecode verification preventing these flaws completely at compilation time! 🛡️❄",
            yetiMood: "proud",
            chalkboardHeader: "SAFETY BY DECREE"
          },
          {
            id: "found3",
            title: "Diem's Retraction & Open Source",
            content: "Due to political and regulatory pushback globally, Meta decided to wind down the Diem project. But the technology was too premium to hide away! The core developers open-sourced Move, setting up foundation models for others to build upon. 🏛️🐻",
            yetiMood: "chill",
            chalkboardHeader: "UNSHACKLING THE Move"
          },
          {
            id: "found4",
            title: "The Spawning of Mysten Labs",
            content: "In 2021, Diem's top architects formed Mysten Labs. Their vision was to build an entirely new L1 network around Move, but optimized with an object-oriented paradigm. This dream was named Sui, representing liquid, flowing simplicity! 🌌🏃‍♂️",
            yetiMood: "excited",
            chalkboardHeader: "A FRESH OBJECT PATHWAYS"
          },
          {
            id: "found5",
            title: "Sui's Unique Object Shift",
            content: "While standard Move stores code inside global addresses, Mysten Labs rewritten Sui Move to store values in independent objects. This crucial design change unlocked parallel transaction capabilities, paving the way for millions of transactions! ⚡🐻",
            yetiMood: "proud",
            chalkboardHeader: "THE OBJECT BREAKTHROUGH"
          }
        ],
        quiz: [
          {
            id: "fq1",
            question: "Where was the Move language originally invented before Mysten Labs was formed?",
            options: [
              "Inside Meta's Diem/Libra blockchain research team",
              "At a cryptography division inside Ethereum",
              "In a university physics department",
              "In an retro arcade game shop"
            ],
            correctAnswerIndex: 0,
            explanation: "Meta created Diem and designed Move as a premium, secure asset-focused programming language before developers spun out into Mysten Labs."
          }
        ]
      },
      {
        id: "history-capy-breakout",
        title: "Sui Capys & Composable NFTs",
        description: "The viral Testnet game that proved Move's object-centric capabilities.",
        xpValue: 50,
        steps: [
          {
            id: "capy1",
            title: "Testnet Launch Phenomenon",
            content: "In late 2022, during Sui's Testnet, Mysten Labs launched 'Sui Capys'. It wasn't just a simple collector game—it was a deep mechanical showcase demonstrating that SUI tokens and NFTs are living, breathing object structures! 🐻✨",
            yetiMood: "excited",
            chalkboardHeader: "COZY CAPY BREEDING"
          },
          {
            id: "capy2",
            title: "Dynamic Attaching & Accessories",
            content: "Traditional NFTs are static, flat image files stored on centralized servers. With Sui Capys, users could breed Capys, buy clothing items (such as a lofi scarf), and attach them directly as child objects under the parent Capy! The scarf is owned by the Capy itself! 🧣🦫",
            yetiMood: "chill",
            chalkboardHeader: "PARENT-CHILD NESTING COZY"
          },
          {
            id: "capy3",
            title: "Bidding & Social Commerce",
            content: "Capys spawned a massive community market. Buyers placed offers on nested Capys directly, trading complex bundles (like a Capy with 3 accessories and matching traits) in single atomic blocks on-chain with no marketplace intermediator holding custody! 🛍️❄",
            yetiMood: "thinking",
            chalkboardHeader: "BIDS DIRECT FOR ITEMS"
          },
          {
            id: "capy4",
            title: "Breeding Genetics Code",
            content: "Breeding two Capys combined their cryptographic on-chain properties to spawn a completely unique child object. This entire genetic simulation executed entirely on-chain inside Move modules, showing off Sui's speed and low computation overhead! 🧬🏔",
            yetiMood: "proud",
            chalkboardHeader: "GENE SELECTION CONTRACTS"
          },
          {
            id: "capy5",
            title: "Legacy of Sui Capys",
            content: "Capys proved to game designers around the world that web3 games could offer true gameplay and asset customization without frustrating web3 delays. It set the gold standard for all Sui NFT and game protocols looking forward under the snow! 🏆🐻",
            yetiMood: "excited",
            chalkboardHeader: "ESTABLISHING THE GOLD STANDARD"
          }
        ],
        quiz: [
          {
            id: "cq1",
            question: "What architectural feature of Sui made 'Sui Capys' possible?",
            options: [
              "Parent-Child Object nesting, allowing NFTs to directly own other objects",
              "A high speed printer setup",
              "Having global shared file directories in raw text",
              "The ability to make gas cost zero"
            ],
            correctAnswerIndex: 0,
            explanation: "Sui's object model allows objects to own other objects, letting a Capy NFT directly hold its own clothing items as on-chain nested entities."
          }
        ]
      },
      {
        id: "history-defi-spring",
        title: "Sui DeFi Summer & TVL Breakouts",
        description: "The rapid ascend of Sui into the top 10 TVL blockchains in 2024.",
        xpValue: 50,
        steps: [
          {
            id: "defi_sp1",
            title: "The Sleepy Awakening",
            content: "After Mainnet launched in May 2023, Sui's DeFi landscape was a quiet, cozy winter forest. But behind the scenes, elite builders were assembling deep swapping, lending, and liquid staking layers that were about to burst into life! ❄️🐻",
            yetiMood: "chill",
            chalkboardHeader: "QUIET RECRUITING SEEDS"
          },
          {
            id: "defi_sp2",
            title: "The TVL Surge in 2024",
            content: "Starting in early 2024, Sui experienced a spectacular surge in Total Value Locked (TVL). Within months, TVL skyrocketed from under $100 million to over $700 million, surpassing older layer 1 networks such as Cardano, Aptos, and Base! 🚀🏔",
            yetiMood: "proud",
            chalkboardHeader: "THE VERTICAL ESCAPE"
          },
          {
            id: "defi_sp3",
            title: "Cetus and Navi leading the Charge",
            content: "Protocols like Cetus (the concentrated liquidity AMM) and Navi (the primary lending market) served as the turbine engines of this growth. Their high-performance Move contracts handled millions of daily trades with sub-second finality. 🛡️⚡",
            yetiMood: "excited",
            chalkboardHeader: "CORE ENGINE FLOWS"
          },
          {
            id: "defi_sp4",
            title: "The Inflow of Institutional Assets",
            content: "Why did capital flock to Sui? Because of predictability and security. Institutional traders locked in millions, realizing Sui's Move compiler provides absolute safety against standard hacks, while sub-300ms consensus ensures no slippage decay! 💼✨",
            yetiMood: "thinking",
            chalkboardHeader: "THE TRUST ADVANTAGE"
          },
          {
            id: "defi_sp5",
            title: "Entering top 10 status",
            content: "Today, Sui is positioned as a powerhouse ecosystem, holding a prominent place among the top 10 DeFi networks in the world. yeti is extremely proud to see this magnificent lofi academy expanding its digital reach into every territory! 🗺️🐻",
            yetiMood: "excited",
            chalkboardHeader: "CLAY TOP METRICS"
          }
        ],
        quiz: [
          {
            id: "dq1",
            question: "Which of the following describes Sui's DeFi expansion in 2024?",
            options: [
              "Sui TVL surged massively, pushing it into the top 10 DeFi blockchains globally",
              "The network was shut down forever",
              "All tokens were locked into centralized web2 accounts",
              "Sui disabled all swap protocols"
            ],
            correctAnswerIndex: 0,
            explanation: "Sui's high speeds and robust smart contracts attracted massive capital flows, launching it into the top 10 DeFi chains worldwide."
          }
        ]
      },
      {
        id: "history-academics",
        title: "The Academic Roots of Mysticeti Consensus",
        description: "Explore the peer-reviewed research behind Sui's sub-300ms state engine.",
        xpValue: 45,
        steps: [
          {
            id: "acad1",
            title: "Scientific Peer-Review Core",
            content: "Sui wasn't just built by slapping speculative code blocks together. Mysten's systems teams include decorated cryptographers and academic professors who design networks that undergo rigorous peer-reviews! 🔬🐻",
            yetiMood: "thinking",
            chalkboardHeader: "SOLID SCIENTIFIC BASE"
          },
          {
            id: "acad2",
            title: "The Narwhal Mempool Ledger",
            content: "Historically, blockchains mixed data storage sorting and voting confirmation inside the same loop. Mysten's researchers separated them! They developed 'Narwhal'—a localized mempool that purely organizes data, dramatically improving validation speed! 🐳❄",
            yetiMood: "chill",
            chalkboardHeader: "MEMPOOL SPECIFICATIONS"
          },
          {
            id: "acad3",
            title: "The Bullshark Consensus Voting",
            content: "Once Narwhal arranges the transaction queue, an ultra-fast consensus engine called 'Bullshark' handles the validator voting process. Bullshark agrees on the sorted transaction records without adding latency, keeping CPU cores moving at full efficiency! 🦈⚡",
            yetiMood: "excited",
            chalkboardHeader: "VOTING FLIGHT LANES"
          },
          {
            id: "acad4",
            title: "The Mysticeti latency breakthrough",
            content: "In 2024, Mysten researchers published 'Mysticeti', a revolutionary consensus update. Mysticeti slashes validator round trips by utilizing a DAG (Directed Acyclic Graph) architecture, achieving sub-300ms records. Literally the fastest block processing in human history! 🌌🐾",
            yetiMood: "proud",
            chalkboardHeader: "THE LATENCY MILESTONE"
          },
          {
            id: "acad5",
            title: "Secure Academy Vaults",
            content: "This scientific foundation guarantees that every token stored, lent, or staked inside our cabin's DeFi simulator is shielded by verifiable cryptographic proofs, keeping our winter home extremely cozy! 🏔️🛡️",
            yetiMood: "excited",
            chalkboardHeader: "THE SECURE ACADEMY SHIELD"
          }
        ],
        quiz: [
          {
            id: "aq1",
            question: "What breakthrough represents Mysticeti's primary contribution to consensus science?",
            options: [
              "It utilizes DAG structures to cut down consensus latency to sub-300ms levels",
              "It forces all nodes to use solar panels",
              "It disables typing on computers",
              "It converts cryptography into basic text files"
            ],
            correctAnswerIndex: 0,
            explanation: "Mysticeti leverages specialized Directed Acyclic Graph (DAG) protocols to reduce execution round trips, enabling sub-300ms transaction confirmations."
          }
        ]
      },
      {
        id: "history-ecosystem-impact",
        title: "Ecosystem Power & Developer Empowerment",
        description: "Explore how the Sui Foundation fuels real-world utility, global hub activities, and developer innovation.",
        xpValue: 50,
        videoUrl: "https://www.youtube.com/watch?v=b-7I1uUvY7k",
        videoTitle: "Sui Ecosystem Review & Developer Opportunities",
        steps: [
          {
            id: "eco1",
            title: "Real-World Adoption and RWA",
            content: "Sui's impact is global! Major global institutions, luxury brands, and mobile operators utilize Sui to issue high-velocity Real World Assets (RWAs), secure digital identity markers, and process instant global micro-transactions. This bridges purely theoretical blockchain research directly into the hands of billions of real on-chain users. Yeti loves seeing technology make life warmer!",
            highlightCode: "// Sui processes stablecoins, loyalty points, and digital IDs\n// globally and securely at sub-second speeds.",
            yetiMood: "chill",
            chalkboardHeader: "REAL-WORLD UTILITY"
          },
          {
            id: "eco2",
            title: "Sui Builder Houses & Hackathons",
            content: "The heartbeat of Sui lies in its dynamic, physical community! Through international Sui Builder Houses, specialized developer bootcamps, and legendary decentralized hackerspaces, builders from Tokyo to Paris collaborate in real-time. These high-energy activities cultivate technical breakthroughs, secure funding, and foster lifelong engineering alliances.",
            highlightCode: "// Global developer hubs host live coding challenges,\n// security peer-reviews, and networking streams.",
            yetiMood: "excited",
            chalkboardHeader: "GLOBAL HUB ACTIVITIES"
          },
          {
            id: "eco3",
            title: "Empowering Developers: Grants & Tools",
            content: "Sui puts developer needs first! The Sui Foundation actively distributes millions of dollars in developer-centric grants, academic sponsorships, and startup incubator aid. Alongside direct economic support, builders are empowered with state-of-the-art tooling, instant debugging IDE suites, zkLogin OAuth capabilities, and lightning-fast SDK kits.",
            highlightCode: "// Sui Foundation provides robust technical audits,\n// financial backing, and distribution channels for creators.",
            yetiMood: "proud",
            chalkboardHeader: "DEVELOPER FIRST FORCE"
          }
        ],
        quiz: [
          {
            id: "eq1",
            question: "How does the Sui Foundation actively empower Web3 developers?",
            options: [
              "By distributing developer-centric grants, academic aid, and state-of-the-art open source tooling",
              "By requiring developers to work inside physical ice caves",
              "By banning other programming languages",
              "By charging a monthly fee to run the compiler"
            ],
            correctAnswerIndex: 0,
            explanation: "Sui's developer-first strategy includes generous financial grants, incubation programs, and sophisticated developer tools to make building easy."
          },
          {
            id: "eq2",
            question: "Wha is the primary purpose of the global Sui Builder Houses?",
            options: [
              "To sell offline game boards",
              "To act as a physical server farm",
              "To bring global developers together to collaborate, build high-utility apps, and receive expert mentorship",
              "To train people how to ski"
            ],
            correctAnswerIndex: 2,
            explanation: "Sui Builder Houses connect builders, founders, and security auditors worldwide to iterate on products and form engineering collaborations."
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
      },
      {
        id: "move-objects-creation",
        title: "Sui Object Creation & Unique Identifiers",
        description: "Learn how to mint new UID instances using TxContext, assign properties, and handle ownership lifecycle.",
        xpValue: 90,
        steps: [
          {
            id: "moc1",
            title: "Understanding UID Generatives",
            content: "Welcome, developer scribe! Ever wondered how new objects get their lifetime passport IDs? In Sui Move, every standalone object structure requires its first field to be exactly 'id: UID'. To generate a brand new UID, you must call 'object::new(ctx)' and pass high-grade transaction context. Let's inspect the setup! 🐻🔑",
            highlightCode: "use sui::object::{Self, UID};\n\nstruct Snowball has key {\n    id: UID,\n    diameter: u64\n}",
            yetiMood: "chill",
            chalkboardHeader: "THE COMPILER PROTOCOL"
          },
          {
            id: "moc2",
            title: "Sourcing Transaction Context",
            content: "Where does this ctx environment handle come from? Whenever a player executes an entry function, the blockchain VM injects a mutable reference to the runtime state sequence '&mut TxContext'. This contains cryptographic metadata required to seed new addresses! 🛡️⚡",
            highlightCode: "public entry fun roll_snowball(\n    diameter: u64,\n    ctx: &mut TxContext\n) { ... }",
            yetiMood: "thinking",
            chalkboardHeader: "MUTABLE CONTEXT HOOKS"
          },
          {
            id: "moc3",
            title: "Instantiating the Struct",
            content: "Let's perform the actual creation! In Move, you instantiate structs by specifying values for all declared fields. If you skip even one property or misname a variable, the compiler halts compile targets instantly to guard structural integrity under the ice! ❄️💻",
            highlightCode: "let ball = Snowball {\n    id: object::new(ctx),\n    diameter: diameter\n};",
            yetiMood: "excited",
            chalkboardHeader: "STRUCT CREATION ENGINE"
          },
          {
            id: "moc4",
            title: "Address-Owned Default Routing",
            content: "Now that we have created our cold snowball object, what happens if we just let the function end? It will fail! In Move, objects cannot be ignored or vaporized if they do not have the 'drop' ability. We must send it somewhere! By default, we transfer it to the sender's address. 📬🐻",
            highlightCode: "let sender_addr = tx_context::sender(ctx);\ntransfer::transfer(ball, sender_addr);",
            yetiMood: "chill",
            chalkboardHeader: "TRANSFER PROTOCOLS"
          },
          {
            id: "moc5",
            title: "Parent-Child Attachment Life",
            content: "Instead of locking the item to a user key, what if we want to nest objects inside other structures? Move handles this securely using parent-child hooks! We can attach items as child objects, meaning the parent owns them directly under SUI. 🎒🏔",
            highlightCode: "use sui::dynamic_field;\n\n// Attach a custom hat to the snowball parent object!\ndynamic_field::add(&mut ball.id, b\"hat\", hat_object);",
            yetiMood: "thinking",
            chalkboardHeader: "DYNAMIC NESTING FIELDS"
          },
          {
            id: "moc6",
            title: "Unpacking and Destructuring Structs",
            content: "What if you need to destroy an object and retrieve its fields? Move uses 'Destructuring'! To unpack a struct, you must specify its fields using pattern-matching binding. This is the only way to release stored values from memory back to local variables! 🐻🔨",
            highlightCode: "let Snowball { id, diameter } = ball;\nobject::delete(id); // Clean up UID immediately!\n// diameter is now a standard u64!",
            yetiMood: "proud",
            chalkboardHeader: "DESTRUCTURING MEMORY"
          },
          {
            id: "moc7",
            title: "UID Clean-up Protocols",
            content: "Sui rewards efficiency! When you destroy an object, you cannot let its UID remain floating. You must actively delete it from validator registers using 'object::delete()'. This frees up storage space and returns some recycled MIST to your wallet reserves! ♻️❄️",
            highlightCode: "use sui::object;\n\n// Consuming UID prevents state bloating\nobject::delete(id);",
            yetiMood: "excited",
            chalkboardHeader: "EFFICIENT STATE CLEANING"
          },
          {
            id: "moc8",
            title: "Object Creation Golden Loop",
            content: "Let's put all modules together into a complete, bulletproof Move entry function! We grab the sender, mint a snowball UID, assign its properties, and deposit it cleanly inside their wallet sequence in one atomic sequence. Yeti has certified your creation blueprints! 🌨️🏆",
            highlightCode: "public entry fun roll_and_save(\n    diameter: u64,\n    ctx: &mut TxContext\n) {\n    let ball = Snowball { id: object::new(ctx), diameter };\n    transfer::transfer(ball, tx_context::sender(ctx));\n}",
            yetiMood: "proud",
            chalkboardHeader: "blueprints verified"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "What function must be invoked to initialize a brand new UID instance in Sui Move?",
            options: [
              "object::new(ctx)",
              "object::create_id()",
              "tx_context::sender(ctx)",
              "transfer::transfer()"
            ],
            correctAnswerIndex: 0,
            explanation: "Sui's standard library provides high-performance ID allocations via 'object::new(ctx)', utilizing cryptographically derived entropy."
          }
        ]
      },
      {
        id: "move-shared-managed",
        title: "Managing Shared State & Shared Objects",
        description: "Master shared object patterns, consensus implications, and coordinate multi-user contract variables.",
        xpValue: 100,
        steps: [
          {
            id: "msm1",
            title: "What is Shared State on Sui?",
            content: "Welcome, coordinator! Standard address-owned objects are highly performant but completely exclusive. If we are building a collaborative drawing board, a DEX swap liquidity pool, or a game lobby, multiple players must interact with the state simultaneously. We need Shared State! 🐻👥",
            highlightCode: "use sui::transfer;\n\n// share_object(obj) makes it globally accessible",
            yetiMood: "chill",
            chalkboardHeader: "MULTIPLAYER HIGHWAYS"
          },
          {
            id: "msm2",
            title: "The share_object Framework Call",
            content: "How do you make an object shared? By passing it inside the standard function 'transfer::share_object()'! Once an object is designated as shared, it belongs to the network itself. Anyone is permitted to read or mutate its internally public fields via smart contracts! 🌨️⚡",
            highlightCode: "struct GameLobby has key {\n    id: UID,\n    player_count: u64\n}\n\n// transfer::share_object(lobby); // Shared forever!",
            yetiMood: "thinking",
            chalkboardHeader: "GLOBAL ACCESSIBILITY ENGINES"
          },
          {
            id: "msm3",
            title: "Consensus Pipeline Constraints",
            content: "Warning: sharing objects impacts transaction speeds! Because multi-user access is prone to editing overlaps, compilers cannot use fast-path validation. Instead, shared objects require validator consensus (Bullshark) to synchronize execute order sequences. Use them wisely! ⏱️🐻",
            highlightCode: "// Shared objects trigger sequential consensus\n// Owned objects bypass consensus pathways",
            yetiMood: "thinking",
            chalkboardHeader: "SPEED CONSIDERATIONS"
          },
          {
            id: "msm4",
            title: "Frozen Immutable States",
            content: "What if you want to share data, but want to make sure nobody can ever modify its contents? You freeze it using 'transfer::freeze_object()'! This turns it into an Immutable Object. Because it can never be mutated, readers can access it in parallel without consensus delay! ❄️🛡️",
            highlightCode: "transfer::public_freeze_object(immutable_profile);",
            yetiMood: "excited",
            chalkboardHeader: "IMMUTABLE COLD STORAGE"
          },
          {
            id: "msm5",
            title: "Designing Shared State Upgrades",
            content: "When writing modules for shared objects, managing version fields is crucial. By enforcing assertions checking matching protocol versions, you prevent older client versions from executing outdated strategies against treasury balances! 🧱🏛",
            highlightCode: "assert!(lobby.version == NEW_VERSION, E_VERSION_OUTDATED);",
            yetiMood: "chill",
            chalkboardHeader: "VERSION CHECKS"
          },
          {
            id: "msm6",
            title: "Owner-Controlled Administration",
            content: "How do you prevent malicious strangers from resetting your shared game state parameters? You write helper validations that require an Admin Cap (Badge) object owned by your trusted administrators to be passed as a transaction parameter! 🛡️👑",
            highlightCode: "struct AdminCap has key { id: UID }\n\npublic entry fun reset_lobby(\n    _admin: &AdminCap, // Ensures owner validation!\n    lobby: &mut GameLobby\n) { ... }",
            yetiMood: "proud",
            chalkboardHeader: "BADGE REGISTRY CHECKS"
          },
          {
            id: "msm7",
            title: "Object Wrapping Tactics",
            content: "Another powerful pattern on Sui is 'Object Wrapping'! You can nest a whole object structure inside another module's structure fields. This encapsulates internal data layers cleanly under strict control rules governed by the parent module. 🎁🐻",
            highlightCode: "struct Vault has key {\n    id: UID,\n    inside_coin: Coin<SUI> // Wrapped inside the vault container!\n}",
            yetiMood: "excited",
            chalkboardHeader: "CAPSULE WRAPPING"
          },
          {
            id: "msm8",
            title: "Complete Shared State Module Blueprint",
            content: "Let's inspect a complete, highly-secure Move module initialization! We create a game board, designate it as shared, and mint an Admin Cap sent directly to the publisher's wallet. Yeti is dancing by the fireplace celebrating your architectural genius! 🐻💃",
            highlightCode: "fun init(ctx: &mut TxContext) {\n    let lobby = GameLobby { id: object::new(ctx), player_count: 0 };\n    transfer::share_object(lobby);\n    let admin = AdminCap { id: object::new(ctx) };\n    transfer::transfer(admin, tx_context::sender(ctx));\n}",
            yetiMood: "proud",
            chalkboardHeader: "MULTIPLAYER Blueprints"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "Why do Shared Objects require full validation consensus on Sui?",
            options: [
              "To make transactions expensive",
              "To coordinate edit sequences and prevent simultaneous write conflicts",
              "To convert them into NFTs",
              "Because the compiler is written in JavaScript"
            ],
            correctAnswerIndex: 1,
            explanation: "Because multiple players can access a shared object concurrently, nodes must agree on the sequence ordering of updates."
          }
        ]
      },
      {
        id: "move-events-errors",
        title: "Debugging, Assertions, and Events in Move",
        description: "Prevent code faults, use pre-condition assertions, emit custom on-chain logs, and debug errors.",
        xpValue: 90,
        steps: [
          {
            id: "mee1",
            title: "The Sandbox Defense Line",
            content: "Greetings, safety engineer! In on-chain financial environments, checking inputs is vital. We must prevent operations with invalid states (such as overdrafts) from executing. Move enforces this defensive barrier using custom asserts and assertions! 🐻🧱",
            highlightCode: "const E_INSUFFICIENT_BALANCE: u64 = 1001;",
            yetiMood: "thinking",
            chalkboardHeader: "COZY SANDBOX DEFENSE"
          },
          {
            id: "mee2",
            title: "The assert! Pre-condition Assertion",
            content: "How do you enforce pre-conditions in Move? You utilize the native macro 'assert!'. It accepts a boolean condition and a custom numerical error code. If the condition evaluates to false, execution aborts instantly and resets all states! ⚖️❄️",
            highlightCode: "assert!(balance >= amount, E_INSUFFICIENT_BALANCE);",
            yetiMood: "chill",
            chalkboardHeader: "ASSERT ACTIONS"
          },
          {
            id: "mee3",
            title: "Numerical Error Standards",
            content: "Move error codes are u64 constants. Yeti recommends structural grouping: prefixing error definitions with 'E_'. This makes tracking compiler failures across deep project modules incredibly straightforward and neat under the snow! ❄️🔢",
            highlightCode: "const E_NOT_AUTHORIZED: u64 = 403;\nconst E_OUT_OF_BOUNDS: u64 = 404;",
            yetiMood: "thinking",
            chalkboardHeader: "GROUPED CONSTANTS"
          },
          {
            id: "mee4",
            title: "On-Chain Event Logs",
            content: "How does your web app or indexer find out when an action occurs on-chain? It views Event logs! In Sui Move, we define custom events as structs possessing the 'copy' and 'drop' capability modifiers. Yeti likes to emit them during major executions! 🐻📡",
            highlightCode: "use sui::event;\n\nstruct CoffeeBrewed has copy, drop {\n    brew_strength: u8,\n    maker: address\n}",
            yetiMood: "excited",
            chalkboardHeader: "on-chain log transmissions"
          },
          {
            id: "mee5",
            title: "The event::emit Instruction",
            content: "To broadcast your custom event across validator networks, you instantiate the event structure and send it using 'event::emit()'. Client web applications can listen to these logs in real-time to trigger responsive UI notifications!",
            highlightCode: "event::emit(CoffeeBrewed {\n    brew_strength: 50,\n    maker: tx_context::sender(ctx)\n});",
            yetiMood: "chill",
            chalkboardHeader: "EMITTING REAL TIME LOGS"
          },
          {
            id: "mee6",
            title: "Tracking Compiler Panic Runs",
            content: "What happens if a transaction aborts? The entire block of modifications rolls back. Any SUI tokens transferred or dynamic values mutated revert back to their original states instantly, leaving zero dirty traces in the registry footprint!",
            highlightCode: "// Aborted transactions roll back completely\n// Unused gas budget is returned safely",
            yetiMood: "thinking",
            chalkboardHeader: "THE TRANSACTION UNDO SHIELD"
          },
          {
            id: "mee7",
            title: "Using custom logging functions",
            content: "While debugging inside your local framework environments, we can set up modular debug structures that print simple string vectors. This coordinates developer views elegantly before publishing contracts into production nodes!",
            highlightCode: "// std::debug::print(&variable_to_inspect);",
            yetiMood: "excited",
            chalkboardHeader: "LOCAL VERBATIM"
          },
          {
            id: "mee8",
            title: "A Complete Secure Entry Blueprint",
            content: "Let's review a robust design combining errors and events! We perform balance validations, execute state adjustments, emit the event log certificate, and complete the transfer cleanly. Yeti says: high-grade engineering right here!",
            highlightCode: "public entry fun brew_premium_coffee(\n    ctx: &mut TxContext\n) {\n    assert!(true, E_NOT_AUTHORIZED);\n    event::emit(CoffeeBrewed { brew_strength: 100, maker: tx_context::sender(ctx) });\n}",
            yetiMood: "proud",
            chalkboardHeader: "SAFE SECURE LOOPS"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "What happens on-chain if a Move assert! condition evaluates to false?",
            options: [
              "The transaction continues with warnings",
              "The blockchain resets validator nodes",
              "Execution aborts instantly, resetting all state changes and logging the error code",
              "It deletes the user's wallet accounts"
            ],
            correctAnswerIndex: 2,
            explanation: "Move transactions are fully atomic. An assertion failure aborts all execution cleanly, reverting intermediate states safely."
          }
        ]
      },
      {
        id: "move-advanced-design",
        title: "Sui Move Security & Reentrancy-Free Patterns",
        description: "Avoid classic smart contract exploits, manage asset capabilities, and build reentrancy-free vaults.",
        xpValue: 100,
        steps: [
          {
            id: "mad1",
            title: "The Reentrancy Shield Native to Move",
            content: "Welcome, master sentinel! On older networks, reentrancy attacks (where standard attackers drain contracts by recursively calling external withdrawal loops before states update) caused billions in damages. sui Move is completely immune to this by default!",
            highlightCode: "// Compiler structural definitions prevent external re-entry hooks",
            yetiMood: "proud",
            chalkboardHeader: "REENTRANCY RESISTANT"
          },
          {
            id: "mad2",
            title: "Capabilities as Access Guardians",
            content: "Instead of maintaining massive public access control lists on-chain, Move utilizes Capabilities! If a function can only be triggered by developers, require a unique 'DevCap' badge object to be sent as a parameter limit. No badge, no access!",
            highlightCode: "public entry fun update_pricing(\n    _dev: &DevCap, // Required access key!\n    lobby: &mut GameLobby\n) { ... }",
            yetiMood: "chill",
            chalkboardHeader: "CAPABILITY GUARDIANS"
          },
          {
            id: "mad3",
            title: "The Hot Potato Struct Pattern",
            content: "Want to guarantee that a sequence of operations is completed in a single block without skipping steps? You write a 'Hot Potato' struct! This is a struct with absolutely NO abilities (no key, store, copy, drop). It must be destrustured before the block ends!",
            highlightCode: "struct Receipt {\n    amount_to_pay: u64\n} // No abilities! Must be handled in function execution!",
            yetiMood: "excited",
            chalkboardHeader: "HOT POTATO CHAINS"
          },
          {
            id: "mad4",
            title: "Resolving the Hot Potato Potato",
            content: "Because the Receipt has no ability parameters, a transaction cannot discard it. The user has to pass it back to a matching 'pay_balances' execution function in your module to destructure it. This secures flash-loan repayments completely!",
            highlightCode: "public fun pay_balances(\n    payment: Coin<SUI>,\n    receipt: Receipt // Deconstruct here!\n) { ... }",
            yetiMood: "thinking",
            chalkboardHeader: "POTATO DESTRUCTION ENTRANCE"
          },
          {
            id: "mad5",
            title: "Enforcing Integer Safety Limits",
            content: "Always check for mathematical overflows! When performing compounding interest calculations or asset distributions, convert smaller integers to u128 or u256 ranges before multiplication checks to verify zero parameter leakage under the cold ice!",
            highlightCode: "let reward = ((staked as u128) * apr) / 10000;",
            yetiMood: "thinking",
            chalkboardHeader: "INTEGER MULTIPLICATIONS"
          },
          {
            id: "mad6",
            title: "Storage Fund Leakage Defenses",
            content: "When updating dynamic fields frequently, be aware of gas storage dynamics. Design models that recycle obsolete indexes cleanly to prevent capital locked up on validator disks, ensuring your code remains extremely light and clean!",
            highlightCode: "dynamic_field::remove<bdf>(&mut parent.id, key);",
            yetiMood: "chill",
            chalkboardHeader: "RECYCLING MANAGEMENT"
          },
          {
            id: "mad7",
            title: "Module Upgradability Limits",
            content: "When publishing a Move package, Sui generates an upgrade cap badge. By defining safe, progressive migration functions inside your initializers, you secure version upgrades from malicious actors and maintain community trust forever!",
            highlightCode: "struct UpgradeCap has key { id: UID }",
            yetiMood: "proud",
            chalkboardHeader: "UPGRADE SAFEGUARDS"
          },
          {
            id: "mad8",
            title: "Graduation Blueprints with Yeti",
            content: "You did it! You have unlocked all 6 elite tracks of this lofi Move Academy. Yeti is incredibly proud of your deep progress on parallel speed, objects, capability assertions, and beautiful designs. Go forth and craft cozy code on Sui!",
            highlightCode: "// You have graduated!\n// Go construct the on-chain future, master creator!",
            yetiMood: "proud",
            chalkboardHeader: "GRADUATION DEGREE ACHIEVED"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "Why is Sui Move inherently safe against reentrancy attacks?",
            options: [
              "Because it uses high speed servers",
              "Sui's compilation module structure forbids re-entry execution recursively before current execution finishes",
              "Because it is written in assembly",
              "Because it does not allow functions"
            ],
            correctAnswerIndex: 1,
            explanation: "Sui Move's resource model and strict linear execution prevents re-entry loops natively, cutting out the leading vector of DeFi hacks."
          }
        ]
      }
    ]
  },
  {
    id: "sui-sdk-indexing",
    title: "Sui SDK & Indexers",
    description: "Master RPC queries, custom indexer architectures, and real-time frontend event integrations.",
    iconName: "Cpu",
    difficulty: "Intermediate",
    modules: [
      {
        id: "raw-rpc-queries",
        title: "Sui TypeScript RPC Foundations",
        description: "Fetch block data, fetch objects dynamically, and interact with Sui JSON-RPC nodes.",
        xpValue: 50,
        videoUrl: "https://www.youtube.com/watch?v=mE6_3d2mK9o",
        videoTitle: "Connecting Frontends to Sui with the TypeScript SDK",
        steps: [
          {
            id: "rpc1",
            title: "Connecting to the Client",
            content: "Welcome back to the cozy tech deck! Today we step beyond smart contracts to see how client web applications talk to Sui. We use a SuiClient connection to query RPC nodes. It allows us to resolve on-chain object details, query account balances, or fetch transaction blocks with a simple, type-safe API! Grab a hot coffee and let's configure your client connection.",
            highlightCode: "import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';\n\nconst client = new SuiClient({\n  url: getFullnodeUrl('testnet')\n});",
            yetiMood: "chill",
            chalkboardHeader: "CLIENT CONNECTIONS"
          },
          {
            id: "rpc2",
            title: "Reading Object Fields",
            content: "Remember, everything in Sui is an object. To read the content of any individual object, we provide its 32-byte address ID to 'getObject'. We can specify content requirements to retrieve full serializations or parse layout parameters into clean JSON records. Yeti is keeping your storage query fast!",
            highlightCode: "const objectResult = await client.getObject({\n  id: '0xabc123...',\n  options: { showContent: true, showOwner: true }\n});",
            yetiMood: "thinking",
            chalkboardHeader: "OBJECT FIELD RETRIEVAL"
          },
          {
            id: "rpc3",
            title: "Resolving Dynamic Fields",
            content: "What if your on-chain struct has thousands of sub-items inside child dynamic fields? Instead of pulling a massive nested object, we can paginate list queries using 'getDynamicFields'. This keeps client bandwidth extremely lightweight and prevents browser frame lag!",
            highlightCode: "const fields = await client.getDynamicFields({\n  parentId: '0xparent123...'\n});",
            yetiMood: "excited",
            chalkboardHeader: "PAGINATED CHILDS"
          },
          {
            id: "rpc4",
            title: "Checking Coin Balances",
            content: "To show SUI or custom testnet coins in a dApp, we query historical coin balances. We can query total unified balances or filter specific coin types to display custom reward systems comfortably. Yeti verified this handles mist precisely!",
            highlightCode: "const balance = await client.getBalance({\n  owner: '0xuserAddress...',\n  coinType: '0x2::sui::SUI'\n});",
            yetiMood: "proud",
            chalkboardHeader: "BALANCES ENGINE"
          }
        ],
        quiz: [
          {
            id: "rq1",
            question: "Which client utility class is recommended to connect to Sui JSON-RPC networks?",
            options: [
              "SolanaWeb3",
              "SuiClient",
              "SuiProviderLegacy",
              "EtherProvider"
            ],
            correctAnswerIndex: 1,
            explanation: "SuiClient is the official, modernized client entrypoint in the @mysten/sui package for interactively querying and reading Sui blockchain nodes."
          },
          {
            id: "rq2",
            question: "Why should you use getDynamicFields instead of querying raw nested structures for high-volume items?",
            options: [
              "It decreases transaction speeds",
              "It deletes older entries automatically",
              "It paginates child dynamic values, preserving client-side performance and keeping memory footprint low",
              "It requires gas payments to read"
            ],
            correctAnswerIndex: 2,
            explanation: "getDynamicFields allows clean pagination of dynamic objects on the blockchain without having to read a massive static structural map."
          }
        ]
      },
      {
        id: "event-indexers",
        title: "High-Throughput Event Indexers",
        description: "Build reactive off-chain engines that capture custom events and update frontends instantly.",
        xpValue: 50,
        steps: [
          {
            id: "idx1",
            title: "The Event Capture Hub",
            content: "Web3 web interfaces shouldn't poll RPC nodes repeatedly to find changes. That would burn validator pipelines! Instead, we define event monitors. When on-chain packages execute 'event::emit', our subscriber intercepts the stream payload instantly and updates the UI state in real-time. Yeti calls this smooth as velvet!",
            highlightCode: "client.subscribeEvent({\n  filter: { Package: '0xcontractPackageId' },\n  onMessage: (event) => {\n    console.log('New event received:', event);\n  }\n});",
            yetiMood: "excited",
            chalkboardHeader: "EVENT STREAMERS"
          },
          {
            id: "idx2",
            title: "Building Custom SQL Indexers",
            content: "For complex leaderboards or transaction histories, we stream events into an off-chain PostgreSQL database. By writing a small Node server that processes blocks and maps transaction headers into relational tables, we gain maximum search speed without touching slow RPC gateways. This is high-grade setup!",
            highlightCode: "// Stream event items to analytical databases\n// or local storage states for blazing fast queries",
            yetiMood: "thinking",
            chalkboardHeader: "RELATIONAL INDEXING"
          },
          {
            id: "idx3",
            title: "GraphQL Gateway Introductions",
            content: "Sui supports GraphQL natively for queries! Instead of multiple sequential REST API roundtrips, we write single clean queries specifying exactly what variables we need (IDs, fields, owners, or events). Yeti has his telescope aligned to this stream!",
            highlightCode: "query { \n  owner(address: \"0x...\") {\n    objects {\n      nodes { digest contents { json } }\n    }\n  }\n}",
            yetiMood: "chill",
            chalkboardHeader: "GRAPHQL HARMONY"
          }
        ],
        quiz: [
          {
            id: "iq1",
            question: "What is the primary benefit of deploying off-chain databases and event indexers?",
            options: [
              "It makes consensus slower",
              "It provides instant searchable records without overloading the on-chain gateway",
              "It replaces the need for any on-chain smart contracts",
              "It prevents users from deleting files"
            ],
            correctAnswerIndex: 1,
            explanation: "Off-chain indexing mirrors relevant on-chain data into databases, which can be queried instantly with full search filters without sending repetitive on-chain requests."
          },
          {
            id: "iq2",
            question: "How do client web pages receive notification of smart contract changes in real-time?",
            options: [
              "By emailing the developers",
              "Through websockets subscribing to smart contract event filters",
              "By reloading the web browser every 2 seconds",
              "Through manual paper receipts"
            ],
            correctAnswerIndex: 1,
            explanation: "SuiClient event subscriptions work over high-efficiency WebSockets, notifying client browsers the moment a contract emits an event certificate."
          }
        ]
      },
      {
        id: "gas-budget-tuning",
        title: "Advanced Gas Budget Tuning",
        description: "Perform transaction simulation, estimation, and avoid gas dry-run outages.",
        xpValue: 50,
        steps: [
          {
            id: "gas_tune1",
            title: "Transaction Dry-Runs",
            content: "Before prompting users to sign a heavy transaction with their actual Sui coins, it is wise to run a test execution. A dry-run executes the compiled transaction on a simulated RPC node, checking if the bytecode would panic, showing what assets mutate, and outputting exact gas calculations safely!",
            highlightCode: "const dryRunResponse = await client.dryRunTransactionBlock({\n  transactionBlock: compiledTxnBlockBytes\n});",
            yetiMood: "thinking",
            chalkboardHeader: "PRE-SIGNING DRY RUNS"
          },
          {
            id: "gas_tune2",
            title: "Analyzing Effects & Gas Consumption",
            content: "The dry-run response contains critical details. The 'events' array shows emitted logs, the 'gasUsed' block breaks down execution and storage components, and the 'status' tells you if the contract aborted. This acts as a protective shield for user balances!",
            highlightCode: "const executionCost = dryRunResponse.effects.gasUsed;\nconsole.log('Execution Gas used (MIST):', executionCost.computationCost);",
            yetiMood: "chill",
            chalkboardHeader: "ANALYZING RAW METRICS"
          },
          {
            id: "gas_tune3",
            title: "Defending Against Price Fluctuations",
            content: "Sui gas estimation is incredibly deterministic because of the gas pricing mechanism. However, when writing critical DeFi interactions, adding a tiny gas budget buffer (like 5%-10%) ensures the transfer never fails mid-step due to minor dynamic fields growth during dense network congestion. Yeti says: keep it cozy and keep a safety margin!",
            highlightCode: "// Set gas budget dynamically to execution + 10% safety buffer\ntxb.setGasBudget(calculatedGas * 1.1);",
            yetiMood: "proud",
            chalkboardHeader: "BUDGET SAFETY MARGIN"
          }
        ],
        quiz: [
          {
            id: "gq1",
            question: "Why should applications perform transaction dry-runs before requesting actual signatures?",
            options: [
              "To make gas more expensive",
              "To verify code execution success and calculate exact gas costs without spending actual coins",
              "To mine active testnet block rewards",
              "To reset the validator cache"
            ],
            correctAnswerIndex: 1,
            explanation: "A dry-run executes transaction blocks in a read-only environment, returning computed assets changes and gas requirements without modifying state."
          }
        ]
      }
    ]
  },
  {
    id: "sui-contract-testing",
    title: "Move Verification & Testing",
    description: "Enforce smart contract invariants using unit-tests, property-based verification, and the Move Prover.",
    iconName: "ShieldCheck",
    difficulty: "Advanced",
    modules: [
      {
        id: "move-unit-testing",
        title: "Testing with sui::test_scenario",
        description: "Instantiate mock environments, advance epochs, and manage mock validator settings.",
        xpValue: 60,
        steps: [
          {
            id: "test1",
            title: "Simulating on-chain Scenarios",
            content: "Welcome, master sentinel, to advanced testing systems! Sui provides the 'sui::test_scenario' module. It allows you to simulate a virtual blockchain environment. You can instantiate multiple test players, create mock objects, send transactions, and inspect global state modifications right inside your local machine!",
            highlightCode: "use sui::test_scenario;\n\n#[test]\nfun test_cozy_coffee_flow() {\n    let mut scenario = test_scenario::begin(@0xCAFE);\n    // ... execute logic ...\n    test_scenario::end(scenario);\n}",
            yetiMood: "chill",
            chalkboardHeader: "VIRTUAL LEDGER SIMULATORS"
          },
          {
            id: "test2",
            title: "Managing Test Callers",
            content: "In our virtual scenario, we can shift caller addresses dynamically using 'next_tx'. This makes it incredibly easy to test access control limits. For example, we start a transaction as a standard Guest, verify they get blocked from the vault, then switch to a DevCap capability holder to unlock it successfully!",
            highlightCode: "test_scenario::next_tx(&mut scenario, @0xUSER_ALICE);\n// Perform transactions under Alice's permission context",
            yetiMood: "thinking",
            chalkboardHeader: "PERFORMING PERMISSION JUMPS"
          },
          {
            id: "test3",
            title: "Consuming and Validating Objects",
            content: "Once a contract transaction finishes, objects are placed in the scenario owner inventory. In tests, we assert their presence by taking the object out of the scenario, inspecting its inner fields, and returning it cleanly. It's like checking the bookshelf in your study room!",
            highlightCode: "let sweat = test_scenario::take_from_sender<Sweatshirt>(&scenario);\nassert!(sweat.color == b\"green\", 101);\ntest_scenario::return_to_sender(&scenario, sweat);",
            yetiMood: "excited",
            chalkboardHeader: "CHECKING FOR THE COZY ASSETS"
          }
        ],
        quiz: [
          {
            id: "tq1",
            question: "How do you switch the active sender address during a test_scenario execution?",
            options: [
              "By manual network resets",
              "Using test_scenario::next_tx() and specifying the sender's mock account address",
              "By modifying the compiled cargo binary",
              "Sui does not support changing callers"
            ],
            correctAnswerIndex: 1,
            explanation: "test_scenario::next_tx() closes the current mock transaction and starts a fresh transaction context with the given sender's address."
          },
          {
            id: "tq2",
            question: "Why must you return objects taken via take_from_sender after asserting their properties?",
            options: [
              "To pay for gas fines",
              "Otherwise they will get deleted forever",
              "To satisfy Move's resource ownership rules and ensure the scenario closes cleanly without dangling resources",
              "To speed up the compiler"
            ],
            correctAnswerIndex: 2,
            explanation: "Move enforcements are fully active in test runs. Any object taken from a test context must be safely returned or consumed to prevent resource leakage."
          }
        ]
      },
      {
        id: "move-property-fuzzing",
        title: "Fuzzing & Invariance Verification",
        description: "Write checks that test contract logic with hundreds of randomly generated inputs.",
        xpValue: 60,
        steps: [
          {
            id: "fuzz1",
            title: "The Math Invariant Check",
            content: "Classic unit tests only check specific inputs you configure (e.g. testing exactly 10 SUI). But what if a math bug only triggers at the absolute maximum integer limit of a u64? Property-based fuzzing tests your function with hundreds of random variables, discovering edge-case overflows automatically. Yeti verified this finds the cracks in the cold ice!",
            highlightCode: "// Test logic against randomized boundary values\n// to verify mathematical constraints remain fully invariant",
            yetiMood: "excited",
            chalkboardHeader: "MATHEMATICAL INVARIANTS"
          },
          {
            id: "fuzz2",
            title: "Writing Assert Invariants",
            content: "When writing code, design assertions that must *always* remain true regardless of the environment context. For instance, the vault's total asset balance must always equal the sum of outstanding shares multiplied by the price index. If a fuzzer ever finds an input that breaks this assertion, it halts and shows you the path!",
            highlightCode: "assert!(vault.total_assets == outstanding_shares * share_price, E_INVARIANT_VIOLATION);",
            yetiMood: "thinking",
            chalkboardHeader: "BOUNDING SECURITY INVARIANTS"
          }
        ],
        quiz: [
          {
            id: "fq1",
            question: "What is the primary objective of property-based fuzz testing in Move contracts?",
            options: [
              "To check if the typescript compilation works",
              "To find logical errors and arithmetic overflows using automated, randomized input generation",
              "To increase staking APY",
              "To customize the CSS color options"
            ],
            correctAnswerIndex: 1,
            explanation: "Fuzz testing queries the contract with a dense array of randomized inputs, helping researchers identify edge case overflow parameters or verification gaps."
          }
        ]
      },
      {
        id: "move-formal-specification",
        title: "Move Prover & Formal Specs",
        description: "Introduce mathematical specifications to mathematically prove that your logic contains zero bugs.",
        xpValue: 70,
        steps: [
          {
            id: "prov1",
            title: "Welcome to the Move Prover",
            content: "Testing can only prove the presence of bugs, never their absolute absence. For high-security vault systems, we use mathematical formal verification! The Move Prover analyzes your code and mathematically proves whether it satisfies formal rules under ALL scenarios. It's like having a master mathematician verify your log cabin blueprint!",
            highlightCode: "spec module {\n    pragma verify = true;\n}",
            yetiMood: "proud",
            chalkboardHeader: "MATHEMATICAL EXHAUSTIVE PROOF"
          },
          {
            id: "prov2",
            title: "Writing Spec Blocks",
            content: "We write specification blocks inside or alongside ourMove modules using the 'spec' keyword. In these blocks, we define pre-conditions (conditions that must be true for the caller) and post-conditions (conditions guaranteed to be true after the function completes). The compiler verifies this automatically!",
            highlightCode: "spec transfer_funds {\n    aborts_if balance_of(sender) < amount;\n    ensures balance_of(sender) == old(balance_of(sender)) - amount;\n}",
            yetiMood: "thinking",
            chalkboardHeader: "SPECIFICATION BLOCKS"
          },
          {
            id: "prov3",
            title: "Graduating Secure Creators",
            content: "You have scaled the highest, coziest peaks of SUI Move engineering! By combining parallel execution speed, modular dynamic structures, custom indexers, complete unit-tests, and formal specifications, you are now a master creator. Yeti the tutor is incredibly proud of your beautiful journey. Get some hot cocoa and look at your legendary developer achievements!",
            highlightCode: "// Congratulations on graduating from loficabin!\n// Your code safety is pristine. 🎓🐻❄️",
            yetiMood: "proud",
            chalkboardHeader: "THE SUPREME DEGREE"
          }
        ],
        quiz: [
          {
            id: "pq1",
            question: "How does the Move Prover guarantee that a contract is secure?",
            options: [
              "By hosting the application on stable local servers",
              "By using formal mathematical verification to prove that logic conforms perfectly to your defined specifications",
              "By testing 2 scenarios manually",
              "By changing the wallet seed keys"
            ],
            correctAnswerIndex: 1,
            explanation: "The Move Prover mathematically evaluates the system's invariants, ensuring that no state combination can ever bypass the defined specifications."
          }
        ]
      }
    ]
  },
  {
    id: "lofi-foundation",
    title: "Lofi Foundation",
    description: "Learn how lofi design, cozy visual layouts, background beats, and ambient animations are built and optimized on Sui's high-speed canvas.",
    iconName: "Music",
    difficulty: "Beginner",
    modules: [
      {
        id: "lofi-philosophy",
        title: "The Philosophy of Cozy UX",
        description: "Why soft aesthetics, calming layouts, and low-stress flows optimize learning.",
        xpValue: 45,
        steps: [
          {
            id: "lfs1",
            title: "Why Cozy Visual Design?",
            content: "Welcome, developer traveler! Let's talk about Cozy UX. traditional blockchain apps look intimidating, with fast-moving numbers, sharp red charts, and complex terminal outputs. Cozy UX uses soft earthy tones, vintage borders, and hand-drawn aesthetics to reduce user stress and make space for focused study. 🐻☕",
            yetiMood: "chill",
            chalkboardHeader: "CALMING USER ENVIRONMENTS"
          },
          {
            id: "lfs2",
            title: "Auditory Harmony in Code",
            content: "did you know that background lo-fi hip hop rhythms can increase task focus and slow heart rates? low-frequency loops and vintage crackles mimic white noise, covering distracting environmental sounds. in this academy, yeti is humming beautiful, relaxing rhythms to help you write flawless bytecode! 🎧🐻",
            yetiMood: "excited",
            chalkboardHeader: "AMBIENT SOUND MECHANICS"
          },
          {
            id: "lfs3",
            title: "Gamification & Playful Companions",
            content: "the brain processes challenges better when paired with playful context. adding custom characters, progress paths, and rewards makes complex tech like smart contract programming feel like an adventure! yeti is here as your trusted mountain tutor, turning scary errors into cozy lessons. 🌲🎒",
            yetiMood: "proud",
            chalkboardHeader: "THE ADVENTUROUS MIND"
          }
        ],
        quiz: [
          {
            id: "lfq1",
            question: "What is the primary benefit of Cozy UX in decentralized educational portals?",
            options: [
              "It increases gas costs",
              "It reduces user stress and cognitive load through soft tones and playful guidance",
              "It turns off the transaction parallelizer",
              "It replaces your browser with a retro video game console"
            ],
            correctAnswerIndex: 1,
            explanation: "Cozy UX lowers learning barriers and cognitive pressure by using warm palettes, playful tutors, and slow tempos, encouraging long-term retention."
          },
          {
            id: "lfq2",
            question: "Why are lofi background rhythms integrated into learning environments?",
            options: [
              "They block validators from reading transactions",
              "They act as white noise to shield focus and establish a relaxing mental rhythm",
              "They are required to mint NFTs on Sui",
              "They make the bytecode compile faster"
            ],
            correctAnswerIndex: 1,
            explanation: "Low-frequency beats and ambient sounds operate as cozy auditory shields, helping developers filter out external noise and retain deep focus."
          }
        ]
      },
      {
        id: "lofi-gamification",
        title: "Sui Progress Path Gamification",
        description: "How interactive trail maps, nodes, and achievements are represented as on-chain rewards.",
        xpValue: 45,
        steps: [
          {
            id: "lfg1",
            title: "Designing the Trail",
            content: "look at our cozy quest map! instead of a dry list of lessons, we've designed an interactive mountain trail. each node is a module checkpoint. connection paths are drawn with bezier curves to simulate natural, hand-drawn mountain trails. active nodes drift up and down with subtle floating animations to invite your clicks! 🏔️✨",
            yetiMood: "excited",
            chalkboardHeader: "BEZIER PATH SYSTEMS"
          },
          {
            id: "lfg2",
            title: "NFT Badges as Achievements",
            content: "when you conquer a curriculum track, you don't just get a simple text congratulation. you earn the right to mint a unique SUI Kiosk NFT badge! stored as an address-owned object, this badge acts as permanent, verifiable proof of your on-chain mastery, secured inside your own crypto inventory! 🎓🐻",
            yetiMood: "proud",
            chalkboardHeader: "VERIFIABLE ACHIEVEMENTS"
          }
        ],
        quiz: [
          {
            id: "lfg_q1",
            question: "How are student badges stored on the Sui network?",
            options: [
              "In a central spreadsheet",
              "As unique, address-owned on-chain Objects",
              "In the validator's local hard drive only",
              "As a simple cookie inside the browser"
            ],
            correctAnswerIndex: 1,
            explanation: "Because Sui uses an object-centric model, completed course badges are minted as unique, secure, first-class Objects owned directly by the student's wallet."
          }
        ]
      }
    ]
  }
];


