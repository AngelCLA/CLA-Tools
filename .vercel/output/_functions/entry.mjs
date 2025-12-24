import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DCkoT2za.mjs';
import { manifest } from './manifest_CwXpKulF.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/stats.astro.mjs');
const _page2 = () => import('./pages/api/tool-use.astro.mjs');
const _page3 = () => import('./pages/api/tool-use-real.astro.mjs');
const _page4 = () => import('./pages/tools/docx-gift.astro.mjs');
const _page5 = () => import('./pages/tools/merge-pdf.astro.mjs');
const _page6 = () => import('./pages/tools/text-html.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.16.6_@types+node@25_03cc5d62dd3181482f1b92f2dea7d195/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/stats.astro", _page1],
    ["src/pages/api/tool-use.ts", _page2],
    ["src/pages/api/tool-use-real.ts", _page3],
    ["src/pages/tools/docx-gift.astro", _page4],
    ["src/pages/tools/merge-pdf.astro", _page5],
    ["src/pages/tools/text-html.astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "9b04fb87-79a6-4a93-aee3-5562e081eae4",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
