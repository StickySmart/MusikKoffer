<a id="audio"></a>
# Audio

Version: 2025-09-03 04:25

Dieses Dokument bündelt Audio

## Signalrouting-Architektur

Das Zoom L-6 fungiert als zentraler Audio-Hub für das gesamte MusikKoffer-Setup. Alle Klangerzeuger werden hier zusammengeführt, gemischt und aufgenommen. Die folgende Übersicht zeigt die vollständige Verkabelung.

### Geräte-Ausgänge zum Zoom L-6

**Kanal 1 – Mikrofon**
- XLR-Eingang für Gesangsmikrofon
- Phantom-Power: ON falls Kondensatormikrofon
- L-6 Input Gain: nach Bedarf

**Kanal 2 – E-4 (Voice Tweaker)**
- Line Out → L-6 Kanal 2 (6,3mm Klinke)
- Pegel am E-4: Output Level auf 3/4
- L-6 Input Gain: -8 dBu

**Kanal 3/4 – S-1 (Synthesizer)**
- Output → L-6 Kanal 3/4 (Stereo oder 2× Mono)
- Pegel am S-1: Volume-Regler auf 60%
- L-6 Input Gain: -10 dBu

**Kanal 5/6 – J-6 (Chord Machine)**
- Phones/Line Out → L-6 Kanal 5/6 (3,5mm Stereo auf 2× 6,3mm Klinke Y-Kabel)
- Output Level am J-6: 70-80% (damit Headroom bleibt)
- L-6 Input Gain: -12 dBu (J-6 hat relativ heißen Ausgang)

**Kanal 7/8 – TR-6S (Drum Machine)**
- Main Out L/R → L-6 Kanal 7/8 (2× 6,3mm Klinke, Stereo)
- Pegel: Unity Gain (12 Uhr Position am Gerät)
- L-6 Input Gain: -10 bis -6 dBu (LED sollte grün leuchten, nicht rot)

**Kanal 9/10 – Sonicware Liven Ambient Ø**
- Line Out L/R → L-6 Kanal 9/10 (3,5mm Stereo auf 2× 6,3mm)
- Alternativ: USB Audio
- L-6 Input Gain: -15 dBu (sehr sauberes Signal)

### Verkabelungs-Diagramm

```
┌─────────────────────────────────────────────────────────────┐
│                    ZOOM L-6 (Mixer/Recorder)                │
│                                                             │
│  [1] ←──────── Mikrofon (XLR)                              │
│  [2] ←──────── E-4 Line Out                                │
│  [3/4] ←────── S-1 Output (Stereo)                         │
│  [5/6] ←────── J-6 Stereo Out (3,5mm → 2× 6,3mm)          │
│  [7/8] ←────── TR-6S Main L/R                              │
│  [9/10] ←───── Ambient Ø (3,5mm → 2× 6,3mm)               │
│                                                             │
│  Main Out ────→ Kopfhörer / PA / Monitor                   │
│  SD Card: Multitrack Recording (10 Spuren + Stereo Mix)    │
└─────────────────────────────────────────────────────────────┘
         ↑
         └── USB ──→ Computer (optional für DAW-Aufnahme)


MIDI-Routing (separates Kapitel 500):
CME H4 WIDI CORE (Master Router) → alle Geräte
```

### Kabeltypen und Spezifikationen

| Verbindung | Kabeltyp | L-6 Kanal | Bemerkung |
|------------|----------|-----------|-----------|
| Mikrofon → L-6 | XLR | 1 | Gesang/Sprache |
| E-4 → L-6 | 6,3mm Klinke TS | 2 | Voice Tweaker Out |
| S-1 → L-6 | 2× 6,3mm Klinke TS | 3/4 | Stereo Synth |
| J-6 → L-6 | 3,5mm Stereo auf 2× 6,3mm | 5/6 | Y-Kabel |
| TR-6S → L-6 | 2× 6,3mm Klinke TS | 7/8 | Drums Stereo |
| Ambient Ø → L-6 | 3,5mm Stereo auf 2× 6,3mm | 9/10 | Y-Kabel |
| L-6 → Monitor | 2× 6,3mm Klinke / XLR | Main Out | Je nach PA-System |

**Wichtig:** Verwende qualitativ hochwertige, geschirmte Kabel. Billige Kabel verursachen Brummen und Signalverlust.

## Phantom-Power Konfiguration

Das Zoom L-6 bietet 48V Phantom-Power für Kondensatormikrofone. **Für das MusikKoffer-Setup ist Phantom-Power auf ALLEN Line-Eingängen DEAKTIVIERT**, da ausschließlich Line-Pegel-Signale verwendet werden.

### Kanal-spezifische Einstellungen

**Kanal 1 (Mikrofon):**
- Phantom: **OFF** ❌ (kein Kondensatormikrofon im Setup)
- Input Type: MIC
- Pad: Nach Bedarf
- Grund: Einziger Kanal mit Mikrofon-Eingang

**Kanal 2 (E-4):**
- Phantom: **OFF** ❌
- Input Type: LINE
- Pad: OFF
- Grund: Voice-Tweaker gibt Line-Signal aus

**Kanal 3/4 (S-1):**
- Phantom: **OFF** ❌
- Input Type: LINE
- Pad: OFF
- Grund: Synthesizer, kein Mikrofon

**Kanal 5/6 (J-6):**
- Phantom: **OFF** ❌
- Input Type: LINE
- Pad: OFF
- Grund: Stereo-Line-Signal vom Chord-Synth

**Kanal 7/8 (TR-6S):**
- Phantom: **OFF** ❌
- Input Type: LINE
- Pad: OFF
- Grund: Drum-Machine hat Line-Ausgänge

**Kanal 9/10 (Ambient Ø):**
- Phantom: **OFF** ❌
- Input Type: LINE
- Pad: OFF
- Grund: Synthesizer, sehr sauberes Signal

### Ausnahme: Mikrofon-Nutzung (optional)

Falls du ein Kondensatormikrofon für Vocals über E-4 nutzen möchtest:

1. Mikrofon direkt an **E-4 Mic-In** anschließen (nicht ans L-6!)
2. E-4 liefert eigene Phantom-Power über Mic-In
3. E-4 Line Out → L-6 Kanal 5 (wie oben, Phantom am L-6 bleibt OFF)

**Niemals:** Phantom-Power am L-6 aktivieren, wenn ein Gerät mit Line-Ausgang angeschlossen ist. Das kann Ausgangsstufen beschädigen!

### Sicherheits-Checkliste vor dem ersten Power-Up

✅ Alle Geräte ausgeschaltet
✅ Alle Kabel korrekt verbunden (siehe Diagramm oben)
✅ L-6 Phantom-Power: **ALLE KANÄLE OFF**
✅ L-6 Input Gains auf Minimum (links gedreht)
✅ L-6 Master-Fader auf -∞ dB
✅ Kopfhörer/Monitor-Lautstärke auf Minimum

**Dann:**
1. Zoom L-6 einschalten
2. Alle Synthesizer/Geräte einschalten
3. Langsam Input Gains aufdrehen bis LED grün leuchtet (nicht rot!)
4. Master-Fader auf 0 dB (Unity Gain)
5. Monitor-Lautstärke nach Bedarf anpassen

Bei Befolgung dieser Reihenfolge vermeidest du Knackgeräusche und Schäden an Lautsprechern.
