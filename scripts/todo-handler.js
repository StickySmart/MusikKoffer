// scripts/todo-handler.js
// Handhabt TODO-Verarbeitung via Claude Code Slash Commands

(function(){
  'use strict';

  function setupTodoButtons(){
    const btnListTodos = document.getElementById('btnListTodos');
    const btnProcessTodos = document.getElementById('btnProcessTodos');

    if(btnListTodos){
      btnListTodos.addEventListener('click', async () => {
        // Zeige Lade-Status
        const status = document.getElementById('status');
        const originalText = status?.textContent || '';
        if(status) status.textContent = 'Suche nach TODOs in allen Kapiteln...';

        // Hinweis für den Benutzer
        alert('TODO-Report wird generiert.\n\nBitte den Slash Command /list-todos in Claude Code ausführen.');

        if(status) status.textContent = originalText;
      });
    }

    if(btnProcessTodos){
      btnProcessTodos.addEventListener('click', async () => {
        const status = document.getElementById('status');
        const originalText = status?.textContent || '';

        // Bestätigung vom Benutzer
        const confirmed = confirm(
          'TODO-Verarbeitung starten?\n\n' +
          'Claude wird:\n' +
          '• Alle TODO-Marker in chapters/ finden\n' +
          '• Inhalte generieren\n' +
          '• Dateien bearbeiten\n' +
          '• Änderungen committen\n\n' +
          'Fortfahren?'
        );

        if(!confirmed) return;

        if(status) status.textContent = 'TODO-Verarbeitung läuft via Claude...';

        // Hinweis für den Benutzer
        alert(
          'TODO-Verarbeitung wird gestartet.\n\n' +
          'Bitte den Slash Command /process-todos in Claude Code ausführen.\n\n' +
          'Claude wird alle gefundenen TODOs verarbeiten und die Änderungen automatisch committen.'
        );

        if(status) status.textContent = originalText;
      });
    }
  }

  // Initialize when DOM is ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setupTodoButtons);
  } else {
    setupTodoButtons();
  }
})();
