export { renderers } from '../../renderers.mjs';

const prerender = false;

const BLOB_TOKEN = "vercel_blob_rw_kTQe66XT9wxwyfoE_kA3V35hTGfWAxDWBHdAsuy53wQlo9a";

async function POST({ request }) {
  const headers = { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };
  
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const filename = formData.get('filename') || 'document.pdf';
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'Missing file' }), {
        status: 400,
        headers
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    
    // Usar la API REST de Vercel Blob directamente
    const uploadResponse = await fetch(
      `https://blob.vercel-storage.com/${filename}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${BLOB_TOKEN}`,
          'Content-Type': 'application/pdf',
          'x-content-type': 'application/pdf',
        },
        body: arrayBuffer,
      }
    );

    if (!uploadResponse.ok) {
      throw new Error(`Blob upload failed: ${uploadResponse.status}`);
    }

    const result = await uploadResponse.json();

    return new Response(JSON.stringify({
      success: true,
      url: result.url,
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
