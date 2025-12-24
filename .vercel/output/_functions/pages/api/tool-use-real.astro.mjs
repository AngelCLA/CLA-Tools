import { s as supabase } from '../../chunks/supabase_Bk8e56v9.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { tool_slug } = body;
    if (!tool_slug) {
      return new Response(JSON.stringify({ error: "tool_slug is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";
    const { error } = await supabase.from("tool_usage").insert({
      tool_slug,
      event_type: "conversion",
      user_agent: userAgent,
      referrer
    });
    if (error) {
      console.error("Error inserting real tool usage:", error);
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error processing real usage:", error);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
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
