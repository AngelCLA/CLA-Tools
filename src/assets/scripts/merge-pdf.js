// Configurar PDF.js worker
if (typeof pdfjsLib !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
}

class PDFMerger {
  constructor() {
    this.pdfFiles = [];
    this.sortableInstance = null;
    this.currentView = "grid";

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    this.bindElements();
    this.attachEvents();
    this.initSortable();
  }

  bindElements() {
    this.uploadArea = document.getElementById("upload-area");
    this.fileInput = document.getElementById("file-input");
    this.fileCount = document.getElementById("file-count");
    this.controlSection = document.getElementById("control-section");
    this.clearAllBtn = document.getElementById("clear-all-btn");
    this.addMoreBtn = document.getElementById("add-more-btn");
    this.mergeButton = document.getElementById("merge-button");
    this.progressBar = document.getElementById("progress-bar");
    this.progressBarInner = document.getElementById("progress-bar-inner");
    this.processingMessage = document.getElementById("processing-message");
    this.successMessage = document.getElementById("success-message");
    this.errorMessage = document.getElementById("error-message");
    this.reorderInstructions = document.getElementById("reorder-instructions");
    this.pdfPreview = document.getElementById("pdf-preview");
    this.viewButtons = document.querySelectorAll(".view-button");
  }

  attachEvents() {
    // Upload area events
    this.uploadArea.addEventListener("click", () => this.fileInput.click());

    this.uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.uploadArea.classList.add("border-purple-500", "bg-purple-50");
    });

    this.uploadArea.addEventListener("dragleave", () => {
      this.uploadArea.classList.remove("border-purple-500", "bg-purple-50");
    });

    this.uploadArea.addEventListener("drop", (e) => {
      e.preventDefault();
      this.uploadArea.classList.remove("border-purple-500", "bg-purple-50");
      const files = e.dataTransfer.files;
      this.processFiles(files);
    });

    // File input change
    this.fileInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        this.processFiles(e.target.files);
      }
    });

    // Control buttons
    this.addMoreBtn.addEventListener("click", () => this.fileInput.click());
    this.clearAllBtn.addEventListener("click", () => this.resetInterface());

    // Merge button
    this.mergeButton.addEventListener("click", async () => {
      if (this.pdfFiles.length === 0) {
        this.showError("No hay archivos PDF para unir");
        return;
      }
      try {
        await this.mergePDFs();
      } catch (error) {
        console.error("Error al unir PDFs:", error);
        this.showError("Ocurrió un error al unir los archivos PDF");
      }
    });

    // View buttons
    this.viewButtons.forEach((button) => {
      button.addEventListener("click", () => this.switchView(button));
    });
  }

  switchView(button) {
    this.viewButtons.forEach((btn) => {
      btn.classList.remove("active", "bg-purple-600", "text-white");
      btn.classList.add("bg-white", "text-zinc-700");
    });

    button.classList.add("active", "bg-purple-600", "text-white");
    button.classList.remove("bg-white", "text-zinc-700");

    const view = button.dataset.view;
    this.currentView = view;

    if (view === "list") {
      this.pdfPreview.classList.remove(
        "grid-cols-1",
        "sm:grid-cols-2",
        "md:grid-cols-3",
        "lg:grid-cols-4"
      );
      this.pdfPreview.classList.add("grid-cols-1");
    } else {
      this.pdfPreview.classList.remove("grid-cols-1");
      this.pdfPreview.classList.add(
        "grid-cols-1",
        "sm:grid-cols-2",
        "md:grid-cols-3",
        "lg:grid-cols-4"
      );
    }

    this.updateFileList();
  }

  processFiles(fileList) {
    let validFiles = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type === "application/pdf") {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) {
      this.showError("Por favor, selecciona archivos PDF válidos");
      return;
    }

    this.pdfFiles = [...this.pdfFiles, ...validFiles];
    this.sortPDFsByName();
    this.updateFileList();
    this.updateFileCount();

    this.controlSection.classList.remove("hidden");
    this.controlSection.classList.add("flex");
    this.mergeButton.disabled = false;

    if (this.pdfFiles.length > 1) {
      this.reorderInstructions.classList.remove("hidden");
    }
  }

  sortPDFsByName() {
    this.pdfFiles.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      const numA = parseInt(nameA.match(/\d+/)?.[0] || 0, 10);
      const numB = parseInt(nameB.match(/\d+/)?.[0] || 0, 10);

      if (numA !== numB) {
        return numA - numB;
      }

      return nameA.localeCompare(nameB);
    });
  }

  async updateFileList() {
    this.pdfPreview.innerHTML = "";

    if (this.pdfFiles.length === 0) {
      return;
    }

    for (let i = 0; i < this.pdfFiles.length; i++) {
      const file = this.pdfFiles[i];
      const fileSize = this.formatFileSize(file.size);

      const thumbnail = document.createElement("div");
      const isListView = this.currentView === "list";
      
      if (isListView) {
        thumbnail.className = "group relative bg-white dark:bg-zinc-900 rounded-md shadow-sm hover:shadow-lg transition-all duration-300 cursor-move flex flex-row items-center gap-4 h-full p-4";
        thumbnail.dataset.index = i;
        thumbnail.innerHTML = `
          <div class="w-16 h-20 flex-shrink-0 bg-gray-100 dark:bg-zinc-800 rounded flex items-center justify-center overflow-hidden">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
                 alt="Cargando miniatura..."
                 draggable="false"
                 class="w-full h-full object-contain select-none">
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1 overflow-hidden text-ellipsis whitespace-nowrap" title="${file.name}">${file.name}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              ${fileSize} • <span id="page-count-${i}">Cargando...</span>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <div class="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">${i + 1}</div>
            <button class="delete-btn w-8 h-8 bg-red-500 hover:bg-red-600 text-white border-0 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-110" title="Eliminar">
              <i class="fas fa-times"></i>
            </button>
          </div>
        `;
      } else {
        thumbnail.className = "group relative bg-white dark:bg-zinc-900 rounded-md shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-move flex flex-col items-center text-center h-full p-4";
        thumbnail.dataset.index = i;
        thumbnail.innerHTML = `
          <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 gap-2.5">
            <div class="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">${i + 1}</div>
            <button class="delete-btn w-8 h-8 bg-red-500 hover:bg-red-600 text-white border-0 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110" title="Eliminar">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="w-full aspect-[3/4] bg-gray-100 dark:bg-zinc-800 rounded mb-3 flex items-center justify-center overflow-hidden">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
                 alt="Cargando miniatura..."
                 draggable="false"
                 class="w-full h-full object-contain select-none">
          </div>
          <div class="w-full mt-auto">
            <div class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1 overflow-hidden text-ellipsis whitespace-nowrap" title="${file.name}">${file.name}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              ${fileSize}
              <span class="ml-1" id="page-count-${i}">Cargando...</span>
            </div>
          </div>
        `;
      }

      // Generate thumbnail
      const thumbnailUrl = await this.generateThumbnail(file);
      if (thumbnailUrl) {
        const img = thumbnail.querySelector("img");
        img.src = thumbnailUrl;
      }

      // Get page count
      const pageCount = await this.getPageCount(file);
      const pageCountElement = thumbnail.querySelector(`#page-count-${i}`);
      pageCountElement.textContent = `${pageCount} ${pageCount === 1 ? "página" : "páginas"}`;

      // Delete button
      thumbnail.querySelector(".delete-btn").addEventListener("click", () => {
        this.pdfFiles.splice(i, 1);
        this.updateFileList();
        this.updateFileCount();
        if (this.pdfFiles.length === 0) {
          this.resetInterface();
        } else if (this.pdfFiles.length === 1) {
          this.reorderInstructions.classList.add("hidden");
        }
      });

      this.pdfPreview.appendChild(thumbnail);
    }

    this.initSortable();
  }

  initSortable() {
    if (this.sortableInstance) {
      this.sortableInstance.destroy();
    }

    this.sortableInstance = new Sortable(this.pdfPreview, {
      animation: 150,
      ghostClass: "opacity-50",
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;

        if (oldIndex !== newIndex) {
          const item = this.pdfFiles.splice(oldIndex, 1)[0];
          this.pdfFiles.splice(newIndex, 0, item);
          this.updateFileList();
        }
      },
    });
  }

  async generateThumbnail(file) {
    try {
      const arrayBuffer = await this.readFileAsArrayBuffer(file);
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 0.5 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      return canvas.toDataURL();
    } catch (error) {
      console.error("Error generando miniatura:", error);
      return null;
    }
  }

  async getPageCount(file) {
    try {
      const arrayBuffer = await this.readFileAsArrayBuffer(file);
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      return pdf.numPages;
    } catch (error) {
      console.error("Error al contar páginas:", error);
      return "?";
    }
  }

  updateFileCount() {
    const count = this.pdfFiles.length;
    this.fileCount.textContent =
      count === 1 ? "1 archivo seleccionado" : `${count} archivos seleccionados`;
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  async mergePDFs() {
    try {
      this.progressBar.classList.remove("hidden");
      this.processingMessage.classList.remove("hidden");
      this.mergeButton.disabled = true;

      const { PDFDocument } = PDFLib;
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < this.pdfFiles.length; i++) {
        const file = this.pdfFiles[i];

        const progress = (i / this.pdfFiles.length) * 100;
        this.progressBarInner.style.width = `${progress}%`;
        this.processingMessage.textContent = `Procesando: ${file.name}`;

        const arrayBuffer = await this.readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(arrayBuffer);

        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      this.progressBarInner.style.width = "100%";
      this.processingMessage.textContent = "Finalizando...";

      const mergedPdfBytes = await mergedPdf.save();

      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "documentos_combinados.pdf";
      a.click();

      URL.revokeObjectURL(url);

      this.progressBar.classList.add("hidden");
      this.processingMessage.classList.add("hidden");
      this.showSuccess("¡PDFs combinados exitosamente!");
      this.mergeButton.disabled = false;
    } catch (error) {
      console.error("Error al combinar PDFs:", error);
      this.progressBar.classList.add("hidden");
      this.processingMessage.classList.add("hidden");
      this.showError("Error al combinar los PDFs. Por favor, intenta de nuevo.");
      this.mergeButton.disabled = false;
    }
  }

  readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve(e.target.result);
      };

      reader.onerror = (e) => {
        reject(new Error("Error al leer el archivo"));
      };

      reader.readAsArrayBuffer(file);
    });
  }

  showSuccess(message) {
    this.successMessage.textContent = message;
    this.successMessage.classList.remove("hidden");

    setTimeout(() => {
      this.successMessage.classList.add("hidden");
    }, 4000);
  }

  showError(message) {
    this.errorMessage.textContent = message;
    this.errorMessage.classList.remove("hidden");

    setTimeout(() => {
      this.errorMessage.classList.add("hidden");
    }, 5000);
  }

  resetInterface() {
    this.pdfFiles = [];
    this.fileInput.value = "";
    this.pdfPreview.innerHTML = "";
    this.updateFileCount();
    this.mergeButton.disabled = true;
    this.reorderInstructions.classList.add("hidden");
    this.controlSection.classList.add("hidden");
    this.controlSection.classList.remove("flex");
  }
}

// Initialize
window.pdfMerger = new PDFMerger();
