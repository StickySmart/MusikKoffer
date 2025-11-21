// scripts/todo-handler.js
// Handhabt TODO-Eingabe und Verarbeitung

(function(){
  'use strict';

  const STORAGE_KEY = 'musikkoffer_todos';
  const PENDING_FILE = 'modules/pending-todos.json';
  const PROCESSED_FILE = 'modules/processed-todos.json';
  let currentChapterFile = null;
  let currentChapterId = null;

  // Lade gespeicherte TODOs aus localStorage
  function loadTodos(){
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Fehler beim Laden der TODOs:', e);
      return [];
    }
  }

  // Speichere TODOs in localStorage
  function saveTodos(todos){
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      return true;
    } catch (e) {
      console.error('Fehler beim Speichern der TODOs:', e);
      return false;
    }
  }

  // Prüfe auf verarbeitete TODOs und aktualisiere Status
  async function syncProcessedTodos(){
    try {
      const response = await fetch(PROCESSED_FILE + '?t=' + Date.now());
      if(!response.ok) return;

      const processed = await response.json();
      if(!processed.todos || !Array.isArray(processed.todos)) return;

      const todos = loadTodos();
      let updated = false;

      // Markiere passende TODOs als processed
      todos.forEach(todo => {
        if(todo.status === 'pending') {
          const match = processed.todos.find(p =>
            p.chapterFile === todo.chapterFile &&
            (p.text === todo.text || todo.text.includes(p.text) || p.text.includes(todo.text))
          );
          if(match && match.status === 'processed') {
            todo.status = 'processed';
            todo.processedAt = processed.processedAt;
            todo.result = match.result;
            updated = true;
            console.log('✅ TODO als erledigt markiert:', todo.text.substring(0, 50));
          }
        }
      });

      if(updated) {
        saveTodos(todos);
        updateStats();
        console.log('📋 TODOs synchronisiert mit processed-todos.json');
      }
    } catch(e) {
      // Datei existiert nicht oder Fehler - ignorieren
      console.log('ℹ️ Keine processed-todos.json gefunden');
    }
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

  // Füge TODO hinzu
  function addTodo(){
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

    const todos = loadTodos();
    const newTodo = {
      id: Date.now(),
      chapterFile: currentChapterFile,
      chapterId: currentChapterId,
      text: input.value.trim(),
      priority: highPriority?.checked ? 'high' : 'normal',
      category: category?.value.trim() || null,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    todos.push(newTodo);
    saveTodos(todos);

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

    // Exportiere TODOs in Datei für Claude
    exportTodosForClaude(todos);
  }

  // Aktualisiere TODO-Statistik-Anzeige
  function updateStats(){
    const todos = loadTodos();
    const pending = todos.filter(t => t.status === 'pending');
    const processed = todos.filter(t => t.status === 'processed');

    const pendingEl = document.getElementById('todoPendingCount');
    const processedEl = document.getElementById('todoProcessedCount');

    if(pendingEl) {
      pendingEl.textContent = `${pending.length} offen`;
      pendingEl.style.background = pending.length > 0 ? '#ff9800' : '#9e9e9e';
    }

    if(processedEl) {
      processedEl.textContent = `${processed.length} bearbeitet`;
    }
  }

  // Exportiere TODOs als JSON-Datei für Claude
  function exportTodosForClaude(todos){
    const pendingTodos = todos.filter(t => t.status === 'pending');
    const content = JSON.stringify({ todos: pendingTodos }, null, 2);

    // Speichere auch in einem globalen Objekt für einfachen Zugriff
    window.MUSIKKOFFER_TODOS = pendingTodos;

    console.log('📝 Gespeicherte TODOs:', pendingTodos.length);
    console.log('Zugriff via: window.MUSIKKOFFER_TODOS');

    // Aktualisiere Anzeige
    updateStats();
  }

  // Zeige TODO-Liste
  function showTodoList(){
    const todos = loadTodos();
    const pending = todos.filter(t => t.status === 'pending');

    if(pending.length === 0) {
      alert('Keine offenen TODOs vorhanden.\n\nErstelle TODOs indem du ein Kapitel öffnest und das Eingabefeld nutzt.');
      return;
    }

    let msg = `📋 Offene TODOs (${pending.length}):\n\n`;
    pending.forEach((todo, idx) => {
      const prio = todo.priority === 'high' ? '⚠️ HOCH' : '📌';
      const cat = todo.category ? ` [@${todo.category}]` : '';
      msg += `${idx + 1}. ${prio} ${todo.chapterFile}${cat}\n`;
      msg += `   ${todo.text}\n\n`;
    });

    msg += '\nHinweis: Diese TODOs werden beim nächsten\n/process-todos Aufruf von Claude verarbeitet.';
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

  // Verarbeite TODOs (exportiert und zeigt Anleitung)
  async function processTodos(){
    const todos = loadTodos();
    const pending = todos.filter(t => t.status === 'pending');

    if(pending.length === 0) {
      alert('Keine offenen TODOs zum Verarbeiten.\n\nErstelle zuerst TODOs in den Kapiteln.');
      return;
    }

    const confirmed = confirm(
      `TODOs exportieren?\n\n` +
      `${pending.length} offene TODO(s) werden als JSON-Datei heruntergeladen.\n\n` +
      `Die Datei heißt "pending-todos.json" und muss in\n` +
      `den Ordner "modules/" gelegt werden.\n\n` +
      `Claude liest sie automatisch und aktualisiert die Zähler.\n\n` +
      `Fortfahren?`
    );

    if(!confirmed) return;

    // Zeige Fortschritt
    showProgress(10);
    await new Promise(r => setTimeout(r, 200));

    // Exportiere TODOs als JSON-Datei (fester Name!)
    showProgress(30);
    const filename = 'pending-todos.json';
    const data = {
      exported: new Date().toISOString(),
      totalTodos: pending.length,
      todos: pending.map(t => ({
        chapterFile: t.chapterFile,
        chapterId: t.chapterId,
        text: t.text,
        priority: t.priority,
        category: t.category,
        createdAt: t.createdAt
      }))
    };

    showProgress(60);
    await new Promise(r => setTimeout(r, 300));

    // Download als Datei
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    showProgress(100);
    await new Promise(r => setTimeout(r, 400));

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    // Verstecke Fortschritt
    hideProgress();

    // Zeige Anleitung
    setTimeout(() => {
      alert(
        `TODOs exportiert: ${filename}\n\n` +
        `NÄCHSTE SCHRITTE:\n\n` +
        `1. Verschiebe die Datei nach:\n` +
        `   modules/pending-todos.json\n\n` +
        `2. Sage Claude: "Verarbeite die TODOs"\n\n` +
        `3. Nach der Verarbeitung: Seite neu laden\n` +
        `   → Zähler werden automatisch aktualisiert`
      );
    }, 600);
  }

  // Setup Event Listeners
  function setup(){
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

    // Synchronisiere mit processed-todos.json (von Claude generiert)
    syncProcessedTodos().then(() => {
      // Exportiere initial gespeicherte TODOs
      exportTodosForClaude(loadTodos());
      // Aktualisiere Statistik-Anzeige
      updateStats();
    });
  }

  // Öffentliche API für workflow-loader.js
  window.TODO_HANDLER = {
    showInput: showTodoInput,
    hideInput: hideTodoInput,
    loadTodos: loadTodos,
    saveTodos: saveTodos,
    syncProcessed: syncProcessedTodos,
    updateStats: updateStats
  };

  // Initialize
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
