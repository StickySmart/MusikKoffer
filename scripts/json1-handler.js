// scripts/json1-handler.js
// Klassische <script>-Variante (legt Funktionen unter window.JSON1 ab)

window.JSON1 = (function(){
  async function load(path = "imports/Struktur_JSON1.json") {
    const r = await fetch(path);
    if (!r.ok) throw new Error(`Konnte ${path} nicht laden (${r.status})`);
    const d = await r.json();
    return d.comments || [];
  }
  function filterByChapter(comments, chapterId) {
    return (comments||[]).filter(c => String(c.chapter_id) === String(chapterId));
  }
  function markDone(comments, cid) {
    const x = (comments||[]).find(c => String(c.cid) === String(cid));
    if (x) x.status = "done";
    return comments;
  }
  function exportFile(comments, filename = "Struktur_JSON1.json") {
    const blob = new Blob([JSON.stringify({comments}, null, 2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {href:url, download:filename});
    a.click(); URL.revokeObjectURL(url);
  }
  return { load, filterByChapter, markDone, exportFile };
})();

