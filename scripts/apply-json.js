// scripts/apply-json.js
// Kleine, dependency-freie Engine zum Anwenden von JSON2-Aktionen auf Markdown/HTML-Strings.
// Unterstützt Anker:
//   - Block:   <!-- cid:ID:start --> ... <!-- cid:ID:end -->
//   - Single:  <!-- cid:ID -->
//   - Heading: {#ID}
// Ops: insert_before, insert_after, replace_block, replace, delete,
//      prepend_to_heading, append_to_heading

(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ApplyJsonEngine = factory();
})(typeof self !== "undefined" ? self : this, function () {

  // --- Mini-YAML (nur Maps + einfache Werte) ---
  function parseYAML(y) {
    const o = {}; const stk = [{ indent: -1, obj: o }]; let cur = stk[0];
    const lines = (y || "").replace(/\r\n/g, "\n").split("\n");
    for (let raw of lines) {
      const s = raw.replace(/\t/g, "  ");
      if (!s.trim() || s.trim().startsWith("#")) continue;
      const ind = s.match(/^\s*/)[0].length;
      while (ind <= cur.indent) { stk.pop(); cur = stk[stk.length - 1]; }
      const m = s.match(/^(\s*)([^:]+):\s*(.*)$/); if (!m) continue;
      const k = m[2].trim(), v = m[3];
      if (!v) { cur.obj[k] = {}; stk.push({ indent: ind, obj: cur.obj[k] }); cur = stk[stk.length - 1]; }
      else cur.obj[k] = coerce(v);
    }
    return o;
    function coerce(s) {
      if (s === "true") return true;
      if (s === "false") return false;
      if (s === "null") return null;
      const q = s.match(/^"(.*)"$/) || s.match(/^'(.*)'$/); if (q) return q[1];
      if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
      return s;
    }
  }

  // --- Utils ---
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function surround(s, NL) {
    const L = s.startsWith(NL) ? "" : NL;
    const R = s.endsWith(NL) ? "" : NL;
    return L + s + R;
  }

  function applyJson({ json2, files, configYAML }) {
    const cfg = typeof configYAML === "string" ? parseYAML(configYAML) : (configYAML || {});
    const NL = (cfg.defaults && cfg.defaults.newline) || "\n";

    // Anchor templates (unterstützt beide Schreibweisen: single: "<tpl>" ODER single.value)
    const blockStartTpl = cfg.anchors?.block?.start || "<!-- cid:${id}:start -->";
    const blockEndTpl   = cfg.anchors?.block?.end   || "<!-- cid:${id}:end -->";
    const singleTpl     = (cfg.anchors?.single?.value) || cfg.anchors?.single || "<!-- cid:${id} -->";
    const headingTpl    = (cfg.anchors?.heading_id?.value) || cfg.anchors?.heading_id || "{#${id}}";

    const mustContent    = new Set((cfg.validation?.require_content_for) || []);
    const forbidContent  = new Set((cfg.validation?.forbid_content_for)  || []);

    const changelog = [];

    // --- Finder ---
    function findBlock(text, id) {
      const s = blockStartTpl.replace(/\$\{id\}/g, id);
      const e = blockEndTpl.replace(/\$\{id\}/g, id);
      const i = text.indexOf(s), j = text.indexOf(e);
      if (i === -1 || j === -1 || j < i) return null;
      return { start: i, innerStart: i + s.length, innerEnd: j, end: j + e.length };
    }
    function findSingle(text, id) {
      const a = singleTpl.replace(/\$\{id\}/g, id);
      const i = text.indexOf(a);
      if (i === -1) return null;
      return { idx: i, len: a.length };
    }
    function findHeading(text, id) {
      const tok = headingTpl.replace(/\$\{id\}/g, id);
      const re = new RegExp(`^.*${escRe(tok)}.*$`, "m");
      const m = re.exec(text);
      if (!m) return null;
      return { line: m[0], index: m.index, len: m[0].length };
    }

    // --- Ensure helpers (Auto-Anker) ---
    function ensureBlock(text, id) {
      const s = blockStartTpl.replace(/\$\{id\}/g, id);
      const e = blockEndTpl.replace(/\$\{id\}/g, id);
      return `${text}${text.endsWith(NL) ? "" : NL}${s}${NL}${e}${NL}`;
    }
    function ensureSingle(text, id) {
      const a = singleTpl.replace(/\$\{id\}/g, id);
      return `${text}${text.endsWith(NL) ? "" : NL}${a}${NL}`;
    }

    // --- Hauptloop über Aktionen ---
    for (const ch of (json2.actions || json2.changes || [])) {
      const op        = ch.op || ch.type;
      const chapterId = String(ch.chapter_id || "");
      const id        = String(ch.cid || ch.id || ch.data_cid || ""); // eigentliche Anker-ID
      const payload   = ch.content_md || ch.content || "";

      // Pflicht-/Verbot-Checks
      if (mustContent.has(op) && !payload) { changelog.push({ id, op, status: "error", msg: "content_md fehlt" }); continue; }
      if (forbidContent.has(op) && !!payload) { changelog.push({ id, op, status: "error", msg: "content_md nicht erlaubt" }); continue; }

      // Kapitel-/CID-Validierung
      if (cfg.validation?.chapter_id_pattern && chapterId) {
        const re = new RegExp(cfg.validation.chapter_id_pattern);
        if (!re.test(chapterId)) { changelog.push({ id, op, status: "error", msg: "ungültige chapter_id" }); continue; }
      }
      if (cfg.validation?.cid_rule && chapterId && id) {
        const cid  = Number(id);
        const chap = Number(chapterId);
        const ok = (cid >= chap && cid <= chap + 99);
        if (!ok) { changelog.push({ id, op, status: "error", msg: "cid außerhalb Kapitelbereich" }); continue; }
      }

      // Ziel-Dateien: alle, deren Name die chapter_id enthält (z. B. "chapters/200_*.md")
      const targetFiles = Object.keys(files).filter(name => !chapterId || name.includes(chapterId));
      if (!targetFiles.length) { changelog.push({ id, op, status: "skipped", msg: "keine Zieldatei zu chapter_id gefunden" }); continue; }

      for (const name of targetFiles) {
        let content = files[name];
        if (typeof content !== "string") continue;

        let touched = false;

        // 1) Block-Anker
        let b = id && findBlock(content, id);
        if (!b && id && op === "replace_block" && cfg.defaults?.create_block_if_missing) {
          content = ensureBlock(content, id);
          b = findBlock(content, id);
        }
        if (b) {
          if (op === "replace_block")      { content = content.slice(0, b.innerStart) + surround(payload, NL) + content.slice(b.innerEnd); touched = true; }
          else if (op === "delete")        { content = content.slice(0, b.start) + content.slice(b.end); touched = true; }
          else if (op === "insert_before") { content = content.slice(0, b.start) + surround(payload, NL) + content.slice(b.start); touched = true; }
          else if (op === "insert_after")  { content = content.slice(0, b.end)   + surround(payload, NL) + content.slice(b.end);   touched = true; }
          else if (op === "replace")       { content = content.slice(0, b.start) + surround(payload, NL) + content.slice(b.end);   touched = true; }
        }

        // 2) Single-Anker
        if (!touched && id) {
          let s = findSingle(content, id);
          if (!s && cfg.defaults?.insert_if_missing_anchor && (op === "insert_before" || op === "insert_after" || op === "replace")) {
            content = ensureSingle(content, id);
            s = findSingle(content, id);
          }
          if (s) {
            if (op === "insert_before") { content = content.slice(0, s.idx) + surround(payload, NL) + content.slice(s.idx); touched = true; }
            else if (op === "insert_after") { content = content.slice(0, s.idx + s.len) + surround(payload, NL) + content.slice(s.idx + s.len); touched = true; }
            else if (op === "replace") { content = content.slice(0, s.idx) + surround(payload, NL) + content.slice(s.idx + s.len); touched = true; }
            else if (op === "delete")  { content = content.slice(0, s.idx) + content.slice(s.idx + s.len); touched = true; }
          }
        }

        // 3) Heading-ID
        if (!touched && id) {
          const h = findHeading(content, id);
          if (h) {
            if (op === "prepend_to_heading") { content = content.slice(0, h.index) + surround(payload, NL) + content.slice(h.index); touched = true; }
            else if (op === "append_to_heading") { content = content.slice(0, h.index + h.len) + surround(payload, NL) + content.slice(h.index + h.len); touched = true; }
            else if (op === "replace") { content = content.slice(0, h.index) + surround(payload, NL) + content.slice(h.index + h.len); touched = true; }
            else if (op === "delete")  { content = content.slice(0, h.index) + content.slice(h.index + h.len); touched = true; }
          }
        }

        files[name] = content;
        changelog.push({ file: name, chapterId, id, op, status: touched ? "applied" : "skipped" });
      }
    }

    return { files, changelog };
  }

  // öffentliche API
  return { parseYAML, applyJson };
});

