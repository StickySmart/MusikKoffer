async function applyJson2(json2) {
  try {
    const res = await fetch("manifest.json?v=" + Date.now());
    const manifest = await res.json();

    let results = "";

    // alle Kapitel aus dem Manifest laden
    for (let ch of manifest.chapters) {
      const chapterKey = ch.path.split("/").pop(); // z.B. 03_first_steps_audio_routing.md
      const resCh = await fetch(ch.path);
      if (!resCh.ok) continue;

      let text = await resCh.text();

      // nur dann anwenden, wenn JSON2 was für dieses Kapitel hat
      if (json2[chapterKey] && Array.isArray(json2[chapterKey].actions)) {
        json2[chapterKey].actions.forEach(action => {
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
      }

      results += `<h3>${ch.title}</h3><pre>${text}</pre>`;
    }

    if (!results) results = "<p>Keine Änderungen aus JSON2 angewendet.</p>";
    content.innerHTML = results;

  } catch (err) {
    content.innerHTML = `<p style="color:red">Fehler beim globalen Import: ${err}</p>`;
  }
}