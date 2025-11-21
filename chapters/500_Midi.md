<a id="midi"></a>
# MIDI

Version: 2025-05-21

Dieses Dokument beschreibt die MIDI-Architektur des MusikKoffer-Systems - von der Clock-Synchronisation bis zur Note-Verteilung.

## MIDI-Routing-Architektur

Das MusikKoffer-System verwendet eine **Hub-basierte MIDI-Architektur** mit zwei CME U6 MIDI-Interfaces als zentrale Schaltstellen. Der Doremidi Merge 5 sammelt alle MIDI-Ausgänge der Instrumente und verteilt sie an die U6-Einheiten.

### Geräte-Rollen im MIDI-System

**CME U6 #1 (Master/Clock-Distribution)**
- Empfängt gemergtes MIDI vom Merge 5
- Verteilt Clock an J-6 und S-1
- Fungiert als primärer MIDI-Router

**CME U6 #2 (Preset/Control-Distribution)**
- Empfängt gemergtes MIDI vom Merge 5
- Sendet Program Change + MMC an Zoom L-6
- OUT1 frei für Erweiterungen

**Doremidi Merge 5 (MIDI-Sammelpunkt)**
- 5 MIDI-Inputs, 2 MIDI-Outputs
- Sammelt MIDI von T-8, J-6, S-1
- Verteilt identisches Signal an beide U6

**Zoom L-6 (MIDI-Empfänger)**
- TRS-A MIDI-Input
- Reagiert auf Program Change (PC 1-9) → Szenenwechsel
- Reagiert auf MMC → Start/Stop/Rec

### MIDI-Verkabelungs-Diagramm

```
┌─────────────────────────────────────────────────────────────────────┐
│                    MIDI-SIGNAL-FLUSS                                │
│                                                                     │
│   ┌─────────┐   ┌─────────┐   ┌─────────┐                          │
│   │  T-8    │   │  J-6    │   │  S-1    │                          │
│   │(Clock)  │   │(Notes)  │   │(Notes)  │                          │
│   └────┬────┘   └────┬────┘   └────┬────┘                          │
│        │TRS-A        │TRS-A        │TRS-A                          │
│        ↓             ↓             ↓                               │
│   ┌────────────────────────────────────────┐                       │
│   │          DOREMIDI MERGE 5              │                       │
│   │   [IN1]    [IN2]    [IN3]   [IN4][IN5] │                       │
│   │            ↓ ↓ ↓                       │                       │
│   │         [MERGED]                       │                       │
│   │            ↓ ↓                         │                       │
│   │        [OUT A] [OUT B]                 │                       │
│   └───────────┬───────┬────────────────────┘                       │
│               │       │                                            │
│      ┌────────┘       └────────┐                                   │
│      ↓                         ↓                                   │
│   ┌─────────────┐       ┌─────────────┐                            │
│   │  CME U6 #1  │       │  CME U6 #2  │                            │
│   │   (Master)  │       │ (Presets)   │                            │
│   │ [IN1]       │       │ [IN1]       │                            │
│   │  ↓          │       │  ↓          │                            │
│   │ [OUT1→J-6]  │       │ [OUT1→frei] │                            │
│   │ [OUT2→S-1]  │       │ [OUT2→L-6]  │                            │
│   │ [OUT3→frei] │       │ [OUT3→frei] │                            │
│   └─────────────┘       └─────────────┘                            │
│         │  │                       │                               │
│         ↓  ↓                       ↓                               │
│      ┌─────┐ ┌─────┐          ┌──────┐                             │
│      │ J-6 │ │ S-1 │          │ L-6  │                             │
│      │Clock│ │Clock│          │PC+MMC│                             │
│      │ IN  │ │ IN  │          │      │                             │
│      └─────┘ └─────┘          └──────┘                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

TRS-A = 3,5mm Stereo-Klinke (Type A Standard)
DIN   = 5-pol DIN-Buchse (klassisch)
```

### MIDI-Kabeltypen und Adapter

| Verbindung | Kabeltyp | Bemerkung |
|------------|----------|-----------|
| T-8 → Merge 5 | TRS-A auf DIN | Roland-Geräte nutzen TRS-A |
| J-6 → Merge 5 | TRS-A auf DIN | Roland-Geräte nutzen TRS-A |
| S-1 → Merge 5 | TRS-A auf DIN | Roland-Geräte nutzen TRS-A |
| Merge 5 → U6 #1 | DIN auf DIN | Standard MIDI-Kabel |
| Merge 5 → U6 #2 | DIN auf DIN | Standard MIDI-Kabel |
| U6 #1 → J-6 | DIN auf TRS-A | Adapter erforderlich |
| U6 #1 → S-1 | DIN auf TRS-A | Adapter erforderlich |
| U6 #2 → L-6 | DIN auf TRS-A | L-6 nutzt TRS-A |

**Wichtig:** TRS-A und TRS-B sind NICHT kompatibel! Roland, Korg, und Zoom verwenden TRS-A. Achte beim Kauf von Adaptern auf den korrekten Standard.

## Clock-Synchronisation

### Clock-Quelle und -Verteilung

Im MusikKoffer-System fungiert der **Roland T-8** als primärer Clock-Master:

1. T-8 sendet MIDI Clock (24 PPQN) + Start/Stop/Continue
2. Merge 5 leitet Clock an beide U6 weiter
3. U6 #1 verteilt Clock an J-6 und S-1
4. U6 #2 sendet PC/MMC an L-6

**Alle Geräte laufen synchron zum selben Tempo!**

### Clock-Einstellungen pro Gerät

**T-8 (Clock Master)**
- Sync Mode: **Internal** (erzeugt Clock)
- Tempo: 60-200 BPM einstellbar
- Clock Output: **ON**

**J-6 (Clock Slave)**
- Sync Mode: **External** (empfängt Clock)
- Folgt automatisch dem T-8 Tempo
- Sequencer startet bei MIDI Start

**S-1 (Clock Slave)**
- Sync Mode: **External**
- Arpeggiator und Sequencer folgen Clock

**Ambient Ø (Sonderfall)**
- Kann Clock via USB empfangen
- Oder: Intern mit manuellem Tempo

### Tempo-Wechsel während Performance

1. Am T-8: Tempo-Encoder drehen
2. Alle Slaves passen sich sofort an
3. Keine Unterbrechung der Wiedergabe

**Tipp:** Für sanfte Tempo-Übergänge: T-8 Tempo langsam ändern, nicht springen!

## MIDI-Kanäle und Zuordnung

### Kanal-Matrix

| Gerät | MIDI-Kanal | Empfängt | Sendet |
|-------|------------|----------|--------|
| T-8 | 10 (Drums) | - | Notes, Clock |
| J-6 | 1 | Clock, Notes | Notes, CC |
| S-1 | 2 | Clock, Notes | Notes, CC |
| E-4 | 3 | Notes (optional) | - |
| Ambient Ø | 5 | CC (optional) | - |
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
- Vom T-8: Pattern wechseln (wenn konfiguriert)
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

**Nutzung:** T-8 kann so den L-6 Recorder fernsteuern - Record startet automatisch mit dem Beat!

## Presets und Routing-Szenarien

Das System unterstützt zwei Grund-Presets für unterschiedliche musikalische Szenarien:

### Preset P01: Standard-Jam

```
T-8 Clock ──→ alle Geräte
J-6 Notes ──→ S-1 (spielt J-6 Akkorde)
```

**Ideal für:** Lead-Synth-fokussierte Performances, S-1 steht im Vordergrund

### Preset P02: Ambient

```
T-8 Clock ──→ alle Geräte
J-6 + Ambient Ø: Pads und Flächen
S-1: Bass-Lines
```

**Ideal für:** Ambient-Performances, Soundscapes

## Troubleshooting MIDI

### Problem: Geräte laufen nicht synchron

**Ursachen und Lösungen:**

1. **Clock-Quelle nicht eindeutig**
   - Prüfe: Ist NUR T-8 auf "Internal"?
   - Alle anderen Geräte MÜSSEN auf "External" stehen

2. **Kabel nicht verbunden**
   - Merge 5 LED leuchtet bei MIDI-Aktivität
   - Prüfe alle Verbindungen systematisch

3. **Falscher TRS-Standard**
   - Roland/Korg/Zoom: TRS-A
   - Einige Arturia/Novation: TRS-B
   - Bei Fehlfunktion: Adapter auf anderen Standard testen

### Problem: L-6 reagiert nicht auf Program Change

1. **MIDI-Kanal prüfen:** L-6 auf "Omni" oder passenden Kanal einstellen
2. **PC-Bereich prüfen:** L-6 akzeptiert nur PC 1-9 für Scenes
3. **Verkabelung prüfen:** U6 #2 Out2 → L-6 MIDI In

---

Detaillierte Schritt-für-Schritt-Anleitungen findest du in **Kapitel 510 (First Steps MIDI)**.
Konkrete Workflow-Beispiele findest du in **Kapitel 520 (Workflows MIDI)**.
