function applyJson2(json2) {
  let applied = 0;

  Object.keys(json2).forEach(chapterKey => {
    const entry = json2[chapterKey];
    if (!entry.actions) return;

    const container = document.querySelector(`[data-chapter="${chapterKey}"] pre`);
    if (!container) return;

    let newContent = container.textContent;

    entry.actions.forEach(action => {
      if (action.type === "insert_after") {
        // gezielt nach einer Überschrift einfügen
        const regex = new RegExp(`(## ${action.after})`, "i");
        newContent = newContent.replace(regex, `$1\n\n${action.content_md}`);
        applied++;
      }

      if (action.type === "replace_section") {
        // Abschnitt zwischen zwei Überschriften ersetzen
        const regex = new RegExp(`(## ${action.section}[\\s\\S]*?)(?=## |$)`, "i");
        newContent = newContent.replace(regex, `## ${action.section}\n\n${action.content_md}`);
        applied++;
      }

      if (action.type === "append_table") {
        // neue Tabellenzeile am Ende anhängen
        const regex = new RegExp(`(\\|[-]+.*\\|\\n)([\\s\\S]*?)$`, "m");
        newContent = newContent.replace(regex, `$1$2${action.content_md}\n`);
        applied++;
      }
    });

    if (applied > 0) {
      const revFile = `${chapterKey}_rev${Date.now()}.md`;
      downloadRevision(revFile, newContent);
      container.textContent = newContent;
    }
  });

  alert(applied > 0 ? `${applied} Änderungen angewendet.` : "Keine Änderungen aus JSON2 angewendet.");
}