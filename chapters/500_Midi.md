<a id="midi"></a>
# MIDI

Version: 2025-05-21

Dieses Dokument beschreibt die MIDI-Architektur des MusikKoffer-Systems - von der Clock-Synchronisation bis zur Note-Verteilung.

## MIDI-Routing-Architektur

Das MusikKoffer-System verwendet eine **Hub-basierte MIDI-Architektur** mit dem CME H4 WIDI Core als zentralem MIDI-Router. Die USB-fähigen Geräte (S-1, J-6, E-4) sind über einen USB-Hub direkt am H4 angeschlossen.

### Geräte-Rollen im MIDI-System

**CME H4 WIDI Core (Master MIDI-Router)**
- Empfängt Clock vom TR-6S (MIDI 2 IN)
- Verteilt Clock an alle Geräte via USB-Hub und MIDI 2 OUT
- Sendet Program Change + MMC an Zoom L-6 (MIDI 1 OUT)
- Empfängt Pad-Noten vom L-6 für Preset-Wechsel (MIDI 1 IN)
- 4 speicherbare Routing-Presets

**Roland TR-6S (Clock Master)**
- Sendet MIDI Clock (24 PPQN) + Start/Stop/Continue
- Verbunden mit H4 Core MIDI 2 IN (TRS-A → DIN)
- Steuert das Tempo des gesamten Systems

**Zoom L-6 (MIDI-Empfänger & Controller)**
- TRS-A MIDI-Input
- Reagiert auf Program Change (PC 1-9) → Szenenwechsel
- Reagiert auf MMC → Start/Stop/Rec
- Pads senden Notes zur H4 Preset-Umschaltung

### MIDI-Verkabelungs-Diagramm

```
┌─────────────────────────────────────────────────────────────────────┐
│                    MIDI-SIGNAL-FLUSS                                │
│                                                                     │
│   ┌─────────────┐                                                   │
│   │   TR-6S     │                                                   │
│   │(Clock+Notes)│                                                   │
│   └──────┬──────┘                                                   │
│          │ TRS-A→DIN                                                │
│          ↓                                                          │
│   ┌──────────────────────────────────────────────────────────┐      │
│   │              CME H4 WIDI CORE (Master Router)            │      │
│   │                                                          │      │
│   │  [MIDI 2 IN] ←── TR-6S (Clock Master)                    │      │
│   │  [MIDI 2 OUT] ──► Ambient Ø (Clock + Notes)              │      │
│   │                                                          │      │
│   │  [MIDI 1 IN] ←── L-6 Pads (Preset-Wechsel)               │      │
│   │  [MIDI 1 OUT] ──► L-6 (PC/MMC für Scenes)                │      │
│   │                                                          │      │
│   │  [USB-A] ◄───► USB-Hub                                   │      │
│   │                 ├── S-1 (Ch 2) ── Clock + Notes          │      │
│   │                 ├── J-6 (Ch 1) ── Clock + Notes          │      │
│   │                 └── E-4 (Ch 3) ── Clock + Notes          │      │
│   └──────────────────────────────────────────────────────────┘      │
│          │              │                     │                     │
│          ↓              ↓                     ↓                     │
│   ┌───────────┐  ┌───────────┐         ┌──────────┐                 │
│   │Ambient Ø  │  │   L-6     │         │ USB-Hub  │                 │
│   │Clock+Notes│  │ PC + MMC  │         │ S-1,J-6  │                 │
│   │           │  │ Pads→H4   │         │   E-4    │                 │
│   └───────────┘  └───────────┘         └──────────┘                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

TRS-A = 3,5mm Stereo-Klinke (Type A Standard)
DIN   = 5-pol DIN-Buchse (klassisch)
```

### MIDI-Kabeltypen und Adapter

| Verbindung | Kabeltyp | Bemerkung |
|------------|----------|-----------|
| TR-6S → H4 Core MIDI 2 IN | TRS-A auf DIN | Clock Master |
| H4 Core MIDI 2 OUT → Ambient Ø | DIN auf TRS-A | Clock + Notes |
| H4 Core MIDI 1 OUT → L-6 | DIN auf TRS-A | PC/MMC für Scenes |
| L-6 → H4 Core MIDI 1 IN | TRS-A auf DIN | Pad Notes für Preset-Wechsel |
| H4 Core USB-A → USB-Hub | USB-A | S-1, J-6, E-4 per USB |

**Wichtig:** TRS-A und TRS-B sind NICHT kompatibel! Roland, Korg, und Zoom verwenden TRS-A. Achte beim Kauf von Adaptern auf den korrekten Standard.

**USB-Verbindung:** S-1, J-6 und E-4 sind via USB-Hub direkt am H4 Core angeschlossen - kein separates MIDI-Kabel nötig!

## Clock-Synchronisation

### Clock-Quelle und -Verteilung

Im MusikKoffer-System fungiert der **Roland TR-6S** als primärer Clock-Master:

1. TR-6S sendet MIDI Clock (24 PPQN) + Start/Stop/Continue an H4 Core (MIDI 2 IN)
2. H4 Core verteilt Clock an S-1, J-6, E-4 via USB-Hub
3. H4 Core sendet Clock an Ambient Ø via MIDI 2 OUT
4. H4 Core sendet PC/MMC an L-6 via MIDI 1 OUT

**Alle Geräte laufen synchron zum selben Tempo!**

### Clock-Einstellungen pro Gerät

**TR-6S (Clock Master)**
- Sync Mode: **Internal** (erzeugt Clock)
- Tempo: 60-200 BPM einstellbar
- Clock Output: **ON**

**J-6 (Clock Slave)**
- Sync Mode: **External** (empfängt Clock via USB)
- Folgt automatisch dem TR-6S Tempo
- Sequencer startet bei MIDI Start

**S-1 (Clock Slave)**
- Sync Mode: **External** (empfängt Clock via USB)
- Arpeggiator und Sequencer folgen Clock

**Ambient Ø (Clock Slave via MIDI)**
- Empfängt Clock via H4 Core MIDI 2 OUT
- Kann auch Notes von S-1/J-6 empfangen (über H4 Routing)
- Oder: Intern mit manuellem Tempo

### Tempo-Wechsel während Performance

1. Am TR-6S: Tempo-Encoder drehen
2. Alle Slaves passen sich sofort an
3. Keine Unterbrechung der Wiedergabe

**Tipp:** Für sanfte Tempo-Übergänge: TR-6S Tempo langsam ändern, nicht springen!

## MIDI-Kanäle und Zuordnung

### Kanal-Matrix

| Gerät | MIDI-Kanal | Empfängt | Sendet |
|-------|------------|----------|--------|
| TR-6S | 10 (Drums) | - | Notes, Clock |
| J-6 | 1 | Clock, Notes | Notes, CC |
| S-1 | 2 | Clock, Notes | Notes, CC |
| E-4 | 3 | Notes (optional) | - |
| Ambient Ø | 5 | Clock, Notes (optional) | - |
| L-6 | Omni | PC, MMC | Pad Notes |

### Program Change für L-6 Scenes

Der Zoom L-6 wechselt Scenes über MIDI Program Change:

| PC-Nummer | L-6 Scene | Beschreibung |
|-----------|-----------|--------------|
| PC 1 | Scene 1 | Jam / Full Setup |
| PC 2 | Scene 2 | Instrumental Fokus |
| PC 3 | Scene 3 | Performance (Vocals) |
| PC 4-9 | Scene 4-9 | Benutzerdefiniert |

**So sendest du Program Change:**
- Vom TR-6S: Pattern wechseln (wenn konfiguriert)
- Vom J-6: Bank-Wechsel kann PC senden
- Oder: Externes Controller-Pedal

### MMC (MIDI Machine Control)

Der L-6 reagiert auf MMC-Befehle:

| MMC Command | L-6 Reaktion |
|-------------|--------------|
| MMC Play | Startet Wiedergabe |
| MMC Stop | Stoppt Wiedergabe |
| MMC Record | Startet Aufnahme |
| MMC Pause | Pausiert |

**Nutzung:** TR-6S kann so den L-6 Recorder fernsteuern - Record startet automatisch mit dem Beat!

## Presets und Routing-Szenarien

Das System unterstützt vier H4 Core Presets für unterschiedliche musikalische Szenarien:

### H4 Preset 1: Standard Jam

```
TR-6S Clock ──→ alle Geräte
USB-Geräte isoliert (kein Note-Routing)
```

**Ideal für:** Freies Jammen, jedes Gerät spielt unabhängig

### H4 Preset 2: J-6 → Ambient

```
TR-6S Clock ──→ alle Geräte
J-6 Notes ──→ Ambient Ø (über H4 MIDI 2 OUT)
```

**Ideal für:** Ambient-Performances, J-6 Akkorde steuern Ambient Ø Pads

### H4 Preset 3: S-1 → Ambient

```
TR-6S Clock ──→ alle Geräte
S-1 Notes ──→ Ambient Ø
```

**Ideal für:** Lead-fokussierte Performances mit Ambient-Unterstützung

### H4 Preset 4: Full Route

```
TR-6S Clock ──→ alle Geräte
Alle USB-Geräte ──→ Ambient Ø
```

**Ideal für:** Komplexe Soundscapes, alle Synths steuern Ambient Ø

## Troubleshooting MIDI

### Problem: Geräte laufen nicht synchron

**Ursachen und Lösungen:**

1. **Clock-Quelle nicht eindeutig**
   - Prüfe: Ist NUR TR-6S auf "Internal"?
   - Alle anderen Geräte MÜSSEN auf "External" stehen

2. **Kabel nicht verbunden**
   - H4 Core LEDs zeigen MIDI-Aktivität
   - Prüfe alle Verbindungen systematisch
   - USB-Hub-Verbindung zum H4 prüfen

3. **Falscher TRS-Standard**
   - Roland/Korg/Zoom: TRS-A
   - Einige Arturia/Novation: TRS-B
   - Bei Fehlfunktion: Adapter auf anderen Standard testen

### Problem: L-6 reagiert nicht auf Program Change

1. **MIDI-Kanal prüfen:** L-6 auf "Omni" oder passenden Kanal einstellen
2. **PC-Bereich prüfen:** L-6 akzeptiert nur PC 1-9 für Scenes
3. **Verkabelung prüfen:** H4 Core MIDI 1 OUT → L-6 MIDI In

### Problem: USB-Geräte empfangen keine Clock

1. **USB-Hub prüfen:** Alle Geräte am Hub angeschlossen?
2. **H4 USB-A Verbindung prüfen:** Hub mit H4 Core verbunden?
3. **Sync-Einstellung prüfen:** S-1/J-6/E-4 auf "External" stellen

---

Detaillierte Schritt-für-Schritt-Anleitungen findest du in **Kapitel 510 (First Steps MIDI)**.
Konkrete Workflow-Beispiele findest du in **Kapitel 520 (Workflows MIDI)**.
