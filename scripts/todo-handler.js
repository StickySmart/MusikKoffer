// scripts/todo-handler.js
// Handhabt TODO-Eingabe und Verarbeitung
// TODOs werden in modules/todos.json gespeichert (geräteübergreifend)

(function(){
  'use strict';

  const TODOS_FILE = 'modules/todos.json';
  const LOCAL_STORAGE_KEY = 'musikkoffer_unsynced_todos';
  let currentChapterFile = null;
  let currentChapterId = null;
  let cachedFileTodos = [];
  let isLoaded = false;

  // Lade TODOs aus der Repo-Datei (Source of Truth)
  async function loadTodosFromFile(){
    try {
      const response = await fetch(TODOS_FILE + '?t=' + Date.now());
      if(!response.ok) {
        console.log('ℹ️ todos.json nicht gefunden, starte leer');
        return [];
      }
      const data = await response.json();
      return data.todos || [];
    } catch(e) {
      console.error('Fehler beim Laden von todos.json:', e);
      return [];
    }
  }

  // Lade ungesyncte TODOs aus localStorage (nur für neue, noch nicht commitete)
  function loadUnsyncedTodos(){
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch(e) {
      console.error('Fehler beim Laden ungesynceter TODOs:', e);
      return [];
    }
  }

  // Speichere ungesyncte TODOs in localStorage
  function saveUnsyncedTodos(todos){
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
      return true;
    } catch(e) {
      console.error('Fehler beim Speichern:', e);
      return false;
    }
  }

  // Hole alle TODOs (Datei + ungesynct)
  async function getAllTodos(){
    if(!isLoaded) {
      cachedFileTodos = await loadTodosFromFile();
      isLoaded = true;
    }
    const unsynced = loadUnsyncedTodos();

    // Merge: Datei-TODOs + ungesyncte (ohne Duplikate)
    const all = [...cachedFileTodos];
    unsynced.forEach(u => {
      const exists = all.find(t => t.id === u.id);
      if(!exists) {
        all.push(u);
      }
    });

    return all;
  }

  // Synchronisiere: Entferne aus localStorage was bereits in Datei ist
  async function syncWithFile(){
    const fileTodos = await loadTodosFromFile();
    cachedFileTodos = fileTodos;
    isLoaded = true;

    const unsynced = loadUnsyncedTodos();
    const stillUnsynced = unsynced.filter(u => {
      // Prüfe ob dieser TODO bereits in der Datei ist
      const inFile = fileTodos.find(f =>
        f.id === u.id ||
        (f.chapterFile === u.chapterFile && f.text === u.text)
      );
      return !inFile;
    });

    if(stillUnsynced.length !== unsynced.length) {
      saveUnsyncedTodos(stillUnsynced);
      console.log(`✅ ${unsynced.length - stillUnsynced.length} TODO(s) synchronisiert`);
    }

    return fileTodos;
  }

  // Zeige TODO-Eingabefeld wenn Kapitel ausgewählt
  function showTodoInput(chapterFile, chapterId){
    currentChapterFile = chapterFile;
    currentChapterId = chapterId;

    const panel = document.getElementById('todoInputPanel');
    if(panel) {
      panel.style.display = 'block';
    }
  }

  // Verstecke TODO-Eingabefeld
  function hideTodoInput(){
    const panel = document.getElementById('todoInputPanel');
    if(panel) {
      panel.style.display = 'none';
    }
  }

  // Füge TODO hinzu (wird in localStorage gespeichert bis Claude synct)
  async function addTodo(){
    const input = document.getElementById('todoInput');
    const highPriority = document.getElementById('todoHighPriority');
    const category = document.getElementById('todoCategory');
    const successMsg = document.getElementById('todoSuccess');

    if(!input || !input.value.trim()) {
      alert('Bitte eine TODO-Beschreibung eingeben.');
      return;
    }

    if(!currentChapterFile) {
      alert('Bitte erst ein Kapitel auswählen.');
      return;
    }

    const newTodo = {
      id: 'todo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      chapterFile: currentChapterFile,
      chapterId: currentChapterId,
      text: input.value.trim(),
      priority: highPriority?.checked ? 'high' : 'normal',
      category: category?.value.trim() || null,
      createdAt: new Date().toISOString(),
      status: 'pending',
      synced: false
    };

    // Zu ungesyncten hinzufügen
    const unsynced = loadUnsyncedTodos();
    unsynced.push(newTodo);
    saveUnsyncedTodos(unsynced);

    // Zeige Erfolgs-Nachricht
    if(successMsg) {
      successMsg.style.display = 'block';
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 3000);
    }

    // Leere Eingabefelder
    input.value = '';
    if(highPriority) highPriority.checked = false;
    if(category) category.value = '';

    // Aktualisiere Anzeige
    await updateStats();

    console.log('📝 TODO hinzugefügt (wartet auf Sync):', newTodo.text.substring(0, 50));
  }

  // Aktualisiere TODO-Statistik-Anzeige
  async function updateStats(){
    const todos = await getAllTodos();
    const pending = todos.filter(t => t.status === 'pending');
    const processed = todos.filter(t => t.status === 'processed');
    const unsynced = loadUnsyncedTodos();

    const pendingEl = document.getElementById('todoPendingCount');
    const processedEl = document.getElementById('todoProcessedCount');

    if(pendingEl) {
      const unsyncedCount = unsynced.filter(u => u.status === 'pending').length;
      let label = `${pending.length} offen`;
      if(unsyncedCount > 0) {
        label += ` (${unsyncedCount} neu)`;
      }
      pendingEl.textContent = label;
      pendingEl.style.background = pending.length > 0 ? '#ff9800' : '#9e9e9e';
    }

    if(processedEl) {
      processedEl.textContent = `${processed.length} bearbeitet`;
    }

    // Für globalen Zugriff
    window.MUSIKKOFFER_TODOS = todos;
  }

  // Zeige TODO-Liste
  async function showTodoList(){
    const todos = await getAllTodos();
    const pending = todos.filter(t => t.status === 'pending');
    const unsynced = loadUnsyncedTodos();

    if(pending.length === 0) {
      alert('Keine offenen TODOs vorhanden.\n\nErstelle TODOs indem du ein Kapitel öffnest und das Eingabefeld nutzt.');
      return;
    }

    let msg = `📋 Offene TODOs (${pending.length}):\n\n`;
    pending.forEach((todo, idx) => {
      const prio = todo.priority === 'high' ? '⚠️ HOCH' : '📌';
      const cat = todo.category ? ` [@${todo.category}]` : '';
      const isUnsynced = unsynced.find(u => u.id === todo.id);
      const syncStatus = isUnsynced ? ' 🔄' : ' ✓';
      msg += `${idx + 1}. ${prio} ${todo.chapterFile}${cat}${syncStatus}\n`;
      msg += `   ${todo.text}\n\n`;
    });

    msg += '\n🔄 = neu (noch nicht synchronisiert)\n✓ = im Repository gespeichert';
    alert(msg);
  }

  // Zeige Fortschrittsbalken
  function showProgress(percent){
    const bar = document.getElementById('progressBar');
    const fill = document.getElementById('progressBarFill');
    if(bar) bar.style.display = 'block';
    if(fill) fill.style.width = `${percent}%`;
  }

  // Verstecke Fortschrittsbalken
  function hideProgress(){
    const bar = document.getElementById('progressBar');
    if(bar) {
      setTimeout(() => {
        bar.style.display = 'none';
        const fill = document.getElementById('progressBarFill');
        if(fill) fill.style.width = '0%';
      }, 500);
    }
  }

  // Exportiere TODOs als JSON (alle offenen)
  async function processTodos(){
    const todos = await getAllTodos();
    const pending = todos.filter(t => t.status === 'pending');

    if(pending.length === 0) {
      alert('Keine offenen TODOs zum Verarbeiten.\n\nErstelle zuerst TODOs in den Kapiteln.');
      return;
    }

    const confirmed = confirm(
      `TODOs exportieren?\n\n` +
      `${pending.length} offene TODO(s) werden als JSON exportiert.\n\n` +
      `WORKFLOW:\n` +
      `1. Kopiere den JSON-Inhalt\n` +
      `2. Füge ihn in den Claude-Chat ein\n` +
      `3. Sage: "Verarbeite diese TODOs"\n` +
      `4. Nach Verarbeitung: Seite neu laden\n\n` +
      `Fortfahren?`
    );

    if(!confirmed) return;

    showProgress(30);
    await new Promise(r => setTimeout(r, 200));

    // Erstelle Export-Daten
    const data = {
      exported: new Date().toISOString(),
      source: window.location.href,
      totalTodos: pending.length,
      todos: pending.map(t => ({
        id: t.id,
        chapterFile: t.chapterFile,
        chapterId: t.chapterId,
        text: t.text,
        priority: t.priority,
        category: t.category,
        createdAt: t.createdAt
      }))
    };

    showProgress(60);

    // Download als Datei
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pending-todos.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    showProgress(100);
    await new Promise(r => setTimeout(r, 300));
    hideProgress();

    // Zeige JSON auch in einem Dialog zum Kopieren
    const jsonStr = JSON.stringify(data, null, 2);

    setTimeout(() => {
      const copyToClipboard = confirm(
        `TODOs exportiert!\n\n` +
        `Die Datei wurde heruntergeladen.\n\n` +
        `Möchtest du den Inhalt auch in die Zwischenablage kopieren?\n` +
        `(Praktisch für Handy-Nutzung)`
      );

      if(copyToClipboard) {
        navigator.clipboard.writeText(jsonStr).then(() => {
          alert('✅ In Zwischenablage kopiert!\n\nFüge es jetzt in den Claude-Chat ein.');
        }).catch(() => {
          // Fallback: Zeige in Textfeld
          prompt('Kopiere diesen Text:', jsonStr);
        });
      }
    }, 600);
  }

  // Verarbeite hochgeladene Ergebnis-Datei (processed-todos.json)
  async function handleProcessedUpload(file){
    if(!file) return;

    const reader = new FileReader();
    reader.onload = async function(e){
      try {
        const processed = JSON.parse(e.target.result);
        if(!processed.todos || !Array.isArray(processed.todos)) {
          alert('Ungültiges Format: Die Datei enthält kein "todos" Array.');
          return;
        }

        // Aktualisiere lokale ungesyncte TODOs
        const unsynced = loadUnsyncedTodos();
        let updated = 0;

        unsynced.forEach(todo => {
          if(todo.status === 'pending') {
            const match = processed.todos.find(p =>
              p.id === todo.id ||
              (p.chapterFile === todo.chapterFile &&
               (p.text === todo.text || todo.text.includes(p.text) || p.text.includes(todo.text)))
            );
            if(match && match.status === 'processed') {
              todo.status = 'processed';
              todo.processedAt = processed.processedAt || new Date().toISOString();
              todo.result = match.result;
              updated++;
            }
          }
        });

        if(updated > 0) {
          saveUnsyncedTodos(unsynced);
        }

        // Sync mit Datei und aktualisiere Cache
        await syncWithFile();
        await updateStats();

        alert(
          `✅ Synchronisierung abgeschlossen!\n\n` +
          `Die TODO-Zähler wurden aktualisiert.\n\n` +
          `Hinweis: Die vollständige Liste ist jetzt in\n` +
          `modules/todos.json im Repository gespeichert.`
        );
      } catch(err) {
        console.error('Fehler beim Verarbeiten:', err);
        alert('Fehler beim Lesen der Datei:\n' + err.message);
      }
    };
    reader.readAsText(file);
  }

  // Setup Event Listeners
  async function setup(){
    const btnAddTodo = document.getElementById('btnAddTodo');
    const btnListTodos = document.getElementById('btnListTodos');
    const btnProcessTodos = document.getElementById('btnProcessTodos');
    const btnUploadProcessed = document.getElementById('btnUploadProcessed');
    const processedFileInput = document.getElementById('processedFileInput');

    if(btnAddTodo){
      btnAddTodo.addEventListener('click', addTodo);
    }

    if(btnListTodos){
      btnListTodos.addEventListener('click', showTodoList);
    }

    if(btnProcessTodos){
      btnProcessTodos.addEventListener('click', processTodos);
    }

    // Upload-Button für Ergebnisse
    if(btnUploadProcessed && processedFileInput){
      btnUploadProcessed.addEventListener('click', () => {
        processedFileInput.click();
      });
      processedFileInput.addEventListener('change', (e) => {
        if(e.target.files && e.target.files[0]){
          handleProcessedUpload(e.target.files[0]);
          e.target.value = '';
        }
      });
    }

    // Initial: Synchronisiere mit Datei und aktualisiere Anzeige
    await syncWithFile();
    await updateStats();

    console.log('📋 TODO-Handler initialisiert (Datei-basiert)');
  }

  // Öffentliche API
  window.TODO_HANDLER = {
    showInput: showTodoInput,
    hideInput: hideTodoInput,
    getAllTodos: getAllTodos,
    getUnsyncedTodos: loadUnsyncedTodos,
    syncWithFile: syncWithFile,
    updateStats: updateStats
  };

  // Initialize
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
