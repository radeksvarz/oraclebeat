Alright, here's the complete `architecture.md` file for your Oracle Beat project, incorporating all the discussed details, including the secure Real-time Data Proxy Backend, Vercel deployment, Vercel KV, and the corrected Mermaid diagram syntax.

---

# Architecture for Oracle Beat Application

## 1. Overview

Oracle Beat is a Web3-native application built on **scaffold-eth2** that provides real-time and historical price data comparisons between existing Web3 oracles and traditional financial data sources. Real-time Web3 oracle data will be fetched directly by the frontend, while real-time traditional financial data will be fetched via a dedicated small backend proxy to ensure API key security. Historical data will be served by the main Vercel-hosted backend from a key-value cache. The application also features detailed source comparisons, individual provider insights, and a gamified Merits system integrated via API with Blockscout. The entire application's primary components will be deployed on Vercel.

---

## 2. Core Technologies

* **Frontend Framework:** React (part of `scaffold-eth2`)
* **Main Backend (Historical Data):** Vercel Serverless Functions (e.g., Next.js API Routes)
* **Real-time Data Proxy Backend (Traditional APIs):** Vercel Serverless Functions (e.g., Next.js API Routes / dedicated functions)
* **Historical Data Storage:** Vercel KV (Redis-compatible Key-Value Cache)
* **Blockchain Interaction (Frontend Direct Read for Real-time):** `wagmi` hooks, `ethers.js`
* **Traditional API Interaction (via Proxy Backend):** `fetch` API / client-side HTTP libraries (frontend to proxy), Node.js `fetch` (proxy to external API)
* **State Management:** React Context API or Zustand/Jotai (recommended for `scaffold-eth2`)
* **Charting Library:** Recharts, Chart.js, or ApexCharts (for interactive time-series data)
* **Styling:** Chakra UI (part of `scaffold-eth2`)
* **Web3 Wallet Connection:** WalletConnect (via `wagmi`)
* **Blockchain Explorer & Merits API:** Blockscout (direct linking and API consumption)

---

## 3. Architecture Diagram (Conceptual)

```mermaid
graph TD
    User(User) --> |"Web Browser"| Frontend("Oracle Beat Frontend - Next.js")

    Frontend --> |"Web3 RPC / wagmi (Direct Read - Real-time)"| ExistingOracles("Existing Web3 Oracle Smart Contracts")
    Frontend --> |"API Calls (Real-time Traditional)"| RtProxyBE("Real-time Data Proxy Backend - Vercel")
    RtProxyBE --> |"External API Calls (Secured Keys)"| TraditionalAPIs("Traditional Financial APIs")

    Frontend --> |"API Calls (Historical Data)"| MainBE("Main Backend - Vercel Serverless Functions")
    MainBE --> |"Read/Write"| VercelKV("Historical Data Cache - Vercel KV")
    MainBE --> |"Web3 RPC / ethers.js (for ingestion)"| ExistingOracles
    MainBE --> |"External API Calls (for ingestion)"| TraditionalAPIs

    Frontend --> |"Blockscout Merits API"| BlockscoutMerits("Blockscout Merits API")
    Frontend --> |"Direct Link"| BlockscoutExplorer("Blockscout Explorer")

    subgraph Data Flow
        ExistingOracles --"Real-time Price Data (on-chain)"--> Frontend
        TraditionalAPIs --"Real-time Price Data (via proxy)"--> RtProxyBE
        RtProxyBE --"Real-time Price Data"--> Frontend

        MainBE --"Store/Retrieve Processed Data"--> VercelKV
        VercelKV --"Historical Data"--> MainBE
        MainBE --"Historical Data"--> Frontend
        MainBE --"Periodic Ingestion Trigger"--> MainBE --"Fetches from Oracles/APIs"--> VercelKV
    end

    subgraph "Merits System (External)"
        User --"Confirm Deviation / Add Insight"--> Frontend
        Frontend --"API Call"--> BlockscoutMerits
        BlockscoutMerits --"Aggregated Merits Data"--> Frontend
    end
```

---

## 4. Component Breakdown and Integrations

### 4.1 Frontend (`scaffold-eth2` / Next.js / React)

This is the primary user interface, serving as the user's direct interaction point with Oracle Beat.

* **User Authentication:** Handled via **WalletConnect** using `wagmi` hooks, allowing seamless Web3 wallet connection.
* **Asset Pair Selection (Step 1):** Provides intuitive dropdowns/autocomplete for users to select asset pairs. The list of available data sources updates dynamically based on this selection.
* **Flexible Source Selection (Step 2):** Users can select multiple data sources (Web3 Oracles, Traditional APIs) for comparison using checkboxes or multi-select dropdowns.
* **Main Comparison Page:**
    * **Real-time Rates/Prices Display:**
        * **Web3 Oracles:** The frontend directly uses `wagmi` hooks to read the latest price data from existing on-chain oracle smart contracts (e.g., Chainlink, Pyth).
        * **Traditional APIs:** The frontend makes API calls to the **Real-time Data Proxy Backend**. This proxy securely fetches the data from the external traditional API using its protected API key and returns it to the frontend.
    * **Base Source Selection & Deviation Display:** The frontend calculates and displays absolute and percentage deviations, including pairwise deviations, directly on the client side.
    * **Interactive Historical Graph:** Fetches historical data from the **Main Backend**. The amount of data available depends on the Vercel KV cache's capacity and retention policies, meaning very long historical periods might have limitations.
    * **Historical Statistics Summary:** Calculates and displays key statistics (average, min, max, deviation) from the fetched historical data.
    * **Real-time Deviation Detection (Client-side):** If real-time alerts are needed, the frontend will implement its own detection logic by comparing the directly fetched real-time data streams.
    * **Merits Integration:** Direct **API calls to the Blockscout Merits API** are made from the frontend when users confirm deviations or add historical insights.
* **Source Comparison Matrix:** Displays a tabular comparison of data source characteristics, fetching data from the Main Backend.
* **Individual Data Source Detail Pages:** Provides in-depth information about each provider, including a dedicated historical graph and the "Social Feedback View."
* **Social Feedback View (Merits Integration):** Fetches aggregated Merits data for specific oracles directly from the **Blockscout Merits API**, displaying top asset pairs and recent user insights.
* **Blockscout Links:** All links leading to an explorer (e.g., transaction details, contract addresses) are direct `<a>` tags pointing to Blockscout URLs.
* **Sharing Functionality:** Generates unique, parameterized URLs to recreate specific comparison setups, enabling easy social sharing.
* **User Experience & Interface Design:** Emphasizes a modern, clean UI built with Chakra UI, prioritizing clarity, responsiveness, and performance.
* **Merits Display/Notifications:** Displays the user's Merits balance (fetched from Blockscout Merits API) and provides in-app notifications for earned Merits.

### 4.2 Main Backend (Vercel Serverless Functions / Next.js API Routes)

This backend's primary role is to serve historical data and manage its ingestion into the cache. It will be deployed as serverless functions on Vercel.

* **API Layer:** Exposes RESTful API endpoints for the frontend:
    * `/api/v1/asset-pairs`: Provides a list of supported asset pairs.
    * `/api/v1/sources?assetPair=<pair>`: Returns data source details supporting a given asset pair.
    * `/api/v1/price/history?assetPair=<pair>&sources=<sources>&startDate=<date>&endDate=<date>`: Delivers historical price data.
* **Historical Data Ingestion & Retrieval Layer:**
    * **Vercel KV:** Serves as the high-performance, Redis-compatible key-value cache for historical price data.
    * **Ingestion Strategy:** Given the serverless environment, data ingestion into Vercel KV will be triggered periodically by **Vercel Cron Jobs**. These jobs will execute dedicated serverless functions that fetch the latest historical data from Web3 oracles (using `ethers.js`) and Traditional APIs (using their securely stored API keys), normalize it, and store it efficiently in Vercel KV. On-demand caching for cache misses is also a possibility.
    * **Data Persistence:** While Vercel KV offers speed, it is a cache. Long-term data persistence for very deep historical analysis (e.g., beyond a few months) might require a dedicated, more robust database in a future iteration, depending on requirements and data volume.

### 4.3 Real-time Data Proxy Backend (Vercel Serverless Functions)

This is a **dedicated, lightweight backend** specifically designed to secure and proxy requests to sensitive traditional financial data APIs for real-time data.

* **Purpose:** To prevent the exposure of confidential API keys directly in the frontend code.
* **Deployment:** Composed of one or more lightweight Vercel Serverless Functions.
* **Functionality:**
    * Exposes a simple API endpoint (e.g., `/api/proxy/realtime-price`).
    * Receives real-time data requests from the frontend (e.g., for a specific `assetPair` and `sourceId`).
    * Securely retrieves the necessary API key from its Vercel Environment Variables.
    * Forwards the request to the actual external traditional API.
    * Returns the received data from the traditional API back to the frontend.

### 4.4 External Integrations

* **Existing Web3 Oracle Networks:** Directly interacted with by the frontend for real-time data, and by the Main Backend for historical data ingestion.
* **Traditional Financial Data APIs:** Accessed by the Real-time Data Proxy Backend for real-time data, and by the Main Backend for historical data ingestion. API keys are securely stored within these respective backends.
* **Blockscout Explorer:** Direct linking from the frontend, ensuring consistency and transparency in Web3 transactions and contract details.
* **Blockscout Merits API:** The central point for all Merits-related interactions, accessed directly by the frontend.

---

## 5. Data Flow and Life Cycle

1.  **User Onboarding:** User connects their Web3 wallet via WalletConnect.
2.  **Asset Pair & Source Selection:** The frontend retrieves available sources and asset pairs metadata from the **Main Backend**.
3.  **Real-time Data Display:**
    * For **Web3 Oracles:** The frontend directly queries on-chain data using `wagmi`.
    * For **Traditional APIs:** The frontend makes an API call to the **Real-time Data Proxy Backend**, which then securely fetches and relays the data.
    * The frontend immediately displays the real-time prices and dynamically calculated deviations.
4.  **Historical Data Display:**
    * The frontend requests historical data (asset pair, sources, date range) from the **Main Backend**.
    * The **Main Backend** first checks **Vercel KV**. If the data is present, it's returned quickly. If not (or incomplete), the backend fetches it from the original sources, stores it in Vercel KV, and then returns it to the frontend.
5.  **Historical Data Ingestion (Backend/Cron):**
    * A scheduled **Vercel Cron Job** triggers a function within the **Main Backend**.
    * This function autonomously fetches recent historical data from various Web3 oracles and traditional APIs (using their internal, secure API keys) and populates/updates the **Vercel KV** cache.
6.  **Merits Integration (Deviation Hunter & Historical Insight):**
    * Upon user action (e.g., confirming a deviation or adding an insight), the frontend makes a direct **API call to the Blockscout Merits API**, including necessary user wallet information for authentication.
    * Blockscout processes the request and awards Merits. The frontend updates based on the API response.
7.  **Social Feedback View:** The frontend makes direct **API calls to the Blockscout Merits API** to retrieve aggregated Merits data specific to each oracle, which is then displayed to the user.
8.  **Sharing:** The frontend generates a unique, parameterized URL that can be shared, recreating the exact comparison setup when opened.

