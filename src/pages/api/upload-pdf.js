import { put } from '@vercel/blob';

export const prerender = false;

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const filename = formData.get('filename') || (file instanceof File ? file.name : 'document.pdf');
    
    console.log(`Intentando subir: ${filename}`);
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'Missing file' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Convertir el archivo (Blob/File) a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log(`Tamaño del buffer: ${buffer.length} bytes`);

    // Subir a Vercel Blob Storage
    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: 'application/pdf',
      token: import.meta.env.BLOB_READ_WRITE_TOKEN,
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
