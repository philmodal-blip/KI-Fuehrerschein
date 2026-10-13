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
     text: "Kurze Sätze. Einfache Wörter."
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
          "Er kopiert immer die erste Seite aus dem Internet."
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
          "Nur kurze Antworten können falsch sein."
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
          "Die KI antwortet besonders kreativ, und das ist immer gut."
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
          "Die KI schreibt einen ersten Entwurf für eine Mail. Ich prüfe ihn dann."
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
          "Die KI rechnet absichtlich falsch."
        ],
        richtig: 2,
        erklaerung: "Viele KIs haben nur bis zu einem Stichtag gelernt. Aktuelle Preise kennen sie oft nicht. Auch wenn die KI im Internet sucht: Prüfe die Quelle."
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
    aufgaben: []
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
