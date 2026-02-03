import { put } from "@vercel/blob";

export const prerender = false;

const BLOB_TOKEN = "vercel_blob_rw_kTQe66XT9wxwyfoE_kA3V35hTGfWAxDWBHdAsuy53wQlo9a";

export async function POST({ request }) {
  const headers = { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };
  
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const filename = formData.get('filename') || (file instanceof File ? file.name : 'document.pdf');
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'Missing file' }), {
        status: 400,
        headers
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: 'application/pdf',
      token: BLOB_TOKEN,
    });

    return new Response(JSON.stringify({
      success: true,
      url: blob.url,
    }), {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Upload error:', error);
    
    return new Response(JSON.stringify({
      error: error.message || 'Upload failed',
      type: error.name || 'ServerError'
    }), {
      status: 500,
      headers
    });
  }
}
