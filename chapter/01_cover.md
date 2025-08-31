# Masterplan Setup – Cover

Dies ist die aktuelle Übersicht über die Verkabelung und Signalwege im System.  
Alle weiteren Kapitel (2–27) behandeln die Details, Szenen und Workflows im Einzelnen.  
Dieses Cover liefert die **komplette Verbindungstabelle** als Einstieg.

---

## 1. Verbindungen (MIDI & Audio)

### MIDI-Verbindungen
| Von Gerät        | Stecker        | Zu Gerät        | Stecker      | Signal             | Bemerkung                         | Referenz |
|------------------|---------------|----------------|-------------|--------------------|-----------------------------------|----------|
| EZ-AG Out        | 5-pol DIN     | MERGE-5 In 1   | 5-pol DIN   | Notes+PC+MMC+SysEx | alles durchlassen                 | Kap. 3 / 7 |
| J-6 Out          | 5-pol DIN     | MERGE-5 In 2   | 5-pol DIN   | Clock+Notes        |                                   | Kap. 4 |
| T-8 Out          | 5-pol DIN     | MERGE-5 In 3   | 5-pol DIN   | Clock+Notes        |                                   | Kap. 4 |
| S-1 Out          | 5-pol DIN     | MERGE-5 In 4   | 5-pol DIN   | Clock+Notes        |                                   | Kap. 5 |
| Texture Lab Out  | 5-pol DIN     | MERGE-5 In 5   | 5-pol DIN   | Notes/CC           |                                   | Kap. 6 |
| MERGE-5 Out A    | 5-pol DIN     | U6 In 1        | 5-pol DIN   | Alle Signale       | Hauptweg                          | Kap. 1 |
| MERGE-5 Out B    | 5-pol DIN     | RK-006 In B    | 5-pol DIN   | Notes empfohlen    | Vermeidet doppelte Clock          | Kap. 1 |
| U6 Out 1         | 5-pol DIN     | RK-006 In A    | 5-pol DIN   | Alle Signale       | Hauptweg                          | Kap. 1 |
| U6 Out 2         | 5-pol DIN     | Zoom L-6       | 5-pol DIN   | MMC/PC             | Szenensteuerung                   | Kap. 12 |
| RK-006 Out 1     | 5-pol DIN     | J-6 In         | 5-pol DIN   | Clock              |                                   | Kap. 4 |
| RK-006 Out 2     | 5-pol DIN     | T-8 In         | 5-pol DIN   | Clock              |                                   | Kap. 4 |
| RK-006 Out 3     | 5-pol DIN     | Texture Lab In | 5-pol DIN   | Clock+Notes        |                                   | Kap. 6 |
| RK-006 Out 4     | 5-pol DIN     | Zoom L-6       | 5-pol DIN   | MMC/PC             |                                   | Kap. 12 |
| RK-006 Out 5     | 5-pol DIN     | S-1 In         | 5-pol DIN   | Clock+Notes        | Synchronisiert Arp/Sequencer      | Kap. 5 |

---

### Audio-Verbindungen
| Von Gerät        | Stecker       | Zu Gerät      | Stecker      | Signal   | Bemerkung            | Referenz |
|------------------|--------------|--------------|-------------|----------|----------------------|----------|
| Roland T-8 Out   | TRS Stereo   | Zoom L-6 In  | TRS Stereo  | Audio    | Direkt               | Kap. 4 |
| Roland J-6 Out   | TRS Stereo   | Zoom L-6 In  | TRS Stereo  | Audio    | Direkt               | Kap. 4 |
| Roland S-1 Out   | TRS Stereo   | Zoom L-6 In  | TRS Stereo  | Audio    | Direkt               | Kap. 5 |
| Roland E-4 Out   | TRS Stereo   | Zoom L-6 In  | TRS Stereo  | Audio    | Vocals & Effekte     | Kap. 7 |
| Texture Lab Out  | TRS Stereo   | Zoom L-6 In  | TRS Stereo  | Audio    | Granular-Sounds      | Kap. 6 |
| Zoom L-6 Phones  | TRS          | Kopfhörer    | TRS         | Audio    | Monitoring           | Kap. 12 |

---
