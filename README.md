# Tiage Music Masterplan 25

Dies ist das zentrale Repository für das **Tiage Music Setup**.  
Es kombiniert klassische Markdown-Kapitel (Prosa, Bedienhinweise) mit einer strukturierten XML-Basis (SSOT = Single Source of Truth).

---

## 📂 Projektstruktur

- `index.html`
- `manifest.json`
- `chapters/`
  - 01_cover.md
  - 02_first_steps_audio.md
  - 03_first_steps_midi.md
  - 04_workflows_zoom_l6.md
  - 05_geraeteuebersicht.md
  - 06_midi_setup.md
  - 07_audio_routing.md
  - 08_texture_lab.md
  - 09_performance_workflows.md
  - 10_zusammenfassung.md
- `geraetesetup.xml`
- `presets.xml`
- `scenes.xml`
- `workflows.xml`
- `tiagemusic-geraetesetup.xsd`

---

## 📝 Kapitel

Die **Kapitel** (Markdown) enthalten ausschließlich **textuelle Beschreibungen**:

- Cover, Einleitung  
- Audio-Setup  
- MIDI-Setup  
- Workflows  
- Geräteübersicht  
- Nutzung von Zoom L-6, Texture Lab usw.  

Tabellen, Ports und Verbindungen werden **nicht mehr in den Kapiteln** gepflegt – sie sind in den XML-Dateien hinterlegt.

---

## ⚙️ XML-Basis (SSOT)

Die **XML-Dateien** bilden die technische Basis des Systems:

- `geraetesetup.xml` → Geräte und Ports  
- `presets.xml` → MIDI-Presets (Routing der U6, Filter)  
- `scenes.xml` → Mixer-Szenen des Zoom L-6  
- `workflows.xml` → Kombinationen aus Presets + Szenen + Spielbarkeitsangaben  

Alle XML-Dateien validieren gegen `tiagemusic-geraetesetup.xsd`.

---

## 🌐 Darstellung im Browser

Die Datei **`index.html`**:

- lädt `manifest.json`  
- zeigt Kapitel aus `/chapters`  
- zeigt XML-Module (`geraetesetup.xml`, `presets.xml`, `scenes.xml`, `workflows.xml`)  
- ermöglicht das Exportieren/Importieren von Kommentaren (JSON)  

Navigation erfolgt über die Sidebar.  
Kommentare beziehen sich nur auf die **textuellen Beschreibungen** und können im Dialog geprüft und freigegeben werden.

---

## 🚀 Nächste Schritte

- Kapitel inhaltlich erweitern (Prosa, Bedienung, Bemerkungen, Potential).  
- Workflows interpretieren und dokumentieren.  
- Weitere Szenen & Presets ins XML aufnehmen.