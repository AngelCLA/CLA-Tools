// Vercel Serverless Function
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const SUPABASE_URL = "https://baqvgbwzgwzljfxpepqy.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhcXZnYnd6Z3d6bGpmeHBlcHF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA3OTk1MywiZXhwIjoyMDg1NjU1OTUzfQ.WQKWHOUlnj9LJIXqwJhU1I1gtpWuQgRH3G88HFAC1V4";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: "ok",
      message: "PDF Upload API",
      configured: true
    });
  }

  if (req.method === 'POST') {
    try {
      const form = formidable({ multiples: false });

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

      const fileBuffer = fs.readFileSync(file.filepath);
      const timestamp = Date.now();
      const safeName = file.originalFilename.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = `${timestamp}-${safeName}`;

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
        error: "Upload failed: " + (error.message || "Unknown error"),
        stack: error.stack
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
