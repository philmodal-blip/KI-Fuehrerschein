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
  levelListeAnzeigen(fortschritt);
  window.scrollTo(0, 0);
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
  } else {
    quizZeigen(aufgabe, kopf);
  }
}


// ----- Aufgabentyp "quiz": eine Frage, mehrere Antworten -----
function quizZeigen(aufgabe, kopf) {
  zeigeLevelAnsicht(
    kopf +
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

  const ansicht = zeigeLevelAnsicht(
    '<section class="karte ergebnis">' +
      '<h2>' + titel + '</h2>' +
      '<p class="ergebnis-zahl">' + richtige + ' von ' + anzahl + ' richtig</p>' +
      '<p>' + prozent + ' % · ⭐ ' + levelPunkte + ' Punkte</p>' +
      '<p>' + nachricht + '</p>' +
    '</section>'
  );

  ansicht.appendChild(neuerKnopf("Zur Startseite", "knopf", zeigeStartseite));
  ansicht.appendChild(neuerKnopf("Nochmal spielen", "knopf knopf-zweit", function () {
    levelStarten(level);
  }));
}


/* =========================================================
   Start der App
   Diese Zeilen laufen, sobald die Seite geladen ist.
   ========================================================= */
const fortschritt = fortschrittLaden();
zeigeStartseite();
