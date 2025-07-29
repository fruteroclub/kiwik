import "./theme.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { fonts } from "@/lib/fonts";
import { Header } from "./components/header";
import { BottomAppBar } from "./components/bottom-app-bar";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL || "https://kiwik-ai.vercel.app";
  const PROJECT_NAME = process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "kiwik";
  
  return {
    title: PROJECT_NAME,
    description:
      "kiwik - Incubadora de talento Web3 y MiniKit app para Base blockchain",
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE || `${URL}/hero.png`,
        button: {
          title: `Launch ${PROJECT_NAME}`,
          action: {
            type: "launch_frame",
            name: PROJECT_NAME,
            url: URL,
            splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE || `${URL}/hero.png`,
            splashBackgroundColor:
              process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "#000000",
          },
        },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`bg-background ${fonts.funnelDisplay.variable} ${fonts.ledger.variable} ${fonts.raleway.variable} ${fonts.spaceGrotesk.variable}`}
      >
        <Providers>
          <Header />
          <main>{children}</main>
          <BottomAppBar />
        </Providers>
      </body>
    </html>
  );
}
