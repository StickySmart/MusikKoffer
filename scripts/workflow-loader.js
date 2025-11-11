(function(){
  'use strict';

  const config = window.WORKFLOW_CONFIG || {};
  const defaultManifestUrl = new URL('manifest.json', window.location.href).href;
  const manifestUrl = config.manifestUrl || defaultManifestUrl;
  let repoRoot = config.repoRoot || deriveRepoRoot(manifestUrl);

  const state = {
    manifest: null,
    tocEntries: []
  };

  function deriveRepoRoot(url){
    try {
      const target = new URL(url, window.location.href);
      if (/\.json$/i.test(target.pathname)) {
        const cleaned = target.pathname.replace(/\/[^/]*$/, '/');
        return target.origin + cleaned;
      }
      return target.origin + (target.pathname.endsWith('/') ? target.pathname : target.pathname + '/');
    } catch (err) {
      return window.location.origin + '/';
    }
  }

  function resolveUrl(path){
    if(!path) return '';
    try { return new URL(path, repoRoot).href; }
    catch (err) { return path; }
  }

  function pagesToRaw(url){
    try {
      const target = new URL(url);
      const match = target.hostname.match(/^([^\.]+)\.github\.io$/i);
      if(!match) return url;
      const user = match[1];
      const parts = target.pathname.replace(/^\/+/, '').split('/');
      const repo = parts.shift();
      const rest = parts.join('/');
      return `https://raw.githubusercontent.com/${user}/${repo}/main/${rest}`;
    } catch (err) {
      return url;
    }
  }

  async function fetchJSON(url){
    const res = await fetch(url, { cache: 'no-store' });
    if(!res.ok) throw new Error(`${url} → ${res.status}`);
    return res.json();
  }

  async function fetchText(url){
    const res = await fetch(url, { cache: 'no-store' });
    if(!res.ok) throw new Error(`${url} → ${res.status}`);
    return res.text();
  }

  function esc(html){
    return String(html ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[ch]));
  }

  function setStatus(text){
    const el = document.querySelector('#status');
    if(el) el.textContent = text || '';
  }

  function setErr(text){
    const el = document.querySelector('#err');
    if(!el) return;
    if(text){
      el.style.display = 'block';
      el.textContent = text;
    } else {
      el.style.display = 'none';
      el.textContent = '';
    }
  }

  function ensureStore(){
    if(!window.WORKFLOW_STORE){
      window.WORKFLOW_STORE = { records: [], meta: {}, comments: [] };
    }
    return window.WORKFLOW_STORE;
  }

  function unresolvedCount(store){
    return (store.comments || []).filter(c => c.status !== 'done' && c.status !== 'resolved').length;
  }

  function updateExportState(store){
    const btn = document.querySelector('#btnExportJSON2');
    const badge = document.querySelector('#badgeComments');
    const open = unresolvedCount(store);
    if(badge){
      badge.textContent = open;
      badge.style.display = open ? 'inline-block' : 'none';
    }
    if(btn){
      const blocked = open > 0;
      btn.disabled = blocked;
      btn.title = blocked ? 'Export gesperrt: erst Kommentare erledigen.' : 'Bereit für JSON 2.';
    }
  }

  function renderReviewPanel(store){
    const panel = document.querySelector('#reviewPanel');
    if(!panel) return;
    const comments = store.comments || [];
    if(!comments.length){
      panel.innerHTML = '<p>Keine Kommentare vorhanden.</p>';
      return;
    }
    panel.innerHTML = comments.map(c => {
      const status = esc(c.status || 'open');
      const created = c.createdAt ? new Date(c.createdAt).toLocaleString() : '';
      return `
        <div class="review-comment" data-status="${status}">
          <strong>${esc(c.targetKey || '??')}</strong>
          <div>${esc(c.text || '')}</div>
          <small>${esc(created)}</small>
        </div>
      `;
    }).join('\n');
  }

  function parseJSONRelaxed(text){
    return JSON.parse(text.replace(/(^|\s)\/\/.*$/mg, '').replace(/\/\*[\s\S]*?\*\//g, ''));
  }

  function parsePayload(block){
    if(!block.body) return null;
    if(block.lang === 'yaml' && globalThis.ApplyJsonEngine && typeof globalThis.ApplyJsonEngine.parseYAML === 'function'){
      return globalThis.ApplyJsonEngine.parseYAML(block.body);
    }
    try {
      return JSON.parse(block.body);
    } catch (err) {
      return parseJSONRelaxed(block.body);
    }
  }

  function extractDataBlocks(markdown){
    const re = /```(json|yaml)\s+data:(append|upsert|remove)(?:\s+key=([A-Za-z0-9_-]+))?\s*([\s\S]*?)```/g;
    const blocks = [];
    let match;
    while((match = re.exec(markdown))){
      blocks.push({ lang: match[1], op: match[2], key: match[3] || 'id', body: match[4].trim() });
    }
    return blocks;
  }

  function upsertMany(store, items, key){
    const map = new Map(store.records.map(rec => [rec[key], rec]));
    for(const item of items){
      const id = item[key];
      if(id == null) continue;
      if(map.has(id)){
        Object.assign(map.get(id), item);
      } else {
        const clone = { ...item };
        store.records.push(clone);
        map.set(id, clone);
      }
    }
  }

  function removeMany(store, ids, key){
    const removeSet = new Set(ids);
    store.records = store.records.filter(rec => !removeSet.has(rec[key]));
  }

  function addComment(store, payload){
    const text = payload.text || '';
    const target = payload.targetKey || '';
    const exists = (store.comments || []).some(c => c.targetKey === target && c.text === text);
    if(exists) return;
    const comment = {
      id: payload.id || `C${Math.random().toString(36).slice(2,8)}`,
      targetKey: target,
      text,
      status: payload.status || 'open',
      createdAt: payload.createdAt || new Date().toISOString()
    };
    store.comments.push(comment);
  }

  function recordKey(rec){
    if(!rec || typeof rec !== 'object') return null;
    return rec.id ?? rec.key ?? rec.cid ?? null;
  }

  async function importFromMarkdown(url){
    const store = ensureStore();
    const before = new Map();
    for(const rec of store.records || []){
      const key = recordKey(rec);
      if(key == null) continue;
      before.set(String(key), JSON.stringify(rec));
    }
    let markdown;
    try {
      markdown = await fetchText(url);
      setErr('');
    } catch (err) {
      const fallback = pagesToRaw(url);
      if(fallback === url) throw err;
      try {
        markdown = await fetchText(fallback);
        setErr(`Laden fehlgeschlagen: ${url} → RAW-Fallback genutzt.`);
      } catch (err2) {
        setErr(`Laden fehlgeschlagen: ${url}\nund RAW-Fallback: ${fallback}\n(${err2?.message || err2})`);
        throw err2;
      }
    }

    const fm = markdown.match(/^---\n([\s\S]*?)\n---/);
    if(fm){
      store.meta = store.meta || {};
      store.meta.frontmatter = fm[1];
    }

    for(const block of extractDataBlocks(markdown)){
      const payload = parsePayload(block);
      if(payload == null) continue;
      const list = Array.isArray(payload) ? payload : [payload];
      if(block.op === 'append'){
        for(const item of list){ store.records.push({ ...item }); }
      } else if(block.op === 'upsert'){
        upsertMany(store, list, block.key);
      } else if(block.op === 'remove'){
        removeMany(store, list, block.key);
      }
    }

    const seen = new Set();
    for(const rec of store.records){
      const key = recordKey(rec);
      if(key == null) continue;
      const id = String(key);
      seen.add(id);
      const prev = before.get(id);
      const now = JSON.stringify(rec);
      const title = rec.title ?? id;
      if(prev === undefined){
        addComment(store, { targetKey: id, text: `Neuer Datensatz: ${title} prüfen.` });
      } else if(prev !== now){
        addComment(store, { targetKey: id, text: `Änderungen an ${title} sichten.` });
      }
    }
    for(const [id] of before){
      if(!seen.has(id)){
        addComment(store, { targetKey: id, text: `Datensatz entfernt: ${id}. Korrekt?` });
      }
    }

    updateExportState(store);
    renderReviewPanel(store);
    return { markdown };
  }

  function cleanFileLabel(filename){
    return filename.replace(/^[0-9]+[\s_\-–]*/,'').replace(/\.md$/i,'').replace(/_/g,' ').trim();
  }

  function flattenChapters(nodes, depth){
    const items = [];
    (nodes || []).forEach((entry, index) => {
      if(!entry) return;
      if(typeof entry === 'string'){
        const file = entry.split('/').pop() || entry;
        const label = cleanFileLabel(file);
        items.push({
          label: label,
          navLabel: `${String(items.length + 1).padStart(2, '0')} – ${label}`,
          url: resolveUrl(entry),
          depth,
          id: null
        });
        return;
      }
      const path = entry.path || '';
      const file = path.split('/').pop() || path;
      const title = entry.title || cleanFileLabel(file);
      const id = entry.id != null ? String(entry.id) : '';
      const navLabel = id ? `${id.padStart(3, '0')} – ${title}` : title;
      items.push({
        label: title,
        navLabel,
        url: resolveUrl(path),
        depth,
        id
      });
      if(Array.isArray(entry.subchapters)){
        items.push(...flattenChapters(entry.subchapters, depth + 1));
      }
    });
    return items;
  }

  function renderTOC(manifest){
    const toc = document.querySelector('#toc');
    if(!toc) return;
    const entries = flattenChapters(manifest.chapters || [], 0);
    state.tocEntries = entries;
    if(!entries.length){
      toc.textContent = 'Keine Kapitel im Manifest gefunden.';
      return;
    }
    toc.innerHTML = entries.map((entry, idx) => {
      const padding = 12 * entry.depth;
      return `<a href="#" data-index="${idx}" data-url="${esc(entry.url)}" style="padding-left:${padding}px">${esc(entry.navLabel)}</a>`;
    }).join('');
  }

  function toggleNav(force){
    const fab = document.getElementById('navFab');
    const next = typeof force === 'boolean' ? force : !document.body.classList.contains('nav-open');
    document.body.classList.toggle('nav-open', next);
    if(fab) fab.setAttribute('aria-expanded', String(next));
  }

  async function handleTocClick(event){
    const anchor = event.target.closest('a');
    if(!anchor) return;
    event.preventDefault();
    const index = Number(anchor.dataset.index);
    const entry = state.tocEntries[index];
    if(!entry || !entry.url) return;

    document.querySelectorAll('.toc a').forEach(el => el.classList.remove('active'));
    anchor.classList.add('active');

    const titleEl = document.querySelector('#chapterTitle');
    const contentEl = document.querySelector('#chapterContent');
    if(titleEl) titleEl.textContent = entry.label;
    if(contentEl) contentEl.textContent = '…';

    setStatus('Kapitel laden …');
    try {
      const { markdown } = await importFromMarkdown(entry.url);
      if(contentEl) contentEl.textContent = markdown;
      const store = ensureStore();
      setStatus(`Fertig. ${unresolvedCount(store)} offene Kommentare.`);
    } catch (err) {
      setStatus('');
      if(contentEl) contentEl.textContent = 'Kapitel konnte nicht geladen werden.';
    }

    if(window.matchMedia && window.matchMedia('(max-width: 900px)').matches){
      toggleNav(false);
    }
  }

  function setupEvents(){
    const toc = document.querySelector('#toc');
    toc?.addEventListener('click', handleTocClick);

    const reviewBtn = document.querySelector('#btnOpenReview');
    if(reviewBtn){
      reviewBtn.addEventListener('click', () => {
        const panel = document.querySelector('#reviewPanel');
        if(!panel) return;
        const visible = panel.style.display === 'block';
        panel.style.display = visible ? 'none' : 'block';
        if(!visible){
          renderReviewPanel(ensureStore());
        }
      });
    }

    const loop = document.getElementById('bgLoop');
    const loopToggle = document.getElementById('bgLoopToggle');
    if(loop){
      loop.volume = 0.4;

      const gestureEvents = ['pointerdown', 'keydown', 'touchstart'];
      let autoplayHintShown = false;

      function updateToggle(){
        if(!loopToggle) return;
        const playing = !loop.paused && !loop.ended;
        loopToggle.hidden = false;
        loopToggle.setAttribute('aria-pressed', playing ? 'true' : 'false');
        loopToggle.textContent = playing ? '🔇 Musik stoppen' : '🔊 Musik starten';
      }

      async function playLoop(source){
        try {
          await loop.play();
        } catch (err) {
          if(err?.name === 'NotAllowedError'){
            if(source !== 'toggle' && !autoplayHintShown){
              autoplayHintShown = true;
              console.info('Autoplay blockiert – bitte den Musik-Schalter betätigen.');
            }
          } else if(err){
            console.error('Loop konnte nicht gestartet werden:', err);
          }
        } finally {
          updateToggle();
        }
      }

      function bindInitialGesture(){
        gestureEvents.forEach(type => {
          const options = { once: true };
          if(type !== 'keydown'){
            options.passive = true;
          }
          document.addEventListener(type, handleInitialGesture, options);
        });
      }

      function handleInitialGesture(){
        gestureEvents.forEach(type => {
          document.removeEventListener(type, handleInitialGesture);
        });
        playLoop('gesture');
      }

      if(loopToggle){
        loopToggle.hidden = true;
        loopToggle.addEventListener('click', () => {
          if(loop.paused){
            playLoop('toggle');
          } else {
            loop.pause();
            updateToggle();
          }
        });
      }

      loop.addEventListener('play', updateToggle);
      loop.addEventListener('pause', updateToggle);
      loop.addEventListener('error', () => {
        const mediaError = loop.error;
        if(mediaError){
          console.error('Fehler im Hintergrundloop:', mediaError.message || mediaError.code);
        } else {
          console.error('Unbekannter Fehler im Hintergrundloop.');
        }
      });

      const activation = navigator.userActivation;
      if(activation?.isActive || activation?.hasBeenActive){
        playLoop('auto');
      } else {
        bindInitialGesture();
      }
      function handleError(err){
        const name = err?.name;
        if(name === 'NotAllowedError' || name === 'AbortError'){
          if(!autoplayBlockedLogged){
            autoplayBlockedLogged = true;
            console.info('Autoplay blockiert – warte auf Benutzergeste oder den Musik-Schalter.');
          }
          bindGestureListeners();
        } else {
          console.error('Loop konnte nicht gestartet werden:', err);
        }
      }

      function attemptPlay(){
        if(!loop.paused || pendingPlay){
          return;
        }

        pendingPlay = loop.play().then(() => {
          unbindGestureListeners();
        }).catch(err => {
          handleError(err);
        }).finally(() => {
          pendingPlay = null;
          updateToggle();
        });
      }

      function bindGestureListeners(){
        if(gesturesBound) return;
        gesturesBound = true;
        gestureEvents.forEach(type => document.addEventListener(type, handleGesture, { capture: true }));
      }

      function unbindGestureListeners(){
        if(!gesturesBound) return;
        gesturesBound = false;
        gestureEvents.forEach(type => document.removeEventListener(type, handleGesture, true));
      }

      function handleGesture(){
        if(loop.paused){
          attemptPlay();
        } else {
          unbindGestureListeners();
        }
      }

      loop.addEventListener('play', () => {
        autoplayBlockedLogged = false;
        updateToggle();
      });
      loop.addEventListener('pause', () => {
        updateToggle();
        bindGestureListeners();
      });
      loop.addEventListener('error', () => {
        const mediaError = loop.error;
        if(mediaError){
          console.error('Fehler im Hintergrundloop:', mediaError.message || mediaError.code);
        } else {
          console.error('Unbekannter Fehler im Hintergrundloop.');
        }
      });
      document.addEventListener('visibilitychange', () => {
        if(document.visibilityState === 'visible' && loop.paused && hasUserGesture()){
          attemptPlay();
        }
      });

      if(loopToggle){
        loopToggle.hidden = true;
        loopToggle.addEventListener('click', () => {
          if(pendingPlay) return;
          if(loop.paused){
            attemptPlay();
          } else {
            loop.pause();
          }
        });
      }

      if(hasUserGesture()){
        attemptPlay();
      } else {
        bindGestureListeners();
      }

      updateToggle();
    }

    const exportBtn = document.querySelector('#btnExportJSON2');
    if(exportBtn){
      exportBtn.addEventListener('click', () => {
        const store = ensureStore();
        if(unresolvedCount(store) > 0){
          alert('Export gesperrt: Es sind noch offene Kommentare vorhanden.');
          return;
        }
        const payload = {
          version: store.meta?.version || 'dev',
          updated: new Date().toISOString(),
          items: store.records
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'export_JSON2.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      });
    }

    const fab = document.getElementById('navFab');
    fab?.addEventListener('click', () => toggleNav());
    document.addEventListener('keydown', ev => {
      if(ev.key === 'Escape') toggleNav(false);
    });
  }

  async function loadManifest(url){
    const failures = [];
    const candidates = [];

    if(url) candidates.push(url);
    const raw = pagesToRaw(url);
    if(raw && raw !== url) candidates.push(raw);
    if(defaultManifestUrl && !candidates.includes(defaultManifestUrl)){
      candidates.push(defaultManifestUrl);
    }

    let lastErr = null;
    for(const candidate of candidates){
      try {
        const manifest = await fetchJSON(candidate);
        return { manifest, usedUrl: candidate, failures };
      } catch (err) {
        lastErr = err;
        failures.push(`${candidate} → ${err?.message || err}`);
      }
    }

    const message = failures.length ? failures.join('\n') : (lastErr?.message || 'Unbekannter Fehler');
    throw new Error(message);
  }

  async function buildTOC(){
    try {
      setErr('');
      setStatus('Manifest laden …');
      const { manifest, usedUrl, failures } = await loadManifest(manifestUrl);
      repoRoot = deriveRepoRoot(usedUrl);
      state.manifest = manifest;
      renderTOC(manifest);
      setStatus('Bereit. Kapitel wählen …');
      if(failures.length){
        setErr(`Manifest-Fallback aktiv:\n${failures.join('\n')}\nVerwende ${usedUrl}.`);
      }
    } catch (err) {
      setStatus('');
      setErr(`Manifest konnte nicht geladen werden: ${err?.message || err}`);
      const toc = document.querySelector('#toc');
      if(toc) toc.textContent = 'Manifest-Fehler.';
    }
  }

  function init(){
    setupEvents();
    updateExportState(ensureStore());
    buildTOC();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
