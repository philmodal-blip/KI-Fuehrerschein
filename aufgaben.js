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

   So ist eine Fehler-Such-Aufgabe aufgebaut (KI-Antwort mit einem Fehler):
   {
     typ: "fehler",
     frage: "Was man die KI gefragt hat",
     saetze: [                        ← die KI-Antwort, Satz für Satz
       "Erster Satz.",
       "Zweiter Satz.",
       "Dritter Satz."
     ],
     fehler: 2,                       ← die NUMMER des falschen Satzes (hier: Satz 2)
     erklaerung: "Was falsch ist und was richtig wäre."
   },

   So ist eine Ampel-Karte aufgebaut (Datenschutz-Ampel):
   {
     typ: "ampel",
     symbol: "🔑",                    ← ein Emoji für die Karte
     daten: "Welche Daten auf der Karte stehen",
     farbe: "rot",                    ← "gruen", "gelb" oder "rot"
     erklaerung: "Warum diese Farbe."
   },

   So ist eine Rechen-Aufgabe aufgebaut (man tippt eine Zahl ein):
   {
     typ: "rechnen",
     situation: "Die Angaben zur Aufgabe",
     kiAntwort: "Was die KI ausgerechnet hat",   ← darf fehlen
     frage: "Was soll man ausrechnen?",
     loesung: 340,                    ← die richtige Zahl (Kommazahlen mit Punkt: 12.5)
     einheit: "Stück",                ← darf fehlen
     erklaerung: "Der richtige Rechenweg."
   },

   So ist eine Mehrfach-Auswahl aufgebaut (mehrere Antworten sind richtig):
   {
     typ: "auswahl",
     situation: "…",                  ← darf fehlen
     kiAntwort: "…",                  ← darf fehlen
     frage: "Tippe alle … an.",
     optionen: [ "…", "…", "…", "…" ],
     richtig: [1, 3, 4],              ← die NUMMERN aller richtigen Optionen
     baukasten: true,                 ← darf fehlen: zeigt die gewählten Optionen als Anfrage an
     erklaerung: "…"
   },

   So ist eine Dokument-Aufgabe aufgebaut (verdächtige Stelle finden):
   {
     typ: "dokument",
     hinweis: "Wichtige Infos vorab", ← darf fehlen
     kiAntwort: "…",                  ← darf fehlen
     frage: "Tippe auf die verdächtige Stelle.",
     dokumentTitel: "RECHNUNG Nr. 123",
     zeilen: [
       ["Bezeichnung", "Wert"],       ← jede Zeile: links die Bezeichnung, rechts der Wert
       ["Betrag", "100,00 €"]
     ],
     verdaechtig: 2,                  ← die NUMMER der verdächtigen Zeile
     erklaerung: "…"
   },

   Zusatz für Quiz-Aufgaben (alles darf fehlen):
     situation: "…",                  ← Kasten "Die Situation" über der Frage
     kiAntwort: "…",                  ← Kasten "Die KI sagt" über der Frage
     tabelle: {                       ← eine Tabelle über der Frage
       spalten: ["", "Spalte 1", "Spalte 2"],
       zeilen: [
         ["Zeile 1", "…", "…"],
         ["Zeile 2", "…", "…"]
       ]
     },

   Tipp: In kiAntwort beginnt mit \n eine neue Zeile.

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
          "Er sucht jede Antwort in einer großen Datenbank mit geprüften Fakten.",
          "Er versteht die Frage wie ein Mensch und denkt dann darüber nach.",
          "Programmierer haben für sehr viele Fragen fertige Antworten hinterlegt.",
          "Er hat aus riesigen Textmengen Muster gelernt und berechnet, welche Wörter am besten passen.",
          "Er sucht immer im Internet und fasst die beste Seite zusammen."
        ],
        richtig: 4,
        erklaerung: "Ein Chatbot hat keine Datenbank mit geprüften Fakten. Er berechnet aus gelernten Mustern, welche Wörter passen. Manche Chatbots können zusätzlich im Internet suchen – aber auch dann formuliert die KI die Antwort selbst und kann Fehler machen."
      },
      {
        typ: "quiz",
        frage: "Du stellst einer KI zweimal genau dieselbe Frage und bekommst zwei verschiedene Antworten. Was bedeutet das?",
        antworten: [
          "Die KI ist kaputt und sollte nicht verwendet werden.",
          "Eine der beiden Antworten ist sicher richtig, die andere falsch.",
          "Die KI wählt ihre Wörter mit etwas Zufall aus. Darum können Antworten verschieden sein – richtig sind sie deshalb noch nicht.",
          "Die KI hat zwischen den beiden Fragen dazugelernt.",
          "Die zweite Antwort ist immer die bessere, weil die KI sich verbessert."
        ],
        richtig: 3,
        erklaerung: "Beim Schreiben ist etwas Zufall im Spiel. Darum klingt jede Antwort ein bisschen anders. Es kann auch sein, dass beide Antworten falsch sind. Die KI lernt nicht während deines Gesprächs dazu."
      },
      {
        typ: "quiz",
        frage: "Woran erkennst du am sichersten, dass eine KI halluziniert, also etwas erfunden hat?",
        antworten: [
          "Die Antwort enthält Rechtschreibfehler.",
          "Die KI schreibt „vielleicht“ oder „ich bin nicht sicher“.",
          "Die Antwort ist besonders lang.",
          "Die KI antwortet besonders schnell.",
          "Am Text selbst oft gar nicht – nur durch Nachprüfen in einer anderen Quelle."
        ],
        richtig: 5,
        erklaerung: "Erfundene Angaben sehen genauso aus wie richtige: fehlerfrei, sicher formuliert, ohne Warnung. Darum hilft nur eines: in einer verlässlichen Quelle nachprüfen."
      },
      {
        typ: "quiz",
        frage: "Welcher Einsatz von KI ist im Betrieb am sinnvollsten?",
        antworten: [
          "Die KI sucht den günstigsten Lieferanten aus, und ich bestelle sofort dort.",
          "Die KI schreibt eine Reklamation. Sie klingt gut, also schicke ich sie gleich ab.",
          "Die KI gibt mir Ideen, welche Fragen ich einem neuen Lieferanten stellen kann. Ich wähle selbst aus.",
          "Die KI berechnet den Lagerbestand, und ich trage das Ergebnis direkt ins System ein.",
          "Ich kopiere eine Kundenbeschwerde mit Name und Adresse in die KI, damit die Antwort persönlich wird."
        ],
        richtig: 3,
        erklaerung: "Bei Ideen kann die KI gut helfen, und du entscheidest selbst. Bei allen anderen Antworten fehlt die Kontrolle durch dich – oder es landen Kundendaten in der KI."
      },
      {
        typ: "quiz",
        frage: "Eine KI ohne Internetsuche nennt dir auf die Frage „Wie hoch ist der Dieselpreis in Österreich?“ eine genaue Zahl. Was ist das Problem?",
        antworten: [
          "Keines. Eine genaue Zahl zeigt, dass die Antwort stimmt.",
          "Die KI darf keine Preise nennen.",
          "Die KI rechnet den Preis aus dem Ölpreis aus, das ist immer genau.",
          "Die Zahl kann aus alten Lerndaten stammen oder sogar erfunden sein.",
          "Das einzige Problem: Sie nennt den Preis vielleicht in Dollar."
        ],
        richtig: 4,
        erklaerung: "Eine KI ohne Internetsuche kennt nur, was sie bis zu einem Stichtag gelernt hat. Eine genaue Zahl wirkt glaubwürdig, kann aber veraltet oder erfunden sein."
      },
      {
        typ: "quiz",
        frage: "Eine KI schreibt: „In Österreich gilt für alle Waren 20 % Umsatzsteuer.“ Was stimmt?",
        antworten: [
          "Das stimmt. 20 % gilt für alle Waren.",
          "Das ist falsch. In Österreich gilt für alle Waren 19 %.",
          "Das ist nur teilweise richtig. 20 % ist der Normalsatz, für manche Waren gelten ermäßigte Sätze, z. B. 4,9 % für bestimmte Grundnahrungsmittel wie Milch oder Eier.",
          "Das stimmt, weil die KI es ohne Einschränkung sagt.",
          "Das ist falsch. Auf Waren gibt es in Österreich keine Umsatzsteuer."
        ],
        richtig: 3,
        erklaerung: "Ein typischer KI-Fehler: Etwas Richtiges wird zu allgemein gesagt. In Österreich gibt es 20 %, 13 %, 10 % und seit 1. Juli 2026 auch 4,9 % für bestimmte Grundnahrungsmittel. Eine KI mit altem Wissen kennt den neuen Satz vielleicht gar nicht! Und: 19 % ist der Satz in Deutschland – KIs verwechseln Österreich und Deutschland oft."
      },
      {
        typ: "quiz",
        frage: "Eine KI nennt dir als Beleg einen Paragrafen aus dem Arbeitszeitgesetz, mit genauer Nummer. Was machst du?",
        antworten: [
          "Ich übernehme die Angabe. Mit so einer genauen Nummer stimmt sie sicher.",
          "Ich frage die KI: „Bist du sicher?“ Wenn sie Ja sagt, passt es.",
          "Ich verwende die Angabe nie, weil KI-Quellen immer erfunden sind.",
          "Ich nehme das erste Suchergebnis, in dem der Paragraf vorkommt.",
          "Ich suche den Paragrafen im RIS und lese selbst nach, was dort steht."
        ],
        richtig: 5,
        erklaerung: "KIs erfinden manchmal Paragrafen oder Quellen. Auf „Bist du sicher?“ antworten sie oft trotzdem mit Ja. Österreichische Gesetze liest du kostenlos und verlässlich im RIS nach (ris.bka.gv.at)."
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
        situation: "Eine Lieferung ist zu spät. Du willst dem Lieferanten eine Mail schreiben.",
        anfrageA: "Schreib eine höfliche Mail an unseren Lieferanten wegen der verspäteten Lieferung.",
        anfrageB: "Schreib eine höfliche Mail an einen Lieferanten. Unsere Bestellung vom 3. März ist 3 Tage überfällig. Bitte um einen neuen Liefertermin bis Freitag. Maximal 5 Sätze.",
        besser: "B",
        ergebnisA: "Sehr geehrte Damen und Herren, leider ist unsere Lieferung verspätet. Wir bitten Sie, uns mitzuteilen, wann wir mit [Lieferdatum] rechnen können … (Die KI muss Lücken lassen oder erfinden.)",
        ergebnisB: "Sehr geehrte Damen und Herren, unsere Bestellung vom 3. März ist leider bereits 3 Tage überfällig. Bitte teilen Sie uns bis Freitag einen neuen Liefertermin mit. Vielen Dank für Ihre rasche Rückmeldung. Mit freundlichen Grüßen",
        erklaerung: "Beide Anfragen sind höflich. Aber nur B enthält die Fakten (Datum, wie viele Tage), ein klares Ziel (neuer Termin bis Freitag) und die Länge. Bei A muss die KI Lücken lassen oder Details erfinden."
      },
      {
        typ: "vergleich",
        situation: "Du sollst einem neuen Lehrling das Lagerprinzip FIFO erklären.",
        anfrageA: "Erkläre das Lagerprinzip FIFO für einen Lehrling im 1. Lehrjahr. Verwende ein Beispiel aus einem Lebensmittellager. Maximal 4 Sätze.",
        anfrageB: "Erkläre FIFO bitte einfach und kurz.",
        besser: "A",
        ergebnisA: "FIFO heißt „First In – First Out“. Was zuerst ins Lager kommt, geht auch zuerst wieder hinaus. Beispiel: Die Milch vom Montag wird vor der Milch vom Mittwoch ausgeliefert. So läuft nichts ab.",
        ergebnisB: "FIFO bedeutet „First In – First Out“. In der Informatik ist das eine Warteschlange, in der Buchhaltung eine Methode zur Bewertung von Vorräten …",
        erklaerung: "„Einfach und kurz“ klingt gut, reicht aber nicht: FIFO gibt es auch in der Informatik und in der Buchhaltung. Anfrage A sagt, worum es geht (Lager), für wen (1. Lehrjahr), mit welchem Beispiel und wie lang."
      },
      {
        typ: "quiz",
        frage: "Welche Anfrage liefert die brauchbarste Tabelle für einen Lieferantenvergleich?",
        antworten: [
          "„Mach eine schöne, übersichtliche Tabelle mit allen wichtigen Lieferanten.“",
          "„Mach eine Tabelle mit Lieferanten, Produkten, Preisen und so weiter.“",
          "„Bitte mach mir ganz schnell eine gute Tabelle mit Lieferanten!“",
          "„Mach eine Tabelle mit den Spalten Lieferant, Produkt, Preis pro Stück und Lieferzeit in Tagen. Die Angebote füge ich unten ein.“",
          "„Mach eine Tabelle mit den besten Lieferanten für unseren Betrieb.“"
        ],
        richtig: 4,
        erklaerung: "Nur hier sind die Spalten klar, und die KI bekommt die echten Angebote. Bei den anderen weiß die KI nicht, welche Lieferanten gemeint sind – sie würde Firmen und Preise erfinden. Achtung: Betriebsdaten nur eingeben, wenn das im Betrieb erlaubt ist."
      },
      {
        typ: "vergleich",
        situation: "Du brauchst eine Checkliste für die Kontrolle im Wareneingang.",
        anfrageA: "Erstelle eine Checkliste für die Kontrolle im Wareneingang. Zum Abhaken, höchstens 8 Punkte. Achte auf Menge, Beschädigung und Lieferschein.",
        anfrageB: "Erstelle eine sehr ausführliche und vollständige Checkliste für den Wareneingang mit allem, was wichtig ist.",
        besser: "A",
        ergebnisA: "☐ Lieferschein mit Bestellung vergleichen ☐ Anzahl der Packstücke zählen ☐ Verpackung auf Schäden prüfen ☐ Schäden am Lieferschein vermerken …",
        ergebnisB: "1. Vorbereitung der Rampe 2. Prüfung der Fahrzeugpapiere 3. Kontrolle der Ladungssicherung … 27. Archivierung der Unterlagen 28. Feedback an den Einkauf …",
        erklaerung: "„Ausführlich und vollständig“ klingt gründlich. Heraus kommt aber eine sehr lange Liste, die im Alltag niemand verwendet. Anfrage A sagt genau, worauf es ankommt und wie lang die Liste sein darf."
      },
      {
        typ: "vergleich",
        situation: "Ein Kunde beschwert sich über eine verspätete Lieferung. Du willst eine Antwort formulieren lassen.",
        anfrageA: "Schreib eine freundliche Antwort an einen Kunden, der sich über eine verspätete Lieferung beschwert. Entschuldige dich und biete 5 % Rabatt an. Den Namen setze ich selbst ein.",
        anfrageB: "Schreib eine freundliche Antwort an Herrn Johann Berger, Musterstraße 5, 8662 Mitterdorf, Kundennummer 40122. Er beschwert sich über eine verspätete Lieferung. Entschuldige dich und biete 5 % Rabatt an.",
        besser: "A",
        erklaerung: "Anfrage B ist genauer – aber sie enthält Name, Adresse und Kundennummer. Diese Daten gehören nicht in eine KI! Anfrage A liefert dasselbe gute Ergebnis. Den Namen ergänzt du danach selbst."
      },
      {
        typ: "vergleich",
        situation: "Dein Betrieb kauft Paletten. Du sollst die Angebote von Lieferant Huber und Lieferant Maier vergleichen. Du findest Huber sympathischer.",
        anfrageA: "Ich finde Huber besser. Nenne mir Gründe, warum Huber der bessere Lieferant ist. Die Angebote füge ich unten ein.",
        anfrageB: "Vergleiche die beiden Angebote unten nach Preis, Lieferzeit und Zahlungsbedingungen. Nenne Vor- und Nachteile von beiden.",
        besser: "B",
        ergebnisA: "Huber ist eine gute Wahl: Das Angebot ist übersichtlich, die Firma wirkt zuverlässig, und … (Die KI sucht nur Argumente für Huber.)",
        ergebnisB: "Huber: Preis 12,50 € pro Stück, Lieferzeit 10 Tage. Maier: Preis 11,90 € pro Stück, Lieferzeit 4 Tage, aber Zahlung sofort statt nach 30 Tagen …",
        erklaerung: "KIs geben dir gern recht. Wer schon seine Meinung in die Anfrage schreibt, bekommt nur Argumente dafür. Anfrage B ist neutral und nennt klare Vergleichspunkte. So entscheidest du selbst."
      },
      {
        typ: "quiz",
        frage: "Die KI hat eine Reklamation geschrieben. Sie ist zu unfreundlich und zu lang. Welche Nachricht an die KI bringt am meisten?",
        antworten: [
          "„Kürzer.“",
          "„Das ist schlecht. Nochmal.“",
          "„Schreib es komplett neu und ganz anders.“",
          "„Mach es besser, du kannst das.“",
          "„Schreib es freundlicher, aber bleib bestimmt. Höchstens 5 Sätze. Der neue Liefertermin muss drinbleiben.“"
        ],
        richtig: 5,
        erklaerung: "„Kürzer“ löst nur eines der beiden Probleme. Die beste Nachricht sagt genau, was sich ändern soll (Ton, Länge) und was bleiben muss (der Liefertermin)."
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

    infos: [
      {
        titel: "Fehler haben viele Gesichter",
        text: "KI-Fehler sind selten offensichtlich. Sie verstecken sich mitten in einer guten Antwort. Typische Fehler sind:",
        liste: [
          "🧮 Rechenfehler: Die Formel stimmt, das Ergebnis nicht.",
          "🇩🇪 Falsches Land: Regeln aus Deutschland statt aus Österreich.",
          "📅 Veraltetes Wissen: Eine Regel hat sich inzwischen geändert.",
          "🔄 Vertauscht: Wer was macht oder zahlt, ist verdreht.",
          "↔️ Widerspruch: Zwei Sätze passen nicht zusammen."
        ]
      },
      {
        titel: "So jagst du Fehler",
        text: "Lies die Antwort Satz für Satz. Stell dir bei jedem Satz eine Frage:",
        liste: [
          "Stimmt diese Zahl? Rechne selbst nach.",
          "Gilt das wirklich in Österreich?",
          "Passt dieser Satz zu den anderen Sätzen?",
          "Würde das im Betrieb wirklich so gemacht werden?"
        ]
      }
    ],

    aufgaben: [
      {
        typ: "fehler",
        frage: "Wie berechne ich die Umsatzsteuer auf einer Rechnung für Büromaterial?",
        saetze: [
          "Büromaterial unterliegt in Österreich dem Normalsteuersatz.",
          "Der Normalsteuersatz beträgt 19 %.",
          "Du berechnest die Steuer vom Nettobetrag.",
          "Beispiel: Bei 200 € netto kommen 40 € Umsatzsteuer dazu.",
          "Der Bruttobetrag ist dann 240 €."
        ],
        fehler: 2,
        erklaerung: "In Österreich beträgt der Normalsteuersatz 20 %. 19 % gilt in Deutschland. Hast du es bemerkt? Das Beispiel rechnet sogar richtig mit 20 % – die Antwort widerspricht sich selbst."
      },
      {
        typ: "fehler",
        frage: "Eine Rechnung über 1.500 € hat 2 % Skonto bei Zahlung innerhalb von 10 Tagen. Wie viel muss ich zahlen?",
        saetze: [
          "Skonto ist ein Preisnachlass für schnelles Bezahlen.",
          "Der Prozentsatz wird vom Rechnungsbetrag berechnet.",
          "Die Frist steht auf der Rechnung, hier sind es 10 Tage.",
          "2 % von 1.500 € sind 3 €. Du zahlst also 1.497 €.",
          "Nach Ablauf der Frist zahlst du den vollen Betrag."
        ],
        fehler: 4,
        erklaerung: "2 % von 1.500 € sind 30 €, nicht 3 €. Du zahlst also 1.470 €. Ein kleiner Kommafehler – aber er kostet viel Geld. Rechne Prozente immer selbst nach!"
      },
      {
        typ: "fehler",
        frage: "Was bedeutet die Lieferbedingung EXW?",
        saetze: [
          "EXW steht für „Ex Works“, auf Deutsch „ab Werk“.",
          "Der Verkäufer stellt die Ware auf seinem eigenen Gelände bereit.",
          "Der Verkäufer organisiert den Transport bis zum Lager des Käufers und trägt bis dahin das Risiko.",
          "Der Käufer trägt also fast alle Kosten und Risiken.",
          "EXW ist eine der Incoterms-Klauseln."
        ],
        fehler: 3,
        erklaerung: "Bei EXW holt der Käufer die Ware ab. Er organisiert und bezahlt den Transport und trägt ab der Bereitstellung das Risiko. Satz 3 beschreibt eher eine Klausel wie DAP. Und er widerspricht Satz 4."
      },
      {
        typ: "fehler",
        frage: "Ein Lehrling fragt: Wie viel Urlaub habe ich in Österreich?",
        saetze: [
          "Lehrlinge haben in Österreich denselben Urlaubsanspruch wie andere Arbeitnehmer:innen.",
          "Der Anspruch beträgt 5 Wochen pro Arbeitsjahr.",
          "Bei einer 5-Tage-Woche sind das 25 Arbeitstage.",
          "Nach 25 Dienstjahren steigt der Anspruch auf 6 Wochen.",
          "Urlaub, den du nicht verbrauchst, verfällt immer am 31. Dezember."
        ],
        fehler: 5,
        erklaerung: "In Österreich verfällt Urlaub nicht einfach am Jahresende. Er verjährt erst 2 Jahre nach dem Ende des Urlaubsjahres, in dem er entstanden ist. Die KI hat hier eine Regel erfunden, die gut klingt."
      },
      {
        typ: "fehler",
        frage: "Worauf muss ich bei der Annahme einer Lieferung achten?",
        saetze: [
          "Der Lieferschein begleitet die Ware und zeigt, was geliefert wurde.",
          "Du vergleichst den Lieferschein mit der Bestellung und mit der tatsächlichen Ware.",
          "Du zählst die Packstücke und prüfst die Verpackung auf Schäden.",
          "Schäden notierst du am besten ein paar Tage später, wenn du in Ruhe Zeit hast.",
          "Die Rechnung kommt oft getrennt und wird später mit Lieferschein und Bestellung abgeglichen."
        ],
        fehler: 4,
        erklaerung: "Schäden müssen sofort bei der Annahme vermerkt werden, am besten auf dem Lieferschein, und der Fahrer bestätigt sie mit Unterschrift. Später ist schwer zu beweisen, wann der Schaden entstanden ist."
      },
      {
        typ: "fehler",
        frage: "Am Jahresanfang hatten wir 400 Stück auf Lager, am Jahresende 200 Stück. Wie hoch ist der durchschnittliche Lagerbestand?",
        saetze: [
          "Der durchschnittliche Lagerbestand zeigt, wie viel im Schnitt auf Lager liegt.",
          "Eine einfache Formel ist: (Anfangsbestand + Endbestand) : 2.",
          "Bei dir sind das (400 + 200) : 2 = 350 Stück.",
          "Je höher der durchschnittliche Lagerbestand, desto mehr Geld ist im Lager gebunden.",
          "Darum halten Betriebe ihn möglichst nicht unnötig hoch."
        ],
        fehler: 3,
        erklaerung: "(400 + 200) : 2 = 600 : 2 = 300 Stück, nicht 350. Die Formel war richtig, nur das Ergebnis nicht. Genau solche Fehler sind gefährlich, weil der Rest so überzeugend klingt."
      }
    ]
  },

  /* ===================== LEVEL 4 ===================== */
  {
    nummer: 4,
    titel: "Datenschutz-Ampel",
    beschreibung: "Welche Daten dürfen in die KI? Grün, Gelb oder Rot?",
    symbol: "🚦",
    abzeichen: "Datenschützer:in",

    infos: [
      {
        titel: "Warum Datenschutz bei KI?",
        text: "Was du in eine KI eintippst, verlässt deinen Betrieb. Es landet auf den Servern des Anbieters, oft in anderen Ländern. Manche Anbieter verwenden Eingaben, um ihre KI weiter zu trainieren. Zurückholen kannst du nichts mehr. In der EU schützt die DSGVO persönliche Daten – und du bist mitverantwortlich."
      },
      {
        titel: "Die Datenschutz-Ampel",
        text: "Bevor du etwas in eine KI eingibst, frag dich: Welche Farbe hat das?",
        liste: [
          "🟢 Grün – darf in die KI: allgemeine Fragen, öffentliche Infos, Daten ohne Bezug zu Personen oder zum Betrieb.",
          "🟡 Gelb – nur anonymisiert: Namen, Nummern und Adressen vorher entfernen oder durch Platzhalter ersetzen.",
          "🔴 Rot – niemals: Passwörter, Bankdaten, Gesundheitsdaten, Ausweise, Name mit Adresse."
        ]
      },
      {
        titel: "Anonymisieren – so geht's",
        text: "Ersetze alles, was auf eine Person oder Firma hinweist, durch einen Platzhalter. Aus „Frau Huber, Kundennummer 40122, beschwert sich über …“ wird „[Kundin] beschwert sich über …“. Im Zweifel gilt: Rot. Und frag nach, ob dein Betrieb eigene KI-Regeln hat."
      }
    ],

    aufgaben: [
      {
        typ: "ampel",
        symbol: "🌍",
        daten: "Eine allgemeine Frage: „Was bedeutet die Incoterms-Klausel FCA?“",
        farbe: "gruen",
        erklaerung: "Eine allgemeine Fachfrage enthält keine Daten über Personen oder deinen Betrieb. Das darf in die KI."
      },
      {
        typ: "ampel",
        symbol: "🔑",
        daten: "Das Passwort für das Warenwirtschaftssystem deines Betriebs",
        farbe: "rot",
        erklaerung: "Passwörter gehören niemals in eine KI – auch nicht, um „nur kurz“ etwas zu fragen. Wer es liest, hat Zugang zu euren Systemen."
      },
      {
        typ: "ampel",
        symbol: "✉️",
        daten: "Eine Kundenbeschwerde mit Name und Kundennummer, auf die du antworten willst",
        farbe: "gelb",
        erklaerung: "Der Inhalt der Beschwerde hilft der KI. Name und Kundennummer braucht sie nicht. Ersetze sie durch [Kunde] und [Nummer] – dann ist es in Ordnung."
      },
      {
        typ: "ampel",
        symbol: "📦",
        daten: "Ein anonymisierter Lagerbestand: „Artikel A: 120 Stück, Artikel B: 45 Stück, Artikel C: 300 Stück“",
        farbe: "gruen",
        erklaerung: "Diese Liste ist schon anonymisiert: keine Artikelnamen, keine Preise, kein Firmenname. Damit kann niemand etwas über deinen Betrieb herausfinden."
      },
      {
        typ: "ampel",
        symbol: "🏠",
        daten: "Name und Lieferadresse einer Kundin: „Maria Huber, Hauptplatz 3, 8662 Mitterdorf“",
        farbe: "rot",
        erklaerung: "Name mit Adresse sind persönliche Daten, die eine Person eindeutig erkennbar machen. Ohne Name und Adresse bleibt hier nichts Brauchbares übrig – darum: Rot."
      },
      {
        typ: "ampel",
        symbol: "📋",
        daten: "Die echte Lagerliste deines Betriebs mit Einkaufspreisen und Namen der Lieferanten",
        farbe: "gelb",
        erklaerung: "Einkaufspreise und Lieferanten sind Geschäftsgeheimnisse. Ersetze die Namen durch „Lieferant 1, 2, 3“ und lass die Preise weg oder runde sie. Dann kann die KI trotzdem helfen."
      },
      {
        typ: "ampel",
        symbol: "🏦",
        daten: "Die IBAN eines Lieferanten, um eine Zahlung zu prüfen",
        farbe: "rot",
        erklaerung: "Bankdaten gehören nie in eine KI. Eine IBAN prüfst du im Betrieb mit den hinterlegten Stammdaten – nicht mit einer KI."
      },
      {
        typ: "ampel",
        symbol: "🌐",
        daten: "Eine Produktbeschreibung von der öffentlichen Website eines Lieferanten",
        farbe: "gruen",
        erklaerung: "Was ohnehin öffentlich im Internet steht, ist kein Geheimnis. Du darfst die KI bitten, den Text zusammenzufassen oder zu vergleichen."
      },
      {
        typ: "ampel",
        symbol: "🤒",
        daten: "Die Krankmeldung eines Kollegen mit Name und Diagnose",
        farbe: "rot",
        erklaerung: "Gesundheitsdaten sind laut DSGVO besonders geschützt. Sie gehören niemals in eine KI. Wenn du einen Dienstplan umplanen willst, reicht: „Eine Person fällt 3 Wochen aus.“"
      },
      {
        typ: "ampel",
        symbol: "📝",
        daten: "Das Protokoll einer Teambesprechung mit den Namen aller Kolleg:innen – du willst eine Zusammenfassung",
        farbe: "gelb",
        erklaerung: "Für eine Zusammenfassung braucht die KI keine Namen. Ersetze sie durch Rollen wie „Lagerleitung“ oder „Lehrling 1“. Steht etwas Vertrauliches drin, lass es ganz weg."
      }
    ]
  },

  /* ===================== LEVEL 5 ===================== */
  {
    nummer: 5,
    titel: "KI im Lager",
    beschreibung: "KI-Ergebnisse aus Lager und Einkauf prüfen.",
    symbol: "📦",
    abzeichen: "Logistik-Profi",

    infos: [
      {
        titel: "Willkommen im Lager!",
        text: "Jetzt wird es praktisch. In diesem Level begegnet dir KI wie im echten Betrieb: beim Rechnen, Schreiben, Vergleichen und Bezahlen. Du brauchst alles, was du bisher gelernt hast:",
        liste: [
          "🤔 Nicht blind übernehmen (Level 1)",
          "💬 Gut fragen (Level 2)",
          "🧮 Nachrechnen und Fehler finden (Level 3)",
          "🚦 Datenschutz beachten (Level 4)"
        ]
      },
      {
        titel: "Vorsicht, Betrug!",
        text: "Betrüger fälschen Rechnungen und Mails – oft mit Hilfe von KI. Sie sehen täuschend echt aus. Das häufigste Warnsignal ist eine neue oder geänderte Bankverbindung. Dann gilt: nicht zahlen! Ruf beim Lieferanten an, und zwar unter der Nummer, die ihr schon kennt – nicht unter der aus der Mail."
      }
    ],

    aufgaben: [
      {
        typ: "rechnen",
        situation: "Für Klebeband-Rollen gilt: Tagesverbrauch 40 Stück, Lieferzeit 6 Tage, Mindestbestand 100 Stück. Du lässt die KI den Meldebestand berechnen.",
        kiAntwort: "Der Meldebestand ist Tagesverbrauch mal Lieferzeit.\n40 Stück × 6 Tage = 240 Stück.\nBestelle also nach, wenn der Bestand auf 240 Stück sinkt.",
        frage: "Rechne selbst nach: Wie hoch ist der Meldebestand wirklich?",
        loesung: 340,
        einheit: "Stück",
        erklaerung: "Meldebestand = Tagesverbrauch × Lieferzeit + Mindestbestand = 40 × 6 + 100 = 340 Stück. Die KI hat den Mindestbestand vergessen. Bei 240 Stück zu bestellen hieße: Wenn die Lieferung kommt, ist das Lager genau leer – ohne jede Reserve."
      },
      {
        typ: "auswahl",
        situation: "Bei einer Lieferung waren 5 von 40 Kartons beschädigt. Du hast die KI gebeten, eine Reklamation an den Lieferanten zu schreiben.",
        kiAntwort: "Betreff: Reklamation\n\nHallo,\n\ndie Lieferung von gestern ist eine absolute Frechheit! 5 Kartons waren kaputt. Das passiert bei Ihnen ja ständig. So kann man wirklich nicht arbeiten.\n\nGrüße\nLager",
        frage: "Was stimmt an dieser Mail nicht? Tippe alle Probleme an.",
        optionen: [
          "Der Ton ist zu unfreundlich für eine Geschäftsmail.",
          "Die Bestell- oder Lieferscheinnummer fehlt.",
          "Die Anzahl der beschädigten Kartons fehlt.",
          "Es steht nicht drin, was der Lieferant jetzt tun soll.",
          "„Das passiert ständig“ – das hat die KI einfach behauptet.",
          "Der Betreff fehlt."
        ],
        richtig: [1, 2, 4, 5],
        erklaerung: "Eine gute Reklamation ist sachlich, nennt Bestell- oder Lieferscheinnummer, beschreibt den Schaden und sagt, was du willst – z. B. Ersatz oder eine Gutschrift. „Das passiert ständig“ hat die KI erfunden. So etwas darf nie ungeprüft verschickt werden. Anzahl und Betreff waren übrigens vorhanden."
      },
      {
        typ: "quiz",
        situation: "Du brauchst 500 Versandkartons. Drei Lieferanten haben Angebote geschickt. Die KI soll sie vergleichen.",
        tabelle: {
          spalten: ["", "Preis pro Stück", "Versandkosten", "Lieferzeit"],
          zeilen: [
            ["Lieferant A", "0,80 €", "150 €", "10 Tage"],
            ["Lieferant B", "0,85 €", "frei", "5 Tage"],
            ["Lieferant C", "0,82 €", "40 €", "7 Tage"]
          ]
        },
        kiAntwort: "Lieferant A hat mit 0,80 € den niedrigsten Stückpreis. Ich empfehle daher Lieferant A.",
        frage: "Stimmt die Empfehlung? Welcher Lieferant ist für 500 Stück insgesamt am günstigsten?",
        antworten: [
          "Die KI hat recht: Lieferant A ist am günstigsten.",
          "Lieferant C, weil sein Preis in der Mitte liegt.",
          "Lieferant B ist insgesamt am günstigsten.",
          "Alle drei kosten insgesamt ungefähr gleich viel.",
          "Das kann man mit diesen Angaben nicht berechnen."
        ],
        richtig: 3,
        erklaerung: "Rechne die Gesamtkosten: A: 500 × 0,80 € + 150 € = 550 €. B: 500 × 0,85 € = 425 €. C: 500 × 0,82 € + 40 € = 450 €. B ist am günstigsten und liefert am schnellsten. Die KI hat nur den Stückpreis angeschaut und die Versandkosten übersehen."
      },
      {
        typ: "dokument",
        hinweis: "Holzbau Steiner GmbH ist euer Stammlieferant für Paletten. In euren Stammdaten steht seine Bankverbindung: IBAN AT48 3800 0000 0012 3456.",
        kiAntwort: "Ich habe die Rechnung geprüft: Lieferant, Menge und Beträge sind korrekt, die Umsatzsteuer ist richtig berechnet. Die Rechnung kann bezahlt werden.",
        frage: "🕵️ Detektiv-Auftrag: Tippe auf die verdächtige Stelle der Rechnung.",
        dokumentTitel: "RECHNUNG Nr. 2026-0815",
        zeilen: [
          ["Von", "Holzbau Steiner GmbH, Mitterdorf"],
          ["Datum", "8. Oktober 2026"],
          ["Leistung", "200 Europaletten à 12,00 €"],
          ["Netto", "2.400,00 €"],
          ["USt 20 %", "480,00 €"],
          ["Gesamt", "2.880,00 €"],
          ["IBAN", "LT12 3250 0123 4567 8901"],
          ["Zahlbar", "innerhalb von 14 Tagen"]
        ],
        verdaechtig: 7,
        erklaerung: "Die IBAN passt nicht zu euren Stammdaten – und LT ist ein Konto in Litauen statt AT für Österreich. Ein typisches Zeichen für Rechnungsbetrug! Die KI hat nur die Rechnung selbst geprüft, nicht eure Stammdaten. Richtig ist: nicht zahlen, beim Lieferanten unter der bekannten Nummer anrufen und die Buchhaltung informieren."
      },
      {
        typ: "auswahl",
        situation: "Für die Inventur am Jahresende brauchst du eine Zählliste. Du baust dir die Anfrage an die KI aus Bausteinen zusammen.",
        frage: "🧱 Prompt-Baukasten: Tippe die Bausteine an, die in eine gute Anfrage gehören.",
        baukasten: true,
        optionen: [
          "Erstelle eine Vorlage für eine Inventur-Zählliste für unser Lager.",
          "Mach es irgendwie schön und professionell.",
          "Spalten: Artikelnummer, Bezeichnung, Lagerplatz, Soll-Menge, Ist-Menge, Differenz.",
          "Hier ist unser Zugang zum Warenwirtschaftssystem: Benutzer lager1, Passwort Sommer2026.",
          "Als Tabelle, die ich in Excel einfügen kann, mit 20 leeren Zeilen.",
          "Füge auch die Namen und Adressen unserer zehn wichtigsten Kunden ein.",
          "Unten eine Zeile für Datum und Unterschrift der Person, die zählt."
        ],
        richtig: [1, 3, 5, 7],
        erklaerung: "Eine gute Anfrage sagt, was du brauchst (Zählliste), welche Spalten, welche Form und was noch dazugehört. „Irgendwie schön“ hilft der KI nicht weiter. Passwörter und Kundendaten gehören nie in eine KI – und für eine Zählliste braucht man sie auch gar nicht."
      }
    ]
  }
];
