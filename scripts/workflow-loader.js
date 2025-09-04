// scripts/workflow-loader.js
// Reagiert auf aktivierte Workflows und zeigt beteiligte Geräte an.

window.WorkflowLoader = (function(){
  function resolveSignalPath(activeConnections = [], activeDevices = [], target = "L6 Master") {
    const visited = new Set();
    const path = [];

    function walk(current){
      for (const c of activeConnections){
        const to = c.toDeviceRef || c.to;
        if (to === current){
          const from = c.fromDeviceRef || c.from;
          if (!visited.has(from)){
            visited.add(from);
            path.push(from);
            walk(from);
          }
        }
      }
    }

    walk(target);

    return path.map(ref => {
      const dev = (activeDevices||[]).find(d => d.deviceRef === ref || d.ref === ref || d.id === ref);
      return dev ? (dev.label || dev.name || dev.deviceRef || dev.id) : ref;
    });
  }

  function renderDeviceList(list){
    const el = document.getElementById('active-device-list');
    if (!el) return;
    el.innerHTML = '';
    list.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      el.appendChild(li);
    });
  }

  document.addEventListener('workflowActivated', ev => {
    const {activeConnections = [], activeDevices = [], target = "L6 Master"} = ev.detail || {};
    const devices = resolveSignalPath(activeConnections, activeDevices, target);
    renderDeviceList(devices);
  });

  return { resolveSignalPath };
})();

