// ═══════════════════════════════════════════════════════════════════════════════
// MOODLE PLAYGROUND - Simulador de iframes en temas Moodle
// ═══════════════════════════════════════════════════════════════════════════════

class MoodlePlayground {
  constructor() {
    this.THEMES = ['klass', 'boost', 'moove', 'adaptable'];
    this.currentPreview = 'raw';
    this.currentTheme = 'klass';
    this.layout = 'split';
    this.autoRunTimer = null;

    // Inicializar cuando DOM está listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    this.bindElements();
    this.attachEvents();
    this.setupInitialContent();
  }

  /**
   * Vincula elementos del DOM
   */
  bindElements() {
    this.editorElement = document.getElementById('ed-html');
    this.lineNumbersElement = document.getElementById('ln-html');
    this.charCountElement = document.getElementById('char-count');
    this.statusMsgElement = document.getElementById('status-msg');
    this.rawPreview = document.getElementById('raw-preview');
    this.workspace = document.getElementById('workspace');
    this.editorPanel = document.getElementById('editor-panel');
    this.previewPanel = document.getElementById('preview-panel');
    this.resizeBar = document.getElementById('resize-bar');
    this.themeControls = document.getElementById('theme-controls');
    this.heightCtrl = document.getElementById('height-ctrl');
  }

  /**
   * Vincula eventos a elementos
   */
  attachEvents() {
    // Editor
    if (this.editorElement) {
      this.editorElement.addEventListener('input', () => this.updateLines());
      this.editorElement.addEventListener('scroll', () => this.syncScroll());
      this.editorElement.addEventListener('keydown', (e) => this.handleTab(e));
    }

    // Layout buttons
    ['editor', 'split', 'preview'].forEach(layout => {
      const btn = document.getElementById(`vbtn-${layout}`);
      if (btn) {
        btn.addEventListener('click', () => this.setLayout(layout));
      }
    });

    // Preview mode buttons
    const rawTab = document.getElementById('ptab-raw');
    const moodleTab = document.getElementById('ptab-moodle');
    if (rawTab) rawTab.addEventListener('click', () => this.setPreviewMode('raw'));
    if (moodleTab) moodleTab.addEventListener('click', () => this.setPreviewMode('moodle'));

    // Theme buttons
    this.THEMES.forEach(theme => {
      const btn = document.getElementById(`tbtn-${theme}`);
      if (btn) {
        btn.addEventListener('click', () => this.setTheme(theme));
      }
    });

    // Height control
    const heightRange = document.getElementById('h-range');
    if (heightRange) {
      heightRange.addEventListener('input', (e) => this.updateIframeHeight(e.target.value));
    }

    // Resize bar
    if (this.resizeBar) {
      this.resizeBar.addEventListener('mousedown', (e) => this.startResize(e));
    }

    // Clear button - buscar por el elemento que no tiene onclick
    const clearBtn = Array.from(document.querySelectorAll('button')).find(btn => 
      btn.textContent.includes('Limpiar') && btn.className.includes('mp-btn-outline')
    );
    const runBtn = Array.from(document.querySelectorAll('button')).find(btn => 
      btn.textContent.includes('Ejecutar') && btn.className.includes('mp-btn-run')
    );
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearAll());
    }
    if (runBtn) {
      runBtn.addEventListener('click', () => this.runCode());
    }
  }

  /**
   * Configura el contenido inicial del editor
   */
  setupInitialContent() {
    if (this.editorElement) {
      this.editorElement.value = `<iframe
  src="https://es.wikipedia.org/wiki/Moodle"
  width="100%"
  height="500"
  style="border:none;"
  allowfullscreen>
</iframe>`;
      this.updateLines();
      setTimeout(() => this.runCode(), 150);
    }
  }

  /**
   * Actualiza los números de línea y cuenta de caracteres
   */
  updateLines() {
    if (!this.editorElement || !this.lineNumbersElement) return;

    this.lineNumbersElement.textContent = this.editorElement.value
      .split('\n')
      .map((_, i) => i + 1)
      .join('\n');

    if (this.charCountElement) {
      this.charCountElement.textContent = this.editorElement.value.length + ' chars';
    }

    clearTimeout(this.autoRunTimer);
    this.autoRunTimer = setTimeout(() => this.runCode(), 900);
  }

  /**
   * Sincroniza el scroll entre editor y números de línea
   */
  syncScroll() {
    if (!this.editorElement || !this.lineNumbersElement) return;
    this.lineNumbersElement.scrollTop = this.editorElement.scrollTop;
  }

  /**
   * Maneja la tecla Tab en el editor
   */
  handleTab(e) {
    if (e.key !== 'Tab') return;
    e.preventDefault();

    const ta = this.editorElement;
    const s = ta.selectionStart;
    ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd);
    ta.selectionStart = ta.selectionEnd = s + 2;
    this.updateLines();
  }

  /**
   * Ejecuta y previsualiza el código HTML
   */
  runCode() {
    if (!this.editorElement) return;

    const html = this.editorElement.value;
    const src = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#fff;font-family:sans-serif}</style></head><body>${html}</body></html>`;

    const url = URL.createObjectURL(new Blob([src], { type: 'text/html' }));

    // Actualizar vista directa
    if (this.rawPreview) {
      this.rawPreview.src = url;
    }

    // Actualizar todos los iframes de temas
    this.THEMES.forEach(theme => {
      const iframe = document.getElementById(`${theme}-iframe`);
      if (iframe) iframe.src = url;
    });

    // Actualizar mensaje de estado
    if (this.statusMsgElement) {
      this.statusMsgElement.className = 'mp-ok';
      this.statusMsgElement.textContent = '● Ejecutado correctamente';
    }
  }

  /**
   * Cambia el modo de previsualización
   */
  setPreviewMode(mode) {
    this.currentPreview = mode;
    const isMoodle = mode === 'moodle';

    // Actualizar tabs
    const rawTab = document.getElementById('ptab-raw');
    const moodleTab = document.getElementById('ptab-moodle');
    if (rawTab) rawTab.classList.toggle('active', !isMoodle);
    if (moodleTab) moodleTab.classList.toggle('active', isMoodle);

    // Actualizar visibilidad
    if (this.rawPreview) this.rawPreview.style.display = isMoodle ? 'none' : 'block';
    if (this.themeControls) this.themeControls.style.display = isMoodle ? 'flex' : 'none';
    if (this.heightCtrl) this.heightCtrl.style.display = isMoodle ? 'flex' : 'none';

    // Mostrar/ocultar temas
    this.THEMES.forEach(theme => {
      const themeWrap = document.getElementById(`theme-${theme}`);
      if (themeWrap) {
        themeWrap.style.display = (isMoodle && theme === this.currentTheme) ? 'block' : 'none';
      }
    });

    this.runCode();
  }

  /**
   * Cambia el tema Moodle activo
   */
  setTheme(theme) {
    this.currentTheme = theme;
    this.THEMES.forEach(t => {
      const themeWrap = document.getElementById(`theme-${t}`);
      const btn = document.getElementById(`tbtn-${t}`);

      if (themeWrap) {
        themeWrap.style.display = t === theme ? 'block' : 'none';
      }
      if (btn) {
        btn.classList.toggle('active', t === theme);
      }
    });
  }

  /**
   * Actualiza la altura de los iframes
   */
  updateIframeHeight(val) {
    const valSpan = document.getElementById('ih-val');
    if (valSpan) {
      valSpan.textContent = val + 'px';
    }

    this.THEMES.forEach(theme => {
      const iframe = document.getElementById(`${theme}-iframe`);
      if (iframe) {
        iframe.height = val;
      }
    });
  }

  /**
   * Cambia el layout (editor, split, preview)
   */
  setLayout(layout) {
    this.layout = layout;

    // Actualizar botones de vista
    ['editor', 'split', 'preview'].forEach(v => {
      const btn = document.getElementById(`vbtn-${v}`);
      if (btn) btn.classList.toggle('active', v === layout);
    });

    if (!this.editorPanel || !this.previewPanel || !this.resizeBar) return;

    // Reset classes
    this.editorPanel.className = 'mp-editor-panel';
    this.previewPanel.className = 'mp-preview-panel';
    this.resizeBar.style.display = 'block';

    if (layout === 'editor') {
      this.editorPanel.classList.add('full');
      this.previewPanel.classList.add('hidden');
      this.resizeBar.style.display = 'none';
    } else if (layout === 'preview') {
      this.previewPanel.classList.add('full');
      this.editorPanel.classList.add('hidden');
      this.resizeBar.style.display = 'none';
    } else {
      this.editorPanel.style.width = '50%';
    }

    this.runCode();
  }

  /**
   * Inicia el redimensionamiento de paneles
   */
  startResize(e) {
    e.preventDefault();

    if (!this.resizeBar || !this.workspace || !this.editorPanel) return;

    this.resizeBar.classList.add('dragging');

    const onMove = (ev) => {
      const r = this.workspace.getBoundingClientRect();
      const newWidth = Math.min(Math.max(((ev.clientX - r.left) / r.width) * 100, 20), 80);
      this.editorPanel.style.width = newWidth + '%';
    };

    const onUp = () => {
      this.resizeBar.classList.remove('dragging');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  /**
   * Limpia todo el código
   */
  clearAll() {
    if (!confirm('¿Limpiar el código?')) return;
    if (this.editorElement) {
      this.editorElement.value = '';
      this.updateLines();
      this.runCode();
    }
  }
}

// Instanciar la clase cuando se carga el script
new MoodlePlayground();
