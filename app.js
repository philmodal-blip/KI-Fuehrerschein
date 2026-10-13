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

// ----- Eine Frage anzeigen -----
function aufgabeZeigen(nummer) {
  schritt = nummer;
  const aufgabe = level.aufgaben[nummer];
  const balkenProzent = (nummer / level.aufgaben.length) * 100;

  zeigeLevelAnsicht(
    '<p class="schritt-anzeige">Level ' + level.nummer + ' · Frage ' +
      (nummer + 1) + ' von ' + level.aufgaben.length + '</p>' +
    '<div class="balken"><div class="balken-fuellung" style="width:' + balkenProzent + '%"></div></div>' +
    '<section class="karte"><h2>' + aufgabe.frage + '</h2></section>' +
    '<div id="antworten"></div>' +
    '<div id="rueckmeldung"></div>'
  );

  // Für jede Antwortmöglichkeit einen Knopf bauen
  const bereich = document.getElementById("antworten");
  for (let i = 0; i < aufgabe.antworten.length; i++) {
    const antwortNummer = i + 1;   // Lehrkräfte zählen ab 1
    bereich.appendChild(neuerKnopf(aufgabe.antworten[i], "antwort", function () {
      antwortPruefen(antwortNummer);
    }));
  }
}

// ----- Antwort prüfen und Sofort-Feedback zeigen -----
function antwortPruefen(gewaehlt) {
  const aufgabe = level.aufgaben[schritt];
  const istRichtig = gewaehlt === aufgabe.richtig;

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

  // Punkte vergeben
  let ueberschrift;
  if (istRichtig) {
    let punkte = PUNKTE_RICHTIG;
    if (ersterVersuch) {
      punkte = punkte + PUNKTE_BONUS;
    }
    richtige = richtige + 1;
    levelPunkte = levelPunkte + punkte;
    ueberschrift = "✅ Richtig! +" + punkte + " Punkte";
  } else {
    ueberschrift = "❌ Leider falsch.";
  }

  // Erklärung anzeigen
  const rueckmeldung = document.getElementById("rueckmeldung");
  rueckmeldung.className = istRichtig ? "karte feedback gut" : "karte feedback schlecht";
  rueckmeldung.innerHTML =
    '<strong>' + ueberschrift + '</strong>' +
    '<p>' + aufgabe.erklaerung + '</p>';

  // Knopf zur nächsten Frage oder zum Ergebnis
  const istLetzte = schritt === level.aufgaben.length - 1;
  let knopfText = "Nächste Frage";
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
