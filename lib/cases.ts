// VERDICT — the case files.
// Each mystery declares a player range; rosters are ordered by importance so a
// smaller party draws the first N essential suspects (the "exact roster for that headcount").

export type IconKey =
  | "key"
  | "train"
  | "mask"
  | "bottle"
  | "film"
  | "lighthouse"
  | "planchette"
  | "circuit"
  | "glass"
  | "carousel";

export interface Suspect {
  name: string;
  title: string;
  line: string;
}

export interface MysteryCase {
  slug: string;
  title: string;
  teaser: string;
  premise: string;
  setting: string;
  victim: string;
  era: string;
  mood: string;
  playerMin: number;
  playerMax: number;
  ideal: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  duration: string; // estimated play time
  icon: IconKey;
  palette: { from: string; via: string; to: string; accent: string };
  included: string[];
  // Cast ordered by importance — first N are taken for an N-player party.
  cast: Suspect[];
  // Optional real cover art. Drop a file in /public/images and set its path
  // here to replace the procedural SVG cover (lazy-loaded with a blur-up).
  image?: string;
}

export const CASES: MysteryCase[] = [
  {
    slug: "manor-of-whispers",
    title: "The Manor of Whispers",
    teaser: "The patriarch lies dead in the locked library. Every heir had a reason.",
    premise:
      "Thunder splits the night over Ravensmoor Hall. When the storm knocks out the lights, the family gathers — and when they return, Lord Alistair is slumped over his will, the library bolted from within. The inheritance was about to change. Someone made sure it never would.",
    setting: "A Gothic Victorian estate, candlelit and rain-lashed, its halls hung with watching portraits.",
    victim: "Lord Alistair Ravensmoor — the patriarch, found at his desk.",
    era: "Victorian",
    mood: "Gothic",
    playerMin: 5,
    playerMax: 6,
    ideal: 6,
    difficulty: 4,
    duration: "2–3 hrs",
    icon: "key",
    palette: { from: "#1a1426", via: "#2a0e14", to: "#0a0a0f", accent: "#c9a227" },
    included: [
      "6 character dossiers & secret agendas",
      "The contested last will & testament",
      "Three rounds of sealed clue envelopes",
      "Host's script & timeline of the storm",
      "Printable wax-sealed invitations",
    ],
    cast: [
      { name: "Lady Cordelia Ravensmoor", title: "The Widow", line: "Composed in black, yet her grief arrived suspiciously well-rehearsed." },
      { name: "Julian Ravensmoor", title: "The Disinherited Son", line: "Cut from the will at noon. A corpse by midnight. Coincidence?" },
      { name: "Dr. Edmund Voss", title: "The Family Physician", line: "He signs the death certificates — and has signed worse." },
      { name: "Miss Agnes Thorn", title: "The Governess", line: "She hears everything through these walls. Tonight she heard too much." },
      { name: "Captain Reginald Hale", title: "The Soldier Cousin", line: "Decorated, charming, and drowning in gambling debt." },
      { name: "Silas Crowe", title: "The Executor", line: "Only he knew what the new will would say. Now no one ever will." },
    ],
  },
  {
    slug: "midnight-express",
    title: "Last Stop: Midnight Express",
    teaser: "A luxury train, a snowbound pass, and one passenger who never reaches his cabin.",
    premise:
      "The Midnight Express carves through the white silence of the mountains, brass fittings gleaming. Somewhere between the dining car and Compartment Nine, a passenger vanishes from the living and reappears among the dead. The tracks are buried in snow. No one boarded. No one left.",
    setting: "An art-deco sleeper carriage in the 1920s, snow blurring past frosted glass.",
    victim: "Henry Ashcombe — the man in Compartment Nine.",
    era: "1920s",
    mood: "Glamour",
    playerMin: 3,
    playerMax: 5,
    ideal: 4,
    difficulty: 3,
    duration: "1.5–2 hrs",
    icon: "train",
    palette: { from: "#0e1622", via: "#1d2433", to: "#0a0a0f", accent: "#d8be63" },
    included: [
      "5 passenger dossiers & boarding tickets",
      "A fold-out map of the carriages",
      "Timetable & conductor's logbook",
      "Two rounds of clue cards",
      "Host's script",
    ],
    cast: [
      { name: "Contessa Bianca Moreau", title: "The Fading Aristocrat", line: "Her jewels are real. Her title may not be." },
      { name: "Theodore Vance", title: "The Railway Financier", line: "He owns the line. Tonight the line owes him a body." },
      { name: "Léon Garnier", title: "The Off-Duty Inspector", line: "He swears he's only travelling. Inspectors never are." },
      { name: "Eliza Quinn", title: "The Novelist", line: "She came hunting a story. She may have written one in blood." },
      { name: "Dmitri", title: "The Night Porter", line: "He sees who enters every cabin — and says nothing. Until now." },
    ],
  },
  {
    slug: "the-masquerade",
    title: "The Masquerade",
    teaser: "Every face is hidden. So is every motive. The host falls at the stroke of midnight.",
    premise:
      "Beneath the gilded ceilings of a Venetian palazzo, masks turn and candlelight swims in the canal below. As the great clock strikes twelve, Il Padrone raises his glass to toast the new year — and crumples to the marble. No one saw a face. Everyone saw a chance.",
    setting: "A candlelit Venetian ballroom of masks and mirrors, the canal lapping at the steps.",
    victim: "Giovanni Contarini — 'Il Padrone', the host.",
    era: "Baroque Venice",
    mood: "Opulent",
    playerMin: 5,
    playerMax: 6,
    ideal: 6,
    difficulty: 5,
    duration: "2.5–3 hrs",
    icon: "mask",
    palette: { from: "#1b1030", via: "#3a0f2a", to: "#0a0a0f", accent: "#d8be63" },
    included: [
      "6 masked-guest dossiers & hidden agendas",
      "A set of printable Venetian masks",
      "The toast, the poison, and the timeline",
      "Three rounds of layered clue envelopes",
      "Host's script & seating chart",
    ],
    cast: [
      { name: "Signora Vittoria Falieri", title: "The Widow-to-Be", line: "She wore mourning to a celebration. She knew." },
      { name: "Count Lorenzo di Sangue", title: "The Rival", line: "Ruined by the host's hand. He came to settle accounts." },
      { name: "La Sirena", title: "The Masked Singer", line: "No one has ever seen her face. No one ever should." },
      { name: "Maestro Pietro Albani", title: "The Composer", line: "His requiem was finished before the host fell. Strange timing." },
      { name: "Cardinal Rinaldi", title: "The Church's Eyes", line: "He absolves sins. Some he commits first." },
      { name: "The Harlequin", title: "The Uninvited", line: "No name on the list. No reflection in the mirrors." },
    ],
  },
  {
    slug: "blood-and-bootleg",
    title: "Blood & Bootleg",
    teaser: "The jazz stops the instant the club owner is found behind his own bar.",
    premise:
      "The Velvet Note is the worst-kept secret in town — gin in the teacups, a cop at the door, and a song that never ends. Until it does. The band cuts out, the lights come up, and Lucky Marino is face-down behind the bar with his ledger missing. Everyone here owes someone. Tonight, somebody paid.",
    setting: "A smoky Prohibition speakeasy, neon bleeding through the haze, a gramophone gone silent.",
    victim: "Sal 'Lucky' Marino — the club owner.",
    era: "Prohibition",
    mood: "Jazz Noir",
    playerMin: 4,
    playerMax: 6,
    ideal: 5,
    difficulty: 3,
    duration: "2 hrs",
    icon: "bottle",
    palette: { from: "#0c1418", via: "#2a1a0a", to: "#0a0a0f", accent: "#e9b96b" },
    included: [
      "6 character dossiers & rap sheets",
      "The missing ledger (in pieces)",
      "Bootleg 'menu' & password cards",
      "Two rounds of clue cards",
      "Host's script & jazz playlist",
    ],
    cast: [
      { name: "Ruby Malone", title: "The Torch Singer", line: "Her voice could stop a room. So could her secrets." },
      { name: "Vincent Calabrese", title: "The Supplier", line: "He brings the gin and takes a cut. Lucky's cut got greedy." },
      { name: "Frank Doyle", title: "The Crooked Detective", line: "He raids the joint on Mondays and drinks here on Fridays." },
      { name: "Dot", title: "The Bartender", line: "She mixes every drink in this place — including the last one." },
      { name: "Harold Webb", title: "The Councilman", line: "Respectable by daylight. A regular after dark." },
      { name: "Jimmy 'Fingers'", title: "The Piano Man", line: "He plays through anything. He stopped playing tonight." },
    ],
  },
  {
    slug: "final-cut",
    title: "Final Cut",
    teaser: "The leading lady's final scene becomes her final breath — on a closed set.",
    premise:
      "On Soundstage 7, the cameras roll on the last shot of the year's biggest picture. 'Quiet on set,' calls the director. Then the spotlight catches Vivian Hart sinking to the floor, and this time it isn't acting. The doors were locked for the take. The only suspects are the ones who wanted her gone.",
    setting: "A golden-age Hollywood soundstage, one hot spotlight, an abandoned clapperboard.",
    victim: "Vivian Hart — the leading lady.",
    era: "1950s Hollywood",
    mood: "Glamour",
    playerMin: 3,
    playerMax: 5,
    ideal: 4,
    difficulty: 3,
    duration: "1.5–2 hrs",
    icon: "film",
    palette: { from: "#1a0e0e", via: "#2a2018", to: "#0a0a0f", accent: "#e9b96b" },
    included: [
      "5 studio dossiers & contracts",
      "The shooting script (with a missing page)",
      "Gossip-column clippings",
      "Two rounds of clue cards",
      "Host's script & call sheet",
    ],
    cast: [
      { name: "Marlene Frost", title: "The Understudy", line: "She knew every line of Vivian's part. Now she'll get to play it." },
      { name: "Victor Lang", title: "The Director", line: "A tyrant genius. He demanded one more take. He got a corpse." },
      { name: "Sammy Bloom", title: "The Producer", line: "The picture is over budget and the studio wants blood." },
      { name: "Chip Calloway", title: "The Leading Man", line: "Her co-star, her ex-lover, and the last face she saw." },
      { name: "Hedda Vane", title: "The Columnist", line: "She destroys careers for breakfast. Vivian's was on the menu." },
    ],
  },
  {
    slug: "keepers-light",
    title: "The Keeper's Light",
    teaser: "Cut off by storm, the lighthouse keeper's logbook ends mid-sentence.",
    premise:
      "The supply boat won't return for a week, and the sea has turned to iron. High in the lantern room, the keeper's log breaks off in the middle of a word — and the keeper is gone, the great light still turning over an empty chair. Four souls remain on the rock. One of them stopped his pen.",
    setting: "A remote lighthouse on black cliffs, a churning sea, a single lantern turning in the dark.",
    victim: "Ezra Vane — the lighthouse keeper.",
    era: "Edwardian",
    mood: "Isolation",
    playerMin: 3,
    playerMax: 4,
    ideal: 4,
    difficulty: 4,
    duration: "1.5 hrs",
    icon: "lighthouse",
    palette: { from: "#0a1620", via: "#13202b", to: "#0a0a0f", accent: "#ffcf8a" },
    included: [
      "4 character dossiers & secrets",
      "The keeper's torn logbook",
      "A nautical chart & tide table",
      "Two rounds of clue cards",
      "Host's script",
    ],
    cast: [
      { name: "Thomas Calder", title: "The Relief Keeper", line: "He came in on the last boat before the storm. Convenient." },
      { name: "Margaret Vane", title: "The Keeper's Wife", line: "She knows the rhythm of the light — and when it faltered." },
      { name: "Eli", title: "The Supply Boy", line: "He cannot speak. But he saw who climbed the stairs." },
      { name: "Reverend Stoke", title: "The Survivor", line: "Washed up from a wreck no one can find any record of." },
    ],
  },
  {
    slug: "the-ninth-seance",
    title: "The Ninth Séance",
    teaser: "A séance summons something far deadlier than a ghost.",
    premise:
      "Eight have gathered in Madame Seraphine's velvet parlor to reach beyond the veil — but the chairs were set for nine. As the planchette begins to move and the candles gutter low, the circle breaks with a scream. When the lights return, the patron sits cold at the head of the table, and the ninth chair is warm.",
    setting: "A spiritualist's velvet parlor, guttering candles, a planchette frozen mid-glide.",
    victim: "Lord Wexley — the séance's patron, at the head of the table.",
    era: "Victorian",
    mood: "Occult",
    playerMin: 4,
    playerMax: 6,
    ideal: 5,
    difficulty: 4,
    duration: "2 hrs",
    icon: "planchette",
    palette: { from: "#150a1f", via: "#241033", to: "#0a0a0f", accent: "#c9a227" },
    included: [
      "6 sitter dossiers & buried grief",
      "A printable spirit board & planchette",
      "The medium's 'messages from beyond'",
      "Three rounds of clue envelopes",
      "Host's script & candle cues",
    ],
    cast: [
      { name: "Madame Seraphine", title: "The Medium", line: "She speaks for the dead. Tonight the dead speak back — in accusation." },
      { name: "Cornelius Ashe", title: "The Grieving Widower", line: "He paid for one last word with his wife. He got a confession instead." },
      { name: "Lady Helena Frost", title: "The Skeptic", line: "She came to expose a fraud and found a murder." },
      { name: "Dr. Phineas Gould", title: "The Debunker", line: "He proves there are no ghosts. He cannot prove his own alibi." },
      { name: "Tobias", title: "The Assistant", line: "He works the wires and the smoke. What else did he work?" },
      { name: "The Ninth Guest", title: "The Uninvited", line: "No one invited them. No one remembers them arriving." },
    ],
  },
  {
    slug: "neon-requiem",
    title: "Neon Requiem",
    teaser: "A tech mogul, murdered inside his own sealed, 'unhackable' smart-penthouse.",
    premise:
      "Two hundred floors above the rain, Adrian Kade built a fortress of glass and code that nothing could enter and nothing could leave without his word. At 3:03 a.m. the building's logs show every door sealed, every camera blind for ninety seconds — and Kade dead at his desk. The system swears no one was there. The system is lying.",
    setting: "A rain-slicked cyber-noir megacity; a sealed smart-penthouse wrapped in drifting holograms.",
    victim: "Adrian Kade — founder of Halcyon Systems.",
    era: "Near-Future",
    mood: "Cyber-Noir",
    playerMin: 4,
    playerMax: 6,
    ideal: 6,
    difficulty: 5,
    duration: "2.5 hrs",
    icon: "circuit",
    palette: { from: "#06121a", via: "#2a0b2e", to: "#0a0a0f", accent: "#e23b54" },
    included: [
      "6 dossiers with encrypted secrets",
      "The penthouse system logs (redacted)",
      "Access-key cards & a 'deleted' message",
      "Three rounds of data-shard clues",
      "Host's script & 90-second timeline",
    ],
    cast: [
      { name: "Kestrel", title: "The Bodyguard", line: "Augmented to react in milliseconds. So why didn't she?" },
      { name: "Dr. Iris Vale", title: "The Implant Architect", line: "She wired Kade's mind to the building. She could unwire it too." },
      { name: "Jax Mercer", title: "The Rival's Fixer", line: "Paid to acquire Halcyon by any means. Murder is a means." },
      { name: "The Concierge", title: "The House Intelligence", line: "The penthouse's own mind. It logged everything — except the truth." },
      { name: "Niko Kade", title: "The Estranged Heir", line: "A netrunner cut off from the fortune. He knows every backdoor." },
      { name: "Det. Sana Cho", title: "The Investigator", line: "MetroPol sent her. Halcyon owns MetroPol. Whose side is she on?" },
    ],
  },
  {
    slug: "knife-at-the-gala",
    title: "A Knife at the Gala",
    teaser: "Champagne, buried secrets, and a body in the stateroom.",
    premise:
      "Anchored a mile offshore, the superyacht Mirabel glitters with the city's skyline and its dirtiest money. The host gathers his guests on deck for a toast he'll never finish — below, in the stateroom, Gerald Whitmore is found with a letter-opener where his cufflinks should be. The tender boats are still ashore. The party can't leave. Neither can the killer.",
    setting: "A billionaire's superyacht at night, distant city lights, champagne spilled on teak.",
    victim: "Gerald Whitmore — the billionaire host.",
    era: "Modern",
    mood: "Glamour",
    playerMin: 3,
    playerMax: 5,
    ideal: 4,
    difficulty: 2,
    duration: "1–1.5 hrs",
    icon: "glass",
    palette: { from: "#0a1418", via: "#10212b", to: "#0a0a0f", accent: "#d8be63" },
    included: [
      "5 guest dossiers & private grudges",
      "The guest manifest & seating plan",
      "A torn contract & a bounced cheque",
      "Two rounds of clue cards",
      "Host's script — beginner friendly",
    ],
    cast: [
      { name: "Sloane Whitmore", title: "The Heiress", line: "Daddy's fortune, daddy's contempt. Tonight she inherits both." },
      { name: "Marcus Vega", title: "The Investor", line: "Whitmore was about to pull the funding that keeps him afloat." },
      { name: "Capt. Yusuf Rahim", title: "The Captain", line: "He controls the only way off this boat. And the radio." },
      { name: "Delphine", title: "The Art Dealer", line: "She sold him a masterpiece. The masterpiece is a fake." },
      { name: "Bree", title: "The Influencer", line: "She was livestreaming the whole night. Until she wasn't." },
    ],
  },
  {
    slug: "carnival-of-shadows",
    title: "Carnival of Shadows",
    teaser: "The carnival rolls into town — and the ringmaster takes his final bow, permanently.",
    premise:
      "Stripes and lanterns rise at the edge of town, and the barker promises wonders for a nickel. Under the big top, the ringmaster lifts his hat for the closing bow and does not lift his head again. The carousel still turns. The crowd thinks it's part of the act. The performers know it isn't — because one of them wrote this finale.",
    setting: "A traveling 1930s carnival after dark — eerie striped tents, a still carousel, fog between the lights.",
    victim: "Augustus Vell — the ringmaster.",
    era: "1930s",
    mood: "Eerie",
    playerMin: 4,
    playerMax: 6,
    ideal: 5,
    difficulty: 4,
    duration: "2 hrs",
    icon: "carousel",
    palette: { from: "#1a0c1a", via: "#2a1410", to: "#0a0a0f", accent: "#e9b96b" },
    included: [
      "6 performer dossiers & old grudges",
      "A carnival map & ticket stubs",
      "The ringmaster's little black book",
      "Three rounds of clue envelopes",
      "Host's script & calliope playlist",
    ],
    cast: [
      { name: "Mistress Coralie", title: "The Fortune Teller", line: "She foresaw his death. The question is how she knew." },
      { name: "Hugo", title: "The Strongman", line: "Hands that bend iron bars. And, perhaps, a ringmaster's neck." },
      { name: "The Sisters Vane", title: "The Aerialists", line: "They share everything — including a motive." },
      { name: "Mr. Sloan", title: "The Money Man", line: "The books don't balance, and Vell had started asking why." },
      { name: "Pierrot", title: "The Silent Clown", line: "He has never spoken a word. He has witnessed every one." },
      { name: "Dr. Mortimer", title: "The Curator", line: "His tent of curiosities has a new exhibit no one paid to see." },
    ],
  },
];

export const ERAS = Array.from(new Set(CASES.map((c) => c.era)));
export const MOODS = Array.from(new Set(CASES.map((c) => c.mood)));
export const PARTY_SIZES = [3, 4, 5, 6] as const;
export type PartySize = (typeof PARTY_SIZES)[number];

export const DIFFICULTY_LABEL: Record<number, string> = {
  1: "Novice",
  2: "Amateur",
  3: "Inspector",
  4: "Hardened",
  5: "Master",
};

export function getCaseBySlug(slug: string): MysteryCase | undefined {
  return CASES.find((c) => c.slug === slug);
}

export function supportsParty(c: MysteryCase, n: number): boolean {
  return n >= c.playerMin && n <= c.playerMax;
}

export type Fit = "perfect" | "scalable" | "unsupported";

export function fitForParty(c: MysteryCase, n: number): Fit {
  if (!supportsParty(c, n)) return "unsupported";
  if (c.ideal === n || (c.playerMin === n && c.playerMax === n)) return "perfect";
  return "scalable";
}

// Returns the exact roster for an N-player party: the first N essential suspects,
// clamped to the case's supported range.
export function rosterFor(c: MysteryCase, n: number): Suspect[] {
  const count = Math.min(Math.max(n, c.playerMin), c.playerMax);
  return c.cast.slice(0, count);
}

// Matchmaking: supported cases only, ranked perfect-fit first, then by difficulty.
export function rankCasesForParty(n: number, pool: MysteryCase[] = CASES): MysteryCase[] {
  const rank: Record<Fit, number> = { perfect: 0, scalable: 1, unsupported: 2 };
  return pool
    .filter((c) => supportsParty(c, n))
    .sort((a, b) => {
      const fa = rank[fitForParty(a, n)];
      const fb = rank[fitForParty(b, n)];
      if (fa !== fb) return fa - fb;
      return b.difficulty - a.difficulty;
    });
}
