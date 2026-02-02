let pdfDoc = null;
let totalPages = 0;
let currentLeafIndex = 0;
let leaves = [];
let pageMapping = [];
let currentPdfFile = null; // Guardar referencia al archivo cargado

const bookContainer = document.getElementById("book-container");
const fileInput = document.getElementById("file-selector");

if (fileInput) {
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      currentPdfFile = file; // Guardar el archivo
      loadPDF(file);
    }
  });
}

// Cargar PDF desde URL si existe parámetro
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pdfUrl = urlParams.get("pdf");
  if (pdfUrl) {
    loadPDFFromUrl(pdfUrl);
  }
});

async function loadPDFFromUrl(url) {
  const loadingMsg = document.getElementById("loading-msg");
  if (loadingMsg) {
    loadingMsg.style.display = "block";
    loadingMsg.textContent = "DESCARGANDO PDF...";
  }

  try {
    pdfDoc = await pdfjsLib.getDocument(url).promise;
    totalPages = pdfDoc.numPages;
    document.getElementById("setup-view")?.classList.add("hidden");
    document.getElementById("reader-view")?.classList.remove("hidden");
    createBook();
  } catch (error) {
    console.error("Error cargando PDF desde URL:", error);
    alert("No se pudo cargar el PDF desde la URL proporcionada. Asegúrate de que el archivo sea accesible y permita CORS.");
  } finally {
    if (loadingMsg) loadingMsg.style.display = "none";
  }
}

const dropArea = document.getElementById("drop-area");
if (dropArea && fileInput) {
  dropArea.addEventListener("click", () => fileInput.click());
}

const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

if (btnPrev) {
  btnPrev.addEventListener("click", (e) => {
    e.preventDefault();
    prevPage();
  });
}

if (btnNext) {
  btnNext.addEventListener("click", (e) => {
    e.preventDefault();
    nextPage();
  });
}

// Lógica mejorada de Iframe / Embed con upload
const btnEmbed = document.getElementById("btn-embed");
const embedModal = document.getElementById("embed-modal");
const closeEmbedModal = document.getElementById("close-embed-modal");
const embedPdfUrlInput = document.getElementById("embed-pdf-url");
const embedIframeCode = document.getElementById("embed-iframe-code");
const copyEmbedCode = document.getElementById("copy-embed-code");
const uploadPdfBtn = document.getElementById("upload-pdf-btn");
const uploadStatus = document.getElementById("upload-status");

if (btnEmbed && embedModal) {
  btnEmbed.addEventListener("click", () => {
    const currentUrl = new URL(window.location.href);
    const pdfUrl = currentUrl.searchParams.get("pdf") || "";
    
    if (embedPdfUrlInput) {
      embedPdfUrlInput.value = pdfUrl;
      updateIframeCode();
    }
    
    // Mostrar/ocultar botón de upload según si hay archivo local
    if (uploadPdfBtn) {
      uploadPdfBtn.style.display = currentPdfFile && !pdfUrl ? "flex" : "none";
    }
    
    embedModal.classList.remove("hidden");
    embedModal.classList.add("flex");
  });
}

if (closeEmbedModal && embedModal) {
  closeEmbedModal.addEventListener("click", () => {
    embedModal.classList.add("hidden");
    embedModal.classList.remove("flex");
  });
}

if (embedPdfUrlInput) {
  embedPdfUrlInput.addEventListener("input", updateIframeCode);
}

// Función para subir PDF al servidor
if (uploadPdfBtn) {
  uploadPdfBtn.addEventListener("click", async () => {
    if (!currentPdfFile) {
      alert("No hay archivo para subir");
      return;
    }

    uploadPdfBtn.disabled = true;
    uploadPdfBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subiendo...';
    
    if (uploadStatus) {
      uploadStatus.textContent = "Subiendo archivo al servidor...";
      uploadStatus.className = "text-sm text-blue-500 mt-2";
    }

    try {
      // Convertir archivo a base64
      const base64 = await fileToBase64(currentPdfFile);
      
      // Subir al servidor
      const response = await fetch("/api/upload-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: currentPdfFile.name,
          file: base64,
        }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        if (embedPdfUrlInput) {
          embedPdfUrlInput.value = data.url;
          updateIframeCode();
        }
        
        if (uploadStatus) {
          uploadStatus.textContent = "✓ Archivo subido exitosamente";
          uploadStatus.className = "text-sm text-green-500 mt-2 font-semibold";
        }
        
        uploadPdfBtn.style.display = "none";
      } else {
        console.error("Server error details:", data);
        throw new Error(data.error || "Error al subir el archivo");
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      
      if (uploadStatus) {
        uploadStatus.textContent = "✗ Error al subir. Intenta con un servicio externo.";
        uploadStatus.className = "text-sm text-red-500 mt-2";
      }
      
      alert("Error al subir el PDF: " + error.message);
    } finally {
      uploadPdfBtn.disabled = false;
      uploadPdfBtn.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Subir PDF al Servidor';
    }
  });
}

// Función auxiliar para convertir archivo a base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function updateIframeCode() {
  if (!embedPdfUrlInput || !embedIframeCode) return;
  const pdfUrl = embedPdfUrlInput.value.trim();
  const baseUrl = window.location.origin + window.location.pathname;
  const finalUrl = pdfUrl ? `${baseUrl}?pdf=${encodeURIComponent(pdfUrl)}` : baseUrl;
  
  embedIframeCode.value = `<iframe src="${finalUrl}" width="100%" height="600px" frameborder="0" allowfullscreen></iframe>`;
}

if (copyEmbedCode && embedIframeCode) {
  copyEmbedCode.addEventListener("click", () => {
    embedIframeCode.select();
    document.execCommand("copy");
    
    const originalText = copyEmbedCode.innerHTML;
    copyEmbedCode.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
    copyEmbedCode.classList.replace("bg-purple-600", "bg-green-600");
    
    setTimeout(() => {
      copyEmbedCode.innerHTML = originalText;
      copyEmbedCode.classList.replace("bg-green-600", "bg-purple-600");
    }, 2000);
  });
}

async function loadPDF(file) {
  const reader = new FileReader();
  reader.onload = async function () {
    const data = new Uint8Array(this.result);
    pdfDoc = await pdfjsLib.getDocument(data).promise;
    totalPages = pdfDoc.numPages;
    document.getElementById("setup-view")?.classList.add("hidden");
    document.getElementById("reader-view")?.classList.remove("hidden");
    createBook();
  };
  reader.readAsArrayBuffer(file);
}

async function renderToCanvas(pageNum) {
  if (pageNum === null || pageNum < 1 || pageNum > totalPages) return null;
  const page = await pdfDoc.getPage(pageNum);
  const viewport = page.getViewport({ scale: 1.8 });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  await page.render({ canvasContext: context, viewport: viewport }).promise;
  return canvas;
}

function createBook() {
  const loadingMsg = document.getElementById("loading-msg");
  if (loadingMsg) loadingMsg.style.display = "block";

  if (bookContainer) {
    bookContainer.querySelectorAll(".leaf").forEach((l) => l.remove());
  }
  leaves = [];
  pageMapping = [];

  const numLeaves = Math.ceil(totalPages / 2);
  const totalSlots = numLeaves * 2;

  for (let i = 1; i <= totalSlots; i++) {
    if (i === 1) {
      pageMapping.push(1);
    } else if (i === totalSlots) {
      pageMapping.push(totalPages);
    } else {
      if (i < totalPages) {
        pageMapping.push(i);
      } else {
        pageMapping.push(null);
      }
    }
  }

  for (let i = 0; i < numLeaves; i++) {
    const leaf = document.createElement("div");
    leaf.className = "leaf";

    if (i === 0) leaf.classList.add("is-cover-front");
    if (i === numLeaves - 1) leaf.classList.add("is-cover-back");

    leaf.style.zIndex = (numLeaves - i).toString();

    const front = document.createElement("div");
    front.className = "page-front";
    const back = document.createElement("div");
    back.className = "page-back";
    const shadow = document.createElement("div");
    shadow.className = "page-shadow";

    leaf.appendChild(front);
    leaf.appendChild(back);
    leaf.appendChild(shadow);
    if (bookContainer) bookContainer.appendChild(leaf);
    leaves.push(leaf);

    const pFront = pageMapping[i * 2];
    const pBack = pageMapping[i * 2 + 1];

    if (pFront)
      renderToCanvas(pFront).then((cv) => cv && front.appendChild(cv));
    if (pBack) renderToCanvas(pBack).then((cv) => cv && back.appendChild(cv));
  }

  if (loadingMsg) loadingMsg.style.display = "none";
  updateUI();
}

function nextPage() {
  if (currentLeafIndex < leaves.length) {
    const leaf = leaves[currentLeafIndex];
    leaf.classList.add("flipping");
    leaf.classList.add("flipped");
    setTimeout(() => {
      leaf.style.zIndex = (currentLeafIndex + 1).toString();
      leaf.classList.remove("flipping");
    }, 400);
    currentLeafIndex++;
    updateUI();
  }
}

function prevPage() {
  if (currentLeafIndex > 0) {
    currentLeafIndex--;
    const leaf = leaves[currentLeafIndex];
    leaf.classList.add("flipping");
    leaf.classList.remove("flipped");
    setTimeout(() => {
      leaf.style.zIndex = (leaves.length - currentLeafIndex).toString();
      leaf.classList.remove("flipping");
    }, 400);
    updateUI();
  }
}

function updateUI() {
  const labelMain = document.getElementById("page-current");
  const labelRange = document.getElementById("page-range");
  const progressBar = document.getElementById("progress-bar");

  if (!labelMain || !labelRange || !progressBar) return;

  let status = "";
  let rangeText = "";

  if (currentLeafIndex === 0) {
    status = "Portada";
    rangeText = "Página 1";
  } else if (currentLeafIndex === leaves.length) {
    status = "Contraportada";
    rangeText = `Página ${totalPages}`;
  } else {
    status = "Contenido";
    const pLeft = pageMapping[currentLeafIndex * 2 - 1];
    const pRight = pageMapping[currentLeafIndex * 2];

    if (pLeft && pRight) rangeText = `Págs. ${pLeft} - ${pRight}`;
    else if (pLeft) rangeText = `Página ${pLeft}`;
    else if (pRight) rangeText = `Página ${pRight}`;
  }

  labelMain.textContent = status;
  labelRange.textContent = `${rangeText} de ${totalPages}`;

  const percent = (currentLeafIndex / leaves.length) * 100;
  progressBar.style.width = `${percent}%`;
}

window.nextPage = nextPage;
window.prevPage = prevPage;

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " ") nextPage();
  if (e.key === "ArrowLeft") prevPage();
});