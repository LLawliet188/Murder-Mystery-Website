import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, EB_Garamond, Special_Elite } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteNav } from "@/components/site-nav";
import { Atmosphere } from "@/components/atmosphere";
import { CandleCursor } from "@/components/candle-cursor";
import { FloatingParty } from "@/components/floating-party";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-cinzel", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const ebGaramond = EB_Garamond({ subsets: ["latin"], variable: "--font-eb-garamond", display: "swap" });
const specialElite = Special_Elite({ subsets: ["latin"], weight: "400", variable: "--font-special-elite", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "VERDICT — Everyone's a Suspect",
    template: "%s · VERDICT",
  },
  description:
    "Gather your party. Choose your case. Only one of you knows the truth. VERDICT curates immersive murder mysteries built for exactly your party size — 3, 4, 5, or 6.",
  keywords: ["murder mystery", "party game", "dinner party", "whodunit", "detective game"],
  openGraph: {
    title: "VERDICT — Everyone's a Suspect",
    description: "Curated murder mysteries built for exactly your party size.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${ebGaramond.variable} ${specialElite.variable} h-full antialiased`}
    >
      <body className="relative min-h-full">
        <Providers>
          <Atmosphere />
          <CandleCursor />
          <SiteNav />
          <main className="relative z-10">{children}</main>
          <FloatingParty />
        </Providers>
      </body>
    </html>
  );
}
