// ═══════════════════════════════════════════════════════════════════════════════
// MOODLE PLAYGROUND - Script de Lógica Principal
// ═══════════════════════════════════════════════════════════════════════════════

const THEMES = ['klass', 'boost', 'moove', 'adaptable'];
let currentPreview = 'raw';
let currentTheme = 'klass';
let layout = 'split';
let autoRunTimer = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
  const editorElement = document.getElementById('ed-html');
  if (editorElement) {
    editorElement.value = `<iframe
  src="https://es.wikipedia.org/wiki/Moodle"
  width="100%"
  height="500"
  style="border:none;"
  allowfullscreen>
</iframe>`;
    updateLines();
    setTimeout(runCode, 150);
  }
});

/**
 * Actualiza los números de línea y cuenta de caracteres
 */
function updateLines() {
  const ta = document.getElementById('ed-html');
  const ln = document.getElementById('ln-html');
  if (!ta || !ln) return;

  ln.textContent = ta.value.split('\n').map((_, i) => i + 1).join('\n');
  const charCount = document.getElementById('char-count');
  if (charCount) {
    charCount.textContent = ta.value.length + ' chars';
  }

  clearTimeout(autoRunTimer);
  autoRunTimer = setTimeout(runCode, 900);
}

/**
 * Sincroniza el scroll entre editor y números de línea
 */
function syncScroll() {
  const ta = document.getElementById('ed-html');
  const ln = document.getElementById('ln-html');
  if (ta && ln) {
    ln.scrollTop = ta.scrollTop;
  }
}

/**
 * Maneja la tecla Tab en el editor
 */
function handleTab(e) {
  if (e.key !== 'Tab') return;
  e.preventDefault();

  const ta = e.target;
  const s = ta.selectionStart;
  ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd);
  ta.selectionStart = ta.selectionEnd = s + 2;
  updateLines();
}

/**
 * Ejecuta y previsualiza el código HTML
 */
function runCode() {
  const html = document.getElementById('ed-html').value;
  const src = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#fff;font-family:sans-serif}</style></head><body>${html}</body></html>`;

  const url = URL.createObjectURL(new Blob([src], { type: 'text/html' }));

  // Actualizar vista directa
  const rawPreview = document.getElementById('raw-preview');
  if (rawPreview) {
    rawPreview.src = url;
  }

  // Actualizar todos los iframes de temas
  THEMES.forEach(t => {
    const f = document.getElementById(t + '-iframe');
    if (f) f.src = url;
  });

  // Actualizar mensaje de estado
  const sm = document.getElementById('status-msg');
  if (sm) {
    sm.className = 'ok';
    sm.textContent = '● Ejecutado correctamente';
  }
}

/**
 * Cambia el modo de previsualización
 */
function setPreviewMode(mode) {
  currentPreview = mode;
  const isMoodle = mode === 'moodle';

  const rawTab = document.getElementById('ptab-raw');
  const moodleTab = document.getElementById('ptab-moodle');
  const rawPreview = document.getElementById('raw-preview');
  const themeControls = document.getElementById('theme-controls');
  const heightCtrl = document.getElementById('height-ctrl');

  if (rawTab) rawTab.classList.toggle('active', !isMoodle);
  if (moodleTab) moodleTab.classList.toggle('active', isMoodle);
  if (rawPreview) rawPreview.style.display = isMoodle ? 'none' : 'block';
  if (themeControls) themeControls.style.display = isMoodle ? 'flex' : 'none';
  if (heightCtrl) heightCtrl.style.display = isMoodle ? 'flex' : 'none';

  THEMES.forEach(t => {
    const themeWrap = document.getElementById('theme-' + t);
    if (themeWrap) {
      themeWrap.style.display = (isMoodle && t === currentTheme) ? 'block' : 'none';
    }
  });

  runCode();
}

/**
 * Cambia el tema Moodle activo
 */
function setTheme(theme) {
  currentTheme = theme;
  THEMES.forEach(t => {
    const themeWrap = document.getElementById('theme-' + t);
    const btn = document.getElementById('tbtn-' + t);

    if (themeWrap) themeWrap.style.display = t === theme ? 'block' : 'none';
    if (btn) btn.classList.toggle('active', t === theme);
  });
}

/**
 * Actualiza la altura de los iframes
 */
function updateIframeHeight(val) {
  const valSpan = document.getElementById('ih-val');
  if (valSpan) {
    valSpan.textContent = val + 'px';
  }

  THEMES.forEach(t => {
    const f = document.getElementById(t + '-iframe');
    if (f) f.height = val;
  });
}

/**
 * Cambia el layout (editor, split, preview)
 */
function setLayout(l) {
  layout = l;

  // Actualizar botones de vista
  ['editor', 'split', 'preview'].forEach(v => {
    const btn = document.getElementById('vbtn-' + v);
    if (btn) btn.classList.toggle('active', v === l);
  });

  const ep = document.getElementById('editor-panel');
  const pp = document.getElementById('preview-panel');
  const rb = document.getElementById('resize-bar');

  if (!ep || !pp || !rb) return;

  // Reset classes
  ep.className = 'editor-panel';
  pp.className = 'preview-panel';
  rb.style.display = 'block';

  if (l === 'editor') {
    ep.classList.add('full');
    pp.classList.add('hidden');
    rb.style.display = 'none';
  } else if (l === 'preview') {
    pp.classList.add('full');
    ep.classList.add('hidden');
    rb.style.display = 'none';
  } else {
    ep.style.width = '50%';
  }

  runCode();
}

/**
 * Inicia el redimensionamiento de paneles
 */
function startResize(e) {
  e.preventDefault();

  const bar = document.getElementById('resize-bar');
  const ws = document.getElementById('workspace');
  const ep = document.getElementById('editor-panel');

  if (!bar || !ws || !ep) return;

  bar.classList.add('dragging');

  const onMove = (ev) => {
    const r = ws.getBoundingClientRect();
    const newWidth = Math.min(Math.max(((ev.clientX - r.left) / r.width) * 100, 20), 80);
    ep.style.width = newWidth + '%';
  };

  const onUp = () => {
    bar.classList.remove('dragging');
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}

/**
 * Limpia todo el código
 */
function clearAll() {
  if (!confirm('¿Limpiar el código?')) return;
  const ta = document.getElementById('ed-html');
  if (ta) {
    ta.value = '';
    updateLines();
    runCode();
  }
}
