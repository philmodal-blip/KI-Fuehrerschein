/* =========================================================
   app.js – die Logik der App
   ---------------------------------------------------------
   In Schritt 1 macht diese Datei drei Dinge:
   1. Den gespeicherten Fortschritt vom Gerät laden
   2. Punkte und Fortschrittsbalken anzeigen
   3. Die Level-Karten anzeigen (offen, erledigt oder gesperrt)
   ========================================================= */

// Ab so viel Prozent gilt ein Level als bestanden
const BESTEHEN_AB_PROZENT = 60;

// Unter diesem Namen speichert der Browser den Fortschritt
const SPEICHER_NAME = "ki-fuehrerschein-fortschritt";


/* ---------- 1. Fortschritt laden und speichern ----------
   "localStorage" ist ein kleiner Speicher im Browser.
   Die Daten bleiben nur auf diesem Gerät und gehen an keinen Server. */

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


/* ---------- 2. Punkte und Fortschrittsbalken anzeigen ---------- */

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


/* ---------- 3. Level-Karten anzeigen ---------- */

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
      info = "Geschafft! " + fortschritt.levels[level.nummer].punkte + " Punkte";
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

// Platzhalter: Die Levels selbst bauen wir ab Schritt 2
function levelStarten(level) {
  alert("Level " + level.nummer + " „" + level.titel + "“ kommt im nächsten Schritt.");
}


/* ---------- Start der App ----------
   Diese Zeilen laufen, sobald die Seite geladen ist. */
const fortschritt = fortschrittLaden();
kopfzeileAnzeigen(fortschritt);
levelListeAnzeigen(fortschritt);
