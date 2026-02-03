export const prerender = false;

import { createClient } from "@supabase/supabase-js";

// Get Supabase credentials from environment variables
const getSupabaseClient = () => {
  // Try multiple variable names (Vercel auto-setup uses different names)
  const supabaseUrl = 
    process.env.VITE_PUBLIC_SUPABASE_URL || 
    process.env.SUPABASE_URL ||
    import.meta.env.VITE_PUBLIC_SUPABASE_URL;
    
  const supabaseKey = 
    process.env.SUPABASE_SERVICE_ROLE_KEY || 
    process.env.SUPABASE_KEY ||
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials:', { 
      hasUrl: !!supabaseUrl, 
      hasKey: !!supabaseKey,
      availableEnvVars: Object.keys(process.env).filter(k => k.includes('SUPABASE'))
    });
    return null;
  }
  
  return createClient(supabaseUrl, supabaseKey);
};

export async function GET() {
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

export async function POST({ request }) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    console.error('Supabase client creation failed');
    return new Response(
      JSON.stringify({
        error: "Missing Supabase credentials. Check environment variables in Vercel dashboard.",
        availableVars: Object.keys(process.env).filter(k => k.includes('SUPABASE'))
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
    const filename = `pdfs/${timestamp}-${safeName}`;

    // Convert file to ArrayBuffer for Supabase
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    console.log('Attempting upload to Supabase:', { filename, size: buffer.length });

    // Upload to Supabase Storage
    // Make sure you have a bucket named 'pdfs' created in Supabase Storage
    const { data, error } = await supabase.storage
      .from("pdfs")
      .upload(filename, buffer, {
        contentType: "application/pdf",
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return new Response(
        JSON.stringify({
          error: `Upload failed: ${error.message}`,
          details: error,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("pdfs")
      .getPublicUrl(filename);

    console.log('Upload successful:', urlData.publicUrl);

    return new Response(
      JSON.stringify({
        success: true,
        url: urlData.publicUrl,
        path: data.path,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(
      JSON.stringify({
        error: "Upload failed: " + (error.message || "Unknown error"),
        stack: error.stack,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
