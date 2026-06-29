import { type MysteryCase } from "./cases";
import { caseFor, floorFor } from "./i18n/content";
import type { Lang } from "./i18n/lang";
import { translate } from "./i18n/ui";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Opens a print-ready (Save as PDF) map of the case's scene with pathways. */
export function openMapPack(mystery: MysteryCase, size: number, lang: Lang = "en") {
  const c = caseFor(mystery.slug, lang) ?? mystery;
  const html = buildMap(c, size, lang);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

function buildMap(mystery: MysteryCase, size: number, lang: Lang) {
  const t = (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);
  const plan = floorFor(mystery.slug, lang);
  const rooms = plan?.rooms ?? [];
  const total = rooms.length;
  const searches = Math.max(1, Math.min(size, total));

  // central corridor band
  const corridor = `
    <rect x="6" y="34" width="88" height="4" rx="1" fill="rgba(120,90,40,0.12)" stroke="rgba(90,74,42,0.5)" stroke-width="0.3" />
    <text x="50" y="36.9" text-anchor="middle" font-size="2.2" fill="rgba(90,74,42,0.8)" letter-spacing="0.3" style="font-family:'Special Elite','Nirmala UI',Mangal,monospace">— ${esc(t("pdf.hall"))} —</text>`;

  const roomSvg = rooms
    .map((r, i) => {
      const cx = r.x + r.w / 2;
      const cy = r.y + r.h / 2;
      const top = cy < 36;
      // doorway stub from the room edge to the corridor
      const y1 = top ? r.y + r.h : r.y;
      const y2 = top ? 34 : 38;
      return `
      <g>
        <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="1.4"
          fill="rgba(120,90,40,0.06)" stroke="#5a4a2a" stroke-width="0.45" />
        <line x1="${cx}" y1="${y1}" x2="${cx}" y2="${y2}" stroke="#5a4a2a" stroke-width="0.5" stroke-dasharray="0.8 0.8" />
        <circle cx="${cx}" cy="${y1}" r="0.7" fill="#7a1010" />
        <text x="${cx}" y="${cy - 1}" text-anchor="middle" font-size="6" fill="#3a2a12" style="font-family:'Cinzel','Nirmala UI',Mangal,serif">${i + 1}</text>
        <text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="2.6" fill="#5a4a2a" style="font-family:'EB Garamond','Nirmala UI',Mangal,serif">${esc(r.label)}</text>
        ${i === 0 ? `<text x="${r.x + r.w - 4}" y="${r.y + 5}" text-anchor="middle" font-size="5" fill="#7a1010">✕</text>` : ""}
      </g>`;
    })
    .join("");

  const legend = rooms
    .map((r, i) => `<li><span class="num">${i + 1}</span> ${esc(r.label)}</li>`)
    .join("");

  return `<!doctype html>
<html lang="${lang}"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(t("pdf.titleMap", { title: mystery.title }))}</title>
<style>
  @page { margin: 16mm; }
  * { box-sizing: border-box; }
  body { margin: 0; color: #2a2012; font-family: "EB Garamond", Georgia, "Noto Serif Devanagari", "Nirmala UI", Mangal, serif;
    background: repeating-linear-gradient(0deg, rgba(120,90,40,0.04) 0 2px, transparent 2px 5px), linear-gradient(135deg, #efe2c0, #ddccA0); }
  .page { padding: 40px; }
  h1, .kicker, .num { font-family: "Cinzel", Georgia, "Noto Serif Devanagari", "Nirmala UI", Mangal, serif; }
  .kicker { letter-spacing: 0.35em; text-transform: uppercase; font-size: 12px; color: #7a1010; text-align: center; }
  h1 { font-size: 34px; margin: 8px 0 2px; text-align: center; letter-spacing: 0.04em; }
  .sub { text-align: center; font-style: italic; color: #5a4a2a; margin: 0 0 22px; }
  .map { border: 2px solid #8a6a30; border-radius: 8px; background: rgba(255,250,235,0.4); padding: 10px; }
  .map svg { width: 100%; display: block; }
  .cols { display: flex; gap: 30px; margin-top: 24px; flex-wrap: wrap; }
  .col { flex: 1 1 240px; }
  .col h3 { font-family: "Special Elite", "Courier New", monospace; letter-spacing: 0.18em; text-transform: uppercase; font-size: 12px; color: #7a1010; margin: 0 0 8px; }
  ol.legend { list-style: none; padding: 0; margin: 0; columns: 2; }
  ol.legend li { margin: 4px 0; font-size: 15px; }
  .num { display: inline-grid; place-items: center; width: 18px; height: 18px; border: 1px solid #7a1010; border-radius: 50%; font-size: 11px; margin-right: 6px; }
  .rules { line-height: 1.6; font-size: 15px; }
  .rules strong { color: #7a1010; }
  .seal-note { margin-top: 18px; border: 2px solid #7a1010; color: #7a1010; padding: 10px 14px; text-align: center; font-family: "Cinzel", serif; letter-spacing: 0.08em; }
  @media print { body { background: #fff; } }
</style>
</head>
<body><div class="page">
  <div class="kicker">${esc(t("pdf.sceneKicker"))}</div>
  <h1>${esc(plan?.title ?? mystery.title)}</h1>
  <p class="sub">${esc(mystery.setting)}</p>

  <div class="map">
    <svg viewBox="0 0 100 72" role="img" aria-label="Scene map">
      <rect x="2.5" y="2.5" width="95" height="67" rx="2" fill="none" stroke="#8a6a30" stroke-width="0.7" />
      ${corridor}
      ${roomSvg}
    </svg>
  </div>

  <div class="cols">
    <div class="col">
      <h3>${esc(t("pdf.rooms"))}</h3>
      <ol class="legend">${legend}</ol>
    </div>
    <div class="col">
      <h3>${esc(t("pdf.mapHow"))}</h3>
      <p class="rules">
        ${esc(t("pdf.mapRules", { searches, total }))}
      </p>
      <div class="seal-note">${esc(t("pdf.sealNote"))}</div>
    </div>
  </div>
</div></body></html>`;
}
