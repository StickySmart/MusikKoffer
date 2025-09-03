let comments = {};

// Kommentare laden
function loadComments() {
  comments = JSON.parse(localStorage.getItem("comments") || "{}");
}

// Kommentare speichern
function saveComment(path, text) {
  if (!comments[path]) comments[path] = [];
  comments[path].push({ text, status: "open", date: new Date().toISOString() });
  localStorage.setItem("comments", JSON.stringify(comments));
  renderComments(path);
}

// Kommentare rendern
function renderComments(path) {
  const list = document.getElementById("commentList");
  if (!list) return;
  list.innerHTML = "";

  if (comments[path]) {
    comments[path].forEach((c, i) => {
      const div = document.createElement("div");
      div.className = "commentItem";
      div.textContent = `[${c.status}] ${c.text}`;
      list.appendChild(div);
    });
  }
}

// Export JSON1
function exportComments() {
  loadComments();
  const blob = new Blob([JSON.stringify(comments, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "comments_export.json";
  a.click();
}

// Import JSON2 (Anleitung)
async function importComments(file) {
  const text = await file.text();
  const json = JSON.parse(text);

  Object.entries(json).forEach(([path, { actions }]) => {
    actions.forEach(action => {
      if (action.type === "insert") {
        saveComment(path, action.text);
      }
      if (action.type === "replace") {
        saveComment(path, `(REPLACE) ${action.target} -> ${action.text}`);
      }
    });
  });
}

// Buttons verbinden
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("exportJ1")?.addEventListener("click", exportComments);
  document.getElementById("importJ2")?.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = e => importComments(e.target.files[0]);
    input.click();
  });
  loadComments();
});