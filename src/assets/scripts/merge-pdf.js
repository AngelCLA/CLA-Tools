import { PDF } from "@libpdf/core";

class PDFMerger {
  constructor() {
    this.pdfFiles = [];
    this.sortableInstance = null;
    this.currentView = "grid";
    this.fileIdCounter = 0; // Contador para IDs únicos
    this.thumbnailCache = new Map(); // Cache para miniaturas ya cargadas

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
    this.sortControls = document.getElementById("sort-controls");
    this.sortNameBtn = document.getElementById("sort-name-btn");
    this.sortDateBtn = document.getElementById("sort-date-btn");
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
    this.clearAllBtn.addEventListener("click", () => {
      this.showConfirmModal(
        "¿Eliminar todos los archivos?",
        `Se eliminarán ${this.pdfFiles.length} archivo${this.pdfFiles.length > 1 ? "s" : ""} de la lista. Esta acción no se puede deshacer.`,
        () => {
          this.resetInterface();
          window.ToastManager.showToast("Todos los archivos eliminados", "success");
        },
      );
    });

    // Merge button
    this.mergeButton.addEventListener("click", async () => {
      if (this.pdfFiles.length === 0) {
        window.ToastManager.showToast("No hay archivos PDF para unir", "error");
        return;
      }
      try {
        await this.mergePDFs();
      } catch (error) {
        console.error("Error al unir PDFs:", error);
        window.ToastManager.showToast(
          "Ocurrió un error al unir los archivos PDF",
          "error",
        );
      }
    });

    // View buttons
    this.viewButtons.forEach((button) => {
      button.addEventListener("click", () => this.switchView(button));
    });

    // Sort buttons
    this.sortNameBtn.addEventListener("click", () => this.sortByName());
    this.sortDateBtn.addEventListener("click", () => this.sortByDate());
  }

  switchView(button) {
    // Remover active de todos los botones
    this.viewButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Agregar active al botón clickeado
    button.classList.add("active");

    const view = button.dataset.view;
    this.currentView = view;

    if (view === "list") {
      this.pdfPreview.classList.remove(
        "grid-cols-1",
        "sm:grid-cols-2",
        "md:grid-cols-3",
        "lg:grid-cols-4",
        "xl:grid-cols-5",
      );
      this.pdfPreview.classList.add("grid-cols-1");
    } else {
      this.pdfPreview.classList.remove("grid-cols-1");
      this.pdfPreview.classList.add(
        "grid-cols-1",
        "sm:grid-cols-2",
        "md:grid-cols-3",
        "lg:grid-cols-4",
        "xl:grid-cols-5",
      );
    }

    // Reconstruir la vista sin recargar las miniaturas
    this.rebuildView();
  }

  processFiles(fileList) {
    let validFiles = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type === "application/pdf") {
        // Agregar ID único a cada archivo
        file._uniqueId = this.fileIdCounter++;
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) {
      window.ToastManager.showToast(
        "Por favor, selecciona archivos PDF válidos",
        "error",
      );
      return;
    }

    this.pdfFiles = [...this.pdfFiles, ...validFiles];
    
    // NO ordenar automáticamente - dejar que el usuario controle el orden
    // this.sortPDFsByName();
    
    // Solo agregar nuevos archivos sin recargar los existentes
    this.addNewFiles(validFiles);
    this.updateFileCount();

    this.controlSection.classList.remove("hidden");
    this.controlSection.classList.add("flex");
    this.sortControls.classList.remove("hidden");
    this.sortControls.classList.add("flex");
    this.mergeButton.disabled = false;

    if (this.pdfFiles.length > 1) {
      this.reorderInstructions.classList.remove("hidden");
    }

    window.ToastManager.showToast(
      `${validFiles.length} archivo${validFiles.length > 1 ? "s agregados" : " agregado"}`,
      "success",
    );
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

  sortByName() {
    this.sortPDFsByName();
    this.reorderDOM();
    window.ToastManager.showToast("Archivos ordenados por nombre", "success");
  }

  sortByDate() {
    this.pdfFiles.sort((a, b) => {
      return b.lastModified - a.lastModified;
    });
    this.reorderDOM();
    window.ToastManager.showToast("Archivos ordenados por fecha", "success");
  }

  reorderDOM() {
    // Reordenar los elementos en el DOM según el nuevo orden de pdfFiles
    const fragment = document.createDocumentFragment();
    
    this.pdfFiles.forEach((file) => {
      const element = this.pdfPreview.querySelector(`[data-file-id="${file._uniqueId}"]`);
      if (element) {
        fragment.appendChild(element);
      }
    });
    
    this.pdfPreview.innerHTML = "";
    this.pdfPreview.appendChild(fragment);
    
    // Actualizar los números de orden
    this.updateOrderNumbers();
  }

  async addNewFiles(newFiles) {
    // Solo agregar los archivos nuevos
    for (const file of newFiles) {
      const fileIndex = this.pdfFiles.findIndex(f => f._uniqueId === file._uniqueId);
      const fileSize = this.formatFileSize(file.size);

      const thumbnail = this.createThumbnailElement(file, fileSize, fileIndex);
      
      // Delete button
      thumbnail.querySelector(".delete-btn").addEventListener("click", () => {
        this.deleteFile(file._uniqueId);
      });

      this.pdfPreview.appendChild(thumbnail);
      
      // Cargar preview de forma asíncrona solo si no está en cache
      if (!this.thumbnailCache.has(file._uniqueId)) {
        this.loadPDFPreview(file, file._uniqueId);
      } else {
        // Usar la miniatura del cache
        const cachedData = this.thumbnailCache.get(file._uniqueId);
        const thumbnailImg = document.getElementById(`thumbnail-${file._uniqueId}`);
        const loadingIndicator = document.getElementById(`thumbnail-loading-${file._uniqueId}`);
        const pageCountElement = document.getElementById(`page-count-${file._uniqueId}`);
        
        if (thumbnailImg && cachedData.thumbnail) {
          thumbnailImg.src = cachedData.thumbnail;
          thumbnailImg.classList.remove("hidden");
        }
        if (loadingIndicator) {
          loadingIndicator.remove();
        }
        if (pageCountElement) {
          pageCountElement.textContent = cachedData.pageCountText;
        }
      }
    }

    // Actualizar números después de agregar
    this.updateOrderNumbers();
    this.initSortable();
  }

  rebuildView() {
    // Guardar las miniaturas actuales antes de limpiar
    this.pdfPreview.innerHTML = "";
    
    // Recrear todos los elementos pero usando el cache de miniaturas
    this.pdfFiles.forEach((file, index) => {
      const fileSize = this.formatFileSize(file.size);
      const thumbnail = this.createThumbnailElement(file, fileSize, index);
      
      thumbnail.querySelector(".delete-btn").addEventListener("click", () => {
        this.deleteFile(file._uniqueId);
      });
      
      this.pdfPreview.appendChild(thumbnail);
      
      // Usar datos del cache si existen
      if (this.thumbnailCache.has(file._uniqueId)) {
        const cachedData = this.thumbnailCache.get(file._uniqueId);
        const thumbnailImg = document.getElementById(`thumbnail-${file._uniqueId}`);
        const loadingIndicator = document.getElementById(`thumbnail-loading-${file._uniqueId}`);
        const pageCountElement = document.getElementById(`page-count-${file._uniqueId}`);
        
        if (thumbnailImg && cachedData.thumbnail) {
          thumbnailImg.src = cachedData.thumbnail;
          thumbnailImg.classList.remove("hidden");
        }
        if (loadingIndicator) {
          loadingIndicator.remove();
        }
        if (pageCountElement) {
          pageCountElement.textContent = cachedData.pageCountText;
        }
      } else {
        // Si por alguna razón no está en cache, cargar
        this.loadPDFPreview(file, file._uniqueId);
      }
    });
    
    this.initSortable();
  }

  deleteFile(fileId) {
    const file = this.pdfFiles.find(f => f._uniqueId === fileId);
    if (!file) return;
    
    const fileName = file.name;
    const index = this.pdfFiles.findIndex(f => f._uniqueId === fileId);
    
    if (index !== -1) {
      this.pdfFiles.splice(index, 1);
      // Eliminar del cache
      this.thumbnailCache.delete(fileId);
      
      // Eliminar el elemento del DOM
      const thumbnail = this.pdfPreview.querySelector(`[data-file-id="${fileId}"]`);
      if (thumbnail) {
        thumbnail.remove();
      }
      
      this.updateOrderNumbers();
      this.updateFileCount();
      window.ToastManager.showToast(`${fileName} eliminado`, "success");
      
      if (this.pdfFiles.length === 0) {
        this.resetInterface();
      } else if (this.pdfFiles.length === 1) {
        this.reorderInstructions.classList.add("hidden");
      }
    }
  }

  createThumbnailElement(file, fileSize, index) {
    const thumbnail = document.createElement("div");
    const isListView = this.currentView === "list";
    const uniqueId = file._uniqueId;

    if (isListView) {
      thumbnail.className =
        "group relative bg-white dark:bg-zinc-900 rounded-md shadow-sm hover:shadow-lg transition-all duration-300 cursor-move flex flex-row items-center gap-3 p-3";
      thumbnail.dataset.fileId = uniqueId;
      thumbnail.innerHTML = `
        <div class="w-12 h-16 flex-shrink-0 bg-gray-100 dark:bg-zinc-800 rounded flex items-center justify-center overflow-hidden relative">
          <div id="thumbnail-loading-${uniqueId}" class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-zinc-800">
            <i class="fas fa-spinner fa-spin text-purple-600 text-xl"></i>
          </div>
          <img id="thumbnail-${uniqueId}" class="w-full h-full object-cover hidden" alt="Vista previa">
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1 overflow-hidden text-ellipsis whitespace-nowrap" title="${file.name}">${file.name}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">
            ${fileSize} • <span id="page-count-${uniqueId}">Cargando...</span>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <div class="order-badge w-7 h-7 bg-purple-600/90 text-white rounded-full flex items-center justify-center text-xs font-bold">${index + 1}</div>
          <button class="delete-btn w-7 h-7 bg-red-500 hover:bg-red-600 text-white border-0 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-110" title="Eliminar">
            <i class="fas fa-times text-xs"></i>
          </button>
        </div>
      `;
    } else {
      thumbnail.className =
        "group relative bg-white dark:bg-zinc-900 rounded-md shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-move flex flex-col items-center text-center h-full p-4";
      thumbnail.dataset.fileId = uniqueId;
      thumbnail.innerHTML = `
        <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 gap-2.5">
          <div class="order-badge w-8 h-8 bg-purple-600/90 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">${index + 1}</div>
          <button class="delete-btn w-8 h-8 bg-red-500 hover:bg-red-600 text-white border-0 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-md" title="Eliminar">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="w-full aspect-[3/4] bg-gray-100 dark:bg-zinc-800 rounded mb-3 flex items-center justify-center overflow-hidden relative shadow-inner">
          <div id="thumbnail-loading-${uniqueId}" class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-zinc-800">
            <i class="fas fa-spinner fa-spin text-purple-600 text-4xl"></i>
          </div>
          <img id="thumbnail-${uniqueId}" class="w-full h-full object-contain hidden" alt="Vista previa">
        </div>
        <div class="w-full mt-auto">
          <div class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1 overflow-hidden text-ellipsis whitespace-nowrap" title="${file.name}">${file.name}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">
            ${fileSize}
            <span class="ml-1" id="page-count-${uniqueId}">Cargando...</span>
          </div>
        </div>
      `;
    }

    return thumbnail;
  }

  initSortable() {
    if (this.sortableInstance) {
      this.sortableInstance.destroy();
    }

    this.sortableInstance = new window.Sortable(this.pdfPreview, {
      animation: 150,
      ghostClass: "opacity-50",
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;

        if (oldIndex !== newIndex) {
          const item = this.pdfFiles.splice(oldIndex, 1)[0];
          this.pdfFiles.splice(newIndex, 0, item);
          this.updateOrderNumbers();
        }
      },
    });
  }

  updateOrderNumbers() {
    const thumbnails = this.pdfPreview.querySelectorAll("[data-file-id]");
    thumbnails.forEach((thumbnail, index) => {
      const orderBadge = thumbnail.querySelector(".order-badge");
      if (orderBadge) {
        orderBadge.textContent = index + 1;
      }
    });
  }

  async loadPDFPreview(file, uniqueId) {
    try {
      const arrayBuffer = await this.readFileAsArrayBuffer(file);
      const bytes = new Uint8Array(arrayBuffer);
      
      // Usar LibPDF solo para obtener el conteo de páginas
      const pdf = await PDF.load(bytes);
      const pageCount = pdf.getPageCount();
      const pageCountText = `${pageCount} ${pageCount === 1 ? "página" : "páginas"}`;
      
      const pageCountElement = document.getElementById(`page-count-${uniqueId}`);
      if (pageCountElement) {
        pageCountElement.textContent = pageCountText;
      }

      // Usar PDF.js para generar la miniatura
      const thumbnailDataUrl = await this.renderPDFPageWithPDFJS(arrayBuffer);
      
      // Guardar en cache
      this.thumbnailCache.set(uniqueId, {
        thumbnail: thumbnailDataUrl,
        pageCountText: pageCountText
      });
      
      const thumbnailImg = document.getElementById(`thumbnail-${uniqueId}`);
      const loadingIndicator = document.getElementById(`thumbnail-loading-${uniqueId}`);
      
      if (thumbnailImg && loadingIndicator && thumbnailDataUrl) {
        thumbnailImg.src = thumbnailDataUrl;
        thumbnailImg.classList.remove("hidden");
        loadingIndicator.remove();
      } else if (loadingIndicator && !thumbnailDataUrl) {
        // Si falla el rendering, mostrar ícono
        loadingIndicator.innerHTML = '<i class="fas fa-file-pdf text-purple-600 text-2xl"></i>';
      }
    } catch (error) {
      console.error("Error al cargar vista previa del PDF:", error);
      
      const pageCountElement = document.getElementById(`page-count-${uniqueId}`);
      if (pageCountElement) {
        pageCountElement.textContent = "Error";
      }
      
      const loadingIndicator = document.getElementById(`thumbnail-loading-${uniqueId}`);
      if (loadingIndicator) {
        loadingIndicator.innerHTML = '<i class="fas fa-file-pdf text-purple-600 text-2xl"></i>';
      }
    }
  }

  async renderPDFPageWithPDFJS(arrayBuffer) {
    try {
      // Verificar si PDF.js está disponible
      if (typeof pdfjsLib === 'undefined') {
        console.warn('PDF.js no está disponible');
        return null;
      }

      // Cargar el PDF con PDF.js
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      
      // Obtener la primera página
      const page = await pdfDoc.getPage(1);
      
      // Crear canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      // Calcular escala para la miniatura
      const scale = 0.5;
      const viewport = page.getViewport({ scale });
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      // Renderizar la página
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      
      await page.render(renderContext).promise;
      
      // Convertir a data URL
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error al renderizar con PDF.js:', error);
      return null;
    }
  }

  updateFileCount() {
    const count = this.pdfFiles.length;
    this.fileCount.textContent =
      count === 1
        ? "1 archivo seleccionado"
        : `${count} archivos seleccionados`;
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

      // Preparar array de bytes de todos los PDFs
      const pdfBytesArray = [];

      for (let i = 0; i < this.pdfFiles.length; i++) {
        const file = this.pdfFiles[i];

        const progress = (i / this.pdfFiles.length) * 100;
        this.progressBarInner.style.width = `${progress}%`;
        this.processingMessage.textContent = `Procesando: ${file.name}`;

        const arrayBuffer = await this.readFileAsArrayBuffer(file);
        pdfBytesArray.push(new Uint8Array(arrayBuffer));
      }

      this.progressBarInner.style.width = "100%";
      this.processingMessage.textContent = "Combinando PDFs...";

      // Usar el método merge de LibPDF - combina múltiples PDFs en uno solo
      const mergedPdf = await PDF.merge(pdfBytesArray);

      // Guardar el PDF combinado
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
      window.ToastManager.showToast(
        `¡${this.pdfFiles.length} PDFs combinados exitosamente!`,
        "success",
      );
      this.mergeButton.disabled = false;
    } catch (error) {
      console.error("Error al combinar PDFs:", error);
      this.progressBar.classList.add("hidden");
      this.processingMessage.classList.add("hidden");
      window.ToastManager.showToast(
        "Error al combinar los PDFs. Intenta de nuevo.",
        "error",
      );
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

  showConfirmModal(title, message, onConfirm) {
    // Crear overlay
    const overlay = document.createElement("div");
    overlay.className =
      "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in";

    // Crear modal
    const modal = document.createElement("div");
    modal.className =
      "bg-white dark:bg-zinc-800 rounded-xl shadow-2xl max-w-md w-full transform scale-95 opacity-0 transition-all duration-200";

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
            Eliminar
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

  resetInterface() {
    this.pdfFiles = [];
    this.thumbnailCache.clear();
    this.fileInput.value = "";
    this.pdfPreview.innerHTML = "";
    this.updateFileCount();
    this.mergeButton.disabled = true;
    this.reorderInstructions.classList.add("hidden");
    this.controlSection.classList.add("hidden");
    this.controlSection.classList.remove("flex");
    this.sortControls.classList.add("hidden");
    this.sortControls.classList.remove("flex");
  }
}

// Initialize
window.pdfMerger = new PDFMerger();