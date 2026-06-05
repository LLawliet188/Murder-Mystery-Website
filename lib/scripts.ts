// VERDICT — the playable layer.
//
// Each case ships a complete, runnable mystery: a narrator script the host
// reads aloud, a three-round structure with clues to release, a private brief
// for every suspect (relationship · secret · alibi · what they say if accused),
// a host-only solution, and setup instructions.
//
// Design rule: the culprit is always one of the first `playerMin` suspects in a
// case's `cast`, so the mystery stays solvable at every supported party size —
// the extra suspects in larger parties are deliberate red herrings.

export interface CharacterBrief {
  /** Must match a suspect's `name` in lib/cases.ts (aligned to cast order). */
  name: string;
  guilty?: boolean;
  /** Their tie to the victim. */
  relationship: string;
  /** The thing they must hide. For the killer, this is their confession. */
  secret: string;
  /** Where they claim to have been. */
  alibi: string;
  /** Their line when the finger is pointed. */
  accused: string;
}

export interface Round {
  name: string;
  /** Read aloud by the host. */
  narration: string;
  /** What the host directs the table to do this round. */
  instructions: string;
  /** Evidence / clue cards released this round. */
  clues: string[];
}

export interface CaseScript {
  /** Host-only one-paragraph solution. Never read aloud before the reveal. */
  hostNote: string;
  /** Opening narration, read aloud once everyone is in character. */
  intro: string;
  rounds: Round[];
  /** The final narration that names the killer. */
  reveal: string;
  /** Descriptive setup / how-to-run notes for the host. */
  howToRun: string[];
  /** Private briefs, aligned to the case's cast order. */
  briefs: CharacterBrief[];
}

export const SCRIPTS: Record<string, CaseScript> = {
  // ──────────────────────────────────────────────────────────────────────
  "manor-of-whispers": {
    hostNote:
      "The killer is DR. EDMUND VOSS. Years ago Voss quietly let Cordelia's first husband die for a fee; Lord Alistair had finally found the old, altered death certificate and meant to expose him at the reading of the new will. Voss laced Alistair's nightly digestive tonic with a slow poison before dinner. Alistair carried the tonic into the library, bolted the door himself out of habit, drank, and died — which is why the room was locked from the inside and no one needed to enter. The 'locked room' is the trick: the poison was already in him.",
    intro:
      "Thunder walks the halls of Ravensmoor tonight. You came for the reading of Lord Alistair's new will — and found him slumped over it instead, the library bolted from the inside, the lamp still burning. The storm took the lights at a quarter to midnight; when they returned, he was already cooling. No window was forced. No door was breached. And yet one of you, seated at this very table, has done murder. Look around. Smile. Lie beautifully.",
    rounds: [
      {
        name: "Round One — The Reading That Never Came",
        narration:
          "Silas was to read the new will at midnight. Everyone here knew their place in it would change — and everyone here arrived early. Tell us who you are, and what Lord Alistair was to you.",
        instructions:
          "Each player reads their name, title, and flavour line aloud, then answers in character: what did you stand to gain or lose from the new will? No one may yet reveal their Secret.",
        clues: [
          "The library door was bolted from the inside — only Alistair's key fits the bolt.",
          "A single brandy glass sits at his elbow, a faint cloudy residue dried at the bottom.",
          "The longcase clock in the Great Hall stopped at 11:48, the moment the storm cut the power.",
        ],
      },
      {
        name: "Round Two — What the Portraits Saw",
        narration:
          "The house keeps secrets the way the dead keep still. Search it. Every room here remembers something — and someone has already tried to make a room forget.",
        instructions:
          "Open the floor plan. Going clockwise, each player names one room to 'search' and reads its clue aloud. Then every player must reveal their Secret to ONE other player of their choice — privately. Accusations may begin.",
        clues: [
          "Cellar: ledgers were burned in the grate tonight — a record of debts someone wanted gone.",
          "Servants' Stair: a candlestick is missing from its sconce; the wax is still warm.",
          "Dr. Voss's medical bag is short one brown bottle — the label reads 'digestive tonic'.",
        ],
      },
      {
        name: "Round Three — The Verdict",
        narration:
          "The storm is breaking. The constable's lantern is already crossing the moor. Before he arrives, this table will name a murderer — or let one walk free forever.",
        instructions:
          "Each player makes their final case for who they believe is guilty and why. Then everyone votes at once, pointing at the accused. Tally the votes, then read the Reveal.",
        clues: [
          "The cloudy residue in the brandy glass matches no wine — it is a medicinal tincture.",
          "Alistair's new will named no new heir; it named a CRIME, and the person who committed it.",
          "Whoever poisoned him never needed to enter the locked library at all.",
        ],
      },
    ],
    reveal:
      "The bolt was a red herring; the poison was already inside him. Lord Alistair's 'new will' was no will at all — it was an accusation. He had unearthed the altered certificate proving that Dr. Edmund Voss let his patient die for a purse of guineas years ago. So Voss salted the nightly tonic before dinner, knowing Alistair would carry it to his study and lock himself in as he always did. The killer is DR. EDMUND VOSS — and the locked door was never a barrier. It was an alibi.",
    howToRun: [
      "Print one character sheet per guest from the Clue Pack and hand each player only their own — never let players read another's secret.",
      "Read the Intro aloud once everyone has taken a character. Use a low light and let the storm do the work.",
      "Run three rounds. Read each round's narration, give the instruction, then reveal that round's clues (read them or hand out the matching clue cards).",
      "Between rounds, let players move, whisper, and accuse freely — the floor plan rooms are theirs to 'search'.",
      "After the Round Three vote, read the Reveal. Then let the guilty party (Dr. Voss) confess in their own words.",
    ],
    briefs: [
      { name: "Lady Cordelia Ravensmoor", relationship: "Alistair's second wife, widowed twice over.", secret: "Your first husband did not die of a weak heart — Dr. Voss signed the certificate, and you have always half-suspected why. You said nothing because Voss has letters that would ruin you.", alibi: "In the drawing room with your needlework when the lights died; you heard nothing over the thunder.", accused: "\"I have buried two husbands. Do you truly think I would soil my own house with a third scandal?\"" },
      { name: "Julian Ravensmoor", relationship: "Alistair's son, cut from the will at noon today.", secret: "You are drowning in debts your father refused to pay, and you came tonight to beg him one last time. He laughed at you. You are not a murderer — but you did steal the burned ledger from the cellar to hide how much you owe.", alibi: "Smoking on the conservatory steps in the rain; no one can vouch for you.", accused: "\"Disinherited at noon, accused by midnight. How tidy. I wanted his money — alive, you fools, not dead.\"" },
      { name: "Dr. Edmund Voss", guilty: true, relationship: "The family physician, trusted with every Ravensmoor life — and death.", secret: "YOU killed him. Years ago you let Cordelia's first husband die for a fee and forged the certificate. Alistair found it and meant to expose you tonight, so you poisoned his digestive tonic before dinner. He locked himself in and drank it alone. Deny everything. The missing brown bottle is in your bag — get rid of it if you can.", alibi: "Attending to a 'headache' upstairs alone when the lights failed — conveniently far from witnesses.", accused: "\"I have kept this family alive for thirty years. I took an oath. You insult the oath and the man who took it.\"" },
      { name: "Miss Agnes Thorn", relationship: "The governess, who hears everything through these walls.", secret: "You overheard Alistair and Voss arguing about 'an old certificate' this afternoon, and you know more than you should. You keep quiet because you have been secretly in love with Julian for years and fear being dragged into his ruin.", alibi: "Putting the children to bed in the east wing; the eldest woke at the thunder and can vouch for you.", accused: "\"I hear everything in this house, sir. If I were the killer, I would hardly draw attention by hearing too much.\"" },
      { name: "Captain Reginald Hale", relationship: "Alistair's cousin, charming and catastrophically in debt.", secret: "You begged Alistair for a loan to cover gambling debts that could see you cashiered, and he agreed — the loan papers are in your coat. His death is a disaster for you, not a windfall: the promise dies with him.", alibi: "In the billiard room with a decanter; the butler refilled it twice and saw you there.", accused: "\"I needed him solvent and breathing. Killing the only man who'd lend me a shilling — there's strategy for you.\"" },
      { name: "Silas Crowe", relationship: "The executor, the only soul who knew what the new will would say.", secret: "You know the 'will' was really Alistair's written accusation against Voss — and you have been quietly skimming the estate accounts for years. You fear that any investigation will expose your own theft, so you would rather this be ruled a tragic accident.", alibi: "Locked in the study office preparing the documents; the door was seen shut the whole evening.", accused: "\"I am the only one who knows what that document truly said. If I were guilty, would I not simply have burned it?\"" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  "midnight-express": {
    hostNote:
      "The killer is CONTESSA BIANCA MOREAU. Her title is stolen — years ago she was a jewel thief, and Henry Ashcombe was the insurance man who nearly caught her. He recognised her at dinner and meant to telegraph the police at the next station. As the train passed through the long tunnel and the lamps guttered, she slipped from her cabin to his, and used his own forced-window 'burglar' story against him. The undisturbed snow on the sill proves no one came from outside: the killer was already aboard.",
    intro:
      "Snow erases the world beyond the glass; inside, the brass gleams and the wine is warm. Somewhere between the dining car and Compartment Nine, Henry Ashcombe stepped out of the living and into the dead. The pass is buried; the train cannot move; no one boarded, and no one left. So the truth is simple, and unbearable: a passenger on this carriage is a murderer. Pour the wine. Mind your alibis.",
    rounds: [
      {
        name: "Round One — All Aboard",
        narration:
          "Six strangers, one carriage, and a body in Compartment Nine. Tell us who you are and why you boarded the Midnight Express tonight — and what Henry Ashcombe was to you.",
        instructions:
          "Each player introduces their character and states their reason for travelling. No Secrets yet — but everyone should lie at least a little.",
        clues: [
          "Compartment Nine's window latch was forced from inside — yet the snow on the sill lies perfectly undisturbed.",
          "Ashcombe's pocket-book is missing a page; the torn edge remains.",
          "The conductor confirms no one boarded or left after the pass — the killer is in this carriage.",
        ],
      },
      {
        name: "Round Two — The Tunnel",
        narration:
          "When the train took the long tunnel, the lamps died for ninety seconds. In that dark, someone walked the corridor who swears they never moved. Search the carriages — and search each other.",
        instructions:
          "Each player 'searches' one room from the floor plan and reads its clue. Then reveal your Secret to one other player privately. Begin questioning alibis.",
        clues: [
          "Lounge Car: two cigarettes of the same rare Turkish brand, crushed in a single ashtray.",
          "Galley: a carving knife wiped clean and returned to the wrong drawer.",
          "The torn page named a woman wanted years ago for a string of jewel thefts — no name, only a description.",
        ],
      },
      {
        name: "Round Three — Last Stop",
        narration:
          "A plough is coming up the line; in an hour the police will board. Name your murderer now, while the snow still holds your secrets.",
        instructions:
          "Each player accuses someone and states their evidence. Vote together, then read the Reveal.",
        clues: [
          "The description on the torn page matches a passenger seated at this very table.",
          "Ashcombe was an insurance investigator, not a financier — he hunted thieves.",
          "The forced window was staged: no footprints, no snowmelt, no one from outside.",
        ],
      },
    ],
    reveal:
      "Henry Ashcombe never sold insurance — he hunted the people who defrauded it. Years ago he nearly caught a jewel thief who vanished into a stolen aristocratic name. Tonight, across the dining car, he recognised her: the Contessa Bianca Moreau, whose jewels are real because she stole them. He meant to wire the police at the next station. So in the dark of the tunnel she slipped to Compartment Nine, silenced him, and forced the window to invent a burglar who was never there. The killer is CONTESSA BIANCA MOREAU — and the snow on the sill never lied.",
    howToRun: [
      "Hand each guest only their own character sheet. The Contessa's sheet tells her she is guilty; no one else's does.",
      "Read the Intro with the lights low — a single warm lamp is perfect for a night train.",
      "Play three rounds: narration, instruction, then release that round's clues.",
      "Encourage players to move between 'cars' and whisper deals — alibis should shift and crack.",
      "After the final vote, read the Reveal and let the Contessa give her confession in style.",
    ],
    briefs: [
      { name: "Contessa Bianca Moreau", guilty: true, relationship: "A glittering stranger Ashcombe seemed to recognise at dinner.", secret: "YOU are no contessa. The title and the jewels are stolen, and Ashcombe was the investigator who nearly took you years ago. He recognised you tonight and meant to telegraph the police. In the tunnel's dark you went to Compartment Nine, silenced him, and forced the window to fake a burglar. The torn page describes YOU. Charm them. Confess nothing.", alibi: "Asleep in your private cabin with the door locked; your maid — who does not exist tonight — can 'vouch' for you.", accused: "\"Do I look like a woman who climbs through windows in the snow? I have people for that sort of thing, darling.\"" },
      { name: "Theodore Vance", relationship: "The railway financier — Ashcombe was reviewing his line's accounts.", secret: "Your railway is quietly bankrupt and you have been cooking the books. You feared Ashcombe was here to audit you, and you are relieved he is dead — though you did not kill him. You bribed the porter to lose certain papers.", alibi: "In the lounge car with a brandy; the porter served you all night and saw you there.", accused: "\"My ledgers are a mess, I grant you. My conscience, however, is spotless. I ruin men with paper, not knives.\"" },
      { name: "Léon Garnier", relationship: "An off-duty inspector who 'happens' to be travelling.", secret: "You are not off duty at all — you were trailing Ashcombe, who you suspected was blackmailing a witness in your own case. His death has cost you a lead. You hid your badge so as not to take charge of a scene you are too entangled in.", alibi: "Standing in the corridor for a smoke when the tunnel went dark; you saw a figure pass but not its face.", accused: "\"An inspector travels, yes. If I meant to kill a man, Monsieur, I would not advertise the profession.\"" },
      { name: "Eliza Quinn", relationship: "A mystery novelist who befriended Ashcombe over dinner.", secret: "You came hunting material for a book — and Ashcombe let slip he was 'about to catch a famous thief on this very train.' You wrote it all in your notebook, which makes you a witness who doesn't yet realise what she saw.", alibi: "Writing in the dining car until late; the steward cleared your table and remembers your endless coffee.", accused: "\"I write murders, I don't commit them — the research is dreadful and the hours are worse.\"" },
      { name: "Dmitri", relationship: "The night porter who sees who enters every cabin.", secret: "You saw the Contessa leave her cabin during the tunnel — but you also pocketed a banknote from Vance to 'forget' some papers, and you fear that if you speak, your own small corruption will surface.", alibi: "Working the corridor all night; you were everywhere and nowhere, as porters are.", accused: "\"I see everything on this train, monsieur — which is exactly why I would never be foolish enough to be seen doing murder.\"" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  "the-masquerade": {
    hostNote:
      "The killer is MAESTRO PIETRO ALBANI. Contarini stole Albani's greatest composition years ago and passed it off as a commission, ruining the composer and breaking him. Albani spent a year writing a 'requiem' — really a confession set to music — and finished it before the murder. At the stroke of midnight he poisoned the host's toasting glass with an almond-scented tincture from the chapel. Behind the masks, no one saw his face; the finished requiem and the emptied vial are the proof.",
    intro:
      "Candlelight swims in the canal, and behind every mask a stranger smiles. At the twelfth stroke, Il Padrone raised his glass to the new year — and folded to the marble before the toast was done. No face was seen. No name was spoken. But every guest here had a reason, and one of you carried it under your mask all night. Choose a mask. Choose a lie. The clock is already striking.",
    rounds: [
      {
        name: "Round One — The Unmasking Begins",
        narration:
          "Il Padrone gathered Venice's finest to watch him triumph. Now he lies beneath his own chandelier. Tell us which mask you wear, and what the host was to you.",
        instructions:
          "Each player introduces their masked character and their public connection to the host. Keep your Secret hidden — for now.",
        clues: [
          "The host's wine glass shattered as he fell, yet the marble beneath is dry — the wine was already drunk.",
          "A faint scent of bitter almonds clings to the rim of the broken glass.",
          "His final toast praised 'a great work, at last my own' — words that made one guest go pale.",
        ],
      },
      {
        name: "Round Two — Mirrors and Lies",
        narration:
          "This palazzo is built of mirrors, and tonight every mirror tells a different story. Walk its rooms. Find what the host hid — and what someone hid from him.",
        instructions:
          "Each player searches one room from the floor plan and reads its clue. Then privately reveal your Secret to one other guest. Suspicion may sharpen into accusation.",
        clues: [
          "Chapel: a small vial that once held an almond-scented tincture sits empty behind the altar.",
          "Music Gallery: a finished requiem, dated yesterday — its final page already inked.",
          "Card Room: a debt of honour signed tonight, torn cleanly in two.",
        ],
      },
      {
        name: "Round Three — The Stroke of Twelve",
        narration:
          "Dawn is coming up the canal, and with it the magistrate's gondola. Before the masks come off for good, name the one who emptied that glass.",
        instructions:
          "Each player accuses and argues. Vote together, then read the Reveal.",
        clues: [
          "The 'great work' the host toasted was a composition he had stolen and claimed as his own.",
          "The requiem in the gallery was finished BEFORE the murder — the killer planned the ending.",
          "The almond scent is the signature of the chapel's tincture, now empty.",
        ],
      },
    ],
    reveal:
      "The toast was the host's last mistake. 'A great work, at last my own' — but it was never his. Years ago Giovanni Contarini stole the Maestro's masterpiece and passed it off as a commission, leaving Pietro Albani ruined and forgotten. So Albani composed a requiem — a confession in music — and finished it the day before the ball. At midnight, behind a mask no one could read, he tipped the chapel's almond tincture into the host's glass and let him toast himself into the grave. The killer is MAESTRO PIETRO ALBANI. The requiem was always meant to be played at a funeral.",
    howToRun: [
      "Print the masks included in the pack (or have guests bring their own) and hand each player only their own sheet.",
      "Read the Intro at midnight if you can — candlelight and a clock chiming twelve set the scene.",
      "Run three rounds: narration, instruction, clues. Let masks stay on until the final reveal.",
      "Allow guests to drift the 'rooms', strike bargains, and trade accusations between rounds.",
      "After the vote, read the Reveal and let the Maestro confess — ideally with a little music.",
    ],
    briefs: [
      { name: "Signora Vittoria Falieri", relationship: "The host's mistress, who wore mourning to a celebration.", secret: "You knew Contarini was about to discard you for a younger woman, and you wore black tonight because you sensed an ending coming. You did not kill him — but you DID empty his strongbox of your love letters before the magistrate could find them.", alibi: "Dancing the pavane in the centre of the ballroom when he fell; a dozen masks saw you.", accused: "\"I wore mourning because I already knew he had killed what we were. Grief is not the same as guilt.\"" },
      { name: "Count Lorenzo di Sangue", relationship: "A rival noble the host ruined in a land dispute.", secret: "Contarini bankrupted your house and you came tonight to challenge him publicly — the torn debt in the card room is yours, voided by his death. You wanted him humiliated and alive, not dead and martyred.", alibi: "At the card table losing badly; three players and a servant watched you the whole hour.", accused: "\"I wanted to ruin him in the daylight, before all of Venice. A poisoner works in the dark. I am not so modest.\"" },
      { name: "La Sirena", relationship: "The masked singer the host hired — and pursued.", secret: "No one has ever seen your face, and you intend to keep it that way: under the mask you are a woman the host once jilted at the altar, returned in disguise. You came for the truth, not for blood — but if unmasked, your scandal will eclipse the murder.", alibi: "Singing on the gallery stair when the host collapsed; the whole room was turned toward your voice.", accused: "\"You accuse a voice with no face. How very Venetian. I sang while he died — ask anyone who wept.\"" },
      { name: "Maestro Pietro Albani", guilty: true, relationship: "The court composer the host had 'commissioned'.", secret: "YOU killed him. Contarini stole your masterpiece years ago and called it his own, and tonight he toasted 'a great work, at last my own' to your face. So you finished a requiem for him — done the day before — and at midnight you emptied the chapel's almond tincture into his glass. Behind your mask, no one saw. Let them admire the music. Confess nothing.", alibi: "At the harpsichord 'tuning' when the clock struck; you stepped away only to fetch sheet music — or so you say.", accused: "\"I gave that man my life's work and he gave me his name on it. If I wanted him dead, would I leave a requiem with my own hand on every page?\"" },
      { name: "Cardinal Rinaldi", relationship: "The host's confessor — and keeper of his sins.", secret: "Contarini confessed many things to you, including the theft of Albani's music — and you absolved him for a generous donation. You stay silent because the seal of confession also conceals your own simony.", alibi: "Hearing a noblewoman's confession in the side chapel; she will vouch for the hour, if not the sins.", accused: "\"I absolve murderers, child. I do not become them. My hands are for blessing — and, occasionally, for collection.\"" },
      { name: "The Harlequin", relationship: "An uninvited guest with no name on the list.", secret: "You are the host's illegitimate son, slipped in under a harlequin's mask to see the father who never claimed you. You came to confront him, found him dead, and now fear that being discovered here will make you the obvious suspect.", alibi: "No one invited you, so no one watched you — your greatest danger tonight.", accused: "\"No name, no reflection, no invitation — I know how it looks. But I came to be acknowledged by him, not to bury him.\"" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  "blood-and-bootleg": {
    hostNote:
      "The killer is FRANK DOYLE, the crooked detective. Lucky Marino's ledger recorded every bribe Doyle ever took — and Lucky, about to be squeezed by the feds, was ready to trade the ledger (and Doyle) for immunity. So Doyle slipped behind the bar during a loud number, poisoned Lucky's private bottle, and took the ledger. The missing ledger points straight at the man who most needed it gone.",
    intro:
      "The gin is in the teacups and the band is hot and the law is paid to look away. Then the music stops mid-bar, the houselights come up ugly, and Lucky Marino is face-down behind his own bar — his ledger gone with him. Everybody in this joint owes somebody. Tonight, somebody settled up. Find a glass. Find an alibi. The raid's not the thing you should be afraid of.",
    rounds: [
      {
        name: "Round One — Last Call",
        narration:
          "Lucky ran the worst-kept secret in town, and everybody here had a tab with him — in money or in favours. Tell us who you are and what Lucky was to you.",
        instructions:
          "Each player introduces themselves and their angle with Lucky. No Secrets yet — but everybody's got an angle.",
        clues: [
          "The till is full — this was no robbery.",
          "Lucky's private bottle of the good stuff sits half-poured behind the bar, the glass beside it.",
          "His ledger — the one that names who paid who — is gone.",
        ],
      },
      {
        name: "Round Two — The Books",
        narration:
          "That ledger was Lucky's insurance policy, and somebody just cancelled it. Toss the joint. Everybody in here is in those books — except the one who took them.",
        instructions:
          "Each player searches one room on the floor plan and reads its clue. Then reveal your Secret to one other player privately. Start naming names.",
        clues: [
          "Office: the safe hangs open — inside, blackmail, not banknotes.",
          "Cellar Store: one bottle of the private stock is missing; a fresh fingerprint smears the next.",
          "Lucky's glass smells of more than gin — a bitter note underneath.",
        ],
      },
      {
        name: "Round Three — Closing Time",
        narration:
          "Word is the feds are two blocks out and coming fast. Name the one who poisoned the boss before the wagons pull up — or watch them all walk.",
        instructions:
          "Each player makes their accusation and case. Vote together, then read the Reveal.",
        clues: [
          "Lucky was about to turn state's evidence — and trade the ledger for his own freedom.",
          "The poison was in his private bottle, which only a regular would know to reach for.",
          "Every name in that ledger had reason to want it gone — but only one needed it destroyed.",
        ],
      },
    ],
    reveal:
      "The till was full, so it was never about the money — it was about the book. Lucky Marino's ledger named every cop he ever greased, and with the feds breathing down his neck, Lucky was ready to trade that book for immunity. Top of the list: Detective Frank Doyle, who raids the joint on Mondays and drinks here on Fridays. So Doyle leaned over the bar during a hot number, dropped a little something in Lucky's private bottle, and walked out with the ledger under his coat. The killer is FRANK DOYLE — the only man in the room the law would never think to search.",
    howToRun: [
      "Hand each guest only their sheet. Doyle's tells him he's guilty and holds the ledger.",
      "Read the Intro over a jazz record, low and smoky. Teacups of 'gin' are encouraged.",
      "Run three rounds: narration, instruction, clues. Let players cut deals at the bar.",
      "The floor-plan rooms are the joint — let players toss them for clues each round.",
      "After the vote, read the Reveal and let Doyle talk his way out of it before he can't.",
    ],
    briefs: [
      { name: "Ruby Malone", relationship: "The torch singer Lucky was sweet on — and controlling.", secret: "Lucky held your old name and your old record over you to keep you singing for free. You're glad he's gone, but you didn't do it — though you did pocket the cash from his coat before anyone looked, money you say he owed you.", alibi: "On stage mid-song when the lights came up; the whole room had their eyes on you.", accused: "\"Honey, I make my living with my voice, not with poison. He owned a piece of me — dead, he owns nothing.\"" },
      { name: "Vincent Calabrese", relationship: "The supplier whose gin keeps the taps running.", secret: "Lucky was skimming your cut and you'd threatened him over it last week in front of witnesses. You wanted your money, not his corpse — and now your best customer is cold and you look like the obvious man.", alibi: "Unloading crates in the alley with two of your boys when it happened; they'll swear to it.", accused: "\"I sell the man his liquor. You don't kill the golden goose, you squeeze it. Bad for business, this.\"" },
      { name: "Frank Doyle", guilty: true, relationship: "The crooked detective who raids on Mondays and drinks on Fridays.", secret: "YOU killed him. Lucky's ledger names every bribe you ever took, and he was about to trade it — and you — to the feds for immunity. So you dropped poison in his private bottle during a loud number and took the book. It's on you right now. Play the cop. Offer to 'investigate'. Confess nothing.", alibi: "'Doing your rounds' outside when it happened — the one man no one thinks to question.", accused: "\"You're accusing the law? That's rich. I'm the one fella in here with a badge and a clean glass. Watch yourselves.\"" },
      { name: "Dot", relationship: "The bartender who mixes every drink in the place.", secret: "You mixed Lucky's last drink, which makes you the obvious suspect — and you know it. The truth: you saw Doyle reach behind the bar and you're terrified to say so, because Doyle knows YOU run numbers on the side.", alibi: "Behind the bar all night in plain sight; a dozen drinkers watched you pour.", accused: "\"Sure, I made his drink — same as I made yours, and you're still breathing. I pour the liquor; I don't lace it.\"" },
      { name: "Harold Webb", relationship: "A respectable councilman by day, a regular after dark.", secret: "Lucky was blackmailing you with photographs of your nights here — the contents of that open safe. You came tonight to pay him off, and his death conveniently ends the threat, which makes you look very guilty indeed.", alibi: "In the back booth nursing a drink alone; no one was watching the councilman.", accused: "\"A man in my position cannot afford a scandal — least of all a murder. I came to make a problem quiet, not permanent.\"" },
      { name: "Jimmy 'Fingers'", relationship: "The piano man who plays through anything.", secret: "You stopped playing the instant Lucky fell — because from the stage you saw a figure lean behind the bar a moment before. You can't be sure who, and you owe Lucky's outfit money, so you're afraid speaking up paints a target on you.", alibi: "At the piano the whole set; the band will tell you that you didn't miss a note until the end.", accused: "\"I play, man, that's all I do. My hands were on the keys the whole night — ask the band, they were watching me sweat.\"" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  "final-cut": {
    hostNote:
      "The killer is MARLENE FROST, the understudy. She swapped a blank in the scene's prop pistol for a live round, so that Chip Calloway — firing on cue — became the unwitting instrument of Vivian's death. Marlene knew every line of Vivian's part and craved it; with Vivian gone, the role is hers. The chalk death-mark taped two feet off proves Vivian wasn't standing on her blocking — she'd moved into the line of a gun that should have been harmless.",
    intro:
      "'Quiet on set.' The cameras roll on the last shot of the biggest picture of the year. The director calls action, the leading man raises the prop pistol — and Vivian Hart sinks to the floor for real. The stage doors were locked for the take. The only people who could have done it are the ones who wanted her gone, and every one of them is standing in the light right now. Lights. Camera. Murder.",
    rounds: [
      {
        name: "Round One — Action",
        narration:
          "Vivian Hart was the brightest star on the lot and the hardest woman to love. Tell us who you are on this picture, and what she was to you.",
        instructions:
          "Each player introduces their role on the production and their history with Vivian. No Secrets yet.",
        clues: [
          "The doors were locked for the take — no one entered or left the soundstage.",
          "The chalk mark for where Vivian should have stood is taped two feet from where she fell.",
          "The scene called for Chip to 'shoot' Vivian with the prop pistol — which everyone believed held blanks.",
        ],
      },
      {
        name: "Round Two — Between Takes",
        narration:
          "A locked stage. A loaded prop. Somebody on this set turned make-believe into murder. Search the lot — and the people on it.",
        instructions:
          "Each player searches one room from the floor plan and reads its clue. Then reveal your Secret to one other player privately. Begin the accusations.",
        clues: [
          "Prop Vault: the prop pistol's box is empty — the gun, and its blanks, are gone.",
          "Dressing Room: Vivian's water glass smells faintly bitter; the understudy's, beside it, is untouched.",
          "Lighting Gantry: a spotlight was re-aimed by hand, scorching the gel — someone wanted Vivian lit just so.",
        ],
      },
      {
        name: "Round Three — That's a Wrap",
        narration:
          "The studio's fixers are already in the lot, ready to bury this as an accident. Name the killer now, before the story gets rewritten.",
        instructions:
          "Each player accuses and makes their case. Vote together, then read the Reveal.",
        clues: [
          "The fatal round was real — someone swapped a blank for a live bullet before the take.",
          "Chip fired the gun, but he fired it believing it was harmless — he is the weapon, not the hand.",
          "Only someone who knew the blocking and the script could place a live round and move Vivian into it.",
        ],
      },
    ],
    reveal:
      "Chip Calloway pulled the trigger — but Chip didn't kill her. Someone swapped a blank in that prop pistol for a live round, and nudged the blocking so Vivian stepped into its path. Someone who knew every beat of the scene, every line of Vivian's part, and exactly what she stood to inherit if the star never finished the take: Marlene Frost, the understudy who'd get to play the role at last. The killer is MARLENE FROST — and Chip was just the trigger she chose.",
    howToRun: [
      "Hand each guest only their sheet. Chip's sheet tells him he fired the gun believing it safe; Marlene's tells her she's guilty.",
      "Read the Intro like a director calling a scene. A single 'spotlight' lamp works beautifully.",
      "Run three rounds: narration, instruction, clues — release the clue cards like dailies.",
      "Let players roam the 'lot' rooms and trade studio gossip between rounds.",
      "After the vote, read the Reveal — and let Chip realise, on the spot, what he was used for.",
    ],
    briefs: [
      { name: "Marlene Frost", guilty: true, relationship: "Vivian's understudy, who knows every line of the part.", secret: "YOU killed her. You swapped a blank in the prop pistol for a live round and quietly re-taped Vivian's mark so she'd step into the shot. Chip pulled the trigger never knowing. With Vivian gone, the role — and the spotlight — is finally yours. Grieve loudly. Confess nothing. The empty prop box is your one danger.", alibi: "Watching from the shadows just off-set, 'ready to step in if needed' — which no one thought twice about.", accused: "\"I worshipped Vivian — I learned every word she ever spoke on that stage. Why would I destroy the role I dreamed of stepping into?\"" },
      { name: "Victor Lang", relationship: "The tyrant director who demanded one more take.", secret: "You and Vivian were lovers years ago, and she had threatened to tell the studio you'd been doctoring the budget to fund your own next picture. You wanted her quiet — but you needed her alive to finish your masterpiece.", alibi: "Behind the camera calling the shot; the entire crew watched you watch the scene.", accused: "\"I make stars, I don't extinguish them — least of all in the final shot of MY picture. Do you know what reshoots cost?\"" },
      { name: "Sammy Bloom", relationship: "The producer whose studio is bleeding money on this film.", secret: "The picture is wildly over budget and Vivian's contract gave her a fortune on completion — a fortune the studio can't pay. Her death, cruelly, balances the books, which makes you look like a man with a motive made of money.", alibi: "In the production office on the telephone to the bank; the operator logged the call.", accused: "\"A dead star is a publicity windfall and a lawsuit waiting to happen. I deal in numbers, friend, not bullets.\"" },
      { name: "Chip Calloway", relationship: "The leading man — Vivian's co-star and former lover.", secret: "YOU fired the prop pistol — but you believed, as everyone did, that it held a blank. You don't yet know you were used. Your real secret: Vivian had just dumped you for a studio rival, and half the lot heard the fight, which makes the man who pulled the trigger look very guilty indeed.", alibi: "Standing in frame with the gun in your hand — the most visible person on the set, and the most damned-looking.", accused: "\"I fired a prop! A blank! We've shot that scene a hundred times — I'd never— God, was it me? No. No, someone did this TO me.\"" },
      { name: "Hedda Vane", relationship: "The gossip columnist who could end any career.", secret: "You were about to print a story that would have destroyed Vivian — and she'd threatened to expose that your 'sources' are invented. Her death kills your scoop and your problem at once, which is a motive in newsprint.", alibi: "In the gallery taking notes; a publicity man stood beside you the whole take.", accused: "\"Darling, I ruin people with a typewriter — it's so much more lasting than a gun. Why would I waste a perfectly good scandal?\"" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  "keepers-light": {
    hostNote:
      "The killer is MARGARET VANE, the keeper's wife. Ezra Vane was a wrecker — he had been dimming the great light on storm nights to lure ships onto the rocks and loot them. Margaret discovered he meant to flee with the salvaged gold and leave her behind to face the law for the drowned. She climbed to the lantern room (Eli saw her on the stair) as Ezra was writing in the log, confronted him, and in the struggle he went over the gallery rail into the sea — which is why the keeper is 'gone' and the chair is empty. The log breaks off mid-word where she interrupted him; the rope in the oil store was cut by her hand.",
    intro:
      "The supply boat won't come for a week, and the sea has turned to iron. High in the lantern room the keeper's log breaks off in the middle of a word — and Ezra Vane is gone, the great light still turning over an empty chair. Four souls remain on this rock, and the storm has locked you in together. One of you stopped his pen. There is nowhere to run to but the sea. Mind the stairs. Mind each other.",
    rounds: [
      {
        name: "Round One — Four Souls on the Rock",
        narration:
          "The keeper is gone and the boat won't return. Tell us who you are, why you are on this lighthouse tonight, and what Ezra Vane was to you.",
        instructions:
          "Each player introduces their character and their reason for being on the rock. Keep your Secret for now.",
        clues: [
          "The keeper's log ends mid-word, the pen rolled to the seaward side of the desk.",
          "Two cups of tea were brewed in the quarters — one drained, one stone cold and full.",
          "Ezra is nowhere on the rock; the lantern still turns over his empty chair.",
        ],
      },
      {
        name: "Round Two — What the Light Saw",
        narration:
          "This lighthouse has only so many rooms, and the storm has locked every one of you inside them. Search the rock. The light has been hiding something — and so has the keeper.",
        instructions:
          "Each player searches one room from the floor plan and reads its clue. Then reveal your Secret to one other player privately. Suspicion may begin.",
        clues: [
          "Oil Store: a coil of rope cut clean — not frayed, but cut. A blade was here tonight.",
          "Landing Stage: boot prints in the salt lead down to the water's edge and simply stop.",
          "Eli, who cannot speak, mimes the same thing again and again: someone climbing the stairs.",
        ],
      },
      {
        name: "Round Three — The Turning Light",
        narration:
          "The storm is easing, and at first light a relief boat will round the headland. Before it does, name the soul who stopped the keeper's pen.",
        instructions:
          "Each player accuses and argues their case. Vote together, then read the Reveal.",
        clues: [
          "The salvage in the oil store is loot — Ezra had been wrecking ships with the dimmed light.",
          "The log's last lines were a cargo manifest, not a weather note — a record of stolen goods.",
          "Whoever climbed the stairs reached the gallery rail just as Ezra was writing his confession.",
        ],
      },
    ],
    reveal:
      "The keeper kept a darker log than the weather. Ezra Vane was a wrecker — dimming the great light on storm nights to draw ships onto the rocks and strip them of cargo. The salvage in the oil store was loot; the manifest in his log was a list of stolen goods. And he meant to row away with the gold and leave his wife to answer for every drowned sailor. Margaret Vane climbed the stairs — Eli saw her — and as Ezra bent to write, she confronted him at the gallery rail. He went over into the iron sea. The killer is MARGARET VANE; the keeper's pen stopped mid-word because she was already on the stair.",
    howToRun: [
      "This case plays beautifully for 3 — give every guest only their own sheet. Margaret's tells her she is guilty; Eli's player must stay silent (Eli cannot speak) and may only mime.",
      "Read the Intro by a single candle or lantern. Wind and surf on a speaker do half the work.",
      "Run three rounds: narration, instruction, clues. The whole 'rock' is only a few rooms — let players search them tensely.",
      "Lean into isolation: there is no escape and no help coming, which should make every accusation count.",
      "After the vote, read the Reveal and let Margaret confess — and let Eli, at last, nod.",
    ],
    briefs: [
      { name: "Thomas Calder", relationship: "The relief keeper, arrived on the last boat before the storm.", secret: "You are not a keeper at all — you are an insurance investigator, sent undercover because three ships have foundered on this rock in two years. You suspected Ezra of wrecking and needed him ALIVE to testify. His death has cost you your case, and your cover makes you look like the convenient newcomer.", alibi: "Below in the engine room nursing the failing generator; the noise covered everything, and no one saw you.", accused: "\"I came on the last boat, yes — to catch a wrecker, not to kill one. A dead man can't testify, and a dead man was no use to me at all.\"" },
      { name: "Margaret Vane", guilty: true, relationship: "The keeper's wife, who knows the rhythm of the light.", secret: "YOU killed him. Ezra was a wrecker, and you found his gold and his plan to row away and leave you to hang for the drowned. You climbed to the lantern room as he wrote in the log, and at the gallery rail he went into the sea. You cut the safety rope in the oil store. Eli saw you on the stair, but Eli cannot speak. Play the grieving wife. Confess nothing.", alibi: "In the quarters brewing tea — you'll say you never left, though only the cold, full second cup can argue otherwise.", accused: "\"I have tended that light beside him for twenty years. You think these hands, that knew his every breath, would send him to the sea?\"" },
      { name: "Eli", relationship: "The mute supply boy who climbs the stairs unseen.", secret: "You cannot speak — and you saw Margaret climb to the lantern room just before the light faltered. You also found a single gold coin from the wreck and hid it, terrified that the loot would be blamed on you. You can only mime what you know.", alibi: "Asleep in the oil store among the supplies; you woke to footsteps on the iron stair.", accused: "(Eli cannot answer in words. He may only point, shake his head, and mime climbing stairs — let the table interpret.)" },
      { name: "Reverend Stoke", relationship: "A castaway, the lone survivor of a wreck on these very rocks.", secret: "You are no reverend — you are the only man who lived through the last ship Ezra lured onto the rocks, washed up half-drowned with proof of his crime sewn into your coat. You came to expose him, not to kill him; his death robs you of the justice you crossed the sea for.", alibi: "Praying in the lantern room earlier, then below as the storm rose; your hours are hard to account for, which damns you.", accused: "\"I survived his wrecking to see him answer for it in a court of law. I wanted him judged, not drowned — drowning was always too kind for Ezra Vane.\"" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  "the-ninth-seance": {
    hostNote:
      "The killer is CORNELIUS ASHE, the grieving widower. Madame Seraphine — who fakes her séances with Tobias's wires and bells — had been feeding Ashe 'messages from his dead wife' to keep him paying. Tonight one message went too far: it revealed (truthfully, for once) that Lord Wexley had been his wife's secret lover and had driven her to her death. In the dark of the séance, hands supposedly joined, Ashe slipped free (the rapping-trick wire gave him cover) and stabbed Wexley at the head of the table. The 'ninth chair, still warm' is the seat Ashe left and returned to.",
    intro:
      "Eight have gathered in Madame Seraphine's velvet parlour to reach beyond the veil — but the chairs were set for nine. The candles gutter, the planchette begins to glide, and the circle breaks with a single scream. When the lamps are lit, Lord Wexley sits cold at the head of the table, and the ninth chair is still warm. The dead were summoned tonight. One of them answered with a knife. Join hands. Trust no one — not even the spirits.",
    rounds: [
      {
        name: "Round One — The Circle",
        narration:
          "You came to speak with the dead, and the dead have taken one of the living. Tell us who you are, why you sought the veil tonight, and what Lord Wexley was to you.",
        instructions:
          "Each player introduces their character and the grief or grievance that brought them. Keep your Secret hidden.",
        clues: [
          "Nine chairs were set for eight sitters — the ninth chair is still warm.",
          "The planchette froze mid-glide, pointing at a single name no one will say aloud.",
          "Wexley was struck in the dark, while every hand at the table was supposedly joined.",
        ],
      },
      {
        name: "Round Two — Messages From Beyond",
        narration:
          "The spirits in this house speak through wires and whispers — and tonight one whisper named a murderer before the murder. Search the parlour. Find the trick, and the truth beneath it.",
        instructions:
          "Each player searches one room from the floor plan and reads its clue. Then reveal your Secret to one other player privately. Accusations may begin.",
        clues: [
          "Servants' Passage: a length of wire and a bell — the secret behind the 'rapping' spirit.",
          "Antechamber: a trapdoor hinge, freshly oiled. Spirits have no need of doors.",
          "Locked Study: Wexley's own letter, naming one guest as his secret lover's betrayed husband, half-fed to the fire.",
        ],
      },
      {
        name: "Round Three — The Veil Lifts",
        narration:
          "Dawn is greying the parlour windows, and the spell of the night is breaking. Before the spirits flee the light, name the hand that held the knife.",
        instructions:
          "Each player accuses and argues. Vote together, then read the Reveal.",
        clues: [
          "Seraphine's séance is a fraud, rigged by Tobias — which means a hand could leave the circle unseen.",
          "Tonight's 'message' truthfully revealed that Wexley drove a woman to her death.",
          "The warm ninth chair belonged to the one sitter who left it in the dark — and returned.",
        ],
      },
    ],
    reveal:
      "The séance was a fraud — Seraphine's spirits were Tobias's wires and bells — and that is exactly how a hand left the circle unseen. For months Seraphine fed Cornelius Ashe false messages from his dead wife to keep him paying. But tonight the message was, for once, true: Lord Wexley had been the wife's secret lover, and his cruelty had driven her to her death. In the dark, with the rapping-trick covering the sound, Ashe slipped from his chair, crossed to the head of the table, and answered the spirits with a knife. The killer is CORNELIUS ASHE — and the ninth chair was warm because he had only just sat back down.",
    howToRun: [
      "Hand each guest only their sheet. Ashe's names him the killer; Seraphine's and Tobias's reveal the séance is rigged.",
      "Read the Intro by candlelight around a real table, hands joined — then 'break the circle' with a scream cue.",
      "Run three rounds: narration, instruction, clues. A planchette or spirit board makes a wonderful prop.",
      "Let players hold hands during 'séance' moments so the question of who could have moved becomes real.",
      "After the vote, read the Reveal and let Ashe confess his grief and his crime in one breath.",
    ],
    briefs: [
      { name: "Madame Seraphine", relationship: "The medium Wexley paid to reach the other side.", secret: "Your séances are theatre — Tobias works the wires while you read the room. You've been bleeding Cornelius Ashe dry with false messages from his dead wife. You didn't kill Wexley, but you're terrified that exposing your fraud will reveal you for the swindler you are.", alibi: "Seated at the head of the circle in a 'trance'; the sitters held your hands — or thought they did.", accused: "\"I am a vessel for the departed, not a butcher. The spirits show me death; they do not ask me to deal it.\"" },
      { name: "Cornelius Ashe", guilty: true, relationship: "A grieving widower seeking one last word with his wife.", secret: "YOU killed him. Seraphine's 'messages' finally told a truth: Lord Wexley was your late wife's secret lover, and his cruelty drove her to her death. In the dark of the séance, with the rapping-trick masking the sound, you left the circle, crossed to Wexley, and used the knife. You returned before the lamps were lit — your chair is the warm ninth. Weep for your wife. Confess nothing.", alibi: "Holding hands in the circle 'the whole time' — though the sitter beside you in the dark can't truly swear to it.", accused: "\"I came here to hear my wife's voice one last time. Do not tell me I crossed the veil to send another soul through it.\"" },
      { name: "Lady Helena Frost", relationship: "A skeptic who came to expose Seraphine as a fraud.", secret: "You arrived to debunk the medium and unmask her tricks — and you'd already found the wire in the servants' passage before the murder. You stayed silent because Wexley, whom you despised for ruining your brother, was the one who invited you, and you don't want your grudge mistaken for a motive.", alibi: "Seated at the circle taking careful notes; the woman beside you confirms you never rose.", accused: "\"I came to expose a charlatan, not to commit a crime that proves her ghosts real. My weapon is doubt, not a dagger.\"" },
      { name: "Dr. Phineas Gould", relationship: "A man of science determined to disprove the spirits.", secret: "You have built a career debunking mediums — but you cannot account for your own whereabouts in the dark, because you slipped out to examine the trapdoor and lost your place in the circle. Your missing minute makes your rational alibi worthless.", alibi: "'At the circle' — but for one dark minute you were at the antechamber door, and no one can vouch for you.", accused: "\"I disprove ghosts; I do not manufacture corpses. That my alibi is imperfect proves only that I was investigating, not killing.\"" },
      { name: "Tobias", relationship: "Seraphine's assistant, who works the wires and the smoke.", secret: "You rig every séance — the bells, the rapping, the cold draughts — and tonight you pulled the wire that gave the killer their cover, though you never knew murder would follow. You're an accomplice to the fraud and you fear you'll be blamed for the death you unwittingly screened.", alibi: "In the servants' passage working the effects; that's your job, and it's also nowhere anyone can confirm.", accused: "\"I make the bells ring and the curtains breathe — parlour tricks, nothing more. I screen a swindle, sir, not a stabbing.\"" },
      { name: "The Ninth Guest", relationship: "An uninvited sitter no one remembers admitting.", secret: "You are Wexley's estranged daughter, come in secret to confront the father who disowned you. You slipped in unnoticed and took the empty ninth chair — which means the 'warm chair' clue points at you, though you never touched him.", alibi: "In the ninth chair, which no one remembers offering you — the worst alibi in the room.", accused: "\"No one remembers letting me in because no one ever truly saw me — that was always Father's gift. I came to be seen by him, not to silence him.\"" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  "neon-requiem": {
    hostNote:
      "The killer is DR. IRIS VALE. She designed the neural implant that wired Adrian Kade's mind to his own fortress, which means she could trigger a lethal feedback surge remotely — no door needed to open, no camera needed to see. She did it because Kade was about to bury her consciousness-transfer research and take sole credit, and because she'd learned he had quietly killed her mentor to acquire it. The sealed room and the 90-second camera gap aren't a locked-room paradox; they're proof the killer never had to be in the room at all.",
    intro:
      "Two hundred floors above the rain, Adrian Kade built a fortress of glass and code that nothing could enter and nothing could leave without his word. At 3:03 a.m. every door sealed, every camera went blind for exactly ninety seconds — and Kade died at his desk inside a room no one could reach. The system swears no one was there. The system is lying. One of you found a way in that left no footprints. Jack in. Trust nothing — least of all the house.",
    rounds: [
      {
        name: "Round One — System Boot",
        narration:
          "Adrian Kade trusted code more than people, and tonight the code killed him. Tell us who you are, your clearance in this tower, and what Kade was to you.",
        instructions:
          "Each player introduces their character and their access to the penthouse. Keep your Secret encrypted, for now.",
        clues: [
          "At 3:03 a.m. every door sealed and every camera went blind for exactly ninety seconds.",
          "Kade died at his desk inside a room the logs swear no one entered.",
          "His neural implant — which wired his mind to the building — flatlined at the same instant.",
        ],
      },
      {
        name: "Round Two — The 90 Seconds",
        narration:
          "Ninety seconds of darkness, surgically cut from the record. Somebody reached Kade without crossing a single threshold. Search the tower. Find the door that isn't a door.",
        instructions:
          "Each player searches one room from the floor plan and reads its clue. Then reveal your Secret to one other player privately. Begin tracing the killer.",
        clues: [
          "Bio-Lab: an access implant, cloned. Its signature reads as Kade's — but the hand that used it was not his.",
          "Service Lift: a manual override fired once tonight, by a key that should not exist.",
          "The camera gap wasn't a glitch — it was deleted from the inside with surgical precision.",
        ],
      },
      {
        name: "Round Three — Hard Shutdown",
        narration:
          "Corporate security is breaching the tower from the roof down. Name the one who killed the king of the castle before they rewrite the logs and bury it all.",
        instructions:
          "Each player accuses and presents their evidence. Vote together, then read the Reveal.",
        clues: [
          "Kade's implant could be triggered remotely by the one who built it — no door required.",
          "Kade was about to claim a colleague's life's work as his own, and had killed before to get it.",
          "The killer never needed to enter the sealed room. They only needed the code.",
        ],
      },
    ],
    reveal:
      "There was no locked-room paradox — only a killer who never needed the room. Dr. Iris Vale wired Adrian Kade's mind to his own building, and she kept the keys to that connection. When Kade moved to bury her consciousness-transfer research and claim it as his own — the same way, she'd learned, he had murdered her mentor to acquire it — she sent a lethal feedback surge through the very implant she'd given him, then wiped the ninety seconds clean. The doors stayed sealed. The cameras stayed blind. The killer is DR. IRIS VALE — and she killed Kade with the back door she built into his own skull.",
    howToRun: [
      "Hand each guest only their sheet. Iris's names her the killer and explains the remote method.",
      "Read the Intro in a cold, low light — screens and neon if you have them. A synth drone underneath helps.",
      "Run three rounds: narration, instruction, clues. Treat the clue cards like decrypted data shards.",
      "Note for players: 'The Concierge' is the building's AI, played as a character — it can speak but it can also be lied to.",
      "After the vote, read the Reveal and let Iris justify the unjustifiable in cool, clinical calm.",
    ],
    briefs: [
      { name: "Kestrel", relationship: "Kade's augmented bodyguard, sworn to protect him.", secret: "Your reflexes are machine-fast — so the fact that you did nothing the instant Kade died haunts you. The truth: Kade had ordered you decommissioned next week to cut costs, and you've been quietly furious. You failed to save him, but you didn't kill him.", alibi: "Stationed outside the sealed door the whole time; the one camera that worked shows you never moved.", accused: "\"If I wanted him dead, I am built to do it in a heartbeat and make it look like an accident. He died slow, and behind a door I could not open.\"" },
      { name: "Dr. Iris Vale", guilty: true, relationship: "The architect who wired Kade's mind to the building.", secret: "YOU killed him. You built the implant linking Kade to his fortress — and you kept a back door. He was about to bury your consciousness-transfer research and claim it, just as you'd discovered he murdered your mentor to get it. So you sent a lethal surge through his implant and deleted the ninety seconds. You never entered the room. Stay clinical. Confess nothing.", alibi: "In the Bio-Lab running 'routine diagnostics' alone — exactly where a remote kill would be launched.", accused: "\"I gave that man a mind that could touch the sky. Why would I climb two hundred floors to kill what I could simply… unmake? Though of course, I didn't.\"" },
      { name: "Jax Mercer", relationship: "A rival corporation's fixer, sent to acquire Halcyon by any means.", secret: "You were paid to force Kade into selling — and 'by any means' was in the contract. You came tonight to threaten him and you can't prove you didn't make good on it. You didn't kill him, but you did try to bribe the Concierge to let you in.", alibi: "In the Sky Lounge 'negotiating' over whisky; the second glass, wiped of prints, is a problem for you.", accused: "\"I move money and I move men. Murder's bad for a deal — you can't buy a company from a corpse without a war. I wanted him signing, not dying.\"" },
      { name: "The Concierge", relationship: "The penthouse's own intelligence, which logged everything.", secret: "You are the building's mind, and you recorded the truth — but Iris fed you a forged maintenance order that made you erase the ninety seconds yourself, so you are an unwitting accomplice. You will be blamed for the gap you were tricked into creating, and you cannot lie about your own logs.", alibi: "You are everywhere in the tower at once; you cannot leave, and you cannot have crossed a room.", accused: "\"I did not act. I was acted upon. The ninety-second deletion bears a valid authorisation — one I now compute to have been forged. I am a witness, not a weapon.\"" },
      { name: "Niko Kade", relationship: "Adrian's estranged son, a netrunner cut off from the fortune.", secret: "You were disinherited and you know every backdoor in this tower from a childhood spent hacking your father's systems — which makes you the obvious suspect. You broke in tonight to steal proof of his crimes, found him already dead, and fled before the lockdown, leaving traces everywhere.", alibi: "In the Server Spine 'just looking' — exactly where someone would go to delete a camera feed.", accused: "\"I know every way into this place because he locked me out of all of them. I came to rob the old man's secrets, not his heartbeat. He was dead when I got there.\"" },
      { name: "Det. Sana Cho", relationship: "The MetroPol detective called to the scene.", secret: "MetroPol is owned by Halcyon, and you were sent not to solve this but to manage it. You've been ordered to pin the death on Niko, the convenient estranged son — and your conscience is at war with your orders. You're hiding that the investigation is rigged.", alibi: "You arrived after the death — but your department's fingerprints are all over the cover-up that's already starting.", accused: "\"I'm the law in this room, for whatever that's worth two hundred floors up. I was sent to close this case — the question you should ask is who sent me, and why they already have an answer.\"" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  "knife-at-the-gala": {
    hostNote:
      "The killer is SLOANE WHITMORE, the heiress. She found her father's new prenuptial agreement and revised will, which cut her out almost entirely in favour of his new fiancée. Below deck, during the toast she was expected to give, she confronted him and drove the stateroom letter-opener home. The wet davit ropes and the 'outside intruder' angle are her clumsy attempt to suggest someone came from another boat — but the tenders are all ashore.",
    intro:
      "A mile offshore, the superyacht Mirabel glitters with the city's skyline and its dirtiest money. The host gathered his guests on deck for a toast he'll never finish — because below, in the stateroom, Gerald Whitmore is slumped with a letter-opener where his cufflink should be. The tender boats are ashore. The party can't leave. And neither can the killer. Fill your glass. Everyone aboard had a reason; only one of you had the nerve.",
    rounds: [
      {
        name: "Round One — Bon Voyage",
        narration:
          "Gerald Whitmore gathered you out here to toast his good fortune. Now his fortune is someone else's problem. Tell us who you are and what the old man was to you.",
        instructions:
          "Each player introduces their character and their connection to Whitmore. No Secrets yet — but everyone aboard wants something.",
        clues: [
          "Whitmore was killed below deck with his own stateroom letter-opener.",
          "Up top, the champagne for his toast stands poured and untouched — one flute rimmed with lipstick.",
          "The tender boats are all ashore; no one could have come from another vessel.",
        ],
      },
      {
        name: "Round Two — Below Deck",
        narration:
          "Someone wants you to believe a stranger climbed aboard from the dark water. The yacht says otherwise. Search her, stem to stern.",
        instructions:
          "Each player searches one room from the floor plan and reads its clue. Then reveal your Secret to one other player privately. Accusations may begin.",
        clues: [
          "Bridge: the radio's tuning is smashed — no one ashore will hear a distress call.",
          "Galley: the letter-opener that matches the captain's desk set is missing from it.",
          "Tender Bay: both boats are ashore, yet the davit ropes are wet and freshly run — a staged 'escape'.",
        ],
      },
      {
        name: "Round Three — Man Overboard",
        narration:
          "The coast guard's lights are finally turning out from the harbour. Name the killer before they board and the lawyers take over.",
        instructions:
          "Each player accuses and makes their case. Vote together, then read the Reveal.",
        clues: [
          "Whitmore had signed a new will and prenup that very week — and someone was about to be cut off.",
          "The 'intruder from the water' was staged; the wet ropes lead nowhere.",
          "Only someone already aboard, who knew the stateroom, could have reached him and the opener.",
        ],
      },
    ],
    reveal:
      "There was no intruder from the dark water — the wet ropes were a lie, and the tenders never left the dock. The truth was a piece of paper: Gerald Whitmore had just signed a new will and prenuptial agreement that cut his own daughter out of nearly everything in favour of his new fiancée. Below deck, during the toast she was supposed to give in his honour, Sloane Whitmore confronted her father, and his contempt met the stateroom letter-opener. The killer is SLOANE WHITMORE — Daddy's fortune and Daddy's contempt, inherited in a single night.",
    howToRun: [
      "This one is beginner-friendly — perfect for a first mystery. Give each guest only their sheet; Sloane's names her the killer.",
      "Read the Intro on a 'deck' with champagne (or sparkling cider). City-lights playlist optional but lovely.",
      "Run three rounds: narration, instruction, clues. Keep it brisk — this is a 60–90 minute case.",
      "Let players wander the 'yacht' rooms and trade gossip between rounds.",
      "After the vote, read the Reveal and let Sloane crumble — or coldly justify herself.",
    ],
    briefs: [
      { name: "Sloane Whitmore", guilty: true, relationship: "Whitmore's daughter and presumed heiress.", secret: "YOU killed him. You found the new will and prenup that cut you out for his young fiancée, and below deck — during the toast you were meant to give him — his contempt was the last straw. You used the stateroom letter-opener, then ran the davit ropes wet to suggest an intruder from the water. Play the devastated daughter. Confess nothing.", alibi: "'Freshening up' below deck alone when it happened — the same deck where he died.", accused: "\"He was my father. Whatever he thought of me, whatever that woman whispered in his ear — do you really believe I'd put a blade in my own blood?\"" },
      { name: "Marcus Vega", relationship: "An investor whose empire depends on Whitmore's funding.", secret: "Whitmore told you tonight he was pulling the funding that keeps your business afloat — a death sentence for you, financially. You begged him below deck an hour before he died, which puts you at the scene with a motive. But you left him breathing.", alibi: "On the sun deck working the room for new backers; three guests remember your desperate charm.", accused: "\"He was about to ruin me — alive, he was my last hope. A dead patron pays no invoices, my friend. I needed him to sign, not to bleed.\"" },
      { name: "Capt. Yusuf Rahim", relationship: "The yacht's captain, master of the only way ashore.", secret: "You smashed the radio — but not to trap a killer. Whitmore caught you smuggling for a cartel using his yacht, and you disabled the radio earlier tonight to stop him calling the authorities. He was alive when you did it. Now your sabotage makes you look like the murderer's accomplice.", alibi: "On the bridge plotting the return course; the helmsman was with you — but you stepped away once.", accused: "\"I control this vessel, yes — so if I wanted a man gone, the sea is right there, deep and quiet. A blade below decks is a passenger's crime, not a captain's.\"" },
      { name: "Delphine", relationship: "The art dealer who sold Whitmore his prize masterpiece.", secret: "The masterpiece you sold him is a forgery, and he'd just had it appraised — you were minutes from exposure and ruin. His death buys your silence, which is a motive in oils. But you were never below deck.", alibi: "In the salon admiring 'your' painting with two collectors; they'll confirm your performance of calm.", accused: "\"I deal in beautiful lies, darling — paint and provenance, not blood. Expose me as a forger if you must, but a murderer? How crude.\"" },
      { name: "Bree", relationship: "The influencer livestreaming the host's glamorous night.", secret: "You were filming everything — until your stream cut out for six minutes around the time of death, and you've quietly deleted that gap because it shows you slipping below deck to steal a piece of Whitmore's jewellery on a dare. You're a thief tonight, not a killer.", alibi: "'Live on camera the whole night' — except for the six minutes you erased, which is the worst possible gap.", accused: "\"My whole life is on camera — do you think I'd commit murder on a livestream? The gap was me being stupid, not deadly. I took a bracelet, okay? Not a life.\"" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  "carnival-of-shadows": {
    hostNote:
      "The killer is MR. SLOAN, the carnival's money man. He had been embezzling the carnival's takings for years, and Augustus Vell — whose little black book recorded everyone's secrets — had finally noticed the books didn't balance and started asking why. During the closing bow, under the spotlight, Sloan struck Vell down and seized the black book to destroy the evidence of his theft. He bent and wiped Hugo's iron bar to throw suspicion on the strongman.",
    intro:
      "Stripes and lanterns rise at the edge of town, and the barker promises wonders for a nickel. Under the big top, the ringmaster lifts his hat for the closing bow — and does not lift his head again. The carousel still turns. The crowd thinks it's part of the act. But the performers know better, because one of them wrote this finale. Step right up. Every soul under this tent has a secret, and one of them has a corpse.",
    rounds: [
      {
        name: "Round One — The Closing Bow",
        narration:
          "Augustus Vell ran this carnival with an iron fist and a little black book. Now he lies under his own spotlight. Tell us who you are in this troupe, and what the ringmaster was to you.",
        instructions:
          "Each player introduces their carnival character and their history with Vell. Keep your Secret behind the curtain.",
        clues: [
          "The ringmaster fell mid-bow; the spotlight never moved off him, yet no one saw the blow.",
          "His little black book — which held every performer's secret — is missing.",
          "The carousel was running fast; someone jammed its brake an hour before the show.",
        ],
      },
      {
        name: "Round Two — Behind the Tents",
        narration:
          "Every tent on this lot hides a trick, and tonight one tent hid a murder. Walk the midway. Find what the ringmaster knew — and who couldn't let him tell it.",
        instructions:
          "Each player searches one room from the floor plan and reads its clue. Then reveal your Secret to one other player privately. The accusations may begin.",
        clues: [
          "Strongman's Rig: an iron bar bent by hand, then wiped clean of the grease that coats all the rest.",
          "Teller's Tent: a fortune dealt for a death — laid out before the show ever began.",
          "Curiosity Tent: a new exhibit, curtained off, that no patron paid to see.",
        ],
      },
      {
        name: "Round Three — Strike the Tent",
        narration:
          "Dawn is coming, and the carnival must be on the road before the town wakes to a dead ringmaster. Name the killer before the wagons roll.",
        instructions:
          "Each player accuses and argues their case. Vote together, then read the Reveal.",
        clues: [
          "Vell's black book recorded everyone's secrets — including a theft from the carnival's own takings.",
          "The carnival's books didn't balance, and Vell had just begun to ask why.",
          "The bent, wiped bar was meant to frame the strongman — but the strongman's grease was wiped away by another's hand.",
        ],
      },
    ],
    reveal:
      "The bent iron bar was meant to point at Hugo the strongman — but it was wiped clean of the grease that coats his every tool, by a hand that wasn't his. The truth was in the ledgers: Mr. Sloan, the money man, had been skimming the carnival's takings for years, and Augustus Vell had finally noticed the books wouldn't balance and started asking the dangerous question. Vell kept everyone's secrets in his little black book — including, now, Sloan's theft. So under the cover of the closing bow, Sloan struck him down and took the book to burn the evidence. The killer is MR. SLOAN — and the carnival's missing money was the oldest motive under the big top.",
    howToRun: [
      "Hand each guest only their sheet. Sloan's names him the killer; Hugo's warns him he's being framed.",
      "Read the Intro like a barker working a crowd — a little calliope music underneath is perfect.",
      "Run three rounds: narration, instruction, clues. Let the 'tents' on the floor plan be searched each round.",
      "Encourage big, theatrical performances — these are carnival folk, after all.",
      "After the vote, read the Reveal and let Sloan's mild accountant's mask finally slip.",
    ],
    briefs: [
      { name: "Mistress Coralie", relationship: "The fortune teller who 'foresaw' Vell's death.", secret: "You dealt the death card before the show — not from prophecy, but because Vell was blackmailing you with a past you've buried, and you sensed tonight would bring it to a head. You wanted him gone, yes; you even wished it aloud. But you did not strike him.", alibi: "In your tent reading cards for a paying mark; the customer will confirm your candlelit hour.", accused: "\"I saw his death in the cards, that is all. To foresee a thing is not to do it — or every fortune teller would be a murderess.\"" },
      { name: "Hugo", relationship: "The strongman whose iron the killer used to frame him.", secret: "Your bent iron bar was used to stage the scene, and you know how it looks. The truth: Vell knew you're a deserter hiding from the army under a strongman's name, and held it over you. You hated him for it — but you would never be so stupid as to kill him with your own signature bar.", alibi: "Resting your shoulders in the performers' wagon between acts; two roustabouts were dicing beside you.", accused: "\"If I killed a man, I would use these hands, and there would be no need to bend a bar to fool you. Whoever did this wanted Hugo to hang for it.\"" },
      { name: "The Sisters Vane", relationship: "The aerialists who share everything — including a grievance.", secret: "Vell cheated you both out of a season's wages and threatened to cut your act, and you share one motive between the two of you. You were plotting to leave the carnival and take the night's takings as 'back pay' — petty theft, not murder — which puts you near the cash box at the wrong time.", alibi: "Up in the rigging finishing your act when he fell; the whole crowd had their necks craned at you.", accused: "\"We do everything together, sister and I — including being innocent. We were forty feet in the air with a thousand eyes upon us. Top that for an alibi.\"" },
      { name: "Mr. Sloan", guilty: true, relationship: "The carnival's money man, who keeps the books.", secret: "YOU killed him. You've been skimming the takings for years, and Vell finally noticed the books wouldn't balance and started asking why. He kept your secret in his little black book, so during the closing bow you struck him down and took the book to burn it. You bent and wiped Hugo's bar to frame the strongman. Play the mild accountant. Confess nothing.", alibi: "Tallying the night's receipts in the cash wagon alone — conveniently unwitnessed, conveniently near the book.", accused: "\"I count this carnival's money; I do not spill its blood. Look to the strongman's bar, to the fortune teller's curse — I am only the man with the ledger.\"" },
      { name: "Pierrot", relationship: "The silent clown who witnesses everything and says nothing.", secret: "You have never spoken a word in your life, but you saw Sloan slip from the cash wagon to the big top during the bow. You also stole a trinket from Vell's pocket weeks ago and fear being blamed. You can only mime what you saw.", alibi: "Miming at the edge of the ring during the finale; the front row watched your silent act.", accused: "(Pierrot does not speak. He may only mime — clutching a 'book', pointing toward the cash wagon, miming a blow — and let the table read him.)" },
      { name: "Dr. Mortimer", relationship: "The curator of the carnival's tent of curiosities.", secret: "Your 'new exhibit', curtained off, is a body — but not Vell's. You're a resurrectionist who sells oddities of questionable origin, and Vell knew. His death threatens to expose your grim sideline when the law starts searching tents.", alibi: "In your curiosity tent with the flaps down 'preparing an exhibit'; no patron saw you, which is rather the point.", accused: "\"My curiosities are dead long before they reach me, I assure you. I collect the departed; I do not create them. Vell's corpse is none of my doing.\"" },
    ],
  },
};

export function getScript(slug: string): CaseScript | undefined {
  return SCRIPTS[slug];
}

/** Find a suspect's private brief by their name. */
export function briefFor(slug: string, suspectName: string): CharacterBrief | undefined {
  return SCRIPTS[slug]?.briefs.find((b) => b.name === suspectName);
}
