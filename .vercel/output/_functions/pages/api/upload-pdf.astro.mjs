import { put } from '@vercel/blob';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const getToken = () => {
  return process.env.BLOB_READ_WRITE_TOKEN || "vercel_blob_rw_nVf4oJwlVLAwIdIQ_DWvOCfLtOtdswafCCKPtK5Rs13vjta";
};
async function GET() {
  getToken();
  return new Response(JSON.stringify({
    status: "ok",
    message: "PDF Upload API is ready",
    hasToken: true
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
async function POST({ request }) {
  const token = getToken();
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${safeName}`;
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
      token
    });
    return new Response(
      JSON.stringify({
        success: true,
        url: blob.url
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(
      JSON.stringify({
        error: "Upload failed: " + (error.message || "Unknown error"),
        stack: error.stack
        // Debug info
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
