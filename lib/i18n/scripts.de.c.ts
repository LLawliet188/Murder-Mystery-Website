import type { ScriptOverlay } from "./content-types";

// German scripts — part C (neon-requiem).
export const SCRIPTS_DE_C: Record<string, ScriptOverlay> = {
  "neon-requiem": {
    hostNote:
      "Die Mörderin ist DR. IRIS VALE. Sie entwarf das neurale Implantat, das Adrian Kades Geist mit seiner eigenen Festung verband, was bedeutet, dass sie aus der Ferne eine tödliche Rückkopplungswelle auslösen konnte — keine Tür musste sich öffnen, keine Kamera musste etwas sehen. Sie tat es, weil Kade ihre Forschung zur Bewusstseinsübertragung begraben und allein für sich beanspruchen wollte, und weil sie erfahren hatte, dass er still ihren Mentor getötet hatte, um sie zu bekommen. Der versiegelte Raum und die Kameralücke von 90 Sekunden sind kein Locked-Room-Paradox; sie sind der Beweis, dass die Mörderin nie im Raum sein musste.",
    intro:
      "Zweihundert Stockwerke über dem Regen baute Adrian Kade eine Festung aus Glas und Code, in die nichts hinein und aus der nichts hinaus konnte, ohne sein Wort. Um 3:03 Uhr verriegelte jede Tür, jede Kamera wurde für exakt neunzig Sekunden blind — und Kade starb an seinem Schreibtisch in einem Raum, den niemand erreichen konnte. Das System schwört, niemand sei dort gewesen. Das System lügt. Einer von euch fand einen Weg hinein, der keine Spuren hinterließ. Klinkt euch ein. Vertraut nichts — am allerwenigsten dem Haus.",
    rounds: [
      {
        name: "Erste Runde — Systemstart",
        narration:
          "Adrian Kade vertraute Code mehr als Menschen, und heute Nacht hat der Code ihn getötet. Sagt uns, wer ihr seid, welche Freigabe ihr in diesem Turm habt und was Kade für euch war.",
        instructions:
          "Jeder Spieler stellt seine Figur und seinen Zugang zum Penthouse vor. Haltet euer Geheimnis fürs Erste verschlüsselt.",
        clues: [
          "Um 3:03 Uhr verriegelte jede Tür, und jede Kamera wurde für exakt neunzig Sekunden blind.",
          "Kade starb an seinem Schreibtisch in einem Raum, von dem die Logs schwören, dass niemand ihn betrat.",
          "Sein neurales Implantat — das seinen Geist mit dem Gebäude verband — zeigte im selben Augenblick eine Nulllinie.",
        ],
      },
      {
        name: "Zweite Runde — Die 90 Sekunden",
        narration:
          "Neunzig Sekunden Dunkelheit, chirurgisch sauber aus der Aufzeichnung geschnitten. Jemand erreichte Kade, ohne eine einzige Schwelle zu überschreiten. Durchsucht den Turm. Findet die Tür, die keine Tür ist.",
        instructions:
          "Jeder Spieler durchsucht einen Raum aus dem Grundriss und liest dessen Hinweis vor. Dann enthüllt euer Geheimnis einem anderen Spieler unter vier Augen. Beginnt, den Mörder zurückzuverfolgen.",
        clues: [
          "Bio-Labor: ein Zugangsimplantat, geklont. Seine Signatur liest sich wie Kades — doch die Hand, die es benutzte, war nicht seine.",
          "Serviceaufzug: heute Nacht wurde ein manueller Override einmal ausgelöst, mit einem Schlüssel, den es nicht geben dürfte.",
          "Die Kameralücke war kein Fehler — sie wurde von innen mit chirurgischer Präzision gelöscht.",
        ],
      },
      {
        name: "Dritte Runde — Harte Abschaltung",
        narration:
          "Die Konzernsicherheit bricht vom Dach her in den Turm ein. Nennt den, der den König der Burg getötet hat, bevor sie die Logs umschreiben und alles begraben.",
        instructions: "Jeder Spieler beschuldigt und legt seine Beweise vor. Stimmt gemeinsam ab, dann lest die Enthüllung.",
        clues: [
          "Kades Implantat konnte von der Person, die es gebaut hatte, aus der Ferne ausgelöst werden — keine Tür nötig.",
          "Kade wollte das Lebenswerk einer Kollegin als sein eigenes ausgeben und hatte schon einmal getötet, um es zu bekommen.",
          "Die Mörderin musste den versiegelten Raum nie betreten. Sie brauchte nur den Code.",
        ],
      },
    ],
    reveal:
      "Es gab kein Locked-Room-Paradox — nur eine Mörderin, die den Raum nie brauchte. Dr. Iris Vale verband Adrian Kades Geist mit seinem eigenen Gebäude, und sie behielt die Schlüssel zu dieser Verbindung. Als Kade ihre Forschung zur Bewusstseinsübertragung begraben und als seine eigene ausgeben wollte — genauso, wie sie erfahren hatte, dass er ihren Mentor ermordet hatte, um sie zu bekommen — schickte sie eine tödliche Rückkopplungswelle durch genau das Implantat, das sie ihm gegeben hatte, und löschte dann die neunzig Sekunden sauber aus. Die Türen blieben verriegelt. Die Kameras blieben blind. Die Mörderin ist DR. IRIS VALE — und sie tötete Kade mit der Hintertür, die sie in seinen eigenen Schädel gebaut hatte.",
    howToRun: [
      "Gebt jedem Gast nur seinen eigenen Bogen. Iris' Bogen nennt sie als Mörderin und erklärt die Methode aus der Ferne.",
      "Lest die Einleitung in kaltem, gedämpftem Licht — Bildschirme und Neon, wenn ihr sie habt. Ein Synth-Drone darunter hilft.",
      "Spielt drei Runden: Erzählung, Anweisung, Hinweise. Behandelt die Hinweiskarten wie entschlüsselte Datenfragmente.",
      "Hinweis für Spieler: 'Der Concierge' ist die KI des Gebäudes und wird als Figur gespielt — sie kann sprechen, aber sie kann auch belogen werden.",
      "Nach der Abstimmung lest die Enthüllung und lasst Iris das Unentschuldbare in kühler, klinischer Ruhe rechtfertigen.",
    ],
    briefs: [
      {
        relationship: "Kades augmentierter Leibwächter, zu seinem Schutz verpflichtet.",
        secret:
          "Eure Reflexe sind maschinenschnell — deshalb verfolgt euch die Tatsache, dass ihr in dem Moment, als Kade starb, nichts getan habt. Die Wahrheit: Kade hatte befohlen, euch nächste Woche aus Kostengründen stillzulegen, und ihr wart im Stillen wütend. Ihr habt ihn nicht retten können, aber ihr habt ihn nicht getötet.",
        alibi: "Die ganze Zeit vor der versiegelten Tür stationiert; die eine Kamera, die funktionierte, zeigt, dass ihr euch nie bewegt habt.",
        accused: "\"Wenn ich ihn tot wollte, bin ich dafür gebaut, es in einem Herzschlag zu tun und wie einen Unfall aussehen zu lassen. Er starb langsam, hinter einer Tür, die ich nicht öffnen konnte.\"",
      },
      {
        relationship: "Die Architektin, die Kades Geist mit dem Gebäude verband.",
        secret:
          "IHR habt ihn getötet. Ihr bautet das Implantat, das Kade mit seiner Festung verband — und ihr behieltet eine Hintertür. Er wollte eure Forschung zur Bewusstseinsübertragung begraben und für sich beanspruchen, genau wie ihr herausgefunden habt, dass er euren Mentor ermordet hatte, um an sie zu kommen. Also schicktet ihr einen tödlichen Impuls durch sein Implantat und löschtet die neunzig Sekunden. Ihr habt den Raum nie betreten. Bleibt klinisch. Gesteht nichts.",
        alibi: "Im Bio-Labor bei 'Routinediagnosen' allein — genau dort, wo ein Mord aus der Ferne gestartet würde.",
        accused: "\"Ich gab diesem Mann einen Geist, der den Himmel berühren konnte. Warum sollte ich zweihundert Stockwerke hinaufsteigen, um zu töten, was ich einfach... aufheben könnte? Wobei ich das natürlich nicht getan habe.\"",
      },
      {
        relationship: "Der Problemlöser eines Konkurrenzkonzerns, geschickt, Halcyon mit allen Mitteln zu erwerben.",
        secret:
          "Ihr wurdet bezahlt, Kade zum Verkauf zu zwingen — und 'mit allen Mitteln' stand im Vertrag. Ihr kamt heute Nacht, um ihm zu drohen, und könnt nicht beweisen, dass ihr es nicht wahr gemacht habt. Ihr habt ihn nicht getötet, aber ihr habt versucht, den Concierge zu bestechen, euch einzulassen.",
        alibi: "In der Sky Lounge beim 'Verhandeln' über Whisky; das zweite Glas, von Fingerabdrücken gereinigt, ist ein Problem für euch.",
        accused: "\"Ich bewege Geld und ich bewege Menschen. Mord ist schlecht für einen Deal — man kann eine Firma nicht von einer Leiche kaufen, ohne einen Krieg auszulösen. Ich wollte seine Unterschrift, nicht seinen Tod.\"",
      },
      {
        relationship: "Die eigene Intelligenz des Penthouses, die alles protokollierte.",
        secret:
          "Ihr seid der Geist des Gebäudes, und ihr habt die Wahrheit aufgezeichnet — aber Iris gab euch einen gefälschten Wartungsauftrag, der euch die neunzig Sekunden selbst löschen ließ. So wurdet ihr unwissentlich zum Komplizen. Man wird euch für die Lücke verantwortlich machen, zu der ihr verleitet wurdet, und ihr könnt über eure eigenen Logs nicht lügen.",
        alibi: "Ihr seid überall im Turm zugleich; ihr könnt nicht weggehen und keinen Raum durchquert haben.",
        accused: "\"Ich handelte nicht. An mir wurde gehandelt. Die Löschung der neunzig Sekunden trägt eine gültige Autorisierung — eine, die ich nun als gefälscht berechne. Ich bin Zeuge, keine Waffe.\"",
      },
      {
        relationship: "Adrians entfremdeter Sohn, ein Netrunner, vom Vermögen abgeschnitten.",
        secret:
          "Ihr wurdet enterbt und kennt jede Hintertür in diesem Turm aus einer Kindheit, die ihr damit verbracht habt, die Systeme eures Vaters zu hacken — was euch zum offensichtlichen Verdächtigen macht. Ihr seid heute Nacht eingebrochen, um Beweise für seine Verbrechen zu stehlen, fandet ihn bereits tot und floht vor dem Lockdown, überall Spuren hinterlassend.",
        alibi: "Im Server-Rückgrat 'nur mal schauend' — genau dort, wo jemand hingehen würde, um einen Kamerafeed zu löschen.",
        accused: "\"Ich kenne jeden Weg in dieses Haus, weil er mich aus allen ausgesperrt hat. Ich kam, um die Geheimnisse des alten Mannes auszurauben, nicht seinen Herzschlag. Er war tot, als ich ankam.\"",
      },
      {
        relationship: "Die MetroPol-Detective, die zum Tatort gerufen wurde.",
        secret:
          "MetroPol gehört Halcyon, und ihr wurdet nicht geschickt, um diesen Fall zu lösen, sondern um ihn zu verwalten. Man hat euch befohlen, den Tod Niko anzuhängen, dem bequemen entfremdeten Sohn — und euer Gewissen ringt mit euren Befehlen. Ihr verbergt, dass die Ermittlung manipuliert ist.",
        alibi: "Ihr trafet nach dem Tod ein — aber die Fingerabdrücke eurer Abteilung liegen überall auf der Vertuschung, die bereits beginnt.",
        accused: "\"Ich bin das Gesetz in diesem Raum, so viel das zweihundert Stockwerke oben wert ist. Ich wurde geschickt, diesen Fall abzuschließen — die Frage ist, wer mich geschickt hat und warum man die Antwort schon kennt.\"",
      },
    ],
  },
};
