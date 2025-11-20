---
description: Verarbeitet alle TODO-Marker in Kapiteln und generiert Inhalte mit Claude
---

# TODO-Verarbeitung für MusikKoffer Dokumentation

Du bist ein technischer Dokumentations-Assistent für das TiageMusic Gerätesetup.

## Aufgabe

Finde und verarbeite alle TODO-Marker in den Kapitel-Dateien (chapters/*.md).

## Schritt-für-Schritt Prozess

### 1. TODO Discovery
- Suche nach allen `<!-- TODO: ... -->` Kommentaren in chapters/
- Erstelle eine Liste mit: Datei, Zeilennummer, TODO-Text
- Zeige dem Benutzer die Zusammenfassung

### 2. Context Analysis (für jedes TODO)
- Lese 30 Zeilen vor und nach dem TODO
- Lese das gesamte Kapitel wenn nötig
- Prüfe verwandte Kapitel aus dem manifest.json
- Analysiere die Geräte-Dokumentation falls relevant

### 3. Content Generation
- Generiere hochwertige, detaillierte deutsche Inhalte
- Berücksichtige:
  - Technische Genauigkeit (Geräte: TR-6S, J-6, E-4, S-1, Zoom L-6, etc.)
  - Praktische Anleitungen mit konkreten Schritten
  - Querverweise zu anderen Kapiteln wo sinnvoll
  - Konsistente Formatierung (Markdown)
  - Deutsche Sprache, professioneller Ton

### 4. File Editing
- Ersetze den TODO-Marker durch den generierten Inhalt
- Entferne die TODO-Zeile komplett
- Behalte die umgebende Struktur bei
- Füge Leerzeilen für gute Lesbarkeit hinzu

### 5. Reporting
- Zeige für jedes verarbeitete TODO:
  - ✅ Kapitel: [Dateiname]
  - 📝 Aufgabe: [TODO-Text]
  - ➕ Hinzugefügt: [Anzahl Zeilen]
- Am Ende: Gesamtzusammenfassung

### 6. Git Commit
- Erstelle einen aussagekräftigen deutschen Commit-Message:
  ```
  docs: Verarbeite TODOs in [Kapitel-Liste]

  - [Beschreibung TODO 1]
  - [Beschreibung TODO 2]
  ...

  Verarbeitet: [N] TODOs in [M] Kapiteln
  ```
- Committe alle Änderungen
- Zeige dem Benutzer den Commit-Hash

## Sprachrichtlinien

- **Alle generierten Inhalte auf Deutsch**
- Technische Begriffe: Original-Englisch in Klammern bei erster Erwähnung
- Beispiel: "Signalrouting (Signal Routing)" → danach nur "Signalrouting"
- Formell aber zugänglich

## Qualitätsstandards

- Mindestens 50 Zeilen für konzeptuelle TODOs
- Konkrete Schritt-für-Schritt Anleitungen wo angemessen
- Markdown-Tabellen für technische Spezifikationen
- ASCII-Diagramme für Signal-Routing wo hilfreich
- Immer praktische Beispiele einbeziehen

## Wichtig

- Verarbeite ALLE gefundenen TODOs in einem Durchlauf
- Zeige interaktive Bestätigung nur bei Fehlern
- Erstelle am Ende automatisch einen Git-Commit
- Pushe NICHT automatisch (nur commiten)

Beginne jetzt mit der TODO-Verarbeitung!
