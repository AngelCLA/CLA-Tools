import { put } from '@vercel/blob';
export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://tools.claangel.site", "SSR": true};
const prerender = false;
async function GET() {
  return new Response(JSON.stringify({
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    env_check: {
      blob_token_available: true
    }
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
async function POST({ request }) {
  console.log("=== UPLOAD PDF API CALLED ===");
  try {
    const token = "vercel_blob_rw_kTQe66XT9wxwyfoE_kA3V35hTGfWAxDWBHdAsuy53wQlo9a";
    console.log("Token check - available:", !!token);
    console.log("Environment:", process.env.NODE_ENV || "development");
    if (!token) ;
    console.log("Parsing form data...");
    const formData = await request.formData();
    const file = formData.get("file");
    const filename = formData.get("filename") || (file instanceof File ? file.name : "document.pdf");
    console.log(`File details - name: ${filename}, type: ${file?.constructor?.name}, size: ${file?.size}`);
    if (!file) {
      console.error("No file provided in request");
      return new Response(JSON.stringify({ error: "Missing file" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.log("Converting file to buffer...");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log(`Buffer created - size: ${buffer.length} bytes`);
    console.log("Uploading to Vercel Blob...");
    const blob = await put(filename, buffer, {
      access: "public",
      contentType: "application/pdf",
      token
    });
    console.log(`Upload successful - URL: ${blob.url}`);
    return new Response(JSON.stringify({
      success: true,
      url: blob.url
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("=== UPLOAD ERROR ===");
    console.error("Error type:", typeof error);
    console.error("Error name:", error?.name);
    console.error("Error message:", error?.message);
    console.error("Error stack:", error?.stack);
    console.error("Full error object:", error);
    let errorMessage = "Unknown server error";
    let errorType = "ServerError";
    if (error && typeof error === "object") {
      errorMessage = error.message || error.toString() || errorMessage;
      errorType = error.name || error.constructor?.name || errorType;
    }
    const errorResponse = {
      error: errorMessage,
      type: errorType,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      debug: {
        has_token: true,
        node_env: process.env.NODE_ENV || "unknown"
      }
    };
    console.error("Sending error response:", errorResponse);
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
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
