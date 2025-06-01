/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inter, Noto_Sans } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const notoSans = Noto_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Oracle Beat",
    template: "%s | Oracle Beat",
  },
  description: "Built with 🏗 Scaffold-ETH 2",
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <style>
          {`
            .merit-icon {
              font-variation-settings: "FILL" 1, "wght" 700, "GRAD" 0, "opsz" 24;
            }
            @keyframes modal-pop-in {
              0% {
                opacity: 0;
                transform: scale(0.95) translateY(10px);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
            .animate-modal-pop-in {
              animation: modal-pop-in 0.3s ease-out forwards;
            }
            .modal-content {
              box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04);
            }
          `}
        </style>
      </head>
      <body className={`${inter.className} ${notoSans.className}`}>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
