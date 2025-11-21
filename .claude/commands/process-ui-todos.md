---
description: Verarbeitet TODOs aus modules/todos.json und aktualisiert Kapitel-Dateien
---

# TODO-Verarbeitung (Datei-basiert)

## Aufgabe

Lese und verarbeite TODOs aus `modules/todos.json`. Diese Datei ist die zentrale Quelle für alle TODOs und funktioniert geräteübergreifend.

## Ablauf

### Schritt 1: TODOs aus Datei laden

1. Lese `modules/todos.json`
2. Filtere alle TODOs mit `"status": "pending"`
3. Falls keine pending TODOs: Frage den User, ob er TODOs per JSON-Export (Copy/Paste) übergeben möchte

Falls der User TODOs per JSON übergibt:
- Parse das JSON
- Extrahiere die `todos` Array

### Schritt 2: TODOs verarbeiten

Für jedes TODO:
1. Identifiziere die Ziel-Datei aus `chapterFile`
2. Lese die Kapitel-Datei (falls vorhanden)
3. Führe die gewünschte Aktion aus:
   - Text-Änderungen direkt umsetzen
   - Neue Inhalte generieren
   - Entfernungen durchführen
4. Dokumentiere was getan wurde

### Schritt 3: todos.json aktualisieren

1. Ändere Status der verarbeiteten TODOs auf `"processed"`
2. Füge `processedAt` Timestamp hinzu
3. Füge `result` Beschreibung hinzu (was wurde gemacht)
4. Schreibe aktualisierte `modules/todos.json`

Beispiel für aktualisiertes TODO:
```json
{
  "id": "todo_123...",
  "chapterFile": "200_geraeteuebersicht.md",
  "text": "Texture Lab entfernen",
  "status": "processed",
  "processedAt": "2025-11-21T...",
  "result": "Texture Lab aus Geräteliste und MIDI-Routing entfernt"
}
```

### Schritt 4: Commit

Committe alle Änderungen:
```
git commit -m "docs: Verarbeite TODOs aus Workbench

- TODO 1: [Beschreibung]
- TODO 2: [Beschreibung]

Verarbeitet: [N] TODOs"
```

## Workflow für User

1. TODOs in Workbench erstellen (beliebiges Gerät)
2. "TODOs exportieren" klicken → JSON wird kopiert
3. Claude-Session starten, JSON einfügen
4. Claude verarbeitet und aktualisiert `modules/todos.json`
5. Nach Push: Seite neu laden → Zähler sind aktualisiert

## Qualitätsstandards

- Deutsche Sprache
- Praktische, umsetzbare Änderungen
- Technisch korrekt
- Klare Dokumentation was getan wurde

## Wichtig

- Verarbeite ALLE pending TODOs in einem Durchlauf
- Zeige Fortschritt für jedes TODO
- Aktualisiere `modules/todos.json` mit Ergebnissen
- Erstelle aussagekräftigen Commit

Beginne: Lese `modules/todos.json` oder frage nach JSON-Export!
