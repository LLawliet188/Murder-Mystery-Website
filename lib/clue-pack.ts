import { rosterFor, DIFFICULTY_LABEL, type MysteryCase } from "./cases";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Builds a self-contained, print-ready HTML clue pack and opens it in a new tab. */
export function openCluePack(mystery: MysteryCase, size: number) {
  const roster = rosterFor(mystery, size);
  const html = buildHtml(mystery, size, roster);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

function buildHtml(
  mystery: MysteryCase,
  size: number,
  roster: { name: string; title: string; line: string }[]
) {
  const sheets = roster
    .map(
      (s, i) => `
    <section class="sheet">
      <div class="stamp">Confidential · Suspect ${i + 1} of ${roster.length}</div>
      <h2>${esc(s.name)}</h2>
      <p class="role">${esc(s.title)}</p>
      <p class="flavor">"${esc(s.line)}"</p>
      <div class="field"><span>Your relationship to the victim</span><div class="ruled"></div><div class="ruled"></div></div>
      <div class="field"><span>The secret you must keep</span><div class="ruled"></div><div class="ruled"></div></div>
      <div class="field"><span>Where you were when it happened</span><div class="ruled"></div><div class="ruled"></div></div>
      <div class="field"><span>What you will say if accused</span><div class="ruled"></div><div class="ruled"></div></div>
      <div class="foot">VERDICT · ${esc(mystery.title)}</div>
    </section>`
    )
    .join("");

  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(mystery.title)} — Clue Pack</title>
<style>
  @page { margin: 18mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0; color: #2a2012;
    font-family: "EB Garamond", Georgia, "Times New Roman", serif;
    background: #d8cba8;
  }
  .page {
    background:
      repeating-linear-gradient(0deg, rgba(120,90,40,0.04) 0 2px, transparent 2px 5px),
      linear-gradient(135deg, #efe2c0, #ddccA0);
    padding: 40px; min-height: 100vh;
  }
  h1, h2, .stamp, .role { font-family: "Cinzel", Georgia, serif; }
  .cover { text-align: center; padding: 60px 20px; page-break-after: always; }
  .kicker { letter-spacing: 0.35em; text-transform: uppercase; font-size: 12px; color: #7a1010; }
  h1 { font-size: 40px; margin: 14px 0 6px; letter-spacing: 0.04em; }
  .teaser { font-style: italic; font-size: 18px; color: #5a4a2a; max-width: 540px; margin: 0 auto 26px; }
  .meta { display: inline-flex; gap: 22px; flex-wrap: wrap; justify-content: center; border-top: 1px solid #8a6a30; border-bottom: 1px solid #8a6a30; padding: 12px 0; font-size: 14px; }
  .brief { max-width: 620px; margin: 30px auto; }
  .brief h3 { font-family: "Special Elite", "Courier New", monospace; letter-spacing: 0.2em; text-transform: uppercase; font-size: 13px; color: #7a1010; margin: 22px 0 6px; }
  .brief p { margin: 0; line-height: 1.6; font-size: 16px; }
  .sheet { page-break-before: always; border: 2px solid #8a6a30; padding: 30px; min-height: 230mm; position: relative; }
  .stamp { display: inline-block; border: 2px solid #7a1010; color: #7a1010; padding: 4px 10px; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; transform: rotate(-3deg); }
  .sheet h2 { font-size: 30px; margin: 24px 0 2px; }
  .role { letter-spacing: 0.16em; text-transform: uppercase; font-size: 13px; color: #7a1010; margin: 0 0 14px; }
  .flavor { font-style: italic; font-size: 17px; color: #4a3a1a; margin: 0 0 26px; }
  .field { margin: 18px 0; }
  .field > span { font-family: "Special Elite", "Courier New", monospace; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #6a5020; }
  .ruled { border-bottom: 1px solid #9a7a40; height: 26px; }
  .foot { position: absolute; bottom: 18px; left: 30px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #9a7a40; }
  .invite { page-break-before: always; text-align: center; border: 3px double #8a6a30; padding: 50px 30px; }
  .invite h2 { font-size: 30px; }
  .seal { width: 70px; height: 70px; border-radius: 50%; margin: 20px auto; background: radial-gradient(circle at 35% 30%, #b53030, #7a1010); color: #f0d8b0; display: grid; place-items: center; font-family: "Cinzel", serif; font-size: 11px; letter-spacing: 0.1em; }
  @media print { body { background: #fff; } .page { background: #fff; } }
</style>
</head>
<body><div class="page">
  <div class="cover">
    <div class="kicker">A VERDICT Mystery</div>
    <h1>${esc(mystery.title)}</h1>
    <p class="teaser">${esc(mystery.teaser)}</p>
    <div class="meta">
      <span>${size} Players</span>
      <span>${esc(mystery.era)}</span>
      <span>${esc(DIFFICULTY_LABEL[mystery.difficulty])} (${mystery.difficulty}/5)</span>
      <span>${esc(mystery.duration)}</span>
    </div>
    <div class="brief">
      <h3>The Premise</h3><p>${esc(mystery.premise)}</p>
      <h3>The Setting</h3><p>${esc(mystery.setting)}</p>
      <h3>The Victim</h3><p>${esc(mystery.victim)}</p>
    </div>
  </div>

  <div class="invite">
    <div class="kicker">You are cordially summoned</div>
    <h2>An Evening of Murder</h2>
    <div class="seal">VERDICT</div>
    <p class="teaser">You are invited to <strong>${esc(mystery.title)}</strong>.<br/>Come in character. Trust no one. Tell us nothing of what you know.</p>
    <p style="font-family:'Special Elite',monospace;font-size:12px;letter-spacing:0.12em;">DATE _______________ &nbsp; TIME _______________ &nbsp; PLACE _______________</p>
  </div>

  ${sheets}
</div></body></html>`;
}
