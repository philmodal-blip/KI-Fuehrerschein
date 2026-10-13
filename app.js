/* =========================================================
   app.js – die Logik der App
   ---------------------------------------------------------
   Die App hat zwei Ansichten:
   • die Startseite (Punkte, Fortschritt, Level-Liste)
   • die Level-Ansicht (Info-Karten → Fragen → Ergebnis)
   Es wird immer nur eine davon angezeigt.
   ========================================================= */

// ----- Spielregeln -----
const BESTEHEN_AB_PROZENT = 60;  // ab so viel Prozent ist ein Level bestanden
const PUNKTE_RICHTIG = 10;       // Punkte pro richtiger Antwort
const PUNKTE_BONUS = 5;          // Extra-Punkte beim ersten Durchspielen eines Levels

// Unter diesem Namen speichert der Browser den Fortschritt
const SPEICHER_NAME = "ki-fuehrerschein-fortschritt";


/* =========================================================
   TEIL A: Fortschritt laden und speichern
   ---------------------------------------------------------
   "localStorage" ist ein kleiner Speicher im Browser.
   Die Daten bleiben nur auf diesem Gerät und gehen an keinen Server.
   ========================================================= */

function fortschrittLaden() {
  const gespeichert = localStorage.getItem(SPEICHER_NAME);

  if (gespeichert) {
    // Der Text wird wieder in ein JavaScript-Objekt umgewandelt
    return JSON.parse(gespeichert);
  }

  // Beim allerersten Start: leerer Fortschritt
  return {
    levels: {}   // z. B. { 1: { punkte: 55, prozent: 80 } }
  };
}

function fortschrittSpeichern(fortschritt) {
  // Das Objekt wird als Text gespeichert
  localStorage.setItem(SPEICHER_NAME, JSON.stringify(fortschritt));
}


/* ---------- Hilfsfunktionen ---------- */

// Hat man dieses Level mit mindestens 60 % bestanden?
function istBestanden(fortschritt, nummer) {
  const ergebnis = fortschritt.levels[nummer];
  return ergebnis !== undefined && ergebnis.prozent >= BESTEHEN_AB_PROZENT;
}

// Level 1 ist immer offen. Jedes weitere erst, wenn das vorige bestanden ist.
function istFreigeschaltet(fortschritt, nummer) {
  if (nummer === 1) {
    return true;
  }
  return istBestanden(fortschritt, nummer - 1);
}

// Alle Punkte aus allen Levels zusammenzählen
function gesamtPunkte(fortschritt) {
  let summe = 0;
  for (const nummer in fortschritt.levels) {
    summe = summe + fortschritt.levels[nummer].punkte;
  }
  return summe;
}

// Baut einen Knopf mit Text. "beiKlick" ist das, was beim Antippen passiert.
function neuerKnopf(text, klasse, beiKlick) {
  const knopf = document.createElement("button");
  knopf.className = klasse;
  knopf.textContent = text;
  knopf.addEventListener("click", beiKlick);
  return knopf;
}


/* =========================================================
   TEIL B: Die Startseite
   ========================================================= */

function zeigeStartseite() {
  document.getElementById("startseite").hidden = false;
  document.getElementById("level-ansicht").hidden = true;
  kopfzeileAnzeigen(fortschritt);
  fuehrerscheinHinweisAnzeigen(fortschritt);
  abzeichenAnzeigen(fortschritt);
  levelListeAnzeigen(fortschritt);
  window.scrollTo(0, 0);
}

// Sind alle Levels bestanden? Dann gibt es den Führerschein.
function alleBestanden(fortschritt) {
  for (const level of LEVELS) {
    if (!istBestanden(fortschritt, level.nummer)) {
      return false;
    }
  }
  return true;
}

// Eine runde Medaille für ein Abzeichen.
// verdient: true = Gold mit Symbol, false = grau mit Levelnummer
// extraKlasse: z. B. "gross" für die große Medaille auf dem Ergebnis-Bildschirm
function medailleHtml(level, verdient, extraKlasse) {
  if (verdient) {
    return '<div class="medaille ' + extraKlasse + '">' + level.symbol + '</div>';
  }
  return '<div class="medaille leer ' + extraKlasse + '">' + level.nummer + '</div>';
}

// Die 5 Abzeichen auf der Startseite
function abzeichenAnzeigen(fortschritt) {
  let html = "";
  for (const level of LEVELS) {
    const verdient = istBestanden(fortschritt, level.nummer);
    let name = level.abzeichen;
    if (!verdient) {
      name = "???";
    }
    html = html +
      '<div class="abzeichen">' +
        medailleHtml(level, verdient, "") +
        '<span class="abzeichen-name">' + name + '</span>' +
      '</div>';
  }
  document.getElementById("abzeichen-liste").innerHTML = html;
}

// Großer goldener Knopf zum Führerschein, sobald alles bestanden ist
function fuehrerscheinHinweisAnzeigen(fortschritt) {
  const bereich = document.getElementById("fuehrerschein-hinweis");
  bereich.innerHTML = "";
  if (alleBestanden(fortschritt)) {
    bereich.appendChild(neuerKnopf("🪪 Dein KI-Führerschein ist fertig! Ansehen", "knopf knopf-gold", function () {
      fuehrerscheinZeigen(false);
    }));
  }
}

// Punkte und Fortschrittsbalken anzeigen
function kopfzeileAnzeigen(fortschritt) {
  let bestandene = 0;
  for (const level of LEVELS) {
    if (istBestanden(fortschritt, level.nummer)) {
      bestandene = bestandene + 1;
    }
  }

  const prozent = (bestandene / LEVELS.length) * 100;

  document.getElementById("fortschritt-text").textContent =
    bestandene + " von " + LEVELS.length;
  document.getElementById("fortschritt-balken").style.width = prozent + "%";
  document.getElementById("punkte").textContent = gesamtPunkte(fortschritt);
}

// Level-Karten anzeigen (offen, erledigt oder gesperrt)
function levelListeAnzeigen(fortschritt) {
  const liste = document.getElementById("level-liste");
  liste.innerHTML = "";   // zuerst leeren

  for (const level of LEVELS) {
    // Für jedes Level einen großen Knopf bauen
    const knopf = document.createElement("button");
    knopf.className = "level";

    let symbol = level.symbol;
    let info = level.beschreibung;

    if (istBestanden(fortschritt, level.nummer)) {
      knopf.classList.add("erledigt");
      symbol = "✅";
      info = "Geschafft! " + fortschritt.levels[level.nummer].punkte + " Punkte · Nochmal spielen?";
    } else if (!istFreigeschaltet(fortschritt, level.nummer)) {
      knopf.classList.add("gesperrt");
      knopf.disabled = true;
      symbol = "🔒";
      info = "Wird nach Level " + (level.nummer - 1) + " freigeschaltet.";
    }

    knopf.innerHTML =
      '<span class="level-symbol">' + symbol + '</span>' +
      '<span class="level-text">' +
        '<span class="level-titel">Level ' + level.nummer + ': ' + level.titel + '</span>' +
        '<span class="level-info">' + info + '</span>' +
      '</span>';

    // Was beim Antippen passiert
    knopf.addEventListener("click", function () {
      levelStarten(level);
    });

    liste.appendChild(knopf);
  }
}


/* =========================================================
   TEIL C: Ein Level spielen
   ---------------------------------------------------------
   Ablauf: Info-Karten → Fragen (mit Sofort-Feedback) → Ergebnis
   ========================================================= */

// Diese Variablen merken sich, wo man gerade im Level ist
let level = null;          // das Level, das gerade gespielt wird
let schritt = 0;           // Nummer der aktuellen Frage (0 = erste)
let richtige = 0;          // wie viele Antworten bisher richtig waren
let levelPunkte = 0;       // Punkte in diesem Durchgang
let ersterVersuch = true;  // wird das Level zum ersten Mal gespielt? (für den Bonus)
let serie = 0;             // wie viele richtige Antworten hintereinander
let stapel = { gruen: 0, gelb: 0, rot: 0 };   // sortierte Karten bei der Ampel

// Zeigt die Level-Ansicht mit neuem Inhalt und versteckt die Startseite
function zeigeLevelAnsicht(html) {
  document.getElementById("startseite").hidden = true;
  const ansicht = document.getElementById("level-ansicht");
  ansicht.hidden = false;
  ansicht.innerHTML = html;
  // Oben immer ein Knopf zurück zur Startseite
  ansicht.prepend(neuerKnopf("← Zur Startseite", "zurueck", zeigeStartseite));
  window.scrollTo(0, 0);
  return ansicht;
}

function levelStarten(gewaehltesLevel) {
  // Levels ohne Aufgaben gibt es noch nicht
  if (gewaehltesLevel.aufgaben.length === 0) {
    alert("Level " + gewaehltesLevel.nummer + " wird gerade noch gebaut.");
    return;
  }

  level = gewaehltesLevel;
  schritt = 0;
  richtige = 0;
  levelPunkte = 0;
  serie = 0;
  stapel = { gruen: 0, gelb: 0, rot: 0 };
  ersterVersuch = fortschritt.levels[level.nummer] === undefined;

  if (level.infos && level.infos.length > 0) {
    infoKarteZeigen(0);
  } else {
    aufgabeZeigen(0);
  }
}

// ----- Info-Karten -----
function infoKarteZeigen(nummer) {
  const info = level.infos[nummer];
  const istLetzte = nummer === level.infos.length - 1;

  // Falls die Karte eine Aufzählung hat: jeden Punkt als Listen-Eintrag
  let listeHtml = "";
  if (info.liste) {
    listeHtml = '<ul class="info-liste">';
    for (const punkt of info.liste) {
      listeHtml = listeHtml + '<li>' + punkt + '</li>';
    }
    listeHtml = listeHtml + '</ul>';
  }

  const ansicht = zeigeLevelAnsicht(
    '<p class="schritt-anzeige">Level ' + level.nummer + ' · Info ' +
      (nummer + 1) + ' von ' + level.infos.length + '</p>' +
    '<section class="karte">' +
      '<h2>' + info.titel + '</h2>' +
      '<p>' + info.text + '</p>' +
      listeHtml +
    '</section>'
  );

  let knopfText = "Weiter";
  if (istLetzte) {
    knopfText = "Los geht's mit dem Quiz!";
  }

  ansicht.appendChild(neuerKnopf(knopfText, "knopf", function () {
    if (istLetzte) {
      aufgabeZeigen(0);
    } else {
      infoKarteZeigen(nummer + 1);
    }
  }));
}

// ----- Eine Aufgabe anzeigen -----
// Je nach "typ" der Aufgabe wird sie anders dargestellt.
function aufgabeZeigen(nummer) {
  schritt = nummer;
  const aufgabe = level.aufgaben[nummer];
  const balkenProzent = (nummer / level.aufgaben.length) * 100;

  // Oberer Teil, der bei allen Aufgabentypen gleich ist
  const kopf =
    '<p class="schritt-anzeige">Level ' + level.nummer + ' · Aufgabe ' +
      (nummer + 1) + ' von ' + level.aufgaben.length + '</p>' +
    '<div class="balken"><div class="balken-fuellung" style="width:' + balkenProzent + '%"></div></div>';

  if (aufgabe.typ === "vergleich") {
    vergleichZeigen(aufgabe, kopf);
  } else if (aufgabe.typ === "fehler") {
    fehlerZeigen(aufgabe, kopf);
  } else if (aufgabe.typ === "ampel") {
    ampelZeigen(aufgabe, kopf);
  } else if (aufgabe.typ === "rechnen") {
    rechnenZeigen(aufgabe, kopf);
  } else if (aufgabe.typ === "auswahl") {
    auswahlZeigen(aufgabe, kopf);
  } else if (aufgabe.typ === "dokument") {
    dokumentZeigen(aufgabe, kopf);
  } else {
    quizZeigen(aufgabe, kopf);
  }
}


// ----- Bausteine, die mehrere Aufgabentypen verwenden -----
// Jede Funktion liefert "" zurück, wenn es das Feld in der Aufgabe nicht gibt.

// Kasten "📌 Die Situation"
function situationHtml(aufgabe) {
  if (!aufgabe.situation) {
    return "";
  }
  return '<section class="karte">' +
      '<p class="situation-titel">📌 Die Situation</p>' +
      '<p>' + aufgabe.situation + '</p>' +
    '</section>';
}

// Graue Sprechblase mit der Antwort der KI
function kiAntwortHtml(aufgabe, titel) {
  if (!aufgabe.kiAntwort) {
    return "";
  }
  return '<div class="ki-sprechblase">' +
      '<p class="situation-titel">🤖 ' + titel + '</p>' +
      '<div class="ki-text">' + aufgabe.kiAntwort + '</div>' +
    '</div>';
}

// Tabelle, z. B. für einen Angebotsvergleich
function tabelleHtml(aufgabe) {
  if (!aufgabe.tabelle) {
    return "";
  }
  let html = '<div class="tabelle-rahmen"><table class="tabelle"><tr>';
  for (const spalte of aufgabe.tabelle.spalten) {
    html = html + '<th>' + spalte + '</th>';
  }
  html = html + '</tr>';
  for (const zeile of aufgabe.tabelle.zeilen) {
    html = html + '<tr>';
    for (const zelle of zeile) {
      html = html + '<td>' + zelle + '</td>';
    }
    html = html + '</tr>';
  }
  return html + '</table></div>';
}


// ----- Aufgabentyp "quiz": eine Frage, mehrere Antworten -----
function quizZeigen(aufgabe, kopf) {
  zeigeLevelAnsicht(
    kopf +
    situationHtml(aufgabe) +
    tabelleHtml(aufgabe) +
    kiAntwortHtml(aufgabe, "Die KI sagt:") +
    '<section class="karte"><h2>' + aufgabe.frage + '</h2></section>' +
    '<div id="antworten"></div>' +
    '<div id="rueckmeldung"></div>'
  );

  // Für jede Antwortmöglichkeit einen Knopf bauen
  const bereich = document.getElementById("antworten");
  for (let i = 0; i < aufgabe.antworten.length; i++) {
    const antwortNummer = i + 1;   // Lehrkräfte zählen ab 1
    bereich.appendChild(neuerKnopf(aufgabe.antworten[i], "antwort", function () {
      quizPruefen(aufgabe, antwortNummer);
    }));
  }
}

function quizPruefen(aufgabe, gewaehlt) {
  // Alle Antwort-Knöpfe sperren und einfärben
  const knoepfe = document.querySelectorAll(".antwort");
  for (let i = 0; i < knoepfe.length; i++) {
    knoepfe[i].disabled = true;
    if (i + 1 === aufgabe.richtig) {
      knoepfe[i].classList.add("richtig");
    } else if (i + 1 === gewaehlt) {
      knoepfe[i].classList.add("falsch");
    }
  }

  rueckmeldungZeigen(gewaehlt === aufgabe.richtig, aufgabe.erklaerung, "");
}


// ----- Aufgabentyp "vergleich": welche von zwei Anfragen ist besser? -----
function vergleichZeigen(aufgabe, kopf) {
  zeigeLevelAnsicht(
    kopf +
    '<section class="karte">' +
      '<p class="situation-titel">📌 Die Situation</p>' +
      '<p>' + aufgabe.situation + '</p>' +
    '</section>' +
    '<h2 class="frage-klein">Welche Anfrage an die KI ist besser?</h2>' +
    '<div id="antworten"></div>' +
    '<div id="rueckmeldung"></div>'
  );

  // Die beiden Anfragen als große Knöpfe
  const texte = { A: aufgabe.anfrageA, B: aufgabe.anfrageB };
  const bereich = document.getElementById("antworten");

  for (const buchstabe of ["A", "B"]) {
    const knopf = document.createElement("button");
    knopf.className = "antwort anfrage";
    knopf.innerHTML =
      '<span class="anfrage-label">Anfrage ' + buchstabe + '</span>' +
      '<span class="anfrage-text">„' + texte[buchstabe] + '“</span>';
    knopf.addEventListener("click", function () {
      vergleichPruefen(aufgabe, buchstabe);
    });
    bereich.appendChild(knopf);
  }
}

function vergleichPruefen(aufgabe, gewaehlt) {
  // Knöpfe sperren und einfärben (Knopf 0 ist A, Knopf 1 ist B)
  const knoepfe = document.querySelectorAll(".antwort");
  const buchstaben = ["A", "B"];
  for (let i = 0; i < knoepfe.length; i++) {
    knoepfe[i].disabled = true;
    if (buchstaben[i] === aufgabe.besser) {
      knoepfe[i].classList.add("richtig");
    } else if (buchstaben[i] === gewaehlt) {
      knoepfe[i].classList.add("falsch");
    }
  }

  // Falls vorhanden: zeigen, was die KI auf beide Anfragen geantwortet hätte
  let zusatz = "";
  if (aufgabe.ergebnisA && aufgabe.ergebnisB) {
    zusatz =
      '<p class="situation-titel">🤖 So hätte die KI geantwortet:</p>' +
      '<div class="ki-antwort"><strong>Auf Anfrage A:</strong> ' + aufgabe.ergebnisA + '</div>' +
      '<div class="ki-antwort"><strong>Auf Anfrage B:</strong> ' + aufgabe.ergebnisB + '</div>';
  }

  rueckmeldungZeigen(gewaehlt === aufgabe.besser, aufgabe.erklaerung, zusatz);
}


// ----- Aufgabentyp "fehler": tippe auf den falschen Satz -----
function fehlerZeigen(aufgabe, kopf) {
  zeigeLevelAnsicht(
    kopf +
    '<section class="karte">' +
      '<p class="situation-titel">🙋 Du hast die KI gefragt:</p>' +
      '<p>„' + aufgabe.frage + '“</p>' +
    '</section>' +
    '<h2 class="frage-klein">🤖 Die KI antwortet – tippe auf den Satz mit dem Fehler:</h2>' +
    '<div id="antworten" class="ki-sprechblase"></div>' +
    '<div id="rueckmeldung"></div>'
  );

  // Jeder Satz der KI-Antwort wird ein eigener Knopf
  const bereich = document.getElementById("antworten");
  for (let i = 0; i < aufgabe.saetze.length; i++) {
    const satzNummer = i + 1;   // Lehrkräfte zählen ab 1
    bereich.appendChild(neuerKnopf(aufgabe.saetze[i], "antwort satz", function () {
      fehlerPruefen(aufgabe, satzNummer);
    }));
  }
}

function fehlerPruefen(aufgabe, gewaehlt) {
  // Sätze sperren: der falsche Satz wird markiert, ein falsch getippter auch
  const knoepfe = document.querySelectorAll(".antwort");
  for (let i = 0; i < knoepfe.length; i++) {
    knoepfe[i].disabled = true;
    if (i + 1 === aufgabe.fehler) {
      knoepfe[i].classList.add("richtig");
    } else if (i + 1 === gewaehlt) {
      knoepfe[i].classList.add("falsch");
    }
  }

  rueckmeldungZeigen(gewaehlt === aufgabe.fehler, aufgabe.erklaerung, "");
}


// ----- Aufgabentyp "ampel": Datenkarte auf Grün, Gelb oder Rot sortieren -----

// Die drei Ampel-Farben mit ihrer Beschriftung
const AMPEL = [
  { farbe: "gruen", text: "Grün – darf in die KI",    symbol: "🟢" },
  { farbe: "gelb",  text: "Gelb – nur anonymisiert",  symbol: "🟡" },
  { farbe: "rot",   text: "Rot – niemals",            symbol: "🔴" }
];

// Erlaubt auch "grün" mit ü, falls jemand das so in aufgaben.js schreibt
function farbeOhneUmlaut(farbe) {
  return farbe.toLowerCase().replace("ü", "ue");
}

function ampelZeigen(aufgabe, kopf) {
  zeigeLevelAnsicht(
    kopf +
    // Die drei Stapel oben zeigen, wie viele Karten schon sortiert sind
    '<div class="stapel-reihe">' +
      '<span class="stapel" id="stapel-gruen">🟢 ' + stapel.gruen + '</span>' +
      '<span class="stapel" id="stapel-gelb">🟡 ' + stapel.gelb + '</span>' +
      '<span class="stapel" id="stapel-rot">🔴 ' + stapel.rot + '</span>' +
    '</div>' +
    // Die Datenkarte
    '<div class="datenkarte" id="datenkarte">' +
      '<div class="datenkarte-symbol">' + aufgabe.symbol + '</div>' +
      '<p>' + aufgabe.daten + '</p>' +
    '</div>' +
    '<h2 class="frage-klein ampel-frage">Darf das in die KI?</h2>' +
    '<div id="antworten" class="ampel"></div>' +
    '<div id="rueckmeldung"></div>'
  );

  // Die Ampel: drei Lichter als Knöpfe
  const bereich = document.getElementById("antworten");
  for (const licht of AMPEL) {
    const knopf = document.createElement("button");
    knopf.className = "ampel-licht " + licht.farbe;
    knopf.innerHTML = '<span class="licht"></span><span>' + licht.text + '</span>';
    knopf.addEventListener("click", function () {
      ampelPruefen(aufgabe, licht.farbe);
    });
    bereich.appendChild(knopf);
  }
}

function ampelPruefen(aufgabe, gewaehlt) {
  const richtigeFarbe = farbeOhneUmlaut(aufgabe.farbe);
  const istRichtig = gewaehlt === richtigeFarbe;

  // Lichter sperren: die richtige Farbe leuchtet, eine falsche Wahl bekommt ein ✗
  const knoepfe = document.querySelectorAll(".ampel-licht");
  for (let i = 0; i < knoepfe.length; i++) {
    knoepfe[i].disabled = true;
    if (AMPEL[i].farbe === richtigeFarbe) {
      knoepfe[i].classList.add("an");
    } else if (AMPEL[i].farbe === gewaehlt) {
      knoepfe[i].classList.add("falsch");
    }
  }

  // Stempel auf die Karte drücken
  let richtigesLicht = AMPEL[0];
  for (const licht of AMPEL) {
    if (licht.farbe === richtigeFarbe) {
      richtigesLicht = licht;
    }
  }
  const stempel = document.createElement("div");
  stempel.className = "stempel " + richtigeFarbe;
  stempel.textContent = richtigesLicht.symbol + " " + richtigesLicht.text.split(" – ")[0].toUpperCase();
  document.getElementById("datenkarte").appendChild(stempel);

  // Karte kommt auf den richtigen Stapel
  stapel[richtigeFarbe] = stapel[richtigeFarbe] + 1;
  const stapelAnzeige = document.getElementById("stapel-" + richtigeFarbe);
  stapelAnzeige.textContent = richtigesLicht.symbol + " " + stapel[richtigeFarbe];
  stapelAnzeige.classList.add("hupf");

  // Bei falscher Wahl: sagen, was richtig gewesen wäre
  let erklaerung = aufgabe.erklaerung;
  if (!istRichtig) {
    erklaerung = '<b>Richtig wäre: ' + richtigesLicht.symbol + ' ' + richtigesLicht.text + '.</b><br>' + erklaerung;
  }

  rueckmeldungZeigen(istRichtig, erklaerung, "");
}


// ----- Aufgabentyp "rechnen": selbst nachrechnen und Zahl eintippen -----
function rechnenZeigen(aufgabe, kopf) {
  const ansicht = zeigeLevelAnsicht(
    kopf +
    situationHtml(aufgabe) +
    kiAntwortHtml(aufgabe, "Die KI rechnet:") +
    '<h2 class="frage-klein">🧮 ' + aufgabe.frage + '</h2>' +
    '<div class="eingabe-zeile">' +
      // inputmode="decimal" öffnet am Handy die Zahlen-Tastatur
      '<input id="eingabe" class="eingabe" type="text" inputmode="decimal" autocomplete="off" placeholder="?">' +
      '<span class="einheit">' + (aufgabe.einheit || "") + '</span>' +
    '</div>' +
    '<div id="pruef-bereich"></div>' +
    '<div id="rueckmeldung"></div>'
  );

  const pruefKnopf = neuerKnopf("Prüfen", "knopf", function () {
    rechnenPruefen(aufgabe);
  });
  pruefKnopf.id = "pruefen";
  document.getElementById("pruef-bereich").appendChild(pruefKnopf);

  // Auch die Enter-Taste prüft
  document.getElementById("eingabe").addEventListener("keydown", function (ereignis) {
    if (ereignis.key === "Enter") {
      rechnenPruefen(aufgabe);
    }
  });
}

function rechnenPruefen(aufgabe) {
  const feld = document.getElementById("eingabe");
  if (feld.disabled) {
    return;   // schon geprüft
  }

  // Komma erlauben: "12,5" wird zu "12.5"
  const text = feld.value.trim().replace(",", ".");
  if (text === "" || isNaN(Number(text))) {
    feld.classList.add("leer");
    feld.placeholder = "Zahl?";
    feld.focus();
    return;
  }

  const istRichtig = Math.abs(Number(text) - aufgabe.loesung) < 0.01;

  feld.disabled = true;
  feld.classList.remove("leer");
  feld.classList.add(istRichtig ? "eingabe-richtig" : "eingabe-falsch");
  document.getElementById("pruef-bereich").innerHTML = "";

  let erklaerung = aufgabe.erklaerung;
  if (!istRichtig) {
    erklaerung = '<b>Richtig wäre: ' + String(aufgabe.loesung).replace(".", ",") + ' ' +
      (aufgabe.einheit || "") + '.</b><br>' + erklaerung;
  }
  rueckmeldungZeigen(istRichtig, erklaerung, "");
}


// ----- Aufgabentyp "auswahl": mehrere richtige Antworten antippen -----
function auswahlZeigen(aufgabe, kopf) {
  let vorschau = "";
  if (aufgabe.baukasten) {
    vorschau = '<div class="vorschau" id="vorschau"></div>';
  }

  zeigeLevelAnsicht(
    kopf +
    situationHtml(aufgabe) +
    kiAntwortHtml(aufgabe, "Die KI hat geschrieben:") +
    '<h2 class="frage-klein">' + aufgabe.frage + '</h2>' +
    '<div id="antworten"></div>' +
    vorschau +
    '<div id="pruef-bereich"></div>' +
    '<div id="rueckmeldung"></div>'
  );

  const pruefKnopf = neuerKnopf("Prüfen", "knopf", function () {
    auswahlPruefen(aufgabe);
  });
  document.getElementById("pruef-bereich").appendChild(pruefKnopf);

  // Jede Option kann an- und wieder abgewählt werden
  const bereich = document.getElementById("antworten");
  for (const text of aufgabe.optionen) {
    const knopf = document.createElement("button");
    knopf.className = "antwort option";
    knopf.textContent = text;
    knopf.addEventListener("click", function () {
      knopf.classList.toggle("gewaehlt");
      pruefKnopf.textContent = "Prüfen";   // falls vorher ein Hinweis dort stand
      vorschauAktualisieren(aufgabe);
    });
    bereich.appendChild(knopf);
  }

  vorschauAktualisieren(aufgabe);
}

// Beim Baukasten: die gewählten Bausteine als fertige Anfrage anzeigen
function vorschauAktualisieren(aufgabe) {
  if (!aufgabe.baukasten) {
    return;
  }
  let text = "";
  for (const knopf of document.querySelectorAll(".option.gewaehlt")) {
    text = text + knopf.textContent + " ";
  }
  if (text === "") {
    text = "<i>Noch leer – tippe oben Bausteine an.</i>";
  }
  document.getElementById("vorschau").innerHTML =
    '<p class="situation-titel">📝 Deine Anfrage an die KI:</p><p>' + text + '</p>';
}

function auswahlPruefen(aufgabe) {
  const knoepfe = document.querySelectorAll(".option");

  // Ohne Auswahl wird noch nicht geprüft
  if (document.querySelectorAll(".option.gewaehlt").length === 0) {
    document.getElementById("pruef-bereich").querySelector(".knopf").textContent =
      "Tippe zuerst mindestens eine Antwort an";
    return;
  }

  let gefunden = 0;      // richtige, die angetippt wurden
  let falschGetippt = 0; // falsche, die angetippt wurden
  let alleRichtig = true;

  for (let i = 0; i < knoepfe.length; i++) {
    const sollGewaehltSein = aufgabe.richtig.includes(i + 1);
    const istGewaehlt = knoepfe[i].classList.contains("gewaehlt");
    knoepfe[i].disabled = true;

    if (sollGewaehltSein && istGewaehlt) {
      knoepfe[i].classList.add("richtig");
      gefunden = gefunden + 1;
    } else if (sollGewaehltSein && !istGewaehlt) {
      knoepfe[i].classList.add("fehlt");
      alleRichtig = false;
    } else if (!sollGewaehltSein && istGewaehlt) {
      knoepfe[i].classList.add("falsch");
      falschGetippt = falschGetippt + 1;
      alleRichtig = false;
    }
  }

  document.getElementById("pruef-bereich").innerHTML = "";

  let erklaerung = aufgabe.erklaerung;
  if (!alleRichtig) {
    let bilanz = 'Du hast ' + gefunden + ' von ' + aufgabe.richtig.length + ' richtigen gefunden';
    if (falschGetippt > 0) {
      bilanz = bilanz + ' und ' + falschGetippt + ' falsche angetippt';
    }
    erklaerung = '<b>' + bilanz + '.</b><br>' + erklaerung;
  }
  rueckmeldungZeigen(alleRichtig, erklaerung, "");
}


// ----- Aufgabentyp "dokument": verdächtige Stelle in einem Dokument finden -----
function dokumentZeigen(aufgabe, kopf) {
  let hinweis = "";
  if (aufgabe.hinweis) {
    hinweis = '<section class="karte">' +
        '<p class="situation-titel">📇 Gut zu wissen</p>' +
        '<p>' + aufgabe.hinweis + '</p>' +
      '</section>';
  }

  zeigeLevelAnsicht(
    kopf +
    hinweis +
    kiAntwortHtml(aufgabe, "Die KI sagt:") +
    '<h2 class="frage-klein">' + aufgabe.frage + '</h2>' +
    '<div class="dokument">' +
      '<div class="dokument-titel">' + aufgabe.dokumentTitel + '</div>' +
      '<div id="antworten"></div>' +
    '</div>' +
    '<div id="rueckmeldung"></div>'
  );

  // Jede Zeile des Dokuments ist antippbar
  const bereich = document.getElementById("antworten");
  for (let i = 0; i < aufgabe.zeilen.length; i++) {
    const zeilenNummer = i + 1;
    const knopf = document.createElement("button");
    knopf.className = "antwort dokument-zeile";
    knopf.innerHTML =
      '<span class="dokument-label">' + aufgabe.zeilen[i][0] + '</span>' +
      '<span class="dokument-wert">' + aufgabe.zeilen[i][1] + '</span>';
    knopf.addEventListener("click", function () {
      dokumentPruefen(aufgabe, zeilenNummer);
    });
    bereich.appendChild(knopf);
  }
}

function dokumentPruefen(aufgabe, gewaehlt) {
  const knoepfe = document.querySelectorAll(".dokument-zeile");
  for (let i = 0; i < knoepfe.length; i++) {
    knoepfe[i].disabled = true;
    if (i + 1 === aufgabe.verdaechtig) {
      knoepfe[i].classList.add("richtig");
    } else if (i + 1 === gewaehlt) {
      knoepfe[i].classList.add("falsch");
    }
  }

  rueckmeldungZeigen(gewaehlt === aufgabe.verdaechtig, aufgabe.erklaerung, "");
}


// ----- Sofort-Feedback: für alle Aufgabentypen gleich -----
// istRichtig: true oder false
// erklaerung: der Text aus aufgaben.js
// zusatz: weiterer Inhalt unter der Erklärung (oder "")
function rueckmeldungZeigen(istRichtig, erklaerung, zusatz) {
  // Punkte vergeben
  let ueberschrift;
  if (istRichtig) {
    let punkte = PUNKTE_RICHTIG;
    if (ersterVersuch) {
      punkte = punkte + PUNKTE_BONUS;
    }
    richtige = richtige + 1;
    levelPunkte = levelPunkte + punkte;
    serie = serie + 1;
    ueberschrift = "✅ Richtig! +" + punkte + " Punkte";
    // Ab 3 richtigen Antworten hintereinander gibt es eine Serien-Anzeige
    if (serie >= 3) {
      ueberschrift = ueberschrift + " · 🔥 " + serie + " in Folge!";
    }
  } else {
    serie = 0;
    ueberschrift = "❌ Leider falsch.";
  }

  // Erklärung anzeigen
  const rueckmeldung = document.getElementById("rueckmeldung");
  rueckmeldung.className = istRichtig ? "karte feedback gut" : "karte feedback schlecht";
  rueckmeldung.innerHTML =
    '<strong>' + ueberschrift + '</strong>' +
    '<p>' + erklaerung + '</p>' +
    zusatz;

  // Knopf zur nächsten Aufgabe oder zum Ergebnis
  const istLetzte = schritt === level.aufgaben.length - 1;
  let knopfText = "Nächste Aufgabe";
  if (istLetzte) {
    knopfText = "Zum Ergebnis";
  }
  rueckmeldung.appendChild(neuerKnopf(knopfText, "knopf", function () {
    if (istLetzte) {
      ergebnisZeigen();
    } else {
      aufgabeZeigen(schritt + 1);
    }
  }));

  // Am Handy zur Erklärung scrollen, damit man sie sicher sieht
  rueckmeldung.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ----- Ergebnis am Ende des Levels -----
function ergebnisZeigen() {
  const anzahl = level.aufgaben.length;
  const prozent = Math.round((richtige / anzahl) * 100);
  const bestanden = prozent >= BESTEHEN_AB_PROZENT;
  const warSchonBestanden = istBestanden(fortschritt, level.nummer);

  // Speichern: Es zählt immer das beste Ergebnis
  const alt = fortschritt.levels[level.nummer];
  if (alt === undefined) {
    fortschritt.levels[level.nummer] = { punkte: levelPunkte, prozent: prozent };
  } else {
    alt.punkte = Math.max(alt.punkte, levelPunkte);
    alt.prozent = Math.max(alt.prozent, prozent);
  }
  fortschrittSpeichern(fortschritt);

  // Passende Nachricht
  let titel;
  let nachricht;
  if (bestanden) {
    titel = "🎉 Bestanden!";
    nachricht = "Super gemacht!";
    if (!warSchonBestanden && level.nummer < LEVELS.length) {
      nachricht = "Level " + (level.nummer + 1) + " ist jetzt freigeschaltet.";
    }
  } else {
    titel = "💪 Fast geschafft!";
    nachricht = "Du brauchst mindestens " + BESTEHEN_AB_PROZENT +
      " % richtige Antworten. Versuch es gleich nochmal!";
  }

  // Beim ersten Bestehen gibt es ein neues Abzeichen
  let abzeichen = "";
  if (bestanden && !warSchonBestanden) {
    abzeichen =
      '<div class="neues-abzeichen">' +
        medailleHtml(level, true, "gross") +
        '<p class="abzeichen-titel">🏅 Neues Abzeichen!</p>' +
        '<p class="abzeichen-gross-name">' + level.abzeichen + '</p>' +
      '</div>';
  }

  const ansicht = zeigeLevelAnsicht(
    '<section class="karte ergebnis">' +
      '<h2>' + titel + '</h2>' +
      '<p class="ergebnis-zahl">' + richtige + ' von ' + anzahl + ' richtig</p>' +
      '<p>' + prozent + ' % · ⭐ ' + levelPunkte + ' Punkte</p>' +
      abzeichen +
      '<p>' + nachricht + '</p>' +
    '</section>'
  );

  // Alle Levels geschafft? Dann zuerst der Weg zum Führerschein
  if (bestanden && alleBestanden(fortschritt)) {
    ansicht.appendChild(neuerKnopf("🪪 Zum KI-Führerschein", "knopf knopf-gold", function () {
      fuehrerscheinZeigen(false);
    }));
  }

  ansicht.appendChild(neuerKnopf("Zur Startseite", "knopf", zeigeStartseite));
  ansicht.appendChild(neuerKnopf("Nochmal spielen", "knopf knopf-zweit", function () {
    levelStarten(level);
  }));
}


/* =========================================================
   TEIL D: Der KI-Führerschein
   ---------------------------------------------------------
   Nach allen 5 Levels: Vorname eingeben, dann wird der
   Führerschein mit Vorname und Datum angezeigt.
   Der Vorname wird nur auf diesem Gerät gespeichert.
   ========================================================= */

// Das heutige Datum als Text, z. B. "2026-10-13" (nach österreichischer Ortszeit)
function heute() {
  const jetzt = new Date();
  const monat = String(jetzt.getMonth() + 1).padStart(2, "0");
  const tag = String(jetzt.getDate()).padStart(2, "0");
  return jetzt.getFullYear() + "-" + monat + "-" + tag;
}

// Wandelt "2026-10-13" in "13. Oktober 2026" um
function datumSchoen(datum) {
  const teile = datum.split("-");   // ["2026", "10", "13"]
  const tag = new Date(Number(teile[0]), Number(teile[1]) - 1, Number(teile[2]));
  return tag.toLocaleDateString("de-AT", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// neu: true = gerade eben ausgestellt (dann gibt es Konfetti)
function fuehrerscheinZeigen(neu) {
  // Sicherheitshalber: ohne alle Levels kein Führerschein
  if (!alleBestanden(fortschritt)) {
    zeigeStartseite();
    return;
  }

  if (!fortschritt.vorname) {
    vornameAbfragen();
    return;
  }

  // Die "Klassen" auf dem Führerschein = die 5 Abzeichen
  let klassen = "";
  for (const level of LEVELS) {
    klassen = klassen +
      '<div class="fs-klasse">' +
        medailleHtml(level, true, "klein") +
        '<span>' + level.abzeichen + '</span>' +
      '</div>';
  }

  const ansicht = zeigeLevelAnsicht(
    '<div class="fuehrerschein">' +
      '<div class="fs-kopf">' +
        '<img class="fs-logo" src="logo.png" alt="Logo LBS Mitterdorf">' +
        '<div>' +
          '<div class="fs-titel">KI-FÜHRERSCHEIN</div>' +
          '<div class="fs-unter">LBS Mitterdorf · Betriebslogistik</div>' +
        '</div>' +
      '</div>' +
      '<div class="fs-inhalt">' +
        '<div class="fs-feld"><span class="fs-label">Inhaber:in</span>' +
          '<span class="fs-wert fs-name" id="fs-name"></span></div>' +
        '<div class="fs-feld"><span class="fs-label">Ausgestellt am</span>' +
          '<span class="fs-wert">' + datumSchoen(fortschritt.datum) + '</span></div>' +
        '<div class="fs-feld"><span class="fs-label">Punkte</span>' +
          '<span class="fs-wert">⭐ ' + gesamtPunkte(fortschritt) + '</span></div>' +
        '<div class="fs-label">Erworbene Klassen</div>' +
        '<div class="fs-klassen">' + klassen + '</div>' +
      '</div>' +
      '<div class="fs-siegel">✓<br>BESTANDEN</div>' +
    '</div>' +
    '<p class="fs-hinweis">Zeig diesen Führerschein deiner Lehrkraft. 🎓</p>'
  );

  // Den Namen mit textContent einsetzen: So wird er immer als
  // normaler Text angezeigt, egal welche Zeichen jemand eintippt.
  document.getElementById("fs-name").textContent = fortschritt.vorname;

  ansicht.appendChild(neuerKnopf("Zur Startseite", "knopf", zeigeStartseite));
  ansicht.appendChild(neuerKnopf("Vorname ändern", "knopf knopf-zweit", vornameAbfragen));

  if (neu) {
    konfettiWerfen();
  }
}

// Formular: Vorname eingeben
function vornameAbfragen() {
  const ansicht = zeigeLevelAnsicht(
    '<section class="karte ergebnis">' +
      '<div class="fs-pokal">🏆</div>' +
      '<h2>Du hast alle 5 Levels geschafft!</h2>' +
      '<p>Jetzt bekommst du deinen KI-Führerschein. Wie heißt du mit Vornamen?</p>' +
      '<input id="vorname" class="eingabe vorname-feld" type="text" maxlength="30" ' +
        'autocomplete="given-name" placeholder="Vorname">' +
      '<p class="klein">🔒 Dein Vorname bleibt nur auf diesem Gerät gespeichert.</p>' +
    '</section>'
  );

  const feld = document.getElementById("vorname");
  if (fortschritt.vorname) {
    feld.value = fortschritt.vorname;   // beim Ändern: alten Namen vorausfüllen
  }

  function ausstellen() {
    const name = feld.value.trim();
    if (name === "") {
      feld.classList.add("leer");
      feld.focus();
      return;
    }
    fortschritt.vorname = name;
    // Das Datum wird nur beim ersten Ausstellen gesetzt und bleibt dann gleich
    if (!fortschritt.datum) {
      fortschritt.datum = heute();
    }
    fortschrittSpeichern(fortschritt);
    fuehrerscheinZeigen(true);
  }

  ansicht.appendChild(neuerKnopf("🪪 Führerschein ausstellen", "knopf knopf-gold", ausstellen));
  feld.addEventListener("keydown", function (ereignis) {
    if (ereignis.key === "Enter") {
      ausstellen();
    }
  });
}

// Ein bisschen Konfetti zum Feiern (verschwindet nach 4 Sekunden von selbst)
function konfettiWerfen() {
  const zeichen = ["🎉", "⭐", "🎊", "✨", "🏅"];
  for (let i = 0; i < 24; i++) {
    const stueck = document.createElement("span");
    stueck.className = "konfetti";
    stueck.textContent = zeichen[i % zeichen.length];
    stueck.style.left = Math.random() * 100 + "vw";
    stueck.style.animationDelay = Math.random() * 1.2 + "s";
    document.body.appendChild(stueck);
    setTimeout(function () {
      stueck.remove();
    }, 4000);
  }
}


/* =========================================================
   Start der App
   Diese Zeilen laufen, sobald die Seite geladen ist.
   ========================================================= */
const fortschritt = fortschrittLaden();
zeigeStartseite();
