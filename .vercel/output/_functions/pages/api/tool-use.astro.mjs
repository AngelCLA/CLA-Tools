import { s as supabase } from '../../chunks/supabase_Bk8e56v9.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  console.log("📍 [tool-use] Click registrado");
  try {
    const body = await request.json();
    console.log("📦 Body:", body);
    const { slug } = body;
    if (!slug) {
      console.error("❌ Falta el slug");
      return new Response(JSON.stringify({ error: "slug is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";
    console.log("💾 Insertando click en Supabase:", { tool_slug: slug });
    const { data, error } = await supabase.from("tool_usage").insert({
      tool_slug: slug,
      event_type: "click",
      user_agent: userAgent,
      referrer
    }).select();
    if (error) {
      console.error("❌ Error de Supabase:", error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.log("✅ Click insertado exitosamente:", data);
    return new Response(JSON.stringify({
      success: true,
      data
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("💥 Error inesperado:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
