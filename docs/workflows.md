<a id="workflows"></a>
# Workflows

<a id="aktive-geraete-anzeigen"></a>
## Aktive Geräte anzeigen

Nach dem Aktivieren eines Workflows ermittelt `resolveSignalPath` alle beteiligten Geräte. Die Funktion geht die aktiven Verbindungen vom Ziel „L6 Master“ rückwärts durch und sammelt dabei die `deviceRef` der Quellen. Anschließend wird die Liste der Geräte im Element `#active-device-list` angezeigt.
