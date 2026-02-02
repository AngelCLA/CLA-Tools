import { put } from '@vercel/blob';

export const prerender = false;

export async function POST({ request }) {
  try {
    // Verificar token de Vercel Blob (dev usa import.meta.env, production usa process.env)
    const token = import.meta.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;
    console.log('Token available:', !!token);
    
    if (!token) {
      console.error('BLOB_READ_WRITE_TOKEN not found in environment');
      return new Response(JSON.stringify({ error: 'Server configuration error: Missing blob storage token' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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
      token: token,
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
    console.error('Error stack:', error.stack);
    
    // Asegurar que siempre devolvemos JSON válido
    const errorMessage = error.message || 'Failed to upload file';
    const errorResponse = {
      error: errorMessage,
      details: error.name || 'Unknown error',
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
