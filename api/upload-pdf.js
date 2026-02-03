// Vercel Serverless Function - Más simple y confiable
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const SUPABASE_URL = "https://baqvgbwzgwzljfxpepqy.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhcXZnYnd6Z3d6bGpmeHBlcHF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA3OTk1MywiZXhwIjoyMDg1NjU1OTUzfQ.WQKWHOUlnj9LJIXqwJhU1I1gtpWuQgRH3G88HFAC1V4";

  if (req.method === 'GET') {
    return res.status(200).json({
      status: "ok",
      message: "PDF Upload API (Vercel Native)",
      configured: true
    });
  }

  if (req.method === 'POST') {
    try {
      // Para manejar FormData en Vercel, usamos la librería integrada
      const formidable = await import('formidable');
      const form = formidable.default({ multiples: false });

      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve([fields, files]);
        });
      });

      const file = files.file?.[0] || files.file;
      
      if (!file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      // Leer el archivo
      const fs = await import('fs');
      const fileBuffer = fs.readFileSync(file.filepath);

      // Sanitize filename
      const timestamp = Date.now();
      const safeName = file.originalFilename.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = `${timestamp}-${safeName}`;

      // Upload a Supabase
      const uploadUrl = `${SUPABASE_URL}/storage/v1/object/pdfs/${filename}`;
      
      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/pdf',
          'x-upsert': 'false'
        },
        body: fileBuffer
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("Supabase upload failed:", errorText);
        return res.status(500).json({
          error: `Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`,
          details: errorText
        });
      }

      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/pdfs/${filename}`;

      return res.status(200).json({
        success: true,
        url: publicUrl,
        path: filename
      });

    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({
        error: "Upload failed: " + (error.message || "Unknown error")
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
