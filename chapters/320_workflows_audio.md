<a id="workflows-audio"></a>
# Workflows Audio

Dieses Kapitel beschreibt bewährte Workflows für verschiedene Audio-Recording- und Performance-Szenarien mit dem MusikKoffer-Setup.

## WF-A1: Multitrack Jam-Session Recording

**Ziel:** Alle Geräte gleichzeitig aufnehmen mit maximaler Flexibilität für nachträgliches Mixing.

**Geräte:** Zoom L-6, TR-6S, J-6, S-1, E-4, Ambient Ø

**Setup-Zeit:** 10 Minuten
**Best für:** Studio-Sessions, Archivierung, Post-Production

### Schritt-für-Schritt Anleitung

**Vorbereitung:**
1. Alle Geräte wie in Kapitel 310 verkabeln
2. SD-Karte im L-6 einlegen (mind. 8 GB, FAT32)
3. Zoom L-6 USB-Modus: **MULTI TRACK** (8in/2out)

**Recording-Prozess:**
1. **Pegel einstellen:**
   - Jedes Gerät anspielen
   - L-6 Input Gains anpassen (LED grün, nicht rot)
   - Alle Fader auf Unity (0 dB)

2. **Recording starten:**
   - L-6: `REC` + `PLAY` Tasten gleichzeitig drücken
   - Rote LED leuchtet = Aufnahme läuft
   - Spiele deine Session (keine Zeitlimits!)

3. **Recording stoppen:**
   - `STOP` Taste drücken
   - L-6 erstellt 8 WAV-Dateien auf SD-Karte:
     - Track 1-6: Einzelspuren (TR-6S L/R, J-6 L/R, E-4, S-1)
     - Track 7-8: Stereo-Master-Mix

4. **Dateien exportieren:**
   - SD-Karte aus L-6 nehmen
   - Am Computer: `SD:/ZOOM0001/` Ordner öffnen
   - Alle `TRK001.WAV` bis `TRK008.WAV` kopieren

**Post-Production:**
- Import in DAW (Ableton, Logic, Reaper)
- Jede Spur einzeln mischen
- EQ, Kompression, Effekte pro Kanal
- Export als finaler Stereo-Mix

**Tipp:** Benenne Dateien sofort um (z.B. `TR6S_L.wav`, `J6_Chords_L.wav`) für bessere Übersicht.

---

## WF-A2: Stereo-Mix Live-Streaming

**Ziel:** Direkt-Stream ohne nachträgliche Bearbeitung, perfekt gemischter Output.

**Geräte:** Zoom L-6 (als fertig gemischtes Stereo-Signal)

**Setup-Zeit:** 5 Minuten
**Best für:** Twitch/YouTube Streams, Live-Performances, Podcasts

### Schritt-für-Schritt Anleitung

**Vorbereitung:**
1. Zoom L-6 USB-Modus: **STEREO MIX** (2in/2out)
2. L-6 via USB mit Computer verbinden
3. Streaming-Software (OBS, Streamlabs) öffnen

**Audio-Routing:**
1. **OBS Audio-Einstellungen:**
   - Audio Input: `Zoom L-6 Stereo Mix`
   - Sample Rate: 48 kHz
   - Buffer: 256 samples

2. **Mix am L-6 einstellen:**
   - Fader für jeden Kanal anpassen
   - Pan: J-6 Stereo-Breite nutzen
   - Master-Fader auf 0 dB
   - Kopfhörer-Monitoring: Was du hörst = was der Stream hört

3. **Stream starten:**
   - OBS: `Start Streaming`
   - Audio wird in Echtzeit übertragen
   - Keine Latenz-Probleme (da Hardware-Mix)

**Performance-Tipps:**
- Nutze L-6 Scenes um zwischen Songs zu wechseln
- Sound Pads für Jingles/Samples
- Kompressor auf Master für gleichmäßige Lautstärke

**Vorteil:** CPU-Lastfrei, da L-6 das Mixing übernimmt, nicht der Computer.

---

## WF-A3: E-4 Mic-In Quelle umschalten

**Ziel:** Schnelles Wechseln zwischen verschiedenen Audio-Quellen am E-4 Vocoder.

**Geräte:** Roland E-4, externe Mikrofone/Synths

**Setup-Zeit:** 2 Minuten
**Best für:** Live-Performances mit Vocal-Effekten, kreative Modulation

### Schritt-für-Schritt Anleitung

**Verfügbare E-4 Inputs:**
- **Mic-In:** 3,5mm Klinke (für Mikrofon mit Phantom-Power)
- **Line-In:** 3,5mm Klinke (für externe Synths/Player)
- **USB Audio:** Computer-Playback (für Backing-Tracks)

**Quelle umschalten:**
1. **Am E-4:** Drücke `INPUT` Taste
2. Wähle mit Drehregler:
   - `MIC` = Mikrofon-Eingang (mit Vocoder)
   - `LINE` = Externes Gerät (für Resampling)
   - `USB` = Computer-Audio
3. Bestätige mit `ENTER`

**Anwendungsbeispiele:**

**Vocoder-Performance:**
- Input: `MIC` (Gesang ins Mikrofon)
- Carrier: Interner Synth oder S-1 via MIDI
- Output Level: 80%
- Effekt-Mix: 50/50 (Voice/Synth)

**External Resampling:**
- Input: `LINE` (z.B. Ambient Ø Line Out → E-4 Line In)
- Vocoder OFF, nutze nur E-4 Effekte (Scatter, Reverb)
- Output → L-6 Kanal 5
- Kreiere Textur-Layers

**USB Backing-Track:**
- Input: `USB` (Computer spielt Drum-Loop ab)
- E-4 moduliert den Loop live
- Mix mit anderen Geräten am L-6

**Tipp:** Nutze ein Y-Kabel um Mic + Line gleichzeitig verfügbar zu haben (manueller Switch nötig).

---

## WF-A4: Live-Performance Recording (Full Setup)

**Ziel:** Komplette Live-Performance mit allen Geräten aufzeichnen, inkl. MIDI-Sync.

**Geräte:** Alle (CME H4, TR-6S, J-6, S-1, E-4, Ambient Ø, Zoom L-6)

**Setup-Zeit:** 15 Minuten
**Best für:** Konzerte, Showcases, Video-Recording

### Schritt-für-Schritt Anleitung

**Phase 1: MIDI Clock Setup**
1. **CME H4 einschalten** (wird Master Clock)
2. MIDI-Verkabelung prüfen (siehe Kapitel 500)
3. Tempo einstellen: 120 BPM (oder nach Bedarf)
4. Sync-Test: Alle Geräte zeigen Clock-Symbol

**Phase 2: Audio-Routing**
1. Alle Geräte wie in Kapitel 300 verkabeln
2. Zoom L-6 Multitrack-Modus aktivieren
3. Gain Staging für alle 6 Kanäle
4. Pan-Settings: J-6 Stereo-Breite (L/R), Rest Center

**Phase 3: Soundcheck**
1. **TR-6S:** Pattern 01 laden, Kick-Test
2. **J-6:** Chord Mode, C-Dur spielen
3. **S-1:** Lead-Sound, Melodie testen
4. **Ambient Ø:** Pad-Sound, lange Note halten
5. **E-4:** Mikrofon-Check (falls genutzt)
6. **Master:** L-6 Master Fader auf -3 dB (Headroom!)

**Phase 4: Performance & Recording**
1. **Start:**
   - L-6: `REC` + `PLAY` drücken
   - CME H4: `START` (Clock läuft)
   - Alle Sequenzer synchronisiert

2. **Während der Performance:**
   - Zoom L-6 zeichnet automatisch alle 8 Spuren auf
   - SD-Karte: Kapazität im Auge behalten
   - Rote LED = Aufnahme läuft

3. **Ende:**
   - CME H4: `STOP` (Clock stoppt)
   - L-6: `STOP` (Recording endet)
   - Dateien werden finalisiert (dauert 5-10 Sek)

**Phase 5: Backup & Archivierung**
1. SD-Karte sichern (immer 2 Kopien!)
2. Dateien umbenennen: `2025-11-20_Konzert_TRK001.wav`
3. Optional: Stereo-Mix (TRK007+008) sofort anhören
4. Multitrack-Dateien für späteres Mixing aufbewahren

**Pro-Tipps:**
- Nutze L-6 Marker-Funktion für Song-Starts (Taste `MARK` während Aufnahme)
- Scene-Wechsel am L-6 für verschiedene Song-Setups
- Immer 30 Sek vor/nach Performance aufnehmen (Sicherheit beim Schnitt)

**Troubleshooting:**
- **Kein MIDI-Sync:** CME H4 Verbindung prüfen, Geräte neu starten
- **Audio-Clipping:** Input Gains reduzieren (LED muss grün bleiben!)
- **SD-Karte voll:** Max. 2 Stunden bei 48kHz Multitrack (8 Spuren)

---

## Workflow-Übersicht (Quick Reference)

| Workflow | Modus | Spuren | Zeit | Best für |
|----------|-------|--------|------|----------|
| **WF-A1:** Multitrack Jam | Multitrack | 8 | 10min | Studio-Recording |
| **WF-A2:** Stereo Stream | Stereo Mix | 2 | 5min | Live-Streaming |
| **WF-A3:** E-4 Input Switch | – | 1 | 2min | Vocoder-Experimente |
| **WF-A4:** Live-Performance | Multitrack | 8 | 15min | Konzerte, Shows |

---

**Weitere Workflows folgen in späteren Versionen.**

Siehe auch:
- Kapitel 300: Audio-Grundlagen & Verkabelung
- Kapitel 310: Setup-Guide für erste Jam-Session
- Kapitel 500: MIDI-Routing & Synchronisation
