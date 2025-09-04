// scripts/json2-handler.js
// Klassische <script>-Variante (legt Funktionen unter window.JSON2H ab)

window.JSON2H = (function(){
  function createAction(chapterId, cid, type, id, contentMd) {
    return {
      chapter_id: String(chapterId),
      cid: String(cid),
      type,
      id,
      content_md: contentMd || ""
    };
  }
  function build(actions = []) { return { actions }; }
  function exportFile(json2, filename = "Struktur_JSON2.json") {
    const blob = new Blob([JSON.stringify(json2, null, 2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {href:url, download:filename});
    a.click(); URL.revokeObjectURL(url);
  }
  return { createAction, build, exportFile };
})();

