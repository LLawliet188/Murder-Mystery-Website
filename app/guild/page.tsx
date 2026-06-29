import type { Metadata } from "next";
import { GuildPageContent } from "@/components/guild-page-content";

export const metadata: Metadata = {
  title: "The Detective's Guild",
  description:
    "An order of hosts, sleuths, and quiet liars. Track your standing, earn your rank, and learn the creed of the table.",
};

export default function GuildPage() {
  return <GuildPageContent />;
}
