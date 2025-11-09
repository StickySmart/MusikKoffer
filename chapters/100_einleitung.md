<!-- cid:100:start -->
<a id="einleitung"></a>
# Einleitung

Version: 2025-09-03 04:25

Dieses Dokument bündelt Audio, MIDI und Workflows.
<!-- cid:100:end -->
das ist eine wunderschöne idee, Timo – fast schon poetisch, dein gesamtes *Musik-Koffer-Orchester* als moderne Hommage an Beethovens „Ode an die Freude“ zu orchestrieren.
Und ja: das lässt sich technisch wirklich umsetzen.
Ich erkläre dir kurz, **wie der MIDI-Stream aufgebaut wird**, wie **jede Maschine ihren Part übernimmt** und wie du das Ganze anschließend als performenden KI-Jam laufen lassen kannst.

---

## 🎼 Konzept: „Freude schöner Götterfunken – Modular Ambient Jam“

### 🎛 1. Zielidee

Ein **voll synchronisierter MIDI-Datenfluss**, der die Melodie von *Freude schöner Götterfunken* spielt und dabei jeden deiner Geräte auf seine typische Klangaufgabe verteilt.
Die Geräte reagieren nicht wie klassische Orchester-Instrumente, sondern wie *AI-Stimmen* in einer digitalen Sinfonie.

---

## 🔗 2. Geräte-Rollen & MIDI-Zuweisung

| Gerät                | MIDI-Kanal | Aufgabe                            | Notenquelle                                   |
| -------------------- | ---------- | ---------------------------------- | --------------------------------------------- |
| **TR-6S**            | 10         | Rhythmische Begleitung / Timpani   | MIDI-Drum-Pattern (Kick-Snare auf Zählzeiten) |
| **J-6**              | 1          | Hauptakkorde + Harmonien           | 4-stimmige Chord Progression (C–G–Am–F)       |
| **E-4**              | 3          | Vocal-„Freude“-Echo (Vocoder)      | empfängt die Melodie als Modulator-Signal     |
| **S-1**              | 4          | Lead-Melodie „Freu-de, schö-ner…“  | monophone Notenfolge (C4-C4-D4-E4…)           |
| **Liven Ambient Ø**  | 2          | Reverb-Flächen & Drone-Hintergrund | lange gehaltende Pads (Cmaj)                  |
| **Zoom L-6**         | –          | Mixer / Recorder                   | summiert alle Audio-Signale                   |
| **CME Air Keyboard** | –          | manueller Eingriff / Expression    | sendet Velocity-Dynamik und Filter-CC         |
| **CME H4 WC**        | Master     | Clock & Sync-Router                | verteilt BPM = 120, Start/Stop                |

---

## 🎹 3. MIDI-Stream – „Ode Theme“

Hier ein Beispiel-Ausschnitt (MIDI-Daten konzeptuell):

```midi
Tempo: 120 BPM
TimeSig: 4/4
Key: C Major

Track 1 – S-1 Lead (Ch 4)
C4 1/4, C4 1/4, D4 1/4, E4 1/4,
E4 1/4, D4 1/4, C4 1/4, B3 1/4,
A3 1/2, A3 1/4, C4 1/4, E4 1/4, D4 1/2, ...

Track 2 – J-6 Chords (Ch 1)
[Cmaj] 1 bar, [Gmaj] 1 bar, [Am] 1 bar, [Fmaj] 1 bar → Repeat

Track 3 – TR-6S Rhythm (Ch 10)
Kick on 1+3, Snare on 2+4, Closed Hat on 1/8s

Track 4 – Ambient Ø (Ch 2)
C2 sustained whole-note pad, 4 bars fade-in

Track 5 – E-4 Vocoder (Ch 3)
Receives Lead as MIDI-In, Audio carrier = pink noise, Output mix 50/50

Track 6 – Air Keyboard (Control)
CC74 → Filter, CC11 → Expression, Random Velocity

Global:
All start with MIDI Clock 120 BPM (sent by H4)
```

---

## 🧠 4. Generativer Twist

Damit es nicht „mechanisch“ klingt, bekommt der Stream KI-like Modulation:

| Effekt                     | Quelle                                     | Ziel             |
| -------------------------- | ------------------------------------------ | ---------------- |
| **Random Velocity ±8**     | Script oder Ableton MIDI-Effect „Velocity“ | S-1, J-6         |
| **LFO CC#74 Filter Sweep** | Live MIDI LFO (1/16, Depth 40%)            | Ambient Ø, S-1   |
| **Humanize Start ±10 ms**  | MIDI Utility                               | Lead + Chords    |
| **E-4 Formant Drift**      | CC#21 ±5 %                                 | per Air Keyboard |

---

## 🎧 5. Technische Umsetzung

### Variante A – direkt aus Ableton Live

1. Erstelle 5 MIDI-Spuren (je Gerät, jeweiliger Kanal wie oben).
2. Lege die Noten aus obigem Beispiel in Spur 1–5.
3. Stelle **Zoom L-6** als Audio-Interface ein.
4. Aktiviere in den Ableton-MIDI-Prefs:

   * „Output: Zoom L-6“ = *Track ON* + *Sync ON*
5. Starte Playback → alle Geräte spielen synchron.

### Variante B – autark (ohne PC)

Wenn du den MIDI-Stream als `.mid`-Datei auf den **CME H4** oder ein anderes Gerät lädst:
→ Das H4 sendet die Sequenz an alle Geräte, Clock = 120 BPM.

Ich kann dir dafür eine echte `.mid`-Datei generieren, die genau diese Aufteilung hat (Melodie, Akkorde, Rhythmus etc.),
und du kannst sie in **Ableton** importieren oder direkt vom **CME H4** abspielen lassen.

---

## ✨ 6. Optionale Erweiterung

Wenn du möchtest, kann ich:

* 🎼 eine **Ode-to-Joy.mid** erzeugen (polyphon, exakt in deinem Routing),
* oder 🎛️ ein **Ableton Live-Projekt (.als)** bauen, fertig mit Spuren, Routing und Tempo-Automation.

Was willst du lieber als Nächstes –
👉 eine MIDI-Datei für dein gesamtes Setup,
oder lieber das komplette **Ableton-Live-Projekt** (fertig mit Instrument-Zuordnung und Effekten)?
