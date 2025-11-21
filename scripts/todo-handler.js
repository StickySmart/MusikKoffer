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

    const kuerzel = category?.value.trim().toUpperCase() || null;
    const newTodo = {
      id: 'todo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      chapterFile: currentChapterFile,
      chapterId: currentChapterId,
      text: input.value.trim(),
      kuerzel: kuerzel,
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

  // Zeige TODO-Liste im Modal
  async function showTodoList(){
    const todos = await getAllTodos();
    const pending = todos.filter(t => t.status === 'pending');
    const processed = todos.filter(t => t.status === 'processed');
    const unsynced = loadUnsyncedTodos();

    const modal = document.getElementById('todoModal');
    const title = document.getElementById('todoModalTitle');
    const body = document.getElementById('todoModalBody');

    if(!modal || !body) {
      // Fallback auf alert wenn Modal nicht existiert
      alert('Modal nicht gefunden');
      return;
    }

    if(pending.length === 0 && processed.length === 0) {
      title.textContent = 'Keine TODOs';
      body.innerHTML = '<p>Keine TODOs vorhanden.</p><p style="color:#666;font-size:0.9rem;">Erstelle TODOs indem du ein Kapitel öffnest und das Eingabefeld nutzt.</p>';
      modal.classList.add('active');
      return;
    }

    title.textContent = `TODOs (${pending.length} offen, ${processed.length} erledigt)`;

    let html = '';

    // Offene TODOs
    if(pending.length > 0) {
      html += '<div style="margin-bottom:16px;"><strong>Offen:</strong></div>';
      pending.forEach((todo, idx) => {
        const isUnsynced = unsynced.find(u => u.id === todo.id);
        const syncLabel = isUnsynced ? '🔄 neu' : '✓';
        const dateStr = todo.createdAt ? formatDate(todo.createdAt) : '';
        const kuerzelLabel = todo.kuerzel ? `<span style="background:#000;color:#fff;padding:1px 4px;border-radius:2px;font-size:0.75rem;margin-right:4px;">${escapeHtml(todo.kuerzel)}</span>` : '';

        html += `<div class="todo-item">
          <div class="chapter"><strong>#${idx + 1}</strong> · ${todo.chapterFile}</div>
          <div class="text">${escapeHtml(todo.text)}</div>
          <div class="sync-status">${kuerzelLabel}${syncLabel}${dateStr ? ` · ${dateStr}` : ''}</div>
        </div>`;
      });
    }

    // Erledigte TODOs (eingeklappt)
    if(processed.length > 0) {
      html += `<details style="margin-top:16px;">
        <summary style="cursor:pointer;color:#666;">Erledigt (${processed.length})</summary>
        <div style="margin-top:8px;">`;
      processed.forEach((todo, idx) => {
        const dateStr = todo.processedAt ? formatDate(todo.processedAt) : (todo.createdAt ? formatDate(todo.createdAt) : '');
        html += `<div class="todo-item" style="opacity:0.7;">
          <div class="chapter"><strong>#${idx + 1}</strong> · ${todo.chapterFile}</div>
          <div class="text" style="text-decoration:line-through;">${escapeHtml(todo.text)}</div>
          <div class="sync-status">${todo.result ? `→ ${escapeHtml(todo.result)}` : ''}${dateStr ? ` · ${dateStr}` : ''}</div>
        </div>`;
      });
      html += '</div></details>';
    }

    // Legende
    html += '<div style="margin-top:16px;padding-top:12px;border-top:1px solid #ddd;font-size:0.85rem;color:#666;">🔄 = neu (noch nicht synchronisiert) · ✓ = im Repository</div>';

    body.innerHTML = html;
    modal.classList.add('active');
  }

  // HTML escapen
  function escapeHtml(text){
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Datum formatieren (deutsch)
  function formatDate(isoString){
    try {
      const date = new Date(isoString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const mins = date.getMinutes().toString().padStart(2, '0');
      return `${day}.${month}.${year} ${hours}:${mins}`;
    } catch(e) {
      return '';
    }
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
        kuerzel: t.kuerzel,
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

  // Setup Event Listeners
  async function setup(){
    const btnAddTodo = document.getElementById('btnAddTodo');
    const btnListTodos = document.getElementById('btnListTodos');
    const btnProcessTodos = document.getElementById('btnProcessTodos');

    if(btnAddTodo){
      btnAddTodo.addEventListener('click', addTodo);
    }

    if(btnListTodos){
      btnListTodos.addEventListener('click', showTodoList);
    }

    if(btnProcessTodos){
      btnProcessTodos.addEventListener('click', processTodos);
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
