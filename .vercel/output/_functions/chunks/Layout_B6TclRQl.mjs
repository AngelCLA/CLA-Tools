import { f as createComponent, s as spreadAttributes, u as unescapeHTML, r as renderTemplate, h as addAttribute, m as maybeRenderHead, e as createAstro, o as renderComponent, p as renderSlot, l as renderHead } from './astro/server_CfwuqGYk.mjs';
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
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<header class="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-900"> <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex flex-col"> <div class="flex items-center justify-between h-16"> <!-- Logo y T\xEDtulo --> <div class="flex items-center gap-3"> <a href="/" class="flex items-center gap-2 sm:gap-3 group transition-all hover:opacity-80"> <img', ' alt="Logo" class="w-10 sm:w-12"> <span class="text-lg sm:text-xl font-bold bg-clip-text text-purple-600 dark:text-purple-400">\nCLA Tools\n</span> </a> </div> <!-- Enlaces de Navegaci\xF3n Desktop --> <div class="hidden md:flex items-center gap-6"> <a href="/#tools-title" class="text-sm font-medium text-zinc-700 hover:text-purple-600 dark:text-zinc-300 dark:hover:text-purple-400 transition-colors">\nHerramientas\n</a> <a href="/#about" class="text-sm font-medium text-zinc-700 hover:text-purple-600 dark:text-zinc-300 dark:hover:text-purple-400 transition-colors">\nAcerca de\n</a> <a href="/#contact" class="text-sm font-medium text-zinc-700 hover:text-purple-600 dark:text-zinc-300 dark:hover:text-purple-400 transition-colors">\nContacto\n</a> <!-- Bot\xF3n Tema Desktop --> <button id="theme-toggle" class="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer" aria-label="Cambiar tema"> <svg id="theme-icon-light" class="w-5 h-5 text-zinc-700 dark:text-zinc-300 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg> <svg id="theme-icon-dark" class="w-5 h-5 text-zinc-700 dark:text-zinc-300 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path> </svg> </button> </div> <!-- Botones M\xF3viles --> <div class="md:hidden flex items-center gap-2"> <!-- Bot\xF3n Tema M\xF3vil --> <button id="theme-toggle-mobile" class="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Cambiar tema"> <svg class="w-5 h-5 text-zinc-700 dark:text-zinc-300 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg> <svg class="w-5 h-5 text-zinc-700 dark:text-zinc-300 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path> </svg> </button> <!-- Men\xFA M\xF3vil (Hamburguesa) --> <button id="mobile-menu-button" class="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Men\xFA"> <svg class="w-6 h-6 text-zinc-700 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> </div> <!-- Men\xFA M\xF3vil Desplegable --> <div id="mobile-menu" class="hidden md:hidden pb-4 pt-2 space-y-1"> <a href="/#tools-title" class="block px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-lg transition-colors">\nHerramientas\n</a> <a href="/#about" class="block px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-lg transition-colors">\nAcerca de\n</a> <a href="/#contact" class="block px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-lg transition-colors">\nContacto\n</a> </div> </div> </nav> </header> <script>\n  console.log("Script del Navbar cargado");\n\n  // Funci\xF3n para actualizar el tema\n  function updateTheme(isDark) {\n    console.log("Actualizando tema a:", isDark ? "dark" : "light");\n    if (isDark) {\n      document.documentElement.classList.add("dark");\n      localStorage.setItem("theme", "dark");\n    } else {\n      document.documentElement.classList.remove("dark");\n      localStorage.setItem("theme", "light");\n    }\n  }\n\n  // Detectar preferencia inicial\n  function initTheme() {\n    const savedTheme = localStorage.getItem("theme");\n    const prefersDark = window.matchMedia(\n      "(prefers-color-scheme: dark)"\n    ).matches;\n    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);\n    console.log(\n      "Tema inicial:",\n      isDark ? "dark" : "light",\n      "(guardado:",\n      savedTheme,\n      ", prefiere dark:",\n      prefersDark,\n      ")"\n    );\n    updateTheme(isDark);\n  }\n\n  // Manejar cambio de tema\n  function toggleTheme() {\n    const isDark = document.documentElement.classList.contains("dark");\n    console.log("Toggle tema desde:", isDark ? "dark" : "light");\n    updateTheme(!isDark);\n  }\n\n  // Inicializar cuando el DOM est\xE9 listo\n  if (document.readyState === "loading") {\n    document.addEventListener("DOMContentLoaded", function () {\n      console.log("DOM cargado, inicializando tema");\n      initTheme();\n      setupEventListeners();\n    });\n  } else {\n    console.log("DOM ya est\xE1 listo, inicializando tema");\n    initTheme();\n    setupEventListeners();\n  }\n\n  function setupEventListeners() {\n    // Event listeners para botones de tema\n    const themeToggle = document.getElementById("theme-toggle");\n    const themeToggleMobile = document.getElementById("theme-toggle-mobile");\n\n    console.log("Bot\xF3n desktop:", themeToggle);\n    console.log("Bot\xF3n mobile:", themeToggleMobile);\n\n    if (themeToggle) {\n      themeToggle.addEventListener("click", function () {\n        console.log("Click en bot\xF3n desktop");\n        toggleTheme();\n      });\n    }\n\n    if (themeToggleMobile) {\n      themeToggleMobile.addEventListener("click", function () {\n        console.log("Click en bot\xF3n mobile");\n        toggleTheme();\n      });\n    }\n\n    // Event listener para men\xFA m\xF3vil\n    const mobileMenuButton = document.getElementById("mobile-menu-button");\n    const mobileMenu = document.getElementById("mobile-menu");\n\n    console.log("Bot\xF3n men\xFA:", mobileMenuButton);\n    console.log("Men\xFA:", mobileMenu);\n\n    if (mobileMenuButton && mobileMenu) {\n      mobileMenuButton.addEventListener("click", function () {\n        console.log("Toggle men\xFA m\xF3vil");\n        mobileMenu.classList.toggle("hidden");\n      });\n    }\n  }\n<\/script>'])), maybeRenderHead(), addAttribute(logo.src, "src"));
}, "C:/dev/Astro/cla-tools/src/components/Navbar.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="mt-auto bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> <div class="flex flex-col md:flex-row items-center justify-between gap-4"> <div class="text-center md:text-left"> <p class="text-zinc-600 dark:text-zinc-400 text-sm">
© 2025 <span class="font-semibold text-purple-600 dark:text-purple-400">CLA Tools</span>. Todos los derechos reservados.
</p> </div> <div class="flex items-center gap-6"> <a href="/#about" class="text-sm text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors">
Acerca de
</a> <a href="/#contact" class="text-sm text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors">
Contacto
</a> <a href="https://github.com/AngelCLA/cla-tools" target="_blank" rel="noopener noreferrer" class="text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path> </svg> </a> </div> </div> </div> </footer>`;
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
  return renderTemplate(_a || (_a = __template(['<html lang="es" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><!-- SEO Meta Tags --><title>", '</title><meta name="description"', '><meta name="keywords"', '><meta name="author" content="CLA Tools"><meta name="robots" content="index, follow"><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:site_name" content="CLA Tools"><meta property="og:locale" content="es_ES"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Additional SEO --><meta name="theme-color" content="#9333ea"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><!-- Structured Data (JSON-LD) --><script type="application/ld+json">', '<\/script><!-- Script para inicializar tema antes del render --><script>\n      // Inicializar tema inmediatamente para evitar parpadeo\n      (function () {\n        const savedTheme = localStorage.getItem("theme");\n        const prefersDark = window.matchMedia(\n          "(prefers-color-scheme: dark)"\n        ).matches;\n\n        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {\n          document.documentElement.classList.add("dark");\n        }\n      })();\n    <\/script><!-- Font Awesome CDN --><link slot="head" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">', '</head> <body class="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col transition-colors duration-200" data-astro-cid-sckkx6r4> ', ' <main class="flex-1" data-astro-cid-sckkx6r4> ', " </main> ", " </body></html>"])), addAttribute(Astro2.generator, "content"), title, addAttribute(description, "content"), addAttribute(keywords, "content"), addAttribute(canonicalURL, "href"), addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(ogImage, Astro2.site), "content"), addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(ogImage, Astro2.site), "content"), unescapeHTML(JSON.stringify({
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
