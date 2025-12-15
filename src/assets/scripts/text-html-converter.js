console.log("Inicializando conversor de Texto a HTML");

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
      this.showError("No hay contenido para convertir");
      return;
    }

    const htmlContent = this.editor.innerHTML;
    const formattedHtml = this.formatHtml(htmlContent);

    this.htmlOutput.value = formattedHtml;
    this.htmlPreview.innerHTML = htmlContent;
    this.switchTab("html");
    this.showSuccess("¡HTML generado exitosamente!");
  }

  generateMoodleHtml() {
    if (
      !this.editor.innerHTML.trim() ||
      this.editor.innerHTML === "<p><br></p>"
    ) {
      this.showError("No hay contenido para convertir");
      return;
    }

    const cleanHtml = this.generateUltraCleanHtml();
    this.htmlOutput.value = cleanHtml;
    this.htmlPreview.innerHTML = cleanHtml;
    this.switchTab("html");
    this.showSuccess("¡HTML optimizado para Moodle generado!");
  }

  clearEditor() {
    if (
      confirm(
        "¿Estás seguro de que deseas limpiar todo el contenido del editor?"
      )
    ) {
      this.editor.innerHTML = "<p><br></p>";
      this.editor.focus();
    }
  }

  copyHtml() {
    if (!this.htmlOutput.value) {
      this.showError("No hay contenido para copiar");
      return;
    }

    navigator.clipboard
      .writeText(this.htmlOutput.value)
      .then(() => {
        this.showSuccess("¡Copiado al portapapeles!");
      })
      .catch(() => {
        this.showError("Error al copiar");
      });
  }

  downloadHtml() {
    if (!this.htmlOutput.value) {
      this.showError("No hay contenido para descargar");
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
  }

  handlePaste(e) {
    e.preventDefault();

    const text = e.clipboardData.getData("text/plain");
    const html = e.clipboardData.getData("text/html");

    if (html) {
      document.execCommand("insertHTML", false, html);
    } else {
      document.execCommand("insertText", false, text);
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
