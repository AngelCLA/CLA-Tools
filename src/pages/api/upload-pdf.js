import { put } from '@vercel/blob';

export const prerender = false;

export async function POST({ request }) {
  try {
    const { filename, file } = await request.json();
    console.log(`Intentando subir: ${filename}`);
    
    if (!file || !filename) {
      return new Response(JSON.stringify({ error: 'Missing file or filename' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Convertir base64 a buffer
    const base64Data = file.replace(/^data:.+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    console.log(`Tamaño del buffer: ${buffer.length} bytes`);

    // Subir a Vercel Blob Storage
    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: 'application/pdf',
      token: import.meta.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN,
    });
    
    console.log(`Subida exitosa: ${blob.url}`);

    return new Response(JSON.stringify({
      success: true,
      url: blob.url,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to upload file',
      stack: error.stack
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
