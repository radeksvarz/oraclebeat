/* eslint-disable @typescript-eslint/no-unused-vars */
import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata: Metadata = {
  title: {
    default: "Oracle Beat",
    template: "%s | Oracle Beat",
  },
  description: "Built with 🏗 Scaffold-ETH 2",
};

const materialIconsUrl = "https://fonts.googleapis.com/icon?family=Material+Icons";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <head>
        <link href={materialIconsUrl} rel="stylesheet" />
        <style>
          {`
            .merit-icon {
              font-variation-settings: "FILL" 1, "wght" 700, "GRAD" 0, "opsz" 24;
            }
          `}
        </style>
      </head>
      <body>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
