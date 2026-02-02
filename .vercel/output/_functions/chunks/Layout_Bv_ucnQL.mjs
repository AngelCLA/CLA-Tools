import { f as createComponent, s as spreadAttributes, u as unescapeHTML, r as renderTemplate, h as addAttribute, m as maybeRenderHead, n as renderScript, e as createAstro, l as renderComponent, o as renderSlot, p as renderHead } from './astro/server_DcdLrLOT.mjs';
import 'piccolore';
/* empty css                         */
import 'clsx';

function createSvgComponent({ meta, attributes, children }) {
  const Component = createComponent((_, props) => {
    const normalizedProps = normalizeProps(attributes, props);
    return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const logo = createSvgComponent({"meta":{"src":"/_astro/Logo.BXFdFO5W.svg","width":164,"height":164,"format":"svg"},"attributes":{"width":"164","height":"164","viewBox":"0 0 164 164","fill":"none"},"children":"\n<g clip-path=\"url(#clip0_809_7)\">\n<rect width=\"164\" height=\"164\" rx=\"82\" fill=\"#9810FA\" />\n<path d=\"M86.1116 81.1664L-94.3999 185.149C-91.4398 190.503 -86.947 194.977 -80.8667 198.498C-51.7326 215.38 46.0454 271.414 65.5681 282.938C78.6976 290.689 91.5171 290.966 104.743 283.326C153.788 254.995 202.897 226.782 251.964 198.481C258.044 194.961 262.537 190.484 265.497 185.135L86.1116 81.1664Z\" fill=\"#6F1DAA\" />\n<path d=\"M169.629 43.0184C169.628 39.8368 168.942 37.0254 167.556 34.6125L85.1079 81.7438L167.656 129.22C168.979 126.844 169.636 124.087 169.638 120.974C169.638 120.974 169.638 69.0088 169.629 43.0184Z\" fill=\"#5B0D92\" fill-opacity=\"0.98\" />\n<path d=\"M86.0077 22C108.207 22 127.588 34.0545 137.969 51.9722L137.868 51.7998L111.75 66.8366C106.604 58.1248 97.17 52.2458 86.3486 52.1247L86.0077 52.1228C69.5054 52.1228 56.1265 65.4993 56.1265 81.9996C56.1265 87.3956 57.5653 92.4537 60.0674 96.8225C65.218 105.813 74.9006 111.877 86.0077 111.877C97.1835 111.877 106.921 105.736 112.046 96.6493L111.921 96.8674L138 111.973C127.733 129.74 108.617 141.757 86.6762 141.996L86.0077 142C63.739 142 44.3025 129.871 33.9475 111.859C28.8924 103.065 26 92.8708 26 81.9996C26 48.8632 52.8658 22 86.0077 22Z\" fill=\"white\" />\n</g>\n<defs>\n<clipPath id=\"clip0_809_7\">\n<rect width=\"164\" height=\"164\" rx=\"82\" fill=\"white\" />\n</clipPath>\n</defs>\n"});

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<header class="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-900"> <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex flex-col"> <div class="flex items-center justify-between h-16"> <!-- Logo y T\xEDtulo --> <div class="flex items-center gap-3"> <a href="/" class="flex items-center gap-2 sm:gap-3 group transition-all hover:opacity-80"> <img', ' alt="Logo" class="w-10 sm:w-12"> <span class="text-lg sm:text-xl font-bold bg-clip-text text-purple-600 dark:text-purple-400">\nCLA Tools\n</span> </a> </div> <!-- Enlaces de Navegaci\xF3n Desktop --> <div class="hidden md:flex items-center gap-6"> <a href="/#tools-title" class="text-sm font-medium text-zinc-700 hover:text-purple-600 dark:text-zinc-300 dark:hover:text-purple-400 transition-colors">\nHerramientas\n</a> <a href="/#about" class="text-sm font-medium text-zinc-700 hover:text-purple-600 dark:text-zinc-300 dark:hover:text-purple-400 transition-colors">\nAcerca de\n</a> <a href="/#contact" class="text-sm font-medium text-zinc-700 hover:text-purple-600 dark:text-zinc-300 dark:hover:text-purple-400 transition-colors">\nContacto\n</a> <!-- Bot\xF3n Tema Desktop --> <button id="theme-toggle" class="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer" aria-label="Cambiar tema"> <svg id="theme-icon-light" class="w-5 h-5 text-zinc-700 dark:text-zinc-300 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg> <svg id="theme-icon-dark" class="w-5 h-5 text-zinc-700 dark:text-zinc-300 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path> </svg> </button> </div> <!-- Botones M\xF3viles --> <div class="md:hidden flex items-center gap-2"> <!-- Bot\xF3n Tema M\xF3vil --> <button id="theme-toggle-mobile" class="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Cambiar tema"> <svg class="w-5 h-5 text-zinc-700 dark:text-zinc-300 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg> <svg class="w-5 h-5 text-zinc-700 dark:text-zinc-300 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path> </svg> </button> <!-- Men\xFA M\xF3vil (Hamburguesa) --> <button id="mobile-menu-button" class="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Men\xFA"> <svg class="w-6 h-6 text-zinc-700 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> </div> <!-- Men\xFA M\xF3vil Desplegable --> <div id="mobile-menu" class="hidden md:hidden pb-4 pt-2 space-y-1"> <a href="/#tools-title" class="block px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-lg transition-colors">\nHerramientas\n</a> <a href="/#about" class="block px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-lg transition-colors">\nAcerca de\n</a> <a href="/#contact" class="block px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-lg transition-colors">\nContacto\n</a> </div> </div> </nav> </header> <script>\n  console.log("Script del Navbar cargado");\n\n  // Funci\xF3n para actualizar el tema\n  function updateTheme(isDark) {\n    console.log("Actualizando tema a:", isDark ? "dark" : "light");\n    if (isDark) {\n      document.documentElement.classList.add("dark");\n      localStorage.setItem("theme", "dark");\n    } else {\n      document.documentElement.classList.remove("dark");\n      localStorage.setItem("theme", "light");\n    }\n  }\n\n  // Detectar preferencia inicial\n  function initTheme() {\n    const savedTheme = localStorage.getItem("theme");\n    const prefersDark = window.matchMedia(\n      "(prefers-color-scheme: dark)",\n    ).matches;\n    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);\n    console.log(\n      "Tema inicial:",\n      isDark ? "dark" : "light",\n      "(guardado:",\n      savedTheme,\n      ", prefiere dark:",\n      prefersDark,\n      ")",\n    );\n    updateTheme(isDark);\n  }\n\n  // Manejar cambio de tema\n  function toggleTheme() {\n    const isDark = document.documentElement.classList.contains("dark");\n    console.log("Toggle tema desde:", isDark ? "dark" : "light");\n    updateTheme(!isDark);\n  }\n\n  // Inicializar cuando el DOM est\xE9 listo\n  if (document.readyState === "loading") {\n    document.addEventListener("DOMContentLoaded", function () {\n      console.log("DOM cargado, inicializando tema");\n      initTheme();\n      setupEventListeners();\n    });\n  } else {\n    console.log("DOM ya est\xE1 listo, inicializando tema");\n    initTheme();\n    setupEventListeners();\n  }\n\n  function setupEventListeners() {\n    // Event listeners para botones de tema\n    const themeToggle = document.getElementById("theme-toggle");\n    const themeToggleMobile = document.getElementById("theme-toggle-mobile");\n\n    console.log("Bot\xF3n desktop:", themeToggle);\n    console.log("Bot\xF3n mobile:", themeToggleMobile);\n\n    if (themeToggle) {\n      themeToggle.addEventListener("click", function () {\n        console.log("Click en bot\xF3n desktop");\n        toggleTheme();\n      });\n    }\n\n    if (themeToggleMobile) {\n      themeToggleMobile.addEventListener("click", function () {\n        console.log("Click en bot\xF3n mobile");\n        toggleTheme();\n      });\n    }\n\n    // Event listener para men\xFA m\xF3vil\n    const mobileMenuButton = document.getElementById("mobile-menu-button");\n    const mobileMenu = document.getElementById("mobile-menu");\n\n    console.log("Bot\xF3n men\xFA:", mobileMenuButton);\n    console.log("Men\xFA:", mobileMenu);\n\n    if (mobileMenuButton && mobileMenu) {\n      mobileMenuButton.addEventListener("click", function () {\n        console.log("Toggle men\xFA m\xF3vil");\n        mobileMenu.classList.toggle("hidden");\n      });\n    }\n  }\n<\/script>'])), maybeRenderHead(), addAttribute(logo.src, "src"));
}, "C:/dev/Astro/cla-tools/src/components/Navbar.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="mt-auto bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 border-t border-zinc-200 dark:border-zinc-800" data-astro-cid-sz7xmlte> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-astro-cid-sz7xmlte> <!-- Grid principal --> <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8" data-astro-cid-sz7xmlte> <!-- Columna 1: Branding --> <div class="md:col-span-2" data-astro-cid-sz7xmlte> <div class="flex items-center gap-3 mb-4" data-astro-cid-sz7xmlte> <a href="/" class="flex items-center gap-2 sm:gap-3 group transition-all hover:opacity-80" data-astro-cid-sz7xmlte> <img${addAttribute(logo.src, "src")} alt="Logo" class="w-10 sm:w-12" data-astro-cid-sz7xmlte> <span class="text-lg sm:text-xl font-bold bg-clip-text text-purple-600 dark:text-purple-400" data-astro-cid-sz7xmlte>
CLA Tools
</span> </a> </div> <p class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4 max-w-md" data-astro-cid-sz7xmlte>
Herramientas web gratuitas para agilizar procesos académicos y
          administrativos, con procesamiento local y total privacidad.
</p> <div class="flex gap-3" data-astro-cid-sz7xmlte> <a href="https://github.com/AngelCLA/cla-tools" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-zinc-700 dark:text-zinc-300 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-lg" title="GitHub" data-astro-cid-sz7xmlte> <i class="fab fa-github text-sm" data-astro-cid-sz7xmlte></i> </a> <a href="mailto:claangeldev@gmail.com" class="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-zinc-700 dark:text-zinc-300 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-lg" title="Email" data-astro-cid-sz7xmlte> <i class="fas fa-envelope text-sm" data-astro-cid-sz7xmlte></i> </a> <a href="https://instagram.com/cla__angel" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-zinc-700 dark:text-zinc-300 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-lg" title="Instagram" data-astro-cid-sz7xmlte> <i class="fab fa-instagram text-sm" data-astro-cid-sz7xmlte></i> </a> </div> </div> <!-- Columna 2: Herramientas --> <div data-astro-cid-sz7xmlte> <h3 class="font-semibold text-zinc-800 dark:text-zinc-200 mb-4 text-sm uppercase tracking-wider" data-astro-cid-sz7xmlte>
Herramientas
</h3> <ul class="space-y-2.5" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a href="/tools/merge-pdf" class="text-sm text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group" data-astro-cid-sz7xmlte> <i class="fas fa-file-pdf text-xs opacity-60 group-hover:opacity-100" data-astro-cid-sz7xmlte></i>
Unir PDFs
</a> </li> <li data-astro-cid-sz7xmlte> <a href="/tools/split-pdf" class="text-sm text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group" data-astro-cid-sz7xmlte> <i class="fas fa-code text-xs opacity-60 group-hover:opacity-100" data-astro-cid-sz7xmlte></i>
Texto a HTML
</a> </li> <li data-astro-cid-sz7xmlte> <a href="/tools/compress-pdf" class="text-sm text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group" data-astro-cid-sz7xmlte> <i class="fas fa-file-word text-xs opacity-60 group-hover:opacity-100" data-astro-cid-sz7xmlte></i>
DOCX a GIFT
</a> </li> <li data-astro-cid-sz7xmlte> <a href="#tools-title" class="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors flex items-center gap-2 font-medium group" data-astro-cid-sz7xmlte>
Ver todas
<i class="fas fa-arrow-right text-xs transform group-hover:translate-x-1 transition-transform" data-astro-cid-sz7xmlte></i> </a> </li> </ul> </div> <!-- Columna 3: Enlaces útiles --> <div data-astro-cid-sz7xmlte> <h3 class="font-semibold text-zinc-800 dark:text-zinc-200 mb-4 text-sm uppercase tracking-wider" data-astro-cid-sz7xmlte>
Información
</h3> <ul class="space-y-2.5" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a href="/#about" class="text-sm text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group" data-astro-cid-sz7xmlte> <i class="fas fa-info-circle text-xs opacity-60 group-hover:opacity-100" data-astro-cid-sz7xmlte></i>
Acerca de
</a> </li> <li data-astro-cid-sz7xmlte> <button id="open-privacy-btn" class="text-sm text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group" data-astro-cid-sz7xmlte> <i class="fas fa-shield-alt text-xs opacity-60 group-hover:opacity-100" data-astro-cid-sz7xmlte></i>
Privacidad
</button> </li> <li data-astro-cid-sz7xmlte> <button id="open-terms-btn" class="text-sm text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group" data-astro-cid-sz7xmlte> <i class="fas fa-file-contract text-xs opacity-60 group-hover:opacity-100" data-astro-cid-sz7xmlte></i>
Términos
</button> </li> <li data-astro-cid-sz7xmlte> <a href="/#contact" class="text-sm text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group" data-astro-cid-sz7xmlte> <i class="fas fa-envelope text-xs opacity-60 group-hover:opacity-100" data-astro-cid-sz7xmlte></i>
Contacto
</a> </li> </ul> </div> </div> <!-- Separador --> <div class="border-t border-zinc-200 dark:border-zinc-800 pt-6" data-astro-cid-sz7xmlte> <div class="flex flex-col md:flex-row items-center justify-between gap-4" data-astro-cid-sz7xmlte> <!-- Copyright --> <div class="text-center md:text-left" data-astro-cid-sz7xmlte> <p class="text-zinc-600 dark:text-zinc-400 text-sm" data-astro-cid-sz7xmlte>
© <span id="footer-year" data-astro-cid-sz7xmlte></span> <span class="font-semibold text-purple-600 dark:text-purple-400" data-astro-cid-sz7xmlte>CLA Tools</span>. Todos los derechos reservados.
</p> </div> <!-- Badges o info adicional --> <div class="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500" data-astro-cid-sz7xmlte> <div class="flex items-center gap-1.5" data-astro-cid-sz7xmlte> <i class="fas fa-shield-alt text-green-600" data-astro-cid-sz7xmlte></i> <span data-astro-cid-sz7xmlte>100% Privado</span> </div> <div class="flex items-center gap-1.5" data-astro-cid-sz7xmlte> <i class="fas fa-bolt text-yellow-500" data-astro-cid-sz7xmlte></i> <span data-astro-cid-sz7xmlte>Rápido</span> </div> <div class="flex items-center gap-1.5" data-astro-cid-sz7xmlte> <i class="fas fa-code text-purple-500" data-astro-cid-sz7xmlte></i> <span data-astro-cid-sz7xmlte>Open Source</span> </div> </div> </div> </div> </div> </footer> <!-- Modal de Privacidad --> <div id="privacy-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" data-astro-cid-sz7xmlte> <div class="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden animate-slide-up" data-astro-cid-sz7xmlte> <!-- Header del modal --> <div class="bg-gradient-to-r from-purple-600 to-purple-700 p-6 flex items-center justify-between" data-astro-cid-sz7xmlte> <div class="flex items-center gap-3" data-astro-cid-sz7xmlte> <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center" data-astro-cid-sz7xmlte> <i class="fas fa-shield-alt text-white text-lg" data-astro-cid-sz7xmlte></i> </div> <h2 class="text-2xl font-bold text-white" data-astro-cid-sz7xmlte>Política de Privacidad</h2> </div> <button id="close-privacy-btn" class="w-8 h-8 rounded-lg hover:bg-white/20 text-white transition-colors flex items-center justify-center" data-astro-cid-sz7xmlte> <i class="fas fa-times" data-astro-cid-sz7xmlte></i> </button> </div> <!-- Contenido scrolleable --> <div class="p-6 overflow-y-auto max-h-[calc(80vh-100px)]" data-astro-cid-sz7xmlte> <div class="prose dark:prose-invert max-w-none" data-astro-cid-sz7xmlte> <p class="text-zinc-600 dark:text-zinc-400 mb-4" data-astro-cid-sz7xmlte> <strong data-astro-cid-sz7xmlte>Última actualización:</strong> 25 de diciembre de 2025
</p> <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-3" data-astro-cid-sz7xmlte>
1. Procesamiento Local
</h3> <p class="text-zinc-600 dark:text-zinc-400 mb-4" data-astro-cid-sz7xmlte>
Todas las herramientas de CLA Tools procesan tus archivos directamente
          en tu navegador. <strong data-astro-cid-sz7xmlte>Nunca subimos tus archivos a nuestros servidores</strong>. Tus datos permanecen completamente privados y bajo tu control.
</p> <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-3" data-astro-cid-sz7xmlte>
2. Datos que Recopilamos
</h3> <p class="text-zinc-600 dark:text-zinc-400 mb-4" data-astro-cid-sz7xmlte>
Utilizamos herramientas de análisis (como Google Analytics) para
          entender cómo se usa nuestro sitio. Esto incluye:
</p> <ul class="list-disc list-inside text-zinc-600 dark:text-zinc-400 mb-4 space-y-2" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte>Páginas visitadas</li> <li data-astro-cid-sz7xmlte>Tiempo de permanencia</li> <li data-astro-cid-sz7xmlte>Tipo de dispositivo y navegador</li> <li data-astro-cid-sz7xmlte>Ubicación aproximada (ciudad/país)</li> </ul> <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-3" data-astro-cid-sz7xmlte>
3. Cookies
</h3> <p class="text-zinc-600 dark:text-zinc-400 mb-4" data-astro-cid-sz7xmlte>
Utilizamos cookies solo para funciones esenciales como recordar tus
          preferencias de tema (modo oscuro/claro). Puedes desactivarlas en la
          configuración de tu navegador.
</p> <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-3" data-astro-cid-sz7xmlte>
4. Seguridad
</h3> <p class="text-zinc-600 dark:text-zinc-400 mb-4" data-astro-cid-sz7xmlte>
Como tus archivos nunca salen de tu dispositivo, no hay riesgo de
          interceptación o acceso no autorizado por terceros. El procesamiento
          local garantiza la máxima seguridad.
</p> <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-3" data-astro-cid-sz7xmlte>
5. Contacto
</h3> <p class="text-zinc-600 dark:text-zinc-400 mb-4" data-astro-cid-sz7xmlte>
Si tienes preguntas sobre nuestra política de privacidad, contáctanos
          en: <a href="mailto:claangeldev@gmail.com" class="text-purple-600 hover:text-purple-700" data-astro-cid-sz7xmlte>claangeldev@gmail.com</a> </p> </div> </div> <!-- Footer del modal --> <div class="border-t border-zinc-200 dark:border-zinc-800 p-4 flex justify-end" data-astro-cid-sz7xmlte> <button id="privacy-ok-btn" class="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium" data-astro-cid-sz7xmlte>
Entendido
</button> </div> </div> </div> <!-- Modal de Términos --> <div id="terms-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" data-astro-cid-sz7xmlte> <div class="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden animate-slide-up" data-astro-cid-sz7xmlte> <!-- Header del modal --> <div class="bg-gradient-to-r from-purple-600 to-purple-700 p-6 flex items-center justify-between" data-astro-cid-sz7xmlte> <div class="flex items-center gap-3" data-astro-cid-sz7xmlte> <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center" data-astro-cid-sz7xmlte> <i class="fas fa-file-contract text-white text-lg" data-astro-cid-sz7xmlte></i> </div> <h2 class="text-2xl font-bold text-white" data-astro-cid-sz7xmlte>Términos y Condiciones</h2> </div> <button id="close-terms-btn" class="w-8 h-8 rounded-lg hover:bg-white/20 text-white transition-colors flex items-center justify-center" data-astro-cid-sz7xmlte> <i class="fas fa-times" data-astro-cid-sz7xmlte></i> </button> </div> <!-- Contenido scrolleable --> <div class="p-6 overflow-y-auto max-h-[calc(80vh-100px)]" data-astro-cid-sz7xmlte> <div class="prose dark:prose-invert max-w-none" data-astro-cid-sz7xmlte> <p class="text-zinc-600 dark:text-zinc-400 mb-4" data-astro-cid-sz7xmlte> <strong data-astro-cid-sz7xmlte>Última actualización:</strong> 25 de diciembre de 2025
</p> <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-3" data-astro-cid-sz7xmlte>
1. Aceptación de los Términos
</h3> <p class="text-zinc-600 dark:text-zinc-400 mb-4" data-astro-cid-sz7xmlte>
Al acceder y utilizar CLA Tools, aceptas estar sujeto a estos términos
          y condiciones. Si no estás de acuerdo, por favor no uses nuestros
          servicios.
</p> <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-3" data-astro-cid-sz7xmlte>
2. Uso del Servicio
</h3> <p class="text-zinc-600 dark:text-zinc-400 mb-4" data-astro-cid-sz7xmlte>
CLA Tools proporciona herramientas gratuitas para manipular archivos
          PDF y otros formatos. Te concedemos una licencia no exclusiva para
          usar nuestras herramientas con los siguientes términos:
</p> <ul class="list-disc list-inside text-zinc-600 dark:text-zinc-400 mb-4 space-y-2" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte>
Puedes usar las herramientas para fines personales y comerciales
</li> <li data-astro-cid-sz7xmlte>No debes usar el servicio para actividades ilegales</li> <li data-astro-cid-sz7xmlte>No debes intentar acceder a sistemas no autorizados</li> <li data-astro-cid-sz7xmlte>No debes sobrecargar deliberadamente nuestros servidores</li> </ul> <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-3" data-astro-cid-sz7xmlte>
3. Contenido del Usuario
</h3> <p class="text-zinc-600 dark:text-zinc-400 mb-4" data-astro-cid-sz7xmlte>
Eres el único responsable de los archivos que procesas usando nuestras
          herramientas. No revisamos ni tenemos acceso al contenido que
          procesas, ya que todo se ejecuta localmente en tu navegador.
</p> <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-3" data-astro-cid-sz7xmlte>
4. Limitación de Responsabilidad
</h3> <p class="text-zinc-600 dark:text-zinc-400 mb-4" data-astro-cid-sz7xmlte>
CLA Tools se proporciona "tal cual" sin garantías de ningún tipo. No
          nos hacemos responsables de:
</p> <ul class="list-disc list-inside text-zinc-600 dark:text-zinc-400 mb-4 space-y-2" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte>Pérdida de datos o archivos</li> <li data-astro-cid-sz7xmlte>Errores en el procesamiento de archivos</li> <li data-astro-cid-sz7xmlte>Interrupciones del servicio</li> <li data-astro-cid-sz7xmlte>Daños directos o indirectos derivados del uso del servicio</li> </ul> <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-3" data-astro-cid-sz7xmlte>
5. Propiedad Intelectual
</h3> <p class="text-zinc-600 dark:text-zinc-400 mb-4" data-astro-cid-sz7xmlte>
El código, diseño y contenido de CLA Tools están protegidos por
          derechos de autor. No puedes copiar, modificar o distribuir nuestro
          código sin autorización expresa.
</p> <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-3" data-astro-cid-sz7xmlte>
6. Modificaciones
</h3> <p class="text-zinc-600 dark:text-zinc-400 mb-4" data-astro-cid-sz7xmlte>
Nos reservamos el derecho de modificar estos términos en cualquier
          momento. Los cambios entrarán en vigor inmediatamente después de su
          publicación.
</p> <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-3" data-astro-cid-sz7xmlte>
7. Contacto
</h3> <p class="text-zinc-600 dark:text-zinc-400 mb-4" data-astro-cid-sz7xmlte>
Para preguntas sobre estos términos, contáctanos en: <a href="mailto:claangeldev@gmail.com" class="text-blue-600 hover:text-blue-700" data-astro-cid-sz7xmlte>claangeldev@gmail.com</a> </p> </div> </div> <!-- Footer del modal --> <div class="border-t border-zinc-200 dark:border-zinc-800 p-4 flex justify-end" data-astro-cid-sz7xmlte> <button id="terms-ok-btn" class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium" data-astro-cid-sz7xmlte>
Entendido
</button> </div> </div> </div> ${renderScript($$result, "C:/dev/Astro/cla-tools/src/components/Footer.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/Astro/cla-tools/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://tools.claangel.site");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "CLA Tools - Herramientas Educativas Gratuitas",
    description = "Plataforma gratuita con herramientas para agilizar la carga de actividades y optimizar procesos acad\xE9micos. Convierte DOCX a GIFT, texto a HTML, une PDFs y m\xE1s.",
    keywords = "herramientas educativas, DOCX a GIFT, Moodle, convertir PDF, unir PDF, texto a HTML, herramientas gratuitas, educaci\xF3n, acad\xE9mico",
    ogImage = "/og-image.png",
    canonicalURL = new URL(Astro2.url.pathname, Astro2.site).toString()
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', '><!-- \u26A0\uFE0F CR\xCDTICO: Script de tema DEBE ser lo primero para evitar flash --><script>\n      (function () {\n        const savedTheme = localStorage.getItem("theme");\n        const prefersDark = window.matchMedia(\n          "(prefers-color-scheme: dark)",\n        ).matches;\n        const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);\n\n        if (isDark) {\n          document.documentElement.classList.add("dark");\n        } else {\n          document.documentElement.classList.remove("dark");\n        }\n      })();\n    <\/script><!-- SEO Meta Tags --><title>', '</title><meta name="description"', '><meta name="keywords"', '><meta name="author" content="CLA Tools"><meta name="robots" content="index, follow"><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:site_name" content="CLA Tools"><meta property="og:locale" content="es_ES"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Additional SEO --><meta name="theme-color" content="#9333ea"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><!-- Structured Data (JSON-LD) --><script type="application/ld+json">', '<\/script><!-- Font Awesome CDN --><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">', '</head> <body class="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col transition-colors duration-200" data-astro-cid-sckkx6r4> <div class="no-print" data-astro-cid-sckkx6r4> ', ' </div> <main class="flex-1" data-astro-cid-sckkx6r4> ', ' </main> <div class="no-print" data-astro-cid-sckkx6r4> ', " </div> </body></html>"])), addAttribute(Astro2.generator, "content"), title, addAttribute(description, "content"), addAttribute(keywords, "content"), addAttribute(canonicalURL, "href"), addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(ogImage, Astro2.site), "content"), addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(ogImage, Astro2.site), "content"), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CLA Tools",
    url: Astro2.site,
    description,
    publisher: {
      "@type": "Organization",
      name: "CLA Tools",
      logo: {
        "@type": "ImageObject",
        url: new URL("/favicon.svg", Astro2.site)
      }
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: new URL("/?q={search_term_string}", Astro2.site)
      },
      "query-input": "required name=search_term_string"
    }
  })), renderHead(), renderComponent($$result, "Header", $$Navbar, { "data-astro-cid-sckkx6r4": true }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-sckkx6r4": true }));
}, "C:/dev/Astro/cla-tools/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
