import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CASES, getCaseBySlug } from "@/lib/cases";
import { Dossier } from "@/components/dossier";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) return { title: "Case Not Found" };
  return {
    title: c.title,
    description: c.teaser,
    openGraph: { title: `${c.title} · VERDICT`, description: c.teaser },
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mystery = getCaseBySlug(slug);
  if (!mystery) notFound();
  return <Dossier mystery={mystery} />;
}
