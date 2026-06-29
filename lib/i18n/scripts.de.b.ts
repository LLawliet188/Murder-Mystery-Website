import type { ScriptOverlay } from "./content-types";

// German scripts — part B (blood-and-bootleg, final-cut, keepers-light, the-ninth-seance).
export const SCRIPTS_DE_B: Record<string, ScriptOverlay> = {
  "blood-and-bootleg": {
    hostNote:
      "Der Mörder ist FRANK DOYLE, der korrupte Detective. Lucky Marinos Hauptbuch verzeichnete jedes Bestechungsgeld, das Doyle je angenommen hatte — und Lucky, von den Bundesbeamten bedrängt, war bereit, das Buch (und Doyle) gegen Immunität einzutauschen. Also schlüpfte Doyle während einer lauten Nummer hinter die Bar, vergiftete Luckys private Flasche und nahm das Hauptbuch an sich. Das verschwundene Buch zeigt direkt auf den Mann, der es am dringendsten loswerden musste.",
    intro:
      "Der Gin steht in Teetassen, die Band ist heiß, und das Gesetz wird dafür bezahlt, wegzusehen. Dann bricht die Musik mitten im Takt ab, die Saallichter gehen hässlich hell an, und Lucky Marino liegt mit dem Gesicht nach unten hinter seiner eigenen Bar — sein Hauptbuch ist mit ihm verschwunden. Jeder in diesem Laden schuldet irgendwem etwas. Heute Nacht hat jemand abgerechnet. Sucht euch ein Glas. Sucht euch ein Alibi. Die Razzia ist nicht das, wovor ihr Angst haben solltet.",
    rounds: [
      {
        name: "Erste Runde — Letzte Runde",
        narration:
          "Lucky führte das am schlechtesten gehütete Geheimnis der Stadt, und jeder hier hatte bei ihm Deckel — in Geld oder in Gefälligkeiten. Sagt uns, wer ihr seid und was Lucky für euch war.",
        instructions:
          "Jeder Spieler stellt sich und seinen Blickwinkel auf Lucky vor. Noch keine Geheimnisse — aber jeder hat eine Absicht.",
        clues: [
          "Die Kasse ist voll — ein Raub war das nicht.",
          "Luckys private Flasche vom guten Stoff steht halb eingeschenkt hinter der Bar, das Glas daneben.",
          "Sein Hauptbuch — dasjenige, in dem steht, wer wen bezahlt hat — ist verschwunden.",
        ],
      },
      {
        name: "Zweite Runde — Die Bücher",
        narration:
          "Dieses Hauptbuch war Luckys Versicherung, und jemand hat sie gerade gekündigt. Durchsucht den Laden. Jeder hier steht in diesen Büchern — außer demjenigen, der sie mitgenommen hat.",
        instructions:
          "Jeder Spieler durchsucht einen Raum auf dem Grundriss und liest dessen Hinweis vor. Dann enthüllt euer Geheimnis einem anderen Spieler unter vier Augen. Fangt an, Namen zu nennen.",
        clues: [
          "Büro: der Safe steht offen — darin lag Erpressungsmaterial, keine Banknoten.",
          "Kellerlager: eine Flasche aus dem Privatvorrat fehlt; auf der nächsten verwischt ein frischer Fingerabdruck.",
          "Luckys Glas riecht nach mehr als Gin — darunter liegt eine bittere Note.",
        ],
      },
      {
        name: "Dritte Runde — Sperrstunde",
        narration:
          "Es heißt, die Bundesbeamten sind nur noch zwei Blocks entfernt und kommen schnell. Nennt den, der den Boss vergiftet hat, bevor die Wagen vorfahren — oder seht zu, wie alle davonkommen.",
        instructions:
          "Jeder Spieler bringt seine Beschuldigung und seine Begründung vor. Stimmt gemeinsam ab, dann lest die Enthüllung.",
        clues: [
          "Lucky wollte als Kronzeuge aussagen — und das Hauptbuch gegen seine Freiheit eintauschen.",
          "Das Gift war in seiner privaten Flasche, zu der nur ein Stammgast selbstverständlich greifen würde.",
          "Jeder Name in diesem Hauptbuch hatte Grund, es verschwinden zu lassen — aber nur einer musste es vernichten.",
        ],
      },
    ],
    reveal:
      "Die Kasse war voll, also ging es nie um Geld — es ging um das Buch. Lucky Marinos Hauptbuch nannte jeden Polizisten, den er je geschmiert hatte, und mit den Bundesbeamten im Nacken war Lucky bereit, dieses Buch gegen Immunität einzutauschen. Ganz oben auf der Liste: Detective Frank Doyle, der montags Razzien fährt und freitags hier trinkt. Also beugte sich Doyle während einer heißen Nummer über die Bar, ließ etwas in Luckys private Flasche fallen und ging mit dem Hauptbuch unter dem Mantel hinaus. Der Mörder ist FRANK DOYLE — der einzige Mann im Raum, den das Gesetz nie durchsuchen würde.",
    howToRun: [
      "Gebt jedem Gast nur seinen eigenen Bogen. Doyles Bogen sagt ihm, dass er schuldig ist und das Hauptbuch besitzt.",
      "Lest die Einleitung über einer Jazzplatte, leise und rauchig. Teetassen voller 'Gin' sind willkommen.",
      "Spielt drei Runden: Erzählung, Anweisung, Hinweise. Lasst die Spieler an der Bar Abmachungen treffen.",
      "Die Räume des Grundrisses sind der Laden — lasst die Spieler sie in jeder Runde nach Hinweisen durchstöbern.",
      "Nach der Abstimmung lest die Enthüllung und lasst Doyle sich herausreden, bevor er es nicht mehr kann.",
    ],
    briefs: [
      {
        relationship: "Die rauchige Sängerin, in die Lucky vernarrt war — und die er kontrollierte.",
        secret:
          "Lucky hielt euch euren alten Namen und eure Vorstrafe vor, damit ihr weiter umsonst für ihn singt. Ihr seid froh, dass er tot ist, aber ihr wart es nicht — obwohl ihr das Bargeld aus seinem Mantel genommen habt, bevor jemand hinsah; Geld, von dem ihr sagt, er habe es euch geschuldet.",
        alibi: "Mitten im Lied auf der Bühne, als die Lichter angingen; der ganze Raum sah euch an.",
        accused: "\"Schätzchen, ich verdiene mein Geld mit meiner Stimme, nicht mit Gift. Ihm gehörte ein Stück von mir — tot gehört ihm gar nichts mehr.\"",
      },
      {
        relationship: "Der Lieferant, dessen Gin die Zapfhähne am Laufen hält.",
        secret:
          "Lucky hat euren Anteil abgeschöpft, und letzte Woche habt ihr ihm vor Zeugen gedroht. Ihr wolltet euer Geld, nicht seine Leiche — und jetzt ist euer bester Kunde kalt, und ihr seht aus wie der naheliegende Mann.",
        alibi: "Beim Entladen von Kisten in der Gasse mit zwei eurer Jungs, als es passierte; sie werden darauf schwören.",
        accused: "\"Ich verkaufe dem Mann seinen Schnaps. Man tötet die goldene Gans nicht, man melkt sie. Schlecht fürs Geschäft, so was.\"",
      },
      {
        relationship: "Der korrupte Detective, der montags Razzien macht und freitags trinkt.",
        secret:
          "IHR habt ihn getötet. Luckys Hauptbuch nennt jedes Bestechungsgeld, das ihr je genommen habt, und er wollte es — und euch — den Bundesbeamten für Immunität ausliefern. Also habt ihr während einer lauten Nummer Gift in seine private Flasche getan und das Buch genommen. Es ist gerade bei euch. Spielt den Polizisten. Bietet an zu 'ermitteln'. Gesteht nichts.",
        alibi: "'Auf Streife' draußen, als es geschah — der eine Mann, den niemand zu befragen wagt.",
        accused: "\"Ihr beschuldigt das Gesetz? Starkes Stück. Ich bin der einzige Kerl hier mit Marke und sauberem Glas. Passt lieber auf euch auf.\"",
      },
      {
        relationship: "Die Barkeeperin, die jeden Drink im Laden mixt.",
        secret:
          "Ihr habt Luckys letzten Drink gemixt, also seid ihr die offensichtliche Verdächtige — und das wisst ihr. Die Wahrheit: Ihr habt gesehen, wie Doyle hinter die Bar griff, aber ihr habt Angst, es zu sagen, weil Doyle weiß, dass IHR nebenbei Zahlenwetten laufen lasst.",
        alibi: "Die ganze Nacht hinter der Bar in aller Öffentlichkeit; ein Dutzend Trinker sah euch einschenken.",
        accused: "\"Klar, ich habe seinen Drink gemacht — genau wie euren, und ihr atmet noch. Ich schenke den Schnaps ein; ich würze ihn nicht.\"",
      },
      {
        relationship: "Tagsüber ein ehrenwerter Stadtrat, nach Einbruch der Dunkelheit Stammgast.",
        secret:
          "Lucky erpresste euch mit Fotos von euren Nächten hier — dem Inhalt dieses offenen Safes. Ihr kamt heute, um ihn auszuzahlen, und sein Tod beendet die Drohung höchst bequem, was euch sehr schuldig aussehen lässt.",
        alibi: "Allein in der hinteren Nische über einem Drink; niemand beobachtete den Stadtrat.",
        accused: "\"Ein Mann in meiner Stellung kann sich keinen Skandal leisten — am allerwenigsten einen Mord. Ich kam, um ein Problem leise zu machen, nicht endgültig.\"",
      },
      {
        relationship: "Der Pianist, der durch alles hindurchspielt.",
        secret:
          "Ihr habt genau in dem Moment aufgehört zu spielen, als Lucky fiel — weil ihr von der Bühne aus kurz zuvor eine Gestalt hinter die Bar lehnen saht. Ihr seid nicht sicher, wer es war, und ihr schuldet Luckys Leuten Geld; wenn ihr redet, malt ihr euch selbst eine Zielscheibe auf.",
        alibi: "Das ganze Set am Klavier; die Band wird euch sagen, dass ihr bis zum Ende keinen Ton ausgelassen habt.",
        accused: "\"Ich spiele, Mann, das ist alles. Meine Hände lagen die ganze Nacht auf den Tasten — fragt die Band, sie hat gesehen, wie ich geschwitzt habe.\"",
      },
    ],
  },

  "final-cut": {
    hostNote:
      "Die Mörderin ist MARLENE FROST, die Zweitbesetzung. Sie tauschte eine Platzpatrone in der Requisitenpistole der Szene gegen eine echte Kugel, sodass Chip Calloway — der auf Stichwort schoss — unwissentlich zum Werkzeug von Vivians Tod wurde. Marlene kannte jede Zeile von Vivians Rolle und begehrte sie; mit Vivian aus dem Weg gehört die Rolle ihr. Die Kreide-Todesmarke, zwei Fuß versetzt, beweist, dass Vivian nicht auf ihrer Markierung stand — sie war in die Linie einer Waffe geraten, die harmlos hätte sein sollen.",
    intro:
      "\"Ruhe am Set.\" Die Kameras laufen für die letzte Einstellung des größten Films des Jahres. Der Regisseur ruft Action, der Hauptdarsteller hebt die Requisitenpistole — und Vivian Hart sinkt wirklich zu Boden. Die Studiotüren waren für die Aufnahme verriegelt. Nur die Menschen, die sie loswerden wollten, konnten es getan haben, und jeder von ihnen steht jetzt im Licht. Licht. Kamera. Mord.",
    rounds: [
      {
        name: "Erste Runde — Action",
        narration:
          "Vivian Hart war der hellste Stern auf dem Gelände und die schwerste Frau, die man lieben konnte. Sagt uns, wer ihr bei diesem Film seid und was sie für euch war.",
        instructions: "Jeder Spieler stellt seine Rolle in der Produktion und seine Geschichte mit Vivian vor. Noch keine Geheimnisse.",
        clues: [
          "Die Türen waren für die Aufnahme verriegelt — niemand betrat oder verließ die Tonbühne.",
          "Die Kreidemarkierung, auf der Vivian hätte stehen sollen, ist zwei Fuß von der Stelle entfernt, an der sie fiel, neu abgeklebt.",
          "Die Szene verlangte, dass Chip Vivian mit der Requisitenpistole 'erschießt' — von der alle glaubten, sie enthalte Platzpatronen.",
        ],
      },
      {
        name: "Zweite Runde — Zwischen den Takes",
        narration:
          "Eine verschlossene Bühne. Eine geladene Requisite. Jemand an diesem Set hat aus Schein einen Mord gemacht. Durchsucht das Gelände — und die Menschen darauf.",
        instructions:
          "Jeder Spieler durchsucht einen Raum aus dem Grundriss und liest dessen Hinweis vor. Dann enthüllt euer Geheimnis einem anderen Spieler unter vier Augen. Die Beschuldigungen beginnen.",
        clues: [
          "Requisitenkammer: die Schachtel der Requisitenpistole ist leer — die Waffe und ihre Platzpatronen sind weg.",
          "Garderobe: Vivians Wasserglas riecht schwach bitter; das der Zweitbesetzung daneben ist unberührt.",
          "Lichtsteg: ein Scheinwerfer wurde von Hand neu ausgerichtet und hat die Folie angesengt — jemand wollte Vivian ganz genau im Licht haben.",
        ],
      },
      {
        name: "Dritte Runde — Drehschluss",
        narration:
          "Die Problemlöser des Studios sind schon auf dem Gelände und bereit, das Ganze als Unfall zu begraben. Nennt den Mörder jetzt, bevor die Geschichte umgeschrieben wird.",
        instructions: "Jeder Spieler beschuldigt jemanden und trägt seinen Fall vor. Stimmt gemeinsam ab, dann lest die Enthüllung.",
        clues: [
          "Die tödliche Patrone war echt — jemand tauschte vor der Aufnahme eine Platzpatrone gegen eine scharfe Kugel.",
          "Chip feuerte die Waffe ab, aber er tat es in dem Glauben, sie sei harmlos — er ist die Waffe, nicht die Hand.",
          "Nur jemand, der Blocking und Drehbuch kannte, konnte eine echte Kugel platzieren und Vivian in ihre Bahn lenken.",
        ],
      },
    ],
    reveal:
      "Chip Calloway zog den Abzug — aber Chip hat sie nicht getötet. Jemand tauschte eine Platzpatrone in dieser Requisitenpistole gegen eine echte Kugel und schob das Blocking so, dass Vivian in die Schusslinie trat. Jemand, der jeden Schlag der Szene kannte, jede Zeile von Vivians Rolle und ganz genau wusste, was er erben würde, wenn der Star die Aufnahme nie beendet: Marlene Frost, die Zweitbesetzung, die endlich die Rolle spielen darf. Die Mörderin ist MARLENE FROST — und Chip war nur der Abzug, den sie gewählt hat.",
    howToRun: [
      "Gebt jedem Gast nur seinen eigenen Bogen. Chips Bogen sagt ihm, dass er die Waffe in dem Glauben abfeuerte, sie sei sicher; Marlenes Bogen sagt ihr, dass sie schuldig ist.",
      "Lest die Einleitung wie ein Regisseur, der eine Szene ausruft. Eine einzelne 'Spotlight'-Lampe wirkt wunderbar.",
      "Spielt drei Runden: Erzählung, Anweisung, Hinweise — gebt die Hinweiskarten wie Tagesmuster frei.",
      "Lasst die Spieler über die 'Studio'-Räume streifen und zwischen den Runden Klatsch austauschen.",
      "Nach der Abstimmung lest die Enthüllung — und lasst Chip auf der Stelle begreifen, wofür er benutzt wurde.",
    ],
    briefs: [
      {
        relationship: "Vivians Zweitbesetzung, die jede Zeile der Rolle kennt.",
        secret:
          "IHR habt sie getötet. Ihr habt in der Requisitenpistole eine Platzpatrone gegen eine echte Kugel getauscht und Vivians Markierung leise neu abgeklebt, damit sie in den Schuss tritt. Chip zog den Abzug, ohne etwas zu ahnen. Mit Vivian fort gehören die Rolle — und das Rampenlicht — endlich euch. Trauert laut. Gesteht nichts. Die leere Requisitenschachtel ist eure einzige Gefahr.",
        alibi: "In den Schatten direkt neben dem Set, 'bereit einzuspringen, falls nötig' — worüber niemand zweimal nachdachte.",
        accused: "\"Ich verehrte Vivian — ich lernte jedes Wort, das sie je auf dieser Bühne sprach. Warum sollte ich die Rolle zerstören, in die ich immer hineinwollte?\"",
      },
      {
        relationship: "Der tyrannische Regisseur, der noch eine Aufnahme verlangte.",
        secret:
          "Ihr und Vivian wart vor Jahren Liebende, und sie hatte gedroht, dem Studio zu erzählen, dass ihr das Budget manipuliert habt, um euren nächsten eigenen Film zu finanzieren. Ihr wolltet, dass sie schweigt — aber ihr brauchtet sie lebend, um euer Meisterwerk zu beenden.",
        alibi: "Hinter der Kamera, während ihr die Einstellung ausrieft; die gesamte Crew sah euch die Szene beobachten.",
        accused: "\"Ich mache Stars, ich lösche sie nicht aus — schon gar nicht in der letzten Einstellung MEINES Films. Wissen Sie, was Nachdrehs kosten?\"",
      },
      {
        relationship: "Der Produzent, dessen Studio an diesem Film ausblutet.",
        secret:
          "Der Film ist maßlos über dem Budget, und Vivians Vertrag versprach ihr bei Fertigstellung ein Vermögen — ein Vermögen, das das Studio nicht zahlen kann. Ihr Tod gleicht grausam die Bücher aus, was euch wie einen Mann mit einem Motiv aus Geld aussehen lässt.",
        alibi: "Im Produktionsbüro am Telefon mit der Bank; die Vermittlung hat den Anruf protokolliert.",
        accused: "\"Ein toter Star ist ein Publicity-Gewinn und eine Klage, die nur darauf wartet. Ich handele mit Zahlen, Freund, nicht mit Kugeln.\"",
      },
      {
        relationship: "Der Hauptdarsteller — Vivians Co-Star und früherer Liebhaber.",
        secret:
          "IHR habt die Requisitenpistole abgefeuert — aber ihr glaubtet, wie alle, dass sie eine Platzpatrone enthielt. Ihr wisst noch nicht, dass man euch benutzt hat. Euer echtes Geheimnis: Vivian hatte euch gerade für einen Rivalen im Studio verlassen, und der halbe Studioplatz hörte den Streit, was den Mann mit dem Abzug sehr schuldig aussehen lässt.",
        alibi: "Im Bild stehend, die Waffe in der Hand — die sichtbarste Person am Set und die verdammteste.",
        accused: "\"Ich habe eine Requisite abgefeuert! Eine Platzpatrone! Wir haben diese Szene hundertmal gedreht — ich würde niemals... Gott, war ich es? Nein. Nein, jemand hat mir das ANGETAN.\"",
      },
      {
        relationship: "Die Klatschkolumnistin, die jede Karriere beenden kann.",
        secret:
          "Ihr wart kurz davor, eine Geschichte zu drucken, die Vivian zerstört hätte — und sie hatte gedroht aufzudecken, dass eure 'Quellen' erfunden sind. Ihr Tod tötet zugleich eure Exklusivgeschichte und euer Problem, was ein Motiv aus Zeitungspapier ergibt.",
        alibi: "Auf der Galerie beim Notizenmachen; ein Publicity-Mann stand während der ganzen Aufnahme neben euch.",
        accused: "\"Liebling, ich ruiniere Menschen mit der Schreibmaschine — das hält so viel länger als eine Pistole. Warum sollte ich einen tadellosen Skandal verschwenden?\"",
      },
    ],
  },

  "keepers-light": {
    hostNote:
      "Die Mörderin ist MARGARET VANE, die Frau des Leuchtturmwärters. Ezra Vane war ein Strandräuber — er hatte in Sturmnächten das große Licht gedimmt, um Schiffe auf die Felsen zu locken und zu plündern. Margaret entdeckte, dass er mit dem geborgenen Gold fliehen und sie zurücklassen wollte, damit sie sich für die Ertrunkenen vor dem Gesetz verantwortet. Sie stieg zum Laternenraum hinauf (Eli sah sie auf der Treppe), als Ezra gerade ins Logbuch schrieb, stellte ihn zur Rede, und im Gerangel stürzte er über das Geländer in die See — deshalb ist der Wärter 'fort' und der Stuhl leer. Das Logbuch bricht mitten im Wort ab, wo sie ihn unterbrach; das Seil im Öllager wurde von ihrer Hand zerschnitten.",
    intro:
      "Das Versorgungsschiff kommt eine Woche lang nicht, und das Meer ist zu Eisen geworden. Hoch oben im Laternenraum bricht das Logbuch des Wärters mitten in einem Wort ab — und Ezra Vane ist verschwunden, das große Licht dreht sich weiter über einem leeren Stuhl. Vier Seelen bleiben auf diesem Felsen, und der Sturm hat euch zusammen eingeschlossen. Einer von euch stoppte seine Feder. Es gibt keinen Fluchtweg außer dem Meer. Achtet auf die Treppe. Achtet aufeinander.",
    rounds: [
      {
        name: "Erste Runde — Vier Seelen auf dem Felsen",
        narration:
          "Der Wärter ist verschwunden, und das Boot kehrt nicht zurück. Sagt uns, wer ihr seid, warum ihr heute Nacht auf diesem Leuchtturm seid und was Ezra Vane für euch war.",
        instructions: "Jeder Spieler stellt seine Figur und den Grund vor, aus dem sie auf dem Felsen ist. Behaltet euer Geheimnis fürs Erste.",
        clues: [
          "Das Logbuch des Wärters endet mitten im Wort; die Feder ist zur seewärtigen Seite des Tisches gerollt.",
          "In den Quartieren wurden zwei Tassen Tee aufgebrüht — eine leer, eine steinkalt und voll.",
          "Ezra ist nirgends auf dem Felsen; die Laterne dreht sich weiter über seinem leeren Stuhl.",
        ],
      },
      {
        name: "Zweite Runde — Was das Licht sah",
        narration:
          "Dieser Leuchtturm hat nur wenige Räume, und der Sturm hat jeden von euch darin eingeschlossen. Durchsucht den Felsen. Das Licht hat etwas verborgen — und der Wärter auch.",
        instructions:
          "Jeder Spieler durchsucht einen Raum aus dem Grundriss und liest dessen Hinweis vor. Dann enthüllt euer Geheimnis einem anderen Spieler unter vier Augen. Der Verdacht darf beginnen.",
        clues: [
          "Öllager: eine Rolle Seil ist glatt durchtrennt — nicht ausgefranst, sondern geschnitten. Heute Nacht war eine Klinge hier.",
          "Landesteg: Stiefelspuren im Salz führen bis zur Wasserkante und hören einfach auf.",
          "Eli, der nicht sprechen kann, mimt immer wieder dasselbe: jemanden, der die Treppe hinaufsteigt.",
        ],
      },
      {
        name: "Dritte Runde — Das drehende Licht",
        narration:
          "Der Sturm lässt nach, und beim ersten Licht wird ein Ablöseboot um die Landzunge kommen. Bevor es das tut, nennt die Seele, die die Feder des Wärters stoppte.",
        instructions: "Jeder Spieler beschuldigt und trägt seinen Fall vor. Stimmt gemeinsam ab, dann lest die Enthüllung.",
        clues: [
          "Die Bergungsgüter im Öllager sind Beute — Ezra hatte Schiffe mit dem gedimmten Licht auf die Felsen gelockt.",
          "Die letzten Zeilen des Logbuchs waren ein Frachtverzeichnis, kein Wetterbericht — eine Liste gestohlener Waren.",
          "Wer die Treppe hinaufstieg, erreichte das Galeriegeländer genau in dem Moment, als Ezra sein Geständnis schrieb.",
        ],
      },
    ],
    reveal:
      "Der Wärter führte ein dunkleres Logbuch als das Wetter. Ezra Vane war ein Strandräuber — er dimmte in Sturmnächten das große Licht, um Schiffe auf die Felsen zu ziehen und ihrer Ladung zu berauben. Die Bergungsgüter im Öllager waren Beute; das Verzeichnis in seinem Logbuch war eine Liste gestohlener Waren. Und er wollte mit dem Gold davonrudern und seine Frau zurücklassen, damit sie für jeden ertrunkenen Seemann einsteht. Margaret Vane stieg die Treppe hinauf — Eli sah sie — und als Ezra sich über das Buch beugte, stellte sie ihn am Galeriegeländer zur Rede. Er stürzte in die eiserne See. Die Mörderin ist MARGARET VANE; die Feder des Wärters stoppte mitten im Wort, weil sie bereits auf der Treppe war.",
    howToRun: [
      "Dieser Fall spielt sich wunderbar zu dritt — gebt jedem Gast nur seinen eigenen Bogen. Margarets Bogen sagt ihr, dass sie schuldig ist; Elis Spieler muss schweigen (Eli kann nicht sprechen) und darf nur pantomimisch handeln.",
      "Lest die Einleitung bei einer einzelnen Kerze oder Laterne. Wind und Brandung aus einem Lautsprecher erledigen die halbe Arbeit.",
      "Spielt drei Runden: Erzählung, Anweisung, Hinweise. Der ganze 'Felsen' besteht nur aus wenigen Räumen — lasst sie angespannt durchsucht werden.",
      "Betont die Isolation: Es gibt kein Entkommen und keine Hilfe, was jede Beschuldigung zählen lässt.",
      "Nach der Abstimmung lest die Enthüllung und lasst Margaret gestehen — und lasst Eli endlich nicken.",
    ],
    briefs: [
      {
        relationship: "Der Ablösewärter, angekommen mit dem letzten Boot vor dem Sturm.",
        secret:
          "Ihr seid gar kein Wärter — ihr seid ein Versicherungsermittler, verdeckt geschickt, weil in zwei Jahren drei Schiffe an diesem Felsen gescheitert sind. Ihr verdächtigtet Ezra der Strandräuberei und brauchtet ihn LEBEND, damit er aussagt. Sein Tod hat euch euren Fall gekostet, und eure Tarnung macht euch zum bequemen Neuankömmling.",
        alibi: "Unten im Maschinenraum, den schwächelnden Generator pflegend; der Lärm überdeckte alles, und niemand sah euch.",
        accused: "\"Ich kam mit dem letzten Boot, ja — um einen Strandräuber zu fangen, nicht um ihn zu töten. Ein Toter kann nicht aussagen, und ein Toter nützte mir gar nichts.\"",
      },
      {
        relationship: "Die Frau des Wärters, die den Rhythmus des Lichts kennt.",
        secret:
          "IHR habt ihn getötet. Ezra war ein Strandräuber, und ihr fandet sein Gold und seinen Plan, davonzurudern und euch für die Ertrunkenen hängen zu lassen. Ihr stiegt in den Laternenraum hinauf, während er ins Logbuch schrieb, und am Galeriegeländer ging er in die See. Ihr habt das Sicherheitsseil im Öllager zerschnitten. Eli sah euch auf der Treppe, aber Eli kann nicht sprechen. Spielt die trauernde Ehefrau. Gesteht nichts.",
        alibi: "In den Quartieren beim Teekochen — ihr werdet sagen, ihr seid nie weggegangen, auch wenn nur die kalte, volle zweite Tasse dagegen sprechen kann.",
        accused: "\"Ich habe dieses Licht zwanzig Jahre neben ihm gepflegt. Glaubt ihr, diese Hände, die jeden Atemzug von ihm kannten, würden ihn dem Meer übergeben?\"",
      },
      {
        relationship: "Der stumme Versorgungsjunge, der ungesehen die Treppen erklimmt.",
        secret:
          "Ihr könnt nicht sprechen — und ihr habt Margaret kurz bevor das Licht stockte zum Laternenraum hinaufsteigen sehen. Außerdem habt ihr eine einzelne Goldmünze aus dem Wrack gefunden und versteckt, aus Angst, man würde euch die Beute anlasten. Ihr könnt nur mimisch zeigen, was ihr wisst.",
        alibi: "Schlafend im Öllager zwischen den Vorräten; ihr wachtet von Schritten auf der eisernen Treppe auf.",
        accused: "(Eli kann nicht mit Worten antworten. Er darf nur zeigen, den Kopf schütteln und Treppensteigen mimen — lasst den Tisch es deuten.)",
      },
      {
        relationship: "Ein Schiffbrüchiger, der einzige Überlebende eines Wracks an genau diesen Felsen.",
        secret:
          "Ihr seid kein Reverend — ihr seid der einzige Mann, der das letzte Schiff überlebt hat, das Ezra auf die Felsen lockte, halb ertrunken angeschwemmt mit Beweisen seines Verbrechens in euren Mantel eingenäht. Ihr kamt, um ihn zu entlarven, nicht um ihn zu töten; sein Tod beraubt euch der Gerechtigkeit, für die ihr das Meer überquert habt.",
        alibi: "Früher im Laternenraum betend, später unten, als der Sturm zunahm; eure Stunden sind schwer zu erklären, und genau das verdammt euch.",
        accused: "\"Ich überlebte seine Strandräuberei, um ihn vor Gericht dafür zahlen zu sehen. Ich wollte ihn gerichtet, nicht ertränkt — Ertrinken war für Ezra Vane immer zu gnädig.\"",
      },
    ],
  },

  "the-ninth-seance": {
    hostNote:
      "Der Mörder ist CORNELIUS ASHE, der trauernde Witwer. Madame Seraphine — die ihre Séancen mit Tobias' Drähten und Glöckchen vortäuscht — hatte Ashe mit 'Botschaften seiner toten Frau' gefüttert, damit er weiter zahlte. Heute Nacht ging eine Botschaft zu weit: Sie offenbarte (ausnahmsweise wahrheitsgemäß), dass Lord Wexley der heimliche Liebhaber seiner Frau gewesen war und sie in den Tod getrieben hatte. Im Dunkel der Séance, während angeblich alle Hände verbunden waren, löste Ashe sich (der Klopftrick mit dem Draht gab ihm Deckung) und erstach Wexley am Kopfende des Tisches. Der 'neunte Stuhl, noch warm' ist der Platz, den Ashe verließ und wieder einnahm.",
    intro:
      "Acht haben sich in Madame Seraphines Samtparlour versammelt, um jenseits des Schleiers zu greifen — doch die Stühle waren für neun gedeckt. Die Kerzen flackern, die Planchette beginnt zu gleiten, und der Kreis bricht mit einem einzigen Schrei. Als die Lampen entzündet werden, sitzt Lord Wexley kalt am Kopfende des Tisches, und der neunte Stuhl ist noch warm. Die Toten wurden heute Nacht gerufen. Einer von ihnen antwortete mit einem Messer. Reicht euch die Hände. Traut niemandem — nicht einmal den Geistern.",
    rounds: [
      {
        name: "Erste Runde — Der Kreis",
        narration:
          "Ihr kamt, um mit den Toten zu sprechen, und die Toten haben einen der Lebenden genommen. Sagt uns, wer ihr seid, warum ihr heute Nacht den Schleier suchtet und was Lord Wexley für euch war.",
        instructions: "Jeder Spieler stellt seine Figur und die Trauer oder Kränkung vor, die ihn herbrachte. Haltet euer Geheimnis verborgen.",
        clues: [
          "Neun Stühle standen für acht Teilnehmer bereit — der neunte Stuhl ist noch warm.",
          "Die Planchette erstarrte mitten im Gleiten und zeigte auf einen einzigen Namen, den niemand laut aussprechen will.",
          "Wexley wurde im Dunkeln getroffen, während angeblich jede Hand am Tisch gehalten wurde.",
        ],
      },
      {
        name: "Zweite Runde — Botschaften von jenseits",
        narration:
          "Die Geister in diesem Haus sprechen durch Drähte und Flüstern — und heute Nacht nannte ein Flüstern einen Mörder, bevor der Mord geschah. Durchsucht das Parlour. Findet den Trick und die Wahrheit darunter.",
        instructions:
          "Jeder Spieler durchsucht einen Raum aus dem Grundriss und liest dessen Hinweis vor. Dann enthüllt euer Geheimnis einem anderen Spieler unter vier Augen. Beschuldigungen dürfen beginnen.",
        clues: [
          "Dienstbotengang: ein Stück Draht und ein Glöckchen — das Geheimnis hinter dem 'Klopfgeist'.",
          "Vorzimmer: ein Falltürscharnier, frisch geölt. Geister brauchen keine Türen.",
          "Verschlossenes Arbeitszimmer: Wexleys eigener Brief, der einen Gast als den betrogenen Ehemann seiner heimlichen Geliebten nennt, halb ins Feuer geschoben.",
        ],
      },
      {
        name: "Dritte Runde — Der Schleier hebt sich",
        narration:
          "Der Morgen graut an den Fenstern des Parlours, und der Zauber der Nacht bricht. Bevor die Geister vor dem Licht fliehen, nennt die Hand, die das Messer hielt.",
        instructions: "Jeder Spieler beschuldigt und argumentiert. Stimmt gemeinsam ab, dann lest die Enthüllung.",
        clues: [
          "Seraphines Séance ist Betrug, von Tobias manipuliert — das heißt, eine Hand konnte den Kreis ungesehen verlassen.",
          "Die heutige 'Botschaft' enthüllte wahrheitsgemäß, dass Wexley eine Frau in den Tod getrieben hatte.",
          "Der warme neunte Stuhl gehörte dem Teilnehmer, der ihn im Dunkeln verließ — und zurückkehrte.",
        ],
      },
    ],
    reveal:
      "Die Séance war Betrug — Seraphines Geister waren Tobias' Drähte und Glöckchen — und genau dadurch konnte eine Hand den Kreis ungesehen verlassen. Seit Monaten fütterte Seraphine Cornelius Ashe mit falschen Botschaften seiner toten Frau, um ihn zahlen zu lassen. Doch heute Nacht war die Botschaft ausnahmsweise wahr: Lord Wexley war der heimliche Liebhaber der Ehefrau gewesen, und seine Grausamkeit hatte sie in den Tod getrieben. Im Dunkeln, während der Klopftrick das Geräusch deckte, glitt Ashe von seinem Stuhl, ging zum Kopfende des Tisches und antwortete den Geistern mit einem Messer. Der Mörder ist CORNELIUS ASHE — und der neunte Stuhl war warm, weil er sich gerade erst wieder gesetzt hatte.",
    howToRun: [
      "Gebt jedem Gast nur seinen eigenen Bogen. Ashes Bogen nennt ihn als Mörder; Seraphines und Tobias' Bögen enthüllen, dass die Séance manipuliert ist.",
      "Lest die Einleitung bei Kerzenlicht um einen echten Tisch, die Hände verbunden — dann 'brecht den Kreis' mit einem Schrei als Signal.",
      "Spielt drei Runden: Erzählung, Anweisung, Hinweise. Eine Planchette oder ein Geisterbrett ist eine wunderbare Requisite.",
      "Lasst die Spieler in 'Séance'-Momenten Hände halten, damit die Frage, wer sich bewegt haben kann, wirklich spürbar wird.",
      "Nach der Abstimmung lest die Enthüllung und lasst Ashe seine Trauer und sein Verbrechen in einem Atemzug gestehen.",
    ],
    briefs: [
      {
        relationship: "Das Medium, das Wexley bezahlte, um die andere Seite zu erreichen.",
        secret:
          "Eure Séancen sind Theater — Tobias bedient die Drähte, während ihr den Raum lest. Ihr habt Cornelius Ashe mit falschen Botschaften seiner toten Frau ausgeblutet. Ihr habt Wexley nicht getötet, aber ihr fürchtet, dass die Enthüllung eures Betrugs euch als Schwindlerin entlarvt.",
        alibi: "Am Kopf des Kreises in 'Trance' sitzend; die Teilnehmer hielten eure Hände — oder glaubten es.",
        accused: "\"Ich bin ein Gefäß für die Verstorbenen, keine Schlächterin. Die Geister zeigen mir den Tod; sie bitten mich nicht, ihn auszuteilen.\"",
      },
      {
        relationship: "Ein trauernder Witwer, der ein letztes Wort mit seiner Frau sucht.",
        secret:
          "IHR habt ihn getötet. Seraphines 'Botschaften' sagten endlich die Wahrheit: Lord Wexley war der heimliche Liebhaber eurer verstorbenen Frau, und seine Grausamkeit trieb sie in den Tod. Im Dunkel der Séance, während der Klopftrick das Geräusch verdeckte, verließet ihr den Kreis, gingt zu Wexley und benutztet das Messer. Ihr kehrtet zurück, bevor die Lampen angingen — euer Stuhl ist der warme neunte. Weint um eure Frau. Gesteht nichts.",
        alibi: "Die ganze Zeit 'händehaltend' im Kreis — obwohl der Sitznachbar neben euch im Dunkeln das nicht wirklich beschwören kann.",
        accused: "\"Ich kam hierher, um die Stimme meiner Frau ein letztes Mal zu hören. Sagen Sie mir nicht, ich hätte den Schleier überschritten, um eine andere Seele hindurchzuschicken.\"",
      },
      {
        relationship: "Eine Skeptikerin, die Seraphine als Betrügerin entlarven wollte.",
        secret:
          "Ihr kamt, um das Medium bloßzustellen und ihre Tricks zu entlarven — und ihr hattet den Draht im Dienstbotengang schon vor dem Mord gefunden. Ihr schwiegt, weil Wexley, den ihr für den Ruin eures Bruders verachtetet, euch eingeladen hatte, und ihr nicht wollt, dass euer Groll für ein Motiv gehalten wird.",
        alibi: "Im Kreis sitzend und sorgfältige Notizen machend; die Frau neben euch bestätigt, dass ihr nie aufstandet.",
        accused: "\"Ich kam, um eine Scharlatanin zu entlarven, nicht um ein Verbrechen zu begehen, das ihre Geister echt erscheinen lässt. Meine Waffe ist Zweifel, kein Dolch.\"",
      },
      {
        relationship: "Ein Mann der Wissenschaft, entschlossen, die Geister zu widerlegen.",
        secret:
          "Ihr habt eure Karriere darauf gebaut, Medien zu entlarven — doch eure eigenen Wege im Dunkeln könnt ihr nicht erklären, weil ihr hinausgeschlüpft seid, um die Falltür zu untersuchen, und euren Platz im Kreis verloren habt. Eure fehlende Minute macht euer rationales Alibi wertlos.",
        alibi: "'Im Kreis' — aber für eine dunkle Minute wart ihr an der Tür zum Vorzimmer, und niemand kann für euch bürgen.",
        accused: "\"Ich widerlege Geister; ich fabriziere keine Leichen. Dass mein Alibi unvollkommen ist, beweist nur, dass ich ermittelte, nicht tötete.\"",
      },
      {
        relationship: "Seraphines Assistent, der Drähte und Rauch bedient.",
        secret:
          "Ihr manipuliert jede Séance — die Glöckchen, das Klopfen, die kalten Luftzüge — und heute Nacht zogt ihr den Draht, der dem Mörder Deckung gab, ohne zu wissen, dass ein Mord folgen würde. Ihr seid Gehilfe des Betrugs und fürchtet, man werde euch den Tod anlasten, den ihr unwissentlich abgeschirmt habt.",
        alibi: "Im Dienstbotengang bei den Effekten; das ist eure Arbeit und zugleich ein Ort, an dem euch niemand bestätigen kann.",
        accused: "\"Ich lasse die Glöckchen läuten und die Vorhänge atmen — Salontricks, nicht mehr. Ich decke einen Schwindel, Sir, keinen Messerstich.\"",
      },
      {
        relationship: "Ein ungeladener Teilnehmer, an dessen Einlass sich niemand erinnert.",
        secret:
          "Ihr seid Wexleys entfremdete Tochter, heimlich gekommen, um den Vater zur Rede zu stellen, der euch verstoßen hat. Ihr seid unbemerkt hineingeschlüpft und habt den leeren neunten Stuhl genommen — was bedeutet, dass der Hinweis mit dem 'warmen Stuhl' auf euch zeigt, obwohl ihr ihn nie angerührt habt.",
        alibi: "Auf dem neunten Stuhl, an den sich niemand erinnert, euch angeboten zu haben — das schlechteste Alibi im Raum.",
        accused: "\"Niemand erinnert sich, mich hereingelassen zu haben, weil mich nie jemand wirklich sah — das war immer Vaters Gabe. Ich kam, damit er mich sieht, nicht damit er schweigt.\"",
      },
    ],
  },
};
