"use client";

import { useState } from "react";
import AssetSelector from "~~/components/oracle-beat/AssetSelector";
import DataSourceSelector from "~~/components/oracle-beat/DataSourceSelector";
import WhyOracleBeat from "~~/components/oracle-beat/WhyOracleBeat";

export default function HomePage() {
  const [baseAsset, setBaseAsset] = useState("EUR");
  const [quoteAsset, setQuoteAsset] = useState("USD");
  const [web3Oracle, setWeb3Oracle] = useState("");
  const [traditionalSource, setTraditionalSource] = useState("");

  const isSourceSelectionDisabled = !baseAsset || !quoteAsset;
  const isCompareButtonDisabled = isSourceSelectionDisabled || (!web3Oracle && !traditionalSource);

  return (
    <main className="flex-1">
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="size-16 text-white">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z"
                  fill="currentColor"
                />
                <path
                  clipRule="evenodd"
                  d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">Oracle Beat</h1>
          <p className="text-xl sm:text-2xl text-blue-200 mb-8">Compare Web3 Oracles & TradFi Data Side-by-Side.</p>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
            Gain unparalleled insights by comparing real-time and historical price data from Web3 oracles and
            traditional financial sources across FX, equities, and commodities. Visualize deviations, analyze source
            characteristics, and dive deep with dedicated detail pages.
          </p>
        </div>
      </section>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="layout-content-container flex flex-col w-full max-w-4xl mx-auto">
          <section className="space-y-10 bg-white p-6 sm:p-8 rounded-xl shadow-xl -mt-24 relative z-10 border border-slate-200">
            <div>
              <h2 className="text-slate-800 text-2xl font-semibold mb-1 text-center">
                Start Your Comprehensive Comparison
              </h2>
              <p className="text-slate-600 text-center mb-6">
                Select an asset pair and data sources to visualize real-time and historical price data across platforms.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <AssetSelector
                  baseAsset={baseAsset}
                  quoteAsset={quoteAsset}
                  onBaseAssetChange={setBaseAsset}
                  onQuoteAssetChange={setQuoteAsset}
                />
                <DataSourceSelector
                  web3Oracle={web3Oracle}
                  traditionalSource={traditionalSource}
                  onWeb3OracleChange={setWeb3Oracle}
                  onTraditionalSourceChange={setTraditionalSource}
                  disabled={isSourceSelectionDisabled}
                />
              </div>
              <div className="flex justify-center pt-4">
                <button
                  className="flex items-center justify-center rounded-lg h-12 px-8 bg-blue-600 text-white text-lg font-semibold leading-normal shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  disabled={isCompareButtonDisabled}
                >
                  <svg
                    className="mr-2 hidden sm:inline-block"
                    fill="currentColor"
                    height="24"
                    viewBox="0 0 256 256"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM96,176a8,8,0,0,1-16,0V128a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V96a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V144a8,8,0,0,1,16,0Z" />
                  </svg>
                  <span>Compare Data</span>
                </button>
              </div>
            </div>
          </section>
          <WhyOracleBeat />
        </div>
      </div>
    </main>
  );
}
