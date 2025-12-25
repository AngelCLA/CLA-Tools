// Verificar dependencias
if (typeof mammoth === 'undefined') {
    console.error('Mammoth.js no está cargado');
}

class DocxToGiftConverter {
    constructor() {
        this.processedContent = '';
        this.fileName = '';
        this.debugInfo = '';
        this.elements = {};
        this.highlightedTexts = new Set(); // Almacenar textos con highlighting
        
        // Inicializar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        // console.log('Inicializando converter');
        this.bindElements();
        this.attachEvents();
    }

    bindElements() {
        // console.log('Vinculando elementos del DOM');
        this.elements = {
            uploadArea: document.getElementById('upload-area'),
            fileInput: document.getElementById('file-input'),
            outputArea: document.getElementById('output-area'),
            giftOutput: document.getElementById('gift-output'),
            loading: document.getElementById('loading'),
            fileInfo: document.getElementById('file-info'),
            fileName: document.getElementById('file-name'),
            removeFile: document.getElementById('remove-file'),
            debugArea: document.getElementById('debugArea'),
            debugContent: document.getElementById('debugContent'),
            previewSection: document.getElementById('preview-section'),
            questionsPreview: document.getElementById('questions-preview'),
            questionCount: document.getElementById('question-count'),
            answerCount: document.getElementById('answer-count'),
            correctCount: document.getElementById('correct-count'),
            successMessage: document.getElementById('success-message'),
            errorMessage: document.getElementById('error-message'),
            copyBtn: document.getElementById('copy-btn'),
            downloadBtn: document.getElementById('download-btn')
        };

        // Verificar que los elementos existan
        Object.keys(this.elements).forEach(key => {
            if (!this.elements[key]) {
                console.warn(`Elemento ${key} no encontrado`);
            }
        });
    }

    attachEvents() {
        // console.log('Adjuntando eventos');
        
        // Setup drag and drop
        if (this.elements.uploadArea && this.elements.fileInput) {
            DOMUtils.setupDragAndDrop(
                this.elements.uploadArea,
                this.elements.fileInput,
                (files) => this.handleFiles(files),
                ['.docx']
            );
        }

        // Remove file event
        if (this.elements.removeFile) {
            this.elements.removeFile.addEventListener('click', () => {
                this.resetInterface();
            });
        }

        // Copy button event
        this.elements.copyBtn.addEventListener('click', () => {
            if (this.elements.giftOutput && this.elements.giftOutput.value) {
                DOMUtils.copyToClipboard(this.elements.giftOutput.value, this.elements.copyBtn);
                ToastManager.showToast('¡Copiado al portapapeles!', 'success'); // ⬅️ AGREGAR ESTO
            } else {
                ToastManager.showToast('No hay contenido para copiar', 'error');
            }
        });

        // Download button event
        if (this.elements.downloadBtn) {
            this.elements.downloadBtn.addEventListener('click', () => {
                if (!this.processedContent) {
                    MessageHandler.showError('No hay contenido para descargar');
                    return;
                }

                FileHandler.downloadFile(
                    this.processedContent,
                    `${this.fileName || 'preguntas'}.gift`,
                    'text/plain'
                );
            });
        }
    }

    handleFiles(files) {
        // console.log('Manejando archivos:', files);
        if (files.length === 0) return;
        
        const file = files[0];
        if (!file.name.toLowerCase().endsWith('.docx')) {
            ToastManager.showToast('Por favor, selecciona un archivo DOCX', 'error');
            return;
        }

        this.processFile(file);
    }

    async processFile(file) {
        // console.log('Procesando archivo:', file.name);
        
        this.fileName = file.name.replace('.docx', '');
        
        if (this.elements.fileName) {
            this.elements.fileName.textContent = file.name;
        }
        
        if (this.elements.fileInfo) {
            this.elements.fileInfo.classList.remove('hidden');
        }

        this.showLoading(true);
        this.hideMessages();

        try {
            const arrayBuffer = await FileHandler.readFileAsArrayBuffer(file);
            
            // Extraer highlighting del XML del DOCX
            await this.extractHighlightedTexts(arrayBuffer);
            
            const options = {
                styleMap: [
                    "p[style-name='Heading 1'] => h1:fresh",
                    "p[style-name='Heading 2'] => h2:fresh",
                    "u => u",
                    // Capturar runs con highlight (resaltado) de Word
                    "r[style-name='Highlight'] => span.highlight",
                    // Alternativas para capturar highlight
                    "r:highlight => span:css(background-color: yellow)",
                ]
            };

            const result = await mammoth.convertToHtml({ arrayBuffer }, options);
            const html = result.value;
            const messages = result.messages;


            this.debugInfo = "=== MAMMOTH MESSAGES ===\n";
            messages.forEach(msg => {
                this.debugInfo += `${msg.type}: ${msg.message}\n`;
            });
            this.debugInfo += "\n=== HTML GENERADO ===\n";
            this.debugInfo += html.substring(0, 1000) + (html.length > 1000 ? "...\n" : "\n");

            this.processDocument(html);
        } catch (error) {
            console.error('Error procesando archivo:', error);
            this.showLoading(false);
            ToastManager.showToast('Error al leer el archivo: ' + error.message, 'error');
        }
    }

    async extractHighlightedTexts(arrayBuffer) {
        try {
            if (typeof JSZip === 'undefined') {
                console.warn('JSZip no está disponible, saltando extracción de highlighting');
                return;
            }

            const zip = await JSZip.loadAsync(arrayBuffer);
            const docXml = await zip.file('word/document.xml').async('string');
            
            // Regex correcta: Buscar <w:r> que contenga <w:highlight w:val="yellow"/> y extraer el texto
            const highlightPattern = /<w:r[^>]*>[\s\S]*?<w:highlight\s+w:val="yellow"[\s\S]*?<w:t[^>]*>([^<]+)<\/w:t>[\s\S]*?<\/w:r>/gi;
            
            let match;
            while ((match = highlightPattern.exec(docXml)) !== null) {
                const text = match[1]?.trim();
                if (text) {
                    this.highlightedTexts.add(text);
                }
            }
        } catch (error) {
            console.warn('Error extrayendo highlighting del DOCX:', error);
        }
    }

    processDocument(html) {
        try {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            const documentStructure = this.extractDocumentStructure(tempDiv);
            
            const giftContent = this.generateGiftFormat(documentStructure);

            this.processedContent = giftContent;
            this.updateStatistics(documentStructure);
            this.generatePreview(documentStructure);

            this.showResults(giftContent);
            ToastManager.showToast(`¡Conversión exitosa! ${documentStructure.length} preguntas procesadas`, 'success');

        } catch (error) {
            console.error('Error procesando documento:', error);
            this.debugInfo += `\nERROR: ${error.message}\n${error.stack}\n`;
            
            if (this.elements.debugContent) {
                this.elements.debugContent.textContent = this.debugInfo;
            }
            if (this.elements.debugArea) {
                this.elements.debugArea.classList.add('show');
            }
            
            this.showLoading(false);
            ToastManager.showToast('Error al procesar el documento', 'error');
        }
    }

    extractDocumentStructure(htmlElement) {
        const structure = [];
        const paragraphs = htmlElement.querySelectorAll('p');
        
        let currentQuestion = null;
        let currentAnswers = [];

        paragraphs.forEach((p, index) => {
            const text = p.textContent.trim();
            if (!text) return;

            this.debugInfo += `\nPárrafo ${index}: "${text.substring(0, 50)}..."\n`;

            const boldElements = p.querySelectorAll('strong, b');
            const hasStrongContent = boldElements.length > 0 &&
                Array.from(boldElements).some(b => b.textContent.trim().length > 5);

            if (hasStrongContent) {
                if (currentQuestion && currentAnswers.length > 0) {
                    structure.push({
                        question: currentQuestion,
                        answers: currentAnswers
                    });
                }

                currentQuestion = text;
                currentAnswers = [];
                this.debugInfo += `  → PREGUNTA DETECTADA\n`;

            } else if (text && currentQuestion && text.length > 1) {
                const isCorrect = this.isAnswerCorrect(p, text);
                
                this.debugInfo += `  HTML de la respuesta: ${p.outerHTML.substring(0, 200)}\n`;
                
                currentAnswers.push({
                    text: text,
                    isCorrect: isCorrect
                });
            }
        });

        if (currentQuestion && currentAnswers.length > 0) {
            structure.push({
                question: currentQuestion,
                answers: currentAnswers
            });
        }

        // Validar respuestas correctas
        structure.forEach((item, index) => {
            const correctAnswers = item.answers.filter(a => a.isCorrect);
            if (correctAnswers.length === 0 && item.answers.length > 0) {
                item.answers[0].isCorrect = true;
                this.debugInfo += `\nADVERTENCIA: Pregunta ${index + 1} no tenía respuesta correcta. Se marcó la primera.\n`;
            }
        });

        return structure;
    }

    isAnswerCorrect(paragraph, text) {
        // 1. Verificar si está en los textos con highlighting del XML
        if (this.highlightedTexts.has(text.trim())) {
            this.debugInfo += `  → RESPUESTA CORRECTA (highlighting del XML): "${text}"\n`;
            return true;
        }

        // 2. Verificar elementos subrayados
        const underlineElements = paragraph.querySelectorAll('u');
        if (underlineElements.length > 0) {
            for (const u of underlineElements) {
                const underlineText = u.textContent.trim();
                if (underlineText === text || text.includes(underlineText)) {
                    this.debugInfo += `  → RESPUESTA CORRECTA (subrayada): "${text}"\n`;
                    return true;
                }
            }
        }

        // 3. Verificar elementos con resaltado (span.highlight)
        const highlightElements = paragraph.querySelectorAll('span.highlight');
        if (highlightElements.length > 0) {
            for (const span of highlightElements) {
                const highlightText = span.textContent.trim();
                if (highlightText === text || text.includes(highlightText)) {
                    this.debugInfo += `  → RESPUESTA CORRECTA (resaltada span.highlight): "${text}"\n`;
                    return true;
                }
            }
        }

        // 4. Verificar estilo de subrayado
        const style = paragraph.getAttribute('style') || '';
        if (style.includes('text-decoration') && style.includes('underline')) {
            this.debugInfo += `  → RESPUESTA CORRECTA (estilo): "${text}"\n`;
            return true;
        }

        // 5. Verificar spans con subrayado
        const spans = paragraph.querySelectorAll('span');
        for (const span of spans) {
            const spanStyle = span.getAttribute('style') || '';
            if (spanStyle.includes('text-decoration') && spanStyle.includes('underline')) {
                if (span.textContent.trim() === text || text.includes(span.textContent.trim())) {
                    this.debugInfo += `  → RESPUESTA CORRECTA (span): "${text}"\n`;
                    return true;
                }
            }
        }

        // 6. Verificar resaltado (background-color) típico de Word
        // Caso 1: el párrafo o sus hijos tienen background-color indicando resaltado
        const hasParagraphHighlight = /background(-color)?:\s*(yellow|#[0-9a-fA-F]{3,6}|rgb\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\))/i.test(style);
        if (hasParagraphHighlight) {
            this.debugInfo += `  → RESPUESTA CORRECTA (resaltado en párrafo): "${text}"\n`;
            return true;
        }

        // 7. Verificar spans con background-color (resaltado amarillo/highlight)
        for (const span of spans) {
            const spanStyle = span.getAttribute('style') || '';
            // Detectar background-color en cualquier variante
            if (spanStyle.toLowerCase().includes('background-color') || spanStyle.toLowerCase().includes('background')) {
                const spanText = span.textContent.trim();
                if (spanText && (spanText === text || text.includes(spanText))) {
                    this.debugInfo += `  → RESPUESTA CORRECTA (span background-color): "${text}"\n`;
                    return true;
                }
            }
        }

        this.debugInfo += `  → respuesta incorrecta: "${text}"\n`;
        return false;
    }

    generateGiftFormat(structure) {
        let giftContent = '';

        structure.forEach(item => {
            const cleanQuestion = this.escapeGiftCharacters(item.question.replace(/\*\*/g, '').trim());
            
            giftContent += `${cleanQuestion} {\n`;

            item.answers.forEach(answer => {
                const prefix = answer.isCorrect ? '=' : '~';
                const cleanAnswer = this.escapeGiftCharacters(answer.text);
                giftContent += `  ${prefix}${cleanAnswer}\n`;
            });

            giftContent += '}\n\n';
        });

        return giftContent;
    }

    escapeGiftCharacters(text) {
        return text
            .replace(/~/g, '\\~')
            .replace(/=/g, '\\=')
            .replace(/:/g, '\\:')
            .replace(/{/g, '\\{')
            .replace(/}/g, '\\}');
    }

    generatePreview(structure) {
        if (!this.elements.questionsPreview) return;

        let previewHTML = '';

        structure.forEach((item, index) => {
            previewHTML += `
                <div class="bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700 mb-3 mx-6">
                    <div class="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">${index + 1}. ${item.question}</div>
                    ${item.answers.map(answer => `
                        <div class="flex items-start gap-2 py-1 text-sm ${answer.isCorrect ? 'text-green-700 dark:text-green-400 font-medium' : 'text-zinc-600 dark:text-zinc-400'}">
                            <span class="mt-0.5">${answer.isCorrect ? '✓' : '○'}</span>
                            <span>${answer.text}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        });

        this.elements.questionsPreview.innerHTML = previewHTML;
    }

    updateStatistics(structure) {
        const questionCount = structure.length;
        let totalAnswers = 0;
        let correctAnswers = 0;

        structure.forEach(item => {
            totalAnswers += item.answers.length;
            correctAnswers += item.answers.filter(a => a.isCorrect).length;
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
            this.elements.outputArea.classList.remove('hidden');
        }
        if (this.elements.previewSection) {
            this.elements.previewSection.classList.remove('hidden');
        }
    }

    showLoading(show) {
        if (show) {
            if (this.elements.loading) {
                this.elements.loading.classList.remove('hidden');
            }
            if (this.elements.outputArea) {
                this.elements.outputArea.classList.add('hidden');
            }
        } else {
            if (this.elements.loading) {
                this.elements.loading.classList.add('hidden');
            }
        }
    }

    hideMessages() {
        if (this.elements.successMessage) {
            this.elements.successMessage.classList.add('hidden');
        }
        if (this.elements.errorMessage) {
            this.elements.errorMessage.classList.add('hidden');
        }
    }

    resetInterface() {
        if (this.elements.fileInput) {
            this.elements.fileInput.value = '';
        }
        if (this.elements.fileInfo) {
            this.elements.fileInfo.classList.add('hidden');
        }
        if (this.elements.outputArea) {
            this.elements.outputArea.classList.add('hidden');
        }
        this.hideMessages();
        if (this.elements.previewSection) {
            this.elements.previewSection.classList.add('hidden');
        }
        if (this.elements.giftOutput) {
            this.elements.giftOutput.value = '';
        }
        this.processedContent = '';
        this.fileName = '';
        this.debugInfo = '';
        this.highlightedTexts = new Set(); // Reset highlighting
    }
    
}

// Inicializar converter
window.docxConverter = new DocxToGiftConverter();