<a id="readme-tiagemusic-geraetesetup"></a>
# 📘 README – TiageMusic Gerätesetup

<a id="ueberblick"></a>
## Überblick
Dieses Repository enthält die gesamte Dokumentation und Struktur für das **TiageMusic Gerätesetup**.  
Alle Inhalte sind modular aufgebaut:  
- **Manifest (`manifest.json`)** → definiert Kapitelstruktur & Dateipfade. 
das manifest ist deckungsgleich mit dem ##Inhalt dieser README datei.  
- **Markdown-Kapitel (`chapters/*.md`)** → inhaltliche Texte (Audio, MIDI, Workflows).  
- **Dokumente (`docs/*.pdf`)** → Original-Handbücher, Referenzen.  
- **Schema (`modules/*.xsd`)** → strukturelle Validierung.  
- **Modules (`.xlm`)** → settings.

<a id="inhalt"></a>
## Inhalt
- **chapters/** → Hauptinhalte als `.md`
  - 100_einleitung.md
  - 200_geraeteuebersicht.md
  - 300_Audio.md
  - 310_first_steps_audio_routing.md
  - 320_workflows_audio.md
  - 330_texture_lab.md
  - 500_Midi.md
  - 510_first_steps_midi_routing.md 
  - 520_workflows_midi.md
  - 800_zusammenfassung.md

- **docs/** → PDF-Handbücher und Zusatzmaterial
  - Zoom L-6, Roland J-6, TR-6S, E-4, S-1, Sonicware Ambient0, CME U6MIDI Pro, etc.
- **Modules/**
  - tiagemusic-geraetesetup.xsd  
  - presets.xml  
  - scenes.xml  
  - workflows.xml 
  - TiageMusic-setup.xml

<a id="manifest"></a>
## Manifest
Aktuelle Version: **v1.6**

 Gibt in der jeweilig aktuellsten Version strikt die Kapitelstruktur vor. Wenn keine MD datei mit dem 
 Titel innerhalb des Documents vorhanden ist wird diese md datei leer angelegt 

<a id="workflow"></a>
## Workflow
1. **Inhalt kommentieren**: comment.Json speichert alle kommentare bezogen auf Kapitel MD's gemäß Inhaltsstruktur.
2. **Json1**: Exportieren der `comment.json` und weiterleiten an chatGPT
3. **Prozessieren**: ChatGPT sammelt anhand der Kommentare bezogen auf den Kapitelinhalt und 
dessen Struktur für jeden Kommentar nacheinander mit dem User Verbesserungs -und Ergänzungsvorschläge 
für das jeweilige Kapitel und sammelt die Anpassungen  mit den Referenzen zum Kapitel in`Json2.json` nach Bestätigung mit "OK übernehmen") . 
4. **Markdown-Dateien anpassen** `Apply.Json` ändert die `chapters/*.md`.  
5. **Struktur bleibt**: Bei wünschen bzgl. weiteren Kapiteln Änderungen in `manifest.json` eintragen.
Es sind nur Unterkapitel Möglich und erlaubt. Nummernkreis 1xx-8xx bleibt unberührt. 
6. **Referenzen nutzen**: PDFs in `docs/` dienen nur als Nachschlagewerk.  
7. **Import/Export**: JSON2-Workflow erlaubt automatisches Einspielen von Kommentaren & Versionen über die Workbench. 
8. **Workflows**: mit preset.xml (2x CME U6 MIDI PRo) und scenes.xml können verschiedene Einstellungen am System gepeichert 
werden. Die Workflows sind in Bezug zum Signalfluss zu kopien, zu ändern dann bzgl. Möglichkeiten der Steuerung zu bewerten und schließlich zu speichern.  

© TiageMusic Projekt, 2025
