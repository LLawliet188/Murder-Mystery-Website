import { Suspense } from "react";
import type { Metadata } from "next";
import { CaseGallery } from "@/components/case-gallery";

export const metadata: Metadata = {
  title: "Case Files",
  description: "Browse VERDICT's curated murder mysteries, filtered to your exact party size.",
};

export default function CasesPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-[100svh] place-items-center">
          <p className="anim-pulse-glow font-serif text-lg italic text-smoke">VERDICT</p>
        </div>
      }
    >
      <CaseGallery />
    </Suspense>
  );
}
