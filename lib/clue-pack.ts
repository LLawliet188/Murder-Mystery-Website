import { rosterFor, type MysteryCase } from "./cases";
import { caseFor, scriptFor } from "./i18n/content";
import type { Lang } from "./i18n/lang";
import { translate } from "./i18n/ui";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Builds a self-contained, print-ready clue pack (host script + filled
 *  character sheets) and opens it in a new tab. */
export function openCluePack(mystery: MysteryCase, size: number, lang: Lang = "en") {
  const c = caseFor(mystery.slug, lang) ?? mystery;
  const roster = rosterFor(c, size);
  const script = scriptFor(mystery.slug, lang);
  const html = buildHtml(c, size, roster, script, lang);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

function buildHtml(
  mystery: MysteryCase,
  size: number,
  roster: { name: string; title: string; line: string }[],
  script: ReturnType<typeof scriptFor>,
  lang: Lang
) {
  const t = (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);

  // ── How to play (everyone is a player; the killer stays sealed) ──
  const howTo = script
    ? `
    <section class="run">
      <h2>${esc(t("pdf.howTitle"))}</h2>
      <p class="run-intro">${esc(t("pdf.howIntro"))}</p>
      <ol>
        <li><strong>${esc(t("pdf.stepSetupTitle"))}.</strong> ${esc(t("pdf.stepSetupBody"))}</li>
        <li><strong>${esc(t("pdf.stepOpenTitle"))}.</strong> ${esc(t("pdf.stepOpenBody"))}</li>
        <li><strong>${esc(t("pdf.stepInvestigateTitle"))}.</strong> ${esc(t("pdf.stepInvestigateBody"))}</li>
        <li><strong>${esc(t("pdf.stepAccuseTitle"))}.</strong> ${esc(t("pdf.stepAccuseBody"))}</li>
        <li><strong>${esc(t("pdf.stepVerdictTitle"))}.</strong> ${esc(t("pdf.stepVerdictBody"))}</li>
      </ol>
    </section>`
    : "";

  // ── Sealed solution, printed last (open only at the verdict) ──
  const sealedVerdict = script
    ? `
    <section class="host sealed">
      <div class="warn">${esc(t("pdf.sealedWarn"))}</div>
      <h2>${esc(t("pdf.verdictTitle"))}</h2>
      <p class="say">${esc(script.reveal)}</p>
      <h3 class="reveal-h">${esc(t("pdf.whyHow"))}</h3>
      <p>${esc(script.hostNote)}</p>
      <p class="seal-foot">${esc(t("pdf.sealFoot"))}</p>
    </section>`
    : "";

  // ── Narrator script: intro · rounds · reveal ──
      const rounds = script
    ? script.rounds
        .map(
        (r) => `
      <div class="round">
        <h3>${esc(r.name)}</h3>
        <p class="say"><span class="cue">${esc(t("pdf.readAloud"))}</span> ${esc(r.narration)}</p>
        <p class="do"><span class="cue">${esc(t("pdf.hostDirects"))}</span> ${esc(r.instructions)}</p>
        <div class="clues">
          <span class="cue">${esc(t("pdf.revealClues"))}</span>
          <ul>${r.clues.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
        </div>
      </div>`
        )
        .join("")
    : "";

  const narrator = script
    ? `
    <section class="script">
      <div class="kicker">${esc(t("pdf.narratorKicker"))}</div>
      <h2>${esc(t("pdf.openingRead"))}</h2>
      <p class="say">${esc(script.intro)}</p>
      ${rounds}
      <p class="closing">${esc(t("pdf.closing"))}</p>
    </section>`
    : "";

  // ── Character sheets (filled from each suspect's brief) ──
  const field = (label: string, value?: string) => `
      <div class="field">
        <span>${esc(label)}</span>
        <p class="answer">${value ? esc(value) : ""}</p>
      </div>`;

  const sheets = roster
    .map((s, i) => {
      const b = script?.briefs[i];
      return `
    <section class="sheet${b?.guilty ? " guilty" : ""}">
      <div class="stamp">${esc(t("pdf.confidentialFor", { name: s.name, i: i + 1, total: roster.length }))}</div>
      <h2>${esc(s.name)}</h2>
      <p class="role">${esc(s.title)}</p>
      <p class="flavor">"${esc(s.line)}"</p>
      ${field(t("pdf.relationship"), b?.relationship)}
      ${field(t("pdf.secret"), b?.secret)}
      ${field(t("pdf.alibi"), b?.alibi)}
      ${field(t("pdf.accused"), b?.accused)}
      ${b?.guilty ? `<div class="mark">${esc(t("pdf.guiltyMark"))}</div>` : ""}
      <div class="foot">VERDICT · ${esc(mystery.title)}</div>
    </section>`;
    })
    .join("");

  return `<!doctype html>
<html lang="${lang}"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(t("pdf.titleClue", { title: mystery.title }))}</title>
<style>
  @page { margin: 16mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0; color: #2a2012;
    font-family: "EB Garamond", Georgia, "Times New Roman", "Noto Serif Devanagari", "Nirmala UI", Mangal, serif;
    background: #d8cba8;
  }
  .page {
    background:
      repeating-linear-gradient(0deg, rgba(120,90,40,0.04) 0 2px, transparent 2px 5px),
      linear-gradient(135deg, #efe2c0, #ddccA0);
    padding: 40px;
  }
  h1, h2, h3, .stamp, .role, .kicker, .warn { font-family: "Cinzel", Georgia, "Noto Serif Devanagari", "Nirmala UI", Mangal, serif; }
  .cover { text-align: center; padding: 50px 20px; page-break-after: always; }
  .kicker { letter-spacing: 0.35em; text-transform: uppercase; font-size: 12px; color: #7a1010; }
  h1 { font-size: 40px; margin: 14px 0 6px; letter-spacing: 0.04em; }
  .teaser { font-style: italic; font-size: 18px; color: #5a4a2a; max-width: 540px; margin: 0 auto 26px; }
  .meta { display: inline-flex; gap: 22px; flex-wrap: wrap; justify-content: center; border-top: 1px solid #8a6a30; border-bottom: 1px solid #8a6a30; padding: 12px 0; font-size: 14px; }
  .brief { max-width: 620px; margin: 30px auto; text-align: left; }
  .brief h3, .brief-h { font-family: "Special Elite", "Courier New", monospace; letter-spacing: 0.2em; text-transform: uppercase; font-size: 13px; color: #7a1010; margin: 22px 0 6px; }
  .brief p { margin: 0; line-height: 1.6; font-size: 16px; }

  section { page-break-before: always; }
  section h2 { font-size: 28px; margin: 6px 0 14px; letter-spacing: 0.03em; }

  .host { border: 2px solid #7a1010; padding: 26px 30px; background: rgba(122,16,16,0.04); }
  .warn { display: inline-block; border: 2px solid #7a1010; color: #7a1010; padding: 6px 12px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 14px; }
  .host p { line-height: 1.7; font-size: 16px; }

  .run ol { padding-left: 22px; line-height: 1.7; font-size: 16px; }
  .run li { margin: 8px 0; }
  .run-intro { font-size: 16px; line-height: 1.7; margin: 0 0 16px; }
  .run-intro strong { color: #7a1010; }
  .closing { margin-top: 18px; font-style: italic; color: #7a1010; }
  .host.sealed { border-color: #7a1010; }
  .reveal-h { font-family: "Special Elite", "Courier New", monospace; letter-spacing: 0.18em; text-transform: uppercase; font-size: 12px; color: #7a1010; margin: 18px 0 6px; }
  .seal-foot { margin-top: 18px; font-style: italic; font-size: 13px; color: #6a5020; border-top: 1px dashed #8a6a30; padding-top: 12px; }

  .script .kicker { display: block; text-align: center; margin-bottom: 4px; }
  .script .say { line-height: 1.75; font-size: 17px; margin: 8px 0 16px; }
  .script .do { line-height: 1.6; font-size: 15px; color: #4a3a1a; font-style: italic; margin: 0 0 12px; }
  .cue { font-family: "Special Elite", "Courier New", monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #7a1010; margin-right: 6px; }
  .round { border-top: 1px solid #8a6a30; padding-top: 14px; margin-top: 20px; }
  .round h3 { font-size: 19px; margin: 0 0 8px; }
  .clues ul { margin: 6px 0 0; padding-left: 20px; }
  .clues li { margin: 5px 0; line-height: 1.5; }
  .finale { color: #7a1010; border-top: 2px solid #7a1010; padding-top: 14px; }

  .invite { text-align: center; border: 3px double #8a6a30; padding: 50px 30px; }
  .invite h2 { font-size: 30px; }
  .seal { width: 70px; height: 70px; border-radius: 50%; margin: 20px auto; background: radial-gradient(circle at 35% 30%, #b53030, #7a1010); color: #f0d8b0; display: grid; place-items: center; font-family: "Cinzel", serif; font-size: 11px; letter-spacing: 0.1em; }

  .sheet { border: 2px solid #8a6a30; padding: 30px; position: relative; }
  .sheet.guilty { border-color: #7a1010; }
  .stamp { display: inline-block; border: 2px solid #7a1010; color: #7a1010; padding: 4px 10px; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; transform: rotate(-2deg); }
  .sheet h2 { font-size: 30px; margin: 22px 0 2px; }
  .role { letter-spacing: 0.16em; text-transform: uppercase; font-size: 13px; color: #7a1010; margin: 0 0 12px; }
  .flavor { font-style: italic; font-size: 17px; color: #4a3a1a; margin: 0 0 22px; }
  .field { margin: 16px 0; }
  .field > span { font-family: "Special Elite", "Courier New", monospace; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #6a5020; }
  .answer { margin: 6px 0 0; line-height: 1.6; font-size: 16px; border-left: 2px solid #9a7a40; padding-left: 12px; min-height: 18px; }
  .mark { margin-top: 22px; border: 2px solid #7a1010; color: #7a1010; padding: 10px 14px; font-family: "Cinzel", serif; letter-spacing: 0.1em; text-align: center; }
  .foot { margin-top: 26px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #9a7a40; }

  @media print { body { background: #fff; } .page { background: #fff; } }
</style>
</head>
<body><div class="page">
  <div class="cover">
    <div class="kicker">${esc(t("pdf.mysteryKicker"))}</div>
    <h1>${esc(mystery.title)}</h1>
    <p class="teaser">${esc(mystery.teaser)}</p>
    <div class="meta">
      <span>${esc(t("pdf.players", { n: size }))}</span>
      <span>${esc(t("era." + mystery.era))}</span>
      <span>${esc(t("diff." + mystery.difficulty))} (${mystery.difficulty}/5)</span>
      <span>${esc(mystery.duration)}</span>
    </div>
    <div class="brief">
      <div class="brief-h">${esc(t("pdf.premise"))}</div><p>${esc(mystery.premise)}</p>
      <div class="brief-h">${esc(t("pdf.setting"))}</div><p>${esc(mystery.setting)}</p>
      <div class="brief-h">${esc(t("pdf.victim"))}</div><p>${esc(mystery.victim)}</p>
    </div>
  </div>

  ${howTo}
  ${narrator}

  <div class="invite">
    <div class="kicker">${esc(t("pdf.inviteKicker"))}</div>
    <h2>${esc(t("pdf.inviteTitle"))}</h2>
    <div class="seal">VERDICT</div>
    <p class="teaser">${esc(t("pdf.inviteBody", { title: mystery.title }))}</p>
    <p style="font-family:'Special Elite',monospace;font-size:12px;letter-spacing:0.12em;">${esc(t("pdf.dateLine"))}</p>
  </div>

  ${sheets}
  ${sealedVerdict}
</div></body></html>`;
}
