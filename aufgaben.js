/* =========================================================
   aufgaben.js – alle Levels und Aufgaben der App
   ---------------------------------------------------------
   Diese Datei können Lehrkräfte bearbeiten, ohne zu programmieren.

   So ist ein Level aufgebaut:
   {
     nummer: 1,                       ← Reihenfolge (1, 2, 3 …)
     titel: "Was ist KI?",            ← Überschrift auf der Startseite
     beschreibung: "…",               ← ein kurzer Satz darunter
     symbol: "🤖",                    ← ein Emoji für die Karte
     abzeichen: "KI-Entdecker:in",    ← Name des Abzeichens
     infos: [ … ],                    ← Erklär-Karten vor den Aufgaben (darf fehlen)
     aufgaben: [ … ]                  ← die Aufgaben
   },

   So ist eine Erklär-Karte aufgebaut:
   {
     titel: "Was ist KI?",
     text: "Kurze Sätze. Einfache Wörter.",
     liste: [                         ← darf fehlen: Aufzählung unter dem Text
       "Erster Punkt",
       "Zweiter Punkt"
     ]
   },

   So ist eine Quiz-Aufgabe aufgebaut:
   {
     typ: "quiz",
     frage: "Die Frage?",
     antworten: [
       "Antwort 1",
       "Antwort 2",
       "Antwort 3",
       "Antwort 4"
     ],
     richtig: 2,                      ← die NUMMER der richtigen Antwort (hier: Antwort 2)
     erklaerung: "Warum das so ist."  ← erscheint nach dem Antworten
   },

   So ist eine Vergleichs-Aufgabe aufgebaut (zwei Anfragen an die KI):
   {
     typ: "vergleich",
     situation: "Was will man erreichen?",
     anfrageA: "Erste Anfrage an die KI",
     anfrageB: "Zweite Anfrage an die KI",
     besser: "B",                     ← "A" oder "B"
     ergebnisA: "So hätte die KI auf A geantwortet.",   ← darf fehlen
     ergebnisB: "So hätte die KI auf B geantwortet.",   ← darf fehlen
     erklaerung: "Warum B besser ist."
   },

   WICHTIG beim Bearbeiten:
   • Texte stehen immer zwischen "Anführungszeichen".
   • Nach jedem Eintrag steht ein Komma.
   • Ein fehlendes Komma oder Anführungszeichen stoppt die App.
     Dann am besten die letzte Änderung genau prüfen.
   • Tipp: Die richtige Antwort nicht immer an dieselbe Stelle setzen.
   ========================================================= */

const LEVELS = [

  /* ===================== LEVEL 1 ===================== */
  {
    nummer: 1,
    titel: "Was ist KI?",
    beschreibung: "Grundbegriffe einfach erklärt, dann ein Mini-Quiz.",
    symbol: "🤖",
    abzeichen: "KI-Entdecker:in",

    infos: [
      {
        titel: "Was ist KI?",
        text: "KI heißt Künstliche Intelligenz. Das sind Computerprogramme, die aus sehr vielen Beispielen gelernt haben. Du kennst sie schon: Chatbots wie ChatGPT oder Copilot, Übersetzer, Sprachassistenten am Handy."
      },
      {
        titel: "Wie ein Chatbot antwortet",
        text: "Ein KI-Chatbot hat riesige Mengen Text gelesen. Daraus hat er gelernt, welche Wörter gut zusammenpassen. Beim Antworten sagt er Wort für Wort vorher, was am wahrscheinlichsten passt. Er versteht die Welt nicht wie ein Mensch."
      },
      {
        titel: "KI kann sich irren",
        text: "KI-Antworten klingen oft sehr sicher. Trotzdem können sie falsch sein. Manchmal erfindet die KI sogar Dinge. Das nennt man „Halluzinieren“. Auch ihr Wissen kann veraltet sein. Prüfe darum wichtige Angaben wie Zahlen, Preise oder Gesetze."
      },
      {
        titel: "So prüfst du eine KI-Antwort",
        text: "Mit diesen 4 Schritten erkennst du viele Fehler:",
        liste: [
          "🤔 Mitdenken: Klingt das logisch? Passt es zu dem, was du schon weißt?",
          "🧮 Nachrechnen: Mengen, Preise und Prozente selbst kontrollieren.",
          "📚 Vergleichen: eine zweite, verlässliche Quelle suchen, z. B. Fachbuch, WKO-Website oder Gesetzestext.",
          "🙋 Nachfragen: Im Zweifel Ausbilder:in oder Lehrkraft fragen."
        ]
      },
      {
        titel: "Du bist verantwortlich",
        text: "KI ist ein Werkzeug, wie ein Taschenrechner. Sie kann dir viel Arbeit abnehmen. Aber: Was du weitergibst, verantwortest du. Und manche Daten gehören nie in eine KI. Mehr dazu in Level 4."
      }
    ],

    aufgaben: [
      {
        typ: "quiz",
        frage: "Woher „weiß“ ein KI-Chatbot seine Antworten?",
        antworten: [
          "Ein Mensch tippt jede Antwort live für dich ein.",
          "Er hat aus riesigen Textmengen gelernt und sagt passende Wörter vorher.",
          "Er kennt alle Fakten der Welt und irrt sich nie.",
          "Er kopiert immer die erste Seite aus dem Internet.",
          "Er schlägt jede Antwort in einem fertigen Lexikon nach."
        ],
        richtig: 2,
        erklaerung: "Ein Chatbot hat aus sehr vielen Texten Muster gelernt. Er berechnet, welche Wörter am besten passen. Darum kann er auch falsche Antworten geben, die gut klingen."
      },
      {
        typ: "quiz",
        frage: "Eine KI gibt dir eine Antwort, die sehr sicher klingt. Was stimmt?",
        antworten: [
          "Wenn sie sicher klingt, stimmt sie auch.",
          "KI-Antworten werden vorher von Fachleuten geprüft.",
          "Sie kann trotzdem falsch sein. Wichtiges prüfe ich nach.",
          "Nur kurze Antworten können falsch sein.",
          "Eine KI irrt sich nur bei sehr schwierigen Fragen."
        ],
        richtig: 3,
        erklaerung: "Eine KI klingt fast immer sicher, auch wenn sie sich irrt. Niemand prüft die Antworten vorher. Wichtige Angaben solltest du selbst kontrollieren."
      },
      {
        typ: "quiz",
        frage: "Was bedeutet „Halluzinieren“ bei einer KI?",
        antworten: [
          "Die KI erfindet Angaben, die echt klingen, aber nicht stimmen.",
          "Die KI stürzt ab und muss neu starten.",
          "Die KI zeigt Bilder statt Text.",
          "Die KI antwortet besonders kreativ, und das ist immer gut.",
          "Die KI versteht deine Frage absichtlich falsch."
        ],
        richtig: 1,
        erklaerung: "Beim Halluzinieren erfindet die KI zum Beispiel Zahlen, Namen oder Quellen. Das klingt echt, ist aber falsch. Darum gilt: nachprüfen."
      },
      {
        typ: "quiz",
        frage: "Welcher Einsatz von KI ist im Betrieb sinnvoll?",
        antworten: [
          "Die KI entscheidet allein, welcher Lieferant den Auftrag bekommt.",
          "Ich lade die Kundenliste mit allen Adressen in die KI hoch.",
          "Die KI schreibt Rechnungen, die ich ungeprüft verschicke.",
          "Die KI schreibt einen ersten Entwurf für eine Mail. Ich prüfe ihn dann.",
          "Ich speichere meine Passwörter in der KI, damit ich sie nicht vergesse."
        ],
        richtig: 4,
        erklaerung: "KI ist gut für Entwürfe und Ideen. Die Entscheidung und die Kontrolle bleiben bei dir. Kundendaten gehören nicht in eine KI."
      },
      {
        typ: "quiz",
        frage: "Du fragst eine KI nach dem heutigen Dieselpreis. Warum ist Vorsicht nötig?",
        antworten: [
          "Eine KI darf keine Zahlen nennen.",
          "Ihr Wissen kann veraltet sein. Sie hat nur bis zu einem bestimmten Tag gelernt.",
          "Preise sind geheim und die KI kennt sie nicht.",
          "Die KI rechnet absichtlich falsch.",
          "Die KI kennt jeden Preis, weil sie immer mit dem Internet verbunden ist."
        ],
        richtig: 2,
        erklaerung: "Viele KIs haben nur bis zu einem Stichtag gelernt. Aktuelle Preise kennen sie oft nicht. Auch wenn die KI im Internet sucht: Prüfe die Quelle."
      },
      {
        typ: "quiz",
        frage: "Eine KI nennt dir den Steuersatz für eine Rechnung. Was machst du?",
        antworten: [
          "Ich übernehme ihn. Computer rechnen ja immer genau.",
          "Ich frage die KI nochmal. Sagt sie dasselbe, dann stimmt es.",
          "Ich nehme einfach den Steuersatz, den ich am öftesten gesehen habe.",
          "Ich lasse das Feld leer, dann kann nichts falsch sein.",
          "Ich prüfe ihn in einer verlässlichen Quelle, z. B. auf der WKO-Website."
        ],
        richtig: 5,
        erklaerung: "Nochmal fragen hilft nicht: Die KI kann denselben Fehler wiederholen. Steuersätze prüfst du in einer verlässlichen Quelle, z. B. bei der WKO oder im Fachbuch."
      },
      {
        typ: "quiz",
        frage: "Die KI nennt als Quelle ein Gesetz mit genauer Paragrafen-Nummer. Was stimmt?",
        antworten: [
          "Mit Paragrafen-Nummer ist die Angabe sicher richtig.",
          "Die KI kann auch Quellen erfinden. Ich schaue nach, ob es den Paragrafen wirklich gibt.",
          "Quellen von einer KI darf man nie verwenden.",
          "Eine KI nennt nur Quellen, die sie vorher geprüft hat.",
          "Paragrafen sind im Beruf nicht wichtig."
        ],
        richtig: 2,
        erklaerung: "KIs erfinden manchmal Quellen, Gesetze oder Paragrafen. Das sieht sehr echt aus. Österreichische Gesetze kannst du kostenlos im RIS nachlesen (ris.bka.gv.at)."
      }
    ]
  },

  /* ===================== LEVEL 2 ===================== */
  {
    nummer: 2,
    titel: "Gut fragen",
    beschreibung: "Welche Anfrage an die KI ist besser – und warum?",
    symbol: "💬",
    abzeichen: "Prompt-Profi",

    infos: [
      {
        titel: "Was ist ein Prompt?",
        text: "Ein Prompt ist deine Anfrage an die KI. Die KI weiß nur, was du ihr schreibst. Sie kennt deinen Betrieb nicht und kann nicht nachfragen wie eine Kollegin. Darum gilt: Je genauer du fragst, desto besser passt die Antwort."
      },
      {
        titel: "Die Zutaten einer guten Anfrage",
        text: "Eine gute Anfrage ist wie ein klarer Arbeitsauftrag. Sie sagt der KI:",
        liste: [
          "🎯 Aufgabe: Was genau soll die KI tun?",
          "📋 Infos: Welche Fakten braucht sie? Wer, was, wann, wie viel?",
          "👥 Empfänger und Ton: Für wen ist es? Höflich, locker oder sachlich?",
          "📏 Form: Wie lang? Als Mail, Liste oder Tabelle?"
        ]
      },
      {
        titel: "Nachbessern ist erlaubt",
        text: "Die erste Antwort passt noch nicht? Schreib einfach weiter, zum Beispiel: „Bitte kürzer.“ oder „Schreib es freundlicher.“ Und: Echte Namen, Adressen oder Kundennummern lässt du weg. Schreib stattdessen einen Platzhalter wie [Kunde]."
      }
    ],

    aufgaben: [
      {
        typ: "vergleich",
        situation: "Eine Lieferung ist 3 Tage zu spät. Du willst dem Lieferanten eine Mail schreiben.",
        anfrageA: "Schreib eine Mail.",
        anfrageB: "Schreib eine höfliche Mail an einen Lieferanten. Die Lieferung ist 3 Tage zu spät. Frag nach dem neuen Liefertermin. Maximal 5 Sätze.",
        besser: "B",
        ergebnisA: "Hallo! Ich hoffe, dir geht es gut. Ich wollte mich einfach mal melden und fragen, wie es so läuft …",
        ergebnisB: "Sehr geehrte Damen und Herren, unsere Bestellung ist leider bereits 3 Tage überfällig. Bitte teilen Sie uns den neuen Liefertermin mit. Vielen Dank für Ihre rasche Rückmeldung. Mit freundlichen Grüßen",
        erklaerung: "Anfrage B nennt Empfänger, Grund, Ton, Ziel und Länge. Bei Anfrage A muss die KI raten – und das Ergebnis ist unbrauchbar."
      },
      {
        typ: "vergleich",
        situation: "Du sollst einem neuen Lehrling das Lagerprinzip FIFO erklären.",
        anfrageA: "Erkläre das Lagerprinzip FIFO für einen Lehrling im 1. Lehrjahr. Verwende ein Beispiel mit Milchprodukten. Maximal 4 Sätze.",
        anfrageB: "Was ist FIFO?",
        besser: "A",
        ergebnisA: "FIFO heißt „First In – First Out“. Was zuerst ins Lager kommt, geht auch zuerst wieder hinaus. Beispiel: Die Milch, die am Montag geliefert wurde, verkaufst du vor der Milch vom Mittwoch. So läuft nichts ab.",
        ergebnisB: "FIFO kann vieles bedeuten: ein Verfahren in der Informatik, eine Methode zur Bewertung von Vorräten in der Buchhaltung oder ein Lagerprinzip …",
        erklaerung: "FIFO gibt es auch in der Informatik und in der Buchhaltung. Anfrage A sagt, worum es geht, für wen die Erklärung ist und wie lang sie sein soll."
      },
      {
        typ: "quiz",
        frage: "Was fehlt vor allem in dieser Anfrage? „Mach mir eine Tabelle mit Lieferanten.“",
        antworten: [
          "Ein „Bitte“ und ein „Danke“.",
          "Welche Spalten die Tabelle haben soll, z. B. Name, Produkt, Preis, Lieferzeit.",
          "Mehr Ausrufezeichen, damit die KI sich beeilt.",
          "Nichts. Die KI weiß schon, was ich brauche.",
          "Die Uhrzeit, zu der ich frage."
        ],
        richtig: 2,
        erklaerung: "Die KI weiß nicht, welche Infos du brauchst. Nenn die Spalten. Wichtig: Echte Lieferanten-Daten aus dem Betrieb gibst du nur ein, wenn das im Betrieb erlaubt ist. Höflich sein schadet übrigens nicht, ist aber nicht entscheidend."
      },
      {
        typ: "vergleich",
        situation: "Du brauchst eine Checkliste für die Kontrolle im Wareneingang.",
        anfrageA: "Ich brauch irgendwas für den Wareneingang, damit da nix schiefgeht, kannst du da was machen, so allgemein halt.",
        anfrageB: "Erstelle eine Checkliste für die Kontrolle im Wareneingang. Als Liste zum Abhaken, höchstens 8 Punkte. Achte auf Menge, Beschädigung und Lieferschein.",
        besser: "B",
        ergebnisA: "Der Wareneingang ist ein wichtiger Teil der Logistik. Er umfasst viele Prozesse wie die Annahme, die Prüfung, die Einlagerung und die Dokumentation. In vielen Unternehmen …",
        ergebnisB: "☐ Lieferschein mit Bestellung vergleichen ☐ Anzahl der Packstücke zählen ☐ Verpackung auf Schäden prüfen ☐ Schäden am Lieferschein vermerken …",
        erklaerung: "Anfrage B sagt klar: was (Checkliste), wofür (Wareneingang), welche Form (zum Abhaken, max. 8 Punkte) und worauf es ankommt. Bei Anfrage A kommt nur ein allgemeiner Text heraus."
      },
      {
        typ: "vergleich",
        situation: "Ein Kunde beschwert sich über eine verspätete Lieferung. Du willst eine Antwort formulieren lassen.",
        anfrageA: "Schreib eine Antwort an Herrn Johann Berger, Musterstraße 5, 8662 Mitterdorf, Kundennummer 40122. Er beschwert sich über eine verspätete Lieferung.",
        anfrageB: "Schreib eine freundliche Antwort an einen Kunden, der sich über eine verspätete Lieferung beschwert. Entschuldige dich und biete 5 % Rabatt an. Den Namen setze ich selbst ein.",
        besser: "B",
        erklaerung: "Anfrage A enthält Name, Adresse und Kundennummer. Diese Daten gehören nicht in eine KI! Anfrage B ist trotzdem genau: Ton, Entschuldigung und Angebot sind klar. Den Namen ergänzt du danach selbst."
      },
      {
        typ: "quiz",
        frage: "Die Antwort der KI ist dir zu lang und zu kompliziert. Was machst du am besten?",
        antworten: [
          "Ich gebe auf. Die KI kann das nicht.",
          "Ich stelle genau dieselbe Frage nochmal.",
          "Ich kopiere die lange Antwort trotzdem.",
          "Ich schreibe: „Bitte kürzer, in einfachen Worten, maximal 3 Sätze.“",
          "Ich schreibe nur: „Nein!“"
        ],
        richtig: 4,
        erklaerung: "Du kannst mit der KI weiterschreiben wie in einem Chat. Sag ihr genau, was du anders haben willst: kürzer, einfacher, freundlicher, als Liste …"
      }
    ]
  },

  /* ===================== LEVEL 3 ===================== */
  {
    nummer: 3,
    titel: "Fehler finden",
    beschreibung: "In der KI-Antwort steckt ein Fehler. Finde ihn!",
    symbol: "🔍",
    abzeichen: "Fehlerjäger:in",
    aufgaben: []
  },

  /* ===================== LEVEL 4 ===================== */
  {
    nummer: 4,
    titel: "Datenschutz-Ampel",
    beschreibung: "Welche Daten dürfen in die KI? Grün, Gelb oder Rot?",
    symbol: "🚦",
    abzeichen: "Datenschützer:in",
    aufgaben: []
  },

  /* ===================== LEVEL 5 ===================== */
  {
    nummer: 5,
    titel: "KI im Lager",
    beschreibung: "KI-Ergebnisse aus Lager und Einkauf prüfen.",
    symbol: "📦",
    abzeichen: "Logistik-Profi",
    aufgaben: []
  }
];
