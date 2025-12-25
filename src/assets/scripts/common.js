/**
 * Utilidades comunes para todas las páginas
 */

// Configuración global
const AppConfig = {
    animations: {
        duration: 300,
        easing: 'ease-out'
    },
    messages: {
        showDuration: 5000,
        successDuration: 3000
    }
};

// Utilidades para mensajes
class MessageHandler {
    static show(element, type = 'info', duration = AppConfig.messages.showDuration) {
        if (!element) {
            return;
        }
        
        element.classList.add('show');
        
        if (type === 'success') {
            duration = AppConfig.messages.successDuration;
        }
        
        setTimeout(() => {
            element.classList.remove('show');
        }, duration);
    }

    static showSuccess(message, customElement = null) {
        const element = customElement || document.getElementById('successMessage');
        if (element) {
            element.textContent = `✅ ${message}`;
            this.show(element, 'success');
        }
    }

    static showError(message, customElement = null) {
        const element = customElement || document.getElementById('errorMessage');
        if (element) {
            element.textContent = `❌ ${message}`;
            this.show(element, 'error');
        }
    }

    static showWarning(message, customElement = null) {
        const element = customElement || document.getElementById('warningMessage');
        if (element) {
            element.textContent = `⚠️ ${message}`;
            this.show(element, 'warning');
        }
    }
}

// Utilidades para archivos
class FileHandler {
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    static readFileAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject(new Error('Error al leer el archivo'));
            
            reader.readAsArrayBuffer(file);
        });
    }

    static downloadFile(content, filename, type = 'text/plain') {
        const blob = new Blob([content], { type: `${type}; charset=utf-8` });
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        window.URL.revokeObjectURL(url);
    }
}

// Utilidades para DOM
class DOMUtils {
    static setupDragAndDrop(uploadArea, fileInput, onFilesSelected, acceptedTypes = []) {
        if (!uploadArea || !fileInput) {
            console.error('uploadArea o fileInput no encontrado');
            return;
        }

        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');

            const files = Array.from(e.dataTransfer.files);
            this.handleFileSelection(files, onFilesSelected, acceptedTypes);
        });

        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            this.handleFileSelection(files, onFilesSelected, acceptedTypes);
        });
    }

    static handleFileSelection(files, callback, acceptedTypes = []) {
        if (acceptedTypes.length === 0) {
            callback(files);
            return;
        }

        const validFiles = files.filter(file => {
            return acceptedTypes.some(type => {
                if (type.startsWith('.')) {
                    return file.name.toLowerCase().endsWith(type.toLowerCase());
                }
                return file.type === type;
            });
        });

        if (validFiles.length === 0) {
            MessageHandler.showError(`Por favor, selecciona archivos válidos (${acceptedTypes.join(', ')})`);
            return;
        }

        callback(validFiles);
    }

    static copyToClipboard(text, button = null) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showCopySuccess(button);
            }).catch(err => {
                console.error('Error al copiar:', err);
                this.fallbackCopyToClipboard(text, button);
            });
        } else {
            this.fallbackCopyToClipboard(text, button);
        }
    }

    static fallbackCopyToClipboard(text, button) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            this.showCopySuccess(button);
        } catch (err) {
            console.error('Error al copiar (fallback):', err);
        }
        document.body.removeChild(textArea);
    }

    static showCopySuccess(button) {
        if (!button) return;

        const originalText = button.textContent;
        button.textContent = '✅ ¡Copiado!';
        button.style.background = 'var(--success-color)';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }
}

// Clase base para componentes de página
class PageComponent {
    constructor() {
        this.elements = {};
        this.init();
    }

    init() {
        this.bindElements();
        this.attachEvents();
    }

    bindElements() {
        // Override en clases hijas
    }

    attachEvents() {
        // Override en clases hijas
    }

    resetInterface() {
        // Override en clases hijas
    }
}

// Función para purgar caché
function clearCache() {
    try {
        // Limpiar localStorage
        localStorage.clear();
        
        // Limpiar sessionStorage
        sessionStorage.clear();
        
        // Limpiar caché del navegador (si es compatible)
        if ('caches' in window) {
            caches.keys().then(function(names) {
                for (let name of names) {
                    caches.delete(name);
                }
            });
        }
        
        // Mostrar mensaje de confirmación
        showCacheMessage('✅ Caché purgado exitosamente', 'success');
        
        // Opcional: recargar la página después de un delay
        setTimeout(() => {
            window.location.reload(true);
        }, 1500);
        
    } catch (error) {
        console.error('Error al purgar caché:', error);
        showCacheMessage('❌ Error al purgar caché', 'error');
    }
}

// Función para mostrar mensajes
function showCacheMessage(message, type) {
    // Crear elemento del mensaje
    const messageEl = document.createElement('div');
    messageEl.className = `cache-message cache-message-${type}`;
    messageEl.textContent = message;
    
    // Estilos del mensaje
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #27ae60, #2ecc71);' : 'background: linear-gradient(135deg, #e74c3c, #c0392b);'}
    `;
    
    // Agregar al body
    document.body.appendChild(messageEl);
    
    // Animación de entrada
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}
// Sistema de Toast Notifications
const ToastManager = {
  showToast(message, type = 'success') {
  // Crear contenedor de toasts si no existe
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed top-4 right-4 z-50 flex flex-col gap-2';
    document.body.appendChild(toastContainer);
  }

  // Crear el toast
  const toast = document.createElement('div');
  toast.className = `
    flex items-center gap-3 min-w-80 max-w-md p-4 rounded-lg shadow-lg
    transform translate-x-full transition-transform duration-300 ease-out
    ${type === 'success' 
      ? 'bg-green-50 dark:bg-green-900/90 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200' 
      : 'bg-red-50 dark:bg-red-900/90 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
    }
  `;

  // Icono según el tipo
  const icon = type === 'success' 
    ? '<svg class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>'
    : '<svg class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>';

  toast.innerHTML = `
    ${icon}
    <span class="flex-1 font-medium">${message}</span>
    <button class="toast-close text-current hover:opacity-70 transition-opacity">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
      </svg>
    </button>
  `;

  toastContainer.appendChild(toast);

  // Animación de entrada
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 10);

  // Cerrar al hacer clic en X
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => ToastManager.removeToast(toast));

  // Auto cerrar después de 5 segundos
  setTimeout(() => ToastManager.removeToast(toast), 5000);
  },

  removeToast(toast) {
  toast.style.transform = 'translateX(150%)';
  setTimeout(() => {
    toast.remove();
    // Eliminar contenedor si no hay más toasts
    const container = document.getElementById('toast-container');
    if (container && container.children.length === 0) {
      container.remove();
    }
  }, 300);
}};

// Ejemplo de uso en tu código existente:
// Cuando se complete la conversión exitosamente:
// showToast('¡Archivo convertido exitosamente!', 'success');

// Cuando haya un error:
// showToast('Error al procesar el archivo', 'error');

// Event listener para el botón de purgar caché
document.addEventListener('DOMContentLoaded', function() {
    const clearCacheBtn = document.getElementById('clearCacheBtn');
    
    if (clearCacheBtn) {
        clearCacheBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Confirmación antes de purgar
            if (confirm('¿Estás seguro de que deseas purgar toda la caché? Esto puede afectar el rendimiento temporalmente.')) {
                clearCache();
            }
        });
    }
});



// Exportar para uso global
window.AppConfig = AppConfig;
window.MessageHandler = MessageHandler;
window.FileHandler = FileHandler;
window.DOMUtils = DOMUtils;
window.PageComponent = PageComponent;
window.ToastManager = ToastManager;
