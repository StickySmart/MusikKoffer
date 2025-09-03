# 17. MIDI-Verkabelung (final, mit CME U6 Pro, Roland-Kette + EZ + L-6)

| Reihenfolge / Quelle (MIDI OUT) | Ziel (MIDI IN) | Bemerkung |
|---|---|---|
| **T-8 OUT** | **RK-006 IN A** | Clock-Master (separat, direkte Verbindung) |
| **EZ-AG OUT** | **CME U6 Pro IN** | Noten + PC/MMC |
| **J-6 OUT** | **S-1 IN** | Start der Roland-Kette |
| **S-1 OUT** | **E-4 IN** | Weitergabe in der Kette |
| **E-4 OUT** | **Zoom L-6 IN** | Weitergabe in der Kette |
| **Zoom L-6 OUT** | **CME U6 Pro IN** | Abschluss der Kette, Einspeisung in die CME |
| **CME U6 Pro OUT** | **RK-006 IN B** | gebuendelte Signale: EZ-AG + komplette Roland/L6-Kette |

**RK-006 Outputs**
- Out1 -> J-6 (nur Clock vom T-8)
- Out2 -> E-4 (nur Clock vom T-8)
- Out3 -> Texture Lab (Clock von A + Notes von B)
- Out4 -> Zoom L-6 (PC/MMC von EZ-AG fuer Scene Recall + Transport)
- Out5 -> S-1 (Notes von EZ-AG ueber CME)

---
