# 12. MIDI Workflows

Dieses Kapitel beschreibt die Workflows für MIDI-Steuerung im bestehenden Setup.  
Fokus liegt auf **Control Change (CC)** und **Program Change (PC/PM)**:  
- Wer sendet diese Signale?  
- Wer empfängt sie?  
- Welche Routing-Wege sind möglich (via MERGE-5, U6, RK-006)?  
- Welche typischen Workflows ergeben sich für die Performance?

---

## 12.1 Grundprinzip
- **Clock** läuft zentral über RK-006 Out 1–5 → alle Geräte synchron.  
- **Notes** stammen primär von EZ-AG, J-6, S-1, Texture Lab.  
- **CC und PC** sind Spezialfälle: Steuerung von Sounds, Parametern, Szenen.  
- **Topologie**: MERGE-5 (Filter) → U6 (Zentrale) → RK-006 (Routing) → Zielgeräte.

---

## 12.2 Control Change (CC)

### Mögliche Sender
- **EZ-AG**: sendet Velocity + Controller (z. B. Expression Pedal).  
- **J-6**: kann Live-CCs (Filter, Effektparameter) senden.  
- **S-1**: Knobs senden CC (Filter, Resonance, Modulation).  
- **Texture Lab**: viele Parameter reagieren auf CC → kann auch selbst CCs senden, wenn als Controller genutzt.  
- **E-4**: Formant, Pitch, Reverb-Regler senden CC.  
- **L-6**: keine CC-Sender, aber Empfänger für CC-basierte Szenenumschaltung.

### Mögliche Empfänger
- **S-1**: reagiert auf Filter-CC, Modulation, Envelope.  
- **J-6**: reagiert auf CC für Effekte (Chorus, Delay, Reverb).  
- **T-8**: reagiert auf CC für Drum-Level, Decay, Filter.  
- **Texture Lab**: reagiert auf viele CCs (Granular-Parameter, Start, Size, Pitch).  
- **E-4**: reagiert auf CC für Pitch-Shift, Reverb-Level, Delay.  
- **L-6**: reagiert auf CC für Szenenwechsel (z. B. CC32 = Scene Select).  

### Workflow-Beispiele
- **EZ-AG → CC → S-1**: Dynamiksteuerung (Expression) für S-1 Filter.  
- **S-1 Knobs → CC → Texture Lab**: Live-Tweaks für Granular Engine.  
- **J-6 → CC → T-8**: moduliert Drum-Decay während Pattern läuft.  
- **E-4 → CC → L-6**: Umschaltung von Scene Presets durch E-4 Controller.  

---

## 12.3 Program Change (PC/PM)

### Mögliche Sender
- **EZ-AG**: sendet Programmwechsel (Bänke/Presets).  
- **RK-006**: kann PC weiterleiten/filtern.  
- **Commander Buttons (SysEx)**: rufen User Presets am RK-006 auf → indirekt PC.  

### Mögliche Empfänger
- **Zoom L-6**: reagiert auf PC → Szenenumschaltung.  
- **Roland J-6 / T-8 / S-1**: reagieren auf Programmwechsel für Pattern/Presets.  
- **Texture Lab**: lädt Presets per Program Change.  
- **E-4**: Preset-Recall via PC.  

### Workflow-Beispiele
- **EZ-AG → PC → Zoom L-6**: wählt Scenes (1–3) direkt aus.  
- **J-6 → PC → Texture Lab**: schaltet Granular Presets passend zum Pattern.  
- **S-1 → PC → T-8**: synchroner Preset-Wechsel Drum/Synth.  
- **Commander Button → SysEx → RK-006**: Recall User 10/11 → verteilt passende PCs an Ziele.  

---

## 12.4 Zusammenfassung der Signal-Topologie

| Signal | Haupt-Sender             | Haupt-Empfänger            | Typischer Weg                                |
|--------|--------------------------|----------------------------|----------------------------------------------|
| Clock  | RK-006 Master Out        | J-6, T-8, S-1, TL, L-6     | RK-006 verteilt an alle Geräte               |
| Notes  | EZ-AG, J-6, S-1, TL      | S-1, TL, J-6, T-8          | MERGE-5 → U6 → RK-006 Out                    |
| CC     | EZ-AG, J-6, S-1, E-4     | S-1, T-8, J-6, TL, E-4, L-6 | MERGE-5 filtert → U6 → RK-006 → Zielgeräte   |
| PC/PM  | EZ-AG, Commander, RK-006 | L-6, J-6, T-8, S-1, TL, E-4 | Direkt oder via RK-006 Filter/Routing       |

---

👉 Kapitel 12 liefert die Übersicht, welche Geräte im Setup **Sender/Empfänger** für CC & PC sind und welche **Workflows** sich daraus ergeben.  
Die Details zu Presets, Filtern und Szenen finden sich in den jeweiligen Kapiteln (4, 5, 6, 7, 12).
