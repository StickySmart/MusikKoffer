// scripts/apply-json2.js
const fs = require("fs");
const path = require("path");

const importsDir = "imports";
const chaptersDir = "chapters";

// letzte JSON2 Datei finden
const files = fs.readdirSync(importsDir).filter(f => f.endsWith(".json"));
if (files.length === 0) {
  console.log("❌ Keine JSON2 gefunden.");
  process.exit(0);
}
const latest = files.sort().reverse()[0];
console.log("➡️ Verarbeite", latest);

const json2 = JSON.parse(fs.readFileSync(path.join(importsDir, latest), "utf8"));

Object.entries(json2).forEach(([file, { actions }]) => {
  const filePath = path.join(chaptersDir, file);
  if (!fs.existsSync(filePath)) {
    console.log("⚠️ Datei nicht gefunden:", filePath);
    return;
  }
  let content = fs.readFileSync(filePath, "utf8");

  actions.forEach(action => {
    if (action.type === "replace") {
      content = content.replace(action.target, action.content_md);
    }
    if (action.type === "insert_after") {
      const idx = content.indexOf(action.target);
      if (idx !== -1) {
        const pos = idx + action.target.length;
        content = content.slice(0, pos) + "\n" + action.content_md + content.slice(pos);
      }
    }
  });

  fs.writeFileSync(filePath, content, "utf8");
  console.log("✅ Aktualisiert:", file);
});
