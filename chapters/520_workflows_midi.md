<a id="workflows-midi"></a>
# Workflows MIDI

Dieses Kapitel beschreibt bewährte MIDI-Workflows für verschiedene Performance- und Produktions-Szenarien mit dem MusikKoffer-Setup.

## WF-M1: U6 Master + U6 Distribution (Standard-Jam)

**Ziel:** Alle Geräte synchron spielen, J-6 steuert S-1.

**Geräte:** T-8 (Clock), J-6, S-1, Ambient Ø, CME U6 #1 + #2, Merge 5, Zoom L-6

**Setup-Zeit:** 5 Minuten (nach Initial-Setup)
**Best für:** Standard-Jam-Sessions, Live-Performances, Sounddesign

### Schritt-für-Schritt Anleitung

**Vorbereitung:**
1. MIDI-Verkabelung wie in Kapitel 510 aufbauen
2. Alle Geräte auf korrektem MIDI-Kanal (siehe Kapitel 500)
3. T-8 auf **Internal Sync** (Clock Master)

**Jam starten:**
1. **T-8:** Tempo einstellen (z.B. 110 BPM)
2. **T-8:** Pattern auswählen → `PLAY` drücken
3. **J-6:** Sollte jetzt Clock empfangen (LED blinkt synchron)
4. **S-1 / Ambient Ø:** Empfangen Clock, bereit zum Spielen

**Live-Routing wechseln:**

Während der Performance kannst du das Note-Routing ändern:

| U6 Preset | J-6 Notes → | Sound-Charakter |
|-----------|-------------|-----------------|
| P01 | S-1 | Klare Lead-Synth-Melodien |
| P02 | S-1 + Ambient Ø | Layer mit Pads |

**Preset wechseln:**
- Am CME U6: Preset-Taste drücken (P1, P2)
- Oder: Program Change senden (falls konfiguriert)

**L-6 Scene-Wechsel via MIDI:**
1. T-8/J-6 sendet PC 1-9
2. L-6 wechselt automatisch Scene
3. Mixer-Settings ändern sich (Fader, Pan, EQ)

**Tipp:** Nutze L-6 Scenes für verschiedene Mix-Balancen (z.B. Scene 1 = Drums laut, Scene 2 = Synths im Vordergrund).

---

## WF-M2: Ambient Ø Pad-Performance

**Ziel:** Ambient Ø für atmosphärische Pads und Drones, synchron mit dem Setup.

**Geräte:** T-8 (Clock), J-6, S-1, Ambient Ø, Zoom L-6

**Setup-Zeit:** 3 Minuten
**Best für:** Ambient-Performances, Soundscapes, Drone-Musik

### Schritt-für-Schritt Anleitung

**Setup:**
1. Ambient Ø via USB an L-6 anschließen
2. S-1 empfängt J-6 Notes (Preset P01)
3. Ambient Ø intern spielen (eigene Sequenzen)

**Ambient Ø vorbereiten:**
1. Ambient Ø einschalten, Pad-Preset wählen
2. **Decay:** Lang (für evolvierende Pads)
3. **Reverb:** 60-80%
4. **LFO:** Subtile Modulation

**Performance-Flow:**
1. **T-8:** Langsames Tempo (60-80 BPM)
2. **J-6:** Chord Mode, spiele Akkorde → S-1
3. **S-1:** Arpeggiator für melodische Patterns
4. **Ambient Ø:** Manuelle Pads und Drones dazu

**Akkord-Tipps für Ambient:**

| J-6 Akkordfolge | Stimmung |
|-----------------|----------|
| Am → Em → G → D | Melancholisch |
| Cmaj7 → Fmaj7 → Am7 | Warm, entspannt |
| Dm → Bb → F → C | Cinematisch |

**Layering-Idee:**
- S-1: Arpeggio-Melodien (Lautstärke 50%)
- Ambient Ø: Drone-Pads (Lautstärke 50%)
- Ergebnis: Tiefe, evolvierende Soundscapes

---

## WF-M3: T-8 Drum-Solo (Clock Master fokussiert)

**Ziel:** T-8 als Zentrum der Performance, andere Geräte folgen.

**Geräte:** T-8 (Clock + Drums), J-6, S-1, Zoom L-6

**Setup-Zeit:** 2 Minuten
**Best für:** Beat-fokussierte Sets, Dance-Music, Drum'n'Bass

### Schritt-für-Schritt Anleitung

**Setup:**
1. T-8 auf **Internal Sync** + **Clock Out ON**
2. Pattern mit starkem Beat laden
3. Tempo: 120-140 BPM (je nach Genre)

**Performance-Strategie:**
1. **Phase 1 - Intro (0-30 Sek):**
   - T-8: Nur Kick auf 1+3, HiHat
   - Andere Geräte: Muted am L-6

2. **Phase 2 - Build-up (30-90 Sek):**
   - T-8: Volles Pattern
   - J-6: Unmute, Akkord-Stabs
   - S-1: Bassline (Clock-synced)

3. **Phase 3 - Peak (90-180 Sek):**
   - Alle Geräte aktiv
   - T-8: Pattern-Wechsel für Variation
   - L-6: Scene-Wechsel für Mix-Balance

4. **Phase 4 - Breakdown:**
   - Mute T-8 Drums (nur Clock läuft weiter!)
   - J-6 + S-1 spielen weiter synchron
   - Spannung aufbauen

5. **Phase 5 - Drop:**
   - T-8: Unmute → Beat kommt zurück
   - Publikum geht ab!

**T-8 Pattern-Wechsel via MIDI:**
- T-8 kann bei Pattern-Wechsel PC senden
- L-6 wechselt Scene automatisch
- Mix passt sich dem Pattern an

---

## WF-M4: L-6 Scene-Automation via MIDI

**Ziel:** Zoom L-6 Mixer-Settings automatisch ändern während der Performance.

**Geräte:** CME U6 #2, Zoom L-6

**Setup-Zeit:** 5 Minuten
**Best für:** Konzert-Setups, Song-Übergänge, Live-Shows

### Schritt-für-Schritt Anleitung

**L-6 Scenes vorbereiten:**

| Scene | PC | Name | Einstellungen |
|-------|-------|------|---------------|
| 1 | PC 1 | Jam Full | Alle Fader auf Unity |
| 2 | PC 2 | Drums Fokus | TR-6S +3dB, Rest -3dB |
| 3 | PC 3 | Synth Fokus | J-6/S-1 +3dB, Drums -6dB |
| 4 | PC 4 | Vocals | E-4 +6dB, Synths -3dB |
| 5 | PC 5 | Ambient | Ambient Ø +6dB, Drums muted |

**Scenes am L-6 einrichten:**
1. L-6: Fader/Pan einstellen wie gewünscht
2. **MENU** → **SCENE** → **SAVE**
3. Scene-Nummer wählen (1-9)
4. Name eingeben → **ENTER**
5. Wiederholen für alle Scenes

**MIDI-Trigger konfigurieren:**
1. U6 #2: Routing so dass PC durchgeleitet wird
2. L-6: MIDI In aktiviert, PC empfangen ON
3. Sende PC 1 → L-6 wechselt zu Scene 1

**Live-Trigger-Optionen:**

| Methode | Vorteile | Nachteile |
|---------|----------|-----------|
| T-8 Pattern-Wechsel | Automatisch | Braucht Konfiguration |
| J-6 Bank-Wechsel | Intuitiv | Nur 4 Banks |
| Externes Pedal | Hands-free | Zusätzliche Hardware |
| DAW via USB | Präzise | Computer nötig |

**Workflow-Beispiel (3-Song-Set):**

```
Song 1 (Ambient Intro):
├── Start: L-6 Scene 5 (Ambient)
├── Minute 2: PC 3 → Scene 3 (Synth Fokus)
└── Ende: PC 1 → Scene 1 (Transition)

Song 2 (Dance-Track):
├── Start: L-6 Scene 2 (Drums Fokus)
├── Breakdown: PC 3 → Scene 3
├── Drop: PC 2 → Scene 2
└── Ende: PC 1 → Scene 1

Song 3 (Vocal-Feature):
├── Start: L-6 Scene 4 (Vocals)
├── Chorus: PC 1 → Scene 1 (Full Mix)
└── Outro: PC 5 → Scene 5 (Fade to Ambient)
```

---

## WF-M5: Freude 2025 Generative Jam

**Ziel:** "Ode to Joy" Melodie auf allen Geräten synchron spielen, generative Variationen.

**Geräte:** Alle (T-8, J-6, S-1, E-4, Ambient Ø, L-6)

**Setup-Zeit:** 10 Minuten
**Best für:** Konzept-Performances, Ambient-Versionen klassischer Melodien

### Schritt-für-Schritt Anleitung

**"Freude"-Melodie MIDI-Daten:**
```
Noten (Original):
E4 E4 F4 G4 | G4 F4 E4 D4 | C4 C4 D4 E4 | E4 D4 D4 - |

Akkord-Unterlegung (J-6):
C   C   F   G   | G   F   C   G   | Am  Am  G   C   | C   G   G   - |
```

**Setup für generative Performance:**

1. **T-8 (Drums):**
   - Tempo: 72 BPM (langsam, majestätisch)
   - Pattern: Minimal Kick auf 1, Snare auf 3
   - Variation: Nur HiHat ab Takt 8

2. **J-6 (Akkorde):**
   - Chord Mode: Manual
   - Arpeggio: OFF (volle Akkorde)
   - Spiele Akkordfolge live

3. **S-1 (Melodie):**
   - Empfängt J-6 Notes (Preset P01)
   - Arpeggiator: ON (8tel-Noten)
   - Arpeggio Mode: Up-Down

4. **E-4 (Vocoder/Effekte):**
   - Kann für Vocal-Effekte genutzt werden
   - Oder als Effekt-Unit für andere Quellen

5. **Ambient Ø (Drone):**
   - Intern: C2 gehalten (Grundton Pedal)
   - Mix: Leise im Hintergrund (20%)

**Performance-Ablauf:**

```
[0:00-1:00] Intro
├── Ambient Ø Drone startet
├── T-8 nur Kick auf 1
└── L-6 Scene 5 (Ambient)

[1:00-3:00] Theme
├── J-6 spielt Akkordfolge
├── S-1 Arpeggio beginnt (Melodie-Fragmente)
├── L-6 Scene 1 (Full)
└── E-4 optional dazu (Vocal-Effekte)

[3:00-5:00] Entwicklung
├── T-8 volles Pattern
├── S-1 Lead-Melodien
└── L-6 Scene 3 (Synth Fokus)

[5:00-6:00] Climax
├── Alle Geräte, volle Lautstärke
├── S-1 + Ambient Ø zusammen
└── L-6 Scene 1

[6:00-7:00] Outro
├── T-8 fade out (Mute am L-6)
├── Ambient Ø allein (Drone)
├── J-6 einzelne Akkorde
└── Sanftes Fade-Out
```

**Tipp:** Nutze die `Freude2025.wav` Audio-Datei als Referenz oder Backing-Track.

---

## WF-M6: Hands-Free Performance (2-Hände-Limit)

**Ziel:** Komplette Performance mit nur 2 Händen bedienbar.

**Geräte:** T-8, J-6, S-1, Zoom L-6, Fußschalter (optional)

**Setup-Zeit:** 5 Minuten
**Best für:** Solo-Performances, Busking, One-Man-Shows

### Schritt-für-Schritt Anleitung

**Grundprinzip:**
- T-8: Läuft automatisch (Sequencer-Patterns)
- J-6: Eine Hand für Akkorde
- S-1: Andere Hand für Melodie
- L-6: Scenes per MIDI (kein manuelles Mischen!)

**Setup für Hands-Free:**

1. **T-8 Patterns vorbereiten:**
   - 4-8 Patterns pro Song erstellen
   - Chain-Modus: Patterns laufen automatisch durch
   - Oder: Pattern-Wechsel per Fuß (MIDI-Pedal)

2. **L-6 Scenes programmieren:**
   - Scene für jeden Song-Teil
   - T-8 Pattern → PC → L-6 Scene-Wechsel
   - Kein manuelles Fader-Schieben nötig!

3. **Spielbare Konfiguration:**
   ```
   Linke Hand:  J-6 Akkorde (Chord-Buttons)
   Rechte Hand: S-1 Melodie (Keys)
   Fuß:         Pattern-Wechsel (optional)
   Nichts:      T-8 Drums (läuft automatisch!)
   ```

**Workflow-Matrix (2 Hände):**

| Preset | Spielbar? | Warum |
|--------|-----------|-------|
| P01 | Ja | J-6 steuert S-1, Ambient Ø Pads |
| P02 | Ja | J-6 + S-1 Layer |

**Performance-Tipps:**
- Beide Presets sind gut spielbar mit 2 Händen
- Nutze J-6 Arpeggiator für automatische Patterns
- S-1 Sequencer kann auch autonom laufen
- L-6 Limiter aktivieren (Übersteuerung vermeiden)

---

## Workflow-Übersicht (Quick Reference)

| Workflow | Fokus | Hände | Komplexität | Best für |
|----------|-------|-------|-------------|----------|
| **WF-M1:** Standard-Jam | Alle Geräte | 2+ | Mittel | Jam-Sessions |
| **WF-M2:** Ambient Ø | Pads/Drones | 2 | Niedrig | Ambient |
| **WF-M3:** T-8 Drums | Rhythmus | 2 | Niedrig | Dance |
| **WF-M4:** L-6 Scenes | Automation | 1 | Hoch (Setup) | Konzerte |
| **WF-M5:** Freude 2025 | Konzept | 2 | Hoch | Shows |
| **WF-M6:** Hands-Free | Praktisch | 2 | Mittel | Solo-Gigs |

---

**Kombiniere diese Workflows für deine perfekte Performance!**

Siehe auch:
- Kapitel 500: MIDI-Grundlagen & Routing
- Kapitel 510: MIDI-Setup-Guide
- Kapitel 320: Audio-Workflows
