// Vercel Serverless Function
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET endpoint para verificar
  if (req.method === 'GET') {
    const supabaseUrl = process.env.VITE_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    return res.status(200).json({
      status: "ok",
      message: "PDF Upload API is ready (Supabase REST - Vercel Function)",
      configured: !!(supabaseUrl && supabaseKey),
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey
    });
  }

  // POST endpoint para subir
  if (req.method === 'POST') {
    const SUPABASE_URL = process.env.VITE_PUBLIC_SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return res.status(500).json({
        error: "Missing Supabase credentials",
        hasUrl: !!SUPABASE_URL,
        hasKey: !!SUPABASE_KEY,
        hint: "Check VITE_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel env vars"
      });
    }

    try {
      // Get file from form data
      const contentType = req.headers['content-type'] || '';
      
      if (!contentType.includes('multipart/form-data')) {
        return res.status(400).json({ error: 'Content-Type must be multipart/form-data' });
      }

      // Parse multipart form data manually or use library
      // For simplicity, we'll get the raw body
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);

      // Extract boundary
      const boundary = contentType.split('boundary=')[1];
      if (!boundary) {
        return res.status(400).json({ error: 'No boundary found in Content-Type' });
      }

      // Parse multipart (basic implementation)
      const parts = buffer.toString('binary').split(`--${boundary}`);
      let fileData = null;
      let filename = 'upload.pdf';

      for (const part of parts) {
        if (part.includes('Content-Disposition') && part.includes('filename=')) {
          const filenameMatch = part.match(/filename="([^"]+)"/);
          if (filenameMatch) {
            filename = filenameMatch[1];
          }
          
          // Extract binary data
          const dataStart = part.indexOf('\r\n\r\n') + 4;
          const dataEnd = part.lastIndexOf('\r\n');
          fileData = Buffer.from(part.substring(dataStart, dataEnd), 'binary');
          break;
        }
      }

      if (!fileData) {
        return res.status(400).json({ error: 'No file found in request' });
      }

      // Sanitize filename
      const timestamp = Date.now();
      const safeName = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
      const finalFilename = `${timestamp}-${safeName}`;

      // Upload to Supabase
      const uploadUrl = `${SUPABASE_URL}/storage/v1/object/pdfs/${finalFilename}`;
      
      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/pdf',
          'x-upsert': 'false'
        },
        body: fileData
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("Supabase upload failed:", errorText);
        return res.status(500).json({
          error: `Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`,
          details: errorText
        });
      }

      // Construct public URL
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/pdfs/${finalFilename}`;

      return res.status(200).json({
        success: true,
        url: publicUrl,
        path: finalFilename
      });

    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({
        error: "Upload failed: " + (error.message || "Unknown error"),
        stack: error.stack
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
