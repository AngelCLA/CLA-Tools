// api/upload-pdf.js
// Esta es una API route para Vercel que maneja el upload de PDFs

import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, file } = req.body;
    
    if (!file || !filename) {
      return res.status(400).json({ error: 'Missing file or filename' });
    }

    // Convertir base64 a buffer
    const base64Data = file.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');

    // Subir a Vercel Blob Storage
    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: 'application/pdf',
    });

    return res.status(200).json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: 'Failed to upload file',
      details: error.message 
    });
  }
}