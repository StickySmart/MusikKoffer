// scripts/json1-handler.js
// Lädt JSON1 (Kommentare) und stellt sie in der Workbench dar
async function loadJSON1(fileInputId) {
  const fileInput = document.getElementById(fileInputId);
  const file = fileInput.files[0];
  if (!file) {
    alert("Bitte JSON1 auswählen");
    return;
  }
  const text = await file.text();
  try {
    const data = JSON.parse(text);
    console.log("JSON1 geladen:", data);
    return data;
  } catch (err) {
    console.error("Fehler beim Parsen von JSON1:", err);
  }
}