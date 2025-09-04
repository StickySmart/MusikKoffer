// scripts/json2-handler.js
// Erstellt und exportiert Struktur_JSON2.json aus Aktionen

function createAction(chapterId, cid, type, id, content) {
  return {
    chapter_id: chapterId,
    cid: cid,
    type: type,        // insert_after, insert_before, append, replace, remove_section
    id: id,            // z. B. "ACTION_001"
    content_md: content
  };
}

function buildJSON2(actions = []) {
  return { actions };
}

async function exportJSON2(json2, path = "exports/Struktur_JSON2.json") {
  const blob = new Blob([JSON.stringify(json2, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "Struktur_JSON2.json";
  a.click();
  URL.revokeObjectURL(url);
}
