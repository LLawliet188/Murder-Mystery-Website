// Crime-scene floor plans. Each case gets an illustrated plan (drawn as themed
// SVG by <FloorPlanMap/>) with clickable rooms that reveal a spoiler-safe clue.
// Geometry is shared via a few layouts; only labels + clues differ per case.

export interface Room {
  id: string;
  label: string;
  clue: string;
  x: number; // %, top-left, in a 0..100 × 0..72 viewBox
  y: number;
  w: number;
  h: number;
}

export interface FloorPlan {
  title: string;
  rooms: Room[];
}

type Cell = { x: number; y: number; w: number; h: number };

const L4: Cell[] = [
  { x: 6, y: 8, w: 40, h: 26 },
  { x: 54, y: 8, w: 40, h: 26 },
  { x: 6, y: 40, w: 40, h: 24 },
  { x: 54, y: 40, w: 40, h: 24 },
];

const L5: Cell[] = [
  { x: 6, y: 8, w: 40, h: 26 },
  { x: 52, y: 8, w: 42, h: 26 },
  { x: 6, y: 40, w: 26, h: 24 },
  { x: 38, y: 40, w: 24, h: 24 },
  { x: 68, y: 40, w: 26, h: 24 },
];

const L6: Cell[] = [
  { x: 6, y: 8, w: 26, h: 26 },
  { x: 37, y: 8, w: 26, h: 26 },
  { x: 68, y: 8, w: 26, h: 26 },
  { x: 6, y: 40, w: 26, h: 24 },
  { x: 37, y: 40, w: 26, h: 24 },
  { x: 68, y: 40, w: 26, h: 24 },
];

function place(layout: Cell[], rooms: { label: string; clue: string }[]): Room[] {
  return rooms.map((r, i) => ({ id: `r${i}`, ...layout[i], label: r.label, clue: r.clue }));
}

export const FLOORPLANS: Record<string, FloorPlan> = {
  "manor-of-whispers": {
    title: "Ravensmoor Hall",
    rooms: place(L6, [
      { label: "The Library", clue: "The bolt was thrown from the inside. So how did the killer leave?" },
      { label: "The Study", clue: "A decanter, two glasses — only one bears a smudge of lip-rouge." },
      { label: "The Great Hall", clue: "The longcase clock stopped at 11:48 — the minute the lights died." },
      { label: "The Conservatory", clue: "A pane stands open to the storm; muddy prints lead back indoors, not out." },
      { label: "The Servants' Stair", clue: "A candlestick is gone from its sconce. The wax is still warm." },
      { label: "The Cellar", clue: "Ledgers smoulder in the grate — someone burned a record of debts." },
    ]),
  },
  "midnight-express": {
    title: "The Midnight Express",
    rooms: place(L5, [
      { label: "Compartment Nine", clue: "The window latch is forced — yet the snow on the sill lies undisturbed." },
      { label: "The Dining Car", clue: "A torn ticket stub for a passenger the manifest never recorded." },
      { label: "The Lounge Car", clue: "Two cigarettes of the same rare brand, crushed in one ashtray." },
      { label: "The Galley", clue: "A carving knife, wiped clean and returned to the wrong drawer." },
      { label: "The Guard's Van", clue: "The emergency cord was pulled, then carefully re-set. By whom?" },
    ]),
  },
  "the-masquerade": {
    title: "Palazzo Contarini",
    rooms: place(L6, [
      { label: "The Grand Ballroom", clue: "Where the host fell mid-toast — his glass shattered, the wine unspilled." },
      { label: "The Hall of Mirrors", clue: "One mask, reflected, has no face behind it in the next glass." },
      { label: "The Loggia", clue: "A gondola slipped the water-gate moments after the clock struck twelve." },
      { label: "The Card Room", clue: "A debt of honour, signed tonight, torn in half by someone's hand." },
      { label: "The Music Gallery", clue: "The requiem's final page was inked before the host ever fell." },
      { label: "The Chapel", clue: "A vial of almond scent, emptied — the perfume of a certain poison." },
    ]),
  },
  "blood-and-bootleg": {
    title: "The Velvet Note",
    rooms: place(L6, [
      { label: "Behind the Bar", clue: "Where Lucky dropped — the till is full, but the ledger is gone." },
      { label: "The Stage", clue: "The band stopped mid-song; the singer's gloves are missing one." },
      { label: "The Back Booth", clue: "A reserved table, a spilled teacup of gin, a guest who never showed." },
      { label: "The Cellar Store", clue: "A crate of 'medicinal' whiskey, one bottle short, one print fresh." },
      { label: "The Office", clue: "The safe hangs open. Inside: blackmail, not banknotes." },
      { label: "The Alley Door", clue: "The lookout's chair is cold — he left his post at the worst moment." },
    ]),
  },
  "final-cut": {
    title: "Soundstage 7",
    rooms: place(L5, [
      { label: "The Set", clue: "The chalk death-mark is taped two feet from where she actually fell." },
      { label: "The Dressing Room", clue: "Her water glass smells faintly bitter. The understudy's is untouched." },
      { label: "The Lighting Gantry", clue: "A spotlight was re-aimed by hand; the gel is scorched and fresh." },
      { label: "The Producer's Office", clue: "A budget sheet in red ink, and a contract about to be voided." },
      { label: "The Prop Vault", clue: "The one prop pistol is gone — the only one ever loaded with blanks." },
    ]),
  },
  "keepers-light": {
    title: "The Lighthouse",
    rooms: place(L4, [
      { label: "The Lantern Room", clue: "The log ends mid-word; the pen rolled to the seaward side." },
      { label: "The Keeper's Quarters", clue: "Two cups of tea were brewed. One drained, one stone cold and full." },
      { label: "The Oil Store", clue: "A coil of rope, cut clean — not frayed. A blade was here." },
      { label: "The Landing Stage", clue: "Boot prints in the salt lead down to the water, and simply stop." },
    ]),
  },
  "the-ninth-seance": {
    title: "Madame Seraphine's Parlor",
    rooms: place(L6, [
      { label: "The Séance Parlor", clue: "Nine chairs set for eight sitters. The ninth is still warm." },
      { label: "The Reading Room", clue: "The planchette froze mid-glide, pointing at a name no one will say." },
      { label: "The Antechamber", clue: "A trapdoor hinge, freshly oiled. Spirits have no need of doors." },
      { label: "The Conservatory", clue: "Candle smoke drifts in a draught from a window said to be sealed." },
      { label: "The Servants' Passage", clue: "A length of wire and a bell — the trick behind the 'rapping' ghost." },
      { label: "The Locked Study", clue: "The patron's letter, naming one guest, half-fed to the fire." },
    ]),
  },
  "neon-requiem": {
    title: "The Halcyon Penthouse",
    rooms: place(L6, [
      { label: "The Atrium", clue: "Kade at his desk; the door logs swear they never opened. They lie." },
      { label: "The Server Spine", clue: "A ninety-second gap in the camera feed, surgically deleted." },
      { label: "The Sky Lounge", clue: "Two whisky glasses; one wiped of prints by a very steady hand." },
      { label: "The Bio-Lab", clue: "An access implant, cloned. The signature is Kade's. The hand was not." },
      { label: "The Safe Room", clue: "Sealed from inside — yet the air still carries another's scent-tag." },
      { label: "The Service Lift", clue: "A manual override, used once tonight, by a key that shouldn't exist." },
    ]),
  },
  "knife-at-the-gala": {
    title: "The Superyacht Mirabel",
    rooms: place(L5, [
      { label: "The Stateroom", clue: "Whitmore, below deck — a letter-opener where his cufflink should be." },
      { label: "The Sun Deck", clue: "Champagne for the toast he never finished; one flute, lipstick-rimmed." },
      { label: "The Bridge", clue: "The radio's tuning is smashed. No one ashore will hear a thing." },
      { label: "The Galley", clue: "The matching letter-opener is missing from the desk set." },
      { label: "The Tender Bay", clue: "Both boats are ashore — yet the davit ropes are wet and freshly run." },
    ]),
  },
  "carnival-of-shadows": {
    title: "The Carnival",
    rooms: place(L6, [
      { label: "The Big Top", clue: "The ringmaster took his bow and did not rise; the spotlight never moved." },
      { label: "The Carousel", clue: "It still turns, riderless — someone jammed the brake an hour ago." },
      { label: "The Teller's Tent", clue: "Cards laid for a death foretold — dealt before the show began." },
      { label: "The Strongman's Rig", clue: "An iron bar bent by hand, then wiped of the grease that coats the rest." },
      { label: "The Hall of Mirrors", clue: "A clown's painted tear, smeared — the one face that cannot lie." },
      { label: "The Curiosity Tent", clue: "A new exhibit, curtained off, that no patron paid to see." },
    ]),
  },
};

export function getFloorPlan(slug: string): FloorPlan | undefined {
  return FLOORPLANS[slug];
}
