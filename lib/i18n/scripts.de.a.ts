import type { ScriptOverlay } from "./content-types";

// German scripts — part A (manor-of-whispers, midnight-express, the-masquerade).
export const SCRIPTS_DE_A: Record<string, ScriptOverlay> = {
  "manor-of-whispers": {
    hostNote:
      "Der Mörder ist DR. EDMUND VOSS. Vor Jahren ließ Voss gegen Bezahlung Cordelias ersten Ehemann sterben; Lord Alistair hatte endlich den alten, gefälschten Totenschein gefunden und wollte ihn bei der Verlesung des neuen Testaments entlarven. Voss versetzte Alistairs abendliches Verdauungstonikum vor dem Essen mit einem langsamen Gift. Alistair trug das Tonikum in die Bibliothek, verriegelte aus Gewohnheit selbst die Tür, trank und starb — deshalb war der Raum von innen verschlossen und niemand musste eintreten. Der 'verschlossene Raum' ist der Trick: das Gift war bereits in ihm.",
    intro:
      "Donner wandert heute Nacht durch die Hallen von Ravensmoor. Ihr kamt zur Verlesung von Lord Alistairs neuem Testament — und fandet ihn stattdessen darüber zusammengesunken, die Bibliothek von innen verriegelt, die Lampe noch brennend. Der Sturm nahm das Licht um Viertel vor Mitternacht; als es zurückkehrte, erkaltete er bereits. Kein Fenster wurde aufgebrochen. Keine Tür durchbrochen. Und doch hat einer von euch, hier an diesem Tisch, gemordet. Schaut euch um. Lächelt. Lügt schön.",
    rounds: [
      {
        name: "Erste Runde — Die Verlesung, die nie kam",
        narration:
          "Silas sollte das neue Testament um Mitternacht verlesen. Jeder hier wusste, dass sich sein Platz darin ändern würde — und jeder hier kam früh. Sagt uns, wer ihr seid, und was Lord Alistair für euch war.",
        instructions:
          "Jeder Spieler liest Namen, Titel und Einführungszeile laut vor und antwortet dann in der Rolle: Was hattet ihr durch das neue Testament zu gewinnen oder zu verlieren? Noch enthüllt niemand sein Geheimnis.",
        clues: [
          "Die Bibliothekstür war von innen verriegelt — nur Alistairs Schlüssel passt in den Riegel.",
          "Ein einzelnes Cognacglas steht an seinem Ellbogen, am Boden ein schwacher trüber Rückstand getrocknet.",
          "Die Standuhr in der großen Halle blieb um 11:48 stehen, im Moment, als der Sturm den Strom kappte.",
        ],
      },
      {
        name: "Zweite Runde — Was die Porträts sahen",
        narration:
          "Das Haus hütet Geheimnisse, wie die Toten still halten. Durchsucht es. Jeder Raum hier erinnert sich an etwas — und jemand hat bereits versucht, einen Raum vergessen zu lassen.",
        instructions:
          "Öffnet den Grundriss. Im Uhrzeigersinn nennt jeder Spieler einen Raum zum 'Durchsuchen' und liest dessen Hinweis vor. Dann muss jeder Spieler sein Geheimnis EINEM anderen Spieler seiner Wahl enthüllen — unter vier Augen. Beschuldigungen dürfen beginnen.",
        clues: [
          "Keller: heute Nacht wurden im Kamin Geschäftsbücher verbrannt — ein Verzeichnis von Schulden, das jemand loswerden wollte.",
          "Dienertreppe: ein Leuchter fehlt an seiner Halterung; das Wachs ist noch warm.",
          "In Dr. Voss' Arztkoffer fehlt ein braunes Fläschchen — das Etikett sagt 'Verdauungstonikum'.",
        ],
      },
      {
        name: "Dritte Runde — Das Urteil",
        narration:
          "Der Sturm bricht. Die Laterne des Konstablers quert bereits das Moor. Bevor er eintrifft, wird dieser Tisch einen Mörder nennen — oder einen für immer laufen lassen.",
        instructions:
          "Jeder Spieler hält sein abschließendes Plädoyer, wer schuldig ist und warum. Dann stimmen alle gleichzeitig ab und zeigen auf den Beschuldigten. Zählt die Stimmen, dann lest die Enthüllung.",
        clues: [
          "Der trübe Rückstand im Cognacglas passt zu keinem Wein — es ist eine medizinische Tinktur.",
          "Alistairs neues Testament nannte keinen neuen Erben; es nannte ein VERBRECHEN und die Person, die es beging.",
          "Wer ihn vergiftete, musste die verschlossene Bibliothek nie betreten.",
        ],
      },
    ],
    reveal:
      "Der Riegel war ein Ablenkungsmanöver; das Gift war schon in ihm. Lord Alistairs 'neues Testament' war gar kein Testament — es war eine Anklage. Er hatte den gefälschten Schein ausgegraben, der bewies, dass Dr. Edmund Voss vor Jahren seinen Patienten für eine Börse voll Guineen sterben ließ. Also würzte Voss das abendliche Tonikum vor dem Essen, wohl wissend, dass Alistair es in sein Arbeitszimmer tragen und sich wie immer einschließen würde. Der Mörder ist DR. EDMUND VOSS — und die verschlossene Tür war nie eine Barriere. Sie war ein Alibi.",
    howToRun: [
      "Druckt aus dem Hinweis-Paket einen Charakterbogen pro Gast und gebt jedem Spieler nur den eigenen — lasst niemals einen das Geheimnis eines anderen lesen.",
      "Lest die Einleitung vor, sobald alle eine Rolle haben. Nutzt gedämpftes Licht und lasst den Sturm die Arbeit tun.",
      "Spielt drei Runden. Lest die Erzählung jeder Runde, gebt die Anweisung, dann enthüllt die Hinweise der Runde (vorlesen oder die passenden Hinweiskarten austeilen).",
      "Lasst die Spieler sich zwischen den Runden frei bewegen, flüstern und beschuldigen — die Räume des Grundrisses sind ihr Revier zum 'Durchsuchen'.",
      "Nach der Abstimmung in Runde drei lest die Enthüllung. Lasst dann den Schuldigen (Dr. Voss) mit eigenen Worten gestehen.",
    ],
    briefs: [
      {
        relationship: "Alistairs zweite Frau, zweifach verwitwet.",
        secret:
          "Euer erster Mann starb nicht an einem schwachen Herzen — Dr. Voss unterschrieb den Schein, und ihr habt immer halb geahnt, warum. Ihr habt geschwiegen, weil Voss Briefe besitzt, die euch ruinieren würden.",
        alibi: "Im Salon bei eurer Stickerei, als das Licht ausging; über dem Donner habt ihr nichts gehört.",
        accused: "\"Ich habe zwei Ehemänner begraben. Glaubt ihr wirklich, ich würde mein eigenes Haus mit einem dritten Skandal beschmutzen?\"",
      },
      {
        relationship: "Alistairs Sohn, heute Mittag aus dem Testament gestrichen.",
        secret:
          "Ihr ertrinkt in Schulden, die euer Vater nicht zahlen wollte, und ihr kamt heute Nacht, um ihn ein letztes Mal anzuflehen. Er lachte euch aus. Ihr seid kein Mörder — aber ihr habt das verbrannte Geschäftsbuch aus dem Keller gestohlen, um zu verbergen, wie hoch eure Schulden sind.",
        alibi: "Rauchend auf den Stufen des Wintergartens im Regen; niemand kann für euch bürgen.",
        accused: "\"Mittags enterbt, um Mitternacht beschuldigt. Wie ordentlich. Ich wollte sein Geld — lebendig, ihr Narren, nicht tot.\"",
      },
      {
        relationship: "Der Hausarzt, dem jedes Ravensmoor-Leben — und jeder Tod — anvertraut war.",
        secret:
          "IHR habt ihn getötet. Vor Jahren ließt ihr gegen Bezahlung Cordelias ersten Mann sterben und fälschtet den Schein. Alistair fand ihn und wollte euch heute Nacht entlarven, also vergiftetet ihr sein Verdauungstonikum vor dem Essen. Er schloss sich ein und trank allein. Leugnet alles. Das fehlende braune Fläschchen ist in eurem Koffer — werdet es los, wenn ihr könnt.",
        alibi: "Oben allein bei einer 'Kopfschmerz'-Behandlung, als das Licht ausfiel — günstig weit von Zeugen.",
        accused: "\"Ich habe diese Familie dreißig Jahre am Leben gehalten. Ich legte einen Eid ab. Ihr beleidigt den Eid und den Mann, der ihn schwor.\"",
      },
      {
        relationship: "Die Gouvernante, die alles durch diese Wände hört.",
        secret:
          "Ihr habt heute Nachmittag Alistair und Voss über 'einen alten Schein' streiten hören und wisst mehr, als ihr solltet. Ihr schweigt, weil ihr seit Jahren heimlich in Julian verliebt seid und fürchtet, in seinen Ruin gezogen zu werden.",
        alibi: "Die Kinder im Ostflügel zu Bett bringend; das älteste wachte beim Donner auf und kann für euch bürgen.",
        accused: "\"Ich höre alles in diesem Haus, mein Herr. Wäre ich die Mörderin, würde ich kaum durch zu vieles Hören Aufmerksamkeit erregen.\"",
      },
      {
        relationship: "Alistairs Cousin, charmant und katastrophal verschuldet.",
        secret:
          "Ihr habt Alistair um ein Darlehen für Spielschulden angefleht, die euch den Abschied einbringen könnten, und er willigte ein — die Darlehenspapiere sind in eurem Mantel. Sein Tod ist eine Katastrophe für euch, kein Glücksfall: das Versprechen stirbt mit ihm.",
        alibi: "Im Billardzimmer bei einer Karaffe; der Butler füllte sie zweimal nach und sah euch dort.",
        accused: "\"Ich brauchte ihn solvent und atmend. Den einzigen Mann zu töten, der mir einen Schilling leiht — das wäre vielleicht eine Strategie.\"",
      },
      {
        relationship: "Der Testamentsvollstrecker, die einzige Seele, die wusste, was das neue Testament sagen würde.",
        secret:
          "Ihr wisst, dass das 'Testament' in Wahrheit Alistairs schriftliche Anklage gegen Voss war — und ihr zweigt seit Jahren still die Nachlasskonten ab. Ihr fürchtet, jede Untersuchung würde euren eigenen Diebstahl aufdecken, also wäre euch lieber, dies würde als tragischer Unfall gewertet.",
        alibi: "Eingeschlossen im Arbeitszimmer-Büro bei der Vorbereitung der Dokumente; die Tür wurde den ganzen Abend geschlossen gesehen.",
        accused: "\"Ich bin der Einzige, der weiß, was das Dokument wirklich sagte. Wäre ich schuldig, hätte ich es nicht einfach verbrannt?\"",
      },
    ],
  },

  "midnight-express": {
    hostNote:
      "Der Mörder ist CONTESSA BIANCA MOREAU. Ihr Titel ist gestohlen — vor Jahren war sie eine Juwelendiebin, und Henry Ashcombe war der Versicherungsmann, der sie beinahe gefasst hätte. Er erkannte sie beim Dinner und wollte an der nächsten Station die Polizei verständigen. Als der Zug den langen Tunnel durchfuhr und die Lampen flackerten, schlich sie von ihrer Kabine in seine und nutzte seine eigene 'Einbrecher'-Geschichte vom aufgebrochenen Fenster gegen ihn. Der unberührte Schnee auf dem Sims beweist, dass niemand von außen kam: der Mörder war bereits an Bord.",
    intro:
      "Schnee löscht die Welt jenseits des Glases; drinnen glänzt das Messing und der Wein ist warm. Irgendwo zwischen dem Speisewagen und Abteil Neun trat Henry Ashcombe aus dem Leben ins Reich der Toten. Der Pass ist verschüttet; der Zug kann nicht fahren; niemand stieg zu, und niemand stieg aus. Die Wahrheit ist also einfach und unerträglich: ein Passagier in diesem Wagen ist ein Mörder. Schenkt den Wein ein. Achtet auf eure Alibis.",
    rounds: [
      {
        name: "Erste Runde — Alles einsteigen",
        narration:
          "Sechs Fremde, ein Wagen und eine Leiche in Abteil Neun. Sagt uns, wer ihr seid und warum ihr heute Nacht den Mitternachtsexpress bestiegen habt — und was Henry Ashcombe für euch war.",
        instructions:
          "Jeder Spieler stellt seine Figur vor und nennt seinen Reisegrund. Noch keine Geheimnisse — aber jeder sollte zumindest ein wenig lügen.",
        clues: [
          "Der Fensterriegel von Abteil Neun wurde von innen aufgebrochen — doch der Schnee auf dem Sims liegt völlig unberührt.",
          "In Ashcombes Notizbuch fehlt eine Seite; der abgerissene Rand bleibt.",
          "Der Schaffner bestätigt, dass nach dem Pass niemand zu- oder ausstieg — der Mörder ist in diesem Wagen.",
        ],
      },
      {
        name: "Zweite Runde — Der Tunnel",
        narration:
          "Als der Zug den langen Tunnel nahm, erloschen die Lampen für neunzig Sekunden. In diesem Dunkel ging jemand durch den Gang, der schwört, sich nie bewegt zu haben. Durchsucht die Wagen — und einander.",
        instructions:
          "Jeder Spieler 'durchsucht' einen Raum aus dem Grundriss und liest dessen Hinweis. Dann enthüllt euer Geheimnis einem anderen Spieler unter vier Augen. Beginnt, die Alibis zu hinterfragen.",
        clues: [
          "Salonwagen: zwei Zigaretten derselben seltenen türkischen Marke, in einem Aschenbecher zerdrückt.",
          "Bordküche: ein Tranchiermesser, sauber gewischt und in die falsche Schublade zurückgelegt.",
          "Die abgerissene Seite nannte eine Frau, die vor Jahren wegen einer Reihe von Juwelendiebstählen gesucht wurde — kein Name, nur eine Beschreibung.",
        ],
      },
      {
        name: "Dritte Runde — Endstation",
        narration:
          "Ein Räumpflug kommt die Strecke herauf; in einer Stunde steigt die Polizei zu. Nennt jetzt euren Mörder, solange der Schnee noch eure Geheimnisse hält.",
        instructions: "Jeder Spieler beschuldigt jemanden und nennt seine Beweise. Stimmt gemeinsam ab, dann lest die Enthüllung.",
        clues: [
          "Die Beschreibung auf der abgerissenen Seite passt zu einem Passagier an genau diesem Tisch.",
          "Ashcombe war ein Versicherungsermittler, kein Finanzier — er jagte Diebe.",
          "Das aufgebrochene Fenster war gestellt: keine Fußspuren, kein Schmelzwasser, niemand von außen.",
        ],
      },
    ],
    reveal:
      "Henry Ashcombe verkaufte nie Versicherungen — er jagte jene, die sie betrogen. Vor Jahren fasste er beinahe eine Juwelendiebin, die in einem gestohlenen Adelsnamen verschwand. Heute Nacht erkannte er sie über den Speisewagen hinweg: die Contessa Bianca Moreau, deren Juwelen echt sind, weil sie sie stahl. Er wollte an der nächsten Station die Polizei verständigen. Also schlich sie im Dunkel des Tunnels zu Abteil Neun, brachte ihn zum Schweigen und brach das Fenster auf, um einen Einbrecher zu erfinden, den es nie gab. Der Mörder ist CONTESSA BIANCA MOREAU — und der Schnee auf dem Sims hat nie gelogen.",
    howToRun: [
      "Gebt jedem Gast nur seinen eigenen Charakterbogen. Der Bogen der Contessa sagt ihr, dass sie schuldig ist; kein anderer tut das.",
      "Lest die Einleitung bei gedämpftem Licht — eine einzelne warme Lampe ist perfekt für einen Nachtzug.",
      "Spielt drei Runden: Erzählung, Anweisung, dann die Hinweise der Runde freigeben.",
      "Ermuntert die Spieler, sich zwischen den 'Wagen' zu bewegen und Deals zu flüstern — Alibis sollten sich verschieben und brechen.",
      "Nach der letzten Abstimmung lest die Enthüllung und lasst die Contessa ihr Geständnis mit Stil ablegen.",
    ],
    briefs: [
      {
        relationship: "Eine glitzernde Fremde, die Ashcombe beim Dinner zu erkennen schien.",
        secret:
          "IHR seid keine Contessa. Titel und Juwelen sind gestohlen, und Ashcombe war der Ermittler, der euch vor Jahren beinahe fasste. Er erkannte euch heute Nacht und wollte die Polizei verständigen. Im Dunkel des Tunnels gingt ihr zu Abteil Neun, brachtet ihn zum Schweigen und brachet das Fenster auf, um einen Einbrecher vorzutäuschen. Die abgerissene Seite beschreibt EUCH. Bezaubert sie. Gesteht nichts.",
        alibi: "Schlafend in eurer Privatkabine bei verschlossener Tür; eure Zofe — die es heute Nacht nicht gibt — kann für euch 'bürgen'.",
        accused: "\"Sehe ich aus wie eine Frau, die im Schnee durch Fenster klettert? Für solche Dinge habe ich Leute, mein Lieber.\"",
      },
      {
        relationship: "Der Eisenbahn-Finanzier — Ashcombe prüfte die Konten seiner Strecke.",
        secret:
          "Eure Eisenbahn ist heimlich bankrott, und ihr frisiert die Bücher. Ihr fürchtetet, Ashcombe sei hier, um euch zu prüfen, und seid erleichtert, dass er tot ist — obwohl ihr ihn nicht getötet habt. Ihr habt den Portier bestochen, gewisse Papiere zu verlieren.",
        alibi: "Im Salonwagen bei einem Cognac; der Portier bediente euch die ganze Nacht und sah euch dort.",
        accused: "\"Meine Bücher sind ein Chaos, das gebe ich zu. Mein Gewissen jedoch ist makellos. Ich ruiniere Männer mit Papier, nicht mit Messern.\"",
      },
      {
        relationship: "Ein Inspektor außer Dienst, der 'zufällig' reist.",
        secret:
          "Ihr seid gar nicht außer Dienst — ihr beschattetet Ashcombe, den ihr verdächtigtet, einen Zeugen in eurem eigenen Fall zu erpressen. Sein Tod hat euch eine Spur gekostet. Ihr verbargt eure Marke, um nicht einen Tatort zu übernehmen, in den ihr zu sehr verstrickt seid.",
        alibi: "Im Gang für eine Zigarette stehend, als der Tunnel dunkel wurde; ihr saht eine Gestalt vorbeigehen, aber nicht ihr Gesicht.",
        accused: "\"Ein Inspektor reist, ja. Wollte ich einen Mann töten, Monsieur, würde ich nicht den Beruf bewerben.\"",
      },
      {
        relationship: "Eine Kriminalautorin, die sich beim Dinner mit Ashcombe anfreundete.",
        secret:
          "Ihr kamt auf der Jagd nach Stoff für ein Buch — und Ashcombe ließ durchblicken, er sei 'kurz davor, in genau diesem Zug eine berühmte Diebin zu fassen.' Ihr schriebt alles in euer Notizbuch, was euch zu einer Zeugin macht, die noch nicht begreift, was sie sah.",
        alibi: "Bis spät im Speisewagen schreibend; der Steward räumte euren Tisch ab und erinnert sich an euren endlosen Kaffee.",
        accused: "\"Ich schreibe Morde, ich begehe sie nicht — die Recherche ist grässlich und die Arbeitszeiten noch schlimmer.\"",
      },
      {
        relationship: "Der Nachtportier, der sieht, wer jede Kabine betritt.",
        secret:
          "Ihr saht die Contessa während des Tunnels ihre Kabine verlassen — aber ihr stecktet auch eine Banknote von Vance ein, um gewisse Papiere zu 'vergessen', und ihr fürchtet, dass beim Reden eure eigene kleine Korruption ans Licht kommt.",
        alibi: "Die ganze Nacht im Gang arbeitend; ihr wart überall und nirgends, wie Portiers es sind.",
        accused: "\"Ich sehe alles in diesem Zug, Monsieur — genau deshalb wäre ich nie töricht genug, beim Morden gesehen zu werden.\"",
      },
    ],
  },

  "the-masquerade": {
    hostNote:
      "Der Mörder ist MAESTRO PIETRO ALBANI. Contarini stahl vor Jahren Albanis größte Komposition und gab sie als Auftragswerk aus, ruinierte den Komponisten und zerbrach ihn. Albani verbrachte ein Jahr damit, ein 'Requiem' zu schreiben — in Wahrheit ein in Musik gesetztes Geständnis — und vollendete es vor dem Mord. Zum Schlag der Mitternacht vergiftete er das Trinkglas des Gastgebers mit einer mandelduftenden Tinktur aus der Kapelle. Hinter den Masken sah niemand sein Gesicht; das vollendete Requiem und das geleerte Fläschchen sind der Beweis.",
    intro:
      "Kerzenlicht schwimmt im Kanal, und hinter jeder Maske lächelt ein Fremder. Beim zwölften Schlag hob Il Padrone sein Glas auf das neue Jahr — und sank auf den Marmor, ehe der Trinkspruch zu Ende war. Kein Gesicht wurde gesehen. Kein Name gesprochen. Aber jeder Gast hier hatte einen Grund, und einer von euch trug ihn die ganze Nacht unter seiner Maske. Wählt eine Maske. Wählt eine Lüge. Die Uhr schlägt bereits.",
    rounds: [
      {
        name: "Erste Runde — Die Demaskierung beginnt",
        narration:
          "Il Padrone versammelte Venedigs Beste, um seinen Triumph zu sehen. Nun liegt er unter seinem eigenen Kronleuchter. Sagt uns, welche Maske ihr tragt und was der Gastgeber für euch war.",
        instructions: "Jeder Spieler stellt seine maskierte Figur und seine öffentliche Verbindung zum Gastgeber vor. Haltet euer Geheimnis verborgen — vorerst.",
        clues: [
          "Das Weinglas des Gastgebers zersplitterte, als er fiel, doch der Marmor darunter ist trocken — der Wein war bereits getrunken.",
          "Ein schwacher Duft von Bittermandeln haftet am Rand des zerbrochenen Glases.",
          "Sein letzter Trinkspruch pries 'ein großes Werk, endlich mein eigenes' — Worte, die einen Gast erbleichen ließen.",
        ],
      },
      {
        name: "Zweite Runde — Spiegel und Lügen",
        narration:
          "Dieser Palazzo besteht aus Spiegeln, und heute Nacht erzählt jeder Spiegel eine andere Geschichte. Durchschreitet seine Räume. Findet, was der Gastgeber verbarg — und was jemand vor ihm verbarg.",
        instructions:
          "Jeder Spieler durchsucht einen Raum aus dem Grundriss und liest dessen Hinweis. Dann enthüllt unter vier Augen euer Geheimnis einem anderen Gast. Argwohn kann sich zur Anklage schärfen.",
        clues: [
          "Kapelle: ein kleines Fläschchen, das einst eine mandelduftende Tinktur enthielt, steht leer hinter dem Altar.",
          "Musikgalerie: ein vollendetes Requiem, datiert auf gestern — seine letzte Seite bereits getuscht.",
          "Kartenzimmer: eine heute Abend unterzeichnete Ehrenschuld, sauber entzweigerissen.",
        ],
      },
      {
        name: "Dritte Runde — Der zwölfte Schlag",
        narration:
          "Die Morgendämmerung kommt den Kanal herauf, und mit ihr die Gondel des Magistrats. Bevor die Masken endgültig fallen, nennt den, der jenes Glas leerte.",
        instructions: "Jeder Spieler beschuldigt und argumentiert. Stimmt gemeinsam ab, dann lest die Enthüllung.",
        clues: [
          "Das 'große Werk', auf das der Gastgeber anstieß, war eine Komposition, die er gestohlen und als seine eigene ausgegeben hatte.",
          "Das Requiem in der Galerie war VOR dem Mord vollendet — der Mörder plante das Ende.",
          "Der Mandelduft ist die Signatur der Tinktur aus der Kapelle, die nun leer ist.",
        ],
      },
    ],
    reveal:
      "Der Trinkspruch war der letzte Fehler des Gastgebers. 'Ein großes Werk, endlich mein eigenes' — doch es war nie seines. Vor Jahren stahl Giovanni Contarini das Meisterwerk des Maestros und gab es als Auftragswerk aus, was Pietro Albani ruiniert und vergessen zurückließ. Also komponierte Albani ein Requiem — ein Geständnis in Musik — und vollendete es am Tag vor dem Ball. Um Mitternacht, hinter einer Maske, die niemand lesen konnte, kippte er die Mandeltinktur der Kapelle in das Glas des Gastgebers und ließ ihn sich selbst ins Grab zuprosten. Der Mörder ist MAESTRO PIETRO ALBANI. Das Requiem war stets dazu bestimmt, bei einer Beerdigung gespielt zu werden.",
    howToRun: [
      "Druckt die im Paket enthaltenen Masken (oder lasst die Gäste eigene mitbringen) und gebt jedem Spieler nur seinen Bogen.",
      "Lest die Einleitung möglichst um Mitternacht — Kerzenlicht und eine zwölf schlagende Uhr setzen die Szene.",
      "Spielt drei Runden: Erzählung, Anweisung, Hinweise. Lasst die Masken bis zur finalen Enthüllung auf.",
      "Lasst die Gäste durch die 'Räume' treiben, Handel treiben und zwischen den Runden Beschuldigungen austauschen.",
      "Nach der Abstimmung lest die Enthüllung und lasst den Maestro gestehen — idealerweise mit etwas Musik.",
    ],
    briefs: [
      {
        relationship: "Die Mätresse des Gastgebers, die zu einer Feier Trauer trug.",
        secret:
          "Ihr wusstet, dass Contarini euch für eine jüngere Frau verstoßen wollte, und ihr trugt heute Nacht Schwarz, weil ihr ein Ende nahen spürtet. Ihr habt ihn nicht getötet — aber ihr habt seine Schatulle von euren Liebesbriefen geleert, bevor der Magistrat sie finden konnte.",
        alibi: "Die Pavane in der Mitte des Ballsaals tanzend, als er fiel; ein Dutzend Masken sah euch.",
        accused: "\"Ich trug Trauer, weil ich bereits wusste, dass er getötet hatte, was wir waren. Trauer ist nicht dasselbe wie Schuld.\"",
      },
      {
        relationship: "Ein rivalisierender Adliger, den der Gastgeber in einem Landstreit ruinierte.",
        secret:
          "Contarini machte euer Haus bankrott, und ihr kamt heute Nacht, um ihn öffentlich herauszufordern — die zerrissene Schuld im Kartenzimmer ist eure, durch seinen Tod nichtig. Ihr wolltet ihn gedemütigt und lebendig, nicht tot und zum Märtyrer gemacht.",
        alibi: "Am Kartentisch schwer verlierend; drei Spieler und ein Diener beobachteten euch die ganze Stunde.",
        accused: "\"Ich wollte ihn im Tageslicht ruinieren, vor ganz Venedig. Ein Giftmörder arbeitet im Dunkeln. So bescheiden bin ich nicht.\"",
      },
      {
        relationship: "Die maskierte Sängerin, die der Gastgeber engagierte — und verfolgte.",
        secret:
          "Niemand hat je euer Gesicht gesehen, und das soll so bleiben: unter der Maske seid ihr eine Frau, die der Gastgeber einst am Altar sitzen ließ, verkleidet zurückgekehrt. Ihr kamt für die Wahrheit, nicht für Blut — aber wenn ihr demaskiert werdet, wird euer Skandal den Mord überstrahlen.",
        alibi: "Auf der Galerietreppe singend, als der Gastgeber zusammenbrach; der ganze Saal wandte sich eurer Stimme zu.",
        accused: "\"Ihr beschuldigt eine Stimme ohne Gesicht. Wie venezianisch. Ich sang, während er starb — fragt jeden, der weinte.\"",
      },
      {
        relationship: "Der Hofkomponist, den der Gastgeber 'beauftragt' hatte.",
        secret:
          "IHR habt ihn getötet. Contarini stahl vor Jahren euer Meisterwerk und nannte es sein eigenes, und heute Nacht prostete er euch ins Gesicht mit 'einem großen Werk, endlich mein eigenes' zu. Also vollendetet ihr ein Requiem für ihn — am Tag zuvor fertig — und um Mitternacht leertet ihr die Mandeltinktur der Kapelle in sein Glas. Hinter eurer Maske sah es niemand. Lasst sie die Musik bewundern. Gesteht nichts.",
        alibi: "Am Cembalo 'stimmend', als die Uhr schlug; ihr tratet nur weg, um Notenblätter zu holen — so sagt ihr.",
        accused: "\"Ich gab diesem Mann mein Lebenswerk, und er gab mir seinen Namen darauf. Wollte ich ihn tot, würde ich ein Requiem mit meiner eigenen Hand auf jeder Seite hinterlassen?\"",
      },
      {
        relationship: "Der Beichtvater des Gastgebers — und Hüter seiner Sünden.",
        secret:
          "Contarini beichtete euch vieles, darunter den Diebstahl von Albanis Musik — und ihr sprachet ihn gegen eine großzügige Spende los. Ihr schweigt, weil das Beichtgeheimnis auch eure eigene Simonie verbirgt.",
        alibi: "In der Seitenkapelle die Beichte einer Adligen hörend; sie wird für die Stunde bürgen, wenn auch nicht für die Sünden.",
        accused: "\"Ich spreche Mörder los, mein Kind. Ich werde keiner. Meine Hände sind zum Segnen da — und, gelegentlich, zum Einsammeln.\"",
      },
      {
        relationship: "Ein ungeladener Gast ohne Namen auf der Liste.",
        secret:
          "Ihr seid der uneheliche Sohn des Gastgebers, unter einer Harlekin-Maske eingeschlichen, um den Vater zu sehen, der euch nie anerkannte. Ihr kamt, um ihn zur Rede zu stellen, fandet ihn tot und fürchtet nun, dass eure Entdeckung hier euch zum offensichtlichen Verdächtigen macht.",
        alibi: "Niemand lud euch ein, also beobachtete euch niemand — eure größte Gefahr heute Nacht.",
        accused: "\"Kein Name, kein Spiegelbild, keine Einladung — ich weiß, wie es aussieht. Aber ich kam, um von ihm anerkannt zu werden, nicht um ihn zu begraben.\"",
      },
    ],
  },
};
