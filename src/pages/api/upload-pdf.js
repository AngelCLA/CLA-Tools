import { put } from '@vercel/blob';

// Force this route to be serverless (not prerendered)
export const prerender = false;

// Ensure this runs as a Vercel serverless function
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Health check endpoint
export async function GET() {
  const headers = { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };
  
  return new Response(JSON.stringify({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env_check: {
      blob_token_available: !!(import.meta.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN)
    }
  }), {
    status: 200,
    headers
  });
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}

export async function POST({ request }) {
  console.log('=== UPLOAD PDF API CALLED ===');
  
  // Set response headers early
  const headers = { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  try {
    // Early error boundary
    if (!request) {
      return new Response(JSON.stringify({ error: 'No request object' }), {
        status: 400,
        headers
      });
    }
    
    // Verificar token de Vercel Blob (dev usa import.meta.env, production usa process.env)
    const token = import.meta.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;
    console.log('Token check - available:', !!token);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    
    if (!token) {
      console.error('BLOB_READ_WRITE_TOKEN not found in environment');
      console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('BLOB')));
      return new Response(JSON.stringify({ 
        error: 'Server configuration error: Missing blob storage token',
        debug: {
          env_vars_available: Object.keys(process.env).filter(k => k.includes('BLOB')),
          meta_env_available: Object.keys(import.meta.env || {})
        }
      }), {
        status: 500,
        headers
      });
    }

    console.log('Parsing form data...');
    const formData = await request.formData();
    const file = formData.get('file');
    const filename = formData.get('filename') || (file instanceof File ? file.name : 'document.pdf');
    
    console.log(`File details - name: ${filename}, type: ${file?.constructor?.name}, size: ${file?.size}`);
    
    if (!file) {
      console.error('No file provided in request');
      return new Response(JSON.stringify({ error: 'Missing file' }), {
        status: 400,
        headers
      });
    }

    // Convertir el archivo (Blob/File) a Buffer
    console.log('Converting file to buffer...');
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log(`Buffer created - size: ${buffer.length} bytes`);

    // Subir a Vercel Blob Storage
    console.log('Uploading to Vercel Blob...');
    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: 'application/pdf',
      token: token,
    });
    
    console.log(`Upload successful - URL: ${blob.url}`);

    return new Response(JSON.stringify({
      success: true,
      url: blob.url,
    }), {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('=== UPLOAD ERROR ===');
    console.error('Error type:', typeof error);
    console.error('Error name:', error?.name);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    console.error('Full error object:', error);
    
    // Crear respuesta de error más segura
    let errorMessage = 'Unknown server error';
    let errorType = 'ServerError';
    
    if (error && typeof error === 'object') {
      errorMessage = error.message || error.toString() || errorMessage;
      errorType = error.name || error.constructor?.name || errorType;
    }
    
    const errorResponse = {
      error: errorMessage,
      type: errorType,
      timestamp: new Date().toISOString(),
      debug: {
        has_token: !!(import.meta.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN),
        node_env: process.env.NODE_ENV || 'unknown'
      }
    };
    
    console.error('Sending error response:', errorResponse);
    
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers
    });
  }
}
