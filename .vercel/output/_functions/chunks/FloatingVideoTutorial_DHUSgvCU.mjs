import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, n as renderScript, r as renderTemplate } from './astro/server_DcdLrLOT.mjs';
import 'piccolore';
import 'clsx';
/* empty css                             */

const $$Astro = createAstro("https://tools.claangel.site");
const $$FloatingVideoTutorial = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FloatingVideoTutorial;
  const {
    videoId,
    title = "C\xF3mo usar esta herramienta",
    platform = "youtube"
    // youtube | vimeo | local | cloudflare
  } = Astro2.props;
  let videoSrc = "";
  const isDirectVideo = platform === "local" || platform === "cloudflare";
  if (platform === "youtube") {
    videoSrc = `https://www.youtube-nocookie.com/embed/${videoId}?controls=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`;
  }
  if (platform === "vimeo") {
    videoSrc = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`;
  }
  if (isDirectVideo) {
    videoSrc = videoId;
  }
  return renderTemplate`${maybeRenderHead()}<div id="floating-tutorial" class="fixed bottom-6 right-6 z-50 no-print"${addAttribute(platform, "data-platform")}${addAttribute(videoSrc, "data-video-src")}${addAttribute(isDirectVideo.toString(), "data-is-direct")} data-astro-cid-gsh7shpu> <!-- Botón flotante minimalista --> <button id="tutorial-toggle" class="group flex items-center gap-2 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 pl-3 pr-4 py-2.5 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700 transition-all duration-200 text-sm font-medium" data-astro-cid-gsh7shpu> <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-gsh7shpu> <path d="M6 4l10 6-10 6V4z" data-astro-cid-gsh7shpu></path> </svg> <span data-astro-cid-gsh7shpu>${title}</span> </button> <!-- Panel del video --> <div id="tutorial-panel" class="hidden absolute bottom-16 right-0 w-80 sm:w-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 transition-all duration-300" data-astro-cid-gsh7shpu> <!-- Header minimalista --> <div id="tutorial-header" class="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-700" data-astro-cid-gsh7shpu> <div class="flex items-center gap-2" data-astro-cid-gsh7shpu> <div class="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" data-astro-cid-gsh7shpu></div> <span class="text-sm font-medium text-zinc-700 dark:text-zinc-300" data-astro-cid-gsh7shpu>
Tutorial (En desarrollo)
</span> </div> <button id="tutorial-close" class="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors" aria-label="Cerrar tutorial" data-astro-cid-gsh7shpu> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-gsh7shpu> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-gsh7shpu></path> </svg> </button> </div> <!-- Video container --> <div id="tutorial-video-wrapper" class="relative w-full aspect-video bg-zinc-950" data-astro-cid-gsh7shpu> ${isDirectVideo ? renderTemplate`<video id="tutorial-video" class="w-full h-full hidden rounded-b-2xl" controls preload="metadata" playsinline data-astro-cid-gsh7shpu>
Tu navegador no soporta el formato de video.
</video>` : renderTemplate`<iframe id="tutorial-iframe" class="w-full h-full hidden"${addAttribute(videoSrc, "src")} loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-astro-cid-gsh7shpu></iframe>`} <!-- Overlay minimalista (Visible por defecto) --> <button id="tutorial-play" class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 group" aria-label="Reproducir tutorial" data-astro-cid-gsh7shpu> <div class="flex flex-col items-center gap-3" data-astro-cid-gsh7shpu> <div class="w-16 h-16 flex items-center justify-center rounded-full bg-zinc-800/40 shadow-xl group-hover:scale-110 transition-transform duration-300" data-astro-cid-gsh7shpu> <svg class="w-7 h-7 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-gsh7shpu> <path d="M6 4l10 6-10 6V4z" data-astro-cid-gsh7shpu></path> </svg> </div> <span class="text-sm font-medium text-white/90 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm" data-astro-cid-gsh7shpu>
Ver tutorial
</span> </div> </button> </div> </div> </div>  ${renderScript($$result, "C:/dev/Astro/cla-tools/src/components/FloatingVideoTutorial.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/Astro/cla-tools/src/components/FloatingVideoTutorial.astro", void 0);

export { $$FloatingVideoTutorial as $ };
