# AFM — Africans First Mesh
## Whitepaper v0.4.1

**Website:** http://www.afm.sh
**Ticker:** AFM
**Chain:** Algorand
**Tokens:** AFM-ASA (governance & rewards), DC-ASA (Data Credits)
**Date:** January 2025
**Version:** 0.4.1 (Draft)

A cooperative, people-powered WiFi network for Africa, built by communities and owned by node operators. AFM combines solar-powered satellite backhaul with open mesh WiFi and an Algorand-based burn-and-mint economy to make internet access abundant and affordable.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Vision & Mission](#2-vision--mission)
3. [Glossary](#3-glossary-core-terms)
4. [Architecture Overview](#4-architecture-overview)
5. [Tokenomics](#5-tokenomics)
6. [Presale Structure](#6-presale-structure)
7. [Operator Financing](#7-operator-financing)
8. [Governance](#8-governance)
9. [Technical Implementation](#9-technical-implementation)
10. [Roadmap](#10-roadmap)
11. [Economics & Sustainability](#11-economics--sustainability)
12. [Risks & Mitigations](#12-risks--mitigations)
13. [Team](#13-team)
14. [Attribution](#14-attribution--prior-art)
15. [Appendices](#appendices)

---

## 1) Executive Summary

AFM (Africans First Mesh) is a community-run wireless network that helps neighborhoods bootstrap reliable internet access using affordable, off-grid hardware kits and a token economy aligned to real usage. We adapt proven coverage incentive mechanisms from the DePIN space and re-implement them natively on **Algorand** using **Algorand Standard Assets (ASAs)**, oracles, and lightweight smart contracts.

### The Problem

**2.9 billion people globally lack internet access**, with the majority in Africa. Traditional ISPs won't serve rural and peri-urban communities due to low population density and limited purchasing power. Existing solutions (satellite, mobile data) are either too expensive ($50-100/month) or unreliable.

### The Solution

AFM creates a **cooperative WiFi network** where:
- **Operators** deploy solar-powered hotspots with satellite backhaul (Starlink Mini)
- **Users** pay for data using stable-priced Data Credits (DC-ASA)
- **Community** owns the network through democratic governance
- **Token economics** reward coverage and usage, not speculation

### Key Innovations

1. **Tiered Presale** - Multi-tier, emission-based presale rewards early backers with vested DC
2. **Operator Financing** - $0-$1,500 entry points via Revenue-Share model
3. **Hybrid Governance** - Balances one-member-one-vote with token-weighted decisions
4. **Algorand-Native** - Fast, low-cost, sustainable blockchain infrastructure
5. **Off-Grid First** - Solar + satellite enables deployment anywhere

### Target Metrics (3 Years)

- **Operators:** 350+ node operators across 10 countries
- **Users:** 10,000+ active data consumers
- **Coverage:** 500+ square kilometers of reliable WiFi
- **Economics:** Self-sustaining via burn-and-mint equilibrium

---

## 2) Vision & Mission

### Vision

**Internet access as a human right, owned by the communities it serves.**

Every African community should have access to affordable, reliable internet—not as a service sold by distant corporations, but as a cooperative utility owned and operated by local people.

### Mission

Build a **people-powered WiFi network** across Africa by:

1. **Empowering Operators** - Enable anyone to become an internet service provider with minimal capital
2. **Democratizing Access** - Provide data at cost ($0.00001/DC) without profit extraction
3. **Community Ownership** - Governance by operators and users, not investors
4. **Sustainable Economics** - Rewards tied to coverage and usage, not speculation
5. **Off-Grid Ready** - Deploy anywhere with solar + satellite, no infrastructure required

### Cooperative Principles

AFM is built on the **7 Cooperative Principles** established over 150 years:

1. **Voluntary & Open Membership** - Anyone can join
2. **Democratic Member Control** - One member = one vote
3. **Member Economic Participation** - Surplus returned to members
4. **Autonomy & Independence** - Self-governed, community-controlled
5. **Education, Training, Information** - Invest in operator capacity building
6. **Cooperation Among Cooperatives** - Partner with other cooperatives
7. **Concern for Community** - Sustainable development, environmental responsibility

---

## 3) Glossary (Core Terms)

**AFM (Ticker):** Africans First Mesh; governance/reward token on Algorand

**ASA:** Algorand Standard Asset (Algorand's native fungible/non-fungible token standard)

**AFM-ASA:** The AFM governance/reward token issued as an ASA

**DC-ASA:** Data Credit token (non-transferable use-credit) issued as an ASA; minted only by burning AFM-ASA

**DC Peg:** Fixed fiat-denominated price target per DC-ASA ($0.00001 USD) used to stabilize user pricing

**PoC (Proof-of-Coverage):** Oracle-verified mechanism confirming hotspots are deployed and available

**Oracle:** Off-chain service that performs checks (coverage, usage), posts signed summaries on-chain

**Hotspot NFT (ASA-1):** Hotspot identity represented as an ASA with supply=1 (NFT-style identifier)

**Backhaul:** Upstream internet connection for a hotspot (e.g., Starlink Mini, local ISP, 4G/5G)

**Captive Portal:** Login/top-up page where users acquire DC-ASA and consume service

**PDCR (Presale DC Rights):** Soulbound emission schedule representing vested DC-ASA over time

**Operator:** Individual or cooperative running one or more AFM hotspots

**Revenue-Share Financing:** Treasury-subsidized equipment financing where operators share revenue during payback period

**Membership Council:** Democratic board (one-member-one-vote) controlling operational decisions

**Token Governance:** AFM token-weighted voting for financial and technical decisions

**Notation Standard:** Throughout this whitepaper we write token symbols with their asset type: **AFM-ASA**, **DC-ASA**. Where helpful, we include "(ASA)" on first mention.

---

## 4) Architecture Overview

### 4.1 Base Layer: Algorand

**Why Algorand:**
- **Fast Finality:** 3.3 second block times, immediate transaction confirmation
- **Low Fees:** $0.001 per transaction, sustainable for micropayments
- **High Reliability:** 100% uptime since mainnet launch (2019)
- **Energy Efficient:** Carbon-negative blockchain (critical for solar-powered network)
- **ASA Native:** Built-in token standard, no smart contract complexity for basic tokens
- **Active in Africa:** Growing Algorand developer community across the continent

### 4.2 Token Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ AFM-ASA (Governance & Rewards)                             │
├─────────────────────────────────────────────────────────────┤
│ Type: Fungible ASA                                         │
│ Supply: 3,000,000,000 (3 billion, fixed + 1% tail)        │
│ Decimals: 6                                                 │
│ Use Cases:                                                  │
│ ├─ Governance voting (proposals, parameters)               │
│ ├─ Operator rewards (PoC, data transfer)                  │
│ ├─ Burn to mint DC-ASA (user acquisition)                 │
│ └─ Treasury operations, grants, partnerships               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ DC-ASA (Data Credits)                                       │
├─────────────────────────────────────────────────────────────┤
│ Type: Fungible ASA (non-transferable)                     │
│ Supply: Unlimited (minted via AFM burn)                    │
│ Decimals: 6                                                 │
│ Peg: $0.00001 USD (10,000 DC = $0.10)                     │
│ Use Cases:                                                  │
│ ├─ Pay for network data (burned on use)                   │
│ ├─ Hotspot onboarding fees                                │
│ └─ Operator deposits (slashing collateral)                │
│                                                             │
│ Properties:                                                 │
│ ├─ Non-transferable (clawback enabled, freeze enabled)    │
│ ├─ Burn-only (cannot convert back to AFM-ASA)             │
│ └─ Stable value (predictable user pricing)                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Hotspot NFT (Identity)                                      │
├─────────────────────────────────────────────────────────────┤
│ Type: ASA (supply=1, non-fungible)                        │
│ Properties:                                                 │
│ ├─ Unique ID per physical hotspot                         │
│ ├─ Transferable (equipment ownership transfer)            │
│ └─ Metadata: Location, hardware spec, operator address    │
└─────────────────────────────────────────────────────────────┘
```

### 4.3 Burn-and-Mint Mechanism

**User Flow:**
```
1. User needs internet access
2. User burns AFM-ASA via smart contract
3. Smart contract mints DC-ASA at current peg rate
4. DC-ASA credited to user wallet (non-transferable)
5. User connects to hotspot, consumes data
6. DC-ASA burned proportional to data used
```

**Example:**
```
User wants to purchase $1 worth of data:
├─ DC Peg: $0.00001 per DC
├─ $1 = 100,000 DC-ASA needed
├─ AFM Price: $0.01 (current market)
├─ Burn Amount: $1 ÷ $0.01 = 100 AFM-ASA
└─ User receives: 100,000 DC-ASA (non-transferable)

User consumes 10 GB of data:
├─ Rate: 10,000 DC per GB (set by governance)
├─ Total: 10 GB × 10,000 = 100,000 DC burned
└─ Balance: 0 DC-ASA remaining
```

**Equilibrium Dynamics:**

```
IF DC Burn Value > AFM Emissions Value THEN:
├─ AFM becomes scarce (burned faster than emitted)
├─ AFM price increases
├─ Users burn less AFM for same DC amount
└─ Equilibrium restored

IF DC Burn Value < AFM Emissions Value THEN:
├─ AFM becomes abundant (emitted faster than burned)
├─ AFM price decreases
├─ Users burn more AFM for same DC amount
└─ Equilibrium restored
```

### 4.4 Oracle Architecture

**Oracles perform three critical functions:**

1. **Proof-of-Coverage (PoC)** - Verify hotspots are operational and reachable
2. **Data Metering** - Track data transfer per hotspot for reward distribution
3. **Reward Calculation** - Compute AFM-ASA emissions based on coverage + usage

**Oracle Flow:**
```
Every Epoch (24 hours):

┌─ Oracles ────────────────────────────────────────┐
│                                                   │
│ 1. Heartbeat Checks                              │
│    ├─ Ping each hotspot (is it online?)         │
│    ├─ Challenge random hotspots (prove location) │
│    └─ Record uptime %                            │
│                                                   │
│ 2. Data Collection                                │
│    ├─ Query hotspot usage logs                  │
│    ├─ Validate signatures                        │
│    └─ Aggregate: GB transferred per hotspot     │
│                                                   │
│ 3. Reward Computation                             │
│    ├─ PoC Score: Uptime % × Location factor     │
│    ├─ Transfer Score: GB served × Quality factor│
│    └─ Total Rewards: (PoC × 50%) + (Transfer×50%)│
│                                                   │
│ 4. Submit On-Chain                                │
│    ├─ Sign reward summary (hotspot→AFM mapping) │
│    ├─ Post to Algorand smart contract           │
│    └─ Distribute AFM-ASA to operators           │
│                                                   │
└───────────────────────────────────────────────────┘
```

**Oracle Decentralization (Roadmap):**

- **Phase 0-1:** Single oracle operated by founding team (speed, simplicity)
- **Phase 2:** 3-oracle quorum (2-of-3 consensus required)
- **Phase 3:** 5-oracle network with slashing (stake AFM-ASA, penalized for false reports)
- **Phase 4:** Permissionless oracle network (anyone can run, weighted by stake)

---

## 5) Tokenomics

This section supersedes v0.3 based on comprehensive economic modeling.

### 5.1 Genesis Allocation

**Total Supply:** 3,000,000,000 AFM-ASA (3 billion)

| Allocation | Percent | Amount | Vesting | Unlock Schedule |
|------------|---------|--------|---------|-----------------|
| **Founders** | 5% | 150M | 10 years | 1% immediate (sweat equity), 4% linear over 10 years |
| **Early Investors** | 15% | 450M | 10 years | **Vesting starts Month 12**, linear over 10 years |
| **Treasury Operations** | 4% | 120M | 3 years | Genesis unlock, 3-year operational budget |
| **Treasury Endowment** | 6% | 180M | Perpetual | Locked, yields only (never spend principal) |
| **Mining/Rewards** | 70% | 2,100M | 20 years | Adaptive emission schedule with tail |

**Rationale:**

1. **70% Mining** - Industry best practice (Hivemapper 65%, Helium 35% failure), ensures operators control majority
2. **Investor Vesting Month 12** - Critical lesson from Helium's failure; prevents death spiral during fragile bootstrap
3. **Founder 5%** - Increased from 3% to ensure long-term alignment (still conservative vs crypto 10-20%)
4. **Treasury Split** - Operations (spendable) vs Endowment (perpetual) ensures sustainability
5. **Endowment Model** - Based on university endowments and cooperative reserve funds (80+ year track record)

### 5.2 Emission Schedule

**Adaptive Emissions** - Adjusts based on network health, not fixed halving

```
┌─────────────────────────────────────────────────────────────┐
│ EMISSION FORMULA                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Base Emissions (Year 1-20):                                │
│ ├─ Year 1: 140,000,000 AFM                                 │
│ ├─ Year 2: 126,000,000 AFM (-10%)                          │
│ ├─ Year 3: 113,400,000 AFM (-10%)                          │
│ └─ ... continues with -10% decay annually                  │
│                                                             │
│ Adaptive Component:                                         │
│ IF Median Operator Net Revenue < $100/month THEN:          │
│    Increase emissions by +30% (boost operator income)      │
│ IF Median Operator Net Revenue > $200/month THEN:          │
│    Decrease emissions by -20% (reduce inflation)           │
│                                                             │
│ Tail Emissions (Year 21+):                                 │
│ ├─ Base: 1% of total supply annually (30M AFM/year)       │
│ ├─ Adaptive: ±0.5% based on Median Operator Net Revenue   │
│ └─ Purpose: Prevent post-emission cliff, ensure perpetual  │
│            security budget for network                      │
└─────────────────────────────────────────────────────────────┘
```

**Emission Distribution (Subject to Governance):**

| Recipient | Percentage | Purpose |
|-----------|-----------|---------|
| **PoC Coverage** | 50% | Reward hotspot uptime and location coverage |
| **Data Transfer** | 30% | Reward actual data served to users |
| **Insurance Fund** | 15% | Bear market protection for operators |
| **Oracles** | 5% | Compensate oracle operators |

**Why Tail Emissions:**

Helium's failure mode was the **emissions cliff** - after mining ends, operators have no baseline income, network collapses. Tail emissions ensure perpetual security budget and operator sustainability.

Precedent: Monero (0.6 XMR per block perpetually), Grin (1 GRIN per second perpetually)

### 5.3 Protocol Fee (Treasury Replenishment)

**Problem:** Presale creates DC without AFM buy pressure (structural imbalance)

**Solution:** Protocol fee on all DC burns flows to treasury

```
Protocol Fee: 15% of all DC burns
├─ 10% → AFM Buyback (offsets missing buy pressure)
├─ 5% → Treasury Operations (perpetual funding)

Example (Month 12, 100 hotspots):
├─ DC Burns: 2.2B DC/month
├─ DC Burn Value: 2.2B × $0.00001 = $22,000
├─ Protocol Fee (15%): $3,300/month
│   ├─ AFM Buyback (10%): $2,200 (buy AFM, burn or hold)
│   └─ Operations (5%): $1,100 (USDC for expenses)
└─ Net to Operators: $18,700 (remaining 85%)
```

**Treasury Sustainability:**
- Month 0: $600k reserve (from presale)
- Burn rate: $75k/month (operations)
- Runway: 8 months
- Month 6+: Protocol fees begin ($3-5k/month, growing)
- Month 18+: Self-sustaining (protocol fees cover operations)

### 5.4 Insurance Fund

**Purpose:** Protect operators during AFM price crashes (bear markets)

**Mechanism:**
```
15% of all DC burns → Insurance Fund

Bear Case Trigger: AFM Price < $0.0075 for 90 days

Subsidy Calculation:
IF Operator Net Income < $0 THEN:
├─ Insurance pays shortfall
├─ Operator breaks even (minimum $0/month)
└─ Repayment continues (operators remain solvent)

Example (Bear Case $0.005 AFM):
├─ Operator Revenue: $100/month (halved from base $200)
├─ Operator Share (40%): $40
├─ Operating Costs: $65
├─ Shortfall: $25/month
├─ Insurance Pays: $25
└─ Operator Net: $0 (breakeven maintained)
```

**Reserve Sizing:**
- Phase 0 (10 hotspots): $2,400 (24-month reserve)
- Phase 1 (100 hotspots): $60,000 (24-month reserve)
- Phase 2 (500 hotspots): $300,000 (24-month reserve)

**Accumulation:** Insurance fund builds from 15% allocation, reaches full reserve in 2-4 months at base case AFM price

---

## 6) Presale Structure

### 6.1 Objectives

1. **Bootstrap Capital:** Raise $750,000 for operations and operator financing
2. **Validate Demand:** Prove users want the service before scaling
3. **Create Committed Users:** Presale participants have skin in the game
4. **Convert to Operators:** 25% of presale buyers become node operators
5. **Avoid Speculation:** Soulbound emissions prevent flipping and dumping

### 6.2 Tiered Emission-Based Structure

**NOT a discount model - It's a REWARD model**

Users receive **bonus DC** for early participation, emitted over time with usage caps

**Three Stages (Time-Decay Rewards):**

| Stage | Timing | Reward Multiplier | Emission Period | Example: $100 → DC Value |
|-------|--------|------------------|-----------------|-------------------------|
| **Early Bird** | First 33% | 1.5x (50% bonus) | 24 months | $150 over 24mo |
| **Mid Presale** | Middle 33% | 1.32x (32% bonus) | 18 months | $132 over 18mo |
| **Late Presale** | Final 33% | 1.15x (15% bonus) | 12 months | $115 over 12mo |

**Seven Tier Levels:**

| Tier | Price | Early Bird (50%) | Mid (32%) | Late (15%) |
|------|-------|-----------------|-----------|-----------|
| **Starter** | $10 | $15 / 24mo | $13.20 / 18mo | $11.50 / 12mo |
| **Light** | $100 | $150 / 24mo | $132 / 18mo | $115 / 12mo |
| **Light+** | $150 | $225 / 24mo | $198 / 18mo | $172.50 / 12mo |
| **Medium** | $200 | $300 / 24mo | $264 / 18mo | $230 / 12mo |
| **Medium+** | $300 | $450 / 24mo | $396 / 18mo | $345 / 12mo |
| **Heavy** | $400 | $600 / 24mo | $528 / 18mo | $460 / 12mo |
| **Heavy+** | $600 | $900 / 24mo | $792 / 18mo | $690 / 12mo |

### 6.3 Emission Mechanism (Soulbound)

**NOT transferable NFTs - Direct smart contract emissions**

```
Smart Contract Design:

1. User purchases tier during presale stage
2. Contract records:
   ├─ Wallet address
   ├─ Tier level
   ├─ Stage (Early/Mid/Late)
   ├─ Total DC owed
   ├─ Emission period (12/18/24 months)
   └─ Monthly cap (based on tier)

3. Monthly Batch Process (1st of each month):
   ├─ Contract burns AFM from treasury
   ├─ Contract mints DC-ASA to user addresses
   ├─ Amount: Total DC ÷ Emission Months
   └─ Cap enforced at network layer (not contract)

4. Monthly Caps (Prevents Hoarding):
   ├─ Starter: 0.5 GB/month cap
   ├─ Light: 5 GB/month cap
   ├─ Medium: 10-15 GB/month cap
   └─ Heavy: 20-30 GB/month cap

5. Robin Hood Clause:
   IF DC unused after emission period expires THEN:
   └─ Unused DC donated to cooperative treasury
```

**Example: Heavy+ Early Bird ($600)**

```
Purchase: $600 during Early Bird stage
Reward: 50% bonus = $900 DC total value
Emission: 24 months
Monthly: $900 ÷ 24 = $37.50/month
Monthly Cap: 30 GB

Timeline:
├─ Month 0: Purchase confirmed, recorded
├─ Month 1: Network launches, first DC emission ($37.50 deposited)
├─ Month 2-24: Continued monthly emissions
├─ Month 25: Emission complete
└─ If unused DC remains: Donated to treasury
```

### 6.4 Operator Conversion Bonus

**Goal:** Incentivize presale participants to become node operators

**Bonus Structure:**

Medium+ and Heavy+ tiers eligible for **15% operator bonus** if they commit to deploying a node

**Requirements:**
1. Purchase Medium+ or Heavy+ tier
2. Commit to operator role at time of presale
3. Deploy node within timeline (6-12 months depending on tier):
   - 12mo emission → 6mo deployment deadline
   - 18mo emission → 9mo deployment deadline
   - 24mo emission → 12mo deployment deadline
4. Maintain node uptime for full emission period

**Rewards:**
```
Heavy+ Early Bird Operator:
├─ Base Presale: $600 → $900 DC (50% reward)
├─ Operator Bonus: 15% of $900 = $135 DC
├─ Total: $1,035 DC over 24 months
└─ FREE Equipment Financing (limited 30 spots - see §7)
```

**Forfeiture:**
```
IF operator fails to deploy OR goes offline prematurely THEN:
├─ Forfeit 100% of presale bonus ($300)
├─ Forfeit 100% of operator bonus ($135)
├─ Retain base purchase ($600 DC)
└─ Effectively paid full price (0% reward)
```

### 6.5 Robin Hood Mechanism (FOMO Trap)

**Target:** Non-African speculators who buy Starter tier hoping to flip

**Mechanism:**
1. Starter tier marketed as "Limited Early Bird 50% Reward!"
2. Speculators buy without reading fine print
3. DC is **soulbound** (non-transferable, account-locked)
4. If unused after emission period → **Donated to cooperative treasury**

**Legal Disclosure (Required):**
> "Data Credits (DC) are non-transferable utility tokens for AfriMesh network usage only. DC emissions expire after [24/18/12] months from network launch. Any unused DC balance after expiration will be contributed to the AfriMesh Cooperative Treasury to support network infrastructure and community programs. By participating, you acknowledge that DC has no monetary value and cannot be resold or transferred."

**Expected Impact:**
- 20% of Starter tier buyers = speculators (200 out of 1,000)
- Average unused DC: $13 per buyer
- Total donated: 200 × $13 = $2,600 to cooperative
- Cooperative also keeps the cash: 200 × $10 = $2,000

**Ethical Safeguards:**
1. Clear disclosure in fine print
2. Never claim DC is tradable
3. Educational content explains utility
4. Genuine African users will actually use the network

### 6.6 Presale Revenue Target

**Target: $750,000**

**Expected Distribution:**

| Tier | % of Buyers | Count | Avg Price | Revenue |
|------|-------------|-------|-----------|---------|
| Starter | 25% | 625 | $10 | $6,250 |
| Light/Light+ | 35% | 875 | $125 | $109,375 |
| Medium/Medium+ | 30% | 750 | $250 | $187,500 |
| Heavy/Heavy+ | 10% | 250 | $600 | $150,000 |
| **TOTAL** | **100%** | **2,500** | **$181 avg** | **$453,125** |

**If $750k target (scale up):**
- 3,750 participants
- Average $200/participant
- Operator conversion: 25% of 1,500 Medium+ buyers = 375 operators

**DC Obligations:**
- Average reward multiplier: 1.35x
- Total DC owed: $750k × 1.35 = $1,012,500 DC value
- Emitted over 12-24 months (manageable for treasury)

---

## 7) Operator Financing

### 7.1 The Hardware Cost Barrier

**Problem:** $1,500 equipment cost excludes 95%+ of target population

**Equipment Breakdown:**
```
├─ Radio Unit (CBRS/WiFi): $800
├─ Gateway/Router: $200
├─ Solar Panel + Battery: $300
├─ Installation Materials: $100
└─ Shipping/Logistics: $100
TOTAL: $1,500
```

**Target Population Monthly Income:** $100-300

**Impossible Without Financing:** 5-15 months of income required upfront

### 7.2 Revenue-Share Financing Model

**Partnership between operator and treasury with shared risk/reward**

**Core Structure:**

```
Revenue Split During Repayment:
├─ Operator (USDC): 40%
├─ Repayment Pool: 50%
├─ Treasury Fee: 10%
└─ TOTAL: 100%

Post-Repayment:
└─ Operator keeps: 100% of rewards
```

**Four Financing Tiers:**

| Tier | Operator Pays | Treasury Finances | Payback Period | M1 Cash Flow |
|------|---------------|------------------|----------------|--------------|
| **Tier 1: Zero Down** | $0 | $1,500 | 15 months | +$15/mo |
| **Tier 2: Partial** | $250 | $1,250 | 12.5 months | +$15/mo |
| **Tier 3: Half** | $750 | $750 | 7.5 months | +$15/mo |
| **Tier 4: Full Cash** | $1,500 | $0 | N/A | +$135/mo |

**Example: Tier 2 (Base Case $0.01 AFM)**

```
Month 1-12 (Repayment Phase):
┌─────────────────────────────────────────┐
│ REVENUE                                 │
│ AFM Rewards: 140,000 AFM               │
│ Realized Value: $200                    │
│                                         │
│ DISTRIBUTION                            │
│ → Operator (40%): $80                   │
│ → Repayment (50%): $100                 │
│ → Treasury (10%): $20                   │
│                                         │
│ OPERATOR P&L                            │
│ Cash Received: $80                      │
│ Operating Expenses: -$65                │
│ NET CASH FLOW: +$15/month ✅            │
└─────────────────────────────────────────┘

Payback Timeline:
├─ Debt: $1,250
├─ Monthly Repayment: $100
└─ Paid off: 12.5 months

Month 13+ (Ownership Phase):
├─ Revenue: $200
├─ OpEx: -$65
└─ Operator Net: $135/month
```

**24-Month Economics (Tier 2):**

```
Initial Investment: $250

M1-12 (Repayment):
└─ Net Cash: +$15 × 12 = $180

M13-24 (Ownership):
└─ Net Cash: +$135 × 12 = $1,620

Total Cash: $1,800
Equipment Value: $1,200
Net Worth: $3,000

ROI: 1,000% over 24 months
```

### 7.3 Presale Participant Integration

**Three Paths to Becoming an Operator:**

**Path 1: Heavy+ Early Bird → FREE Financing (LIMITED 30 SPOTS)**

```
Eligibility:
├─ Purchase Heavy+ ($600) during Early Bird stage
├─ Commit to operator role at presale
└─ Deploy within 12 months

What You Get:
├─ $900 DC over 24mo (presale reward)
├─ $135 DC (operator bonus)
├─ FREE Tier 1 financing ($0 upfront, treasury pays $1,500)
└─ 40/50/10 revenue split during 15mo payback

Monthly Cash Flow (M1-15):
├─ Presale DC emission: $37.50/mo (auto-credited)
├─ Operator revenue: $80/mo (40% of $200)
├─ Operating costs: -$65/mo
└─ NET: +$52.50/month ✅

Total Value: $3,975 from $600 investment (563% ROI)
```

**If Oversubscribed:**
- Lottery among Heavy+ Early Bird participants
- Losers receive consolation bonuses (extra DC, priority waitlist, community roles)

**Path 2: Other Presale Participants → Discounted Financing**

```
Discount Based on Tier:
├─ Medium ($200-300): $100 off equipment
├─ Medium+ ($300): $150 off
├─ Heavy ($400): $200 off
└─ Heavy+ ($600): $300 off

Example: Heavy+ Mid Presale
├─ Standard Tier 2: $250 upfront
├─ Heavy+ Discount: -$300
└─ Effective: FREE Tier 1 (but not limited slot)
```

**Path 3: Non-Presale Operators → Standard Financing**

```
Anyone can become an operator:
├─ Tier 1: Limited (first-come after presale)
├─ Tier 2-4: Open
└─ No presale required
```

### 7.4 Capital Allocation

**From $750k Presale:**

```
├─ Operator Financing: $150,000 (20%)
│   ├─ Heavy+ Free (30): $45,000
│   ├─ Tier 1 General (20): $30,000
│   └─ Tier 2 (60): $75,000
│   TOTAL: 110 operators financed
│
└─ Treasury Operations: $600,000 (80%)
    ├─ Monthly burn: $75k/mo
    ├─ Runway: 8 months
    └─ Protocol fees supplement starting M6+
```

**Capital Recycling:**

```
Month 13-15: Tier 2 operators pay off
└─ $75,000 capital recovered

Month 15-18: Tier 1 operators pay off
└─ $75,000 capital recovered

Month 18+: Self-sustaining
└─ Redeploy recycled capital (120 new operators)

3-Year Projection:
├─ Year 1: 110 operators
├─ Year 2: 206 operators (capital recycled)
└─ Year 3: 350 operators (2.33x capital efficiency)
```

### 7.5 Price Sensitivity

**Bear Case ($0.005 AFM):**
```
Operator Revenue: $100/month (halved)
├─ Operator (40%): $40
├─ OpEx: -$65
└─ Net: -$25/month ⚠️

Insurance Fund Activates:
├─ Subsidy: $25/hotspot/month
└─ Operator breaks even

Payback extends: 12.5mo → 25mo (still completes)
```

**Bull Case ($0.025 AFM):**
```
Operator Revenue: $500/month
├─ Operator (40%): $200
├─ OpEx: -$65
└─ Net: +$135/month 🚀

Payback accelerates: 12.5mo → 5mo
24-Month Returns: $8,690 (3,476% ROI!)
```

---

## 8) Governance

### 8.1 Governance Philosophy

AFM governance evolves through **four phases** over 36 months, transitioning from founder-led startup to democratic cooperative.

**Core Principles:**
1. **Progressive Decentralization** - Power transfers gradually as network matures
2. **Operator-First** - Operational decisions controlled by node runners
3. **Token-Holder Protection** - Financial decisions require capital provider approval
4. **African Leadership** - On-ground presence drives strategy
5. **Cooperative Alignment** - Based on 80+ years of proven cooperative governance

### 8.2 Phase 1: Founder-Led (Months 1-12)

**Founding Team:**

**Andrew** - Technical Lead & Tokenomics Architect
- Smart contract development oversight
- Tokenomics design and modeling
- Treasury management (multi-sig)
- International partnerships
- Location: Remote (coordination hub)

**Ifeanyi** - Nigeria Operations Lead & Community Architect
- On-ground operations (Nigeria focus)
- Operator recruitment and training
- Community building and local partnerships
- Regulatory navigation
- Location: Nigeria (boots on the ground)

**Decision-Making:**
```
Joint Authority:
├─ Consensus-based (both founders must agree)
├─ Either founder can veto critical changes
├─ Weekly sync meetings (recorded for transparency)

Treasury: 2-of-3 multi-sig
├─ Andrew
├─ Ifeanyi
└─ Trusted 3rd party (lawyer/advisor)

Spending Limits:
├─ < $10k: Either founder
├─ $10k-50k: Both founders
└─ > $50k: Both founders + 7-day community notice
```

**Why Founder-Led:**
- Speed required for pilot iteration
- Too early for democratic governance (no operator base)
- Founders bear financial risk
- Proven model (all cooperatives start founder-led)

**Transparency:**
- Monthly treasury reports (public)
- Quarterly town halls (Q&A with community)
- Discord/Telegram (daily engagement)

### 8.3 Phase 2: Advisory Council (Months 13-24)

**Advisory Council: 10 Elected Members**

```
Composition:
├─ 7 Operator Representatives (elected by operators)
├─ 2 User Representatives (elected by DC holders)
└─ 1 Community At-Large (open election)

Term: 6 months (staggered: 5 seats every 3 months)

Eligibility (Operators):
├─ Operating hotspot for 3+ months
├─ 90%+ uptime last 90 days
└─ Good standing (no defaults/penalties)
```

**Council Powers (Advisory):**

| Domain | Authority |
|--------|-----------|
| Community Grants | Allocate <$5k/month pool (binding) |
| Training Programs | Design and approve curriculum (binding) |
| Operator Standards | Set requirements, quality benchmarks (binding) |
| Reward Adjustments | Recommend changes (advisory) |
| Expansion Strategy | Recommend new regions (advisory) |

**Founders' Role:**
- Attend all Council meetings
- Explain decisions
- Implement recommendations (unless vetoed)
- Veto power (must provide written rationale)

**Elections:**
- Every 3 months (staggered terms)
- On-chain voting (Algorand)
- Ranked-choice method

### 8.4 Phase 3: Hybrid Governance (Months 25-36)

**Dual-Track Structure:**

```
┌────────────────────────────────────────────┐
│ MEMBERSHIP COUNCIL                        │
│ (One-Member-One-Vote)                      │
├────────────────────────────────────────────┤
│ 9 elected members                          │
│ ├─ 4 Operator Representatives             │
│ ├─ 3 User Representatives                 │
│ ├─ 1 Founder Seat (Ifeanyi, non-voting)  │
│ └─ 1 Community At-Large                   │
│                                            │
│ JURISDICTION:                              │
│ ├─ Operator rewards                       │
│ ├─ DC pricing                             │
│ ├─ Community grants                       │
│ ├─ Standards & requirements               │
│ ├─ Expansion approvals                    │
│ └─ Mission & values                       │
│                                            │
│ Term: 2 years, staggered                  │
│ Voting: Simple majority (5/9)             │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│ TOKEN GOVERNANCE                          │
│ (AFM Token-Weighted)                       │
├────────────────────────────────────────────┤
│ All AFM-ASA holders                        │
│ Voting Power: 1 AFM = 1 vote              │
│ Platform: On-chain (Algorand)             │
│                                            │
│ JURISDICTION:                              │
│ ├─ Treasury spends > 5%                   │
│ ├─ Tokenomics changes                     │
│ ├─ Smart contract upgrades                │
│ ├─ Technical protocol changes             │
│ └─ Investor relations                     │
│                                            │
│ Quorum: 10% of circulating supply        │
│ Pass: >50% of votes cast                 │
│ Timelock: 7 days before execution        │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│ BICAMERAL (Both Required)                │
├────────────────────────────────────────────┤
│ ├─ Constitutional amendments              │
│ ├─ Emergency network actions              │
│ ├─ Protocol forks                         │
│ └─ Dissolving cooperative                 │
│                                            │
│ Threshold:                                 │
│ ├─ Membership Council: 7/9 supermajority │
│ └─ Token Governance: 67% supermajority    │
└────────────────────────────────────────────┘
```

**Founders' Role (Phase 3):**
- **Andrew:** Technical Advisor (non-voting, attends Token Governance)
- **Ifeanyi:** Non-voting Membership Council seat + Operations Advisor
- No executive authority (advisory only)

**Example Decision Flow:**

```
Increase Operator Revenue Share (40% → 45%):
├─ Jurisdiction: Membership Council (operational)
├─ Council votes: 8-1 in favor
├─ Token Governance: Not required
└─ Decision: Implemented by core team

Spend $500k on M-KOPA Partnership:
├─ Jurisdiction: Token Governance (treasury)
├─ Token vote: 62% approve (passes)
├─ Membership Council: Advisory (6-3 favor)
└─ Decision: Execute partnership
```

### 8.5 Phase 4: Mature Cooperative (Month 37+)

**Expanded Governance:**
- Membership Council: 11-15 members (scales with network)
- Regional sub-councils (Nigeria, Kenya, Ghana, etc.)
- Professional management (CEO hired, reports to councils)
- Term limits (max 2 consecutive terms)

**Patronage Dividends:**
```
At year-end, if surplus exists:
├─ 50% to Patronage Dividends
│   ├─ 60% to operators (proportional to data served)
│   └─ 40% to users (proportional to DC burned)
├─ 30% to Reserves (build endowment)
├─ 10% to Community Grants
└─ 10% to Governance Participants
```

**Endowment Fund:**
- Target: $10M principal
- Yield: 4-6% annually
- Use: Operations (reduce reliance on protocol fees)

**Founder Transition:**
- Andrew + Ifeanyi: Emeritus status (optional advisory)
- Founders' vesting complete (10 years)
- Community fully self-governed

### 8.6 Governance Metrics

**Phase 2 Success Criteria:**
- Council election turnout: >60%
- Veto rate: <10%
- Governance training: >200 operators complete

**Phase 3 Success Criteria:**
- Token vote quorum: >10%
- Bicameral consensus: >80%
- Founder advisory usage: <20%

**Phase 4 Success Criteria:**
- Patronage dividends: Distributed annually
- Endowment: >$1M generating yield
- Participation: >30% of members active

---

## 9) Technical Implementation

### 9.1 Off-Grid Hardware Kits

**Equipment Specifications:**

```
HOTSPOT COMPONENTS:
├─ Radio: CBRS/WiFi mesh radio ($800)
├─ Gateway: Raspberry Pi 4 or equivalent SBC ($200)
├─ Solar: 100W panel + 100Ah battery ($300)
├─ Networking: OpenWRT router, antennas
└─ Total: $1,500 per kit

BACKHAUL OPTIONS:
├─ Starlink Mini/Portable (preferred): $599 hardware + $50-100/mo
├─ Local ISP: Varies by region
├─ 4G/5G: Backup only (limited bandwidth)
└─ Future: Community fiber, microwave links
```

**Power System:**
- Solar panel: 100W monocrystalline
- Battery: 100Ah LiFePO4 (2-3 day autonomy)
- Charge controller: MPPT 20A
- Total draw: ~30W (WiFi 15W, Starlink Mini 15W, RPi 5W)
- Runtime: 24/7 with proper battery management

### 9.2 Software Stack

**Node Software (Open Source):**
```
├─ OS: Raspbian / Armbian (Debian-based)
├─ Mesh: OpenWRT + BATMAN-adv protocol
├─ Metering: Custom daemon (tracks data usage)
├─ Captive Portal: Node.js app (DC-ASA payments)
├─ Oracle Client: Reports to central oracle (signed)
└─ Monitoring: Prometheus + Grafana (operator dashboard)
```

**Smart Contracts (Algorand PyTeal):**

1. **AFM-ASA Token Contract** - Standard ASA with governance features
2. **DC-ASA Token Contract** - Non-transferable ASA with burn logic
3. **Burn-and-Mint Contract** - AFM burn → DC mint at peg rate
4. **Presale Emission Contract** - Batch monthly DC deposits
5. **Operator Financing Contract** - Revenue split and payback tracking
6. **Reward Distribution Contract** - Oracle-driven AFM emissions
7. **Governance Contract** - Proposals, voting, execution

### 9.3 Oracle Implementation

**Phase 1 (M1-12): Centralized Oracle**
```
Single oracle operated by founders:
├─ Language: Rust
├─ Database: PostgreSQL
├─ Heartbeat: Every 5 minutes per hotspot
├─ Rewards: Daily batch distribution
└─ Signed with ED25519 key

Data Flow:
1. Hotspot reports metrics (signed)
2. Oracle validates signature
3. Oracle aggregates daily usage
4. Oracle computes rewards (PoC + Transfer)
5. Oracle submits to smart contract
6. Smart contract distributes AFM-ASA
```

**Phase 2 (M13-24): Oracle Quorum**
```
3 oracle operators (2-of-3 consensus):
├─ Founding team (1)
├─ Core team member (1)
└─ Community operator (1)

Consensus: 2 oracles must agree on reward amounts
Disputes: Founders break tie during Phase 2
```

**Phase 3+ (M25+): Decentralized Oracle Network**
```
5+ oracle operators with slashing:
├─ Stake 1M AFM-ASA per oracle
├─ Slash 10% for false reports
├─ Slash 50% for extended downtime
└─ Rewards: 5% of emissions

Anyone can run an oracle (permissionless)
Weight by stake (more stake = more influence)
```

### 9.4 User Flow

**New User Journey:**

```
1. User walks near AFM hotspot
2. WiFi network "AfriMesh-Free" appears
3. User connects (no password)
4. Captive portal loads:
   ├─ "Welcome to AfriMesh!"
   ├─ "Get 1 GB free to try"
   └─ "Create wallet"
5. User creates Algorand wallet (email + password)
6. Free 1 GB (10,000 DC-ASA) credited (marketing budget)
7. User browses, tests network
8. When 1 GB consumed, top-up prompt:
   ├─ Buy DC with mobile money (M-Pesa, Airtel Money)
   ├─ Buy DC with debit card (Stripe)
   └─ Earn DC (refer friends, watch ads)
9. Payment processed → AFM burned → DC minted
10. User continues browsing
```

**Operator Dashboard:**

```
Real-time metrics:
├─ Uptime: 98.7% (last 30 days)
├─ Data Served: 127 GB this month
├─ Revenue: $143.50 AFM rewards + $67.25 DC top-ups
├─ Expenses: $65 (backhaul + power)
├─ Net Profit: $145.75
├─ Payback Progress: 67% ($837.50 / $1,250)
└─ Next Payout: 23 hours (daily distribution)
```

---

## 10) Roadmap

### Phase 0: Foundation (Months 0-3)

**Objectives:**
- Finalize whitepaper and economics
- Deploy smart contracts on Algorand testnet
- Build 10 hardware kits
- Launch website + waitlist

**Deliverables:**
- ✅ Whitepaper v0.4 (this document)
- ⏳ Smart contracts (PyTeal implementation)
- ⏳ Hardware prototypes (2 units tested)
- ⏳ Website with presale signup
- ⏳ Treasury multi-sig setup

**Team:**
- Andrew + Ifeanyi (founders)
- 2 smart contract developers (contractors)
- 1 community manager
- Budget: Founder capital ($20k)

### Phase 1: Pilot (Months 4-6)

**Objectives:**
- Deploy 10 hotspots in Nigeria (Lagos, Abuja, Port Harcourt)
- Validate technical feasibility
- Measure operator economics
- Gather community feedback

**Deliverables:**
- 10 operational hotspots (95%+ uptime)
- 50-100 active users
- Real data: operator revenue, user demand, network performance
- Case studies (video testimonials)

**Team:**
- Founders + 2 engineers
- 1 field coordinator (Nigeria)
- 10 pilot operators (recruited locally)
- Budget: $50k (hardware + backhaul + labor)

**Success Criteria:**
- Operator profitability: >$100/month average
- User satisfaction: >8/10 (survey)
- Technical uptime: >90%

### Phase 2: Testnet Scale (Months 7-12)

**Objectives:**
- Launch presale ($750k target)
- Scale to 100 hotspots
- Activate insurance fund
- Form Advisory Council

**Deliverables:**
- Presale complete: 2,500-3,750 participants
- 100 hotspots deployed (70 Revenue-Share financed)
- Treasury: $600k operational reserve
- Advisory Council seated (10 members)
- Governance education (200 operators trained)

**Team:**
- Core team: 8 people (engineers, ops, community)
- Advisory Council: 10 elected
- 100 operators (30 Heavy+ Free, 70 Revenue-Share)
- Budget: $150k operations + $150k operator financing

**Success Criteria:**
- Presale $750k raised
- 85%+ operator retention
- Treasury breakeven by Month 11 (capital recycling)
- Advisory Council active (bi-weekly meetings)

### Phase 3: Mainnet Launch (Months 13-24)

**Objectives:**
- Achieve self-sustainability
- Scale to 200+ hotspots
- Transition to Hybrid Governance
- Expand to 3 countries (Nigeria, Kenya, Ghana)

**Deliverables:**
- 206 hotspots (capital recycled)
- Hybrid Governance launched (M25)
- M-KOPA partnership (100 additional operators)
- Regional sub-councils (3 countries)
- Patronage dividends (first distribution)

**Team:**
- Core team: 12 people
- Membership Council: 9 elected
- Token Governance: Active (quarterly votes)
- 300+ operators
- Budget: Self-sustaining (protocol fees cover operations)

**Success Criteria:**
- Treasury self-sustaining (protocol fees ≥ burn rate)
- Governance participation: >10% token votes, >60% council elections
- Operator median income: >$120/month
- 3 countries operational

### Phase 4: Scale & Mature (Months 25-36)

**Objectives:**
- Scale to 500+ hotspots
- Expand to 10 countries
- Build $1M endowment
- Transition to Phase 4 governance

**Deliverables:**
- 500+ hotspots
- 10+ countries
- Endowment fund: $1M+ (generating $40-60k/year yield)
- Cooperative federation (partner with other DePIN/cooperatives)
- Founders transition to emeritus roles

**Team:**
- Professional management: CEO + executives
- Membership Council: 11 members
- 20-30 person organization
- 500+ operators, 10,000+ users
- Budget: $2M+ annual (from protocol fees, endowment yield, grants)

**Success Criteria:**
- Network profitability: Operators earn >$150/month median
- Patronage dividends: >$50/operator/year
- Governance: >30% member participation
- Impact: 10,000+ people with affordable internet

---

## 11) Economics & Sustainability

### 11.1 Unit Economics (Base Case)

**Operator (20 GB/month data served):**
```
Revenue:
├─ AFM Rewards: 140,000 AFM × $0.01 = $1,400 (theoretical)
├─ Conservative Realized: $200/month (accounts for slippage, liquidity)
└─ Revenue Share (40% during payback): $80/month

Expenses:
├─ Backhaul (Starlink): $30/month
├─ Power (solar maintenance): $15/month
├─ Mobile money fees (2%): $4/month
├─ Misc/contingency: $16/month
└─ Total OpEx: $65/month

Profit:
├─ During Repayment (15mo): $80 - $65 = $15/month
├─ Post-Ownership: $200 - $65 = $135/month
└─ Annual (Year 2+): $135 × 12 = $1,620/year

ROI (Tier 2):
├─ Initial Investment: $250
├─ 24-Month Net Worth: $3,000 (cash + equipment)
└─ ROI: 1,000%
```

**Treasury (100 hotspots):**
```
Presale Revenue: $750,000
├─ Operator Financing: $150,000 (110 operators)
└─ Operations Reserve: $600,000

Monthly Cash Flows (M12 steady state):
├─ Inflows: Repayments $11,000/mo + Protocol fees $3,000/mo
├─ Outflows: Operations $75,000/mo
└─ Net: -$61,000/mo (drawing down reserves)

Sustainability Timeline:
├─ M1-6: Drawing reserves (-$75k/mo)
├─ M6-12: Protocol fees begin (+$3k/mo growing)
├─ M12: Repayments peak (+$11k/mo)
├─ M18: Capital fully recycled ($150k returned)
└─ M24+: Self-sustaining (protocol fees + recycled capital cover operations)
```

**User (17 GB/month average):**
```
Cost:
├─ Data Usage: 17 GB × 10,000 DC/GB = 170,000 DC
├─ DC Value: 170,000 × $0.00001 = $1.70/month
└─ Annual: $20.40/year

Comparison:
├─ Starlink Direct: $50-100/month ($600-1,200/year)
├─ Mobile Data (Nigeria): $30-50/month ($360-600/year)
├─ AfriMesh: $20.40/year
└─ Savings: 95-97% vs alternatives
```

### 11.2 Break-Even Analysis

**Operator Breakeven:**
```
Minimum Revenue to Cover Costs:
├─ OpEx: $65/month
├─ Revenue Share: 40%
├─ Required Revenue: $65 ÷ 40% = $162.50/month

AFM Price at Breakeven:
├─ Rewards: 140,000 AFM/month
├─ Required Revenue: $162.50
├─ AFM Price: $162.50 ÷ 140,000 = $0.00116

Critical Threshold: AFM must be >$0.00116 for operators to break even
Base Case ($0.01): 8.6x safety margin
```

**Treasury Breakeven:**
```
Monthly Operations: $75,000
Sources:
├─ Protocol fees (100 hotspots): $3,300/mo (at base case)
├─ Growing to: $62,500/mo at 500 hotspots
└─ Endowment yield: $0 (Year 1-2), $40k/mo (Year 5+)

Breakeven Hotspot Count:
├─ Required fees: $75,000/mo
├─ Per hotspot: ~$330/mo protocol fees
├─ Hotspots needed: $75k ÷ $330 = 227
└─ Achieved: Month 18-24
```

### 11.3 Sensitivity Analysis

**AFM Price Scenarios:**

| AFM Price | Operator Revenue | Operator Net | Treasury Impact |
|-----------|-----------------|--------------|-----------------|
| $0.001 | $20/mo | -$45/mo ❌ | Insurance pays $45/operator/mo |
| $0.005 | $100/mo | $0/mo ⚠️ | Insurance pays $25/operator/mo |
| $0.01 (base) | $200/mo | $80/mo ✅ | Healthy, no subsidies needed |
| $0.025 | $500/mo | $200/mo 🚀 | Accelerated payback (5 months) |
| $0.05 | $1,000/mo | $400/mo 🚀 | Operators highly profitable |

**Data Usage Scenarios:**

| Data/Hotspot | DC Burns | AFM Rewards | Operator Revenue |
|--------------|----------|-------------|------------------|
| 5 GB/mo | 50k | 35k AFM | $59/mo (break even) |
| 10 GB/mo | 100k | 70k AFM | $119/mo ✅ |
| 20 GB/mo (base) | 200k | 140k AFM | $200/mo ✅ |
| 30 GB/mo | 300k | 210k AFM | $357/mo 🚀 |
| 50 GB/mo | 500k | 350k AFM | $595/mo 🚀 |

---

## 12) Risks & Mitigations

### 12.1 Technical Risks

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| **Oracle Failure** | Critical | Low (10%) | Redundant oracles (M13+), slashing, audits |
| **Smart Contract Bug** | Critical | Low (5%) | Audits, testnet, bug bounties, timelock upgrades |
| **Equipment Failure** | Medium | Medium (20%) | 2-year warranty, insurance fund, spare parts inventory |
| **Power Outage** | Medium | Medium (30%) | Battery autonomy (2-3 days), grid/genset fallback |
| **Backhaul Downtime** | High | Low (15%) | Starlink 99%+ uptime, ISP fallback, 4G backup |

### 12.2 Economic Risks

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| **AFM Price Crash** | Critical | Medium (30%) | Insurance fund (15%, 24mo reserve), adaptive emissions |
| **Low Data Demand** | High | Medium (40%) | Conservative assumptions (20GB), presale = guaranteed users |
| **Operator Default** | Medium | Low (5%) | Community vouching, $250 down payment, GPS tracking |
| **Treasury Depletion** | Critical | Low (10%) | $600k reserve (8mo), capital recycling, protocol fees |
| **Regulatory Ban** | High | Low (15%) | Spectrum licensing, legal compliance, cooperative structure |

### 12.3 Governance Risks

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| **Low Voter Turnout** | Medium | Medium (40%) | Voting incentives, education, delegation |
| **Council Capture** | High | Low (15%) | Term limits, staggered elections, transparency |
| **Plutocracy** | High | Medium (35%) | Membership Council veto, quadratic voting |
| **Founder-Council Conflict** | Medium | Medium (30%) | Clear jurisdictions, mediation process |

### 12.4 Operational Risks

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| **Equipment Theft** | High | Low (5%) | GPS tracking, remote disable, community accountability |
| **Fraud (Fake Coverage)** | High | Low (10%) | PoC challenges, oracle verification, slashing |
| **Currency Risk** | Medium | High (60%) | USDC operator payments, DC peg stability |
| **M-KOPA Failure** | Medium | Low (20%) | Backup partners (Tala, Branch), not critical path |

---

## 13) Team

### 13.1 Founding Team

**Andrew** - Co-Founder, Technical Lead
- Smart contract architecture and tokenomics design
- Background: [TBD - add credentials]
- Location: Remote (coordination hub)
- Allocation: 2.5% AFM-ASA (75M tokens, 10-year vesting)

**Ifeanyi** - Co-Founder, Nigeria Operations Lead
- On-ground operations, community building, regulatory navigation
- Background: [TBD - add credentials]
- Location: Nigeria (Lagos/Abuja)
- Allocation: 2.5% AFM-ASA (75M tokens, 10-year vesting)
- **Critical Role:** Boots on the ground, cultural bridge, operator community trust

### 13.2 Advisors

**Tokenomics Advisor** - [TBD]
**Legal Counsel** - [TBD - Cooperative law + Nigerian telecom regulation]
**Hardware Partner** - [TBD - Starlink reseller, solar suppliers]

### 13.3 Core Team (M4+)

- Smart Contract Engineer (Algorand/PyTeal)
- Backend Engineer (Oracle, API)
- Frontend Engineer (Dashboard, Captive Portal)
- Community Manager (Discord, Telegram, education)
- Operations Coordinator (Nigeria-based, works with Ifeanyi)
- Governance Facilitator (M13+, coordinates Advisory Council)

---

## 14) Attribution & Prior Art

AFM acknowledges the pioneering work of:

**Helium Network** - Tokenized coverage incentives, Data Credits, PoC mechanisms
**Hivemapper** - Presale-first revenue model, quality-over-quantity approach
**GEODNET** - Adaptive emissions based on network density
**Guifi.net** - Cooperative WiFi network (38,000 nodes, 20 years, no token)
**Rural Electric Cooperatives** - 80+ years of democratic utility governance

We adapt these concepts to Algorand and a WiFi + satellite-backhauled, solar-powered context to better serve African communities.

**Key Differentiators:**

1. **Algorand-Native** (vs Helium's Solana migration)
2. **Cooperative Governance** (vs VC-controlled)
3. **Off-Grid First** (solar + satellite)
4. **Africa-Focused** (not global from day 1)
5. **Operator Financing** (Revenue-Share vs purchase-only)
6. **Emission-Based Presale** (vs transferable NFTs)

---

## Appendices

### Appendix A: Token Allocation Table

| Allocation | Percent | Amount | Vesting | Notes |
|------------|---------|--------|---------|-------|
| **Founders** | 5% | 150M | 10 years | 1% immediate, 4% linear |
| **Early Investors** | 15% | 450M | 10 years | Starts Month 12, linear |
| **Treasury Operations** | 4% | 120M | 3 years | Genesis unlock |
| **Treasury Endowment** | 6% | 180M | Perpetual | Locked, yields only |
| **Mining/Rewards** | 70% | 2,100M | 20 years | Adaptive emissions |

### Appendix B: Emission Schedule (Years 1-5)

| Year | AFM Emitted | Cumulative | % of Total | Notes |
|------|-------------|------------|------------|-------|
| 1 | 140,000,000 | 140M | 4.67% | Bootstrap year |
| 2 | 126,000,000 | 266M | 8.87% | -10% decay |
| 3 | 113,400,000 | 379.4M | 12.65% | -10% decay |
| 4 | 102,060,000 | 481.46M | 16.05% | -10% decay |
| 5 | 91,854,000 | 573.31M | 19.11% | -10% decay |

Full 20-year schedule emits ~2,100M AFM (70% of supply)

### Appendix C: Presale DC Obligations (Example)

**Scenario: $750k raised, 3,750 participants**

| Stage | Revenue | Reward | DC Owed |
|-------|---------|--------|---------|
| Early Bird (40%) | $300k | 1.5x | $450k |
| Mid (35%) | $262.5k | 1.32x | $346.5k |
| Late (25%) | $187.5k | 1.15x | $215.6k |
| **TOTAL** | **$750k** | **1.35x avg** | **$1,012.1k** |

Treasury will burn $1,012,100 worth of AFM over 12-24 months to fulfill obligations

### Appendix D: Revenue-Share Cash Flow (Tier 2)

**Assumptions:** $250 upfront, 40/50/10 split, $0.01 AFM, $200/mo revenue

| Month | Revenue | Operator (40%) | Repayment (50%) | Treasury (10%) | OpEx | Net | Debt Remaining |
|-------|---------|---------------|----------------|---------------|------|-----|----------------|
| 0 | - | - | - | - | -$250 | -$250 | $1,250 |
| 1 | $200 | $80 | $100 | $20 | -$65 | $15 | $1,150 |
| 6 | $200 | $80 | $100 | $20 | -$65 | $15 | $650 |
| 12 | $200 | $80 | $100 | $20 | -$65 | $15 | $50 |
| 13 | $200 | $200 | $0 | $0 | -$65 | $135 | $0 ✅ |
| 24 | $200 | $200 | $0 | $0 | -$65 | $135 | - |

**24-Month Total:** $1,800 cash + $1,200 equipment = $3,000 net worth

### Appendix E: Governance Timeline

| Month | Phase | Structure | Key Events |
|-------|-------|-----------|------------|
| M1-12 | Founder-Led | Andrew + Ifeanyi executive | Pilot, presale, scale to 100 |
| M13 | Transition | First elections | Advisory Council seated (10 members) |
| M13-24 | Advisory Council | Council advises, founders execute | Capital recycling, M-KOPA partnership |
| M25 | Transition | Governance launch | Hybrid structure begins |
| M25-36 | Hybrid Governance | Membership + Token councils | Scale to 500, achieve sustainability |
| M37+ | Mature Cooperative | Expanded councils, professional mgmt | 1,000+ hotspots, 10+ countries |

### Appendix F: Glossary of Acronyms

| Acronym | Full Term | Definition |
|---------|-----------|------------|
| AFM | Africans First Mesh | Network name and token ticker |
| ASA | Algorand Standard Asset | Algorand's native token standard |
| DC | Data Credits | Non-transferable usage credits |
| PoC | Proof-of-Coverage | Oracle verification of hotspot operation |
| PDCR | Presale DC Rights | Soulbound emission schedule for presale buyers |
| OpEx | Operating Expenses | Monthly costs to run a hotspot |
| ROI | Return on Investment | Profit divided by initial investment |
| USDC | USD Coin | Stablecoin pegged to US dollar |

### Appendix G: References & Further Reading

1. Helium Network Documentation: https://docs.helium.com
2. Algorand Developer Docs: https://developer.algorand.org
3. Guifi.net Open Network Agreement: https://guifi.net/en/ONA
4. Rural Electric Cooperatives: NRECA.coop
5. Cooperative Principles: ICA.coop
6. DePIN Research: Messari.io/DePIN

---

## Conclusion

AfriMesh represents a new model for connectivity infrastructure: **community-owned, cooperative-governed, and economically sustainable**.

By combining proven DePIN mechanisms (coverage incentives, burn-and-mint economics) with time-tested cooperative principles (democratic governance, patronage dividends), we create a network that truly serves its users rather than extracting from them.

**Our Vision:** Internet access as a human right, owned by the communities it serves.

**Our Mission:** Deploy 1,000+ solar-powered WiFi hotspots across 10 African countries, providing affordable internet to 100,000+ people by 2027.

**Our Commitment:** Remain true to cooperative principles even as we scale, ensuring AFM is always controlled by operators and users, never by distant investors or corporations.

---

**Join us in building the future of African connectivity.**

**Website:** http://www.afm.sh
**Discord:** [TBD]
**Telegram:** [TBD]
**GitHub:** [TBD]

---

**Version:** 0.4.1 (Draft)
**Date:** January 2025
**Authors:** Andrew, Ifeanyi
**License:** Creative Commons Attribution-ShareAlike 4.0 International

**END OF WHITEPAPER**
