export const prerender = false;

// Usar variables de entorno (funcionan en Vercel sin problemas)
const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET() {
  return new Response(JSON.stringify({ 
    status: "ok", 
    message: "PDF Upload API is ready (Supabase REST)",
    configured: true
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Sanitize filename
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${safeName}`;

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Upload usando la API REST de Supabase directamente
    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/pdfs/${filename}`;
    
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/pdf',
        'x-upsert': 'false'
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

    // Construir URL pública
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
