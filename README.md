# 📘 README – TiageMusic Gerätesetup

## Überblick
Dieses Repository enthält die gesamte Dokumentation und Struktur für das **TiageMusic Gerätesetup**.  
Alle Inhalte sind modular aufgebaut:  
- **Manifest (`manifest.json`)** → definiert Kapitelstruktur & Dateipfade.  
- **Markdown-Kapitel (`chapters/*.md`)** → inhaltliche Texte (Audio, MIDI, Workflows).  
- **Dokumente (`docs/*.pdf`)** → Original-Handbücher, Referenzen.  
- **Schema (`.xsd`)** → strukturelle Validierung.  

## Inhalt
- **chapters/** → Hauptinhalte als `.md`
  - 100_cover.md
  - 200_geraeteuebersicht.md
  - 310_first_steps_audio_routing.md
  - 320_workflows_audio.md
  - 330_texture_lab.md
  - 510_first_steps_midi_setup.md (+ Subkapitel *Routing Performance*)
  - 520_workflows_midi.md
  - 800_zusammenfassung.md
- **docs/** → PDF-Handbücher und Zusatzmaterial
  - Zoom L-6, Roland J-6, T-8, E-4, S-1, Sonicware Texture Lab, CME U6MIDI Pro, etc.
- **schema/**
  - tiagemusic-geraetesetup.xsd
- **json/**  
  - presets.xml  
  - scenes.xml  
  - workflows.xml  

## Manifest
Aktuelle Version: **v1.3**

Änderungen gegenüber v1.0:
- *MIDI Routing Performance* ist Unterpunkt im MIDI-Kapitel.  
- Kapitel 04 kombiniert Geräteübersicht mit Texture Lab, mit Unterpunkten *Audio* und *MIDI*.  
- Kapitel 05 aufgeteilt in **Recording / Performance / Mixdown**.  

## Workflow
1. **Inhalt bearbeiten**: Markdown-Dateien (`chapters/*.md`).  
2. **Struktur pflegen**: Änderungen an `manifest.json` eintragen.  
3. **Referenzen nutzen**: PDFs in `docs/` dienen nur als Nachschlagewerk.  
4. **Import/Export**: JSON2-Workflow erlaubt automatisches Einspielen von Kommentaren & Versionen über die Workbench.  


## Linting
Installiere zuerst die Abhängigkeiten und führe anschließend ESLint aus:

```bash
npm install
npm run lint
```

---

© TiageMusic Projekt, 2025
