import { put } from '@vercel/blob';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const { filename, file } = await request.json();
    console.log(`Intentando subir: ${filename}`);
    if (!file || !filename) {
      return new Response(JSON.stringify({ error: "Missing file or filename" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const base64Data = file.replace(/^data:.+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
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
