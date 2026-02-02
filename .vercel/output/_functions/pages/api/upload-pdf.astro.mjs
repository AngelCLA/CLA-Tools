import { put } from '@vercel/blob';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const filename = formData.get("filename") || (file instanceof File ? file.name : "document.pdf");
    console.log(`Intentando subir: ${filename}`);
    if (!file) {
      return new Response(JSON.stringify({ error: "Missing file" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log(`Tamaño del buffer: ${buffer.length} bytes`);
    const blob = await put(filename, buffer, {
      access: "public",
      contentType: "application/pdf",
      token: "vercel_blob_rw_kTQe66XT9wxwyfoE_kA3V35hTGfWAxDWBHdAsuy53wQlo9a"
    });
    console.log(`Subida exitosa: ${blob.url}`);
    return new Response(JSON.stringify({
      success: true,
      url: blob.url
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({
      error: error.message || "Failed to upload file",
      stack: error.stack
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
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
