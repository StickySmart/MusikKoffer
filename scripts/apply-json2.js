const fs = require('fs');
const path = require('path');

// JSON2 Datei suchen
const files = fs.readdirSync('.').filter(f => f.startsWith('json2-') && f.endsWith('.json'));
if (files.length === 0) {
  console.error("❌ Keine JSON2-Datei gefunden!");
  process.exit(1);
}

const json2File = files[0];
const json2 = JSON.parse(fs.readFileSync(json2File, 'utf8'));

console.log("✅ Geladene JSON2:", json2File);

// Durch Kapitel iterieren
Object.entries(json2).forEach(([chapterFile, actions]) => {
  const chapterPath = path.join('chapters', chapterFile);

  if (!fs.existsSync(chapterPath)) {
    console.warn(`⚠️ Kapitel nicht gefunden: ${chapterPath}`);
    return;
  }

  let text = fs.readFileSync(chapterPath, 'utf8');

  actions.actions.forEach(action => {
    if (action.type === "insert_after") {
      const regex = new RegExp(action.target, "i");
      text = text.replace(regex, `$&\n${action.text}`);
      console.log(`➕ Text in ${chapterFile} nach "${action.target}" eingefügt.`);
    }

    if (action.type === "replace") {
      const regex = new RegExp(action.target, "i");
      text = text.replace(regex, action.text);
      console.log(`🔄 Text in ${chapterFile} ersetzt: ${action.target} -> ${action.text}`);
    }
  });

  // Kapitel überschreiben
  fs.writeFileSync(chapterPath, text, 'utf8');
  console.log(`💾 Kapitel aktualisiert: ${chapterPath}`);
});