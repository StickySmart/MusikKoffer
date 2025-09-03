function applyJson2(json2) {
  if (!currentChapter) {
    alert("Kein Kapitel geladen.");
    return;
  }

  // Dateiname als Key für json2 bestimmen
  let chapterKey = currentChapter.split('/').pop();
  let keyWithPath = "chapters/" + chapterKey;

  if (!json2[keyWithPath] || !Array.isArray(json2[keyWithPath].actions)) {
    alert("Kein passender Eintrag oder keine Aktionen in JSON2 für " + keyWithPath);
    return;
  }

  let actions = json2[keyWithPath].actions;
  let text = currentText;

  actions.forEach(action => {
    if (action.type === "insert_after") {
      let regex = new RegExp(action.selector, "i");
      text = text.replace(regex, match => match + "\n" + action.content_md);
    } else if (action.type === "append") {
      text += "\n" + action.content_md;
    } else if (action.type === "remove_section") {
      let regex = new RegExp(action.selector, "gi");
      text = text.replace(regex, "");
    } else if (action.type === "augment_blocks") {
      // einfache Variante: hängt Mapping als Liste unten an
      if (action.fields && action.fields.length > 0) {
        text += "\n\n### Erweiterte Infos\n";
        action.fields.forEach(f => {
          for (let [device, info] of Object.entries(f.mapping)) {
            text += `- ${device}: ${info}\n`;
          }
        });
      }
    }
  });

  content.innerHTML = `<article><pre>${text}</pre></article>`;
}