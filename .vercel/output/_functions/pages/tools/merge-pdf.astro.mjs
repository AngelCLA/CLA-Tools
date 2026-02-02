/* empty css                                    */
import { f as createComponent, r as renderTemplate, n as renderScript, k as defineScriptVars, l as renderComponent, m as maybeRenderHead } from '../../chunks/astro/server_DcdLrLOT.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_Bv_ucnQL.mjs';
import { $ as $$FloatingVideoTutorial } from '../../chunks/FloatingVideoTutorial_DHUSgvCU.mjs';
import { c as commonScript } from '../../chunks/common_DyhdMKhS.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$MergePdf = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", " <!-- Cargar common.js primero (inline porque usa eval) --> <script>(function(){", '\n  eval(commonScript);\n})();<\/script> <!-- PDF.js para renderizar miniaturas --> <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"><\/script> <script>\n  // Configurar PDF.js worker\n  if (typeof pdfjsLib !== "undefined") {\n    pdfjsLib.GlobalWorkerOptions.workerSrc =\n      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";\n  }\n<\/script> <!-- Sortable.js (librer\xEDa externa) --> <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"><\/script> <!-- Merge PDF Script como m\xF3dulo ES6 --> ', ""])), renderComponent($$result, "Layout", $$Layout, { "title": "Unir PDFs | CLA Tools", "description": "Combina m\xFAltiples archivos PDF en un solo documento de forma r\xE1pida, gratuita y sin subir archivos a servidores externos.", "keywords": "unir pdf, combinar pdf, fusionar pdf, merge pdf, juntar pdf, herramienta pdf gratuita", "data-astro-cid-4tjyiqhv": true }, { "default": ($$result2) => renderTemplate`     ${maybeRenderHead()}<div class="flex flex-col min-h-full items-center justify-center py-8 px-4" data-astro-cid-4tjyiqhv> <div class="w-full max-w-6xl shadow-2xl rounded-xl p-6 sm:p-8 md:p-12" data-astro-cid-4tjyiqhv> <!-- Header --> <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4 text-center" data-astro-cid-4tjyiqhv>
Unir archivos PDF en un solo documento
</h1> <p class="mb-6 text-base sm:text-lg md:text-xl text-gradient text-center" data-astro-cid-4tjyiqhv>
Ordena, previsualiza y combina tus PDFs directamente desde el navegador.
</p> <!-- Upload Area --> <div id="upload-area" class="border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg p-8 sm:p-12 text-center mb-6 cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-all hover:bg-purple-50 dark:hover:bg-purple-900/10" data-astro-cid-4tjyiqhv> <div class="text-5xl sm:text-6xl mb-4" data-astro-cid-4tjyiqhv> <i class="fas fa-file-pdf text-purple-600 dark:text-purple-400" data-astro-cid-4tjyiqhv></i> </div> <div class="text-lg sm:text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2" data-astro-cid-4tjyiqhv>
Arrastra tus archivos PDF aquí
</div> <div class="text-sm sm:text-base text-zinc-500 dark:text-zinc-400" data-astro-cid-4tjyiqhv>
o haz clic para seleccionar
</div> <input type="file" id="file-input" accept=".pdf" multiple class="hidden" data-astro-cid-4tjyiqhv> </div> <!-- Reorder Instructions --> <div id="reorder-instructions" class="hidden bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6 text-sm sm:text-base text-blue-800 dark:text-blue-300" data-astro-cid-4tjyiqhv> <i class="fas fa-info-circle" data-astro-cid-4tjyiqhv></i> Puedes arrastrar los archivos para definir
        el orden final del PDF combinado.
</div> <!-- Control Section --> <div id="control-section" class="hidden flex-col sm:flex-row justify-between items-center gap-4 mb-6" data-astro-cid-4tjyiqhv> <div id="file-count" class="text-base sm:text-lg font-semibold text-zinc-700 dark:text-zinc-300" data-astro-cid-4tjyiqhv>
0 archivos cargados
</div> <div class="flex gap-3 w-full sm:w-auto" data-astro-cid-4tjyiqhv> <button id="clear-all-btn" class="flex-1 sm:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition cursor-pointer" data-astro-cid-4tjyiqhv> <i class="fas fa-trash-alt" data-astro-cid-4tjyiqhv></i> Eliminar todos
</button> <button id="add-more-btn" class="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition cursor-pointer" data-astro-cid-4tjyiqhv> <i class="fas fa-plus" data-astro-cid-4tjyiqhv></i> Añadir más
</button> </div> </div> <!-- View Controls --> <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6" data-astro-cid-4tjyiqhv> <!-- Botones de vista --> <div class="flex gap-2" data-astro-cid-4tjyiqhv> <button class="view-button px-4 py-2 border-2 rounded-lg transition-all duration-200 cursor-pointer font-medium" data-view="list" data-astro-cid-4tjyiqhv> <i class="fas fa-list" data-astro-cid-4tjyiqhv></i> Lista
</button> <button class="view-button active px-4 py-2 border-2 rounded-lg transition-all duration-200 cursor-pointer font-medium" data-view="grid" data-astro-cid-4tjyiqhv> <i class="fas fa-th" data-astro-cid-4tjyiqhv></i> Cuadrícula
</button> </div> <!-- Botones de ordenamiento --> <div id="sort-controls" class="hidden flex gap-2" data-astro-cid-4tjyiqhv> <button id="sort-name-btn" class="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg transition cursor-pointer flex items-center gap-2" title="Ordenar por nombre" data-astro-cid-4tjyiqhv> <i class="fas fa-sort-alpha-down" data-astro-cid-4tjyiqhv></i> <span class="hidden sm:inline" data-astro-cid-4tjyiqhv>Ordenar por nombre</span> </button> <button id="sort-date-btn" class="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg transition cursor-pointer flex items-center gap-2" title="Ordenar por fecha de modificación" data-astro-cid-4tjyiqhv> <i class="fas fa-calendar-alt" data-astro-cid-4tjyiqhv></i> <span class="hidden sm:inline" data-astro-cid-4tjyiqhv>Por fecha</span> </button> </div> </div> <!-- PDF Preview --> <div id="pdf-preview" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6" data-astro-cid-4tjyiqhv></div> <!-- Progress Bar --> <div id="progress-bar" class="hidden w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden mb-4" data-astro-cid-4tjyiqhv> <div id="progress-bar-inner" class="h-full bg-purple-600 transition-all duration-300" style="width: 0%" data-astro-cid-4tjyiqhv></div> </div> <!-- Processing Message --> <div id="processing-message" class="hidden text-center text-zinc-700 dark:text-zinc-300 mb-6" data-astro-cid-4tjyiqhv>
Combinando archivos PDF…
</div> <!-- Actions --> <div class="flex justify-center" data-astro-cid-4tjyiqhv> <button id="merge-button" disabled class="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" data-astro-cid-4tjyiqhv> <i class="fas fa-object-group" data-astro-cid-4tjyiqhv></i> Unir PDFs
</button> </div> </div> </div>  <div id="success-message" class="hidden fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold animate-fade-in z-50" data-astro-cid-4tjyiqhv>
✅ Listo. Tu PDF combinado está preparado para descargar.
</div>  <div id="error-message" class="hidden fixed bottom-8 right-8 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold animate-fade-in z-50" data-astro-cid-4tjyiqhv>
❌ Error al procesar los archivos PDF.
</div> ${renderComponent($$result2, "FloatingVideoTutorial", $$FloatingVideoTutorial, { "videoId": "dQw4w9WgXcQ?si=bsHIkIVy8VJlSAa2", "title": "C\xF3mo unir PDFs", "data-astro-cid-4tjyiqhv": true })} `, "head": ($$result2) => renderTemplate`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">` }), defineScriptVars({ commonScript }), renderScript($$result, "C:/dev/Astro/cla-tools/src/pages/tools/merge-pdf.astro?astro&type=script&index=0&lang.ts"));
}, "C:/dev/Astro/cla-tools/src/pages/tools/merge-pdf.astro", void 0);

const $$file = "C:/dev/Astro/cla-tools/src/pages/tools/merge-pdf.astro";
const $$url = "/tools/merge-pdf";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MergePdf,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
