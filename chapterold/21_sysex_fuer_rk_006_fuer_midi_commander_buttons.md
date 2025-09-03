# 21. SysEx fuer RK-006 (fuer Midi Commander Buttons)

**Allgemeines Format**
```
F0 00 21 23 00 06 <CMD/RSP> <args...> F7
```

**Wichtige Befehle fuer Handy-Steuerung**
- **Recall Preset**  
  ``F0 00 21 23 00 06 0F 00 <PresetNr> F7``
- **Commit Preset**  
  ``F0 00 21 23 00 06 07 00 <PresetNr> F7``
- **Factory Reset**  
  ``F0 00 21 23 00 06 05 F7``

*Diese Hex-Codes kannst du direkt im **Midi Commander** auf Buttons legen, um RK-006 Presets zu waehlen oder Reset/Commit zu senden - ohne Computer.*

---
