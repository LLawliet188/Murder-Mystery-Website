import type { ScriptOverlay } from "./content-types";

// German scripts — part D (knife-at-the-gala, carnival-of-shadows).
export const SCRIPTS_DE_D: Record<string, ScriptOverlay> = {
  "knife-at-the-gala": {
    hostNote:
      "Die Mörderin ist SLOANE WHITMORE, die Erbin. Sie fand den neuen Ehevertrag ihres Vaters und das überarbeitete Testament, die sie zugunsten seiner neuen Verlobten fast vollständig ausschlossen. Unter Deck, während des Toasts, den sie eigentlich halten sollte, stellte sie ihn zur Rede und stieß ihm den Brieföffner aus der Kabine in die Brust. Die nassen Davitseile und die Spur eines 'Eindringlings von außen' sind ihr plumper Versuch, den Eindruck zu erwecken, jemand sei von einem anderen Boot gekommen — doch alle Beiboote liegen an Land.",
    intro:
      "Eine Meile vor der Küste glitzert die Superyacht Mirabel mit der Skyline der Stadt und ihrem schmutzigsten Geld. Der Gastgeber versammelte seine Gäste an Deck zu einem Toast, den er nie beenden wird — denn unten, in der Kabine, liegt Gerald Whitmore zusammengesunken, mit einem Brieföffner dort, wo sein Manschettenknopf sein sollte. Die Beiboote sind an Land. Die Party kann nicht weg. Und der Mörder auch nicht. Füllt eure Gläser. Jeder an Bord hatte einen Grund; nur einer hatte die Nerven.",
    rounds: [
      {
        name: "Erste Runde — Bon Voyage",
        narration:
          "Gerald Whitmore versammelte euch hier draußen, um auf sein Glück anzustoßen. Jetzt ist sein Vermögen das Problem eines anderen. Sagt uns, wer ihr seid und was der alte Mann für euch war.",
        instructions:
          "Jeder Spieler stellt seine Figur und seine Verbindung zu Whitmore vor. Noch keine Geheimnisse — aber jeder an Bord will etwas.",
        clues: [
          "Whitmore wurde unter Deck mit seinem eigenen Kabinen-Brieföffner getötet.",
          "Oben steht der Champagner für seinen Toast eingeschenkt und unberührt — ein Glas mit Lippenstift am Rand.",
          "Die Beiboote sind alle an Land; niemand hätte von einem anderen Schiff kommen können.",
        ],
      },
      {
        name: "Zweite Runde — Unter Deck",
        narration:
          "Jemand will euch glauben machen, ein Fremder sei aus dem dunklen Wasser an Bord geklettert. Die Yacht sagt etwas anderes. Durchsucht sie, vom Bug bis zum Heck.",
        instructions:
          "Jeder Spieler durchsucht einen Raum aus dem Grundriss und liest dessen Hinweis vor. Dann enthüllt euer Geheimnis einem anderen Spieler unter vier Augen. Beschuldigungen dürfen beginnen.",
        clues: [
          "Brücke: die Abstimmung des Funkgeräts ist zerschlagen — niemand an Land wird einen Notruf hören.",
          "Kombüse: der Brieföffner, der zum Schreibtischset des Kapitäns passt, fehlt.",
          "Tender-Bucht: beide Boote sind an Land, doch die Davitseile sind nass und frisch durchgezogen — eine inszenierte 'Flucht'.",
        ],
      },
      {
        name: "Dritte Runde — Mann über Bord",
        narration:
          "Die Lichter der Küstenwache wenden sich endlich aus dem Hafen heraus. Nennt den Mörder, bevor sie an Bord kommen und die Anwälte übernehmen.",
        instructions: "Jeder Spieler beschuldigt und trägt seinen Fall vor. Stimmt gemeinsam ab, dann lest die Enthüllung.",
        clues: [
          "Whitmore hatte in genau dieser Woche ein neues Testament und einen Ehevertrag unterschrieben — und jemand sollte abgeschnitten werden.",
          "Der 'Eindringling aus dem Wasser' war inszeniert; die nassen Seile führen nirgendwohin.",
          "Nur jemand, der bereits an Bord war und die Kabine kannte, konnte ihn und den Brieföffner erreichen.",
        ],
      },
    ],
    reveal:
      "Es gab keinen Eindringling aus dem dunklen Wasser — die nassen Seile waren eine Lüge, und die Beiboote verließen nie den Steg. Die Wahrheit war ein Stück Papier: Gerald Whitmore hatte gerade ein neues Testament und einen Ehevertrag unterzeichnet, die seine eigene Tochter zugunsten seiner neuen Verlobten aus fast allem ausschlossen. Unter Deck, während des Toasts, den sie zu seinen Ehren halten sollte, stellte Sloane Whitmore ihren Vater zur Rede, und seine Verachtung traf auf den Brieföffner aus der Kabine. Die Mörderin ist SLOANE WHITMORE — Daddys Vermögen und Daddys Verachtung, in einer einzigen Nacht geerbt.",
    howToRun: [
      "Dieser Fall ist einsteigerfreundlich — perfekt für das erste Mystery. Gebt jedem Gast nur seinen Bogen; Sloanes nennt sie als Mörderin.",
      "Lest die Einleitung auf einem 'Deck' mit Champagner (oder alkoholfreiem Schaumwein). Eine City-Lights-Playlist ist optional, aber reizvoll.",
      "Spielt drei Runden: Erzählung, Anweisung, Hinweise. Haltet das Tempo straff — das ist ein Fall für 60 bis 90 Minuten.",
      "Lasst die Spieler durch die 'Yacht'-Räume wandern und zwischen den Runden Klatsch tauschen.",
      "Nach der Abstimmung lest die Enthüllung und lasst Sloane zerbrechen — oder sich eiskalt rechtfertigen.",
    ],
    briefs: [
      {
        relationship: "Whitmores Tochter und mutmaßliche Erbin.",
        secret:
          "IHR habt ihn getötet. Ihr fandet das neue Testament und den Ehevertrag, die euch zugunsten seiner jungen Verlobten ausschlossen, und unter Deck — während des Toasts, den ihr auf ihn halten solltet — war seine Verachtung der letzte Tropfen. Ihr benutztet den Kabinen-Brieföffner und ließt dann die Davitseile nass laufen, um einen Eindringling aus dem Wasser vorzutäuschen. Spielt die erschütterte Tochter. Gesteht nichts.",
        alibi: "'Sich frisch machen' unter Deck allein, als es passierte — auf demselben Deck, auf dem er starb.",
        accused: "\"Er war mein Vater. Was immer er von mir hielt, was immer diese Frau ihm ins Ohr flüsterte — glaubt ihr wirklich, ich würde eine Klinge in mein eigenes Blut stoßen?\"",
      },
      {
        relationship: "Ein Investor, dessen Imperium von Whitmores Finanzierung abhängt.",
        secret:
          "Whitmore sagte euch heute Nacht, er werde die Finanzierung zurückziehen, die euer Geschäft am Leben hält — finanziell euer Todesurteil. Ihr habt ihn eine Stunde vor seinem Tod unter Deck angefleht, was euch mit Motiv an den Tatort bringt. Aber ihr ließet ihn atmend zurück.",
        alibi: "Auf dem Sonnendeck, wo ihr den Raum nach neuen Geldgebern bearbeitetet; drei Gäste erinnern sich an euren verzweifelten Charme.",
        accused: "\"Er war dabei, mich zu ruinieren — lebend war er meine letzte Hoffnung. Ein toter Gönner bezahlt keine Rechnungen, mein Freund. Ich brauchte seine Unterschrift, nicht sein Blut.\"",
      },
      {
        relationship: "Der Kapitän der Yacht, Herr über den einzigen Weg an Land.",
        secret:
          "Ihr habt das Funkgerät zerschlagen — aber nicht, um einen Mörder festzusetzen. Whitmore erwischte euch dabei, wie ihr seine Yacht für Schmuggel im Auftrag eines Kartells nutztet, und ihr habt das Funkgerät früher am Abend lahmgelegt, damit er nicht die Behörden ruft. Er lebte noch, als ihr das tatet. Jetzt lässt eure Sabotage euch wie den Komplizen des Mörders aussehen.",
        alibi: "Auf der Brücke beim Planen des Rückkurses; der Steuermann war bei euch — aber ihr tratet einmal weg.",
        accused: "\"Ich kontrolliere dieses Schiff, ja — wenn ich also einen Mann loswerden wollte, liegt das Meer genau dort, tief und still. Eine Klinge unter Deck ist das Verbrechen eines Passagiers, nicht eines Kapitäns.\"",
      },
      {
        relationship: "Die Kunsthändlerin, die Whitmore sein Prunkstück verkaufte.",
        secret:
          "Das Meisterwerk, das ihr ihm verkauft habt, ist eine Fälschung, und er hatte es gerade schätzen lassen — ihr wart Minuten vor Entlarvung und Ruin. Sein Tod kauft euer Schweigen, was ein Motiv in Öl ergibt. Aber ihr wart nie unter Deck.",
        alibi: "Im Salon, wo ihr 'euer' Gemälde mit zwei Sammlern bewundertet; sie werden eure Darbietung der Ruhe bestätigen.",
        accused: "\"Ich handle mit schönen Lügen, Liebling — Farbe und Provenienz, nicht Blut. Entlarvt mich als Fälscherin, wenn ihr müsst, aber als Mörderin? Wie grob.\"",
      },
      {
        relationship: "Die Influencerin, die die glamouröse Nacht des Gastgebers livestreamt.",
        secret:
          "Ihr habt alles gefilmt — bis euer Stream rund um den Todeszeitpunkt sechs Minuten ausfiel, und ihr habt diese Lücke heimlich gelöscht, weil sie zeigt, wie ihr unter Deck schlüpft, um auf eine Mutprobe hin ein Schmuckstück von Whitmore zu stehlen. Ihr seid heute Nacht eine Diebin, keine Mörderin.",
        alibi: "'Die ganze Nacht live vor der Kamera' — außer den sechs Minuten, die ihr gelöscht habt, was die denkbar schlechteste Lücke ist.",
        accused: "\"Mein ganzes Leben ist vor der Kamera — glaubt ihr, ich würde einen Mord livestreamen? Die Lücke war Dummheit, nicht tödlich. Ich nahm ein Armband, okay? Kein Leben.\"",
      },
    ],
  },

  "carnival-of-shadows": {
    hostNote:
      "Der Mörder ist MR. SLOAN, der Geldmann des Jahrmarkts. Er hatte jahrelang die Einnahmen des Jahrmarkts veruntreut, und Augustus Vell — dessen kleines schwarzes Buch die Geheimnisse aller verzeichnete — hatte endlich bemerkt, dass die Bücher nicht stimmten, und angefangen zu fragen, warum. Während der Schlussverbeugung, unter dem Scheinwerfer, schlug Sloan Vell nieder und nahm das schwarze Buch an sich, um die Beweise seines Diebstahls zu vernichten. Er bog Hugos Eisenstange und wischte sie ab, um den Verdacht auf den Kraftmenschen zu lenken.",
    intro:
      "Streifen und Laternen steigen am Stadtrand auf, und der Ausrufer verspricht Wunder für einen Nickel. Unter dem großen Zelt hebt der Zirkusdirektor zum Schlussapplaus den Hut — und hebt den Kopf nicht wieder. Das Karussell dreht sich weiter. Die Menge hält es für Teil der Nummer. Aber die Artisten wissen es besser, denn einer von ihnen schrieb dieses Finale. Treten Sie näher. Jede Seele unter diesem Zelt hat ein Geheimnis, und eine von ihnen hat eine Leiche.",
    rounds: [
      {
        name: "Erste Runde — Die Schlussverbeugung",
        narration:
          "Augustus Vell führte diesen Jahrmarkt mit eiserner Faust und einem kleinen schwarzen Buch. Nun liegt er unter seinem eigenen Scheinwerfer. Sagt uns, wer ihr in dieser Truppe seid und was der Zirkusdirektor für euch war.",
        instructions:
          "Jeder Spieler stellt seine Jahrmarktsfigur und seine Geschichte mit Vell vor. Haltet euer Geheimnis hinter dem Vorhang.",
        clues: [
          "Der Zirkusdirektor fiel mitten in der Verbeugung; der Scheinwerfer wich nie von ihm, und doch sah niemand den Schlag.",
          "Sein kleines schwarzes Buch — das die Geheimnisse jedes Artisten enthielt — ist verschwunden.",
          "Das Karussell lief zu schnell; jemand hatte eine Stunde vor der Show seine Bremse blockiert.",
        ],
      },
      {
        name: "Zweite Runde — Hinter den Zelten",
        narration:
          "Jedes Zelt auf diesem Platz verbirgt einen Trick, und heute Nacht verbarg eines einen Mord. Geht über den Rummel. Findet, was der Zirkusdirektor wusste — und wer es ihn nicht erzählen lassen konnte.",
        instructions:
          "Jeder Spieler durchsucht einen Raum aus dem Grundriss und liest dessen Hinweis vor. Dann enthüllt euer Geheimnis einem anderen Spieler unter vier Augen. Die Beschuldigungen dürfen beginnen.",
        clues: [
          "Kraftmenschen-Rig: eine Eisenstange, von Hand gebogen, dann von dem Fett saubergewischt, das alle anderen bedeckt.",
          "Wahrsagerzelt: ein Schicksal, für einen Tod gelegt — ausgelegt, bevor die Show überhaupt begann.",
          "Kuriositätenzelt: ein neues Exponat, verhängt, für das kein Besucher bezahlt hat.",
        ],
      },
      {
        name: "Dritte Runde — Zelt abbrechen",
        narration:
          "Der Morgen kommt, und der Jahrmarkt muss auf der Straße sein, bevor die Stadt zu einem toten Zirkusdirektor erwacht. Nennt den Mörder, bevor die Wagen rollen.",
        instructions: "Jeder Spieler beschuldigt und begründet seinen Fall. Stimmt gemeinsam ab, dann lest die Enthüllung.",
        clues: [
          "Vells schwarzes Buch verzeichnete die Geheimnisse aller — einschließlich eines Diebstahls aus den Einnahmen des eigenen Jahrmarkts.",
          "Die Bücher des Jahrmarkts stimmten nicht, und Vell hatte gerade begonnen zu fragen, warum.",
          "Die gebogene, abgewischte Stange sollte den Kraftmenschen belasten — doch das Fett des Kraftmenschen wurde von einer fremden Hand entfernt.",
        ],
      },
    ],
    reveal:
      "Die gebogene Eisenstange sollte auf Hugo, den Kraftmenschen, zeigen — doch sie war vom Fett gereinigt, das jedes seiner Werkzeuge bedeckt, von einer Hand, die nicht seine war. Die Wahrheit stand in den Kassenbüchern: Mr. Sloan, der Geldmann, hatte jahrelang die Einnahmen des Jahrmarkts abgeschöpft, und Augustus Vell hatte endlich bemerkt, dass die Bücher nicht stimmten, und die gefährliche Frage gestellt. Vell bewahrte die Geheimnisse aller in seinem kleinen schwarzen Buch auf — nun auch Sloans Diebstahl. Also schlug Sloan ihn im Schutz der Schlussverbeugung nieder und nahm das Buch, um die Beweise zu verbrennen. Der Mörder ist MR. SLOAN — und das fehlende Geld des Jahrmarkts war das älteste Motiv unter dem großen Zelt.",
    howToRun: [
      "Gebt jedem Gast nur seinen Bogen. Sloans nennt ihn als Mörder; Hugos warnt ihn, dass man ihn hereinlegen will.",
      "Lest die Einleitung wie ein Ausrufer vor Publikum — ein wenig Calliope-Musik darunter passt perfekt.",
      "Spielt drei Runden: Erzählung, Anweisung, Hinweise. Lasst die 'Zelte' auf dem Grundriss in jeder Runde durchsucht werden.",
      "Ermutigt zu großen, theatralischen Auftritten — das sind schließlich Jahrmarktsleute.",
      "Nach der Abstimmung lest die Enthüllung und lasst Sloans Maske des milden Buchhalters endlich fallen.",
    ],
    briefs: [
      {
        relationship: "Die Wahrsagerin, die Vells Tod 'vorhersah'.",
        secret:
          "Ihr habt vor der Show die Todeskarte gelegt — nicht aus Prophezeiung, sondern weil Vell euch mit einer Vergangenheit erpresste, die ihr begraben habt, und ihr spürtet, dass heute Nacht alles zuspitzen würde. Ihr wolltet ihn loswerden, ja; ihr wünschtet es sogar laut. Aber ihr habt ihn nicht geschlagen.",
        alibi: "In eurem Zelt beim Kartenlegen für einen zahlenden Kunden; der Kunde wird eure Kerzenstunde bestätigen.",
        accused: "\"Ich sah seinen Tod in den Karten, das ist alles. Etwas vorauszusehen heißt nicht, es zu tun — sonst wäre jede Wahrsagerin eine Mörderin.\"",
      },
      {
        relationship: "Der Kraftmensch, dessen Eisen der Mörder benutzte, um ihn zu belasten.",
        secret:
          "Eure gebogene Eisenstange wurde benutzt, um die Szene zu inszenieren, und ihr wisst, wie das aussieht. Die Wahrheit: Vell wusste, dass ihr ein Deserteur seid, der sich unter dem Namen eines Kraftmenschen vor der Armee versteckt, und hielt es euch vor. Ihr hasstet ihn dafür — aber ihr wärt nie so dumm, ihn mit eurer eigenen Signatur-Stange zu töten.",
        alibi: "Zwischen den Auftritten im Artistenwagen, wo ihr eure Schultern ruhen ließet; zwei Bühnenarbeiter würfelten neben euch.",
        accused: "\"Wenn ich einen Mann tötete, würde ich diese Hände benutzen, und es bräuchte keine gebogene Stange, um euch zu täuschen. Wer das tat, wollte, dass Hugo dafür hängt.\"",
      },
      {
        relationship: "Die Luftartistinnen, die alles teilen — auch einen Groll.",
        secret:
          "Vell betrog euch beide um den Lohn einer Saison und drohte, eure Nummer zu streichen; ihr teilt euch ein Motiv. Ihr plantet, den Jahrmarkt zu verlassen und die Einnahmen der Nacht als 'Nachzahlung' mitzunehmen — kleiner Diebstahl, kein Mord — was euch zur falschen Zeit in die Nähe der Kasse bringt.",
        alibi: "Oben im Rigging, eure Nummer beendend, als er fiel; die ganze Menge hatte die Hälse nach euch gereckt.",
        accused: "\"Wir machen alles zusammen, meine Schwester und ich — auch unschuldig sein. Wir waren vierzig Fuß in der Luft mit tausend Augen auf uns. Überbietet dieses Alibi.\"",
      },
      {
        relationship: "Der Geldmann des Jahrmarkts, der die Bücher führt.",
        secret:
          "IHR habt ihn getötet. Ihr schöpft seit Jahren die Einnahmen ab, und Vell bemerkte endlich, dass die Bücher nicht stimmen, und fragte nach dem Warum. Er bewahrte euer Geheimnis in seinem kleinen schwarzen Buch auf, also habt ihr ihn während der Schlussverbeugung niedergeschlagen und das Buch genommen, um es zu verbrennen. Ihr habt Hugos Stange gebogen und abgewischt, um den Kraftmenschen zu belasten. Spielt den milden Buchhalter. Gesteht nichts.",
        alibi: "Allein im Kassenwagen beim Zählen der Einnahmen des Abends — bequem ohne Zeugen, bequem nahe beim Buch.",
        accused: "\"Ich zähle das Geld dieses Jahrmarkts; ich vergieße nicht sein Blut. Seht auf die Stange des Kraftmenschen, auf den Fluch der Wahrsagerin — ich bin nur der Mann mit dem Hauptbuch.\"",
      },
      {
        relationship: "Der stumme Clown, der alles sieht und nichts sagt.",
        secret:
          "Ihr habt in eurem Leben noch nie ein Wort gesprochen, aber ihr saht Sloan während der Verbeugung vom Kassenwagen zum großen Zelt schleichen. Außerdem habt ihr vor Wochen eine Kleinigkeit aus Vells Tasche gestohlen und fürchtet, beschuldigt zu werden. Ihr könnt nur mimen, was ihr gesehen habt.",
        alibi: "Am Rand der Manege mimend während des Finales; die erste Reihe sah eure stumme Nummer.",
        accused: "(Pierrot spricht nicht. Er darf nur mimen — ein 'Buch' umklammern, zum Kassenwagen zeigen, einen Schlag darstellen — und den Tisch ihn lesen lassen.)",
      },
      {
        relationship: "Der Kurator des Kuriositätenzelts des Jahrmarkts.",
        secret:
          "Euer 'neues Exponat', verhängt, ist ein Körper — aber nicht Vells. Ihr seid ein Leichenräuber, der Kuriositäten zweifelhafter Herkunft verkauft, und Vell wusste es. Sein Tod droht eure düstere Nebenbeschäftigung zu enthüllen, wenn das Gesetz beginnt, Zelte zu durchsuchen.",
        alibi: "In eurem Kuriositätenzelt mit geschlossenen Planen, 'ein Exponat vorbereitend'; kein Besucher sah euch, was ja gerade der Sinn ist.",
        accused: "\"Meine Kuriositäten sind längst tot, bevor sie mich erreichen, das versichere ich. Ich sammle die Verblichenen; ich erschaffe sie nicht. Vells Leiche geht nicht auf mein Konto.\"",
      },
    ],
  },
};
