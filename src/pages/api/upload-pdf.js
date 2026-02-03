export const prerender = false;

export async function GET() {
  // Intentar obtener las variables de todas las formas posibles
  let supabaseUrl, supabaseKey;
  
  try {
    supabaseUrl = process.env.SUPABASE_URL || import.meta.env.VITE_PUBLIC_SUPABASE_URL;
    supabaseKey = process.env.SUPABASE_KEY || import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  } catch (e) {
    supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
    supabaseKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  }
  
  return new Response(JSON.stringify({ 
    status: "ok", 
    message: "PDF Upload API is ready (Supabase REST)",
    configured: !!(supabaseUrl && supabaseKey),
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

export async function POST({ request }) {
  // Obtener variables dentro de la función, no a nivel de módulo
  let SUPABASE_URL, SUPABASE_KEY;
  
  try {
    SUPABASE_URL = process.env.VITE_PUBLIC_SUPABASE_URL || import.meta.env.VITE_PUBLIC_SUPABASE_URL;
    SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  } catch (e) {
    SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
    SUPABASE_KEY = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  }
  
  // Validar credenciales
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return new Response(
      JSON.stringify({
        error: "Missing Supabase credentials",
        hasUrl: !!SUPABASE_URL,
        hasKey: !!SUPABASE_KEY,
        hint: "Check VITE_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel env vars"
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
