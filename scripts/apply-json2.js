function applyJson2(json2) {
  if (!currentChapter) {
    alert("Kein Kapitel geladen.");
    return;
  }

  // Dateiname (z. B. "02_geraeteuebersicht.md")
  let chapterKey = currentChapter.split('/').pop();

  if (!json2[chapterKey]) {
    alert("Kein passender Eintrag in JSON2 für " + chapterKey);
    return;
  }

  let actions = json2[chapterKey].actions;
  let text = currentText;

  actions.forEach(action => {
    if (action.type === "insert_after") {
      let regex = new RegExp(action.target, "i");
      text = text.replace(regex, match => match + "\n" + action.text);
    } else if (action.type === "replace") {
      let regex = new RegExp(action.target, "i");
      text = text.replace(regex, action.text);
    } else if (action.type === "append") {
      text += "\n" + action.text;
    }
  });

  // Ergebnis im Content-Bereich anzeigen
  content.innerHTML = `<pre>${text}</pre>`;
}