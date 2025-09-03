function applyJson2(json2) {
  if (!json2) {
    alert("Keine JSON2-Daten geladen.");
    return;
  }

  let applied = 0;

  // Alle Kapitel in JSON2 durchgehen
  Object.keys(json2).forEach(chapterKey => {
    const entry = json2[chapterKey];
    if (!entry.actions) return;

    entry.actions.forEach(action => {
      // Stelle sicher, dass wir den richtigen Container für das Kapitel haben
      const container = document.querySelector(`[data-chapter="${chapterKey}"]`);
      if (!container) return;

      let text = container.innerHTML;

      if (action.type === "insert_after") {
        let targetEl = container.querySelector(action.selector);
        if (targetEl) {
          targetEl.insertAdjacentHTML("afterend", action.content_md);
          applied++;
        }
      }

      if (action.type === "append") {
        container.insertAdjacentHTML("beforeend", action.content_md);
        applied++;
      }

      if (action.type === "remove_section") {
        let targets = container.querySelectorAll(action.selector);
        targets.forEach(t => t.remove());
        applied++;
      }

      if (action.type === "augment_blocks") {
        // Spezialfall – Mapping anwenden
        let lis = container.querySelectorAll(action.selector);
        lis.forEach(li => {
          let name = li.textContent.trim();
          let extra = action.fields[0].mapping[name];
          if (extra) {
            li.innerHTML += ` – <em>${extra}</em>`;
            applied++;
          }
        });
      }
    });
  });

  alert(applied > 0 ? `${applied} Änderungen aus JSON2 angewendet.` : "Keine Änderungen aus JSON2 angewendet.");
}