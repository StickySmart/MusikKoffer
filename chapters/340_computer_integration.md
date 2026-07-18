<a id="computer-integration"></a>
# Computer-Integration

Version: 2025-07-17

Dieses Kapitel beschreibt, wie der Computer optional in das MusikKoffer-System eingebunden wird – sowohl für Audio-Aufnahme über den Zoom L-6 als auch für den Netzwerkzugriff auf externe Audio-Dateien (z. B. vom Mac).

## Audio-Engine (Linux)

**Entscheidung: PipeWire (Standard-Profil), kein zusätzlicher JACK-Server nötig.**

### Begründung

Das MIDI-Clock-System (Kapitel 500) läuft vollständig autark in Hardware – der CME H4 WIDI Core routet Clock/Notes zwischen TR-6S, S-1, J-6, E-4 und Ambient Ø, ohne dass der Computer beteiligt ist. Der Computer kommt ausschließlich über den Zoom L-6 USB-Audio-Anschluss ins Spiel (siehe Kapitel 310, "Audio-Interface Modi").

Da nur eine einzelne USB-Audio-Schnittstelle (L-6) angebunden wird und kein Software-Patchbay mit mehreren synchronisierten Anwendungen benötigt wird, deckt PipeWire den Anwendungsfall vollständig ab:

| Kriterium | PipeWire (Standard) | JACK2 |
|---|---|---|
| USB-Audio-Class-Geräte (L-6) | Nativ unterstützt | Nativ unterstützt |
| Moduswechsel Stereo ↔ Multitrack | Automatisch via WirePlumber-Profile | Manueller Neustart nötig |
| Alltagstauglichkeit (Desktop-Audio parallel) | Ja | Nein (exklusiver Zugriff) |
| Notwendig für dieses Setup | Ja, ausreichend | Nur falls DAW zwingend JACK-Transport braucht |

**Status:** PipeWire + WirePlumber aktiv, `pipewire-jack`-Kompatibilitätsmodule vorhanden, aber nicht aktiviert (derzeit nicht benötigt).

## Netzwerkzugriff auf Mac Audio-Dateien (SMB)

**Status: Geplant, noch nicht eingerichtet.** Einfacher SMB-Zugriff vom Linux-Computer auf die Audio-Dateien des Mac – reicht als Notiz, keine tiefere Doku nötig.

## Netzwerk-MIDI (Ausblick)

Sobald MIDI-Daten übers Netzwerk laufen sollen (z. B. RTP-MIDI zwischen Mac und Linux-Computer), wird das ein eigener, detaillierterer Abschnitt – das ist der Teil, der wirklich interessant wird.

---

Siehe auch:
- Kapitel 300: Audio-Grundlagen & Verkabelung
- Kapitel 310: Audio-Interface Modi des Zoom L-6
- Kapitel 500: MIDI-Routing & Synchronisation
