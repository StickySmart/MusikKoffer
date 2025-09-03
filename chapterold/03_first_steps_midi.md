# 3. First Steps - MIDI
## 3.1 Start in 60 Sekunden
- T-8 als Clock-Master setzen; BPM pruefen.
- EZ-AG, Smartphone und Roland-Kette (inkl. J-6, S-1, TL, E-4) -> CME U6 Pro (Preset aktivieren).
- RK-006 Scene waehlen (Boot/User1/User2).
- Testnote von EZ-AG oder J-6; Transport Start am T-8.
- Falls kein Program Change am TL: Filter im RK-006 pruefen.

## 3.2 Topologie
- Eingaenge:
  - RK-006 Input A <- T-8 (Master Clock/Transport durchlassen).
  - RK-006 Input B <- CME U6 Pro, an dem haengen:
    - Roland-Kette (DIN-MIDI, gemergt inkl. J-6, S-1, TL, E-4)
    - EZ-AG
    - Smartphone
- Filter:
  - Auf B (vom U6): Clock/Transport filtern, Noten/Program Change/Control Change erlauben.
  - Auf A (T-8): Clock/Transport durchlassen, Noten optional.
- Ausgaenge: RK-006 physisch zu J-6, S-1, TL, E-4.
  Welche Daten dort ankommen, bestimmt die aktive Scene (s. 3.3).

## 3.3 RK-006 Scenes (Program-Change-gesteuert)
### 3.3.1 Scene 1 (Boot)
- Quelle = alles, was am U6 haengt (Roland-Kette inkl. J-6, EZ-AG, Smartphone).
- Ziele = alle Geraete offen.
- Program Change / Control Change / Noten -> an alle.
- Clock/Transport -> nur vom T-8 (Master).

### 3.3.2 Scene 2 (User1)
- Quelle = alles am U6.
- Ziel = nur S-1.
- Program Change an TL wird gefiltert.
- Clock/Transport -> nur vom T-8.

### 3.3.3 Scene 3 (User2)
- Quelle = alles am U6 (Roland-Kette inkl. J-6, EZ-AG, Smartphone).
- Ziel = nur Texture Lab.
- Program Change an S-1 wird gefiltert.
- Clock/Transport -> nur vom T-8.
- Hinweis: Da J-6 Teil der Roland-Kette im U6 ist, kann er in dieser Scene direkt den Texture Lab mit MIDI-Noten versorgen.

## 3.4 Quick Troubleshooting (MIDI)
- Start/Stop reagiert nicht: Ist T-8 Master? Transport/Clock am RK-006 gefiltert? U6->RK korrekt verbunden?
- TL wechselt Presets nicht: Program-Change-Filter im RK-006 checken; U6-Preset korrekt?

---
