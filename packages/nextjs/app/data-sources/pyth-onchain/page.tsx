"use client";

import { type FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface AssetPair {
  name: string;
  contract: string;
  lastUpdate: string;
  status: "active" | "maintenance" | "inactive";
}

interface DeviationReport {
  pair: string;
  contract: string;
  reports: number;
  lastUpdated: string;
}

interface UserContribution {
  user: string;
  avatar: string;
  timeAgo: string;
  comment: string;
  merits: number;
}

const assetPairs: AssetPair[] = [
  { name: "EUR/USD", contract: "0x...", lastUpdate: "2 sec ago", status: "active" },
  { name: "AAPL/USD", contract: "0x...", lastUpdate: "5 sec ago", status: "active" },
  { name: "ETH/USD", contract: "0x...", lastUpdate: "1 sec ago", status: "active" },
  { name: "BTC/USD", contract: "0x...", lastUpdate: "3 sec ago", status: "active" },
];

const deviationReports: DeviationReport[] = [
  { pair: "AAPL/USD", contract: "0x...", reports: 5, lastUpdated: "1 hour ago" },
  { pair: "ETH/USD", contract: "0x...", reports: 3, lastUpdated: "3 hours ago" },
  { pair: "BTC/USD", contract: "0x...", reports: 2, lastUpdated: "6 hours ago" },
];

const userContributions: UserContribution[] = [
  {
    user: "PythUser123",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOX1e2APSOd9_5v941NY-JwCz_DzEtBCvo-PMOte5EO1tvcr-0wxHEzSlzcfMCzepd0vbyk3X1CbCb6zBK6pf7gy0LOysZzk2bA6gGW-WBSF3qQCrYqVbGapRbTb-EvTvwvhNC270PvyxUC-yuCb8CL3QR8HgXB-LYPyshwcCNtwtsa6KI4ppxXhoQiSHV62T-K5K8Mx6fgmT11ToLqrC5dni4xIIsT9Qx7aDGZLlgxTzSWPKWYTWD6YHaMfMI7vidO1vvo_-edKj-",
    timeAgo: "1 day ago",
    comment: "Noticed AAPL/USD on Ethereum mainnet had slightly higher latency around 2 AM UTC. Seems fine now.",
    merits: 15,
  },
  {
    user: "OnchainAnalyst",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAL_MF1YnSyewxWcAADaDacFerTE66BxoVgUBnCdxBX6EayD8KyrRf5n_iEvRd98fZC7z01mS1TkkEiwkxIHMemPrHKBxpuxKxb9N_ch7k6VXay2jOq-HrIEVlfeM-iyzwBpxKwKHIKUW7w1WLZQo_C0YCe9-X57HWLoDPbE9f4kk_LFSjWQn8VM3w9OEs6xcYiBgsc3MiW9Nq1KTaZejomZXUAPmGVCmMN3C7qfHgZgApsF2JkyCgzy0K6Ebu45Ga8Ga-kancadfSW",
    timeAgo: "3 days ago",
    comment: "The EUR/USD feed is incredibly fast and accurate. Great work by the Pyth team!",
    merits: 10,
  },
  {
    user: "CryptoWatcher",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJ_T28sX8vE0gZ3Q9U8R7oW6rC5sFvQ1Y8nZ5Xw6Jg=s96-c",
    timeAgo: "5 days ago",
    comment: "Monitoring BTC/USD closely. Pyth's on-chain data has been consistent.",
    merits: 8,
  },
];

const PythOnchainPage: FC = () => {
  return (
    <main className="px-4 sm:px-10 lg:px-20 xl:px-40 flex flex-1 flex-col py-8">
      <div className="layout-content-container flex flex-col max-w-7xl w-full mx-auto gap-6">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/data-sources" className="text-slate-500 hover:text-blue-600">
            Data Sources
          </Link>
          <span className="material-icons text-slate-400 text-base">chevron_right</span>
          <span className="text-slate-900 font-medium">Pyth (Onchain Ethereum L1)</span>
        </div>

        <section className="bg-white shadow-lg rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 relative">
                <Image
                  alt="Pyth Logo"
                  className="rounded-lg"
                  src="/logos/pyth-onchain.png"
                  fill
                  sizes="64px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div>
                <h1 className="text-slate-900 text-3xl font-bold">Pyth (Onchain Ethereum L1)</h1>
                <p className="text-slate-600 text-base mt-1">Onchain market data from the Pyth Network.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                className="flex items-center gap-2 h-10 px-4 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-icons text-lg">link</span>
                Website
              </a>
              <a
                className="flex items-center gap-2 h-10 px-4 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium"
                href="https://docs.pyth.network/home"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-icons text-lg">description</span>
                Docs
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-slate-900 text-xl font-semibold mb-4">Key Characteristics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 border-t border-slate-200 pt-4">
              <div className="grid grid-cols-[auto_1fr] gap-x-3 py-2 items-start">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-slate-400 text-base">login</span>
                  <p className="text-slate-500 text-sm font-medium">Access Method:</p>
                </div>
                <p className="text-slate-700 text-sm">On-chain smart contract calls (Permissionless reads)</p>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 py-2 items-start">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-slate-400 text-base">schedule</span>
                  <p className="text-slate-500 text-sm font-medium">Data Freshness:</p>
                </div>
                <p className="text-slate-700 text-sm">
                  &apos;Pulled&apos; - dependent on external transactions; influenced by Ethereum L1 block times
                </p>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 py-2 items-start">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-slate-400 text-base">source</span>
                  <p className="text-slate-500 text-sm font-medium">Data Source:</p>
                </div>
                <p className="text-slate-700 text-sm">Pyth Network via Wormhole</p>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 py-2 items-start">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-slate-400 text-base">payments</span>
                  <p className="text-slate-500 text-sm font-medium">Cost Model:</p>
                </div>
                <p className="text-slate-700 text-sm">Gas fees for data updates (user-initiated); No read fees</p>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 py-2 items-start">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-slate-400 text-base">link</span>
                  <p className="text-slate-500 text-sm font-medium">Chain Specificity:</p>
                </div>
                <p className="text-slate-700 text-sm">Ethereum L1</p>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 py-2 items-start">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-slate-400 text-base">work_outline</span>
                  <p className="text-slate-500 text-sm font-medium">Primary Use Cases:</p>
                </div>
                <p className="text-slate-700 text-sm">On-chain DeFi protocols (e.g., lending, derivatives)</p>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 py-2 items-start">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-slate-400 text-base">data_usage</span>
                  <p className="text-slate-500 text-sm font-medium">Data Provided:</p>
                </div>
                <p className="text-slate-700 text-sm">Price, Confidence Interval, Timestamp</p>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 py-2 items-start">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-slate-400 text-base">security</span>
                  <p className="text-slate-500 text-sm font-medium">Security:</p>
                </div>
                <p className="text-slate-700 text-sm">
                  Wormhole verification, Pyth Network&apos;s publisher security, Ethereum L1 security
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-xl p-6 md:p-8">
          <h2 className="text-slate-900 text-xl font-semibold mb-4">Monitored Asset Pairs (Onchain)</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-slate-600 text-xs font-medium uppercase tracking-wider">
                    Asset Pair
                  </th>
                  <th className="px-4 py-3 text-left text-slate-600 text-xs font-medium uppercase tracking-wider">
                    Contract
                  </th>
                  <th className="px-4 py-3 text-left text-slate-600 text-xs font-medium uppercase tracking-wider">
                    Last Update
                  </th>
                  <th className="px-4 py-3 text-left text-slate-600 text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {assetPairs.map((pair, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-700 text-sm font-medium">{pair.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-500 text-sm">
                      <a className="text-blue-600 hover:underline flex items-center gap-1" href="#">
                        {pair.contract} <span className="material-icons text-base">open_in_new</span>
                      </a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-500 text-sm">{pair.lastUpdate}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          pair.status === "active"
                            ? "bg-green-100 text-green-800"
                            : pair.status === "maintenance"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {pair.status.charAt(0).toUpperCase() + pair.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-xl p-6 md:p-8">
          <h2 className="text-slate-900 text-xl font-semibold mb-4">Social Feedback View</h2>
          <div className="mb-6">
            <h3 className="text-slate-800 text-base font-medium mb-3">
              Top Asset Pairs by Deviation Reports (Onchain)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 text-left text-slate-600 text-xs font-medium uppercase tracking-wider">
                      Asset Pair
                    </th>
                    <th className="px-4 py-3 text-left text-slate-600 text-xs font-medium uppercase tracking-wider">
                      Contract
                    </th>
                    <th className="px-4 py-3 text-left text-slate-600 text-xs font-medium uppercase tracking-wider">
                      Deviation Reports
                    </th>
                    <th className="px-4 py-3 text-left text-slate-600 text-xs font-medium uppercase tracking-wider">
                      Last Updated
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {deviationReports.map((report, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-700 text-sm font-medium">{report.pair}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500 text-sm">
                        <a className="text-blue-600 hover:underline flex items-center gap-1" href="#">
                          {report.contract} <span className="material-icons text-base">open_in_new</span>
                        </a>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500 text-sm">{report.reports}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500 text-sm">{report.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-slate-800 text-base font-medium mb-4">Recent User Contributions (Onchain Focus)</h3>
            <div className="space-y-5">
              {userContributions.map((contribution, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0 border border-slate-200"
                    style={{ backgroundImage: `url("${contribution.avatar}")` }}
                  />
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-2">
                        <p className="text-slate-800 text-sm font-semibold">{contribution.user}</p>
                        <p className="text-slate-400 text-xs">{contribution.timeAgo}</p>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <span className="material-icons merit-icon text-yellow-500 mr-1 text-base">star</span>
                        {contribution.merits}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm">{contribution.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-slate-100 hover:bg-slate-200 text-blue-600 text-sm font-medium border border-slate-300">
              <span className="material-icons text-lg">expand_more</span>
              Load 5 More Contributions
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PythOnchainPage;
