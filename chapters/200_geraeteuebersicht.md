<a id="geraeteuebersicht"></a>
# Geräteübersicht

Das MusikKoffer-System besteht aus sorgfältig ausgewählten Geräten, die zusammen ein vollständiges Musik-Produktions- und Performance-Setup bilden.

## Klangerzeuger

### Roland TR-6S (Drum Machine)

**Typ:** Rhythm Performer / Drum Machine
**Hersteller:** Roland (AIRA Compact Serie)

**Eigenschaften:**
- 6 Drum-Tracks mit klassischen TR-Sounds (808, 909, 606, 707)
- 128 Pattern-Speicherplätze
- Step-Sequencer mit 64 Steps
- Integrierte Effekte (Reverb, Delay, Master FX)
- USB Audio/MIDI Interface

**Rolle im System:**
- **MIDI Clock Master** (sendet Tempo an alle anderen Geräte)
- Liefert Drums und Rhythmus
- Steuert via Program Change die L-6 Scenes

**Anschlüsse:**
| Port | Typ | Verwendung |
|------|-----|------------|
| Main Out L/R | 6,3mm Klinke | → L-6 Kanal 1+2 |
| MIDI Out | TRS-A | → Merge 5 In1 |
| USB | Type-C | Optional: Computer |

---

### Roland J-6 (Chord Machine)

**Typ:** Chord Synthesizer
**Hersteller:** Roland (AIRA Compact Serie)

**Eigenschaften:**
- 64 Chord-Buttons für schnelles Spielen
- 4 Chord-Stile (Pop, Jazz, EDM, User)
- Integrierter Arpeggiator
- Ribbon-Controller für Expression
- JUNO-basierte Sounds

**Rolle im System:**
- **Akkord-Generator** für Harmonie
- Steuert S-1 via MIDI Notes
- Arpeggiator für automatische Melodien

**Anschlüsse:**
| Port | Typ | Verwendung |
|------|-----|------------|
| Phones/Line | 3,5mm Stereo | → L-6 Kanal 3+4 (Y-Kabel) |
| MIDI Out | TRS-A | → Merge 5 In2 |
| MIDI In | TRS-A | ← U6 #1 Out1 (Clock) |

---

### Roland S-1 (Synthesizer)

**Typ:** Analoger Modeling Synthesizer
**Hersteller:** Roland (AIRA Compact Serie)

**Eigenschaften:**
- SH-101 Emulation
- Monophon mit Paraphonic-Modus
- Klassischer Filter mit Resonanz
- Sequencer (64 Steps)
- Modulation: LFO, Envelope

**Rolle im System:**
- **Lead-Synth** für Melodien
- **Bass-Synthesizer** für tiefe Frequenzen
- Empfängt Notes vom J-6 (Preset P01)

**Anschlüsse:**
| Port | Typ | Verwendung |
|------|-----|------------|
| Output | 6,3mm Klinke | → L-6 Kanal 6 |
| MIDI Out | TRS-A | → Merge 5 In3 |
| MIDI In | TRS-A | ← U6 #1 Out2 (Clock + Notes) |

---

### Roland E-4 (Voice Tweaker)

**Typ:** Voice Processor / Vocoder
**Hersteller:** Roland (AIRA Compact Serie)

**Eigenschaften:**
- Vocoder mit 10 Bändern
- Auto-Pitch Korrektur
- Scatter-Effekt für Glitch-Sounds
- Lo-Fi und Reverb Effekte
- Eigener Mic-Preamp mit Phantom-Power

**Rolle im System:**
- **Vocal-Processor** für Gesang
- **Effekt-Einheit** für externe Sounds
- Kann S-1 oder andere Quellen modulieren

**Anschlüsse:**
| Port | Typ | Verwendung |
|------|-----|------------|
| Line Out L/R | 6,3mm Klinke | → L-6 Kanal 5 |
| Mic In | 3,5mm | ← Mikrofon |
| Line In | 3,5mm | ← Externe Quelle |

---

### Sonicware LIVEN Ambient Ø

**Typ:** Ambient Synthesizer
**Hersteller:** Sonicware

**Eigenschaften:**
- 4-stimmig polyphon
- 2 Oszillatoren + Sub-Oszillator
- Einzigartige Ambient-optimierte Effekte
- 128 Preset-Speicherplätze
- Batteriebetrieb möglich

**Rolle im System:**
- **Pad-Synthesizer** für Flächen und Drones
- **Atmosphärische Texturen**
- Läuft meist intern (optionale Clock-Sync)

**Anschlüsse:**
| Port | Typ | Verwendung |
|------|-----|------------|
| Line Out | 3,5mm Stereo | → L-6 (USB oder Klinke) |
| USB-C | Audio/MIDI | → L-6 USB (bevorzugt) |

---

## Audio-Zentrale

### Zoom L-6 (Mixer/Recorder)

**Typ:** LiveTrak Digital Mixer & Multitrack Recorder
**Hersteller:** Zoom

**Eigenschaften:**
- 6 Mono-Eingänge (4× XLR/Klinke Combo, 2× Klinke)
- 8-Spur Multitrack Recording auf SD-Karte
- USB Audio Interface (8in/2out oder 2in/2out)
- 9 Sound Pads für Samples
- Scenes für Mixer-Presets
- Integrierte Effekte (EQ, Kompressor, Reverb)

**Rolle im System:**
- **Zentraler Audio-Hub** für alle Geräte
- **Multitrack-Recorder** für Sessions
- **USB-Interface** für Computer/Streaming
- **MIDI-Empfänger** für Scene-Automation

**Anschlüsse:**
| Port | Typ | Verwendung |
|------|-----|------------|
| Input 1-6 | XLR/Klinke | ← Alle Klangerzeuger |
| Main Out | XLR | → PA/Monitor |
| Phones | 6,3mm | → Kopfhörer |
| USB | Type-B | → Computer |
| MIDI In | TRS-A | ← U6 #2 Out2 |
| SD Card | SDHC | Recording-Medium |

---

## MIDI-Infrastruktur

### CME H4 WIDI CORE

**Typ:** MIDI Hub / Router
**Hersteller:** CME (WIDI Serie)

**Eigenschaften:**
- 2× MIDI In, 2× MIDI Out (DIN)
- USB-A Host für bis zu 3 USB-MIDI Geräte
- 4 speicherbare Presets für Routing-Konfigurationen
- Bluetooth MIDI (optional)
- USB-Powered

**Rolle im System:**
- **Zentraler MIDI-Hub** für alle Geräte
- **Clock-Distribution** von TR-6S an alle Synths
- **USB-Host** für S-1, J-6, E-4
- **Preset-Umschaltung** via L-6 Pads

**Anschlüsse:**
| Port | Typ | Verwendung |
|------|-----|------------|
| MIDI 1 IN | DIN | ← L-6 Pads (Preset-Wechsel) |
| MIDI 1 OUT | DIN | → L-6 (PC/MMC für Scenes) |
| MIDI 2 IN | DIN | ← TR-6S (Clock Master) |
| MIDI 2 OUT | DIN | → Ambient Ø (Clock + Notes) |
| USB-A | Host | ← S-1, J-6, E-4 (via Hub) |

---

## MIDI Routing-Übersicht

```
┌─────────────────────────────────────────────────────────────────┐
│                     CME H4 WIDI CORE                            │
│                                                                 │
│   MIDI 2 IN ◄── TR-6S (CLOCK MASTER, Notes, Drums)              │
│                                                                 │
│   MIDI 1 IN ◄── L-6 Pads (schalten H4 Presets 1-4)              │
│   MIDI 1 OUT ──► L-6 (PC/MMC für Scenes, Transport)             │
│                                                                 │
│   MIDI 2 OUT ──► Liven Ambient Ø (Clock + Notes von USB-Geräten)│
│                                                                 │
│   USB-A ◄──────► USB Hub (Clock + individuelle Steuerung)       │
│                    ├── S-1 (Ch 2) ───┐                          │
│                    ├── J-6 (Ch 1) ───┼──► können Ambient spielen│
│                    └── E-4 (Ch 3) ───┘                          │
└─────────────────────────────────────────────────────────────────┘
```

### Signal-Fluss

| Von | Nach | Signal |
|-----|------|--------|
| TR-6S | H4 | Clock (Master), Drum-Notes |
| H4 | S-1, J-6, E-4 (USB) | Clock |
| H4 | Ambient Ø | Clock + Notes (von USB-Geräten) |
| H4 | L-6 | PC (Scenes), MMC (Transport) |
| L-6 Pads | H4 | Note-On → Preset-Wechsel (1-4) |
| S-1/J-6/E-4 | Ambient Ø (via H4) | Notes (optional) |

---

## Übersichtstabelle

| Gerät | Typ | Audio → L-6 | MIDI |
|-------|-----|-------------|------|
| TR-6S | Drums (Clock Master) | Kanal 7/8 | → H4 MIDI 2 IN |
| J-6 | Chords (Ch 1) | Kanal 5/6 | ← H4 USB (Clock) |
| S-1 | Synth (Ch 2) | Kanal 3/4 | ← H4 USB (Clock) |
| E-4 | Vocals (Ch 3) | Kanal 2 | ← H4 USB (Clock) |
| Ambient Ø | Pads (Ch 5) | Kanal 9/10 | ← H4 MIDI 2 OUT |
| L-6 | Mixer | Kanal 1 = Mic | ↔ H4 MIDI 1 |
| H4 | MIDI Router | - | Zentrale |

---

## Stromversorgung

| Gerät | Stromquelle | Verbrauch |
|-------|-------------|-----------|
| TR-6S | USB oder 4× AA | 500mA |
| J-6 | USB oder 4× AA | 500mA |
| S-1 | USB oder 4× AA | 500mA |
| E-4 | USB oder 4× AA | 500mA |
| Ambient Ø | USB-C oder 4× AA | 500mA |
| L-6 | Netzteil (12V DC) | 1A |
| U6 ×2 | USB | 100mA |
| Merge 5 | Netzteil (9V DC) | 100mA |

**Empfehlung:** USB-Hub mit mindestens 3A für alle kompakten Geräte, separates Netzteil für L-6.

---

Detaillierte Verkabelung siehe **Kapitel 300 (Audio)** und **Kapitel 500 (MIDI)**.
