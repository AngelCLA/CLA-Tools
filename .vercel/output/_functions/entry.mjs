import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_kCT9dbFA.mjs';
import { manifest } from './manifest_D4SQmllK.mjs';

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
    "middlewareSecret": "f5e7e35f-a5a1-4b7a-92f4-27676f2b6082",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
