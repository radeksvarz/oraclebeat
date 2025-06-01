"use client";

import { type FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface DataSource {
  name: string;
  type: string;
  status: "active" | "maintenance" | "inactive";
  merits: number;
  logo: string;
  detailsPath?: string;
}

const dataSources: DataSource[] = [
  {
    name: "Pyth Network",
    type: "Web3 Oracle",
    status: "active",
    merits: 150,
    logo: "/logos/pyth-network.png",
  },
  {
    name: "Pyth Onchain Ethereum L1",
    type: "Web3 Oracle",
    status: "active",
    merits: 140,
    logo: "/logos/pyth-onchain.png",
    detailsPath: "/data-sources/pyth-onchain",
  },
  {
    name: "Chainlink Ethereum L1",
    type: "Web3 Oracle",
    status: "active",
    merits: 120,
    logo: "/logos/chainlink-logo.png",
  },
  {
    name: "Tellor",
    type: "Web3 Oracle",
    status: "active",
    merits: 110,
    logo: "/logos/tellor.png",
  },
  {
    name: "Redstone",
    type: "Web3 Oracle",
    status: "active",
    merits: 100,
    logo: "/logos/redstone.png",
  },
  {
    name: "ExchangeRate API",
    type: "Traditional Source",
    status: "active",
    merits: 90,
    logo: "/logos/exchangerate-api.png",
  },
  {
    name: "Bloomberg",
    type: "Traditional Source",
    status: "maintenance",
    merits: 85,
    logo: "/logos/bloomberg.png",
  },
  {
    name: "Reuters",
    type: "Traditional Source",
    status: "active",
    merits: 80,
    logo: "/logos/reuters.png",
  },
  {
    name: "Yahoo Finance",
    type: "Traditional Source",
    status: "inactive",
    merits: 70,
    logo: "/logos/yahoo-finance.png",
  },
];

const DataSourceCard: FC<{ source: DataSource }> = ({ source }) => {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    maintenance: "bg-yellow-100 text-yellow-800",
    inactive: "bg-red-100 text-red-800",
  };

  const CardContent = () => (
    <>
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center p-4 relative">
        <Image
          alt={`${source.name} Logo`}
          className="object-contain"
          src={source.logo}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={source.logo.startsWith("http")}
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900 text-xl font-semibold tracking-tight">{source.name}</h3>
          <span
            className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
              statusColors[source.status]
            }`}
          >
            {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-1">{source.type}</p>
        <div className="flex items-center text-gray-500 text-sm mt-auto pt-3">
          <span className="material-icons merit-icon text-yellow-500 mr-1 text-base">star</span>
          {source.merits} Merits
        </div>
      </div>
    </>
  );

  return source.detailsPath ? (
    <Link
      href={source.detailsPath}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl flex flex-col group"
    >
      <CardContent />
    </Link>
  ) : (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl flex flex-col group">
      <CardContent />
    </div>
  );
};

const DataSourcesPage: FC = () => {
  return (
    <main className="px-4 sm:px-10 lg:px-20 xl:px-40 flex flex-1 flex-col py-8">
      <div className="layout-content-container flex flex-col max-w-7xl w-full mx-auto">
        <div className="mb-8 px-4">
          <h2 className="text-gray-900 text-3xl sm:text-4xl font-bold tracking-tight">Data Sources</h2>
          <p className="text-gray-600 text-base sm:text-lg font-normal leading-relaxed mt-2">
            Explore the data sources that power Oracle Beat&apos;s real-time and historical price comparisons.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 p-4">
          {dataSources.map((source, index) => (
            <DataSourceCard key={index} source={source} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default DataSourcesPage;
