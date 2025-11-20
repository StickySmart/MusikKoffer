<a id="first-steps-audio-routing"></a>
# First Steps – Audio & Routing

## Kompletter Setup-Guide für deine erste Jam-Session

Diese Anleitung führt dich Schritt für Schritt durch den Aufbau des kompletten MusikKoffer-Systems – vom Auspacken bis zum ersten gemeinsamen Jam aller Geräte.

**Zeitbedarf:** ca. 20-30 Minuten
**Voraussetzungen:** Alle Geräte geladen/mit Strom versorgt, Kabel bereit

### Phase 1: Physischer Aufbau (5 Minuten)

**Schritt 1.1 – Arbeitsbereich vorbereiten**
- Ebene, stabile Fläche (mind. 80×60 cm)
- Steckdosenleiste mit 6+ Anschlüssen in Reichweite
- Alle Geräte noch AUSGESCHALTET lassen

**Schritt 1.2 – Zentrale Einheit positionieren**
- **Zoom L-6** in die Mitte des Arbeitsbereichs
- Netzteil anschließen, aber noch NICHT einschalten
- SD-Karte einlegen (für Aufnahmen, formatiert FAT32, min. 8 GB)

**Schritt 1.3 – Geräte anordnen**
```
Layout-Vorschlag (Draufsicht):

    [TR-6S]     [J-6]      [S-1]
       ↓          ↓          ↓
    ┌──────────────────────────────┐
    │       ZOOM L-6 (Mitte)       │
    │  [1][2] [3][4] [5][6]       │
    └──────────────────────────────┘
         ↓
    [Ambient Ø]  [E-4]
```

### Phase 2: Audio-Verkabelung (10 Minuten)

**Schritt 2.1 – TR-6S verbinden**
- Main Out L → L-6 Input 1 (6,3mm Klinkenkabel)
- Main Out R → L-6 Input 2 (6,3mm Klinkenkabel)
- TR-6S Output Level auf 12 Uhr (Unity)

**Schritt 2.2 – J-6 verbinden**
- Phones/Line Out → L-6 Input 3/4 (3,5mm Stereo → 2× 6,3mm Y-Kabel)
- J-6 Output Knob auf 70%

**Schritt 2.3 – E-4 verbinden**
- Line Out L → L-6 Input 5 (6,3mm Klinke)
- E-4 Output Level auf 75%

**Schritt 2.4 – S-1 verbinden**
- Output → L-6 Input 6 (6,3mm Klinke)
- S-1 Volume auf 60%

**Schritt 2.5 – Ambient Ø verbinden**
- **Option A (empfohlen):** USB-C (Ambient Ø) → USB-A (L-6)
- **Option B:** Line Out → L-6 Input 3/4 (wenn J-6 nicht genutzt)

**Schritt 2.6 – Monitor/Kopfhörer**
- Kopfhörer an L-6 Phones Out ODER
- Aktivmonitor/PA an L-6 Main Out (L/R XLR oder 6,3mm)

### Phase 3: MIDI-Verkabelung (5 Minuten)

Detaillierte MIDI-Routings siehe **Kapitel 500 (MIDI)**.

**Kurzversion für Sync:**
- CME H4 WC MIDI Out → alle Geräte MIDI In (Chain oder Star-Topologie)
- Alternativ: CME U6MIDI Pro als MIDI-Hub nutzen

### Phase 4: Power-Up Sequenz (3 Minuten)

**WICHTIG:** Reihenfolge einhalten, um Knackgeräusche zu vermeiden!

**Schritt 4.1 – L-6 vorbereiten**
1. L-6 Input Gains: Alle nach LINKS auf Minimum
2. L-6 Master Fader: Ganz nach unten (-∞ dB)
3. Phantom Power: **ALLE Kanäle OFF** überprüfen
4. Kopfhörer/Monitor-Lautstärke: Minimum

**Schritt 4.2 – Einschalten**
1. **Zoom L-6** einschalten (zuerst!)
2. Warte 5 Sekunden (L-6 bootet)
3. **Alle Synthesizer/Geräte** einschalten (TR-6S, J-6, E-4, S-1, Ambient Ø)
4. **CME H4 WC** einschalten (MIDI Clock Master)

**Schritt 4.3 – Pegel einstellen (Gain Staging)**

Für jeden Kanal nacheinander:
1. Spiele Test-Note/Pattern auf dem Gerät
2. Drehe L-6 Input Gain langsam nach rechts
3. Stoppe wenn LED **GRÜN** leuchtet (optimal) – NICHT rot!
4. Wiederhole für alle 6 Kanäle

**Orientierungswerte:**
- Kanal 1-2 (TR-6S): Gain auf ca. 10 Uhr
- Kanal 3-4 (J-6): Gain auf ca. 9 Uhr (heißes Signal)
- Kanal 5 (E-4): Gain auf ca. 10 Uhr
- Kanal 6 (S-1): Gain auf ca. 10 Uhr

**Schritt 4.4 – Master aktivieren**
- L-6 Master Fader auf **0 dB** (Unity Gain, mittige Position)
- Kopfhörer/Monitor-Lautstärke langsam hochdrehen
- Du solltest jetzt alle Geräte hören!

### Phase 5: Funktionstest (5 Minuten)

**Test 5.1 – Einzelne Kanäle checken**
- Mute alle Kanäle am L-6 außer Kanal 1
- Spiele Pattern auf TR-6S → hörst du es klar?
- Wiederhole für Kanal 2-6

**Test 5.2 – MIDI Clock Sync**
- Starte MIDI Clock am CME H4 WC (120 BPM)
- Prüfe: TR-6S Tempo-LED blinkt synchron?
- Prüfe: J-6 zeigt Clock-Symbol?
- Alle Sequenzer laufen im gleichen Tempo → ✅

**Test 5.3 – Stereo-Check**
- J-6: Spiele Akkord
- Pan-Test: Kanal 3 (L) nach links, Kanal 4 (R) nach rechts
- Im Kopfhörer: Stereo-Breite spürbar? → ✅

**Test 5.4 – Multitrack Recording Test**
- L-6: Drücke REC + PLAY
- Spiele 10 Sekunden Jam
- Stopp → Wiedergabe
- Hörst du alle Spuren? → ✅

### Phase 6: Deine erste Jam-Session!

**Jam-Vorlage "120 BPM Ambient Groove":**

1. **CME H4 WC:** Starte Clock (120 BPM)
2. **TR-6S:** Lade Preset "Kit 01", starte Pattern (Kick auf 1+3, Snare auf 2+4)
3. **Ambient Ø:** Pad-Sound, halte C2 (lange Drone-Fläche)
4. **J-6:** Chord-Mode, Akkordfolge: Cmaj → Gmaj → Am → Fmaj (pro Akkord 1 Takt)
5. **S-1:** Lead-Synth, spiele Melodie über die Akkorde
6. **E-4:** Schalte Vocoder ein, summe ins Mikrofon (wenn angeschlossen)

**Aufnahme:**
- L-6: REC + PLAY drücken → alles wird auf SD-Karte aufgenommen!
- Nach der Session: Dateien auf Computer kopieren (6 Einzelspuren + Stereo-Mix)

---

## Audio-Interface Modi des Zoom L-6

Das Zoom L-6 kann über USB als Audio-Interface mit dem Computer verbunden werden und bietet dabei **drei verschiedene Modi** für unterschiedliche Anwendungsfälle.

### Modus 1: Automatic (Standard)
**Funktion:** L-6 wählt automatisch zwischen Stereo Mix und Multitrack je nach DAW-Einstellung

**Wann nutzen:**
- Alltägliche Nutzung ohne spezielle Anforderungen
- Du möchtest nicht jedes Mal den Modus wechseln

**Verhalten:**
- DAW fordert 2 Kanäle an → sendet Stereo Mix
- DAW fordert 8 Kanäle an → sendet Multitrack (6 Einzelspuren + L/R Mix)

**Beispiel:** In Ableton Live stellst du "Audio From: Zoom L-6, 1/2" ein → bekommst Stereo Mix. Stellst du "1-8" ein → bekommst alle Einzelspuren.

---

### Modus 2: Multitrack (8in/2out)
**Funktion:** Sendet immer 8 getrennte Kanäle an den Computer

**Wann nutzen:**
- Recording in DAW mit Einzelspur-Bearbeitung
- Du möchtest nachträglich EQ, Kompression, Effekte pro Kanal
- Mixing wird am Computer gemacht, nicht am L-6

**Kanalzuordnung (DAW sieht):**
- Track 1: L-6 Input 1 (TR-6S L)
- Track 2: L-6 Input 2 (TR-6S R)
- Track 3: L-6 Input 3 (J-6 L)
- Track 4: L-6 Input 4 (J-6 R)
- Track 5: L-6 Input 5 (E-4)
- Track 6: L-6 Input 6 (S-1)
- Track 7/8: L-6 Master L/R (Stereo-Sum mit Fader-Einstellungen)

**Workflow-Beispiel:**
1. Jam-Session aufnehmen in Ableton Live (8 Spuren gleichzeitig)
2. Nachträglich jeden Synth einzeln mischen
3. TR-6S Kompression hinzufügen, ohne andere Spuren zu beeinflussen
4. Export als finaler Stereo-Mix

---

### Modus 3: Stereo Mix (2in/2out)
**Funktion:** Sendet nur den finalen Stereo-Mix (wie er am L-6 klingt)

**Wann nutzen:**
- Live-Streaming (OBS, Twitch)
- Podcast-Aufnahme (fertiger Mix direkt aufnehmen)
- Schnelles Jammen ohne Nachbearbeitung

**Was du bekommst:**
- Stereo-Signal mit allen Fader-, Pan-, EQ-Einstellungen vom L-6
- Identisch zum Kopfhörer-Ausgang
- Bereits abgemischt, sofort verwendbar

**Workflow-Beispiel:**
1. Mische alle Geräte perfekt am L-6 (Fader, Pan, etwas Reverb)
2. Starte OBS für Live-Stream
3. Audio-Quelle: "Zoom L-6 Stereo Mix"
4. Stream läuft mit perfektem Mix, keine DAW nötig

---

### Modi wechseln am Zoom L-6

**So änderst du den USB-Audio-Modus:**

1. Drücke **MENU** am L-6
2. Navigiere zu: **SYSTEM** → **USB**
3. Wähle Modus:
   - **AUTO** (empfohlen für Beginner)
   - **MULTI TRACK**
   - **STEREO MIX**
4. Bestätige mit **ENTER**
5. **Wichtig:** L-6 neu starten (aus/einschalten)
6. Computer: USB-Gerät wird neu erkannt

**Tipp:** Nach Modusänderung in deiner DAW die Audio-Preferences öffnen und "Zoom L-6" neu auswählen, damit die Kanalanzahl aktualisiert wird.

---

### Vergleichstabelle

| Kriterium | Automatic | Multitrack | Stereo Mix |
|-----------|-----------|------------|------------|
| **Kanäle an Computer** | 2 oder 8 (je nach DAW) | Immer 8 | Immer 2 |
| **Nachbearbeitung möglich?** | Ja (bei 8 Kanälen) | Ja, pro Kanal | Nein, nur Stereo |
| **CPU-Last (DAW)** | Mittel-Hoch | Hoch | Niedrig |
| **Live-Streaming geeignet** | Bedingt | Nein | Ja ✅ |
| **Recording für Mix** | Bedingt | Ja ✅ | Nein |
| **Einfachste Bedienung** | Ja ✅ | Nein | Ja ✅ |

---

## Scenes & Sound Pads am Zoom L-6

**Hinweis:** Detaillierte Informationen zu Scenes und Sound Pads findest du in der Zoom L-6 Bedienungsanleitung (siehe `docs/` Ordner, Seiten 【133†source】, 【138†source】, 【141†source】).

**Kurzübersicht:**

- **Scenes:** Speichere komplette Mixer-Einstellungen (alle Fader, Pans, Effects)
  - Nutze für verschiedene Performance-Setups
  - Beispiel: Scene 1 = "Ambient Jam", Scene 2 = "Beat-fokussiert"

- **Sound Pads:** Trigger Samples/Loops direkt vom L-6
  - 9 Pads pro Sound-Set
  - Ideal für Backing-Tracks, Vocal-Samples, FX

Ausführliche Konfigurationsanleitungen folgen in **Kapitel 320 (Workflows Audio)**.
