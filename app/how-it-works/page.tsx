import type { Metadata } from "next";
import { HowItWorksPageContent } from "@/components/how-it-works-page-content";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Four steps from gathering your party to delivering the verdict.",
};

export default function HowItWorksPage() {
  return <HowItWorksPageContent />;
}
