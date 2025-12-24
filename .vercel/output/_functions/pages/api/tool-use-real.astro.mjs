import { s as supabase } from '../../chunks/supabase_Bk8e56v9.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }
  console.log("=== API ROUTE DEBUG ===");
  console.log("📍 Ruta: /api/tool-use-real");
  console.log("🌐 Request URL:", request.url);
  console.log("🔧 Method:", request.method);
  console.log("📦 Has Supabase URL:", true);
  console.log("🔑 Has Supabase Key:", true);
  try {
    const body = await request.json();
    console.log("📥 Body recibido:", body);
    const { tool_slug } = body;
    if (!tool_slug) {
      console.error("❌ Falta tool_slug en el body");
      return new Response(JSON.stringify({
        error: "tool_slug is required",
        debug: { receivedBody: body }
      }), {
        status: 400,
        headers
      });
    }
    const userAgent = request.headers.get("user-agent") || "unknown";
    const referrer = request.headers.get("referer") || request.headers.get("referrer") || "unknown";
    console.log("💾 Intentando insertar:", {
      tool_slug,
      userAgent: userAgent.substring(0, 50),
      referrer
    });
    const { data, error } = await supabase.from("tool_usage").insert({
      tool_slug,
      event_type: "conversion",
      user_agent: userAgent,
      referrer
    }).select();
    if (error) {
      console.error("❌ Error de Supabase:", error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message,
        code: error.code,
        details: error.details
      }), {
        status: 500,
        headers
      });
    }
    console.log("✅ Conversión registrada exitosamente");
    console.log("📊 Data insertada:", data);
    return new Response(JSON.stringify({
      success: true,
      data,
      debug: {
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        tool_slug
      }
    }), {
      status: 200,
      headers
    });
  } catch (error) {
    console.error("💥 Error inesperado:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : void 0
    }), {
      status: 500,
      headers
    });
  }
};
const OPTIONS = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  OPTIONS,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
