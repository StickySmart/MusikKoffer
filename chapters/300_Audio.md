<a id="audio"></a>
# Audio

Version: 2025-09-03 04:25

Dieses Dokument bündelt Audio

## Signalrouting-Architektur

Das Zoom L-6 fungiert als zentraler Audio-Hub für das gesamte MusikKoffer-Setup. Alle Klangerzeuger werden hier zusammengeführt, gemischt und aufgenommen. Die folgende Übersicht zeigt die vollständige Verkabelung.

### Geräte-Ausgänge zum Zoom L-6

**TR-6S (Drum Machine)**
- Main Out L/MONO → L-6 Kanal 1 (6,3mm Klinke, mono/TS)
- Main Out R → L-6 Kanal 2 (6,3mm Klinke, mono/TS)
- Pegel: Unity Gain (12 Uhr Position am Gerät)
- L-6 Input Gain: -10 bis -6 dBu (LED sollte grün leuchten, nicht rot)

**J-6 (Chord Machine)**
- Phones/Line Out → L-6 Kanal 3/4 (3,5mm Stereo auf 2× 6,3mm Klinke Y-Kabel)
- Output Level am J-6: 70-80% (damit Headroom bleibt)
- L-6 Input Gain: -12 dBu (J-6 hat relativ heißen Ausgang)

**E-4 (Voice Tweaker)**
- Line Out L/R → L-6 Kanal 5 (nur L bei Mono, beide bei Stereo-Effekten)
- Pegel am E-4: Output Level auf 3/4
- L-6 Input Gain: -8 dBu

**S-1 (Synthesizer)**
- Output → L-6 Kanal 6 (6,3mm Klinke, mono)
- Pegel am S-1: Volume-Regler auf 60%
- L-6 Input Gain: -10 dBu

**Sonicware Liven Ambient Ø**
- Line Out L/R → L-6 via USB Audio (alternativ: 3,5mm auf Kanal 3/4 wenn J-6 nicht genutzt)
- Bei USB: erscheint als separate Spur im L-6
- Bei Klinke: Input Gain -15 dBu (sehr sauberes Signal)

### Verkabelungs-Diagramm

```
┌─────────────────────────────────────────────────────────────┐
│                    ZOOM L-6 (Mixer/Recorder)                │
│                                                             │
│  [1] ←──────── TR-6S Main L                                │
│  [2] ←──────── TR-6S Main R                                │
│  [3/4] ←────── J-6 Stereo Out (3,5mm → 2× 6,3mm)          │
│  [5] ←──────── E-4 Line Out L                              │
│  [6] ←──────── S-1 Output                                  │
│  [USB] ←─────── Ambient Ø (alternativ zu 3/4)             │
│                                                             │
│  Main Out ────→ Kopfhörer / PA / Monitor                   │
│  SD Card: Multitrack Recording (6 Spuren + Stereo Mix)     │
└─────────────────────────────────────────────────────────────┘
         ↑
         └── USB ──→ Computer (optional für DAW-Aufnahme)


MIDI-Routing (separates Kapitel 500):
CME H4 WC (Master Clock) → alle Geräte
```

### Kabeltypen und Spezifikationen

| Verbindung | Kabeltyp | Länge | Bemerkung |
|------------|----------|-------|-----------|
| TR-6S → L-6 | 2× 6,3mm Klinke TS (mono) | 50cm | Kurze Wege = weniger Störungen |
| J-6 → L-6 | 3,5mm Stereo auf 2× 6,3mm | 30cm | Y-Kabel, achte auf Links/Rechts |
| E-4 → L-6 | 6,3mm Klinke TS | 50cm | Mono ausreichend bei Vocoder |
| S-1 → L-6 | 6,3mm Klinke TS | 50cm | Standard Instrumentenkabel |
| Ambient Ø → L-6 | USB-C auf USB-A | 1m | Bevorzugt wegen Sync |
| L-6 → Monitor | 2× 6,3mm Klinke / XLR | 2-3m | Je nach PA-System |

**Wichtig:** Verwende qualitativ hochwertige, geschirmte Kabel. Billige Kabel verursachen Brummen und Signalverlust.

## Phantom-Power Konfiguration

Das Zoom L-6 bietet 48V Phantom-Power für Kondensatormikrofone. **Für das MusikKoffer-Setup ist Phantom-Power auf ALLEN Line-Eingängen DEAKTIVIERT**, da ausschließlich Line-Pegel-Signale verwendet werden.

### Kanal-spezifische Einstellungen

**Kanal 1-2 (TR-6S):**
- Phantom: **OFF** ❌
- Input Type: LINE
- Pad: OFF (Signal ist bereits auf Line-Pegel)
- Grund: Synthesizer/Drum-Machines haben Line-Ausgänge, Phantom würde sie beschädigen

**Kanal 3-4 (J-6):**
- Phantom: **OFF** ❌
- Input Type: LINE
- Pad: OFF
- Grund: Stereo-Line-Signal vom Chord-Synth

**Kanal 5 (E-4):**
- Phantom: **OFF** ❌
- Input Type: LINE
- Pad: OFF
- Grund: Voice-Tweaker gibt Line-Signal aus

**Kanal 6 (S-1):**
- Phantom: **OFF** ❌
- Input Type: LINE
- Pad: OFF
- Grund: Synthesizer, kein Mikrofon

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
