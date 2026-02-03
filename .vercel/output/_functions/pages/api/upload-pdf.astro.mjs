export { renderers } from '../../renderers.mjs';

const prerender = false;
const SUPABASE_URL = process.env.VITE_PUBLIC_SUPABASE_URL || "https://baqvgbwzgwzljfxpepqy.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhcXZnYnd6Z3d6bGpmeHBlcHF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA3OTk1MywiZXhwIjoyMDg1NjU1OTUzfQ.WQKWHOUlnj9LJIXqwJhU1I1gtpWuQgRH3G88HFAC1V4";
async function GET() {
  return new Response(JSON.stringify({
    status: "ok",
    message: "PDF Upload API is ready (Supabase REST)",
    configured: true,
    hasUrl: true,
    hasKey: true
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
async function POST({ request }) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${safeName}`;
    const arrayBuffer = await file.arrayBuffer();
    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/pdfs/${filename}`;
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/pdf",
        "x-upsert": "false"
      },
      body: arrayBuffer
    });
    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error("Supabase upload failed:", errorText);
      return new Response(
        JSON.stringify({
          error: `Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`,
          details: errorText
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/pdfs/${filename}`;
    return new Response(
      JSON.stringify({
        success: true,
        url: publicUrl,
        path: filename
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(
      JSON.stringify({
        error: "Upload failed: " + (error.message || "Unknown error"),
        stack: error.stack
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
