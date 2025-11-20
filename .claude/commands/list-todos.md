---
description: Zeigt eine Übersicht aller TODO-Marker in der Dokumentation
---

# TODO-Report Generator

Erstelle einen detaillierten Report aller offenen TODO-Marker in der MusikKoffer Dokumentation.

## Aufgabe

1. Durchsuche alle Kapitel-Dateien (chapters/*.md) nach TODO-Markern
2. Extrahiere TODO-Text und Kontext
3. Kategorisiere nach Priorität (wenn angegeben)
4. Erstelle einen formatierten deutschen Report

## Report-Format

```markdown
# TODO-Übersicht – TiageMusic Dokumentation
Generiert: [Datum/Zeit]

## Zusammenfassung
- Gesamt: [N] offene TODOs
- Hoch-Priorität: [X]
- Normal: [Y]
- Kapitel betroffen: [M]

## Nach Kapitel

### [Kapitel-Nummer] – [Kapitel-Titel]
#### TODO 1
**Zeile:** [Zeilennummer]
**Priorität:** [hoch/normal]
**Aufgabe:** [TODO-Text]
**Kontext:** [1-2 Zeilen Kontext]

---

## Empfohlene Reihenfolge
1. [Wichtigstes TODO]
2. [Zweitwichtigstes TODO]
...
```

## TODO-Syntax Parsing

Erkenne diese Formate:
- `<!-- TODO: text -->` → Normal
- `<!-- TODO(urgent): text -->` → Hoch-Priorität
- `<!-- TODO(hoch): text -->` → Hoch-Priorität
- `<!-- TODO @kategorie: text -->` → Mit Kategorie
- `<!-- TODO [CID]: text -->` → Mit Anker-Referenz

## Ausgabe

Zeige den Report direkt dem Benutzer.
Optional: Biete an, den Report als `TODO_REPORT.md` zu speichern.

Erstelle jetzt den TODO-Report!
