import type { FloorOverlay } from "./content-types";

// German translations of the crime-scene plans (room labels + clues).
export const FLOOR_DE: Record<string, FloorOverlay> = {
  "manor-of-whispers": {
    title: "Ravensmoor Hall",
    rooms: [
      { label: "Die Bibliothek", clue: "Der Riegel wurde von innen vorgelegt. Wie also entkam der Mörder?" },
      { label: "Das Arbeitszimmer", clue: "Eine Karaffe, zwei Gläser — nur eines trägt einen Lippenstift-Fleck." },
      { label: "Die große Halle", clue: "Die Standuhr blieb um 11:48 stehen — in der Minute, als das Licht erlosch." },
      { label: "Der Wintergarten", clue: "Eine Scheibe steht zum Sturm offen; schlammige Spuren führen hinein, nicht hinaus." },
      { label: "Die Dienertreppe", clue: "Ein Leuchter fehlt an seiner Halterung. Das Wachs ist noch warm." },
      { label: "Der Keller", clue: "Im Kamin schwelen Geschäftsbücher — jemand verbrannte ein Verzeichnis der Schulden." },
    ],
  },
  "midnight-express": {
    title: "Der Mitternachtsexpress",
    rooms: [
      { label: "Abteil Neun", clue: "Der Fensterriegel ist aufgebrochen — doch der Schnee auf dem Sims liegt unberührt." },
      { label: "Der Speisewagen", clue: "Ein zerrissener Fahrkartenabschnitt für einen Passagier, den die Liste nie erfasste." },
      { label: "Der Salonwagen", clue: "Zwei Zigaretten derselben seltenen Marke, in einem Aschenbecher zerdrückt." },
      { label: "Die Bordküche", clue: "Ein Tranchiermesser, sauber gewischt und in die falsche Schublade zurückgelegt." },
      { label: "Der Gepäckwagen", clue: "Die Notbremse wurde gezogen, dann sorgfältig zurückgesetzt. Von wem?" },
    ],
  },
  "the-masquerade": {
    title: "Palazzo Contarini",
    rooms: [
      { label: "Der große Ballsaal", clue: "Wo der Gastgeber mitten im Trinkspruch fiel — sein Glas zersplittert, der Wein unvergossen." },
      { label: "Der Spiegelsaal", clue: "Eine Maske, gespiegelt, hat im nächsten Glas kein Gesicht dahinter." },
      { label: "Die Loggia", clue: "Eine Gondel glitt Augenblicke nach dem zwölften Schlag aus dem Wassertor." },
      { label: "Das Kartenzimmer", clue: "Eine Ehrenschuld, heute Abend unterzeichnet, von einer Hand entzweigerissen." },
      { label: "Die Musikgalerie", clue: "Die letzte Seite des Requiems war beschriftet, bevor der Gastgeber je fiel." },
      { label: "Die Kapelle", clue: "Ein Fläschchen Mandelduft, geleert — das Parfüm eines gewissen Gifts." },
    ],
  },
  "blood-and-bootleg": {
    title: "Das Velvet Note",
    rooms: [
      { label: "Hinter der Bar", clue: "Wo Lucky fiel — die Kasse ist voll, aber das Hauptbuch ist fort." },
      { label: "Die Bühne", clue: "Die Band stoppte mitten im Lied; der Sängerin fehlt ein Handschuh." },
      { label: "Die hintere Nische", clue: "Ein reservierter Tisch, eine verschüttete Teetasse Gin, ein Gast, der nie erschien." },
      { label: "Das Kellerlager", clue: "Eine Kiste 'medizinischen' Whiskys, eine Flasche zu wenig, ein frischer Abdruck." },
      { label: "Das Büro", clue: "Der Safe steht offen. Darin: Erpressung, keine Geldscheine." },
      { label: "Die Gassentür", clue: "Der Stuhl des Spähers ist kalt — er verließ seinen Posten im ungünstigsten Moment." },
    ],
  },
  "final-cut": {
    title: "Tonbühne 7",
    rooms: [
      { label: "Das Set", clue: "Die Kreide-Todesmarkierung klebt zwei Fuß von der Stelle, wo sie tatsächlich fiel." },
      { label: "Die Garderobe", clue: "Ihr Wasserglas riecht leicht bitter. Das der Zweitbesetzung ist unberührt." },
      { label: "Die Beleuchterbrücke", clue: "Ein Scheinwerfer wurde von Hand neu ausgerichtet; die Folie ist versengt und frisch." },
      { label: "Das Büro des Produzenten", clue: "Ein Budgetblatt in roter Tinte und ein Vertrag, der gleich annulliert wird." },
      { label: "Die Requisitenkammer", clue: "Die eine Requisitenpistole ist fort — die einzige, die je mit Platzpatronen geladen war." },
    ],
  },
  "keepers-light": {
    title: "Der Leuchtturm",
    rooms: [
      { label: "Der Laternenraum", clue: "Das Logbuch endet mitten im Wort; die Feder rollte zur Seeseite." },
      { label: "Die Wärterstube", clue: "Zwei Tassen Tee wurden gebrüht. Eine geleert, eine eiskalt und voll." },
      { label: "Das Öllager", clue: "Ein Tauwerk-Ring, sauber durchtrennt — nicht zerfasert. Eine Klinge war hier." },
      { label: "Der Anlegesteg", clue: "Stiefelspuren im Salz führen zum Wasser hinab und enden einfach." },
    ],
  },
  "the-ninth-seance": {
    title: "Madame Seraphines Salon",
    rooms: [
      { label: "Der Séance-Salon", clue: "Neun Stühle für acht Teilnehmer gedeckt. Der neunte ist noch warm." },
      { label: "Das Lesezimmer", clue: "Das Planchette erstarrte mitten im Gleiten, auf einen Namen deutend, den niemand nennt." },
      { label: "Das Vorzimmer", clue: "Ein Falltür-Scharnier, frisch geölt. Geister brauchen keine Türen." },
      { label: "Der Wintergarten", clue: "Kerzenrauch treibt in einem Luftzug aus einem Fenster, das versiegelt sein sollte." },
      { label: "Der Dienergang", clue: "Ein Stück Draht und eine Glocke — der Trick hinter dem 'klopfenden' Geist." },
      { label: "Das verschlossene Arbeitszimmer", clue: "Der Brief des Förderers, einen Gast nennend, halb dem Feuer übergeben." },
    ],
  },
  "neon-requiem": {
    title: "Das Halcyon-Penthouse",
    rooms: [
      { label: "Das Atrium", clue: "Kade an seinem Schreibtisch; die Türprotokolle schwören, sie öffneten nie. Sie lügen." },
      { label: "Das Server-Rückgrat", clue: "Eine neunzig Sekunden lange Lücke im Kamerabild, chirurgisch gelöscht." },
      { label: "Die Sky-Lounge", clue: "Zwei Whiskygläser; eines von einer sehr ruhigen Hand von Abdrücken gewischt." },
      { label: "Das Bio-Labor", clue: "Ein Zugangs-Implantat, geklont. Die Signatur ist Kades. Die Hand war es nicht." },
      { label: "Der Sicherheitsraum", clue: "Von innen versiegelt — doch die Luft trägt noch den Geruchs-Tag eines anderen." },
      { label: "Der Lastenaufzug", clue: "Eine manuelle Übersteuerung, heute Nacht einmal benutzt, mit einem Schlüssel, den es nicht geben sollte." },
    ],
  },
  "knife-at-the-gala": {
    title: "Die Superyacht Mirabel",
    rooms: [
      { label: "Die Kajüte", clue: "Whitmore, unter Deck — ein Brieföffner, wo sein Manschettenknopf sein sollte." },
      { label: "Das Sonnendeck", clue: "Champagner für den Trinkspruch, den er nie beendete; ein Glas, mit Lippenstiftrand." },
      { label: "Die Brücke", clue: "Die Funkabstimmung ist zertrümmert. Niemand an Land wird etwas hören." },
      { label: "Die Bordküche", clue: "Der passende Brieföffner fehlt im Schreibtischset." },
      { label: "Die Beibootbucht", clue: "Beide Boote sind an Land — doch die Davit-Leinen sind nass und frisch gefahren." },
    ],
  },
  "carnival-of-shadows": {
    title: "Der Karneval",
    rooms: [
      { label: "Das große Zelt", clue: "Der Zirkusdirektor verbeugte sich und erhob sich nicht; der Scheinwerfer bewegte sich nie." },
      { label: "Das Karussell", clue: "Es dreht sich noch, reiterlos — jemand blockierte vor einer Stunde die Bremse." },
      { label: "Das Zelt der Wahrsagerin", clue: "Karten gelegt für einen vorhergesagten Tod — ausgeteilt, bevor die Show begann." },
      { label: "Das Gerüst des Kraftmenschen", clue: "Eine von Hand gebogene Eisenstange, dann vom Fett befreit, das alle anderen bedeckt." },
      { label: "Das Spiegelkabinett", clue: "Die aufgemalte Träne eines Clowns, verschmiert — das eine Gesicht, das nicht lügen kann." },
      { label: "Das Kuriositätenzelt", clue: "Ein neues Exponat, abgehängt, für das kein Besucher bezahlt hat." },
    ],
  },
};
