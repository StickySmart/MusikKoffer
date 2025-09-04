// scripts/json2-handler.js
// Erzeugt JSON2 aus den Kommentaren (JSON1)
function generateJSON2(json1) {
  const actions = json1.comments.map(c => ({
    chapter_id: c.chapter_id,
    cid: c.cid,
    type: "insert_after",
    id: `fix_${c.cid}`,
    content_md: `> TODO: ${c.comment}`
  }));
  const json2 = { actions };
  console.log("JSON2 erzeugt:", json2);
  return json2;
}