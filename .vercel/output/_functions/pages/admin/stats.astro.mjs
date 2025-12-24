/* empty css                                    */
import { f as createComponent, k as renderHead, l as renderScript, r as renderTemplate, h as addAttribute } from '../../chunks/astro/server_C2uEA6D3.mjs';
import 'piccolore';
import 'clsx';
import { s as supabase } from '../../chunks/supabase_Bk8e56v9.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Stats = createComponent(async ($$result, $$props, $$slots) => {
  const { data: stats, error: statsError } = await supabase.from("tool_usage").select("tool_slug, event_type, created_at");
  let toolMetrics = /* @__PURE__ */ new Map();
  let totalEvents = 0;
  if (stats && !statsError) {
    stats.forEach((record) => {
      totalEvents++;
      if (!toolMetrics.has(record.tool_slug)) {
        toolMetrics.set(record.tool_slug, {
          slug: record.tool_slug,
          clicks: 0,
          conversions: 0,
          lastActivity: record.created_at,
          firstActivity: record.created_at
        });
      }
      const metric = toolMetrics.get(record.tool_slug);
      if (record.event_type === "click") {
        metric.clicks++;
      } else if (record.event_type === "conversion") {
        metric.conversions++;
      }
      if (new Date(record.created_at) > new Date(metric.lastActivity)) {
        metric.lastActivity = record.created_at;
      }
      if (new Date(record.created_at) < new Date(metric.firstActivity)) {
        metric.firstActivity = record.created_at;
      }
    });
  }
  const metricsArray = Array.from(toolMetrics.values()).map((metric) => ({
    ...metric,
    conversionRate: metric.clicks > 0 ? (metric.conversions / metric.clicks * 100).toFixed(2) : "0.00"
  })).sort((a, b) => b.clicks + b.conversions - (a.clicks + a.conversions));
  const toolNames = {
    "docx-to-gift": "DOCX a GIFT",
    "text-to-html": "Texto a HTML",
    "merge-pdf": "Unir PDF",
    "forms": "Formularios"
  };
  const { data: recentActivity, error: recentError } = await supabase.from("tool_usage").select("*").order("created_at", { ascending: false }).limit(10);
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Estadísticas de Herramientas</title><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">${renderHead()}</head> <body class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> <!-- Header --> <div class="mb-8"> <div class="flex items-center justify-between mb-4"> <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
📊 Estadísticas de Uso
</h1> <a href="/" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"> <i class="fas fa-home mr-2"></i>Inicio
</a> </div> <p class="text-gray-600 dark:text-gray-400">
Monitoreo en tiempo real del uso de herramientas
</p> </div> <!-- Errores --> ${statsError && renderTemplate`<div class="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg mb-6"> <p class="font-bold">❌ Error cargando estadísticas:</p> <p class="text-sm mt-1">${statsError.message}</p> </div>`} <!-- Resumen General --> <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"> <div class="flex items-center justify-between"> <div> <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total de Eventos</p> <p class="text-3xl font-bold text-purple-600 dark:text-purple-400">${totalEvents}</p> </div> <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center"> <i class="fas fa-chart-line text-2xl text-purple-600 dark:text-purple-400"></i> </div> </div> </div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"> <div class="flex items-center justify-between"> <div> <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Herramientas Activas</p> <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">${metricsArray.length}</p> </div> <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"> <i class="fas fa-tools text-2xl text-blue-600 dark:text-blue-400"></i> </div> </div> </div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"> <div class="flex items-center justify-between"> <div> <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Conversiones</p> <p class="text-3xl font-bold text-green-600 dark:text-green-400"> ${metricsArray.reduce((sum, m) => sum + m.conversions, 0)} </p> </div> <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"> <i class="fas fa-check-circle text-2xl text-green-600 dark:text-green-400"></i> </div> </div> </div> </div> <!-- Métricas por Herramienta --> <div class="mb-8"> <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
Métricas por Herramienta
</h2> <div class="grid gap-6"> ${metricsArray.length > 0 ? metricsArray.map((metric) => renderTemplate`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"> <div class="p-6"> <div class="flex items-center justify-between mb-6"> <h3 class="text-2xl font-bold text-gray-900 dark:text-white"> ${toolNames[metric.slug] || metric.slug} </h3> <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold"> ${metric.slug} </span> </div> <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6"> <!-- Clics --> <div class="text-center"> <div class="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-2"> <i class="fas fa-mouse-pointer text-blue-600 dark:text-blue-400"></i> </div> <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Clics</p> <p class="text-3xl font-bold text-blue-600 dark:text-blue-400"> ${metric.clicks} </p> </div> <!-- Conversiones --> <div class="text-center"> <div class="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-2"> <i class="fas fa-check-double text-green-600 dark:text-green-400"></i> </div> <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Conversiones</p> <p class="text-3xl font-bold text-green-600 dark:text-green-400"> ${metric.conversions} </p> </div> <!-- Tasa de Conversión --> <div class="text-center"> <div class="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-2"> <i class="fas fa-percentage text-purple-600 dark:text-purple-400"></i> </div> <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Tasa Conversión</p> <p class="text-3xl font-bold text-purple-600 dark:text-purple-400"> ${metric.conversionRate}%
</p> </div> <!-- Última Actividad --> <div class="text-center"> <div class="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-2"> <i class="fas fa-clock text-orange-600 dark:text-orange-400"></i> </div> <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Última Actividad</p> <p class="text-sm font-semibold text-gray-700 dark:text-gray-300"> ${new Date(metric.lastActivity).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  })} </p> </div> </div> <!-- Barra de progreso --> ${metric.clicks > 0 && renderTemplate`<div> <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2"> <span>Progreso de conversión</span> <span>${metric.conversions} / ${metric.clicks}</span> </div> <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden"> <div class="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full transition-all duration-500"${addAttribute(`width: ${metric.conversionRate}%`, "style")}></div> </div> </div>`} </div> </div>`) : renderTemplate`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700"> <i class="fas fa-chart-bar text-6xl text-gray-300 dark:text-gray-600 mb-4"></i> <p class="text-xl text-gray-500 dark:text-gray-400">
No hay datos registrados aún
</p> <p class="text-sm text-gray-400 dark:text-gray-500 mt-2">
Las estadísticas aparecerán cuando los usuarios interactúen con las herramientas
</p> </div>`} </div> </div> <!-- Actividad Reciente --> <div> <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
Actividad Reciente
</h2> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"> ${recentActivity && recentActivity.length > 0 ? renderTemplate`<div class="divide-y divide-gray-200 dark:divide-gray-700"> ${recentActivity.map((activity, index) => renderTemplate`<div class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"> <div class="flex items-center justify-between"> <div class="flex items-center space-x-4"> <div${addAttribute(`w-10 h-10 rounded-full flex items-center justify-center ${activity.event_type === "conversion" ? "bg-green-100 dark:bg-green-900/30" : "bg-blue-100 dark:bg-blue-900/30"}`, "class")}> <i${addAttribute(`fas ${activity.event_type === "conversion" ? "fa-check-circle text-green-600 dark:text-green-400" : "fa-mouse-pointer text-blue-600 dark:text-blue-400"}`, "class")}></i> </div> <div> <p class="font-semibold text-gray-900 dark:text-white"> ${toolNames[activity.tool_slug] || activity.tool_slug} </p> <p class="text-sm text-gray-600 dark:text-gray-400"> ${activity.event_type === "conversion" ? "Conversi\xF3n exitosa" : "Click registrado"} </p> </div> </div> <div class="text-right"> <p class="text-sm text-gray-500 dark:text-gray-400"> ${new Date(activity.created_at).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short"
  })} </p> <p class="text-xs text-gray-400 dark:text-gray-500"> ${new Date(activity.created_at).toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit"
  })} </p> </div> </div> </div>`)} </div>` : renderTemplate`<div class="p-12 text-center"> <i class="fas fa-history text-4xl text-gray-300 dark:text-gray-600 mb-4"></i> <p class="text-gray-500 dark:text-gray-400">
No hay actividad reciente
</p> </div>`} </div> </div> </div> <!-- Auto-refresh --> ${renderScript($$result, "C:/dev/Astro/cla-tools/src/pages/admin/stats.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/dev/Astro/cla-tools/src/pages/admin/stats.astro", void 0);

const $$file = "C:/dev/Astro/cla-tools/src/pages/admin/stats.astro";
const $$url = "/admin/stats";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Stats,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
