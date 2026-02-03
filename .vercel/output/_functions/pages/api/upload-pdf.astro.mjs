import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const getSupabaseClient = () => {
  const supabaseUrl = process.env.VITE_PUBLIC_SUPABASE_URL || "https://baqvgbwzgwzljfxpepqy.supabase.co";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhcXZnYnd6Z3d6bGpmeHBlcHF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA3OTk1MywiZXhwIjoyMDg1NjU1OTUzfQ.WQKWHOUlnj9LJIXqwJhU1I1gtpWuQgRH3G88HFAC1V4";
  return createClient(supabaseUrl, supabaseKey);
};
async function GET() {
  const supabase = getSupabaseClient();
  return new Response(JSON.stringify({
    status: "ok",
    message: "PDF Upload API is ready (Supabase Storage)",
    hasCredentials: !!supabase
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
async function POST({ request }) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return new Response(
      JSON.stringify({
        error: "Missing Supabase credentials. Check VITE_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars."
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
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
    const filename = `pdfs/${timestamp}-${safeName}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const { data, error } = await supabase.storage.from("pdfs").upload(filename, buffer, {
      contentType: "application/pdf",
      cacheControl: "3600",
      upsert: false
    });
    if (error) {
      console.error("Supabase upload error:", error);
      return new Response(
        JSON.stringify({
          error: `Upload failed: ${error.message}`,
          details: error
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    const { data: urlData } = supabase.storage.from("pdfs").getPublicUrl(filename);
    return new Response(
      JSON.stringify({
        success: true,
        url: urlData.publicUrl,
        path: data.path
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
