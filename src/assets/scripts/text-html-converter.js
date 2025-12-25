class TextToHtmlConverter {
  constructor() {
    this.editor = null;
    this.htmlOutput = null;
    this.htmlPreview = null;
    this.currentTab = "editor";

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    this.bindElements();
    this.attachEvents();
    this.setupEditor();
  }

  bindElements() {
    this.editor = document.getElementById("editor");
    this.htmlOutput = document.getElementById("html-output");
    this.htmlPreview = document.getElementById("html-preview");
    this.tabs = document.querySelectorAll("[data-tab]");
    this.tabContents = document.querySelectorAll("[data-tab-content]");
    this.toolbarButtons = document.querySelectorAll("[data-command]");
  }

  attachEvents() {
    // Toolbar buttons
    this.toolbarButtons.forEach((button) => {
      button.addEventListener("click", (e) => this.handleToolbarClick(e));
    });

    // Tabs
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", () => this.switchTab(tab.dataset.tab));
    });

    // Generate HTML button
    document
      .getElementById("generate-html-btn")
      ?.addEventListener("click", () => this.generateHtml());

    // Generate Moodle button
    document
      .getElementById("generate-moodle-btn")
      ?.addEventListener("click", () => this.generateMoodleHtml());

    // Clear editor
    document
      .getElementById("clear-editor-btn")
      ?.addEventListener("click", () => this.clearEditor());

    // Copy HTML
    document
      .getElementById("copy-html-btn")
      ?.addEventListener("click", () => this.copyHtml());

    // Download HTML
    document
      .getElementById("download-html-btn")
      ?.addEventListener("click", () => this.downloadHtml());

    // Paste event
    if (this.editor) {
      this.editor.addEventListener("paste", (e) => this.handlePaste(e));
      this.editor.addEventListener("keydown", (e) => this.handleKeydown(e));
    }
  }

  setupEditor() {
    document.execCommand("defaultParagraphSeparator", false, "p");
  }

  handleToolbarClick(e) {
    const button = e.currentTarget;
    const command = button.dataset.command;
    const value = button.dataset.value || "";

    if (command === "createLink") {
      const url = prompt("Ingrese la URL del enlace:", "https://");
      if (url) document.execCommand(command, false, url);
    } else if (command === "foreColor" || command === "backColor") {
      const colorPicker = document.createElement("input");
      colorPicker.type = "color";
      colorPicker.value = value;
      colorPicker.addEventListener("change", () => {
        document.execCommand(command, false, colorPicker.value);
      });
      colorPicker.click();
    } else {
      document.execCommand(command, false, value);
    }

    this.editor.focus();
  }

  switchTab(tabName) {
    this.currentTab = tabName;

    // Update active tab
    this.tabs.forEach((tab) => {
      if (tab.dataset.tab === tabName) {
        tab.classList.add("border-purple-600", "text-purple-600", "dark:border-purple-400", "dark:text-purple-400");
        tab.classList.remove("border-transparent", "text-zinc-600", "dark:text-zinc-400");
      } else {
        tab.classList.remove("border-purple-600", "text-purple-600", "dark:border-purple-400", "dark:text-purple-400");
        tab.classList.add("border-transparent", "text-zinc-600", "dark:text-zinc-400");
      }
    });

    // Update tab content
    this.tabContents.forEach((content) => {
      if (content.dataset.tabContent === tabName) {
        content.classList.remove("hidden");
      } else {
        content.classList.add("hidden");
      }
    });

    // Update preview if needed
    if (tabName === "preview") {
      this.htmlPreview.innerHTML = this.editor.innerHTML;
    }
  }

  generateHtml() {
    if (
      !this.editor.innerHTML.trim() ||
      this.editor.innerHTML === "<p><br></p>"
    ) {
      this.showToast("No hay contenido para convertir", "error");
      return;
    }

    const htmlContent = this.editor.innerHTML;
    const formattedHtml = this.formatHtml(htmlContent);

    this.htmlOutput.value = formattedHtml;
    this.htmlPreview.innerHTML = htmlContent;
    this.switchTab("html");
    this.showToast("¡HTML generado exitosamente!", "success");
  }

  generateMoodleHtml() {
    if (
      !this.editor.innerHTML.trim() ||
      this.editor.innerHTML === "<p><br></p>"
    ) {
      this.showToast("No hay contenido para convertir", "error");
      return;
    }

    const cleanHtml = this.generateUltraCleanHtml();
    this.htmlOutput.value = cleanHtml;
    this.htmlPreview.innerHTML = cleanHtml;
    this.switchTab("html");
    this.showToast("¡HTML optimizado para Moodle generado!", "success");
  }

  clearEditor() {
    this.showConfirmModal(
      "¿Limpiar editor?",
      "Esta acción eliminará todo el contenido del editor. Esta acción no se puede deshacer.",
      () => {
        this.editor.innerHTML = "<p><br></p>";
        this.editor.focus();
        this.showToast("Editor limpiado", "success");
      }
    );
  }

  showConfirmModal(title, message, onConfirm) {
    // Crear overlay
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in";
    
    // Crear modal
    const modal = document.createElement("div");
    modal.className = "bg-white dark:bg-zinc-800 rounded-xl shadow-2xl max-w-md w-full transform scale-95 opacity-0 transition-all duration-200";
    
    modal.innerHTML = `
      <div class="p-6">
        <div class="flex items-start gap-4 mb-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">${title}</h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">${message}</p>
          </div>
        </div>
        
        <div class="flex gap-3 justify-end">
          <button class="modal-cancel px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition">
            Cancelar
          </button>
          <button class="modal-confirm px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
            Limpiar
          </button>
        </div>
      </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Animar entrada
    setTimeout(() => {
      modal.style.transform = "scale(1)";
      modal.style.opacity = "1";
    }, 10);
    
    // Función para cerrar modal
    const closeModal = () => {
      modal.style.transform = "scale(0.95)";
      modal.style.opacity = "0";
      setTimeout(() => {
        overlay.remove();
      }, 200);
    };
    
    // Event listeners
    const cancelBtn = modal.querySelector(".modal-cancel");
    const confirmBtn = modal.querySelector(".modal-confirm");
    
    cancelBtn.addEventListener("click", closeModal);
    
    confirmBtn.addEventListener("click", () => {
      closeModal();
      onConfirm();
    });
    
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });
    
    // Cerrar con ESC
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", handleEscape);
      }
    };
    document.addEventListener("keydown", handleEscape);
  }

  copyHtml() {
    if (!this.htmlOutput.value) {
      this.showToast("No hay contenido para copiar", "error");
      return;
    }

    navigator.clipboard
      .writeText(this.htmlOutput.value)
      .then(() => {
        this.showToast("¡Código HTML copiado al portapapeles!", "success");
      })
      .catch(() => {
        this.showToast("Error al copiar al portapapeles", "error");
      });
  }

  downloadHtml() {
    if (!this.htmlOutput.value) {
      this.showToast("No hay contenido para descargar", "error");
      return;
    }

    const blob = new Blob([this.htmlOutput.value], {
      type: "text/html; charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "documento.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    this.showToast("¡Archivo HTML descargado exitosamente!", "success");
  }

  handlePaste(e) {
    e.preventDefault();

    const text = e.clipboardData.getData("text/plain");
    const html = e.clipboardData.getData("text/html");

    if (html) {
      document.execCommand("insertHTML", false, html);
      this.showToast("Contenido formateado pegado correctamente", "success");
    } else {
      document.execCommand("insertText", false, text);
      this.showToast("Texto plano pegado", "success");
    }
  }

  handleKeydown(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      document.execCommand("insertHTML", false, "&nbsp;&nbsp;&nbsp;&nbsp;");
    }
  }

  formatHtml(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    this.cleanInlineStyles(tempDiv);
    this.convertStylesToStandardTags(tempDiv);
    return this.formatHtmlStructure(tempDiv.innerHTML);
  }

  cleanInlineStyles(element) {
    const elementsWithStyle = element.querySelectorAll("[style]");

    elementsWithStyle.forEach((el) => {
      const style = el.getAttribute("style");

      const problematicStyles = [
        "font-family",
        "line-height",
        "margin",
        "padding",
        "width",
        "height",
        "position",
        "z-index",
        "display",
      ];

      let cleanStyle = style;
      problematicStyles.forEach((prop) => {
        const regex = new RegExp(`${prop}\\s*:[^;]*;?`, "gi");
        cleanStyle = cleanStyle.replace(regex, "");
      });

      if (cleanStyle.trim()) {
        el.setAttribute("style", cleanStyle.trim());
      } else {
        el.removeAttribute("style");
      }
    });
  }

  convertStylesToStandardTags(element) {
    // Convert bold spans to <strong>
    const boldSpans = element.querySelectorAll('span[style*="font-weight"]');
    boldSpans.forEach((span) => {
      const style = span.getAttribute("style");
      if (
        style.includes("bold") ||
        style.includes("700") ||
        style.includes("800") ||
        style.includes("900")
      ) {
        const strong = document.createElement("strong");
        strong.innerHTML = span.innerHTML;
        span.parentNode.replaceChild(strong, span);
      }
    });

    // Convert italic spans to <em>
    const italicSpans = element.querySelectorAll('span[style*="font-style"]');
    italicSpans.forEach((span) => {
      const style = span.getAttribute("style");
      if (style.includes("italic")) {
        const em = document.createElement("em");
        em.innerHTML = span.innerHTML;
        span.parentNode.replaceChild(em, span);
      }
    });

    // Convert underline spans to <u>
    const underlineSpans = element.querySelectorAll(
      'span[style*="text-decoration"]'
    );
    underlineSpans.forEach((span) => {
      const style = span.getAttribute("style");
      if (style.includes("underline")) {
        const u = document.createElement("u");
        u.innerHTML = span.innerHTML;
        span.parentNode.replaceChild(u, span);
      }
    });
  }

  formatHtmlStructure(html) {
    return html.replace(/></g, ">\n<").trim();
  }

  generateUltraCleanHtml() {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = this.editor.innerHTML;

    const allowedTags = [
      "p",
      "strong",
      "em",
      "u",
      "br",
      "h1",
      "h2",
      "h3",
      "ul",
      "ol",
      "li",
      "a",
    ];

    tempDiv.querySelectorAll("*").forEach((el) => {
      if (!allowedTags.includes(el.tagName.toLowerCase())) {
        el.outerHTML = el.innerHTML;
      } else {
        Array.from(el.attributes).forEach((attr) => {
          if (!(el.tagName.toLowerCase() === "a" && attr.name === "href")) {
            el.removeAttribute(attr.name);
          }
        });
      }
    });

    return tempDiv.innerHTML;
  }

  // Método integrado de Toast (usa ToastManager si está disponible, sino usa fallback)
  showToast(message, type = "success") {
    if (window.ToastManager && typeof window.ToastManager.showToast === 'function') {
      window.ToastManager.showToast(message, type);
    } else {
      // Fallback a los mensajes antiguos si ToastManager no está disponible
      if (type === "success") {
        this.showSuccess(message);
      } else {
        this.showError(message);
      }
    }
  }

  // Métodos legacy (mantener por compatibilidad)
  showSuccess(message) {
    const successMsg = document.getElementById("success-message");
    if (successMsg) {
      successMsg.textContent = message;
      successMsg.classList.remove("hidden");
      setTimeout(() => {
        successMsg.classList.add("hidden");
      }, 3000);
    }
  }

  showError(message) {
    const errorMsg = document.getElementById("error-message");
    if (errorMsg) {
      errorMsg.textContent = message;
      errorMsg.classList.remove("hidden");
      setTimeout(() => {
        errorMsg.classList.add("hidden");
      }, 3000);
    }
  }
}

// Initialize converter
window.textToHtmlConverter = new TextToHtmlConverter();