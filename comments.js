// Kommentar Logik
const commentInput = document.getElementById('commentInput');
const saveCommentBtn = document.getElementById('saveCommentBtn');
const exportJSONBtn = document.getElementById('exportJSONBtn');

// Speicher für Kommentare
let comments = {};

// Kommentar speichern
saveCommentBtn.addEventListener('click', () => {
  const currentChapter = document.querySelector('h1').textContent; // Kapitelname als ID
  const commentText = commentInput.value;

  if (commentText) {
    comments[currentChapter] = commentText; // Kommentar speichern
    alert('Kommentar gespeichert!');
    commentInput.value = ''; // Eingabefeld zurücksetzen
  } else {
    alert('Bitte gib einen Kommentar ein!');
  }
});

// Exportieren der Kommentare als JSON
exportJSONBtn.addEventListener('click', () => {
  const jsonContent = JSON.stringify(comments, null, 2);
  
  // Download der JSON-Datei erstellen
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'comments.json';
  link.click();
});
