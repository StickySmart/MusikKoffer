// comments.js

const allComments = {};
let currentChapter = null;

// Kapitel laden und Kommentare zuordnen
async function loadChapter(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`${path} → ${res.status}`);
    const text = await res.text();

    document.getElementById("content").innerHTML = `<article><pre>${text}</pre></article>`;
    document.getElementById("commentSection").style.display = "block";

    currentChapter = path;
    document.getElementById("commentInput").value = allComments[path]?.comment || "";
  } catch (err) {
    document.getElementById("content").innerHTML = `<p style="color:red">Fehler beim Laden des Kapitels: ${err}</p>`;
  }
}

// Kommentar speichern
document.getElementById("saveCommentBtn").addEventListener("click", () => {
  if (!currentChapter) {
    alert("Kein Kapitel ausgewählt.");
    return;
  }
  allComments[currentChapter] = {
    chapter: currentChapter,
    comment: document.getElementById("commentInput").value,
    status: "Offen",
    timestamp: new Date().toISOString()
  };
  alert("Kommentar gespeichert.");
});

// --- Export JSON1 ---
document.getElementById("exportJ1").addEventListener("click", () => {
  const commentsArray = Object.values(allComments);
  if (commentsArray.length === 0) {
    alert("Noch keine Kommentare vorhanden.");
    return;
  }
  const blob = new Blob([JSON.stringify(commentsArray, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'comments.json';
  a.click();
});

// --- Import JSON2 ---
document.getElementById("importJ2").addEventListener("click", () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const json2 = JSON.parse(e.target.result);
        applyJson2(json2);
      } catch (error) {
        alert('Fehler beim Importieren von JSON2: ' + error);
      }
    };
    reader.readAsText(file);
  });
  input.click();
});

// Änderungen aus JSON2 anwenden
function applyJson2(json2) {
  Object.entries(json2).forEach(([file, { actions }]) => {
    actions.forEach(action => {
      console.log(`⚡ ${action.type} in ${file}`, action);

      // 👉 Hier würdest du den Text in den .md Files überschreiben
      // In Browser-Demo nur Anzeige:
      document.getElementById("content").innerHTML += `
        <div style="border:1px solid #ccc; margin:10px; padding:10px;">
          Änderung in <b>${file}</b>:<br>
          <code>${action.type}</code> auf <code>${action.target}</code><br>
          <pre>${action.content_md}</pre>
        </div>`;
    });
  });
}

    input.click();
  });
  loadComments();
});
