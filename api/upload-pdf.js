import { put } from "@vercel/blob";
import { IncomingForm } from "formidable";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!token) {
      console.error('BLOB_READ_WRITE_TOKEN missing');
      return res.status(500).json({ 
        error: 'BLOB_READ_WRITE_TOKEN not configured'
      });
    }

    // Parse multipart form data
    const form = new IncomingForm();
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const file = files.file?.[0] || files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const fs = require('fs');
    const buffer = fs.readFileSync(file.filepath);
    const filename = fields.filename?.[0] || file.originalFilename || 'document.pdf';
    
    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: 'application/pdf',
      token: token,
    });

    return res.status(200).json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: error.message || 'Upload failed'
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
