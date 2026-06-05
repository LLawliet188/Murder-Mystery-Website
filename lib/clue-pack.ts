import { rosterFor, DIFFICULTY_LABEL, type MysteryCase } from "./cases";
import { getScript, briefFor } from "./scripts";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Builds a self-contained, print-ready clue pack (host script + filled
 *  character sheets) and opens it in a new tab. */
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
  const script = getScript(mystery.slug);

  // ── Host-only solution ──
  const hostBrief = script
    ? `
    <section class="host">
      <div class="warn">★ Host Only · Do Not Read Aloud ★</div>
      <h2>The Solution</h2>
      <p>${esc(script.hostNote)}</p>
    </section>`
    : "";

  // ── How to run ──
  const howTo = script
    ? `
    <section class="run">
      <h2>How to Run the Night</h2>
      <ol>${script.howToRun.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
    </section>`
    : "";

  // ── Narrator script: intro · rounds · reveal ──
  const rounds = script
    ? script.rounds
        .map(
          (r) => `
      <div class="round">
        <h3>${esc(r.name)}</h3>
        <p class="say"><span class="cue">Read aloud:</span> ${esc(r.narration)}</p>
        <p class="do"><span class="cue">Host directs:</span> ${esc(r.instructions)}</p>
        <div class="clues">
          <span class="cue">Reveal these clues:</span>
          <ul>${r.clues.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
        </div>
      </div>`
        )
        .join("")
    : "";

  const narrator = script
    ? `
    <section class="script">
      <div class="kicker">The Narrator's Script</div>
      <h2>Opening</h2>
      <p class="say">${esc(script.intro)}</p>
      ${rounds}
      <h2 class="finale">The Reveal</h2>
      <p class="say">${esc(script.reveal)}</p>
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
      const b = briefFor(mystery.slug, s.name);
      return `
    <section class="sheet${b?.guilty ? " guilty" : ""}">
      <div class="stamp">Confidential · For ${esc(s.name)}'s Eyes Only · Suspect ${i + 1} of ${roster.length}</div>
      <h2>${esc(s.name)}</h2>
      <p class="role">${esc(s.title)}</p>
      <p class="flavor">"${esc(s.line)}"</p>
      ${field("Your relationship to the victim", b?.relationship)}
      ${field("The secret you must keep", b?.secret)}
      ${field("Where you were when it happened", b?.alibi)}
      ${field("What you will say if accused", b?.accused)}
      ${b?.guilty ? `<div class="mark">You are the murderer. Give nothing away.</div>` : ""}
      <div class="foot">VERDICT · ${esc(mystery.title)}</div>
    </section>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(mystery.title)} — Clue Pack</title>
<style>
  @page { margin: 16mm; }
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
    padding: 40px;
  }
  h1, h2, h3, .stamp, .role, .kicker, .warn { font-family: "Cinzel", Georgia, serif; }
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
      <div class="brief-h">The Premise</div><p>${esc(mystery.premise)}</p>
      <div class="brief-h">The Setting</div><p>${esc(mystery.setting)}</p>
      <div class="brief-h">The Victim</div><p>${esc(mystery.victim)}</p>
    </div>
  </div>

  ${hostBrief}
  ${howTo}
  ${narrator}

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
