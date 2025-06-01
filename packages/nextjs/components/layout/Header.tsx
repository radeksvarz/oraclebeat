import Link from "next/link";
import { usePathname } from "next/navigation";
import { MeritBalance } from "../merit-balance/MeritBalance";
import { RainbowKitCustomConnectButton } from "../scaffold-eth";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex relative w-8 h-8">
          <svg
            className="text-blue-600"
            fill="currentColor"
            height="32"
            viewBox="0 0 256 256"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M128 24C70.562 24 24 70.562 24 128C24 185.438 70.562 232 128 232C185.438 232 232 185.438 232 128C232 70.562 185.438 24 128 24ZM128 216C79.402 216 40 176.598 40 128C40 79.402 79.402 40 128 40C176.598 40 216 79.402 216 128C216 176.598 176.598 216 128 216ZM184 128C184 159.969 157.969 186 126 186C94.031 186 68 159.969 68 128C68 96.031 94.031 70 126 70C157.969 70 184 96.031 184 128ZM128 102C111.431 102 98 115.431 98 132C98 148.569 111.431 162 128 162C144.569 162 158 148.569 158 132C158 115.431 144.569 102 128 102Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-lg font-semibold">Oracle Beat</span>
      </Link>
      <div className="flex flex-1 justify-end items-center gap-4 sm:gap-6">
        <nav className="hidden sm:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium leading-normal transition-colors ${
              pathname === "/" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
            }`}
          >
            Overview
          </Link>
          <Link
            href="/deviation"
            className={`text-sm font-medium leading-normal transition-colors ${
              pathname === "/deviation" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
            }`}
          >
            Deviation Analysis
          </Link>
          <Link
            href="/data-sources"
            className={`text-sm font-medium leading-normal transition-colors ${
              pathname === "/data-sources" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
            }`}
          >
            Data Sources
          </Link>
          <Link
            href="/social"
            className={`text-sm font-medium leading-normal transition-colors ${
              pathname === "/social" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
            }`}
          >
            Social Layer Feedback
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="min-w-[120px]">
            <MeritBalance />
          </div>
          <RainbowKitCustomConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
