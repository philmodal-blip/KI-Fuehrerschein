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
     aufgaben: [ ]                    ← die Aufgaben (kommen ab Schritt 2)
   },

   WICHTIG beim Bearbeiten:
   • Texte stehen immer zwischen "Anführungszeichen".
   • Nach jedem Eintrag steht ein Komma.
   • Ein fehlendes Komma oder Anführungszeichen stoppt die App.
     Dann am besten die letzte Änderung genau prüfen.
   ========================================================= */

const LEVELS = [
  {
    nummer: 1,
    titel: "Was ist KI?",
    beschreibung: "Grundbegriffe einfach erklärt, dann ein Mini-Quiz.",
    symbol: "🤖",
    abzeichen: "KI-Entdecker:in",
    aufgaben: []
  },
  {
    nummer: 2,
    titel: "Gut fragen",
    beschreibung: "Welche Anfrage an die KI ist besser – und warum?",
    symbol: "💬",
    abzeichen: "Prompt-Profi",
    aufgaben: []
  },
  {
    nummer: 3,
    titel: "Fehler finden",
    beschreibung: "In der KI-Antwort steckt ein Fehler. Finde ihn!",
    symbol: "🔍",
    abzeichen: "Fehlerjäger:in",
    aufgaben: []
  },
  {
    nummer: 4,
    titel: "Datenschutz-Ampel",
    beschreibung: "Welche Daten dürfen in die KI? Grün, Gelb oder Rot?",
    symbol: "🚦",
    abzeichen: "Datenschützer:in",
    aufgaben: []
  },
  {
    nummer: 5,
    titel: "KI im Lager",
    beschreibung: "KI-Ergebnisse aus Lager und Einkauf prüfen.",
    symbol: "📦",
    abzeichen: "Logistik-Profi",
    aufgaben: []
  }
];
