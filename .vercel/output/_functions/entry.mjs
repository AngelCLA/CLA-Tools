import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CkUQl2qw.mjs';
import { manifest } from './manifest_CksnyIis.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/upload-pdf.astro.mjs');
const _page2 = () => import('./pages/tools/docx-gift.astro.mjs');
const _page3 = () => import('./pages/tools/ebooks.astro.mjs');
const _page4 = () => import('./pages/tools/generador-acta.astro.mjs');
const _page5 = () => import('./pages/tools/merge-pdf.astro.mjs');
const _page6 = () => import('./pages/tools/text-html.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/upload-pdf.js", _page1],
    ["src/pages/tools/docx-gift.astro", _page2],
    ["src/pages/tools/ebooks.astro", _page3],
    ["src/pages/tools/generador-acta.astro", _page4],
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
    "middlewareSecret": "90cf1152-4f65-4d2b-9741-09ac02ff30ab",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
