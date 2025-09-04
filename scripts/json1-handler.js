// scripts/json1-handler.js
// Lädt und verarbeitet Struktur_JSON1.json

async function loadJSON1(path = "imports/Struktur_JSON1.json") {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Konnte ${path} nicht laden`);
  const data = await res.json();
  return data.comments || [];
}

function filterCommentsByChapter(comments, chapterId) {
  return comments.filter(c => c.chapter_id === chapterId);
}

function markCommentDone(comments, cid) {
  const c = comments.find(c => c.cid === cid);
  if (c) c.status = "done";
  return comments;
}

async function exportJSON1(comments, path = "exports/Struktur_JSON1.json") {
  const blob = new Blob([JSON.stringify({ comments }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "Struktur_JSON1.json";
  a.click();
  URL.revokeObjectURL(url);
}
