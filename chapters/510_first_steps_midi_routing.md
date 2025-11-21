<a id="first-steps-midi-setup"></a>
# First Steps – MIDI & Setup

## Kompletter MIDI-Setup-Guide

Diese Anleitung führt dich Schritt für Schritt durch die MIDI-Verkabelung und Konfiguration des MusikKoffer-Systems.

**Zeitbedarf:** ca. 15-20 Minuten
**Voraussetzungen:** Audio-Verkabelung bereits abgeschlossen (siehe Kapitel 310)

### Phase 1: MIDI-Hardware vorbereiten (3 Minuten)

**Schritt 1.1 – MIDI-Geräte bereitlegen**
- CME U6 #1 und #2 mit Strom versorgen (USB oder Netzteil)
- Doremidi Merge 5 mit Strom versorgen
- Alle Geräte noch AUSGESCHALTET lassen

**Schritt 1.2 – Adapter und Kabel sortieren**

Du benötigst:
```
Kabel-Checkliste:
┌─────────────────────────────────────────────────┐
│ [ ] 3× TRS-A auf DIN Adapter (für T-8, J-6, S-1)│
│ [ ] 2× DIN-DIN MIDI-Kabel (Merge → U6s)         │
│ [ ] 2× DIN auf TRS-A Adapter (U6 → J-6, S-1)    │
│ [ ] 1× DIN-DIN MIDI-Kabel (U6 #2 → Texture Lab) │
│ [ ] 1× DIN auf TRS-A Adapter (U6 #2 → L-6)      │
└─────────────────────────────────────────────────┘
```

**Wichtig:** TRS-A Adapter! Roland, Korg, Zoom nutzen Type A. Bei falschen Adaptern funktioniert MIDI nicht.

### Phase 2: MIDI-Verkabelung (10 Minuten)

**Schritt 2.1 – Quellen an Merge 5 anschließen**

```
┌────────────────────────────────────────────┐
│           DOREMIDI MERGE 5                 │
│                                            │
│  [IN1]   [IN2]   [IN3]   [IN4]   [IN5]    │
│    ↑       ↑       ↑                       │
│   T-8     J-6     S-1   (frei)  (frei)    │
└────────────────────────────────────────────┘
```

1. **T-8 MIDI Out** → TRS-A/DIN Adapter → **Merge 5 IN1**
   - T-8 sendet Clock + Drum-Notes

2. **J-6 MIDI Out** → TRS-A/DIN Adapter → **Merge 5 IN2**
   - J-6 sendet Chord-Notes

3. **S-1 MIDI Out** → TRS-A/DIN Adapter → **Merge 5 IN3**
   - S-1 sendet Synth-Notes

**Schritt 2.2 – Merge 5 an CME U6 anschließen**

```
Merge 5 OUT A ──→ DIN-Kabel ──→ CME U6 #1 IN1
Merge 5 OUT B ──→ DIN-Kabel ──→ CME U6 #2 IN1
```

Beide U6-Einheiten empfangen jetzt identische MIDI-Daten.

**Schritt 2.3 – CME U6 #1 Ausgänge verbinden (Clock-Distribution)**

```
CME U6 #1:
├── OUT1 ──→ DIN/TRS-A Adapter ──→ J-6 MIDI In
├── OUT2 ──→ DIN/TRS-A Adapter ──→ S-1 MIDI In
└── OUT3 ──→ (frei für Erweiterung)
```

U6 #1 verteilt die Clock an J-6 und S-1.

**Schritt 2.4 – CME U6 #2 Ausgänge verbinden (Control-Distribution)**

```
CME U6 #2:
├── OUT1 ──→ DIN-Kabel ──→ Texture Lab MIDI In
├── OUT2 ──→ DIN/TRS-A Adapter ──→ Zoom L-6 MIDI In
└── OUT3 ──→ (frei für Erweiterung)
```

U6 #2 sendet Clock + Notes an Texture Lab und PC/MMC an L-6.

**Schritt 2.5 – Verkabelung prüfen**

Komplettes MIDI-Routing (Überblick):
```
        ┌─────────────────────────────────────────────┐
        │              QUELLEN (OUT)                  │
        │   T-8 ──┐    J-6 ──┐    S-1 ──┐            │
        │         ↓          ↓          ↓            │
        │      ┌──────────────────────────┐          │
        │      │      MERGE 5             │          │
        │      │   IN1   IN2   IN3        │          │
        │      │         ↓                │          │
        │      │   OUT-A    OUT-B         │          │
        │      └─────┬──────────┬─────────┘          │
        │            ↓          ↓                    │
        │      ┌─────────┐ ┌─────────┐               │
        │      │ U6 #1   │ │ U6 #2   │               │
        │      │ OUT1→J-6│ │OUT1→TL  │               │
        │      │ OUT2→S-1│ │OUT2→L-6 │               │
        │      └─────────┘ └─────────┘               │
        │                                            │
        │              ZIELE (IN)                    │
        │   J-6 ←──    S-1 ←──    TL ←──    L-6 ←── │
        └─────────────────────────────────────────────┘
```

### Phase 3: Geräte-Konfiguration (5 Minuten)

**Schritt 3.1 – T-8 als Clock Master konfigurieren**

1. T-8 einschalten
2. Halte **SHIFT** + drücke **MENU**
3. Navigiere zu **MIDI**
4. Setze:
   - Sync Mode: **INTERNAL**
   - Clock Out: **ON**
   - MIDI Channel: **10** (Drums Standard)
5. Bestätige mit **ENTER**

**Schritt 3.2 – J-6 als Clock Slave konfigurieren**

1. J-6 einschalten
2. Halte **SHIFT** + drücke **MENU**
3. Navigiere zu **SYNC**
4. Setze:
   - Sync Mode: **EXTERNAL**
   - MIDI Channel: **1**
5. Bestätige mit **ENTER**

**Schritt 3.3 – S-1 als Clock Slave konfigurieren**

1. S-1 einschalten
2. Drücke **MENU** wiederholt bis **MIDI**
3. Setze:
   - Sync: **EXT** (External)
   - MIDI Ch: **2**
4. Bestätige mit **ENTER**

**Schritt 3.4 – Texture Lab konfigurieren**

1. Texture Lab einschalten
2. Halte **FUNC** + drücke **MENU**
3. Navigiere zu **MIDI Settings**
4. Setze:
   - Sync: **MIDI**
   - MIDI Ch: **4**
   - Clock Receive: **ON**
5. Bestätige mit **OK**

**Schritt 3.5 – Zoom L-6 MIDI-Empfang aktivieren**

1. L-6: Drücke **MENU**
2. Navigiere zu **SYSTEM** → **MIDI**
3. Setze:
   - MIDI In: **ON**
   - Channel: **OMNI** (empfängt alle Kanäle)
   - Program Change: **ON**
   - MMC: **ON**
4. Bestätige mit **ENTER**

### Phase 4: Funktionstest (3 Minuten)

**Test 4.1 – Clock-Synchronisation prüfen**

1. Am T-8: Drücke **PLAY** (Sequencer startet)
2. Beobachte:
   - J-6: Tempo-LED blinkt synchron? ✅
   - S-1: Clock-Indikator aktiv? ✅
   - Texture Lab: BPM-Anzeige zeigt T-8 Tempo? ✅

**Wenn nicht synchron:**
- Prüfe: Alle Geräte auf "External" außer T-8?
- Prüfe: Merge 5 LED blinkt bei MIDI-Aktivität?

**Test 4.2 – Note-Routing prüfen**

1. Am J-6: Spiele Akkord (Chord Mode)
2. Am S-1: Höre ob Sound erklingt
   - Wenn ja: J-6 → Merge → U6 #1 → S-1 funktioniert ✅
   - Wenn nein: Verkabelung Schritt 2.3 prüfen

**Test 4.3 – Program Change zum L-6 prüfen**

1. Am T-8: Wechsle Pattern (falls PC konfiguriert)
   - Oder: Externes MIDI-Keyboard mit PC-Button
2. Am L-6: Scene wechselt automatisch? ✅

**Wenn L-6 nicht reagiert:**
- MIDI Channel auf OMNI?
- U6 #2 OUT2 wirklich mit L-6 verbunden?

### Phase 5: CME U6 Presets konfigurieren (optional)

Die CME U6-Einheiten können verschiedene Routing-Presets speichern.

**Preset P01 einrichten (S-1 Fokus):**

1. U6 #1: Via CME Software (Windows/Mac)
2. Routing konfigurieren:
   ```
   IN1 (Merged) → OUT1 (J-6): Clock only
   IN1 (Merged) → OUT2 (S-1): Clock + Ch.1 Notes
   ```
3. Preset speichern als "P01"

**Preset P02 einrichten (Texture Fokus):**

1. U6 #2: Via CME Software
2. Routing konfigurieren:
   ```
   IN1 (Merged) → OUT1 (TL): Clock + Ch.1 Notes
   IN1 (Merged) → OUT2 (L-6): PC + MMC only
   ```
3. Preset speichern als "P02"

**Presets wechseln:**
- Am U6: Preset-Taste drücken
- Oder: Via MIDI Program Change an U6 senden

---

## Schnellreferenz: MIDI-Einstellungen

| Gerät | Sync Mode | MIDI Ch | Clock Out | Rolle |
|-------|-----------|---------|-----------|-------|
| T-8 | Internal | 10 | ON | Master |
| J-6 | External | 1 | OFF | Slave |
| S-1 | External | 2 | OFF | Slave |
| Texture Lab | MIDI | 4 | OFF | Slave |
| L-6 | - | Omni | - | Empfänger |

---

## Troubleshooting beim Setup

### "Kein MIDI-Signal am Merge 5"

1. **LED prüfen:** Merge 5 hat Activity-LED
2. **Adapter prüfen:** TRS-A, nicht TRS-B!
3. **Kabel prüfen:** MIDI Out vom Gerät, nicht MIDI In

### "Clock läuft, aber keine Noten"

1. **Kanal prüfen:** Sender und Empfänger gleicher Kanal?
2. **Note-Thru prüfen:** U6 muss Notes durchleiten, nicht filtern
3. **Velocity prüfen:** Manche Synths brauchen Velocity > 0

### "L-6 Scene wechselt nicht"

1. **PC-Bereich:** L-6 akzeptiert nur PC 1-9
2. **MIDI In aktiviert?** MENU → SYSTEM → MIDI → ON
3. **Richtiger Output:** U6 #2 OUT2, nicht OUT1

---

Workflow-Beispiele und Performance-Szenarien findest du in **Kapitel 520 (Workflows MIDI)**.
