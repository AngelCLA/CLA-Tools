import { put } from "@vercel/blob";

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!token) {
      return response.status(500).json({ 
        error: 'BLOB_READ_WRITE_TOKEN not configured'
      });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const filename = formData.get('filename') || 'document.pdf';
    
    if (!file) {
      return response.status(400).json({ error: 'No file provided' });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: 'application/pdf',
      token: token,
    });

    return response.status(200).json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return response.status(500).json({ 
      error: error.message || 'Upload failed'
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
