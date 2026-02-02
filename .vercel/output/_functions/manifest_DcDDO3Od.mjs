import 'piccolore';
import { q as decodeKey } from './chunks/astro/server_DcdLrLOT.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_B0waenDh.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/dev/Astro/cla-tools/","cacheDir":"file:///C:/dev/Astro/cla-tools/node_modules/.astro/","outDir":"file:///C:/dev/Astro/cla-tools/dist/","srcDir":"file:///C:/dev/Astro/cla-tools/src/","publicDir":"file:///C:/dev/Astro/cla-tools/public/","buildClientDir":"file:///C:/dev/Astro/cla-tools/dist/client/","buildServerDir":"file:///C:/dev/Astro/cla-tools/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"tools/docx-gift/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tools/docx-gift","isIndex":false,"type":"page","pattern":"^\\/tools\\/docx-gift\\/?$","segments":[[{"content":"tools","dynamic":false,"spread":false}],[{"content":"docx-gift","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tools/docx-gift.astro","pathname":"/tools/docx-gift","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tools/ebooks/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tools/ebooks","isIndex":false,"type":"page","pattern":"^\\/tools\\/ebooks\\/?$","segments":[[{"content":"tools","dynamic":false,"spread":false}],[{"content":"ebooks","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tools/ebooks.astro","pathname":"/tools/ebooks","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tools/generador-acta/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tools/generador-acta","isIndex":false,"type":"page","pattern":"^\\/tools\\/generador-acta\\/?$","segments":[[{"content":"tools","dynamic":false,"spread":false}],[{"content":"generador-acta","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tools/generador-acta.astro","pathname":"/tools/generador-acta","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tools/merge-pdf/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tools/merge-pdf","isIndex":false,"type":"page","pattern":"^\\/tools\\/merge-pdf\\/?$","segments":[[{"content":"tools","dynamic":false,"spread":false}],[{"content":"merge-pdf","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tools/merge-pdf.astro","pathname":"/tools/merge-pdf","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tools/text-html/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tools/text-html","isIndex":false,"type":"page","pattern":"^\\/tools\\/text-html\\/?$","segments":[[{"content":"tools","dynamic":false,"spread":false}],[{"content":"text-html","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tools/text-html.astro","pathname":"/tools/text-html","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/upload-pdf","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/upload-pdf\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"upload-pdf","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/upload-pdf.js","pathname":"/api/upload-pdf","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://tools.claangel.site","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/dev/Astro/cla-tools/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/dev/Astro/cla-tools/src/pages/tools/docx-gift.astro",{"propagation":"none","containsHead":true}],["C:/dev/Astro/cla-tools/src/pages/tools/ebooks.astro",{"propagation":"none","containsHead":true}],["C:/dev/Astro/cla-tools/src/pages/tools/generador-acta.astro",{"propagation":"none","containsHead":true}],["C:/dev/Astro/cla-tools/src/pages/tools/merge-pdf.astro",{"propagation":"none","containsHead":true}],["C:/dev/Astro/cla-tools/src/pages/tools/text-html.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/upload-pdf@_@js":"pages/api/upload-pdf.astro.mjs","\u0000@astro-page:src/pages/tools/docx-gift@_@astro":"pages/tools/docx-gift.astro.mjs","\u0000@astro-page:src/pages/tools/ebooks@_@astro":"pages/tools/ebooks.astro.mjs","\u0000@astro-page:src/pages/tools/generador-acta@_@astro":"pages/tools/generador-acta.astro.mjs","\u0000@astro-page:src/pages/tools/merge-pdf@_@astro":"pages/tools/merge-pdf.astro.mjs","\u0000@astro-page:src/pages/tools/text-html@_@astro":"pages/tools/text-html.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DcDDO3Od.mjs","C:/dev/Astro/cla-tools/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_D1Z-SP7G.mjs","C:/dev/Astro/cla-tools/src/pages/tools/ebooks.astro?astro&type=script&index=0&lang.ts":"_astro/ebooks.astro_astro_type_script_index_0_lang.CaB_2DeY.js","C:/dev/Astro/cla-tools/src/pages/tools/merge-pdf.astro?astro&type=script&index=0&lang.ts":"_astro/merge-pdf.astro_astro_type_script_index_0_lang.Jjd45kYs.js","C:/dev/Astro/cla-tools/src/components/FloatingVideoTutorial.astro?astro&type=script&index=0&lang.ts":"_astro/FloatingVideoTutorial.astro_astro_type_script_index_0_lang.D6GNmGox.js","C:/dev/Astro/cla-tools/src/components/Footer.astro?astro&type=script&index=0&lang.ts":"_astro/Footer.astro_astro_type_script_index_0_lang.C2pv2xJo.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/dev/Astro/cla-tools/src/components/Footer.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.getElementById(\"footer-year\");e&&(e.textContent=new Date().getFullYear().toString())});const t=document.getElementById(\"privacy-modal\"),c=document.getElementById(\"open-privacy-btn\"),s=document.getElementById(\"close-privacy-btn\"),i=document.getElementById(\"privacy-ok-btn\");function a(){t?.classList.remove(\"hidden\"),document.body.style.overflow=\"hidden\"}function d(){t?.classList.add(\"hidden\"),document.body.style.overflow=\"auto\"}c?.addEventListener(\"click\",a);s?.addEventListener(\"click\",d);i?.addEventListener(\"click\",d);const n=document.getElementById(\"terms-modal\"),l=document.getElementById(\"open-terms-btn\"),r=document.getElementById(\"close-terms-btn\"),m=document.getElementById(\"terms-ok-btn\");function y(){n?.classList.remove(\"hidden\"),document.body.style.overflow=\"hidden\"}function o(){n?.classList.add(\"hidden\"),document.body.style.overflow=\"auto\"}l?.addEventListener(\"click\",y);r?.addEventListener(\"click\",o);m?.addEventListener(\"click\",o);document.addEventListener(\"keydown\",e=>{e.key===\"Escape\"&&(d(),o())});t?.addEventListener(\"click\",e=>{e.target===t&&d()});n?.addEventListener(\"click\",e=>{e.target===n&&o()});"]],"assets":["/_astro/Logo.BXFdFO5W.svg","/_astro/ebooks.DmGN3oB7.css","/_astro/generador-acta.BJ6WuXDS.css","/_astro/index.CEAJrjUs.css","/favicon.svg","/og-image.png","/robots.txt","/_astro/ebooks.astro_astro_type_script_index_0_lang.CaB_2DeY.js","/_astro/FloatingVideoTutorial.astro_astro_type_script_index_0_lang.D6GNmGox.js","/_astro/merge-pdf.astro_astro_type_script_index_0_lang.Jjd45kYs.js","/tools/docx-gift/index.html","/tools/ebooks/index.html","/tools/generador-acta/index.html","/tools/merge-pdf/index.html","/tools/text-html/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"r2IhlaO6k8chInjEBFani9NVsQMU2MWEI1w0MkfAw+M="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
