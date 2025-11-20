---
description: Verarbeitet TODOs aus localStorage und fügt sie in Kapitel-Dateien ein
---

# TODO-Verarbeitung aus UI

## Aufgabe

Hole TODOs aus der Browser localStorage der Workbench und verarbeite sie vollständig.

## Ablauf

### Schritt 1: TODOs aus localStorage holen

Der Benutzer hat TODOs über die Workbench-UI erstellt. Diese sind gespeichert unter:
- localStorage key: `musikkoffer_todos`
- Alternativ: `window.MUSIKKOFFER_TODOS` (falls verfügbar)

Frage den Benutzer nach den gespeicherten TODOs:
```
Bitte öffne in deinem Browser die Workbench und drücke F12 (Developer Console).
Gib dort ein:
JSON.stringify(JSON.parse(localStorage.getItem('musikkoffer_todos')), null, 2)

Kopiere die komplette Ausgabe und füge sie hier ein.
```

### Schritt 2: TODOs in Markdown-Dateien einfügen

Für jedes TODO:
1. Identifiziere die Ziel-Datei aus `chapterFile`
2. Lese die Kapitel-Datei
3. Füge den TODO-Marker ein:
   - Format: `<!-- TODO: {text} -->`
   - Bei Hoch-Priorität: `<!-- TODO(hoch): {text} -->`
   - Bei Kategorie: `<!-- TODO @{category}: {text} -->`
4. Platzierung: Am Ende des Kapitels (vor dem letzten Absatz)

### Schritt 3: Inhalte generieren

Für jedes eingefügte TODO:
1. Lese Kontext (30 Zeilen vor/nach)
2. Analysiere verwandte Kapitel
3. Generiere deutschen, technisch korrekten Inhalt
4. Ersetze TODO-Marker durch generierten Content

### Schritt 4: Cleanup

1. Markiere TODOs in localStorage als `"status": "processed"`
2. Committe alle Änderungen:
   ```
   git commit -m "docs: Verarbeite UI-TODOs in [Kapitel-Liste]

   - TODO 1: [Beschreibung]
   - TODO 2: [Beschreibung]

   Verarbeitet: [N] TODOs aus Workbench-UI"
   ```

## Qualitätsstandards

- Deutsche Sprache
- Mindestens 50 Zeilen für konzeptuelle TODOs
- Praktische Beispiele
- Technisch korrekt
- Markdown-formatiert

## Wichtig

- Verarbeite ALLE pending TODOs in einem Durchlauf
- Zeige Fortschritt für jedes TODO
- Erstelle einen aussagekräftigen Commit

Beginne mit Schritt 1: Bitte den Benutzer um die localStorage-Daten!
