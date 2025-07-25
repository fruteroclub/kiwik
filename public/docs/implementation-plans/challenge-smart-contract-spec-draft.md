# Challenge Smart Contract Specification

## Contract Architecture

### Core Contracts

#### 1. `ChallengeRegistry.sol`
**Purpose**: Central registry for all challenges and participants
**Key Functions**:
- `createChallenge(Challenge calldata challenge)` - Admin creates new challenge
- `registerForChallenge(uint256 challengeId)` - Builder applies to challenge
- `commitToChallenge(uint256 challengeId)` - Builder receives commitment NFT
- `submitDeliverable(uint256 challengeId, uint256 deliverableId, string calldata content)`
- `completeChallenge(uint256 challengeId, address participant)` - Admin marks complete
- `awardProofNFT(uint256 challengeId, address participant, string calldata tokenURI)`

**State Variables**:
```solidity
struct Challenge {
    uint256 id;
    string title;
    string description;
    uint8 category; // enum ChallengeCategory
    uint8 level;    // enum ChallengeLevel
    uint256 duration; // days
    uint256 maxParticipants;
    uint256 minCommitmentScore;
    address admin;
    uint256 createdAt;
    bool active;
}

struct Participant {
    address wallet;
    uint256 challengeId;
    uint8 status; // enum ParticipantStatus
    uint256 appliedAt;
    uint256 commitmentNFTId;
    uint256 proofNFTId;
    uint256 progressScore;
    uint256 finalScore;
}

mapping(uint256 => Challenge) public challenges;
mapping(address => mapping(uint256 => Participant)) public participants;
mapping(uint256 => uint256) public challengeParticipantCount;
```

#### 2. `CommitmentNFT.sol` (ERC721)
**Purpose**: NFTs representing commitment to challenges
**Features**:
- Soulbound (non-transferable) commitment tokens
- Metadata includes challenge info and commitment date
- Burned when challenge completed or abandoned

#### 3. `ProofNFT.sol` (ERC721)
**Purpose**: NFTs representing completed skills/proofs
**Features**:
- Transferable skill certificates
- Rich metadata with skill details and verification
- Compatible with external curriculum systems
- Potential future marketplace integration

#### 4. `BuilderProfile.sol`
**Purpose**: On-chain builder profile and skill tracking
**Key Functions**:
- `updateSkillLevel(string calldata skill, uint256 level)`
- `getCurriculumScore(address builder)` - Returns weighted skill score
- `getCompletedChallenges(address builder)` - Returns challenge history
- `getBadges(address builder)` - Returns achievement NFTs

### Integration Points

#### Existing ProofOfVerano Integration
```solidity
// Bridge existing bootcamp system
contract ProofOfVeranoBridge {
    function migrateToChallengeSystem(address student) external {
        // Convert existing bootcamp completion to challenge completion
        // Award equivalent skill NFTs
        // Update builder profile
    }
}
```

#### Farcaster Integration
- Store Farcaster FID in participant data
- Emit events for social accountability
- Link progress updates to cast hashes

## Implementation Phases

### Phase 1: Core Challenge System
- Deploy ChallengeRegistry with basic functionality
- Create first challenge: "Web3 Builder Fundamentals"
- Implement commitment NFT flow
- Basic UI for challenge discovery and registration

### Phase 2: Proof System
- Deploy ProofNFT contract
- Implement completion verification flow
- Add admin dashboard for challenge management
- Community verification features

### Phase 3: Builder Profiles
- Deploy BuilderProfile contract
- Skill tracking and curriculum scoring
- Achievement system and badges
- Portfolio integration

### Phase 4: Advanced Features
- Challenge templates and creation tools
- Community-driven challenge proposals
- Integration with external learning platforms
- Marketplace for proof NFTs

## Technical Considerations

### Gas Optimization
- Use struct packing for storage efficiency
- Batch operations where possible
- Consider L2 deployment (Base) for lower costs

### Security
- Role-based access control for admin functions
- Reentrancy guards on critical functions
- Input validation and sanitization
- Emergency pause functionality

### Upgradability
- Use proxy pattern for core contracts
- Separate logic and storage contracts
- Version migration strategies

### Integration
- Events for off-chain indexing
- Standard interfaces for external integration
- API-compatible data structures

## Example Challenge Flow

1. **Admin Creates Challenge**
   ```solidity
   createChallenge({
     title: "Build a DeFi Dashboard",
     category: TECHNICAL,
     level: INTERMEDIATE,
     duration: 14 days,
     maxParticipants: 50
   })
   ```

2. **Builder Registers**
   ```solidity
   registerForChallenge(challengeId)
   // Sets status to APPLIED
   ```

3. **Builder Commits**
   ```solidity
   commitToChallenge(challengeId)
   // Mints commitment NFT
   // Sets status to COMMITTED
   // Starts challenge timer
   ```

4. **Builder Progresses**
   ```solidity
   submitDeliverable(challengeId, deliverableId, "https://github.com/...")
   // Updates progress score
   // Emits progress event for Farcaster
   ```

5. **Admin Completes**
   ```solidity
   completeChallenge(challengeId, builderAddress)
   // Burns commitment NFT
   // Sets status to COMPLETED
   ```

6. **Award Proof NFT**
   ```solidity
   awardProofNFT(challengeId, builderAddress, tokenURI)
   // Mints proof NFT with skill metadata
   // Updates builder profile
   // Emits curriculum update event
   ```

This architecture provides a scalable foundation for challenge-based builder onboarding while maintaining compatibility with the existing Verano bootcamp system.