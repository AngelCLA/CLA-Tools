console.log("Inicializando conversor DOCX a GIFT");

class DocxToGiftConverter {
  constructor() {
    this.processedContent = "";
    this.fileName = "";
    this.debugInfo = "";
    this.elements = {};

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    console.log("Inicializando converter");
    this.bindElements();
    this.attachEvents();
  }

  bindElements() {
    this.elements = {
      uploadArea: document.getElementById("upload-area"),
      fileInput: document.getElementById("file-input"),
      outputArea: document.getElementById("output-area"),
      giftOutput: document.getElementById("gift-output"),
      loading: document.getElementById("loading"),
      fileInfo: document.getElementById("file-info"),
      fileName: document.getElementById("file-name"),
      removeFile: document.getElementById("remove-file"),
      questionsPreview: document.getElementById("questions-preview"),
      questionCount: document.getElementById("question-count"),
      answerCount: document.getElementById("answer-count"),
      correctCount: document.getElementById("correct-count"),
      successMessage: document.getElementById("success-message"),
      errorMessage: document.getElementById("error-message"),
      copyBtn: document.getElementById("copy-btn"),
      downloadBtn: document.getElementById("download-btn"),
    };
  }

  attachEvents() {
    const { uploadArea, fileInput, removeFile, copyBtn, downloadBtn } =
      this.elements;

    if (uploadArea && fileInput) {
      uploadArea.addEventListener("click", () => fileInput.click());
      uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadArea.classList.add("border-purple-500");
      });
      uploadArea.addEventListener("dragleave", () => {
        uploadArea.classList.remove("border-purple-500");
      });
      uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadArea.classList.remove("border-purple-500");
        this.handleFiles(e.dataTransfer.files);
      });
      fileInput.addEventListener("change", (e) =>
        this.handleFiles(e.target.files)
      );
    }

    if (removeFile) {
      removeFile.addEventListener("click", () => this.resetInterface());
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", () => this.copyToClipboard());
    }

    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => this.downloadGift());
    }
  }

  handleFiles(files) {
    if (files.length === 0) return;

    const file = files[0];
    if (!file.name.toLowerCase().endsWith(".docx")) {
      this.showError("Por favor, selecciona un archivo DOCX");
      return;
    }

    this.processFile(file);
  }

  async processFile(file) {
    this.fileName = file.name.replace(".docx", "");

    if (this.elements.fileName) {
      this.elements.fileName.textContent = file.name;
    }
    if (this.elements.fileInfo) {
      this.elements.fileInfo.classList.remove("hidden");
    }

    this.showLoading(true);
    this.hideMessages();

    try {
      const arrayBuffer = await file.arrayBuffer();

      if (typeof mammoth === "undefined") {
        throw new Error("Librería mammoth no cargada");
      }

      const result = await mammoth.convertToHtml({ arrayBuffer });
      const html = result.value;

      this.debugInfo = "HTML procesado correctamente\n";
      this.processDocument(html);
    } catch (error) {
      console.error("Error procesando archivo:", error);
      this.showLoading(false);
      this.showError("Error al procesar el archivo: " + error.message);
    }
  }

  processDocument(html) {
    try {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      const structure = this.extractDocumentStructure(tempDiv);
      const giftContent = this.generateGiftFormat(structure);

      this.processedContent = giftContent;
      this.updateStatistics(structure);
      this.generatePreview(structure);
      this.showResults(giftContent);
      this.showSuccess("¡Archivo convertido exitosamente!");
    } catch (error) {
      console.error("Error procesando documento:", error);
      this.showLoading(false);
      this.showError("Error al procesar el documento.");
    }
  }

  extractDocumentStructure(htmlElement) {
    const structure = [];
    const paragraphs = htmlElement.querySelectorAll("p");

    let currentQuestion = null;
    let currentAnswers = [];

    paragraphs.forEach((p) => {
      const text = p.textContent.trim();
      if (!text) return;

      const boldElements = p.querySelectorAll("strong, b");
      const hasStrongContent =
        boldElements.length > 0 &&
        Array.from(boldElements).some((b) => b.textContent.trim().length > 5);

      if (hasStrongContent) {
        if (currentQuestion && currentAnswers.length > 0) {
          structure.push({
            question: currentQuestion,
            answers: currentAnswers,
          });
        }

        currentQuestion = text;
        currentAnswers = [];
      } else if (text && currentQuestion && text.length > 1) {
        const isCorrect = this.isAnswerCorrect(p, text);

        currentAnswers.push({
          text: text,
          isCorrect: isCorrect,
        });
      }
    });

    if (currentQuestion && currentAnswers.length > 0) {
      structure.push({
        question: currentQuestion,
        answers: currentAnswers,
      });
    }

    // Validar que cada pregunta tenga al menos una respuesta correcta
    structure.forEach((item) => {
      const correctAnswers = item.answers.filter((a) => a.isCorrect);
      if (correctAnswers.length === 0 && item.answers.length > 0) {
        item.answers[0].isCorrect = true;
      }
    });

    return structure;
  }

  isAnswerCorrect(paragraph, text) {
    // Verificar elementos subrayados
    const underlineElements = paragraph.querySelectorAll("u");
    if (underlineElements.length > 0) {
      for (const u of underlineElements) {
        const underlineText = u.textContent.trim();
        if (underlineText === text || text.includes(underlineText)) {
          return true;
        }
      }
    }

    // Verificar estilo de subrayado
    const style = paragraph.getAttribute("style") || "";
    if (style.includes("text-decoration") && style.includes("underline")) {
      return true;
    }

    // Verificar spans con subrayado
    const spans = paragraph.querySelectorAll("span");
    for (const span of spans) {
      const spanStyle = span.getAttribute("style") || "";
      if (
        spanStyle.includes("text-decoration") &&
        spanStyle.includes("underline")
      ) {
        if (
          span.textContent.trim() === text ||
          text.includes(span.textContent.trim())
        ) {
          return true;
        }
      }
    }

    return false;
  }

  generateGiftFormat(structure) {
    let giftContent = "";

    structure.forEach((item) => {
      const cleanQuestion = this.escapeGiftCharacters(
        item.question.replace(/\*\*/g, "").trim()
      );

      giftContent += `${cleanQuestion} {\n`;

      item.answers.forEach((answer) => {
        const prefix = answer.isCorrect ? "=" : "~";
        const cleanAnswer = this.escapeGiftCharacters(answer.text);
        giftContent += `  ${prefix}${cleanAnswer}\n`;
      });

      giftContent += "}\n\n";
    });

    return giftContent;
  }

  escapeGiftCharacters(text) {
    return text
      .replace(/~/g, "\\~")
      .replace(/=/g, "\\=")
      .replace(/:/g, "\\:")
      .replace(/{/g, "\\{")
      .replace(/}/g, "\\}");
  }

  generatePreview(structure) {
    if (!this.elements.questionsPreview) return;

    let previewHTML = "";

    structure.forEach((item, index) => {
      previewHTML += `
        <div class="bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700 mb-3 mx-6">
          <div class="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">${index + 1}. ${item.question}</div>
          ${item.answers
            .map(
              (answer) => `
            <div class="flex items-start gap-2 py-1 text-sm ${
              answer.isCorrect
                ? "text-green-700 dark:text-green-400 font-medium"
                : "text-zinc-600 dark:text-zinc-400"
            }">
              <span class="mt-0.5">${answer.isCorrect ? "✓" : "○"}</span>
              <span>${answer.text}</span>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    });

    this.elements.questionsPreview.innerHTML = previewHTML;
  }

  updateStatistics(structure) {
    const questionCount = structure.length;
    let totalAnswers = 0;
    let correctAnswers = 0;

    structure.forEach((item) => {
      totalAnswers += item.answers.length;
      correctAnswers += item.answers.filter((a) => a.isCorrect).length;
    });

    if (this.elements.questionCount) {
      this.elements.questionCount.textContent = questionCount;
    }
    if (this.elements.answerCount) {
      this.elements.answerCount.textContent = totalAnswers;
    }
    if (this.elements.correctCount) {
      this.elements.correctCount.textContent = correctAnswers;
    }
  }

  showResults(giftContent) {
    this.showLoading(false);

    if (this.elements.giftOutput) {
      this.elements.giftOutput.value = giftContent;
    }
    if (this.elements.outputArea) {
      this.elements.outputArea.classList.remove("hidden");
    }
  }

  showLoading(show) {
    if (this.elements.loading) {
      if (show) {
        this.elements.loading.classList.remove("hidden");
        this.elements.outputArea?.classList.add("hidden");
      } else {
        this.elements.loading.classList.add("hidden");
      }
    }
  }

  showSuccess(message) {
    if (this.elements.successMessage) {
      this.elements.successMessage.textContent = message;
      this.elements.successMessage.classList.remove("hidden");
      setTimeout(
        () => this.elements.successMessage.classList.add("hidden"),
        5000
      );
    }
  }

  showError(message) {
    if (this.elements.errorMessage) {
      this.elements.errorMessage.textContent = message;
      this.elements.errorMessage.classList.remove("hidden");
      setTimeout(
        () => this.elements.errorMessage.classList.add("hidden"),
        5000
      );
    }
  }

  hideMessages() {
    this.elements.successMessage?.classList.add("hidden");
    this.elements.errorMessage?.classList.add("hidden");
  }

  copyToClipboard() {
    if (this.elements.giftOutput && this.elements.giftOutput.value) {
      navigator.clipboard
        .writeText(this.elements.giftOutput.value)
        .then(() => {
          const originalText = this.elements.copyBtn.innerHTML;
          this.elements.copyBtn.innerHTML = "✓ Copiado!";
          setTimeout(() => {
            this.elements.copyBtn.innerHTML = originalText;
          }, 2000);
        })
        .catch(() => {
          this.showError("Error al copiar");
        });
    }
  }

  downloadGift() {
    if (!this.processedContent) {
      this.showError("No hay contenido para descargar");
      return;
    }

    const blob = new Blob([this.processedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${this.fileName || "preguntas"}.gift`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  resetInterface() {
    if (this.elements.fileInput) {
      this.elements.fileInput.value = "";
    }
    if (this.elements.fileInfo) {
      this.elements.fileInfo.classList.add("hidden");
    }
    if (this.elements.outputArea) {
      this.elements.outputArea.classList.add("hidden");
    }
    if (this.elements.giftOutput) {
      this.elements.giftOutput.value = "";
    }
    this.hideMessages();
    this.processedContent = "";
    this.fileName = "";
  }
}

// Inicializar converter
window.docxConverter = new DocxToGiftConverter();
